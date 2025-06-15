import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Settings,
  Users,
  BarChart3,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search } from
'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import RecommendationForm from '@/components/admin/RecommendationForm';
import RecommendationList from '@/components/admin/RecommendationList';
import SeedData from '@/components/admin/SeedData';

interface Recommendation {
  ID: number;
  recommendation_id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  domain: string;
  technologies: string;
  effort: string;
  is_active: boolean;
}

const AdminDashboard = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const TABLE_ID = 17255; // Recommendations table ID

  useEffect(() => {
    checkAuth();
    loadRecommendations();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: userInfo, error } = await window.ezsite.apis.getUserInfo();
      if (error || !userInfo) {
        navigate('/admin/login');
        return;
      }
      console.log('Admin authenticated:', userInfo);
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/admin/login');
    }
  };

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      console.log('Loading recommendations...');

      const { data, error } = await window.ezsite.apis.tablePage(TABLE_ID, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'ID',
        IsAsc: false,
        Filters: []
      });

      if (error) {
        throw new Error(error);
      }

      console.log('Recommendations loaded:', data);
      setRecommendations(data?.List || []);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setError(error instanceof Error ? error.message : 'Failed to load recommendations');
      toast({
        title: "Error",
        description: "Failed to load recommendations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await window.ezsite.apis.logout();
      localStorage.removeItem('adminAuth');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin/login');
    }
  };

  const handleSaveRecommendation = async (formData: any) => {
    try {
      console.log('Saving recommendation:', formData);

      if (editingRecommendation) {
        // Update existing recommendation
        const { error } = await window.ezsite.apis.tableUpdate(TABLE_ID, {
          ID: editingRecommendation.ID,
          ...formData
        });

        if (error) throw new Error(error);

        toast({
          title: "Success",
          description: "Recommendation updated successfully"
        });
      } else {
        // Create new recommendation
        const { error } = await window.ezsite.apis.tableCreate(TABLE_ID, formData);

        if (error) throw new Error(error);

        toast({
          title: "Success",
          description: "Recommendation created successfully"
        });
      }

      setShowForm(false);
      setEditingRecommendation(null);
      loadRecommendations();
    } catch (error) {
      console.error('Error saving recommendation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to save recommendation',
        variant: "destructive"
      });
    }
  };

  const handleEditRecommendation = (recommendation: Recommendation) => {
    setEditingRecommendation(recommendation);
    setShowForm(true);
  };

  const handleDeleteRecommendation = async (recommendation: Recommendation) => {
    if (!confirm('Are you sure you want to delete this recommendation?')) {
      return;
    }

    try {
      const { error } = await window.ezsite.apis.tableDelete(TABLE_ID, { ID: recommendation.ID });

      if (error) throw new Error(error);

      toast({
        title: "Success",
        description: "Recommendation deleted successfully"
      });

      loadRecommendations();
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to delete recommendation',
        variant: "destructive"
      });
    }
  };

  const filteredRecommendations = recommendations.filter((rec) =>
  rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  rec.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
  rec.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">
                {editingRecommendation ? 'Edit Recommendation' : 'Add New Recommendation'}
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setEditingRecommendation(null);
              }}>

              Cancel
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <RecommendationForm
            recommendation={editingRecommendation}
            onSave={handleSaveRecommendation}
            onCancel={() => {
              setShowForm(false);
              setEditingRecommendation(null);
            }} />

        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold">Security Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            {error &&
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            }

            {/* Show seed data component if no recommendations exist */}
            {!isLoading && recommendations.length === 0 &&
            <div className="flex justify-center">
                <SeedData />
              </div>
            }

            {/* Stats Cards - only show if we have recommendations */}
            {recommendations.length > 0 &&
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Total Recommendations</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{recommendations.length}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="text-xs">HIGH</Badge>
                      <span className="text-sm font-medium">High Priority</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">
                      {recommendations.filter((r) => r.priority === 'high').length}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">MEDIUM</Badge>
                      <span className="text-sm font-medium">Medium Priority</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">
                      {recommendations.filter((r) => r.priority === 'medium').length}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">LOW</Badge>
                      <span className="text-sm font-medium">Low Priority</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">
                      {recommendations.filter((r) => r.priority === 'low').length}
                    </p>
                  </CardContent>
                </Card>
              </div>
            }

            {/* Actions Bar - only show if we have recommendations */}
            {recommendations.length > 0 &&
            <>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                      placeholder="Search recommendations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64" />

                    </div>
                  </div>
                  
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Recommendation
                  </Button>
                </div>

                {/* Recommendations List */}
                <RecommendationList
                recommendations={filteredRecommendations}
                isLoading={isLoading}
                onEdit={handleEditRecommendation}
                onDelete={handleDeleteRecommendation} />

              </>
            }
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  View statistics and insights about your security recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>);

};

export default AdminDashboard;