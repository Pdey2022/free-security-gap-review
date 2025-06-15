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
    <Card className="max-w-4xl mx-auto" data-id="y9linwhgv" data-path="src/components/admin/RecommendationForm.tsx">
      <CardHeader data-id="gat0x80qo" data-path="src/components/admin/RecommendationForm.tsx">
        <CardTitle data-id="btjnljnxc" data-path="src/components/admin/RecommendationForm.tsx">
          {recommendation ? 'Edit Recommendation' : 'Add New Recommendation'}
        </CardTitle>
        <CardDescription data-id="99k2net5l" data-path="src/components/admin/RecommendationForm.tsx">
          Fill in the details for the security recommendation
        </CardDescription>
      </CardHeader>
      <CardContent data-id="kcv25evon" data-path="src/components/admin/RecommendationForm.tsx">
        <form onSubmit={handleSubmit} className="space-y-6" data-id="5miuas7wc" data-path="src/components/admin/RecommendationForm.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="6zgn166eh" data-path="src/components/admin/RecommendationForm.tsx">
            <div className="space-y-2" data-id="w5d85ke1z" data-path="src/components/admin/RecommendationForm.tsx">
              <Label htmlFor="recommendation_id" data-id="mpfey5oyv" data-path="src/components/admin/RecommendationForm.tsx">Recommendation ID</Label>
              <Input
                id="recommendation_id"
                placeholder="e.g., gov-policy"
                value={formData.recommendation_id}
                onChange={(e) => handleInputChange('recommendation_id', e.target.value)}
                required data-id="9egg4yfcq" data-path="src/components/admin/RecommendationForm.tsx" />

            </div>
            
            <div className="space-y-2" data-id="zhrbymgv2" data-path="src/components/admin/RecommendationForm.tsx">
              <Label htmlFor="domain" data-id="x2rkfy30f" data-path="src/components/admin/RecommendationForm.tsx">Domain</Label>
              <Select
                value={formData.domain}
                onValueChange={(value) => handleInputChange('domain', value)} data-id="gbtv4horc" data-path="src/components/admin/RecommendationForm.tsx">

                <SelectTrigger data-id="7gq7jgde7" data-path="src/components/admin/RecommendationForm.tsx">
                  <SelectValue placeholder="Select domain" data-id="7b86984g6" data-path="src/components/admin/RecommendationForm.tsx" />
                </SelectTrigger>
                <SelectContent data-id="qemyishju" data-path="src/components/admin/RecommendationForm.tsx">
                  {domains.map((domain) =>
                  <SelectItem key={domain} value={domain} data-id="tm25ylrns" data-path="src/components/admin/RecommendationForm.tsx">
                      {domain.charAt(0).toUpperCase() + domain.slice(1)}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2" data-id="2qlw8f2ot" data-path="src/components/admin/RecommendationForm.tsx">
            <Label htmlFor="title" data-id="2ub4bc30u" data-path="src/components/admin/RecommendationForm.tsx">Title</Label>
            <Input
              id="title"
              placeholder="Enter recommendation title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required data-id="8zjxsikqc" data-path="src/components/admin/RecommendationForm.tsx" />

          </div>

          <div className="space-y-2" data-id="kygjrihly" data-path="src/components/admin/RecommendationForm.tsx">
            <Label htmlFor="description" data-id="n7igpe3y8" data-path="src/components/admin/RecommendationForm.tsx">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter detailed description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              required data-id="j45v91dod" data-path="src/components/admin/RecommendationForm.tsx" />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="5g0dpu133" data-path="src/components/admin/RecommendationForm.tsx">
            <div className="space-y-2" data-id="jf3aikacd" data-path="src/components/admin/RecommendationForm.tsx">
              <Label htmlFor="priority" data-id="l4kmlhmag" data-path="src/components/admin/RecommendationForm.tsx">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)} data-id="r88i7n42p" data-path="src/components/admin/RecommendationForm.tsx">

                <SelectTrigger data-id="eowhk7vld" data-path="src/components/admin/RecommendationForm.tsx">
                  <SelectValue data-id="acfmz177k" data-path="src/components/admin/RecommendationForm.tsx" />
                </SelectTrigger>
                <SelectContent data-id="fd9ddjjgp" data-path="src/components/admin/RecommendationForm.tsx">
                  <SelectItem value="high" data-id="klr6l4o57" data-path="src/components/admin/RecommendationForm.tsx">High</SelectItem>
                  <SelectItem value="medium" data-id="51ccuh4b5" data-path="src/components/admin/RecommendationForm.tsx">Medium</SelectItem>
                  <SelectItem value="low" data-id="tijftj9gp" data-path="src/components/admin/RecommendationForm.tsx">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2" data-id="b3fnm28x5" data-path="src/components/admin/RecommendationForm.tsx">
              <Label htmlFor="effort" data-id="7kamcru5z" data-path="src/components/admin/RecommendationForm.tsx">Effort</Label>
              <Input
                id="effort"
                placeholder="e.g., 1-3 months"
                value={formData.effort}
                onChange={(e) => handleInputChange('effort', e.target.value)}
                required data-id="es2qrjluu" data-path="src/components/admin/RecommendationForm.tsx" />

            </div>
          </div>

          <div className="space-y-2" data-id="ggwjp3tt7" data-path="src/components/admin/RecommendationForm.tsx">
            <Label data-id="zfes326h5" data-path="src/components/admin/RecommendationForm.tsx">Technologies</Label>
            <div className="flex gap-2 mb-2" data-id="n7t1ygkj2" data-path="src/components/admin/RecommendationForm.tsx">
              <Input
                placeholder="Add technology"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())} data-id="uzqg03s13" data-path="src/components/admin/RecommendationForm.tsx" />

              <Button type="button" onClick={addTechnology} size="sm" data-id="xhpej614e" data-path="src/components/admin/RecommendationForm.tsx">
                <Plus className="h-4 w-4" data-id="rbqwk4hct" data-path="src/components/admin/RecommendationForm.tsx" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2" data-id="iix4ld7pb" data-path="src/components/admin/RecommendationForm.tsx">
              {formData.technologies.map((tech, index) =>
              <Badge key={index} variant="secondary" className="flex items-center gap-1" data-id="r06xs71jb" data-path="src/components/admin/RecommendationForm.tsx">
                  {tech}
                  <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTechnology(tech)} data-id="t1vqwlk4q" data-path="src/components/admin/RecommendationForm.tsx" />

                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2" data-id="te08ai4hu" data-path="src/components/admin/RecommendationForm.tsx">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange('is_active', checked)} data-id="evwzggyjo" data-path="src/components/admin/RecommendationForm.tsx" />

            <Label htmlFor="is_active" data-id="8ndeg135d" data-path="src/components/admin/RecommendationForm.tsx">Active</Label>
          </div>

          <div className="flex gap-4 pt-4" data-id="l3557mt7i" data-path="src/components/admin/RecommendationForm.tsx">
            <Button type="submit" disabled={isLoading} data-id="63qhwa90l" data-path="src/components/admin/RecommendationForm.tsx">
              {isLoading ? 'Saving...' : recommendation ? 'Update' : 'Create'} Recommendation
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} data-id="1k3dc2r7q" data-path="src/components/admin/RecommendationForm.tsx">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>);

};

export default RecommendationForm;