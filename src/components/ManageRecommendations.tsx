
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Search, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface RecommendationFormData {
  recommendation_id: string;
  title: string;
  description: string;
  priority: string;
  domain: string;
  technologies: string;
  effort: string;
  is_active: boolean;
}

const ManageRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null);
  const [formData, setFormData] = useState<RecommendationFormData>({
    recommendation_id: '',
    title: '',
    description: '',
    priority: 'medium',
    domain: '',
    technologies: '',
    effort: '',
    is_active: true
  });
  const { toast } = useToast();

  const tableId = 17255; // recommendations table ID

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const { data, error } = await window.ezsite.apis.tablePage(tableId, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: "ID",
        IsAsc: false,
        Filters: []
      });

      if (error) throw error;
      setRecommendations(data.List || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recommendations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const technologiesArray = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      const submissionData = {
        ...formData,
        technologies: JSON.stringify(technologiesArray)
      };

      if (editingRecommendation) {
        const { error } = await window.ezsite.apis.tableUpdate(tableId, {
          ID: editingRecommendation.ID,
          ...submissionData
        });
        if (error) throw error;
        toast({
          title: "Success",
          description: "Recommendation updated successfully",
        });
      } else {
        const { error } = await window.ezsite.apis.tableCreate(tableId, submissionData);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Recommendation created successfully",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchRecommendations();
    } catch (error) {
      console.error('Error saving recommendation:', error);
      toast({
        title: "Error",
        description: "Failed to save recommendation",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (recommendation: Recommendation) => {
    setEditingRecommendation(recommendation);
    let technologiesStr = '';
    try {
      const techArray = JSON.parse(recommendation.technologies);
      technologiesStr = Array.isArray(techArray) ? techArray.join(', ') : recommendation.technologies;
    } catch {
      technologiesStr = recommendation.technologies;
    }

    setFormData({
      recommendation_id: recommendation.recommendation_id,
      title: recommendation.title,
      description: recommendation.description,
      priority: recommendation.priority,
      domain: recommendation.domain,
      technologies: technologiesStr,
      effort: recommendation.effort,
      is_active: recommendation.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this recommendation?')) return;

    try {
      const { error } = await window.ezsite.apis.tableDelete(tableId, { ID: id });
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Recommendation deleted successfully",
      });
      fetchRecommendations();
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      toast({
        title: "Error",
        description: "Failed to delete recommendation",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      recommendation_id: '',
      title: '',
      description: '',
      priority: 'medium',
      domain: '',
      technologies: '',
      effort: '',
      is_active: true
    });
    setEditingRecommendation(null);
  };

  const filteredRecommendations = recommendations.filter(rec =>
    rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Manage Security Recommendations</span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Recommendation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingRecommendation ? 'Edit Recommendation' : 'Add New Recommendation'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingRecommendation ? 'Update the recommendation details below.' : 'Create a new security recommendation.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recommendation_id">Recommendation ID</Label>
                      <Input
                        id="recommendation_id"
                        value={formData.recommendation_id}
                        onChange={(e) => setFormData(prev => ({ ...prev, recommendation_id: e.target.value }))}
                        placeholder="e.g., REC-001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="domain">Domain</Label>
                      <Input
                        id="domain"
                        value={formData.domain}
                        onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                        placeholder="e.g., Network Security"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter recommendation title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter detailed description"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select 
                        value={formData.priority} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="effort">Effort</Label>
                      <Input
                        id="effort"
                        value={formData.effort}
                        onChange={(e) => setFormData(prev => ({ ...prev, effort: e.target.value }))}
                        placeholder="e.g., 2-4 weeks"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                      placeholder="e.g., Firewall, VPN, SIEM"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingRecommendation ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Create, edit, and manage security recommendations for assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search recommendations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={fetchRecommendations} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading recommendations...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Effort</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecommendations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No recommendations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecommendations.map((recommendation) => (
                      <TableRow key={recommendation.ID}>
                        <TableCell className="font-medium max-w-xs">
                          <div className="truncate" title={recommendation.title}>
                            {recommendation.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate" title={recommendation.description}>
                            {recommendation.description}
                          </div>
                        </TableCell>
                        <TableCell>{recommendation.domain}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(recommendation.priority)}>
                            {recommendation.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{recommendation.effort}</TableCell>
                        <TableCell>
                          <Badge variant={recommendation.is_active ? "default" : "secondary"}>
                            {recommendation.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(recommendation)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(recommendation.ID)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageRecommendations;
