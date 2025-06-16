import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Trash2, Settings } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import AdminRecommendationForm from '@/components/AdminRecommendationForm'

interface Recommendation {
  id: number
  recommendation_id: string
  title: string
  description: string
  priority: string
  domain: string
  technologies: string[]
  effort: string
  is_active: boolean
}

const AdminPanel: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    try {
      setLoading(true)
      const { data, error } = await window.ezsite.apis.tablePage(17255, {
        "PageNo": 1,
        "PageSize": 100,
        "OrderByField": "id",
        "IsAsc": false,
        "Filters": []
      })
      
      if (error) throw error
      
      // Parse technologies field if it's a string
      const processedRecommendations = data.List.map((rec: any) => ({
        ...rec,
        technologies: typeof rec.technologies === 'string' 
          ? JSON.parse(rec.technologies || '[]')
          : rec.technologies || []
      }))
      
      setRecommendations(processedRecommendations)
    } catch (error) {
      console.error('Error loading recommendations:', error)
      toast({
        title: "Error",
        description: "Failed to load recommendations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (recommendation: Recommendation) => {
    setEditingRecommendation(recommendation)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(17255, { "ID": id })
      if (error) throw error
      
      toast({
        title: "Success",
        description: "Recommendation deleted successfully",
      })
      
      loadRecommendations()
    } catch (error) {
      console.error('Error deleting recommendation:', error)
      toast({
        title: "Error",
        description: "Failed to delete recommendation",
        variant: "destructive",
      })
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingRecommendation(null)
    loadRecommendations()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
          <p className="text-slate-400">Manage security recommendations</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Recommendation
        </Button>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 bg-slate-800 border-slate-700">
          <TabsTrigger value="recommendations" className="text-slate-300 data-[state=active]:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{recommendation.title}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {recommendation.domain} • {recommendation.effort}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={recommendation.priority === 'high' ? 'destructive' : 
                                   recommendation.priority === 'medium' ? 'default' : 'secondary'}>
                        {recommendation.priority}
                      </Badge>
                      <Badge variant={recommendation.is_active ? 'default' : 'secondary'}>
                        {recommendation.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">{recommendation.description}</p>
                  {recommendation.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recommendation.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(recommendation)}
                      className="border-slate-600 text-slate-300 hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(recommendation.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AdminRecommendationForm
        open={showForm}
        onClose={handleFormClose}
        recommendation={editingRecommendation}
      />
    </div>
  )
}

export default AdminPanel