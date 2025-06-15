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
        return <AlertTriangle className="h-4 w-4 text-red-500" data-id="gdfa5hsv4" data-path="src/components/RecommendationsView.tsx" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" data-id="p8r3xexoc" data-path="src/components/RecommendationsView.tsx" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" data-id="7sagp34pn" data-path="src/components/RecommendationsView.tsx" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" data-id="40j7sdfan" data-path="src/components/RecommendationsView.tsx" />;
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

  if (isLoading) {
    return (
      <div className="space-y-6" data-id="pt4hnekwq" data-path="src/components/RecommendationsView.tsx">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-id="zeda1l9ss" data-path="src/components/RecommendationsView.tsx">
          {[...Array(6)].map((_, i) =>
          <Card key={i} data-id="n1ho2snwe" data-path="src/components/RecommendationsView.tsx">
              <CardContent className="p-6" data-id="3bzs9eari" data-path="src/components/RecommendationsView.tsx">
                <div className="animate-pulse" data-id="cwmtk0d5r" data-path="src/components/RecommendationsView.tsx">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" data-id="5xp5g69a7" data-path="src/components/RecommendationsView.tsx"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" data-id="mh97wcoye" data-path="src/components/RecommendationsView.tsx"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2" data-id="namm24u0c" data-path="src/components/RecommendationsView.tsx"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3" data-id="f55lj715f" data-path="src/components/RecommendationsView.tsx"></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="jqk6aqek2" data-path="src/components/RecommendationsView.tsx">
      <div className="text-center space-y-2" data-id="ov66ysk02" data-path="src/components/RecommendationsView.tsx">
        <h2 className="text-2xl font-bold" data-id="zt5ljot36" data-path="src/components/RecommendationsView.tsx">Security Recommendations</h2>
        <p className="text-gray-600" data-id="xixfq6e05" data-path="src/components/RecommendationsView.tsx">
          Based on your assessment, here are personalized recommendations to improve your security posture
        </p>
      </div>

      {recommendations.length === 0 ?
      <Card data-id="dkp6mtcio" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="p-12 text-center" data-id="o8nt7yf1b" data-path="src/components/RecommendationsView.tsx">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="3kek24t8v" data-path="src/components/RecommendationsView.tsx" />
            <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="01gzw65oo" data-path="src/components/RecommendationsView.tsx">No recommendations available</h3>
            <p className="text-gray-600" data-id="slin1feht" data-path="src/components/RecommendationsView.tsx">
              Complete the security assessment to receive personalized recommendations.
            </p>
          </CardContent>
        </Card> :

      <Tabs defaultValue="all" className="space-y-6" data-id="ookd4buoc" data-path="src/components/RecommendationsView.tsx">
          <TabsList className="grid w-full grid-cols-4" data-id="z8sbqu1s5" data-path="src/components/RecommendationsView.tsx">
            <TabsTrigger value="all" data-id="rf6239dn9" data-path="src/components/RecommendationsView.tsx">All ({recommendations.length})</TabsTrigger>
            <TabsTrigger value="high" data-id="1p47ks9mv" data-path="src/components/RecommendationsView.tsx">High ({highPriorityRecommendations.length})</TabsTrigger>
            <TabsTrigger value="medium" data-id="e21amely6" data-path="src/components/RecommendationsView.tsx">Medium ({mediumPriorityRecommendations.length})</TabsTrigger>
            <TabsTrigger value="low" data-id="dyd2j0t3p" data-path="src/components/RecommendationsView.tsx">Low ({lowPriorityRecommendations.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6" data-id="wcwmcub0o" data-path="src/components/RecommendationsView.tsx">
            {Object.entries(groupedRecommendations).map(([domain, domainRecs]) =>
          <div key={domain} className="space-y-4" data-id="7b85b3hsy" data-path="src/components/RecommendationsView.tsx">
                <div className="flex items-center gap-2" data-id="iue9ao1ly" data-path="src/components/RecommendationsView.tsx">
                  <span className="text-2xl" data-id="s2ciqrip2" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(domain)}</span>
                  <h3 className="text-xl font-semibold capitalize" data-id="acl7twnn6" data-path="src/components/RecommendationsView.tsx">{domain.replace('_', ' ')}</h3>
                  <Badge variant="outline" data-id="mqtvcdrib" data-path="src/components/RecommendationsView.tsx">{domainRecs.length} recommendations</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-id="b5dva4w90" data-path="src/components/RecommendationsView.tsx">
                  {domainRecs.map((recommendation) =>
              <Card key={recommendation.id} className="hover:shadow-lg transition-shadow" data-id="varkr828m" data-path="src/components/RecommendationsView.tsx">
                      <CardHeader className="pb-3" data-id="35wieg5b1" data-path="src/components/RecommendationsView.tsx">
                        <div className="flex items-start justify-between gap-2" data-id="0zmefkh78" data-path="src/components/RecommendationsView.tsx">
                          <CardTitle className="text-base leading-tight" data-id="gk0b2xgfm" data-path="src/components/RecommendationsView.tsx">
                            {recommendation.title}
                          </CardTitle>
                          <Badge variant={getPriorityColor(recommendation.priority) as any} data-id="xl63ssgj7" data-path="src/components/RecommendationsView.tsx">
                            {recommendation.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4" data-id="l7mj82vbi" data-path="src/components/RecommendationsView.tsx">
                        <CardDescription className="text-sm" data-id="0g0233qnl" data-path="src/components/RecommendationsView.tsx">
                          {recommendation.description}
                        </CardDescription>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600" data-id="qjh1oat1y" data-path="src/components/RecommendationsView.tsx">
                          {getPriorityIcon(recommendation.priority)}
                          <span data-id="b35y257th" data-path="src/components/RecommendationsView.tsx">Priority: {recommendation.priority}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600" data-id="x8p8obfqi" data-path="src/components/RecommendationsView.tsx">
                          <Calendar className="h-4 w-4" data-id="am4qjzl0g" data-path="src/components/RecommendationsView.tsx" />
                          <span data-id="8n3mgr1w0" data-path="src/components/RecommendationsView.tsx">Effort: {recommendation.effort}</span>
                        </div>

                        <div className="space-y-2" data-id="9mz481hmg" data-path="src/components/RecommendationsView.tsx">
                          <p className="text-sm font-medium" data-id="czwbroru1" data-path="src/components/RecommendationsView.tsx">Recommended Technologies:</p>
                          <div className="flex flex-wrap gap-1" data-id="kx66fwmz5" data-path="src/components/RecommendationsView.tsx">
                            {recommendation.technologies.slice(0, 3).map((tech, index) =>
                      <Badge key={index} variant="outline" className="text-xs" data-id="loko1v5je" data-path="src/components/RecommendationsView.tsx">
                                {tech}
                              </Badge>
                      )}
                            {recommendation.technologies.length > 3 &&
                      <Badge variant="outline" className="text-xs" data-id="3pfsgthya" data-path="src/components/RecommendationsView.tsx">
                                +{recommendation.technologies.length - 3} more
                              </Badge>
                      }
                          </div>
                        </div>
                      </CardContent>
                    </Card>
              )}
                </div>
              </div>
          )}
          </TabsContent>

          <TabsContent value="high" data-id="0pyt9e4ja" data-path="src/components/RecommendationsView.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-id="iov79pu5q" data-path="src/components/RecommendationsView.tsx">
              {highPriorityRecommendations.map((recommendation) =>
            <Card key={recommendation.id} className="hover:shadow-lg transition-shadow border-red-200" data-id="p8yr3l9h7" data-path="src/components/RecommendationsView.tsx">
                  <CardHeader className="pb-3" data-id="yhu6s5yqe" data-path="src/components/RecommendationsView.tsx">
                    <div className="flex items-start justify-between gap-2" data-id="xafnbhmql" data-path="src/components/RecommendationsView.tsx">
                      <CardTitle className="text-base leading-tight" data-id="g5h81p8zc" data-path="src/components/RecommendationsView.tsx">
                        {recommendation.title}
                      </CardTitle>
                      <Badge variant="destructive" data-id="p6uistlc9" data-path="src/components/RecommendationsView.tsx">HIGH</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4" data-id="e1sc1sqvy" data-path="src/components/RecommendationsView.tsx">
                    <CardDescription className="text-sm" data-id="own8j115i" data-path="src/components/RecommendationsView.tsx">
                      {recommendation.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600" data-id="f42109qtj" data-path="src/components/RecommendationsView.tsx">
                      <Calendar className="h-4 w-4" data-id="vllc3icwu" data-path="src/components/RecommendationsView.tsx" />
                      <span data-id="guy5e2qj4" data-path="src/components/RecommendationsView.tsx">Effort: {recommendation.effort}</span>
                    </div>
                    
                    <div className="space-y-2" data-id="oas7jj6zh" data-path="src/components/RecommendationsView.tsx">
                      <p className="text-sm font-medium" data-id="i1iaoc4yf" data-path="src/components/RecommendationsView.tsx">Recommended Technologies:</p>
                      <div className="flex flex-wrap gap-1" data-id="2ym4ab0as" data-path="src/components/RecommendationsView.tsx">
                        {recommendation.technologies.slice(0, 3).map((tech, index) =>
                    <Badge key={index} variant="outline" className="text-xs" data-id="xktya3n3v" data-path="src/components/RecommendationsView.tsx">
                            {tech}
                          </Badge>
                    )}
                        {recommendation.technologies.length > 3 &&
                    <Badge variant="outline" className="text-xs" data-id="hnytpsm9t" data-path="src/components/RecommendationsView.tsx">
                            +{recommendation.technologies.length - 3} more
                          </Badge>
                    }
                      </div>
                    </div>
                  </CardContent>
                </Card>
            )}
            </div>
          </TabsContent>

          <TabsContent value="medium" data-id="mwcht610r" data-path="src/components/RecommendationsView.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-id="tacbdg48h" data-path="src/components/RecommendationsView.tsx">
              {mediumPriorityRecommendations.map((recommendation) =>
            <Card key={recommendation.id} className="hover:shadow-lg transition-shadow" data-id="8kt8nshw3" data-path="src/components/RecommendationsView.tsx">
                  <CardHeader className="pb-3" data-id="j0qwlkdeo" data-path="src/components/RecommendationsView.tsx">
                    <div className="flex items-start justify-between gap-2" data-id="wk72pdo8u" data-path="src/components/RecommendationsView.tsx">
                      <CardTitle className="text-base leading-tight" data-id="vmowyiged" data-path="src/components/RecommendationsView.tsx">
                        {recommendation.title}
                      </CardTitle>
                      <Badge variant="default" data-id="8s3qavpq7" data-path="src/components/RecommendationsView.tsx">MEDIUM</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4" data-id="8wq6e4iw7" data-path="src/components/RecommendationsView.tsx">
                    <CardDescription className="text-sm" data-id="tjcyb3dtw" data-path="src/components/RecommendationsView.tsx">
                      {recommendation.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600" data-id="vq6u6j80w" data-path="src/components/RecommendationsView.tsx">
                      <Calendar className="h-4 w-4" data-id="x3ah42ps1" data-path="src/components/RecommendationsView.tsx" />
                      <span data-id="1zjgz6fjt" data-path="src/components/RecommendationsView.tsx">Effort: {recommendation.effort}</span>
                    </div>
                    
                    <div className="space-y-2" data-id="bp8co38oc" data-path="src/components/RecommendationsView.tsx">
                      <p className="text-sm font-medium" data-id="lluxrtley" data-path="src/components/RecommendationsView.tsx">Recommended Technologies:</p>
                      <div className="flex flex-wrap gap-1" data-id="5rowkek8i" data-path="src/components/RecommendationsView.tsx">
                        {recommendation.technologies.slice(0, 3).map((tech, index) =>
                    <Badge key={index} variant="outline" className="text-xs" data-id="qtmub1311" data-path="src/components/RecommendationsView.tsx">
                            {tech}
                          </Badge>
                    )}
                        {recommendation.technologies.length > 3 &&
                    <Badge variant="outline" className="text-xs" data-id="h7p6m97rh" data-path="src/components/RecommendationsView.tsx">
                            +{recommendation.technologies.length - 3} more
                          </Badge>
                    }
                      </div>
                    </div>
                  </CardContent>
                </Card>
            )}
            </div>
          </TabsContent>

          <TabsContent value="low" data-id="tx1g5ig6x" data-path="src/components/RecommendationsView.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-id="txe058h1z" data-path="src/components/RecommendationsView.tsx">
              {lowPriorityRecommendations.map((recommendation) =>
            <Card key={recommendation.id} className="hover:shadow-lg transition-shadow" data-id="l8eroeexr" data-path="src/components/RecommendationsView.tsx">
                  <CardHeader className="pb-3" data-id="hlod41wkl" data-path="src/components/RecommendationsView.tsx">
                    <div className="flex items-start justify-between gap-2" data-id="kgq6e26bt" data-path="src/components/RecommendationsView.tsx">
                      <CardTitle className="text-base leading-tight" data-id="2kk9atq1m" data-path="src/components/RecommendationsView.tsx">
                        {recommendation.title}
                      </CardTitle>
                      <Badge variant="secondary" data-id="83jfp48sc" data-path="src/components/RecommendationsView.tsx">LOW</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4" data-id="52q7pltj3" data-path="src/components/RecommendationsView.tsx">
                    <CardDescription className="text-sm" data-id="yu6bnaor4" data-path="src/components/RecommendationsView.tsx">
                      {recommendation.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600" data-id="o414pxuyk" data-path="src/components/RecommendationsView.tsx">
                      <Calendar className="h-4 w-4" data-id="jyfox6b69" data-path="src/components/RecommendationsView.tsx" />
                      <span data-id="f2e8amqth" data-path="src/components/RecommendationsView.tsx">Effort: {recommendation.effort}</span>
                    </div>
                    
                    <div className="space-y-2" data-id="odvb3qyfv" data-path="src/components/RecommendationsView.tsx">
                      <p className="text-sm font-medium" data-id="tpyjrz76v" data-path="src/components/RecommendationsView.tsx">Recommended Technologies:</p>
                      <div className="flex flex-wrap gap-1" data-id="57a50xika" data-path="src/components/RecommendationsView.tsx">
                        {recommendation.technologies.slice(0, 3).map((tech, index) =>
                    <Badge key={index} variant="outline" className="text-xs" data-id="rf5a6k0iy" data-path="src/components/RecommendationsView.tsx">
                            {tech}
                          </Badge>
                    )}
                        {recommendation.technologies.length > 3 &&
                    <Badge variant="outline" className="text-xs" data-id="wnyijkbv6" data-path="src/components/RecommendationsView.tsx">
                            +{recommendation.technologies.length - 3} more
                          </Badge>
                    }
                      </div>
                    </div>
                  </CardContent>
                </Card>
            )}
            </div>
          </TabsContent>
        </Tabs>
      }

      {recommendations.length > 0 &&
      <div className="mt-8" data-id="oxgh5sxrh" data-path="src/components/RecommendationsView.tsx">
          <NISTMaturityChart assessmentState={assessmentState} data-id="p0rjutmcl" data-path="src/components/RecommendationsView.tsx" />
        </div>
      }
    </div>);

};

export default RecommendationsView;