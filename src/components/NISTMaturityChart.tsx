import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Answer, Domain } from '@/types/assessment';

interface NISTMaturityChartProps {
  domains: Domain[];
  answers: Record<string, Answer>;
}

const nistFunctions = [
{ id: 'identify', name: 'Identify', domains: ['governance', 'thirdparty', 'physical'] },
{ id: 'protect', name: 'Protect', domains: ['iam', 'network', 'endpoint', 'application', 'data'] },
{ id: 'detect', name: 'Detect', domains: ['operations', 'vulnerability'] },
{ id: 'respond', name: 'Respond', domains: ['operations'] },
{ id: 'recover', name: 'Recover', domains: ['physical', 'data'] }];


const NISTMaturityChart: React.FC<NISTMaturityChartProps> = ({ domains, answers }) => {
  const calculateDomainScore = (domainId: string): number => {
    const domain = domains.find((d) => d.id === domainId);
    if (!domain) return 0;

    const totalWeight = domain.questions.reduce((sum, q) => sum + (q.weight || 1), 0);
    let achievedScore = 0;

    domain.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        const weight = question.weight || 1;
        switch (answer.value) {
          case 'yes':achievedScore += weight;break;
          case 'partial':achievedScore += weight * 0.5;break;
          case 'no':achievedScore += 0;break;
          case 'na':break;
        }
      }
    });

    return totalWeight > 0 ? achievedScore / totalWeight * 100 : 0;
  };

  const calculateNISTFunctionScore = (nistFunction: typeof nistFunctions[0]): number => {
    const scores = nistFunction.domains.map((domainId) => calculateDomainScore(domainId));
    return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
  };

  const nistData = nistFunctions.map((func) => ({
    function: func.name,
    score: Math.round(calculateNISTFunctionScore(func)),
    fullMark: 100
  }));

  const barData = nistData.map((item) => ({
    name: item.function,
    score: item.score,
    color: item.score >= 80 ? '#22c55e' : item.score >= 60 ? '#eab308' : item.score >= 40 ? '#f97316' : '#ef4444'
  }));

  const getMaturityLevel = (score: number): string => {
    if (score >= 90) return 'Optimized';
    if (score >= 75) return 'Managed';
    if (score >= 60) return 'Defined';
    if (score >= 40) return 'Developing';
    return 'Initial';
  };

  const getMaturityColor = (score: number): string => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="6lcj954mm" data-path="src/components/NISTMaturityChart.tsx">
      {/* NIST Functions Bar Chart */}
      <Card data-id="luqau5gxn" data-path="src/components/NISTMaturityChart.tsx">
        <CardHeader data-id="kzaeupuhr" data-path="src/components/NISTMaturityChart.tsx">
          <CardTitle data-id="01vbqt2cw" data-path="src/components/NISTMaturityChart.tsx">NIST Cybersecurity Framework Functions</CardTitle>
          <CardDescription data-id="zwto8o728" data-path="src/components/NISTMaturityChart.tsx">
            Maturity assessment mapped to the five NIST CSF functions
          </CardDescription>
        </CardHeader>
        <CardContent data-id="tnbfd3pjd" data-path="src/components/NISTMaturityChart.tsx">
          <ResponsiveContainer width="100%" height={300} data-id="9vwt4oext" data-path="src/components/NISTMaturityChart.tsx">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} data-id="3qlyo9zhe" data-path="src/components/NISTMaturityChart.tsx">
              <CartesianGrid strokeDasharray="3 3" data-id="4efefiu2y" data-path="src/components/NISTMaturityChart.tsx" />
              <XAxis dataKey="name" data-id="9x40ni106" data-path="src/components/NISTMaturityChart.tsx" />
              <YAxis domain={[0, 100]} data-id="gfp2xnxx0" data-path="src/components/NISTMaturityChart.tsx" />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Maturity Score']}
                labelFormatter={(label) => `NIST Function: ${label}`} data-id="72no8nhyf" data-path="src/components/NISTMaturityChart.tsx" />

              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} data-id="feicrycyl" data-path="src/components/NISTMaturityChart.tsx" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* NIST Functions Radar Chart */}
      <Card data-id="aqsde7a6o" data-path="src/components/NISTMaturityChart.tsx">
        <CardHeader data-id="p4w17uule" data-path="src/components/NISTMaturityChart.tsx">
          <CardTitle data-id="wo5u1p2bn" data-path="src/components/NISTMaturityChart.tsx">NIST Framework Radar View</CardTitle>
          <CardDescription data-id="rl7xxy0hb" data-path="src/components/NISTMaturityChart.tsx">
            360-degree view of cybersecurity maturity across all functions
          </CardDescription>
        </CardHeader>
        <CardContent data-id="3el5fhzip" data-path="src/components/NISTMaturityChart.tsx">
          <ResponsiveContainer width="100%" height={300} data-id="j6t21dq9i" data-path="src/components/NISTMaturityChart.tsx">
            <RadarChart data={nistData} data-id="fvkx2l1ia" data-path="src/components/NISTMaturityChart.tsx">
              <PolarGrid data-id="vsc8j99wq" data-path="src/components/NISTMaturityChart.tsx" />
              <PolarAngleAxis dataKey="function" data-id="e8za1426z" data-path="src/components/NISTMaturityChart.tsx" />
              <PolarRadiusAxis domain={[0, 100]} tick={false} data-id="27r0vp7ng" data-path="src/components/NISTMaturityChart.tsx" />
              <Radar
                name="Maturity Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2} data-id="erf9edixj" data-path="src/components/NISTMaturityChart.tsx" />

              <Tooltip formatter={(value: number) => [`${value}%`, 'Maturity Score']} data-id="torw769k9" data-path="src/components/NISTMaturityChart.tsx" />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* NIST Functions Breakdown */}
      <Card className="lg:col-span-2" data-id="nl8q6m5ds" data-path="src/components/NISTMaturityChart.tsx">
        <CardHeader data-id="5oxk0zma9" data-path="src/components/NISTMaturityChart.tsx">
          <CardTitle data-id="quy9uxpd5" data-path="src/components/NISTMaturityChart.tsx">NIST Function Maturity Breakdown</CardTitle>
          <CardDescription data-id="wj8pbp4l1" data-path="src/components/NISTMaturityChart.tsx">
            Detailed maturity levels for each NIST Cybersecurity Framework function
          </CardDescription>
        </CardHeader>
        <CardContent data-id="7fnwqj8ks" data-path="src/components/NISTMaturityChart.tsx">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4" data-id="7jsj40s3j" data-path="src/components/NISTMaturityChart.tsx">
            {nistFunctions.map((func) => {
              const score = Math.round(calculateNISTFunctionScore(func));
              const maturityLevel = getMaturityLevel(score);
              const colorClass = getMaturityColor(score);

              return (
                <div key={func.id} className="text-center space-y-2" data-id="tdhqswhyx" data-path="src/components/NISTMaturityChart.tsx">
                  <div className="flex flex-col items-center" data-id="oil9rls9u" data-path="src/components/NISTMaturityChart.tsx">
                    <div className={`w-16 h-16 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg mb-2`} data-id="ltd9dhgco" data-path="src/components/NISTMaturityChart.tsx">
                      {score}%
                    </div>
                    <h3 className="font-semibold text-sm" data-id="7946335c0" data-path="src/components/NISTMaturityChart.tsx">{func.name}</h3>
                    <Badge variant="outline" className="text-xs" data-id="v8rk7009m" data-path="src/components/NISTMaturityChart.tsx">
                      {maturityLevel}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-600" data-id="a2f3own5l" data-path="src/components/NISTMaturityChart.tsx">
                    {func.domains.map((domainId) => {
                      const domain = domains.find((d) => d.id === domainId);
                      return domain?.name || domainId;
                    }).join(', ')}
                  </div>
                </div>);

            })}
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default NISTMaturityChart;