import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Clock, Zap, Target, Wrench } from 'lucide-react';
import { Recommendation, Answer } from '@/types/assessment';
import { securityDomains } from '@/data/securityDomains';
import NISTMaturityChart from '@/components/NISTMaturityChart';

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
      case 'high':return <AlertTriangle className="w-4 h-4 text-red-500" data-id="z0itinjr0" data-path="src/components/RecommendationsView.tsx" />;
      case 'medium':return <Clock className="w-4 h-4 text-yellow-500" data-id="vibc5dajb" data-path="src/components/RecommendationsView.tsx" />;
      case 'low':return <CheckCircle className="w-4 h-4 text-blue-500" data-id="gpeqkzzma" data-path="src/components/RecommendationsView.tsx" />;
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

  return (
    <div className="space-y-6" data-id="hzcdz4syk" data-path="src/components/RecommendationsView.tsx">
      {/* NIST Maturity Chart */}
      <Card data-id="pji0uxgtr" data-path="src/components/RecommendationsView.tsx">
        <CardHeader data-id="4ze5t16a7" data-path="src/components/RecommendationsView.tsx">
          <CardTitle data-id="bdqzapao7" data-path="src/components/RecommendationsView.tsx">NIST Cybersecurity Framework Maturity</CardTitle>
          <CardDescription data-id="wqcexw7s7" data-path="src/components/RecommendationsView.tsx">
            Assessment results mapped to NIST CSF functions showing current maturity levels
          </CardDescription>
        </CardHeader>
        <CardContent data-id="5hh2dln8u" data-path="src/components/RecommendationsView.tsx">
          <NISTMaturityChart domains={securityDomains} answers={answers} data-id="7yt00wkg2" data-path="src/components/RecommendationsView.tsx" />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="jrbgo3ehj" data-path="src/components/RecommendationsView.tsx">
        <Card data-id="u2av3vngk" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="uzwpuy4d1" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="kyqqjufu2" data-path="src/components/RecommendationsView.tsx">
              <AlertTriangle className="w-5 h-5 text-red-500" data-id="hbrymqd1x" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="mmztyomom" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-red-600" data-id="gihai6rm2" data-path="src/components/RecommendationsView.tsx">{highPriority.length}</div>
                <div className="text-sm text-slate-600" data-id="cq0q0hbxe" data-path="src/components/RecommendationsView.tsx">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="wtqfbuqn0" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="kinzygozf" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="xbzvzicn3" data-path="src/components/RecommendationsView.tsx">
              <Clock className="w-5 h-5 text-yellow-500" data-id="ibg6c1u3i" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="ytblxpo8x" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-yellow-600" data-id="143vwze68" data-path="src/components/RecommendationsView.tsx">{mediumPriority.length}</div>
                <div className="text-sm text-slate-600" data-id="ujehnrl2h" data-path="src/components/RecommendationsView.tsx">Medium Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="cg9uk4mzr" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="ksmhi066e" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="e3ot1gbbe" data-path="src/components/RecommendationsView.tsx">
              <CheckCircle className="w-5 h-5 text-blue-500" data-id="4xed2pikq" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="bo9r4ylha" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-blue-600" data-id="9tnx7bqom" data-path="src/components/RecommendationsView.tsx">{lowPriority.length}</div>
                <div className="text-sm text-slate-600" data-id="4ojwtlo3i" data-path="src/components/RecommendationsView.tsx">Low Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="ze95qkpph" data-path="src/components/RecommendationsView.tsx">
          <CardContent className="pt-6" data-id="6zlijufei" data-path="src/components/RecommendationsView.tsx">
            <div className="flex items-center gap-2" data-id="mwohc8v9p" data-path="src/components/RecommendationsView.tsx">
              <Target className="w-5 h-5 text-slate-500" data-id="gi9efeza4" data-path="src/components/RecommendationsView.tsx" />
              <div data-id="9041okqvn" data-path="src/components/RecommendationsView.tsx">
                <div className="text-2xl font-bold text-slate-600" data-id="o6ht5fckm" data-path="src/components/RecommendationsView.tsx">{recommendations.length}</div>
                <div className="text-sm text-slate-600" data-id="a3iw3xb2r" data-path="src/components/RecommendationsView.tsx">Total Recommendations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as any)} className="w-full" data-id="l3q5t562v" data-path="src/components/RecommendationsView.tsx">
        <TabsList className="grid w-full grid-cols-4" data-id="5wpk4crs2" data-path="src/components/RecommendationsView.tsx">
          <TabsTrigger value="all" data-id="yhqkjhabn" data-path="src/components/RecommendationsView.tsx">All ({recommendations.length})</TabsTrigger>
          <TabsTrigger value="high" className="text-red-600" data-id="i9eima3o0" data-path="src/components/RecommendationsView.tsx">High ({highPriority.length})</TabsTrigger>
          <TabsTrigger value="medium" className="text-yellow-600" data-id="gb0yh93ei" data-path="src/components/RecommendationsView.tsx">Medium ({mediumPriority.length})</TabsTrigger>
          <TabsTrigger value="low" className="text-blue-600" data-id="hftr80zkw" data-path="src/components/RecommendationsView.tsx">Low ({lowPriority.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPriority} className="space-y-4 mt-6" data-id="7r10phonn" data-path="src/components/RecommendationsView.tsx">
          {filteredRecommendations.length === 0 ?
          <Card data-id="retl68o4g" data-path="src/components/RecommendationsView.tsx">
              <CardContent className="pt-6" data-id="ziphqbsde" data-path="src/components/RecommendationsView.tsx">
                <div className="text-center py-8" data-id="8o806qq8v" data-path="src/components/RecommendationsView.tsx">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" data-id="e3mkcaz52" data-path="src/components/RecommendationsView.tsx" />
                  <h3 className="text-lg font-semibold mb-2" data-id="jpry2f4ew" data-path="src/components/RecommendationsView.tsx">Excellent Security Posture!</h3>
                  <p className="text-slate-600" data-id="0pctg64vq" data-path="src/components/RecommendationsView.tsx">
                    No recommendations found for this priority level. Your security controls appear to be well-implemented.
                  </p>
                </div>
              </CardContent>
            </Card> :

          filteredRecommendations.map((recommendation) =>
          <Card key={recommendation.id} className={getPriorityColor(recommendation.priority)} data-id="az899ujrp" data-path="src/components/RecommendationsView.tsx">
                <CardHeader data-id="x81feyyye" data-path="src/components/RecommendationsView.tsx">
                  <div className="flex items-start justify-between" data-id="q7q3360ue" data-path="src/components/RecommendationsView.tsx">
                    <div className="flex items-start gap-3" data-id="qhdf5l8v9" data-path="src/components/RecommendationsView.tsx">
                      <span className="text-xl" data-id="cmc9738cw" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(recommendation.domain)}</span>
                      <div data-id="2kx77xwgc" data-path="src/components/RecommendationsView.tsx">
                        <CardTitle className="text-lg flex items-center gap-2" data-id="rc9l1ceny" data-path="src/components/RecommendationsView.tsx">
                          {recommendation.title}
                          {getPriorityIcon(recommendation.priority)}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1" data-id="tla7yh1j1" data-path="src/components/RecommendationsView.tsx">
                          <Badge variant="outline" className="text-xs" data-id="igwfmb4l9" data-path="src/components/RecommendationsView.tsx">
                            {getDomainName(recommendation.domain)}
                          </Badge>
                          <Badge
                        variant={recommendation.priority === 'high' ? 'destructive' :
                        recommendation.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs" data-id="9mhlhly2s" data-path="src/components/RecommendationsView.tsx">
                            {recommendation.priority.toUpperCase()}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right" data-id="voyp0bo5n" data-path="src/components/RecommendationsView.tsx">
                      <div className="flex items-center gap-1 text-sm text-slate-600" data-id="xcb0dl4ua" data-path="src/components/RecommendationsView.tsx">
                        <Clock className="w-3 h-3" data-id="hizb0dqnv" data-path="src/components/RecommendationsView.tsx" />
                        {recommendation.effort}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4" data-id="gu4yse7wf" data-path="src/components/RecommendationsView.tsx">
                  <p className="text-slate-700 leading-relaxed" data-id="ikp0d0xey" data-path="src/components/RecommendationsView.tsx">
                    {recommendation.description}
                  </p>

                  {/* Technologies */}
                  <div data-id="hnuy4kx0a" data-path="src/components/RecommendationsView.tsx">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-1" data-id="ruct0adff" data-path="src/components/RecommendationsView.tsx">
                      <Wrench className="w-3 h-3" data-id="5mpmmev70" data-path="src/components/RecommendationsView.tsx" />
                      Recommended Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2" data-id="u5ed06fx3" data-path="src/components/RecommendationsView.tsx">
                      {recommendation.technologies.map((tech, index) =>
                  <Badge key={index} variant="secondary" className="text-xs" data-id="sd3z89xpr" data-path="src/components/RecommendationsView.tsx">
                          {tech}
                        </Badge>
                  )}
                    </div>
                  </div>

                  {/* Implementation Timeline */}
                  <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg" data-id="pcuuvso5m" data-path="src/components/RecommendationsView.tsx">
                    <div className="flex items-center gap-2" data-id="3mjvwrw1b" data-path="src/components/RecommendationsView.tsx">
                      <Zap className="w-4 h-4 text-blue-500" data-id="dbphzrg2t" data-path="src/components/RecommendationsView.tsx" />
                      <span className="text-sm font-medium" data-id="07xzgtgim" data-path="src/components/RecommendationsView.tsx">Implementation Timeline</span>
                    </div>
                    <Badge variant="outline" className="text-xs" data-id="fqif4h14m" data-path="src/components/RecommendationsView.tsx">
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
      <Card data-id="qv90tkhpq" data-path="src/components/RecommendationsView.tsx">
          <CardHeader data-id="542guktxy" data-path="src/components/RecommendationsView.tsx">
            <CardTitle data-id="5psok54aw" data-path="src/components/RecommendationsView.tsx">Implementation Roadmap</CardTitle>
            <CardDescription data-id="3ls8xcwte" data-path="src/components/RecommendationsView.tsx">
              Suggested order of implementation based on priority and dependencies
            </CardDescription>
          </CardHeader>
          <CardContent data-id="uu06ibioq" data-path="src/components/RecommendationsView.tsx">
            <div className="space-y-4" data-id="3n7xdnqai" data-path="src/components/RecommendationsView.tsx">
              <div data-id="n16lilsh3" data-path="src/components/RecommendationsView.tsx">
                <h4 className="font-medium text-sm mb-2 text-red-600" data-id="larwup4r2" data-path="src/components/RecommendationsView.tsx">Phase 1: Critical Security Gaps (0-3 months)</h4>
                <div className="pl-4 space-y-1" data-id="9ytizj6v5" data-path="src/components/RecommendationsView.tsx">
                  {highPriority.slice(0, 3).map((rec) =>
                <div key={rec.id} className="text-sm flex items-center gap-2" data-id="z25s61khk" data-path="src/components/RecommendationsView.tsx">
                      <span data-id="du94vuz0n" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(rec.domain)}</span>
                      <span data-id="hrtfthdr5" data-path="src/components/RecommendationsView.tsx">{rec.title}</span>
                    </div>
                )}
                </div>
              </div>

              <div data-id="3nij1k9ht" data-path="src/components/RecommendationsView.tsx">
                <h4 className="font-medium text-sm mb-2 text-yellow-600" data-id="523cto8rt" data-path="src/components/RecommendationsView.tsx">Phase 2: Security Enhancements (3-9 months)</h4>
                <div className="pl-4 space-y-1" data-id="zewewqrp0" data-path="src/components/RecommendationsView.tsx">
                  {[...highPriority.slice(3), ...mediumPriority.slice(0, 3)].map((rec) =>
                <div key={rec.id} className="text-sm flex items-center gap-2" data-id="xv7tsolb6" data-path="src/components/RecommendationsView.tsx">
                      <span data-id="1tzxh4tl0" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(rec.domain)}</span>
                      <span data-id="40tpgykmk" data-path="src/components/RecommendationsView.tsx">{rec.title}</span>
                    </div>
                )}
                </div>
              </div>

              <div data-id="3yfo7ndv0" data-path="src/components/RecommendationsView.tsx">
                <h4 className="font-medium text-sm mb-2 text-blue-600" data-id="88dtvmosn" data-path="src/components/RecommendationsView.tsx">Phase 3: Security Optimization (9+ months)</h4>
                <div className="pl-4 space-y-1" data-id="1hpi53mho" data-path="src/components/RecommendationsView.tsx">
                  {[...mediumPriority.slice(3), ...lowPriority].map((rec) =>
                <div key={rec.id} className="text-sm flex items-center gap-2" data-id="gymn137rh" data-path="src/components/RecommendationsView.tsx">
                      <span data-id="acu3149ow" data-path="src/components/RecommendationsView.tsx">{getDomainIcon(rec.domain)}</span>
                      <span data-id="yfwykoc32" data-path="src/components/RecommendationsView.tsx">{rec.title}</span>
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