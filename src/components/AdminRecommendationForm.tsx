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
  'Business Continuity'];


  const effortOptions = [
  'Low (1-2 weeks)',
  'Medium (1-3 months)',
  'High (3-6 months)',
  'Very High (6+ months)'];


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
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose} data-id="v7ar0ul1q" data-path="src/components/AdminRecommendationForm.tsx">
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-id="o4qt2z99q" data-path="src/components/AdminRecommendationForm.tsx">
        <DialogHeader data-id="pjeav1bqf" data-path="src/components/AdminRecommendationForm.tsx">
          <DialogTitle className="flex items-center gap-2" data-id="4eik3vik2" data-path="src/components/AdminRecommendationForm.tsx">
            {recommendation ? 'Edit Recommendation' : 'Create New Recommendation'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" data-id="97rmc5csa" data-path="src/components/AdminRecommendationForm.tsx">
          <Card data-id="fsw175n4l" data-path="src/components/AdminRecommendationForm.tsx">
            <CardContent className="p-4 space-y-4" data-id="xnb0z381p" data-path="src/components/AdminRecommendationForm.tsx">
              <div className="grid grid-cols-2 gap-4" data-id="0mjgvbfo2" data-path="src/components/AdminRecommendationForm.tsx">
                <div data-id="yc3duw0t6" data-path="src/components/AdminRecommendationForm.tsx">
                  <Label htmlFor="title" data-id="ky1ivtcp9" data-path="src/components/AdminRecommendationForm.tsx">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter recommendation title"
                    required data-id="wxyqgszbe" data-path="src/components/AdminRecommendationForm.tsx" />

                </div>
                
                <div data-id="se6r3ql6o" data-path="src/components/AdminRecommendationForm.tsx">
                  <Label htmlFor="recommendation_id" data-id="cq5dzhb7s" data-path="src/components/AdminRecommendationForm.tsx">Recommendation ID</Label>
                  <Input
                    id="recommendation_id"
                    value={formData.recommendation_id}
                    onChange={(e) => handleInputChange('recommendation_id', e.target.value)}
                    placeholder="Auto-generated if empty" data-id="brmrsaiyk" data-path="src/components/AdminRecommendationForm.tsx" />

                </div>
              </div>

              <div data-id="8rlnytx5z" data-path="src/components/AdminRecommendationForm.tsx">
                <Label htmlFor="description" data-id="d42n2x61z" data-path="src/components/AdminRecommendationForm.tsx">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the recommendation"
                  rows={4}
                  required data-id="fl204dq6w" data-path="src/components/AdminRecommendationForm.tsx" />

              </div>

              <div className="grid grid-cols-3 gap-4" data-id="zthc8d6h6" data-path="src/components/AdminRecommendationForm.tsx">
                <div data-id="1o5fn91lm" data-path="src/components/AdminRecommendationForm.tsx">
                  <Label htmlFor="priority" data-id="na181ty02" data-path="src/components/AdminRecommendationForm.tsx">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange('priority', value)} data-id="jckvud9xm" data-path="src/components/AdminRecommendationForm.tsx">

                    <SelectTrigger data-id="f56nkgb6z" data-path="src/components/AdminRecommendationForm.tsx">
                      <SelectValue data-id="mqcan90yl" data-path="src/components/AdminRecommendationForm.tsx" />
                    </SelectTrigger>
                    <SelectContent data-id="jkzj5f49x" data-path="src/components/AdminRecommendationForm.tsx">
                      <SelectItem value="high" data-id="8nt1lfbh8" data-path="src/components/AdminRecommendationForm.tsx">High</SelectItem>
                      <SelectItem value="medium" data-id="ky1pft6b5" data-path="src/components/AdminRecommendationForm.tsx">Medium</SelectItem>
                      <SelectItem value="low" data-id="i2bi80ns1" data-path="src/components/AdminRecommendationForm.tsx">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div data-id="sd7opjoqd" data-path="src/components/AdminRecommendationForm.tsx">
                  <Label htmlFor="domain" data-id="0pmn4ewyu" data-path="src/components/AdminRecommendationForm.tsx">Domain *</Label>
                  <Select
                    value={formData.domain}
                    onValueChange={(value) => handleInputChange('domain', value)} data-id="kwzs53ar0" data-path="src/components/AdminRecommendationForm.tsx">

                    <SelectTrigger data-id="mj1sz1zk0" data-path="src/components/AdminRecommendationForm.tsx">
                      <SelectValue placeholder="Select domain" data-id="kz35uy4z2" data-path="src/components/AdminRecommendationForm.tsx" />
                    </SelectTrigger>
                    <SelectContent data-id="ib2qj71ui" data-path="src/components/AdminRecommendationForm.tsx">
                      {domains.map((domain) =>
                      <SelectItem key={domain} value={domain} data-id="xfg3wq8be" data-path="src/components/AdminRecommendationForm.tsx">
                          {domain}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div data-id="3q04ywc5e" data-path="src/components/AdminRecommendationForm.tsx">
                  <Label htmlFor="effort" data-id="4mt0zrtpw" data-path="src/components/AdminRecommendationForm.tsx">Effort</Label>
                  <Select
                    value={formData.effort}
                    onValueChange={(value) => handleInputChange('effort', value)} data-id="wwt7u30gu" data-path="src/components/AdminRecommendationForm.tsx">

                    <SelectTrigger data-id="yr31le0vp" data-path="src/components/AdminRecommendationForm.tsx">
                      <SelectValue placeholder="Select effort" data-id="41nbar6bp" data-path="src/components/AdminRecommendationForm.tsx" />
                    </SelectTrigger>
                    <SelectContent data-id="87tgyxevs" data-path="src/components/AdminRecommendationForm.tsx">
                      {effortOptions.map((effort) =>
                      <SelectItem key={effort} value={effort} data-id="crx5krhm4" data-path="src/components/AdminRecommendationForm.tsx">
                          {effort}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div data-id="w397z2mrc" data-path="src/components/AdminRecommendationForm.tsx">
                <Label htmlFor="technologies" data-id="cs10tc2ne" data-path="src/components/AdminRecommendationForm.tsx">Recommended Technologies</Label>
                <Textarea
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="List recommended technologies, tools, or solutions"
                  rows={2} data-id="czjflcynh" data-path="src/components/AdminRecommendationForm.tsx" />

              </div>

              <div className="flex items-center space-x-2" data-id="8sggf1vps" data-path="src/components/AdminRecommendationForm.tsx">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)} data-id="bninuxwec" data-path="src/components/AdminRecommendationForm.tsx" />

                <Label htmlFor="is_active" data-id="b149i7sh3" data-path="src/components/AdminRecommendationForm.tsx">Active Recommendation</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3" data-id="era5vq8qv" data-path="src/components/AdminRecommendationForm.tsx">
            <Button type="button" variant="outline" onClick={onClose} data-id="6ti9olfon" data-path="src/components/AdminRecommendationForm.tsx">
              <X className="h-4 w-4 mr-2" data-id="o8ox1379q" data-path="src/components/AdminRecommendationForm.tsx" />
              Cancel
            </Button>
            <Button type="submit" disabled={loading} data-id="93jkjvphv" data-path="src/components/AdminRecommendationForm.tsx">
              <Save className="h-4 w-4 mr-2" data-id="htra6u04h" data-path="src/components/AdminRecommendationForm.tsx" />
              {loading ? 'Saving...' : recommendation ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>);

};

export default AdminRecommendationForm;