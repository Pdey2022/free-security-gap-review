import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminRecommendationForm from '@/components/AdminRecommendationForm';

interface Recommendation {
  id: number;
  recommendation_id: string;
  title: string;
  description: string;
  priority: string;
  domain: string;
  technologies: string[];
  effort: string;
  is_active: boolean;
}

const AdminPanel: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const { data, error } = await window.ezsite.apis.tablePage(17255, {
        "PageNo": 1,
        "PageSize": 100,
        "OrderByField": "id",
        "IsAsc": false,
        "Filters": []
      });

      if (error) throw error;

      // Parse technologies field if it's a string
      const processedRecommendations = data.List.map((rec: any) => ({
        ...rec,
        technologies: typeof rec.technologies === 'string' ?
        JSON.parse(rec.technologies || '[]') :
        rec.technologies || []
      }));

      setRecommendations(processedRecommendations);
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

  const handleEdit = (recommendation: Recommendation) => {
    setEditingRecommendation(recommendation);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(17255, { "ID": id });
      if (error) throw error;

      toast({
        title: "Success",
        description: "Recommendation deleted successfully"
      });

      loadRecommendations();
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      toast({
        title: "Error",
        description: "Failed to delete recommendation",
        variant: "destructive"
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingRecommendation(null);
    loadRecommendations();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" data-id="peuvmhemu" data-path="src/components/AdminPanel.tsx">
        <div className="text-white" data-id="uqg3jz0xn" data-path="src/components/AdminPanel.tsx">Loading...</div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="v31kh7717" data-path="src/components/AdminPanel.tsx">
      <div className="flex justify-between items-center" data-id="8szqegkvx" data-path="src/components/AdminPanel.tsx">
        <div data-id="dv2rm5u3u" data-path="src/components/AdminPanel.tsx">
          <h2 className="text-3xl font-bold text-white" data-id="lgv79w7tj" data-path="src/components/AdminPanel.tsx">Admin Panel</h2>
          <p className="text-slate-400" data-id="43z6a6h03" data-path="src/components/AdminPanel.tsx">Manage security recommendations</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700" data-id="pvm8tjc2r" data-path="src/components/AdminPanel.tsx">
          <Plus className="h-4 w-4 mr-2" data-id="lapl5u7yr" data-path="src/components/AdminPanel.tsx" />
          Add Recommendation
        </Button>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4" data-id="d0hwwnbj7" data-path="src/components/AdminPanel.tsx">
        <TabsList className="grid w-full grid-cols-1 bg-slate-800 border-slate-700" data-id="hkchgn555" data-path="src/components/AdminPanel.tsx">
          <TabsTrigger value="recommendations" className="text-slate-300 data-[state=active]:text-white" data-id="i2d9dxhsp" data-path="src/components/AdminPanel.tsx">
            <Settings className="h-4 w-4 mr-2" data-id="nf28sqxc9" data-path="src/components/AdminPanel.tsx" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4" data-id="ic7brlt7h" data-path="src/components/AdminPanel.tsx">
          <div className="grid gap-4" data-id="kvgts1wuz" data-path="src/components/AdminPanel.tsx">
            {recommendations.map((recommendation) =>
            <Card key={recommendation.id} className="bg-slate-800/50 border-slate-700" data-id="4s96tx5ry" data-path="src/components/AdminPanel.tsx">
                <CardHeader data-id="9ah7pgi2c" data-path="src/components/AdminPanel.tsx">
                  <div className="flex justify-between items-start" data-id="7ug1q71n6" data-path="src/components/AdminPanel.tsx">
                    <div data-id="87lkjq7wk" data-path="src/components/AdminPanel.tsx">
                      <CardTitle className="text-white" data-id="f3hap8uxo" data-path="src/components/AdminPanel.tsx">{recommendation.title}</CardTitle>
                      <CardDescription className="text-slate-400" data-id="iqzr0t5st" data-path="src/components/AdminPanel.tsx">
                        {recommendation.domain} • {recommendation.effort}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2" data-id="pvgm0hzv5" data-path="src/components/AdminPanel.tsx">
                      <Badge variant={recommendation.priority === 'high' ? 'destructive' :
                    recommendation.priority === 'medium' ? 'default' : 'secondary'} data-id="gxpow6ujx" data-path="src/components/AdminPanel.tsx">
                        {recommendation.priority}
                      </Badge>
                      <Badge variant={recommendation.is_active ? 'default' : 'secondary'} data-id="5y40r3ill" data-path="src/components/AdminPanel.tsx">
                        {recommendation.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent data-id="2h4pjd7qd" data-path="src/components/AdminPanel.tsx">
                  <p className="text-slate-300 mb-4" data-id="ji2wl8lfu" data-path="src/components/AdminPanel.tsx">{recommendation.description}</p>
                  {recommendation.technologies.length > 0 &&
                <div className="flex flex-wrap gap-2 mb-4" data-id="h8efu17bu" data-path="src/components/AdminPanel.tsx">
                      {recommendation.technologies.map((tech, index) =>
                  <Badge key={index} variant="outline" className="text-slate-300" data-id="cqhzj9r9u" data-path="src/components/AdminPanel.tsx">
                          {tech}
                        </Badge>
                  )}
                    </div>
                }
                  <div className="flex gap-2" data-id="9m3hkt2cf" data-path="src/components/AdminPanel.tsx">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(recommendation)}
                    className="border-slate-600 text-slate-300 hover:text-white" data-id="n4x5ulpfz" data-path="src/components/AdminPanel.tsx">

                      <Edit className="h-4 w-4 mr-2" data-id="r7gd4f704" data-path="src/components/AdminPanel.tsx" />
                      Edit
                    </Button>
                    <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(recommendation.id)} data-id="w0qmwb83t" data-path="src/components/AdminPanel.tsx">

                      <Trash2 className="h-4 w-4 mr-2" data-id="xlnkcgfna" data-path="src/components/AdminPanel.tsx" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <AdminRecommendationForm
        open={showForm}
        onClose={handleFormClose}
        recommendation={editingRecommendation} data-id="ek5q9f897" data-path="src/components/AdminPanel.tsx" />

    </div>);

};

export default AdminPanel;