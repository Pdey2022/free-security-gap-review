import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, Zap, Target, Wrench } from 'lucide-react';
import { Recommendation, Answer } from '@/types/assessment';
import { securityDomains } from '@/data/securityDomains';

interface RecommendationsViewProps {
  recommendations: Recommendation[];
  answers: Record<string, Answer>;
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  answers
}) => {
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Group recommendations by priority
  const highPriority = recommendations.filter(r => r.priority === 'high');
  const mediumPriority = recommendations.filter(r => r.priority === 'medium');
  const lowPriority = recommendations.filter(r => r.priority === 'low');

  // Group by domain
  const recommendationsByDomain = recommendations.reduce((acc, rec) => {
    if (!acc[rec.domain]) acc[rec.domain] = [];
    acc[rec.domain].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  const filteredRecommendations = selectedPriority === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.priority === selectedPriority);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return '';
    }
  };

  const getDomainIcon = (domainId: string) => {
    const domain = securityDomains.find(d => d.id === domainId);
    return domain?.icon || '🔧';
  };

  const getDomainName = (domainId: string) => {
    const domain = securityDomains.find(d => d.id === domainId);
    return domain?.name || domainId;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">{highPriority.length}</div>
                <div className="text-sm text-slate-600">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{mediumPriority.length}</div>
                <div className="text-sm text-slate-600">Medium Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{lowPriority.length}</div>
                <div className="text-sm text-slate-600">Low Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-slate-500" />
              <div>
                <div className="text-2xl font-bold text-slate-600">{recommendations.length}</div>
                <div className="text-sm text-slate-600">Total Recommendations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({recommendations.length})</TabsTrigger>
          <TabsTrigger value="high" className="text-red-600">High ({highPriority.length})</TabsTrigger>
          <TabsTrigger value="medium" className="text-yellow-600">Medium ({mediumPriority.length})</TabsTrigger>
          <TabsTrigger value="low" className="text-blue-600">Low ({lowPriority.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPriority} className="space-y-4 mt-6">
          {filteredRecommendations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">Excellent Security Posture!</h3>
                  <p className="text-slate-600">
                    No recommendations found for this priority level. Your security controls appear to be well-implemented.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className={getPriorityColor(recommendation.priority)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{getDomainIcon(recommendation.domain)}</span>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {recommendation.title}
                          {getPriorityIcon(recommendation.priority)}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getDomainName(recommendation.domain)}
                          </Badge>
                          <Badge 
                            variant={recommendation.priority === 'high' ? 'destructive' : 
                                   recommendation.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {recommendation.priority.toUpperCase()}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock className="w-3 h-3" />
                        {recommendation.effort}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    {recommendation.description}
                  </p>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      Recommended Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Implementation Timeline */}
                  <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Implementation Timeline</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {recommendation.effort}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Implementation Roadmap */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Implementation Roadmap</CardTitle>
            <CardDescription>
              Suggested order of implementation based on priority and dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2 text-red-600">Phase 1: Critical Security Gaps (0-3 months)</h4>
                <div className="pl-4 space-y-1">
                  {highPriority.slice(0, 3).map(rec => (
                    <div key={rec.id} className="text-sm flex items-center gap-2">
                      <span>{getDomainIcon(rec.domain)}</span>
                      <span>{rec.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2 text-yellow-600">Phase 2: Security Enhancements (3-9 months)</h4>
                <div className="pl-4 space-y-1">
                  {[...highPriority.slice(3), ...mediumPriority.slice(0, 3)].map(rec => (
                    <div key={rec.id} className="text-sm flex items-center gap-2">
                      <span>{getDomainIcon(rec.domain)}</span>
                      <span>{rec.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2 text-blue-600">Phase 3: Security Optimization (9+ months)</h4>
                <div className="pl-4 space-y-1">
                  {[...mediumPriority.slice(3), ...lowPriority].map(rec => (
                    <div key={rec.id} className="text-sm flex items-center gap-2">
                      <span>{getDomainIcon(rec.domain)}</span>
                      <span>{rec.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecommendationsView;