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
      case 'high':return 'destructive';
      case 'medium':return 'default';
      case 'low':return 'secondary';
      default:return 'outline';
    }
  };

  const getDomainIcon = (domain: string) => {
    return <Shield className="h-4 w-4" data-id="t6kf14l1c" data-path="src/components/admin/RecommendationList.tsx" />;
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
      <div className="space-y-4" data-id="ax8sq1x4j" data-path="src/components/admin/RecommendationList.tsx">
        {[...Array(3)].map((_, i) =>
        <Card key={i} data-id="ots3wk0ce" data-path="src/components/admin/RecommendationList.tsx">
            <CardContent className="p-6" data-id="p80f4ll02" data-path="src/components/admin/RecommendationList.tsx">
              <div className="animate-pulse" data-id="oj3mzmgti" data-path="src/components/admin/RecommendationList.tsx">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" data-id="e26pltk85" data-path="src/components/admin/RecommendationList.tsx"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" data-id="21fypfygz" data-path="src/components/admin/RecommendationList.tsx"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2" data-id="ywfdveele" data-path="src/components/admin/RecommendationList.tsx"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3" data-id="xjv5e1afx" data-path="src/components/admin/RecommendationList.tsx"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>);

  }

  if (recommendations.length === 0) {
    return (
      <Card data-id="gbduvh76g" data-path="src/components/admin/RecommendationList.tsx">
        <CardContent className="p-12 text-center" data-id="ut8knmbxk" data-path="src/components/admin/RecommendationList.tsx">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="u2ujxd3mx" data-path="src/components/admin/RecommendationList.tsx" />
          <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="79s0anwxx" data-path="src/components/admin/RecommendationList.tsx">No recommendations found</h3>
          <p className="text-gray-600" data-id="f5fidrwn5" data-path="src/components/admin/RecommendationList.tsx">Create your first security recommendation to get started.</p>
        </CardContent>
      </Card>);

  }

  return (
    <div className="space-y-4" data-id="c598k7u4u" data-path="src/components/admin/RecommendationList.tsx">
      {recommendations.map((recommendation) =>
      <Card key={recommendation.ID} className={`transition-all hover:shadow-lg ${!recommendation.is_active ? 'opacity-60' : ''}`} data-id="8w11sq4a1" data-path="src/components/admin/RecommendationList.tsx">
          <CardContent className="p-6" data-id="dqfmj9jiq" data-path="src/components/admin/RecommendationList.tsx">
            <div className="flex items-start justify-between" data-id="wzzg92e30" data-path="src/components/admin/RecommendationList.tsx">
              <div className="flex-1" data-id="hc422guoi" data-path="src/components/admin/RecommendationList.tsx">
                <div className="flex items-center gap-3 mb-2" data-id="akqzrgrl6" data-path="src/components/admin/RecommendationList.tsx">
                  {getDomainIcon(recommendation.domain)}
                  <h3 className="text-lg font-semibold" data-id="nvg5ef3en" data-path="src/components/admin/RecommendationList.tsx">{recommendation.title}</h3>
                  <Badge variant={getPriorityVariant(recommendation.priority)} data-id="um6jjbi80" data-path="src/components/admin/RecommendationList.tsx">
                    {recommendation.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" data-id="p4dxbivc1" data-path="src/components/admin/RecommendationList.tsx">
                    {recommendation.domain.charAt(0).toUpperCase() + recommendation.domain.slice(1)}
                  </Badge>
                  {!recommendation.is_active &&
                <Badge variant="secondary" data-id="yj0zoxk4j" data-path="src/components/admin/RecommendationList.tsx">INACTIVE</Badge>
                }
                </div>
                
                <p className="text-gray-600 mb-3" data-id="scf2vxa1r" data-path="src/components/admin/RecommendationList.tsx">{recommendation.description}</p>
                
                <div className="flex items-center gap-4 mb-3" data-id="9zfshx85j" data-path="src/components/admin/RecommendationList.tsx">
                  <div className="flex items-center gap-1 text-sm text-gray-500" data-id="3kgnp2fi1" data-path="src/components/admin/RecommendationList.tsx">
                    <Clock className="h-4 w-4" data-id="2qu6c2sti" data-path="src/components/admin/RecommendationList.tsx" />
                    {recommendation.effort}
                  </div>
                  <div className="text-sm text-gray-500" data-id="azbux1u9x" data-path="src/components/admin/RecommendationList.tsx">
                    ID: {recommendation.recommendation_id}
                  </div>
                </div>
                
                {parseTechnologies(recommendation.technologies).length > 0 &&
              <div className="flex flex-wrap gap-1 mb-3" data-id="pmmh7kog9" data-path="src/components/admin/RecommendationList.tsx">
                    {parseTechnologies(recommendation.technologies).map((tech, index) =>
                <Badge key={index} variant="outline" className="text-xs" data-id="r2ec5dw28" data-path="src/components/admin/RecommendationList.tsx">
                        {tech}
                      </Badge>
                )}
                  </div>
              }
              </div>
              
              <div className="flex gap-2 ml-4" data-id="u767vk6f2" data-path="src/components/admin/RecommendationList.tsx">
                <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(recommendation)} data-id="wozzni96w" data-path="src/components/admin/RecommendationList.tsx">

                  <Edit className="h-4 w-4" data-id="oxxo1skb0" data-path="src/components/admin/RecommendationList.tsx" />
                </Button>
                <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(recommendation)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50" data-id="89nz6npr3" data-path="src/components/admin/RecommendationList.tsx">

                  <Trash2 className="h-4 w-4" data-id="ufistkqh6" data-path="src/components/admin/RecommendationList.tsx" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>);

};

export default RecommendationList;