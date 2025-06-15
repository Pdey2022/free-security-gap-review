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
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" data-id="5dgmtl8j1" data-path="src/components/ResultsDashboard.tsx" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" data-id="ubkqkm6wz" data-path="src/components/ResultsDashboard.tsx" />;
    return <XCircle className="w-5 h-5 text-red-500" data-id="r8v9785er" data-path="src/components/ResultsDashboard.tsx" />;
  };

  return (
    <div className="space-y-6" data-id="jetj7h7rk" data-path="src/components/ResultsDashboard.tsx">
      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="lreup79l0" data-path="src/components/ResultsDashboard.tsx">
        <Card data-id="p7qfzmdb6" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="wmz3ugjb9" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="583d8nn6z" data-path="src/components/ResultsDashboard.tsx">Maturity Level</CardTitle>
          </CardHeader>
          <CardContent data-id="w9rqf9shl" data-path="src/components/ResultsDashboard.tsx">
            <div className="flex items-center gap-3" data-id="4z5m1z0f2" data-path="src/components/ResultsDashboard.tsx">
              <div className={`w-4 h-4 rounded-full ${maturityLevel.color}`} data-id="b2j71y3fj" data-path="src/components/ResultsDashboard.tsx" />
              <div data-id="fagkjpv81" data-path="src/components/ResultsDashboard.tsx">
                <div className="font-semibold text-xl" data-id="ao3iko3vl" data-path="src/components/ResultsDashboard.tsx">{maturityLevel.name}</div>
                <div className="text-sm text-slate-600" data-id="eos901uwj" data-path="src/components/ResultsDashboard.tsx">{maturityLevel.description}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="0txgz8wj3" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="zuvgtlx43" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="gingqaxo7" data-path="src/components/ResultsDashboard.tsx">Overall Score</CardTitle>
          </CardHeader>
          <CardContent data-id="xr4z3jooe" data-path="src/components/ResultsDashboard.tsx">
            <div className="text-3xl font-bold mb-2" data-id="dswaibwp0" data-path="src/components/ResultsDashboard.tsx">
              <span className={getScoreColor(averageScore)} data-id="xrom9xxkl" data-path="src/components/ResultsDashboard.tsx">
                {Math.round(averageScore)}%
              </span>
            </div>
            <Progress value={averageScore} className="h-2" data-id="ejqf5cflk" data-path="src/components/ResultsDashboard.tsx" />
            <div className="text-sm text-slate-600 mt-2" data-id="82i1db6oz" data-path="src/components/ResultsDashboard.tsx">
              Average across all domains
            </div>
          </CardContent>
        </Card>

        <Card data-id="ilujwnyyn" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="3uxheoq0j" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="2vmyss1og" data-path="src/components/ResultsDashboard.tsx">Completion</CardTitle>
          </CardHeader>
          <CardContent data-id="8t4usxtbg" data-path="src/components/ResultsDashboard.tsx">
            <div className="text-3xl font-bold mb-2" data-id="szj1xo3oa" data-path="src/components/ResultsDashboard.tsx">
              {Math.round(completionRate)}%
            </div>
            <Progress value={completionRate} className="h-2" data-id="1ug1bn3vs" data-path="src/components/ResultsDashboard.tsx" />
            <div className="text-sm text-slate-600 mt-2" data-id="tnodv9byh" data-path="src/components/ResultsDashboard.tsx">
              {overallStats.answeredQuestions} of {overallStats.totalQuestions} questions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Breakdown */}
      <Card data-id="moes2htxx" data-path="src/components/ResultsDashboard.tsx">
        <CardHeader data-id="23elpxpde" data-path="src/components/ResultsDashboard.tsx">
          <CardTitle data-id="xfqwsxrgn" data-path="src/components/ResultsDashboard.tsx">Domain Assessment Results</CardTitle>
          <CardDescription data-id="3hppr948v" data-path="src/components/ResultsDashboard.tsx">
            Detailed breakdown of security maturity across all domains
          </CardDescription>
        </CardHeader>
        <CardContent data-id="l6jahxk5q" data-path="src/components/ResultsDashboard.tsx">
          <div className="space-y-4" data-id="gevmhzwni" data-path="src/components/ResultsDashboard.tsx">
            {domains.map((domain) => {
              const domainScore = getDomainScore(domain);

              return (
                <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg" data-id="amznrdsgx" data-path="src/components/ResultsDashboard.tsx">
                  <div className="flex items-center gap-4" data-id="0prqbbm9h" data-path="src/components/ResultsDashboard.tsx">
                    <span className="text-2xl" data-id="sqqn7lrsy" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <div data-id="gemohlpf0" data-path="src/components/ResultsDashboard.tsx">
                      <div className="font-medium" data-id="gte42wmia" data-path="src/components/ResultsDashboard.tsx">{domain.name}</div>
                      <div className="text-sm text-slate-600" data-id="ml3lgix0u" data-path="src/components/ResultsDashboard.tsx">
                        {domainScore.answeredCount} of {domainScore.totalQuestions} questions answered
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4" data-id="0dk66s7bg" data-path="src/components/ResultsDashboard.tsx">
                    <div className="text-right" data-id="uu86cfnr7" data-path="src/components/ResultsDashboard.tsx">
                      <div className={`text-lg font-semibold ${getScoreColor(domainScore.score)}`} data-id="q2u703hfx" data-path="src/components/ResultsDashboard.tsx">
                        {Math.round(domainScore.score)}%
                      </div>
                      <Progress value={domainScore.score} className="w-24 h-2" data-id="8hrl0r284" data-path="src/components/ResultsDashboard.tsx" />
                    </div>
                    {getScoreIcon(domainScore.score)}
                  </div>
                </div>);

            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="z4pcy9mm3" data-path="src/components/ResultsDashboard.tsx">
        {/* Areas Needing Attention */}
        <Card data-id="9blc929r3" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader data-id="iowwgt7an" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="flex items-center gap-2 text-red-600" data-id="mjy2bpejr" data-path="src/components/ResultsDashboard.tsx">
              <XCircle className="w-5 h-5" data-id="d8lnk2wt8" data-path="src/components/ResultsDashboard.tsx" />
              Critical Areas
            </CardTitle>
            <CardDescription data-id="9odzsmxrf" data-path="src/components/ResultsDashboard.tsx">
              Domains scoring below 60% - immediate attention required
            </CardDescription>
          </CardHeader>
          <CardContent data-id="ndbdq1bg5" data-path="src/components/ResultsDashboard.tsx">
            {criticalAreas.length > 0 ?
            <div className="space-y-2" data-id="iqknboe2i" data-path="src/components/ResultsDashboard.tsx">
                {criticalAreas.map((domain) =>
              <div key={domain.id} className="flex items-center gap-2" data-id="j88csf3dy" data-path="src/components/ResultsDashboard.tsx">
                    <span data-id="4urzppev4" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <span className="font-medium" data-id="5a1g3kun4" data-path="src/components/ResultsDashboard.tsx">{domain.name}</span>
                    <Badge variant="destructive" className="ml-auto" data-id="hx0ax5vff" data-path="src/components/ResultsDashboard.tsx">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
              )}
              </div> :

            <div className="text-center py-4 text-slate-600" data-id="2jlnr4vhd" data-path="src/components/ResultsDashboard.tsx">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" data-id="0i2ub9tpo" data-path="src/components/ResultsDashboard.tsx" />
                No critical areas identified
              </div>
            }
          </CardContent>
        </Card>

        {/* Strong Areas */}
        <Card data-id="151elvv1x" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader data-id="x0izohv9z" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="flex items-center gap-2 text-green-600" data-id="e1775z4gl" data-path="src/components/ResultsDashboard.tsx">
              <CheckCircle className="w-5 h-5" data-id="j2nib7xsm" data-path="src/components/ResultsDashboard.tsx" />
              Strong Areas
            </CardTitle>
            <CardDescription data-id="dnhcbexu0" data-path="src/components/ResultsDashboard.tsx">
              Domains scoring 80% or above - well-established controls
            </CardDescription>
          </CardHeader>
          <CardContent data-id="cz5csgoqo" data-path="src/components/ResultsDashboard.tsx">
            {strongAreas.length > 0 ?
            <div className="space-y-2" data-id="9c3zsvt48" data-path="src/components/ResultsDashboard.tsx">
                {strongAreas.map((domain) =>
              <div key={domain.id} className="flex items-center gap-2" data-id="bxi09rhji" data-path="src/components/ResultsDashboard.tsx">
                    <span data-id="mx6fxf65x" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <span className="font-medium" data-id="i89p6in8y" data-path="src/components/ResultsDashboard.tsx">{domain.name}</span>
                    <Badge variant="default" className="ml-auto bg-green-600" data-id="mfuasj7o0" data-path="src/components/ResultsDashboard.tsx">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
              )}
              </div> :

            <div className="text-center py-4 text-slate-600" data-id="fryehdpb9" data-path="src/components/ResultsDashboard.tsx">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" data-id="etbxhogw5" data-path="src/components/ResultsDashboard.tsx" />
                No domains at mature level yet
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default ResultsDashboard;