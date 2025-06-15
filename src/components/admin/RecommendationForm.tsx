import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { X, Plus } from 'lucide-react';

interface RecommendationFormProps {
  recommendation?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({
  recommendation,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    recommendation_id: '',
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    domain: '',
    technologies: [] as string[],
    effort: '',
    is_active: true
  });
  const [newTechnology, setNewTechnology] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const domains = [
  'governance',
  'iam',
  'network',
  'endpoint',
  'cloud',
  'vulnerability',
  'application',
  'data',
  'operations'];


  useEffect(() => {
    if (recommendation) {
      const technologies = typeof recommendation.technologies === 'string' ?
      JSON.parse(recommendation.technologies || '[]') :
      recommendation.technologies || [];

      setFormData({
        recommendation_id: recommendation.recommendation_id || '',
        title: recommendation.title || '',
        description: recommendation.description || '',
        priority: recommendation.priority || 'medium',
        domain: recommendation.domain || '',
        technologies: technologies,
        effort: recommendation.effort || '',
        is_active: recommendation.is_active !== undefined ? recommendation.is_active : true
      });
    }
  }, [recommendation]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        technologies: JSON.stringify(formData.technologies)
      };

      await onSave(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {recommendation ? 'Edit Recommendation' : 'Add New Recommendation'}
        </CardTitle>
        <CardDescription>
          Fill in the details for the security recommendation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recommendation_id">Recommendation ID</Label>
              <Input
                id="recommendation_id"
                placeholder="e.g., gov-policy"
                value={formData.recommendation_id}
                onChange={(e) => handleInputChange('recommendation_id', e.target.value)}
                required />

            </div>
            
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Select
                value={formData.domain}
                onValueChange={(value) => handleInputChange('domain', value)}>

                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) =>
                  <SelectItem key={domain} value={domain}>
                      {domain.charAt(0).toUpperCase() + domain.slice(1)}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter recommendation title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required />

          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter detailed description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              required />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}>

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

            <div className="space-y-2">
              <Label htmlFor="effort">Effort</Label>
              <Input
                id="effort"
                placeholder="e.g., 1-3 months"
                value={formData.effort}
                onChange={(e) => handleInputChange('effort', e.target.value)}
                required />

            </div>
          </div>

          <div className="space-y-2">
            <Label>Technologies</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add technology"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())} />

              <Button type="button" onClick={addTechnology} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) =>
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTechnology(tech)} />

                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange('is_active', checked)} />

            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : recommendation ? 'Update' : 'Create'} Recommendation
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>);

};

export default RecommendationForm;