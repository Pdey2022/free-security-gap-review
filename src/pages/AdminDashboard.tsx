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
      <div className="min-h-screen bg-gray-50" data-id="a7gjqxg1a" data-path="src/pages/AdminDashboard.tsx">
        <div className="border-b bg-white px-6 py-4" data-id="xvclmphdf" data-path="src/pages/AdminDashboard.tsx">
          <div className="flex items-center justify-between" data-id="zqysumok0" data-path="src/pages/AdminDashboard.tsx">
            <div className="flex items-center gap-3" data-id="9y1ntma65" data-path="src/pages/AdminDashboard.tsx">
              <Shield className="h-6 w-6 text-blue-600" data-id="hfxrfet8y" data-path="src/pages/AdminDashboard.tsx" />
              <h1 className="text-xl font-semibold" data-id="4vvoi9v46" data-path="src/pages/AdminDashboard.tsx">
                {editingRecommendation ? 'Edit Recommendation' : 'Add New Recommendation'}
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setEditingRecommendation(null);
              }} data-id="munwiasdp" data-path="src/pages/AdminDashboard.tsx">

              Cancel
            </Button>
          </div>
        </div>
        
        <div className="p-6" data-id="7xky6qnfy" data-path="src/pages/AdminDashboard.tsx">
          <RecommendationForm
            recommendation={editingRecommendation}
            onSave={handleSaveRecommendation}
            onCancel={() => {
              setShowForm(false);
              setEditingRecommendation(null);
            }} data-id="lbj3qci38" data-path="src/pages/AdminDashboard.tsx" />

        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gray-50" data-id="9p0nr4ocd" data-path="src/pages/AdminDashboard.tsx">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4" data-id="7dmz2kizy" data-path="src/pages/AdminDashboard.tsx">
        <div className="flex items-center justify-between" data-id="8rjcowmkr" data-path="src/pages/AdminDashboard.tsx">
          <div className="flex items-center gap-3" data-id="zyadaf1en" data-path="src/pages/AdminDashboard.tsx">
            <Shield className="h-6 w-6 text-blue-600" data-id="j7a2iqo22" data-path="src/pages/AdminDashboard.tsx" />
            <h1 className="text-xl font-semibold" data-id="hocwlamkv" data-path="src/pages/AdminDashboard.tsx">Security Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} data-id="w5vnpvpl0" data-path="src/pages/AdminDashboard.tsx">
            <LogOut className="h-4 w-4 mr-2" data-id="jjdgculqc" data-path="src/pages/AdminDashboard.tsx" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6" data-id="7zzbtgdoz" data-path="src/pages/AdminDashboard.tsx">
        <Tabs defaultValue="recommendations" className="space-y-6" data-id="iac2cesfx" data-path="src/pages/AdminDashboard.tsx">
          <TabsList data-id="f4tncinlg" data-path="src/pages/AdminDashboard.tsx">
            <TabsTrigger value="recommendations" data-id="klnq77mkn" data-path="src/pages/AdminDashboard.tsx">Recommendations</TabsTrigger>
            <TabsTrigger value="analytics" data-id="9umoq032t" data-path="src/pages/AdminDashboard.tsx">Analytics</TabsTrigger>
            <TabsTrigger value="settings" data-id="0r85yn1gb" data-path="src/pages/AdminDashboard.tsx">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6" data-id="0xuzr022b" data-path="src/pages/AdminDashboard.tsx">
            {error &&
            <Alert variant="destructive" data-id="ybdvsiami" data-path="src/pages/AdminDashboard.tsx">
                <AlertDescription data-id="ecozkz1zc" data-path="src/pages/AdminDashboard.tsx">{error}</AlertDescription>
              </Alert>
            }

            {/* Show seed data component if no recommendations exist */}
            {!isLoading && recommendations.length === 0 &&
            <div className="flex justify-center" data-id="t75hz122y" data-path="src/pages/AdminDashboard.tsx">
                <SeedData data-id="ao30ei3z0" data-path="src/pages/AdminDashboard.tsx" />
              </div>
            }

            {/* Stats Cards - only show if we have recommendations */}
            {recommendations.length > 0 &&
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="h2n1mujqs" data-path="src/pages/AdminDashboard.tsx">
                <Card data-id="3q8wv4x71" data-path="src/pages/AdminDashboard.tsx">
                  <CardContent className="p-4" data-id="6dqggyzhb" data-path="src/pages/AdminDashboard.tsx">
                    <div className="flex items-center gap-2" data-id="oeh7m7mop" data-path="src/pages/AdminDashboard.tsx">
                      <BarChart3 className="h-4 w-4 text-blue-600" data-id="imxsj7h0c" data-path="src/pages/AdminDashboard.tsx" />
                      <span className="text-sm font-medium" data-id="sym2snzoc" data-path="src/pages/AdminDashboard.tsx">Total Recommendations</span>
                    </div>
                    <p className="text-2xl font-bold mt-2" data-id="436ellqey" data-path="src/pages/AdminDashboard.tsx">{recommendations.length}</p>
                  </CardContent>
                </Card>
                
                <Card data-id="x6airz1du" data-path="src/pages/AdminDashboard.tsx">
                  <CardContent className="p-4" data-id="ybt4maxmk" data-path="src/pages/AdminDashboard.tsx">
                    <div className="flex items-center gap-2" data-id="adsig6sq5" data-path="src/pages/AdminDashboard.tsx">
                      <Badge variant="destructive" className="text-xs" data-id="87y53og2x" data-path="src/pages/AdminDashboard.tsx">HIGH</Badge>
                      <span className="text-sm font-medium" data-id="11kdlozb1" data-path="src/pages/AdminDashboard.tsx">High Priority</span>
                    </div>
                    <p className="text-2xl font-bold mt-2" data-id="b443qwa1f" data-path="src/pages/AdminDashboard.tsx">
                      {recommendations.filter((r) => r.priority === 'high').length}
                    </p>
                  </CardContent>
                </Card>
                
                <Card data-id="w49bo5my7" data-path="src/pages/AdminDashboard.tsx">
                  <CardContent className="p-4" data-id="t4ikq2dyd" data-path="src/pages/AdminDashboard.tsx">
                    <div className="flex items-center gap-2" data-id="11vuet3t4" data-path="src/pages/AdminDashboard.tsx">
                      <Badge variant="secondary" className="text-xs" data-id="f8xdidkd9" data-path="src/pages/AdminDashboard.tsx">MEDIUM</Badge>
                      <span className="text-sm font-medium" data-id="ozcakaqaq" data-path="src/pages/AdminDashboard.tsx">Medium Priority</span>
                    </div>
                    <p className="text-2xl font-bold mt-2" data-id="so8e27zo1" data-path="src/pages/AdminDashboard.tsx">
                      {recommendations.filter((r) => r.priority === 'medium').length}
                    </p>
                  </CardContent>
                </Card>
                
                <Card data-id="2f7kyn0m6" data-path="src/pages/AdminDashboard.tsx">
                  <CardContent className="p-4" data-id="z9n8p9wwk" data-path="src/pages/AdminDashboard.tsx">
                    <div className="flex items-center gap-2" data-id="mbv0x3bhs" data-path="src/pages/AdminDashboard.tsx">
                      <Badge variant="outline" className="text-xs" data-id="66gamlmvf" data-path="src/pages/AdminDashboard.tsx">LOW</Badge>
                      <span className="text-sm font-medium" data-id="1227kpaig" data-path="src/pages/AdminDashboard.tsx">Low Priority</span>
                    </div>
                    <p className="text-2xl font-bold mt-2" data-id="uu8mnu0rh" data-path="src/pages/AdminDashboard.tsx">
                      {recommendations.filter((r) => r.priority === 'low').length}
                    </p>
                  </CardContent>
                </Card>
              </div>
            }

            {/* Actions Bar - only show if we have recommendations */}
            {recommendations.length > 0 &&
            <>
                <div className="flex items-center justify-between gap-4" data-id="o19e9ogms" data-path="src/pages/AdminDashboard.tsx">
                  <div className="flex items-center gap-4" data-id="8iks6y6q7" data-path="src/pages/AdminDashboard.tsx">
                    <div className="relative" data-id="f3qe4vhaq" data-path="src/pages/AdminDashboard.tsx">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" data-id="lnhm3jej3" data-path="src/pages/AdminDashboard.tsx" />
                      <Input
                      placeholder="Search recommendations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64" data-id="5ysgc1rew" data-path="src/pages/AdminDashboard.tsx" />

                    </div>
                  </div>
                  
                  <Button onClick={() => setShowForm(true)} data-id="jz1wb3142" data-path="src/pages/AdminDashboard.tsx">
                    <Plus className="h-4 w-4 mr-2" data-id="5ni6s1lps" data-path="src/pages/AdminDashboard.tsx" />
                    Add Recommendation
                  </Button>
                </div>

                {/* Recommendations List */}
                <RecommendationList
                recommendations={filteredRecommendations}
                isLoading={isLoading}
                onEdit={handleEditRecommendation}
                onDelete={handleDeleteRecommendation} data-id="9vqsz6myu" data-path="src/pages/AdminDashboard.tsx" />

              </>
            }
          </TabsContent>

          <TabsContent value="analytics" data-id="g551hosca" data-path="src/pages/AdminDashboard.tsx">
            <Card data-id="3nt43rycf" data-path="src/pages/AdminDashboard.tsx">
              <CardHeader data-id="om876hrrk" data-path="src/pages/AdminDashboard.tsx">
                <CardTitle data-id="px02lt9ua" data-path="src/pages/AdminDashboard.tsx">Analytics Dashboard</CardTitle>
                <CardDescription data-id="3u5eqwv94" data-path="src/pages/AdminDashboard.tsx">
                  View statistics and insights about your security recommendations
                </CardDescription>
              </CardHeader>
              <CardContent data-id="zwf21bciu" data-path="src/pages/AdminDashboard.tsx">
                <p className="text-gray-600" data-id="vxufrmjbw" data-path="src/pages/AdminDashboard.tsx">Analytics features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" data-id="k3kks2dkg" data-path="src/pages/AdminDashboard.tsx">
            <Card data-id="6yh703hfq" data-path="src/pages/AdminDashboard.tsx">
              <CardHeader data-id="jho93iqvc" data-path="src/pages/AdminDashboard.tsx">
                <CardTitle data-id="2hwlr0ri7" data-path="src/pages/AdminDashboard.tsx">System Settings</CardTitle>
                <CardDescription data-id="biehi2jdr" data-path="src/pages/AdminDashboard.tsx">
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent data-id="worygjafo" data-path="src/pages/AdminDashboard.tsx">
                <p className="text-gray-600" data-id="ege1fylmj" data-path="src/pages/AdminDashboard.tsx">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>);

};

export default AdminDashboard;