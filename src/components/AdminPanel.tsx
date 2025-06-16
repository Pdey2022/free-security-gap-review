import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Settings, Database } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AdminRecommendationForm from '@/components/AdminRecommendationForm';

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

const AdminPanel: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null);
  const [showForm, setShowForm] = useState(false);

  const tableId = 17255; // recommendations table ID

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(tableId, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: "ID",
        IsAsc: false,
        Filters: []
      });

      if (error) throw error;
      
      setRecommendations(data?.List || []);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to load recommendations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this recommendation?')) return;

    try {
      const { error } = await window.ezsite.apis.tableDelete(tableId, { ID: id });
      if (error) throw error;

      setRecommendations(prev => prev.filter(rec => rec.ID !== id));
      
      toast({
        title: "Success",
        description: "Recommendation deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      toast({
        title: "Error",
        description: "Failed to delete recommendation",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (recommendation: Recommendation) => {
    setEditingRecommendation(recommendation);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingRecommendation(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingRecommendation(null);
    loadRecommendations(); // Refresh the list
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin Control Panel
              </CardTitle>
              <CardDescription>
                Manage security recommendations and system settings
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Administrator
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Recommendations ({recommendations.length})
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Security Recommendations</h3>
            <Button onClick={handleCreate} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Recommendation
            </Button>
          </div>

          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.ID} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{rec.title}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                        <Badge variant={rec.is_active ? "default" : "secondary"}>
                          {rec.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-2 line-clamp-2">{rec.description}</p>
                      
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                        <span className="font-medium">Domain:</span>
                        <span>{rec.domain}</span>
                        <span>•</span>
                        <span className="font-medium">Effort:</span>
                        <span>{rec.effort}</span>
                        <span>•</span>
                        <span className="font-medium">ID:</span>
                        <span>{rec.recommendation_id}</span>
                      </div>
                      
                      {rec.technologies && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Technologies: </span>
                          <span className="text-sm text-gray-600">{rec.technologies}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(rec)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(rec.ID)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {recommendations.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first security recommendation.</p>
                <Button onClick={handleCreate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Recommendation
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Assessment Settings</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Configure default assessment parameters and scoring criteria
                  </p>
                  <Button variant="outline" size="sm">
                    Configure Assessment
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Report Templates</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Customize report formats and branding
                  </p>
                  <Button variant="outline" size="sm">
                    Manage Templates
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">User Management</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage user access and permissions
                  </p>
                  <Button variant="outline" size="sm">
                    Manage Users
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showForm && (
        <AdminRecommendationForm
          recommendation={editingRecommendation}
          onClose={handleFormClose}
          tableId={tableId}
        />
      )}
    </div>
  );
};

export default AdminPanel;