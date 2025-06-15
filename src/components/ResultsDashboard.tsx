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

    domain.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer && answer.value !== 'na') {
        answeredCount++;
        const weight = question.weight || 1;
        switch (answer.value) {
          case 'yes':achievedScore += weight;break;
          case 'partial':achievedScore += weight * 0.5;break;
          case 'no':achievedScore += 0;break;
        }
      }
    });

    const score = totalWeight > 0 ? achievedScore / totalWeight * 100 : 0;
    const completion = answeredCount / domain.questions.length * 100;

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
  const completionRate = overallStats.answeredQuestions / overallStats.totalQuestions * 100;

  // Identify areas needing attention
  const criticalAreas = domains.filter((domain) => getDomainScore(domain).score < 60);
  const strongAreas = domains.filter((domain) => getDomainScore(domain).score >= 80);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" data-id="cp90umjr6" data-path="src/components/ResultsDashboard.tsx" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" data-id="ij2hunrpe" data-path="src/components/ResultsDashboard.tsx" />;
    return <XCircle className="w-5 h-5 text-red-500" data-id="eeppkhlsr" data-path="src/components/ResultsDashboard.tsx" />;
  };

  return (
    <div className="space-y-6" data-id="o847geof3" data-path="src/components/ResultsDashboard.tsx">
      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="lvu69oxal" data-path="src/components/ResultsDashboard.tsx">
        <Card data-id="rndirbf0g" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="9dsplaiu6" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="7p9bey6pe" data-path="src/components/ResultsDashboard.tsx">Maturity Level</CardTitle>
          </CardHeader>
          <CardContent data-id="2d5s5rtgf" data-path="src/components/ResultsDashboard.tsx">
            <div className="flex items-center gap-3" data-id="radbxq3b3" data-path="src/components/ResultsDashboard.tsx">
              <div className={`w-4 h-4 rounded-full ${maturityLevel.color}`} data-id="8l8l0cvrp" data-path="src/components/ResultsDashboard.tsx" />
              <div data-id="cp3la964i" data-path="src/components/ResultsDashboard.tsx">
                <div className="font-semibold text-xl" data-id="xbj5hyw1f" data-path="src/components/ResultsDashboard.tsx">{maturityLevel.name}</div>
                <div className="text-sm text-slate-600" data-id="4rzxqdu4j" data-path="src/components/ResultsDashboard.tsx">{maturityLevel.description}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="9nsmw1j9e" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="cxuk6temz" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="mc6tet88f" data-path="src/components/ResultsDashboard.tsx">Overall Score</CardTitle>
          </CardHeader>
          <CardContent data-id="t2io4vu56" data-path="src/components/ResultsDashboard.tsx">
            <div className="text-3xl font-bold mb-2" data-id="20dq2pk8w" data-path="src/components/ResultsDashboard.tsx">
              <span className={getScoreColor(averageScore)} data-id="ehlp67y4h" data-path="src/components/ResultsDashboard.tsx">
                {Math.round(averageScore)}%
              </span>
            </div>
            <Progress value={averageScore} className="h-2" data-id="fcdzug37i" data-path="src/components/ResultsDashboard.tsx" />
            <div className="text-sm text-slate-600 mt-2" data-id="vbqhly7rp" data-path="src/components/ResultsDashboard.tsx">
              Average across all domains
            </div>
          </CardContent>
        </Card>

        <Card data-id="cwieyyi8l" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="wyghd6i1x" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="7jxkztuat" data-path="src/components/ResultsDashboard.tsx">Completion</CardTitle>
          </CardHeader>
          <CardContent data-id="bxq9uuk6a" data-path="src/components/ResultsDashboard.tsx">
            <div className="text-3xl font-bold mb-2" data-id="fv5thvz6m" data-path="src/components/ResultsDashboard.tsx">
              {Math.round(completionRate)}%
            </div>
            <Progress value={completionRate} className="h-2" data-id="eoglbqeqr" data-path="src/components/ResultsDashboard.tsx" />
            <div className="text-sm text-slate-600 mt-2" data-id="cus3b8k2j" data-path="src/components/ResultsDashboard.tsx">
              {overallStats.answeredQuestions} of {overallStats.totalQuestions} questions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Breakdown */}
      <Card data-id="r6c61xmvs" data-path="src/components/ResultsDashboard.tsx">
        <CardHeader data-id="qfsowcgpm" data-path="src/components/ResultsDashboard.tsx">
          <CardTitle data-id="06r9z3f9c" data-path="src/components/ResultsDashboard.tsx">Domain Assessment Results</CardTitle>
          <CardDescription data-id="5z50zs0fv" data-path="src/components/ResultsDashboard.tsx">
            Detailed breakdown of security maturity across all domains
          </CardDescription>
        </CardHeader>
        <CardContent data-id="vbyvry69r" data-path="src/components/ResultsDashboard.tsx">
          <div className="space-y-4" data-id="yp5sja3v0" data-path="src/components/ResultsDashboard.tsx">
            {domains.map((domain) => {
              const domainScore = getDomainScore(domain);

              return (
                <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg" data-id="72fpqjvm4" data-path="src/components/ResultsDashboard.tsx">
                  <div className="flex items-center gap-4" data-id="7va12duti" data-path="src/components/ResultsDashboard.tsx">
                    <span className="text-2xl" data-id="zg7wa4ahx" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <div data-id="am5jpey3s" data-path="src/components/ResultsDashboard.tsx">
                      <div className="font-medium" data-id="3rdttwhz2" data-path="src/components/ResultsDashboard.tsx">{domain.name}</div>
                      <div className="text-sm text-slate-600" data-id="qzhcmmyum" data-path="src/components/ResultsDashboard.tsx">
                        {domainScore.answeredCount} of {domainScore.totalQuestions} questions answered
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4" data-id="gobwhhl3h" data-path="src/components/ResultsDashboard.tsx">
                    <div className="text-right" data-id="ik75syiqh" data-path="src/components/ResultsDashboard.tsx">
                      <div className={`text-lg font-semibold ${getScoreColor(domainScore.score)}`} data-id="k425uyyey" data-path="src/components/ResultsDashboard.tsx">
                        {Math.round(domainScore.score)}%
                      </div>
                      <Progress value={domainScore.score} className="w-24 h-2" data-id="bzhqsn0re" data-path="src/components/ResultsDashboard.tsx" />
                    </div>
                    {getScoreIcon(domainScore.score)}
                  </div>
                </div>);

            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="j1htoi2c6" data-path="src/components/ResultsDashboard.tsx">
        {/* Areas Needing Attention */}
        <Card data-id="5pxy117aw" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader data-id="7bbv8km13" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="flex items-center gap-2 text-red-600" data-id="vbm87ztny" data-path="src/components/ResultsDashboard.tsx">
              <XCircle className="w-5 h-5" data-id="obyx33rdm" data-path="src/components/ResultsDashboard.tsx" />
              Critical Areas
            </CardTitle>
            <CardDescription data-id="x8xewpr6p" data-path="src/components/ResultsDashboard.tsx">
              Domains scoring below 60% - immediate attention required
            </CardDescription>
          </CardHeader>
          <CardContent data-id="4oyh8u6en" data-path="src/components/ResultsDashboard.tsx">
            {criticalAreas.length > 0 ?
            <div className="space-y-2" data-id="vyitdys77" data-path="src/components/ResultsDashboard.tsx">
                {criticalAreas.map((domain) =>
              <div key={domain.id} className="flex items-center gap-2" data-id="hj4a9ulp1" data-path="src/components/ResultsDashboard.tsx">
                    <span data-id="kl2ugt3bd" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <span className="font-medium" data-id="6b7jgxekm" data-path="src/components/ResultsDashboard.tsx">{domain.name}</span>
                    <Badge variant="destructive" className="ml-auto" data-id="sheurjzth" data-path="src/components/ResultsDashboard.tsx">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
              )}
              </div> :

            <div className="text-center py-4 text-slate-600" data-id="htzeq3g16" data-path="src/components/ResultsDashboard.tsx">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" data-id="6deynv5x9" data-path="src/components/ResultsDashboard.tsx" />
                No critical areas identified
              </div>
            }
          </CardContent>
        </Card>

        {/* Strong Areas */}
        <Card data-id="jpm71hooh" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader data-id="il4ublexm" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="flex items-center gap-2 text-green-600" data-id="py7khzheo" data-path="src/components/ResultsDashboard.tsx">
              <CheckCircle className="w-5 h-5" data-id="v91qox3c8" data-path="src/components/ResultsDashboard.tsx" />
              Strong Areas
            </CardTitle>
            <CardDescription data-id="mcdrkz12b" data-path="src/components/ResultsDashboard.tsx">
              Domains scoring 80% or above - well-established controls
            </CardDescription>
          </CardHeader>
          <CardContent data-id="833wteapl" data-path="src/components/ResultsDashboard.tsx">
            {strongAreas.length > 0 ?
            <div className="space-y-2" data-id="2umjjuuxs" data-path="src/components/ResultsDashboard.tsx">
                {strongAreas.map((domain) =>
              <div key={domain.id} className="flex items-center gap-2" data-id="4j81lknt1" data-path="src/components/ResultsDashboard.tsx">
                    <span data-id="3wvj5qrei" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <span className="font-medium" data-id="owy074c7o" data-path="src/components/ResultsDashboard.tsx">{domain.name}</span>
                    <Badge variant="default" className="ml-auto bg-green-600" data-id="xmm7nbltd" data-path="src/components/ResultsDashboard.tsx">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
              )}
              </div> :

            <div className="text-center py-4 text-slate-600" data-id="k26xeu8pl" data-path="src/components/ResultsDashboard.tsx">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" data-id="52u846lgc" data-path="src/components/ResultsDashboard.tsx" />
                No domains at mature level yet
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default ResultsDashboard;