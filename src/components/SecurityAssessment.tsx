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

  const goToNextDomain = () => {
    const currentIndex = securityDomains.findIndex((d) => d.id === assessmentState.currentDomain);
    if (currentIndex < securityDomains.length - 1) {
      const nextDomain = securityDomains[currentIndex + 1];
      setCurrentDomain(nextDomain.id);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4" data-id="cj1f3nag2" data-path="src/components/SecurityAssessment.tsx">
      <div className="max-w-7xl mx-auto" data-id="074a3umnl" data-path="src/components/SecurityAssessment.tsx">
        {/* Header */}
        <div className="mb-8" data-id="5lo0hcwcr" data-path="src/components/SecurityAssessment.tsx">
          <h1 className="text-4xl font-bold text-slate-900 mb-2" data-id="ym7brv6ks" data-path="src/components/SecurityAssessment.tsx">
            High Level Security Maturity Assessment
          </h1>
          <p className="text-lg text-slate-600" data-id="m0gumt5qg" data-path="src/components/SecurityAssessment.tsx">
            Comprehensive security review to identify maturity gaps and recommend mitigating technologies
          </p>
          
          {/* Overall Progress */}
          <Card className="mt-4" data-id="ygbwjug3b" data-path="src/components/SecurityAssessment.tsx">
            <CardContent className="pt-6" data-id="sc9x39kld" data-path="src/components/SecurityAssessment.tsx">
              <div className="flex items-center justify-between mb-2" data-id="n0x9sb8ia" data-path="src/components/SecurityAssessment.tsx">
                <span className="text-sm font-medium" data-id="it2qose8q" data-path="src/components/SecurityAssessment.tsx">Overall Progress</span>
                <span className="text-sm text-slate-600" data-id="4il2uzg2n" data-path="src/components/SecurityAssessment.tsx">
                  {answeredQuestions} of {totalQuestions} questions
                </span>
              </div>
              <Progress value={overallProgress} className="h-2" data-id="2otta1n0p" data-path="src/components/SecurityAssessment.tsx" />
              
              <div className="flex items-center gap-4 mt-4" data-id="ocdwk8l9z" data-path="src/components/SecurityAssessment.tsx">
                <div className="flex items-center gap-2" data-id="hhl3mvzrc" data-path="src/components/SecurityAssessment.tsx">
                  <div className={`w-3 h-3 rounded-full ${currentMaturity.color}`} data-id="6u7zhhqkg" data-path="src/components/SecurityAssessment.tsx" />
                  <span className="text-sm font-medium" data-id="zh1su6j88" data-path="src/components/SecurityAssessment.tsx">
                    Maturity Level: {currentMaturity.name}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs" data-id="mt9trixws" data-path="src/components/SecurityAssessment.tsx">
                  {currentMaturity.description}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6" data-id="9n6zivqdk" data-path="src/components/SecurityAssessment.tsx">
          <TabsList className="grid w-full grid-cols-3" data-id="n6hafocex" data-path="src/components/SecurityAssessment.tsx">
            <TabsTrigger value="assessment" className="flex items-center gap-2" data-id="usvfimsl2" data-path="src/components/SecurityAssessment.tsx">
              <FileText className="w-4 h-4" data-id="djfs4ktjk" data-path="src/components/SecurityAssessment.tsx" />
              Assessment
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2" data-id="92rattyvm" data-path="src/components/SecurityAssessment.tsx">
              <CheckCircle className="w-4 h-4" data-id="w2fc0e567" data-path="src/components/SecurityAssessment.tsx" />
              Results
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2" data-id="7yejrm0te" data-path="src/components/SecurityAssessment.tsx">
              <AlertCircle className="w-4 h-4" data-id="rvs3h43op" data-path="src/components/SecurityAssessment.tsx" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6" data-id="taic8qogc" data-path="src/components/SecurityAssessment.tsx">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[calc(100vh-400px)]" data-id="qt7rtck7o" data-path="src/components/SecurityAssessment.tsx">
              {/* Domain Navigation - Made wider from col-span-1 to col-span-2 */}
              <div className="lg:col-span-2" data-id="di25hyruf" data-path="src/components/SecurityAssessment.tsx">
                <Card className="h-full" data-id="pi0vl4b4y" data-path="src/components/SecurityAssessment.tsx">
                  <CardHeader className="pb-3" data-id="01ajnmp5d" data-path="src/components/SecurityAssessment.tsx">
                    <CardTitle className="text-lg" data-id="23jgrlv6f" data-path="src/components/SecurityAssessment.tsx">Security Domains</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]" data-id="wzs3e28kk" data-path="src/components/SecurityAssessment.tsx">
                    <ScrollArea className="flex-1 px-4" data-id="c0cx1phc8" data-path="src/components/SecurityAssessment.tsx">
                      <div className="space-y-2 pb-4" data-id="brit8qeh1" data-path="src/components/SecurityAssessment.tsx">
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
                              onClick={() => setCurrentDomain(domain.id)} data-id="tofiitn7m" data-path="src/components/SecurityAssessment.tsx">

                              <div className="flex items-start gap-3 w-full" data-id="yg8ms8vug" data-path="src/components/SecurityAssessment.tsx">
                                <span className="text-lg flex-shrink-0" data-id="8m2huw3dl" data-path="src/components/SecurityAssessment.tsx">{domain.icon}</span>
                                <div className="flex-1 min-w-0 space-y-2" data-id="ckqqasb1t" data-path="src/components/SecurityAssessment.tsx">
                                  <div className="font-medium text-sm leading-tight" data-id="pwhstq9aa" data-path="src/components/SecurityAssessment.tsx">
                                    {domain.name}
                                  </div>
                                  <div className="flex items-center gap-2" data-id="im9zn4zs4" data-path="src/components/SecurityAssessment.tsx">
                                    <Progress value={progress} className="h-1 flex-1" data-id="yfm1bzh56" data-path="src/components/SecurityAssessment.tsx" />
                                    {isComplete &&
                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" data-id="r7cywbazh" data-path="src/components/SecurityAssessment.tsx" />
                                    }
                                  </div>
                                  <div className="text-xs opacity-75" data-id="mn632l5sy" data-path="src/components/SecurityAssessment.tsx">
                                    {Math.round(progress)}% complete
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

              {/* Domain Assessment - Adjusted to take remaining space (col-span-3) */}
              <div className="lg:col-span-3 min-h-0" data-id="jhavhvrdz" data-path="src/components/SecurityAssessment.tsx">
                <DomainAssessment
                  domain={securityDomains.find((d) => d.id === assessmentState.currentDomain)!}
                  answers={assessmentState.answers}
                  onAnswerUpdate={updateAnswer}
                  onNext={goToNextDomain}
                  isLastDomain={assessmentState.currentDomain === securityDomains[securityDomains.length - 1].id} data-id="vn9an71bz" data-path="src/components/SecurityAssessment.tsx" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" data-id="k9at19pph" data-path="src/components/SecurityAssessment.tsx">
            <ResultsDashboard
              domains={securityDomains}
              answers={assessmentState.answers}
              maturityLevel={currentMaturity} data-id="01tcjicwp" data-path="src/components/SecurityAssessment.tsx" />
          </TabsContent>

          <TabsContent value="recommendations" data-id="es4jm9ypn" data-path="src/components/SecurityAssessment.tsx">
            <RecommendationsView
              recommendations={getRecommendations()}
              answers={assessmentState.answers}
              domains={securityDomains}
              maturityLevel={currentMaturity} data-id="xedugond6" data-path="src/components/SecurityAssessment.tsx" />
          </TabsContent>
        </Tabs>
      </div>
    </div>);

};

export default SecurityAssessment;