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
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  RefreshCw, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  MoreHorizontal,
  Archive,
  CheckSquare,
  X,
  Download,
  Upload
} from 'lucide-react';
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

interface FilterState {
  priority: string[];
  domain: string[];
  status: string[];
  effort: string[];
}

const ManageRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortField, setSortField] = useState<string>('ID');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState<FilterState>({
    priority: [],
    domain: [],
    status: [],
    effort: []
  });

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
  const tableId = 17255;

  // Available filter options
  const priorityOptions = ['high', 'medium', 'low'];
  const statusOptions = ['active', 'inactive'];
  const effortOptions = ['1-2 weeks', '2-4 weeks', '1-2 months', '2-6 months', '6+ months'];

  // Get unique domains from recommendations
  const domainOptions = [...new Set(recommendations.map(rec => rec.domain).filter(Boolean))];

  useEffect(() => {
    fetchRecommendations();
  }, [currentPage, pageSize, sortField, sortDirection, filters]);

  const buildFilters = () => {
    const apiFilters = [];

    // Search term filter
    if (searchTerm.trim()) {
      apiFilters.push({
        name: 'title',
        op: 'StringContains',
        value: searchTerm.trim()
      });
    }

    // Priority filters
    if (filters.priority.length > 0) {
      filters.priority.forEach(priority => {
        apiFilters.push({
          name: 'priority',
          op: 'Equal',
          value: priority
        });
      });
    }

    // Domain filters
    if (filters.domain.length > 0) {
      filters.domain.forEach(domain => {
        apiFilters.push({
          name: 'domain',
          op: 'Equal',
          value: domain
        });
      });
    }

    // Status filters
    if (filters.status.length > 0) {
      filters.status.forEach(status => {
        apiFilters.push({
          name: 'is_active',
          op: 'Equal',
          value: status === 'active'
        });
      });
    }

    // Effort filters
    if (filters.effort.length > 0) {
      filters.effort.forEach(effort => {
        apiFilters.push({
          name: 'effort',
          op: 'StringContains',
          value: effort
        });
      });
    }

    return apiFilters;
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const { data, error } = await window.ezsite.apis.tablePage(tableId, {
        PageNo: currentPage,
        PageSize: pageSize,
        OrderByField: sortField,
        IsAsc: sortDirection === 'asc',
        Filters: buildFilters()
      });

      if (error) throw error;
      setRecommendations(data.List || []);
      setTotalCount(data.VirtualCount || 0);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recommendations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string, checked: boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
      return newFilters;
    });
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearAllFilters = () => {
    setFilters({
      priority: [],
      domain: [],
      status: [],
      effort: []
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(recommendations.map(rec => rec.ID));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select items to perform bulk action",
        variant: "destructive"
      });
      return;
    }

    const confirmMessage = action === 'delete' 
      ? `Are you sure you want to delete ${selectedItems.length} recommendations?`
      : `Are you sure you want to ${action} ${selectedItems.length} recommendations?`;

    if (!confirm(confirmMessage)) return;

    try {
      for (const id of selectedItems) {
        if (action === 'delete') {
          const { error } = await window.ezsite.apis.tableDelete(tableId, { ID: id });
          if (error) throw error;
        } else {
          const recommendation = recommendations.find(rec => rec.ID === id);
          if (recommendation) {
            const { error } = await window.ezsite.apis.tableUpdate(tableId, {
              ID: id,
              ...recommendation,
              is_active: action === 'activate'
            });
            if (error) throw error;
          }
        }
      }

      toast({
        title: "Success",
        description: `Bulk ${action} completed successfully`
      });
      setSelectedItems([]);
      fetchRecommendations();
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
      toast({
        title: "Error",
        description: `Failed to perform bulk ${action}`,
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const technologiesArray = formData.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

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
          description: "Recommendation updated successfully"
        });
      } else {
        const { error } = await window.ezsite.apis.tableCreate(tableId, submissionData);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Recommendation created successfully"
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
        variant: "destructive"
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
        description: "Recommendation deleted successfully"
      });
      fetchRecommendations();
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      toast({
        title: "Error",
        description: "Failed to delete recommendation",
        variant: "destructive"
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

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTotalPages = () => Math.ceil(totalCount / pageSize);

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((acc, filterArray) => acc + filterArray.length, 0) +
           (searchTerm.trim() ? 1 : 0);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Manage Security Recommendations</span>
            <div className="flex items-center space-x-2">
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
                          onChange={(e) => setFormData((prev) => ({ ...prev, recommendation_id: e.target.value }))}
                          placeholder="e.g., REC-001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="domain">Domain</Label>
                        <Input
                          id="domain"
                          value={formData.domain}
                          onChange={(e) => setFormData((prev) => ({ ...prev, domain: e.target.value }))}
                          placeholder="e.g., Network Security"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter recommendation title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
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
                          onChange={(e) => setFormData((prev) => ({ ...prev, effort: e.target.value }))}
                          placeholder="e.g., 2-4 weeks"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="technologies"
                        value={formData.technologies}
                        onChange={(e) => setFormData((prev) => ({ ...prev, technologies: e.target.value }))}
                        placeholder="e.g., Firewall, VPN, SIEM"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
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
            </div>
          </CardTitle>
          <CardDescription>
            Create, edit, and manage security recommendations with advanced filtering and bulk operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="space-y-4 mb-6">
            {/* Search Bar */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search recommendations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="relative"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" onClick={fetchRecommendations} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            {/* Filter Panel */}
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleContent>
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Advanced Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Priority Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Priority</Label>
                      <div className="space-y-2">
                        {priorityOptions.map(priority => (
                          <div key={priority} className="flex items-center space-x-2">
                            <Checkbox
                              id={`priority-${priority}`}
                              checked={filters.priority.includes(priority)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('priority', priority, checked as boolean)
                              }
                            />
                            <Label htmlFor={`priority-${priority}`} className="text-sm capitalize">
                              {priority}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Domain Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Domain</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {domainOptions.map(domain => (
                          <div key={domain} className="flex items-center space-x-2">
                            <Checkbox
                              id={`domain-${domain}`}
                              checked={filters.domain.includes(domain)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('domain', domain, checked as boolean)
                              }
                            />
                            <Label htmlFor={`domain-${domain}`} className="text-sm">
                              {domain}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Status</Label>
                      <div className="space-y-2">
                        {statusOptions.map(status => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.status.includes(status)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('status', status, checked as boolean)
                              }
                            />
                            <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                              {status}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Effort Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Effort</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {effortOptions.map(effort => (
                          <div key={effort} className="flex items-center space-x-2">
                            <Checkbox
                              id={`effort-${effort}`}
                              checked={filters.effort.includes(effort)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('effort', effort, checked as boolean)
                              }
                            />
                            <Label htmlFor={`effort-${effort}`} className="text-sm">
                              {effort}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <Card className="p-3 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedItems.length} item(s) selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBulkAction('activate')}
                    >
                      <CheckSquare className="h-3 w-3 mr-1" />
                      Activate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBulkAction('deactivate')}
                    >
                      <Archive className="h-3 w-3 mr-1" />
                      Deactivate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBulkAction('delete')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Results Table */}
          {loading ? (
            <div className="text-center py-8">Loading recommendations...</div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedItems.length === recommendations.length && recommendations.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('title')}
                      >
                        <div className="flex items-center">
                          Title
                          {sortField === 'title' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('domain')}
                      >
                        <div className="flex items-center">
                          Domain
                          {sortField === 'domain' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('priority')}
                      >
                        <div className="flex items-center">
                          Priority
                          {sortField === 'priority' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Effort</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort('is_active')}
                      >
                        <div className="flex items-center">
                          Status
                          {sortField === 'is_active' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recommendations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No recommendations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      recommendations.map((recommendation) => (
                        <TableRow key={recommendation.ID}>
                          <TableCell>
                            <Checkbox
                              checked={selectedItems.includes(recommendation.ID)}
                              onCheckedChange={(checked) => 
                                handleSelectItem(recommendation.ID, checked as boolean)
                              }
                            />
                          </TableCell>
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

              {/* Pagination */}
              {totalCount > pageSize && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} entries
                    </span>
                    <Select 
                      value={pageSize.toString()} 
                      onValueChange={(value) => {
                        setPageSize(Number(value));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {getTotalPages()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === getTotalPages()}
                    >
                      Next
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(getTotalPages())}
                      disabled={currentPage === getTotalPages()}
                    >
                      Last
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageRecommendations;