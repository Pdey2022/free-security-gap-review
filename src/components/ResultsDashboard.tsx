import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { Domain, Answer, MaturityLevel } from '@/types/assessment';

interface ResultsDashboardProps {
  domains: Domain[];
  answers: Record<string, Answer>;
  maturityLevel: MaturityLevel;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  domains,
  answers,
  maturityLevel
}) => {
  // Calculate domain scores
  const getDomainScore = (domain: Domain) => {
    const totalWeight = domain.questions.reduce((sum, q) => sum + (q.weight || 1), 0);
    let achievedScore = 0;
    let answeredCount = 0;
    
    domain.questions.forEach(question => {
      const answer = answers[question.id];
      if (answer && answer.value !== 'na') {
        answeredCount++;
        const weight = question.weight || 1;
        switch (answer.value) {
          case 'yes': achievedScore += weight; break;
          case 'partial': achievedScore += weight * 0.5; break;
          case 'no': achievedScore += 0; break;
        }
      }
    });
    
    const score = totalWeight > 0 ? (achievedScore / totalWeight) * 100 : 0;
    const completion = (answeredCount / domain.questions.length) * 100;
    
    return { score, completion, answeredCount, totalQuestions: domain.questions.length };
  };

  // Calculate overall statistics
  const overallStats = domains.reduce((acc, domain) => {
    const domainScore = getDomainScore(domain);
    acc.totalQuestions += domainScore.totalQuestions;
    acc.answeredQuestions += domainScore.answeredCount;
    acc.scores.push(domainScore.score);
    return acc;
  }, { totalQuestions: 0, answeredQuestions: 0, scores: [] as number[] });

  const averageScore = overallStats.scores.reduce((sum, score) => sum + score, 0) / overallStats.scores.length;
  const completionRate = (overallStats.answeredQuestions / overallStats.totalQuestions) * 100;

  // Identify areas needing attention
  const criticalAreas = domains.filter(domain => getDomainScore(domain).score < 60);
  const strongAreas = domains.filter(domain => getDomainScore(domain).score >= 80);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Maturity Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${maturityLevel.color}`} />
              <div>
                <div className="font-semibold text-xl">{maturityLevel.name}</div>
                <div className="text-sm text-slate-600">{maturityLevel.description}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              <span className={getScoreColor(averageScore)}>
                {Math.round(averageScore)}%
              </span>
            </div>
            <Progress value={averageScore} className="h-2" />
            <div className="text-sm text-slate-600 mt-2">
              Average across all domains
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {Math.round(completionRate)}%
            </div>
            <Progress value={completionRate} className="h-2" />
            <div className="text-sm text-slate-600 mt-2">
              {overallStats.answeredQuestions} of {overallStats.totalQuestions} questions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Assessment Results</CardTitle>
          <CardDescription>
            Detailed breakdown of security maturity across all domains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {domains.map(domain => {
              const domainScore = getDomainScore(domain);
              
              return (
                <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{domain.icon}</span>
                    <div>
                      <div className="font-medium">{domain.name}</div>
                      <div className="text-sm text-slate-600">
                        {domainScore.answeredCount} of {domainScore.totalQuestions} questions answered
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getScoreColor(domainScore.score)}`}>
                        {Math.round(domainScore.score)}%
                      </div>
                      <Progress value={domainScore.score} className="w-24 h-2" />
                    </div>
                    {getScoreIcon(domainScore.score)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Areas Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Critical Areas
            </CardTitle>
            <CardDescription>
              Domains scoring below 60% - immediate attention required
            </CardDescription>
          </CardHeader>
          <CardContent>
            {criticalAreas.length > 0 ? (
              <div className="space-y-2">
                {criticalAreas.map(domain => (
                  <div key={domain.id} className="flex items-center gap-2">
                    <span>{domain.icon}</span>
                    <span className="font-medium">{domain.name}</span>
                    <Badge variant="destructive" className="ml-auto">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-600">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                No critical areas identified
              </div>
            )}
          </CardContent>
        </Card>

        {/* Strong Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Strong Areas
            </CardTitle>
            <CardDescription>
              Domains scoring 80% or above - well-established controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            {strongAreas.length > 0 ? (
              <div className="space-y-2">
                {strongAreas.map(domain => (
                  <div key={domain.id} className="flex items-center gap-2">
                    <span>{domain.icon}</span>
                    <span className="font-medium">{domain.name}</span>
                    <Badge variant="default" className="ml-auto bg-green-600">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-600">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                No domains at mature level yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDashboard;