import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  BarChart3,
  FileText,
  Users,
  Target
} from 'lucide-react';
import { securityDomains } from '@/data/securityDomains';
import { AssessmentResult } from '@/types/assessment';
import DomainAssessment from '@/components/DomainAssessment';
import ResultsDashboard from '@/components/ResultsDashboard';
import RecommendationsView from '@/components/RecommendationsView';

type AssessmentStep = 'introduction' | 'domains' | 'results' | 'recommendations';

const SecurityAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('introduction');
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [completedDomains, setCompletedDomains] = useState<Set<string>>(new Set());

  const handleStartAssessment = () => {
    setCurrentStep('domains');
    setCurrentDomainIndex(0);
    setResults([]);
    setCompletedDomains(new Set());
  };

  const handleDomainComplete = (result: AssessmentResult) => {
    setResults(prev => {
      const updated = prev.filter(r => r.domainId !== result.domainId);
      return [...updated, result];
    });
    setCompletedDomains(prev => new Set([...prev, result.domainId]));
  };

  const handleNextDomain = () => {
    if (currentDomainIndex < securityDomains.length - 1) {
      setCurrentDomainIndex(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  };

  const handlePreviousDomain = () => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex(prev => prev - 1);
    }
  };

  const handleViewRecommendations = () => {
    setCurrentStep('recommendations');
  };

  const handleStartOver = () => {
    setCurrentStep('introduction');
    setCurrentDomainIndex(0);
    setResults([]);
    setCompletedDomains(new Set());
  };

  const currentDomain = securityDomains[currentDomainIndex];
  const overallProgress = (completedDomains.size / securityDomains.length) * 100;

  if (currentStep === 'introduction') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Cybersecurity Maturity Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Evaluate your organization's cybersecurity posture using the NIST Cybersecurity Framework. 
              Get comprehensive insights, detailed analytics, and AI-enhanced recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Comprehensive</h3>
              <p className="text-sm text-gray-600">
                {securityDomains.length} security domains with detailed questions
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">
                Deep insights from your responses and comments
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">AI-Enhanced</h3>
              <p className="text-sm text-gray-600">
                Intelligent recommendations based on your context
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Actionable</h3>
              <p className="text-sm text-gray-600">
                Detailed implementation roadmap and timeline
              </p>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Assessment Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">What You'll Complete:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{securityDomains.length} Security Domains</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Detailed questions with context options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Optional notes and comments for each question</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Comprehensive results and analytics</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">What You'll Get:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Maturity score for each domain</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>AI-enhanced recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Implementation roadmap</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Risk analysis and mitigation strategies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Domains to Assess</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityDomains.map((domain, index) => (
                  <div key={domain.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{domain.name}</div>
                      <div className="text-sm text-gray-600">{domain.questions.length} questions</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button 
              onClick={handleStartAssessment}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Estimated time: 20-30 minutes
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'domains') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DomainAssessment
            domain={currentDomain}
            onComplete={handleDomainComplete}
            onNext={handleNextDomain}
            onPrevious={handlePreviousDomain}
            isFirst={currentDomainIndex === 0}
            isLast={currentDomainIndex === securityDomains.length - 1}
            currentDomainIndex={currentDomainIndex}
            totalDomains={securityDomains.length}
          />
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResultsDashboard 
            results={results} 
            onViewRecommendations={handleViewRecommendations}
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    );
  }

  if (currentStep === 'recommendations') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecommendationsView 
            results={results} 
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default SecurityAssessment;