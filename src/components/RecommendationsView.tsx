import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Calendar,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
  Star,
  Brain,
  Shield
} from 'lucide-react';
import { AssessmentResult } from '@/types/assessment';
import { securityDomains } from '@/data/securityDomains';
import { recommendationDatabase } from '@/data/recommendations';
import NISTMaturityChart from '@/components/NISTMaturityChart';

interface RecommendationsViewProps {
  results: AssessmentResult[];
  onStartOver: () => void;
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({ results, onStartOver }) => {
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Enhanced analytics based on user notes and responses
  const analyticsData = useMemo(() => {
    const allNotes = results.flatMap(result => 
      Object.entries(result.notes || {}).map(([questionId, note]) => ({
        domainId: result.domainId,
        domainName: result.domainName,
        questionId: parseInt(questionId),
        note: note,
        score: result.answers[parseInt(questionId)] || 0
      }))
    );

    // Analyze notes for common themes and concerns
    const commonConcerns = analyzeCommonConcerns(allNotes);
    const riskAreas = identifyRiskAreas(results);
    const implementationGaps = findImplementationGaps(results);
    const strengths = identifyStrengths(results);

    return {
      commonConcerns,
      riskAreas,
      implementationGaps,
      strengths,
      totalNotes: allNotes.filter(item => item.note.trim().length > 0).length
    };
  }, [results]);

  // Generate comprehensive recommendations
  const enhancedRecommendations = useMemo(() => {
    const baseRecommendations = results.flatMap(result => {
      const domain = securityDomains.find(d => d.id === result.domainId);
      if (!domain) return [];

      return recommendationDatabase(result, domain, analyticsData);
    });

    // Add AI-like contextual recommendations based on notes analysis
    const contextualRecommendations = generateContextualRecommendations(results, analyticsData);
    
    return [...baseRecommendations, ...contextualRecommendations]
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }, [results, analyticsData]);

  const filteredRecommendations = selectedPriority === 'all' 
    ? enhancedRecommendations 
    : enhancedRecommendations.filter(rec => rec.priority === selectedPriority);

  const overallScore = results.reduce((sum, result) => sum + result.percentage, 0) / results.length;
  const overallMaturityLevel = getMaturityLevel(overallScore);

  return (
    <div className="space-y-6">
      {/* Enhanced Results Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Security Assessment Results</h2>
            <p className="text-blue-100 mb-4">
              Comprehensive analysis with {analyticsData.totalNotes} detailed notes and observations
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <span>Overall Score: {overallScore.toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>Maturity Level: {overallMaturityLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <span>{enhancedRecommendations.length} AI-Enhanced Recommendations</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold opacity-90">
              {overallScore.toFixed(0)}%
            </div>
            <div className="text-blue-100">Security Maturity</div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {analyticsData.strengths.length}
                </div>
                <div className="text-sm text-gray-600">Key Strengths</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {analyticsData.riskAreas.length}
                </div>
                <div className="text-sm text-gray-600">Risk Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {analyticsData.implementationGaps.length}
                </div>
                <div className="text-sm text-gray-600">Implementation Gaps</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {analyticsData.commonConcerns.length}
                </div>
                <div className="text-sm text-gray-600">Common Concerns</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
          <TabsTrigger value="roadmap">Implementation Roadmap</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          {/* Priority Filter */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Filter by Priority:</span>
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All', count: enhancedRecommendations.length },
                { key: 'high', label: 'High', count: enhancedRecommendations.filter(r => r.priority === 'high').length },
                { key: 'medium', label: 'Medium', count: enhancedRecommendations.filter(r => r.priority === 'medium').length },
                { key: 'low', label: 'Low', count: enhancedRecommendations.filter(r => r.priority === 'low').length }
              ].map(filter => (
                <Button
                  key={filter.key}
                  variant={selectedPriority === filter.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPriority(filter.key as any)}
                >
                  {filter.label} ({filter.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Recommendations */}
          <div className="space-y-4">
            {filteredRecommendations.map((recommendation, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge 
                          variant={recommendation.priority === 'high' ? 'destructive' : 
                                 recommendation.priority === 'medium' ? 'default' : 'secondary'}
                        >
                          {recommendation.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <Badge variant="outline">{recommendation.category}</Badge>
                        {recommendation.isContextual && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Brain className="h-3 w-3 mr-1" />
                            AI-Enhanced
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mb-2">{recommendation.title}</CardTitle>
                      <p className="text-gray-600 mb-3">{recommendation.description}</p>
                      
                      {recommendation.rationale && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <div>
                              <div className="font-medium text-sm mb-1">AI Analysis:</div>
                              <div className="text-sm text-gray-700">{recommendation.rationale}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Timeline: {recommendation.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Effort: {recommendation.effort}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Impact: {recommendation.impact}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Implementation Steps:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {recommendation.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <ArrowRight className="h-3 w-3 text-gray-400 mt-1 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Key Strengths Identified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-900">{strength.area}</div>
                        <div className="text-sm text-green-700">{strength.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Critical Risk Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.riskAreas.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-900">{risk.area}</div>
                        <div className="text-sm text-red-700">{risk.description}</div>
                        <div className="text-xs text-red-600 mt-1">Risk Level: {risk.severity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Concerns from Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Analysis of Your Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analyticsData.commonConcerns.map((concern, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900 mb-2">{concern.theme}</div>
                    <div className="text-sm text-blue-700 mb-2">{concern.description}</div>
                    <div className="text-xs text-blue-600">
                      Mentioned in {concern.frequency} domain{concern.frequency !== 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Implementation Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Immediate (0-30 days)', 'Short-term (1-3 months)', 'Medium-term (3-6 months)', 'Long-term (6+ months)'].map((timeframe, index) => {
                  const timeframeRecommendations = filteredRecommendations.filter(rec => {
                    if (timeframe.includes('Immediate')) return rec.timeline.includes('1-2 weeks') || rec.timeline.includes('immediate');
                    if (timeframe.includes('Short-term')) return rec.timeline.includes('1-2 months');
                    if (timeframe.includes('Medium-term')) return rec.timeline.includes('3-6 months');
                    return rec.timeline.includes('6+ months') || rec.timeline.includes('ongoing');
                  });

                  return (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-lg mb-3">{timeframe}</h3>
                      <div className="space-y-2">
                        {timeframeRecommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Badge variant={rec.priority === 'high' ? 'destructive' : 'default'} className="text-xs">
                              {rec.priority}
                            </Badge>
                            <div className="flex-1">
                              <div className="font-medium">{rec.title}</div>
                              <div className="text-sm text-gray-600">{rec.category}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          <NISTMaturityChart results={results} />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button variant="outline" onClick={onStartOver} size="lg">
          Start New Assessment
        </Button>
      </div>
    </div>
  );
};

// Helper functions for analytics
const analyzeCommonConcerns = (notes: any[]) => {
  const concerns = [
    { theme: 'Resource Constraints', keywords: ['budget', 'resource', 'staff', 'time', 'limited'], description: 'Limited resources affecting implementation' },
    { theme: 'Technical Debt', keywords: ['legacy', 'old', 'outdated', 'upgrade', 'replace'], description: 'Legacy systems requiring modernization' },
    { theme: 'Training Needs', keywords: ['train', 'education', 'skill', 'knowledge', 'awareness'], description: 'Staff training and awareness gaps' },
    { theme: 'Process Gaps', keywords: ['process', 'procedure', 'policy', 'documentation', 'workflow'], description: 'Missing or inadequate processes' },
    { theme: 'Compliance Concerns', keywords: ['compliance', 'regulation', 'audit', 'requirement', 'standard'], description: 'Regulatory and compliance challenges' }
  ];

  return concerns.map(concern => {
    const frequency = notes.filter(note => 
      concern.keywords.some(keyword => 
        note.note.toLowerCase().includes(keyword.toLowerCase())
      )
    ).length;

    return { ...concern, frequency };
  }).filter(concern => concern.frequency > 0);
};

const identifyRiskAreas = (results: AssessmentResult[]) => {
  return results
    .filter(result => result.percentage < 50)
    .map(result => ({
      area: result.domainName,
      description: `Low maturity score of ${result.percentage.toFixed(1)}% indicates significant risk`,
      severity: result.percentage < 25 ? 'Critical' : 'High'
    }));
};

const findImplementationGaps = (results: AssessmentResult[]) => {
  const gaps: any[] = [];
  
  results.forEach(result => {
    Object.entries(result.answers).forEach(([questionId, score]) => {
      if (score < 2) {
        gaps.push({
          domain: result.domainName,
          questionId: parseInt(questionId),
          score: score,
          gap: score === 0 ? 'Not Implemented' : 'Partially Implemented'
        });
      }
    });
  });

  return gaps.slice(0, 10); // Return top 10 gaps
};

const identifyStrengths = (results: AssessmentResult[]) => {
  return results
    .filter(result => result.percentage >= 80)
    .map(result => ({
      area: result.domainName,
      description: `Strong performance with ${result.percentage.toFixed(1)}% maturity score`,
      score: result.percentage
    }));
};

const generateContextualRecommendations = (results: AssessmentResult[], analytics: any) => {
  const contextualRecs = [];

  // Generate recommendations based on common concerns
  analytics.commonConcerns.forEach((concern: any) => {
    if (concern.theme === 'Resource Constraints') {
      contextualRecs.push({
        title: 'Resource Optimization Strategy',
        description: 'Based on your comments about resource constraints, implement a phased approach to security improvements.',
        category: 'Resource Management',
        priority: 'high' as const,
        timeline: '2-4 weeks',
        effort: 'Medium',
        impact: 'High',
        steps: [
          'Prioritize high-impact, low-cost security measures',
          'Develop a business case for additional security resources',
          'Consider managed security services to reduce internal overhead',
          'Implement automated tools to reduce manual effort'
        ],
        rationale: `Your assessment notes mention resource constraints ${concern.frequency} times across different domains. This suggests a systematic approach to resource optimization is needed.`,
        isContextual: true
      });
    }
  });

  // Add more contextual recommendations based on other patterns
  if (analytics.riskAreas.length > 2) {
    contextualRecs.push({
      title: 'Comprehensive Risk Mitigation Program',
      description: 'Multiple high-risk areas identified requiring coordinated response.',
      category: 'Risk Management',
      priority: 'high' as const,
      timeline: '1-2 months',
      effort: 'High',
      impact: 'Critical',
      steps: [
        'Conduct detailed risk assessment for each identified area',
        'Develop integrated risk treatment plan',
        'Establish risk monitoring and reporting framework',
        'Implement compensating controls for immediate risk reduction'
      ],
      rationale: `Your assessment shows ${analytics.riskAreas.length} domains with significant risk. A coordinated approach will be more effective than addressing each in isolation.`,
      isContextual: true
    });
  }

  return contextualRecs;
};

const getMaturityLevel = (percentage: number): string => {
  if (percentage >= 90) return 'Optimized';
  if (percentage >= 70) return 'Managed';
  if (percentage >= 50) return 'Defined';
  if (percentage >= 30) return 'Repeatable';
  return 'Initial';
};

export default RecommendationsView;