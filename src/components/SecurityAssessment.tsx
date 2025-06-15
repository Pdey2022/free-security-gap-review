import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle, Clock, FileText, Download } from 'lucide-react';
import { securityDomains } from '@/data/securityDomains';
import { recommendationDatabase } from '@/data/recommendations';
import { AssessmentState, Answer, MaturityLevel } from '@/types/assessment';
import DomainAssessment from '@/components/DomainAssessment';
import ResultsDashboard from '@/components/ResultsDashboard';
import RecommendationsView from '@/components/RecommendationsView';

const maturityLevels: MaturityLevel[] = [
{ level: 1, name: 'Initial', description: 'Ad-hoc security practices', color: 'bg-red-500' },
{ level: 2, name: 'Developing', description: 'Basic security controls in place', color: 'bg-orange-500' },
{ level: 3, name: 'Defined', description: 'Documented security processes', color: 'bg-yellow-500' },
{ level: 4, name: 'Managed', description: 'Measured and controlled security', color: 'bg-blue-500' },
{ level: 5, name: 'Optimized', description: 'Continuously improving security', color: 'bg-green-500' }];


const SecurityAssessment: React.FC = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    answers: {},
    currentDomain: 'governance',
    completedDomains: []
  });

  const [activeTab, setActiveTab] = useState('assessment');

  // Calculate progress
  const totalQuestions = securityDomains.reduce((sum, domain) => sum + domain.questions.length, 0);
  const answeredQuestions = Object.keys(assessmentState.answers).length;
  const overallProgress = answeredQuestions / totalQuestions * 100;

  // Calculate domain progress
  const getDomainProgress = (domainId: string) => {
    const domain = securityDomains.find((d) => d.id === domainId);
    if (!domain) return 0;

    const domainAnswers = domain.questions.filter((q) => assessmentState.answers[q.id]);
    return domainAnswers.length / domain.questions.length * 100;
  };

  // Calculate maturity level
  const calculateMaturityLevel = (): MaturityLevel => {
    const scores = securityDomains.map((domain) => {
      const totalWeight = domain.questions.reduce((sum, q) => sum + (q.weight || 1), 0);
      let achievedScore = 0;

      domain.questions.forEach((question) => {
        const answer = assessmentState.answers[question.id];
        if (answer) {
          const weight = question.weight || 1;
          switch (answer.value) {
            case 'yes':achievedScore += weight;break;
            case 'partial':achievedScore += weight * 0.5;break;
            case 'no':achievedScore += 0;break;
            case 'na':break; // Don't count N/A in scoring
          }
        }
      });

      return totalWeight > 0 ? achievedScore / totalWeight * 100 : 0;
    });

    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    if (averageScore >= 90) return maturityLevels[4];
    if (averageScore >= 75) return maturityLevels[3];
    if (averageScore >= 60) return maturityLevels[2];
    if (averageScore >= 40) return maturityLevels[1];
    return maturityLevels[0];
  };

  const updateAnswer = (questionId: string, answer: Answer) => {
    setAssessmentState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const setCurrentDomain = (domainId: string) => {
    setAssessmentState((prev) => ({
      ...prev,
      currentDomain: domainId
    }));
  };

  const getRecommendations = () => {
    const gaps: string[] = [];

    securityDomains.forEach((domain) => {
      domain.questions.forEach((question) => {
        const answer = assessmentState.answers[question.id];
        if (!answer || answer.value === 'no' || answer.value === 'partial' && (question.weight || 1) >= 2) {
          gaps.push(domain.id);
        }
      });
    });

    // Use the updated recommendation function with smart prioritization
    const allRecommendations = recommendationDatabase(assessmentState.answers);
    return allRecommendations.filter((rec) => gaps.includes(rec.domain));
  };

  const currentMaturity = calculateMaturityLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4" data-id="gqfe2l38m" data-path="src/components/SecurityAssessment.tsx">
      <div className="max-w-7xl mx-auto" data-id="2q8pn1hky" data-path="src/components/SecurityAssessment.tsx">
        {/* Header */}
        <div className="mb-8" data-id="xn2xs3sax" data-path="src/components/SecurityAssessment.tsx">
          <h1 className="text-4xl font-bold text-slate-900 mb-2" data-id="06w69vnmn" data-path="src/components/SecurityAssessment.tsx">
            Free - High Level Security Maturity Assessment
          </h1>
          <p className="text-lg text-slate-600" data-id="tt52hl532" data-path="src/components/SecurityAssessment.tsx">
            Comprehensive security review to identify maturity gaps and recommend mitigating technologies
          </p>
          
          {/* Overall Progress */}
          <Card className="mt-4" data-id="cdgvgi5io" data-path="src/components/SecurityAssessment.tsx">
            <CardContent className="pt-6" data-id="ewb1py964" data-path="src/components/SecurityAssessment.tsx">
              <div className="flex items-center justify-between mb-2" data-id="kdq6g2s6l" data-path="src/components/SecurityAssessment.tsx">
                <span className="text-sm font-medium" data-id="147ed9w04" data-path="src/components/SecurityAssessment.tsx">Overall Progress</span>
                <span className="text-sm text-slate-600" data-id="rx8n1uulj" data-path="src/components/SecurityAssessment.tsx">
                  {answeredQuestions} of {totalQuestions} questions
                </span>
              </div>
              <Progress value={overallProgress} className="h-2" data-id="zwpbtvuip" data-path="src/components/SecurityAssessment.tsx" />
              
              <div className="flex items-center gap-4 mt-4" data-id="a141y3xje" data-path="src/components/SecurityAssessment.tsx">
                <div className="flex items-center gap-2" data-id="ue4366srj" data-path="src/components/SecurityAssessment.tsx">
                  <div className={`w-3 h-3 rounded-full ${currentMaturity.color}`} data-id="oo0q2y27z" data-path="src/components/SecurityAssessment.tsx" />
                  <span className="text-sm font-medium" data-id="7f9pq8le6" data-path="src/components/SecurityAssessment.tsx">
                    Maturity Level: {currentMaturity.name}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs" data-id="7py47wcyn" data-path="src/components/SecurityAssessment.tsx">
                  {currentMaturity.description}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6" data-id="xyeclrxih" data-path="src/components/SecurityAssessment.tsx">
          <TabsList className="grid w-full grid-cols-3" data-id="ryeloxsh9" data-path="src/components/SecurityAssessment.tsx">
            <TabsTrigger value="assessment" className="flex items-center gap-2" data-id="b6il2a51u" data-path="src/components/SecurityAssessment.tsx">
              <FileText className="w-4 h-4" data-id="ndynk2h9a" data-path="src/components/SecurityAssessment.tsx" />
              Assessment
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2" data-id="yj4ij7w8x" data-path="src/components/SecurityAssessment.tsx">
              <CheckCircle className="w-4 h-4" data-id="ttu45vtca" data-path="src/components/SecurityAssessment.tsx" />
              Results
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2" data-id="sxen4ibic" data-path="src/components/SecurityAssessment.tsx">
              <AlertCircle className="w-4 h-4" data-id="r2xn6pi5g" data-path="src/components/SecurityAssessment.tsx" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6" data-id="h2s6qin5p" data-path="src/components/SecurityAssessment.tsx">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" data-id="mlfr1lo2r" data-path="src/components/SecurityAssessment.tsx">
              {/* Domain Navigation */}
              <div className="lg:col-span-1" data-id="f9k3na63o" data-path="src/components/SecurityAssessment.tsx">
                <Card data-id="tj19ai0v1" data-path="src/components/SecurityAssessment.tsx">
                  <CardHeader data-id="i6gmw569k" data-path="src/components/SecurityAssessment.tsx">
                    <CardTitle className="text-lg" data-id="wlm21o074" data-path="src/components/SecurityAssessment.tsx">Security Domains</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0" data-id="jpiehutoy" data-path="src/components/SecurityAssessment.tsx">
                    <ScrollArea className="h-[600px]" data-id="7q19vuyef" data-path="src/components/SecurityAssessment.tsx">
                      <div className="space-y-1 p-4" data-id="n0i1v3nn6" data-path="src/components/SecurityAssessment.tsx">
                        {securityDomains.map((domain) => {
                          const progress = getDomainProgress(domain.id);
                          const isComplete = progress === 100;
                          const isActive = assessmentState.currentDomain === domain.id;

                          return (
                            <Button
                              key={domain.id}
                              variant={isActive ? "default" : "ghost"}
                              className={`w-full justify-start text-left h-auto p-3 ${
                              isActive ? "bg-primary text-primary-foreground" : ""}`
                              }
                              onClick={() => setCurrentDomain(domain.id)} data-id="w8xvo1xy3" data-path="src/components/SecurityAssessment.tsx">

                              <div className="flex items-start gap-3 w-full" data-id="dp9l935wz" data-path="src/components/SecurityAssessment.tsx">
                                <span className="text-lg" data-id="by8hnfqs5" data-path="src/components/SecurityAssessment.tsx">{domain.icon}</span>
                                <div className="flex-1 min-w-0" data-id="hfkadzt34" data-path="src/components/SecurityAssessment.tsx">
                                  <div className="font-medium text-sm line-clamp-2" data-id="umnkrw4ok" data-path="src/components/SecurityAssessment.tsx">
                                    {domain.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1" data-id="iwxhd33g7" data-path="src/components/SecurityAssessment.tsx">
                                    <Progress value={progress} className="h-1 flex-1" data-id="yatt490dy" data-path="src/components/SecurityAssessment.tsx" />
                                    {isComplete &&
                                    <CheckCircle className="w-3 h-3 text-green-500" data-id="q8kmgz348" data-path="src/components/SecurityAssessment.tsx" />
                                    }
                                  </div>
                                </div>
                              </div>
                            </Button>);

                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Domain Assessment */}
              <div className="lg:col-span-3" data-id="8sam8afdj" data-path="src/components/SecurityAssessment.tsx">
                <DomainAssessment
                  domain={securityDomains.find((d) => d.id === assessmentState.currentDomain)!}
                  answers={assessmentState.answers}
                  onAnswerUpdate={updateAnswer} data-id="jsfq71nuk" data-path="src/components/SecurityAssessment.tsx" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" data-id="1o3fzko55" data-path="src/components/SecurityAssessment.tsx">
            <ResultsDashboard
              domains={securityDomains}
              answers={assessmentState.answers}
              maturityLevel={currentMaturity} data-id="tqtu4ktmx" data-path="src/components/SecurityAssessment.tsx" />
          </TabsContent>

          <TabsContent value="recommendations" data-id="8bjwn50r0" data-path="src/components/SecurityAssessment.tsx">
            <RecommendationsView
              recommendations={getRecommendations()}
              answers={assessmentState.answers} data-id="omrva1byo" data-path="src/components/SecurityAssessment.tsx" />
          </TabsContent>
        </Tabs>
      </div>
    </div>);

};

export default SecurityAssessment;