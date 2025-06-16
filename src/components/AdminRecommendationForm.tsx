import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Recommendation {
  ID: number;
  recommendation_id: string;
  title: string;
  description: string;
  priority: string;
  domain: string;
  technologies: string;
  effort: string;
  is_active: boolean;
}

interface AdminRecommendationFormProps {
  recommendation?: Recommendation | null;
  onClose: () => void;
  tableId: number;
}

const AdminRecommendationForm: React.FC<AdminRecommendationFormProps> = ({
  recommendation,
  onClose,
  tableId
}) => {
  const [formData, setFormData] = useState({
    recommendation_id: '',
    title: '',
    description: '',
    priority: 'medium',
    domain: '',
    technologies: '',
    effort: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recommendation) {
      setFormData({
        recommendation_id: recommendation.recommendation_id,
        title: recommendation.title,
        description: recommendation.description,
        priority: recommendation.priority,
        domain: recommendation.domain,
        technologies: recommendation.technologies,
        effort: recommendation.effort,
        is_active: recommendation.is_active
      });
    }
  }, [recommendation]);

  const domains = [
    'Access Control',
    'Incident Response',
    'Network Security',
    'Data Protection',
    'Risk Management',
    'Security Awareness',
    'Asset Management',
    'Vulnerability Management',
    'Security Operations',
    'Business Continuity'
  ];

  const effortOptions = [
    'Low (1-2 weeks)',
    'Medium (1-3 months)',
    'High (3-6 months)',
    'Very High (6+ months)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title.trim() || !formData.description.trim() || !formData.domain) {
        throw new Error('Please fill in all required fields');
      }

      // Generate recommendation ID if not provided
      const recId = formData.recommendation_id || 
        `REC-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      const payload = {
        ...formData,
        recommendation_id: recId
      };

      if (recommendation) {
        // Update existing recommendation
        const { error } = await window.ezsite.apis.tableUpdate(tableId, {
          ID: recommendation.ID,
          ...payload
        });
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Recommendation updated successfully"
        });
      } else {
        // Create new recommendation
        const { error } = await window.ezsite.apis.tableCreate(tableId, payload);
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Recommendation created successfully"
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving recommendation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save recommendation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {recommendation ? 'Edit Recommendation' : 'Create New Recommendation'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter recommendation title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="recommendation_id">Recommendation ID</Label>
                  <Input
                    id="recommendation_id"
                    value={formData.recommendation_id}
                    onChange={(e) => handleInputChange('recommendation_id', e.target.value)}
                    placeholder="Auto-generated if empty"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the recommendation"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange('priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="domain">Domain *</Label>
                  <Select
                    value={formData.domain}
                    onValueChange={(value) => handleInputChange('domain', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map(domain => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="effort">Effort</Label>
                  <Select
                    value={formData.effort}
                    onValueChange={(value) => handleInputChange('effort', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select effort" />
                    </SelectTrigger>
                    <SelectContent>
                      {effortOptions.map(effort => (
                        <SelectItem key={effort} value={effort}>
                          {effort}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="technologies">Recommended Technologies</Label>
                <Textarea
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="List recommended technologies, tools, or solutions"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                />
                <Label htmlFor="is_active">Active Recommendation</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : recommendation ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminRecommendationForm;