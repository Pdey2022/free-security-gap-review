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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="ghnqgl75k" data-path="src/components/NISTMaturityChart.tsx">
      {/* NIST Functions Bar Chart */}
      <Card data-id="p7qj5pl54" data-path="src/components/NISTMaturityChart.tsx">
        <CardHeader data-id="oskaz88o6" data-path="src/components/NISTMaturityChart.tsx">
          <CardTitle data-id="ezwra8d8a" data-path="src/components/NISTMaturityChart.tsx">NIST Cybersecurity Framework Functions</CardTitle>
          <CardDescription data-id="uo7k208nk" data-path="src/components/NISTMaturityChart.tsx">
            Maturity assessment mapped to the five NIST CSF functions
          </CardDescription>
        </CardHeader>
        <CardContent data-id="ife6cb4dt" data-path="src/components/NISTMaturityChart.tsx">
          <ResponsiveContainer width="100%" height={300} data-id="nziwfgd93" data-path="src/components/NISTMaturityChart.tsx">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} data-id="x17xgwrf4" data-path="src/components/NISTMaturityChart.tsx">
              <CartesianGrid strokeDasharray="3 3" data-id="nw5ehktmm" data-path="src/components/NISTMaturityChart.tsx" />
              <XAxis dataKey="name" data-id="n5jmzxlfz" data-path="src/components/NISTMaturityChart.tsx" />
              <YAxis domain={[0, 100]} data-id="elypp7i3e" data-path="src/components/NISTMaturityChart.tsx" />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Maturity Score']}
                labelFormatter={(label) => `NIST Function: ${label}`} data-id="h7t6xu2sr" data-path="src/components/NISTMaturityChart.tsx" />

              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} data-id="f2p0yrklp" data-path="src/components/NISTMaturityChart.tsx" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* NIST Functions Radar Chart */}
      <Card data-id="keo86xklp" data-path="src/components/NISTMaturityChart.tsx">
        <CardHeader data-id="an9myzsq7" data-path="src/components/NISTMaturityChart.tsx">
          <CardTitle data-id="nbu7ikyda" data-path="src/components/NISTMaturityChart.tsx">NIST Framework Radar View</CardTitle>
          <CardDescription data-id="hzfmoq0k5" data-path="src/components/NISTMaturityChart.tsx">
            360-degree view of cybersecurity maturity across all functions
          </CardDescription>
        </CardHeader>
        <CardContent data-id="imwmk1dcl" data-path="src/components/NISTMaturityChart.tsx">
          <ResponsiveContainer width="100%" height={300} data-id="jmxcf79yg" data-path="src/components/NISTMaturityChart.tsx">
            <RadarChart data={nistData} data-id="aimkpd5xq" data-path="src/components/NISTMaturityChart.tsx">
              <PolarGrid data-id="wxryx1b36" data-path="src/components/NISTMaturityChart.tsx" />
              <PolarAngleAxis dataKey="function" data-id="xdfkffe96" data-path="src/components/NISTMaturityChart.tsx" />
              <PolarRadiusAxis domain={[0, 100]} tick={false} data-id="6ba3gfdjm" data-path="src/components/NISTMaturityChart.tsx" />
              <Radar
                name="Maturity Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2} data-id="em3ny4iv3" data-path="src/components/NISTMaturityChart.tsx" />

              <Tooltip formatter={(value: number) => [`${value}%`, 'Maturity Score']} data-id="cqe6glhha" data-path="src/components/NISTMaturityChart.tsx" />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* NIST Functions Breakdown */}
      <Card className="lg:col-span-2" data-id="8sg4rigs5" data-path="src/components/NISTMaturityChart.tsx">
        <CardHeader data-id="nploalb51" data-path="src/components/NISTMaturityChart.tsx">
          <CardTitle data-id="dha2ayol0" data-path="src/components/NISTMaturityChart.tsx">NIST Function Maturity Breakdown</CardTitle>
          <CardDescription data-id="nm5k5onbc" data-path="src/components/NISTMaturityChart.tsx">
            Detailed maturity levels for each NIST Cybersecurity Framework function
          </CardDescription>
        </CardHeader>
        <CardContent data-id="8ertbohy0" data-path="src/components/NISTMaturityChart.tsx">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4" data-id="zesihb9t0" data-path="src/components/NISTMaturityChart.tsx">
            {nistFunctions.map((func) => {
              const score = Math.round(calculateNISTFunctionScore(func));
              const maturityLevel = getMaturityLevel(score);
              const colorClass = getMaturityColor(score);

              return (
                <div key={func.id} className="text-center space-y-2" data-id="vzyxw93m0" data-path="src/components/NISTMaturityChart.tsx">
                  <div className="flex flex-col items-center" data-id="r2qo6btam" data-path="src/components/NISTMaturityChart.tsx">
                    <div className={`w-16 h-16 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg mb-2`} data-id="548rpwz41" data-path="src/components/NISTMaturityChart.tsx">
                      {score}%
                    </div>
                    <h3 className="font-semibold text-sm" data-id="lu8id3fxj" data-path="src/components/NISTMaturityChart.tsx">{func.name}</h3>
                    <Badge variant="outline" className="text-xs" data-id="sr1yux6qj" data-path="src/components/NISTMaturityChart.tsx">
                      {maturityLevel}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-600" data-id="m1ompk9hi" data-path="src/components/NISTMaturityChart.tsx">
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