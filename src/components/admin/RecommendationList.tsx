import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Clock, Shield } from 'lucide-react';

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

interface RecommendationListProps {
  recommendations: Recommendation[];
  isLoading: boolean;
  onEdit: (recommendation: Recommendation) => void;
  onDelete: (recommendation: Recommendation) => void;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  isLoading,
  onEdit,
  onDelete
}) => {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getDomainIcon = (domain: string) => {
    return <Shield className="h-4 w-4" />;
  };

  const parseTechnologies = (techString: string): string[] => {
    try {
      return JSON.parse(techString || '[]');
    } catch {
      return [];
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600">Create your first security recommendation to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.ID} className={`transition-all hover:shadow-lg ${!recommendation.is_active ? 'opacity-60' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getDomainIcon(recommendation.domain)}
                  <h3 className="text-lg font-semibold">{recommendation.title}</h3>
                  <Badge variant={getPriorityVariant(recommendation.priority)}>
                    {recommendation.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    {recommendation.domain.charAt(0).toUpperCase() + recommendation.domain.slice(1)}
                  </Badge>
                  {!recommendation.is_active && (
                    <Badge variant="secondary">INACTIVE</Badge>
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">{recommendation.description}</p>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {recommendation.effort}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {recommendation.recommendation_id}
                  </div>
                </div>
                
                {parseTechnologies(recommendation.technologies).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {parseTechnologies(recommendation.technologies).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(recommendation)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(recommendation)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecommendationList;