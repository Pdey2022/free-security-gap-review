import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Shield, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { AssessmentState, Recommendation } from '@/types/assessment';
import { securityDomains } from '@/data/securityDomains';
import NISTMaturityChart from './NISTMaturityChart';
import { recommendationDatabase } from '@/data/recommendations-db';

interface RecommendationsViewProps {
  assessmentState: AssessmentState;
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({ assessmentState }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [assessmentState]);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      console.log('Loading recommendations with assessment state:', assessmentState);
      
      const recs = await recommendationDatabase(assessmentState.answers);
      setRecommendations(recs);
      console.log('Loaded recommendations:', recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // If there's an error, try to load static recommendations as fallback
      try {
        const { recommendationDatabase: staticRecommendations } = await import('@/data/recommendations');
        const fallbackRecs = staticRecommendations(assessmentState.answers);
        setRecommendations(fallbackRecs);
      } catch (fallbackError) {
        console.error('Error loading fallback recommendations:', fallbackError);
        setRecommendations([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getDomainIcon = (domainId: string) => {
    const domain = securityDomains.find(d => d.id === domainId);
    return domain?.icon || '🔒';
  };

  const groupedRecommendations = recommendations.reduce((acc, rec) => {
    if (!acc[rec.domain]) {
      acc[rec.domain] = [];
    }
    acc[rec.domain].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  const highPriorityRecommendations = recommendations.filter(r => r.priority === 'high');
  const mediumPriorityRecommendations = recommendations.filter(r => r.priority === 'medium');
  const lowPriorityRecommendations = recommendations.filter(r => r.priority === 'low');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Security Recommendations</h2>
        <p className="text-gray-600">
          Based on your assessment, here are personalized recommendations to improve your security posture
        </p>
      </div>

      {recommendations.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations available</h3>
            <p className="text-gray-600">
              Complete the security assessment to receive personalized recommendations.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({recommendations.length})</TabsTrigger>
            <TabsTrigger value="high">High ({highPriorityRecommendations.length})</TabsTrigger>
            <TabsTrigger value="medium">Medium ({mediumPriorityRecommendations.length})</TabsTrigger>
            <TabsTrigger value="low">Low ({lowPriorityRecommendations.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {Object.entries(groupedRecommendations).map(([domain, domainRecs]) => (
              <div key={domain} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getDomainIcon(domain)}</span>
                  <h3 className="text-xl font-semibold capitalize">{domain.replace('_', ' ')}</h3>
                  <Badge variant="outline">{domainRecs.length} recommendations</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {domainRecs.map((recommendation) => (
                    <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base leading-tight">
                            {recommendation.title}
                          </CardTitle>
                          <Badge variant={getPriorityColor(recommendation.priority) as any}>
                            {recommendation.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm">
                          {recommendation.description}
                        </CardDescription>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {getPriorityIcon(recommendation.priority)}
                          <span>Priority: {recommendation.priority}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Effort: {recommendation.effort}</span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Recommended Technologies:</p>
                          <div className="flex flex-wrap gap-1">
                            {recommendation.technologies.slice(0, 3).map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {recommendation.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{recommendation.technologies.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="high">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highPriorityRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="hover:shadow-lg transition-shadow border-red-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-tight">
                        {recommendation.title}
                      </CardTitle>
                      <Badge variant="destructive">HIGH</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm">
                      {recommendation.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Effort: {recommendation.effort}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recommended Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {recommendation.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {recommendation.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{recommendation.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medium">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediumPriorityRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-tight">
                        {recommendation.title}
                      </CardTitle>
                      <Badge variant="default">MEDIUM</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm">
                      {recommendation.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Effort: {recommendation.effort}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recommended Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {recommendation.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {recommendation.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{recommendation.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="low">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowPriorityRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-tight">
                        {recommendation.title}
                      </CardTitle>
                      <Badge variant="secondary">LOW</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm">
                      {recommendation.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Effort: {recommendation.effort}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recommended Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {recommendation.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {recommendation.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{recommendation.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {recommendations.length > 0 && (
        <div className="mt-8">
          <NISTMaturityChart assessmentState={assessmentState} />
        </div>
      )}
    </div>
  );
};

export default RecommendationsView;