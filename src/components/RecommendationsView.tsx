import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Shield, AlertTriangle, CheckCircle, Calendar, Database, Loader2, RefreshCw, ExternalLink } from 'lucide-react';
import { AssessmentState, Recommendation } from '@/types/assessment';
import { securityDomains } from '@/data/securityDomains';
import NISTMaturityChart from './NISTMaturityChart';
import { recommendationDatabase, checkDatabaseStatus } from '@/data/recommendations-db';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RecommendationsViewProps {
  assessmentState: AssessmentState;
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({ assessmentState }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [databaseStatus, setDatabaseStatus] = useState<{ hasData: boolean; count: number; error?: string } | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadRecommendations();
  }, [assessmentState]);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setIsUsingFallback(false);
      setDebugInfo('Starting recommendation loading...');

      console.log('Loading recommendations with assessment state:', assessmentState);

      // Check database status first
      const dbStatus = await checkDatabaseStatus();
      setDatabaseStatus(dbStatus);

      if (!dbStatus.hasData) {
        setDebugInfo(`Database is empty (${dbStatus.count} recommendations). Using static recommendations as fallback.`);
        setIsUsingFallback(true);
      } else {
        setDebugInfo(`Database has ${dbStatus.count} recommendations available.`);
      }

      const recs = await recommendationDatabase(assessmentState.answers);
      setRecommendations(recs);
      
      console.log('Loaded recommendations:', recs);

      if (recs.length === 0) {
        setDebugInfo('No recommendations returned from any source');
        setError('No recommendations could be loaded');
      } else {
        setDebugInfo(`Successfully loaded ${recs.length} recommendations ${isUsingFallback ? '(using fallback)' : '(from database)'}`);
      }

    } catch (error) {
      console.error('Error loading recommendations:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setDebugInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const checkDatabaseStatusManual = async () => {
    try {
      setDebugInfo('Checking database status...');
      const status = await checkDatabaseStatus();
      setDatabaseStatus(status);

      if (status.error) {
        setDebugInfo(`Database error: ${status.error}`);
        toast({
          title: "Database Error",
          description: status.error,
          variant: "destructive"
        });
      } else {
        setDebugInfo(`Database has ${status.count} total recommendations`);
        toast({
          title: "Database Status",
          description: `Found ${status.count} recommendations in database`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error checking database:', error);
      setDebugInfo(`Database check failed: ${error}`);
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
    const domain = securityDomains.find((d) => d.id === domainId);
    return domain?.icon || '🔒';
  };

  const groupedRecommendations = recommendations.reduce((acc, rec) => {
    if (!acc[rec.domain]) {
      acc[rec.domain] = [];
    }
    acc[rec.domain].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  const highPriorityRecommendations = recommendations.filter((r) => r.priority === 'high');
  const mediumPriorityRecommendations = recommendations.filter((r) => r.priority === 'medium');
  const lowPriorityRecommendations = recommendations.filter((r) => r.priority === 'low');

  const answeredQuestions = Object.keys(assessmentState.answers).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <h2 className="text-2xl font-bold">Loading Recommendations</h2>
          <p className="text-gray-600">Analyzing your assessment responses...</p>
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
            Debug: {debugInfo}
          </div>
        </div>
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

  // Show message if no questions have been answered yet
  if (answeredQuestions === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Security Recommendations</h2>
          <p className="text-gray-600">
            Answer assessment questions to receive personalized recommendations
          </p>
        </div>
        
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Complete the Assessment First</h3>
            <p className="text-gray-600 mb-4">
              Start by answering questions in the Assessment tab to receive customized security recommendations.
            </p>
            
            {/* Database status info */}
            <div className="space-y-2 mb-4">
              <Button onClick={checkDatabaseStatusManual} variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Check Database Status
              </Button>
              
              {databaseStatus && (
                <div className="text-sm text-gray-600">
                  Database: {databaseStatus.count} recommendations available
                  {databaseStatus.error && (
                    <span className="text-red-600 block">Error: {databaseStatus.error}</span>
                  )}
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
              Debug: {debugInfo}
            </div>
          </CardContent>
        </Card>
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
        
        {/* Status indicators */}
        <div className="flex justify-center gap-4 text-sm">
          {isUsingFallback && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              Using Static Recommendations
            </Badge>
          )}
          {databaseStatus && !isUsingFallback && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Database Connected ({databaseStatus.count} recommendations)
            </Badge>
          )}
        </div>
        
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          Debug: {debugInfo} | Answered questions: {answeredQuestions}
        </div>
        
        <div className="flex justify-center gap-2">
          <Button onClick={loadRecommendations} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Recommendations
          </Button>
          <Button onClick={checkDatabaseStatusManual} variant="outline" size="sm">
            <Database className="h-4 w-4 mr-2" />
            Check Database
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Error loading recommendations</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <Button onClick={loadRecommendations} size="sm" className="mt-2">
              Retry Loading
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Show admin link if database is empty */}
      {databaseStatus && !databaseStatus.hasData && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Database className="h-4 w-4" />
              <span className="font-medium">Database Needs Setup</span>
            </div>
            <p className="text-blue-600 text-sm mt-1">
              The recommendations database is empty. An administrator needs to seed it with data.
            </p>
            <div className="mt-2">
              <Button 
                onClick={() => window.open('/admin/login', '_blank')} 
                size="sm" 
                variant="outline"
                className="mr-2"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Button>
              <span className="text-xs text-blue-600">
                (Currently using static fallback recommendations)
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {recommendations.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations available</h3>
            <p className="text-gray-600 mb-4">
              This could mean:
            </p>
            <ul className="text-left text-gray-600 space-y-1 mb-4">
              <li>• The recommendations database needs to be seeded</li>
              <li>• All assessment areas are already well-secured</li>
              <li>• More assessment answers are needed for analysis</li>
            </ul>
            <div className="space-y-2">
              <Button onClick={loadRecommendations} size="sm">
                Reload Recommendations
              </Button>
              <Button onClick={checkDatabaseStatusManual} variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Check Database
              </Button>
            </div>
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