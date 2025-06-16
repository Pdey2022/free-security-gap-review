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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            High Level Security Maturity Assessment
          </h1>
          <p className="text-lg text-slate-600">
            Comprehensive security review to identify maturity gaps and recommend mitigating technologies
          </p>
          
          {/* Overall Progress */}
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-slate-600">
                  {answeredQuestions} of {totalQuestions} questions
                </span>
              </div>
              <Progress value={overallProgress} className="h-2" />
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${currentMaturity.color}`} />
                  <span className="text-sm font-medium">
                    Maturity Level: {currentMaturity.name}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {currentMaturity.description}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Assessment
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[calc(100vh-400px)]">
              {/* Domain Navigation - Made wider from col-span-1 to col-span-2 */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Security Domains</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
                    <ScrollArea className="flex-1 px-4">
                      <div className="space-y-2 pb-4">
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
                              onClick={() => setCurrentDomain(domain.id)}>

                              <div className="flex items-start gap-3 w-full">
                                <span className="text-lg flex-shrink-0">{domain.icon}</span>
                                <div className="flex-1 min-w-0 space-y-2">
                                  <div className="font-medium text-sm leading-tight">
                                    {domain.name}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={progress} className="h-1 flex-1" />
                                    {isComplete &&
                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                    }
                                  </div>
                                  <div className="text-xs opacity-75">
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
              <div className="lg:col-span-3 min-h-0">
                <DomainAssessment
                  domain={securityDomains.find((d) => d.id === assessmentState.currentDomain)!}
                  answers={assessmentState.answers}
                  onAnswerUpdate={updateAnswer}
                  onNext={goToNextDomain}
                  isLastDomain={assessmentState.currentDomain === securityDomains[securityDomains.length - 1].id} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <ResultsDashboard
              domains={securityDomains}
              answers={assessmentState.answers}
              maturityLevel={currentMaturity} />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsView
              recommendations={getRecommendations()}
              answers={assessmentState.answers}
              domains={securityDomains}
              maturityLevel={currentMaturity} />
          </TabsContent>
        </Tabs>
      </div>
    </div>);

};

export default SecurityAssessment;