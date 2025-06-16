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
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" data-id="vipudyb31" data-path="src/components/ResultsDashboard.tsx" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" data-id="6nnopci5s" data-path="src/components/ResultsDashboard.tsx" />;
    return <XCircle className="w-5 h-5 text-red-500" data-id="attyxiscj" data-path="src/components/ResultsDashboard.tsx" />;
  };

  return (
    <div className="space-y-6" data-id="3g3wwqc29" data-path="src/components/ResultsDashboard.tsx">
      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="6n447s3xt" data-path="src/components/ResultsDashboard.tsx">
        <Card data-id="dr2mxhhnp" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="on0wyssab" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="dlnxajf9e" data-path="src/components/ResultsDashboard.tsx">Maturity Level</CardTitle>
          </CardHeader>
          <CardContent data-id="br5z9xit8" data-path="src/components/ResultsDashboard.tsx">
            <div className="flex items-center gap-3" data-id="akqs8knqy" data-path="src/components/ResultsDashboard.tsx">
              <div className={`w-4 h-4 rounded-full ${maturityLevel.color}`} data-id="ytfwyk8uc" data-path="src/components/ResultsDashboard.tsx" />
              <div data-id="9qbch4qtm" data-path="src/components/ResultsDashboard.tsx">
                <div className="font-semibold text-xl" data-id="62t35olh1" data-path="src/components/ResultsDashboard.tsx">{maturityLevel.name}</div>
                <div className="text-sm text-slate-600" data-id="pl8lz1e8m" data-path="src/components/ResultsDashboard.tsx">{maturityLevel.description}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-id="e12f9ojs8" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="sbay64rb3" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="e0vcxw9pb" data-path="src/components/ResultsDashboard.tsx">Overall Score</CardTitle>
          </CardHeader>
          <CardContent data-id="2rc7r2ltx" data-path="src/components/ResultsDashboard.tsx">
            <div className="text-3xl font-bold mb-2" data-id="jarejood7" data-path="src/components/ResultsDashboard.tsx">
              <span className={getScoreColor(averageScore)} data-id="k0ir806ya" data-path="src/components/ResultsDashboard.tsx">
                {Math.round(averageScore)}%
              </span>
            </div>
            <Progress value={averageScore} className="h-2" data-id="hzn2ywo1o" data-path="src/components/ResultsDashboard.tsx" />
            <div className="text-sm text-slate-600 mt-2" data-id="wztw3u0xe" data-path="src/components/ResultsDashboard.tsx">
              Average across all domains
            </div>
          </CardContent>
        </Card>

        <Card data-id="um4b9cw9d" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader className="pb-4" data-id="t7j4g7q6s" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="text-lg" data-id="q9s6t9kia" data-path="src/components/ResultsDashboard.tsx">Completion</CardTitle>
          </CardHeader>
          <CardContent data-id="3erqqqeq9" data-path="src/components/ResultsDashboard.tsx">
            <div className="text-3xl font-bold mb-2" data-id="n9uw4jzm1" data-path="src/components/ResultsDashboard.tsx">
              {Math.round(completionRate)}%
            </div>
            <Progress value={completionRate} className="h-2" data-id="nwyi3tc0b" data-path="src/components/ResultsDashboard.tsx" />
            <div className="text-sm text-slate-600 mt-2" data-id="756ve2yay" data-path="src/components/ResultsDashboard.tsx">
              {overallStats.answeredQuestions} of {overallStats.totalQuestions} questions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Breakdown */}
      <Card data-id="0p4gn9qrg" data-path="src/components/ResultsDashboard.tsx">
        <CardHeader data-id="yei1pd5br" data-path="src/components/ResultsDashboard.tsx">
          <CardTitle data-id="h0ja2fbkf" data-path="src/components/ResultsDashboard.tsx">Domain Assessment Results</CardTitle>
          <CardDescription data-id="8jcosy251" data-path="src/components/ResultsDashboard.tsx">
            Detailed breakdown of security maturity across all domains
          </CardDescription>
        </CardHeader>
        <CardContent data-id="mh47vpyod" data-path="src/components/ResultsDashboard.tsx">
          <div className="space-y-4" data-id="v5lb5tvqk" data-path="src/components/ResultsDashboard.tsx">
            {domains.map((domain) => {
              const domainScore = getDomainScore(domain);

              return (
                <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg" data-id="rc27xiolc" data-path="src/components/ResultsDashboard.tsx">
                  <div className="flex items-center gap-4" data-id="yc12bnjzu" data-path="src/components/ResultsDashboard.tsx">
                    <span className="text-2xl" data-id="0pzpu0dio" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <div data-id="z5hjt0mjy" data-path="src/components/ResultsDashboard.tsx">
                      <div className="font-medium" data-id="y421wai8a" data-path="src/components/ResultsDashboard.tsx">{domain.name}</div>
                      <div className="text-sm text-slate-600" data-id="wn4ti5cx7" data-path="src/components/ResultsDashboard.tsx">
                        {domainScore.answeredCount} of {domainScore.totalQuestions} questions answered
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4" data-id="vwdr0lgyz" data-path="src/components/ResultsDashboard.tsx">
                    <div className="text-right" data-id="mynroo8nj" data-path="src/components/ResultsDashboard.tsx">
                      <div className={`text-lg font-semibold ${getScoreColor(domainScore.score)}`} data-id="zhb78aew8" data-path="src/components/ResultsDashboard.tsx">
                        {Math.round(domainScore.score)}%
                      </div>
                      <Progress value={domainScore.score} className="w-24 h-2" data-id="qpldd6ee1" data-path="src/components/ResultsDashboard.tsx" />
                    </div>
                    {getScoreIcon(domainScore.score)}
                  </div>
                </div>);

            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="crolcpxnt" data-path="src/components/ResultsDashboard.tsx">
        {/* Areas Needing Attention */}
        <Card data-id="tj8xf64io" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader data-id="jj9hzd8sq" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="flex items-center gap-2 text-red-600" data-id="bbir3aoos" data-path="src/components/ResultsDashboard.tsx">
              <XCircle className="w-5 h-5" data-id="pvv2eo64r" data-path="src/components/ResultsDashboard.tsx" />
              Critical Areas
            </CardTitle>
            <CardDescription data-id="di50ws5v1" data-path="src/components/ResultsDashboard.tsx">
              Domains scoring below 60% - immediate attention required
            </CardDescription>
          </CardHeader>
          <CardContent data-id="1jxex02o5" data-path="src/components/ResultsDashboard.tsx">
            {criticalAreas.length > 0 ?
            <div className="space-y-2" data-id="muxa8zk5s" data-path="src/components/ResultsDashboard.tsx">
                {criticalAreas.map((domain) =>
              <div key={domain.id} className="flex items-center gap-2" data-id="2lvsksuaa" data-path="src/components/ResultsDashboard.tsx">
                    <span data-id="k28aycgfz" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <span className="font-medium" data-id="ns4ngx3qw" data-path="src/components/ResultsDashboard.tsx">{domain.name}</span>
                    <Badge variant="destructive" className="ml-auto" data-id="a8d0xjwmt" data-path="src/components/ResultsDashboard.tsx">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
              )}
              </div> :

            <div className="text-center py-4 text-slate-600" data-id="bdmfhuyts" data-path="src/components/ResultsDashboard.tsx">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" data-id="0x06o2f03" data-path="src/components/ResultsDashboard.tsx" />
                No critical areas identified
              </div>
            }
          </CardContent>
        </Card>

        {/* Strong Areas */}
        <Card data-id="5p1o0rfz4" data-path="src/components/ResultsDashboard.tsx">
          <CardHeader data-id="eeyznhwh8" data-path="src/components/ResultsDashboard.tsx">
            <CardTitle className="flex items-center gap-2 text-green-600" data-id="okmp9jrth" data-path="src/components/ResultsDashboard.tsx">
              <CheckCircle className="w-5 h-5" data-id="iuui5gc56" data-path="src/components/ResultsDashboard.tsx" />
              Strong Areas
            </CardTitle>
            <CardDescription data-id="12xly3ia0" data-path="src/components/ResultsDashboard.tsx">
              Domains scoring 80% or above - well-established controls
            </CardDescription>
          </CardHeader>
          <CardContent data-id="f7diasbya" data-path="src/components/ResultsDashboard.tsx">
            {strongAreas.length > 0 ?
            <div className="space-y-2" data-id="y5j6d2315" data-path="src/components/ResultsDashboard.tsx">
                {strongAreas.map((domain) =>
              <div key={domain.id} className="flex items-center gap-2" data-id="lgywod14e" data-path="src/components/ResultsDashboard.tsx">
                    <span data-id="9gqa34oph" data-path="src/components/ResultsDashboard.tsx">{domain.icon}</span>
                    <span className="font-medium" data-id="8emgxgl2x" data-path="src/components/ResultsDashboard.tsx">{domain.name}</span>
                    <Badge variant="default" className="ml-auto bg-green-600" data-id="il53atc26" data-path="src/components/ResultsDashboard.tsx">
                      {Math.round(getDomainScore(domain).score)}%
                    </Badge>
                  </div>
              )}
              </div> :

            <div className="text-center py-4 text-slate-600" data-id="zkvvrbv1n" data-path="src/components/ResultsDashboard.tsx">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" data-id="jw8ojh17b" data-path="src/components/ResultsDashboard.tsx" />
                No domains at mature level yet
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default ResultsDashboard;