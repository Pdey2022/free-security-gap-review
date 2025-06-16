import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Clock, Zap, Target, Wrench } from 'lucide-react';
import { Recommendation, Answer, Domain, MaturityLevel } from '@/types/assessment';
import { securityDomains } from '@/data/securityDomains';
import NISTMaturityChart from '@/components/NISTMaturityChart';
import PrintReport from '@/components/PrintReport';

interface RecommendationsViewProps {
  recommendations: Recommendation[];
  answers: Record<string, Answer>;
  domains?: Domain[];
  maturityLevel?: MaturityLevel;
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  answers,
  domains = securityDomains,
  maturityLevel
}) => {
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Group recommendations by priority
  const highPriority = recommendations.filter((r) => r.priority === 'high');
  const mediumPriority = recommendations.filter((r) => r.priority === 'medium');
  const lowPriority = recommendations.filter((r) => r.priority === 'low');

  // Group by domain
  const recommendationsByDomain = recommendations.reduce((acc, rec) => {
    if (!acc[rec.domain]) acc[rec.domain] = [];
    acc[rec.domain].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  const filteredRecommendations = selectedPriority === 'all' ?
  recommendations :
  recommendations.filter((r) => r.priority === selectedPriority);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':return <AlertTriangle className="w-4 h-4 text-red-500" data-id="suyj82h2x" data-path="src/components/RecommendationsView.tsx" />;
      case 'medium':return <Clock className="w-4 h-4 text-yellow-500" data-id="tatyl9qd1" data-path="src/components/RecommendationsView.tsx" />;
      case 'low':return <CheckCircle className="w-4 h-4 text-blue-500" data-id="p3o5hbwkp" data-path="src/components/RecommendationsView.tsx" />;
      default:return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':return 'border-red-200 bg-red-50';
      case 'medium':return 'border-yellow-200 bg-yellow-50';
      case 'low':return 'border-blue-200 bg-blue-50';
      default:return '';
    }
  };

  const getDomainIcon = (domainId: string) => {
    const domain = securityDomains.find((d) => d.id === domainId);
    return domain?.icon || '🔧';
  };

  const getDomainName = (domainId: string) => {
    const domain = securityDomains.find((d) => d.id === domainId);
    return domain?.name || domainId;
  };

  // Default maturity level if not provided
  const defaultMaturityLevel: MaturityLevel = {
    level: 1,
    name: 'Initial',
    description: 'Assessment in progress',
    color: 'bg-gray-500'
  };

  const currentMaturity = maturityLevel || defaultMaturityLevel;

  return (
    <div className="space-y-6" data-id="0sjo9tkll" data-path="src/components/RecommendationsView.tsx">
      {/* Download Report Button */}
      <div className="flex justify-end" data-id="h3p1qp0vc" data-path="src/components/RecommendationsView.tsx">
        <PrintReport
          domains={domains}
          answers={answers}
          maturityLevel={currentMaturity}
          recommendations={recommendations} data-id="lq3olmyg3" data-path="src/components/RecommendationsView.tsx" />

      </div>

      {/* NIST Maturity Chart */}
      <Card data-id="9vksor4hl" data-path="src/components/RecommendationsView.tsx">
        <CardHeader data-id="ogvkox7yc" data-path="src/components/RecommendationsView.tsx">
          <CardTitle data-id="lh6q2rs83" data-path="src/components/RecommendationsView.tsx">NIST Cybersecurity Framework Maturity</CardTitle>
          <CardDescription data-id="4q3dukqja" data-path="src/components/RecommendationsView.tsx">
            Assessment results mapped to NIST CSF functions showing current maturity levels
          </CardDescription>
        </CardHeader>
        <CardContent data-id="l9qvckymv" data-path="src/components/RecommendationsView.tsx">
          <NISTMaturityChart domains={securityDomains} answers={answers} data-id="uwqp7lvog" data-path="src/components/RecommendationsView.tsx" />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="447cwcf2w" data-path="src/components/RecommendationsView.tsx">
        <Card data-id="rxnwlvr5d" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="pevqzuono" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="5fnsvb36b" data-path="src/components/RecommendationsView.tsx">
              <AlertTriangle className="w-5 h-5 text-red-500" data-id="9rquxbhpy" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="6fj6hz2y2" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-red-600" data-id="srzk275dx" data-path="src/components/RecommendationsView.tsx">{highPriority.length}</div>
                <div className="text-sm text-slate-600" data-id="vjv5izuac" data-path="src/components/RecommendationsView.tsx">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="rdoy79e5a" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="3s4xfsx86" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="s3ura43k4" data-path="src/components/RecommendationsView.tsx">
              <Clock className="w-5 h-5 text-yellow-500" data-id="sli8h5g54" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="6euxvo4g4" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-yellow-600" data-id="zozobucod" data-path="src/components/RecommendationsView.tsx">{mediumPriority.length}</div>
                <div className="text-sm text-slate-600" data-id="bq1xtweib" data-path="src/components/RecommendationsView.tsx">Medium Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="xknxznea3" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="y8j2oo4fl" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="difdx8bh7" data-path="src/components/RecommendationsView.tsx">
              <CheckCircle className="w-5 h-5 text-blue-500" data-id="n2wp7eb1q" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="78rpd8osm" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-blue-600" data-id="am04k3272" data-path="src/components/RecommendationsView.tsx">{lowPriority.length}</div>
                <div className="text-sm text-slate-600" data-id="2k9rcwxjp" data-path="src/components/RecommendationsView.tsx">Low Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="on7unwp83" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="ss49t9oi5" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="0yui0kwbe" data-path="src/components/RecommendationsView.tsx">
              <Target className="w-5 h-5 text-slate-500" data-id="1453mxg2c" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="bek7lb168" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-slate-600" data-id="jv5uqtosc" data-path="src/components/RecommendationsView.tsx">{recommendations.length}</div>
                <div className="text-sm text-slate-600" data-id="2l8x2awbs" data-path="src/components/RecommendationsView.tsx">Total Recommendations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as any)} className="w-full" data-id="k7a03fwcr" data-path="src/components/RecommendationsView.tsx">
        <TabsList className="grid w-full grid-cols-4" data-id="vplk05q46" data-path="src/components/RecommendationsView.tsx">
          <TabsTrigger value="all" data-id="4m3hneraa" data-path="src/components/RecommendationsView.tsx">All ({recommendations.length})</TabsTrigger>
          <TabsTrigger value="high" className="text-red-600" data-id="9satgz07x" data-path="src/components/RecommendationsView.tsx">High ({highPriority.length})</TabsTrigger>
          <TabsTrigger value="medium" className="text-yellow-600" data-id="3dh51yumy" data-path="src/components/RecommendationsView.tsx">Medium ({mediumPriority.length})</TabsTrigger>
          <TabsTrigger value="low" className="text-blue-600" data-id="5zuxme43a" data-path="src/components/RecommendationsView.tsx">Low ({lowPriority.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPriority} className="space-y-4 mt-6" data-id="97umkmuau" data-path="src/components/RecommendationsView.tsx">
          {filteredRecommendations.length === 0 ?
          <Card data-id="k4vick5s8" data-path="src/components/RecommendationsView.tsx">
              <CardContent className="pt-6" data-id="5f9gehh1k" data-path="src/components/RecommendationsView.tsx">
                <div className="text-center py-8" data-id="kkzts3joj" data-path="src/components/RecommendationsView.tsx">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" data-id="d87l2o5mg" data-path="src/components/RecommendationsView.tsx" />
                  <h3 className="text-lg font-semibold mb-2" data-id="ijtznhzyh" data-path="src/components/RecommendationsView.tsx">Excellent Security Posture!</h3>
                  <p className="text-slate-600" data-id="s20czbdj9" data-path="src/components/RecommendationsView.tsx">
                    No recommendations found for this priority level. Your security controls appear to be well-implemented.
                  </p>
                </div>
              </CardContent>
            </Card> :

          filteredRecommendations.map((recommendation) =>
          <Card key={recommendation.id} className={getPriorityColor(recommendation.priority)} data-id="vrfxbxu3l" data-path="src/components/RecommendationsView.tsx">
                <CardHeader data-id="k8qejjmwi" data-path="src/components/RecommendationsView.tsx">
                  <div className="flex items-start justify-between" data-id="a0hvdogob" data-path="src/components/RecommendationsView.tsx">
                    <div className="flex items-start gap-3" data-id="ydh9i8cmg" data-path="src/components/RecommendationsView.tsx">
                      <span className="text-xl" data-id="60gt4vzoq" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(recommendation.domain)}</span>
                      <div data-id="bx2bvtzrq" data-path="src/components/RecommendationsView.tsx">
                        <CardTitle className="text-lg flex items-center gap-2" data-id="4p1hrmdwl" data-path="src/components/RecommendationsView.tsx">
                          {recommendation.title}
                          {getPriorityIcon(recommendation.priority)}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1" data-id="n5wap02hu" data-path="src/components/RecommendationsView.tsx">
                          <Badge variant="outline" className="text-xs" data-id="e8c7h5cda" data-path="src/components/RecommendationsView.tsx">
                            {getDomainName(recommendation.domain)}
                          </Badge>
                          <Badge
                        variant={recommendation.priority === 'high' ? 'destructive' :
                        recommendation.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs" data-id="jumsnqrum" data-path="src/components/RecommendationsView.tsx">
                            {recommendation.priority.toUpperCase()}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right" data-id="mdcpaszuo" data-path="src/components/RecommendationsView.tsx">
                      <div className="flex items-center gap-1 text-sm text-slate-600" data-id="qyo4sieoi" data-path="src/components/RecommendationsView.tsx">
                        <Clock className="w-3 h-3" data-id="ik8z2izld" data-path="src/components/RecommendationsView.tsx" />
                        {recommendation.effort}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4" data-id="t9ta1vzkk" data-path="src/components/RecommendationsView.tsx">
                  <p className="text-slate-700 leading-relaxed" data-id="wttmg71b8" data-path="src/components/RecommendationsView.tsx">
                    {recommendation.description}
                  </p>

                  {/* Technologies */}
                  <div data-id="pxrqtis3w" data-path="src/components/RecommendationsView.tsx">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-1" data-id="cfeddsyw3" data-path="src/components/RecommendationsView.tsx">
                      <Wrench className="w-3 h-3" data-id="h4uvsr9kc" data-path="src/components/RecommendationsView.tsx" />
                      Recommended Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2" data-id="k0fflwps6" data-path="src/components/RecommendationsView.tsx">
                      {recommendation.technologies.map((tech, index) =>
                  <Badge key={index} variant="secondary" className="text-xs" data-id="vml0x2xv2" data-path="src/components/RecommendationsView.tsx">
                          {tech}
                        </Badge>
                  )}
                    </div>
                  </div>

                  {/* Implementation Timeline */}
                  <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg" data-id="q3c2tkmja" data-path="src/components/RecommendationsView.tsx">
                    <div className="flex items-center gap-2" data-id="5clemc7ho" data-path="src/components/RecommendationsView.tsx">
                      <Zap className="w-4 h-4 text-blue-500" data-id="09bgy0pf5" data-path="src/components/RecommendationsView.tsx" />
                      <span className="text-sm font-medium" data-id="0cee5kcue" data-path="src/components/RecommendationsView.tsx">Implementation Timeline</span>
                    </div>
                    <Badge variant="outline" className="text-xs" data-id="loyfnzvt1" data-path="src/components/RecommendationsView.tsx">
                      {recommendation.effort}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
          )
          }
        </TabsContent>
      </Tabs>

      {/* Implementation Roadmap */}
      {recommendations.length > 0 &&
      <Card data-id="bijap3024" data-path="src/components/RecommendationsView.tsx">
          <CardHeader data-id="78980nm8q" data-path="src/components/RecommendationsView.tsx">
            <CardTitle data-id="3zx4o6918" data-path="src/components/RecommendationsView.tsx">Implementation Roadmap</CardTitle>
            <CardDescription data-id="49zx53gyd" data-path="src/components/RecommendationsView.tsx">
              Suggested order of implementation based on priority and dependencies
            </CardDescription>
          </CardHeader>
          <CardContent data-id="nmu0tk2u9" data-path="src/components/RecommendationsView.tsx">
            <div className="space-y-4" data-id="mon3iy5r1" data-path="src/components/RecommendationsView.tsx">
              <div data-id="ikizikljh" data-path="src/components/RecommendationsView.tsx">
                <h4 className="font-medium text-sm mb-2 text-red-600" data-id="dfvdzgwgj" data-path="src/components/RecommendationsView.tsx">Phase 1: Critical Security Gaps (0-3 months)</h4>
                <div className="pl-4 space-y-1" data-id="i4jtq1hxe" data-path="src/components/RecommendationsView.tsx">
                  {highPriority.slice(0, 3).map((rec) =>
                <div key={rec.id} className="text-sm flex items-center gap-2" data-id="gdvrkyirg" data-path="src/components/RecommendationsView.tsx">
                      <span data-id="g0l8isq03" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(rec.domain)}</span>
                      <span data-id="9s2evkpvh" data-path="src/components/RecommendationsView.tsx">{rec.title}</span>
                    </div>
                )}
                </div>
              </div>

              <div data-id="m1wjlqm7g" data-path="src/components/RecommendationsView.tsx">
                <h4 className="font-medium text-sm mb-2 text-yellow-600" data-id="ne5wbay2a" data-path="src/components/RecommendationsView.tsx">Phase 2: Security Enhancements (3-9 months)</h4>
                <div className="pl-4 space-y-1" data-id="vxech7zbb" data-path="src/components/RecommendationsView.tsx">
                  {[...highPriority.slice(3), ...mediumPriority.slice(0, 3)].map((rec) =>
                <div key={rec.id} className="text-sm flex items-center gap-2" data-id="suxvctaax" data-path="src/components/RecommendationsView.tsx">
                      <span data-id="xgr3dgrqa" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(rec.domain)}</span>
                      <span data-id="c0gq8k91a" data-path="src/components/RecommendationsView.tsx">{rec.title}</span>
                    </div>
                )}
                </div>
              </div>

              <div data-id="478asc3nj" data-path="src/components/RecommendationsView.tsx">
                <h4 className="font-medium text-sm mb-2 text-blue-600" data-id="vsocjeuqa" data-path="src/components/RecommendationsView.tsx">Phase 3: Security Optimization (9+ months)</h4>
                <div className="pl-4 space-y-1" data-id="rza6f2cvb" data-path="src/components/RecommendationsView.tsx">
                  {[...mediumPriority.slice(3), ...lowPriority].map((rec) =>
                <div key={rec.id} className="text-sm flex items-center gap-2" data-id="7099jqn2s" data-path="src/components/RecommendationsView.tsx">
                      <span data-id="4v5plnb88" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(rec.domain)}</span>
                      <span data-id="1togmoxwq" data-path="src/components/RecommendationsView.tsx">{rec.title}</span>
                    </div>
                )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    </div>);

};

export default RecommendationsView;