
import React from 'react';
import { Link } from 'react-router-dom';
import SecurityAssessment from '@/components/SecurityAssessment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Settings, Users, BarChart3, CheckCircle2, TrendingUp } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Cybersecurity Assessment Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Comprehensive security evaluation tool to assess your organization's cybersecurity posture 
          and receive tailored recommendations for improvement.
        </p>
        
        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Shield className="h-5 w-5 mr-2" />
            Start Assessment
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/manage-recommendations">
              <Settings className="h-5 w-5 mr-2" />
              Manage Recommendations
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Comprehensive Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Evaluate multiple security domains including network security, access controls, 
              data protection, and incident response capabilities.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>NIST Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Aligned with NIST Cybersecurity Framework standards to ensure comprehensive 
              coverage of essential security functions and controls.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>Actionable Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Receive prioritized recommendations with implementation guidance to 
              improve your security posture effectively.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Assessment
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            About Platform
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment" className="mt-6">
          <SecurityAssessment />
        </TabsContent>
        
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About Our Cybersecurity Assessment Platform</CardTitle>
              <CardDescription>
                Understanding the methodology and approach behind our security evaluations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Assessment Methodology</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our platform employs a structured approach based on industry best practices and 
                  established frameworks. Each assessment covers critical security domains to provide 
                  a holistic view of your organization's cybersecurity readiness.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Identify security gaps and vulnerabilities in your current infrastructure
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Receive prioritized recommendations based on risk assessment
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Track maturity levels across different security domains
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Generate comprehensive reports for stakeholders
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                <p className="text-gray-600 leading-relaxed">
                  Begin your security assessment by navigating through the different security domains. 
                  Answer questions honestly and provide additional context where requested. The assessment 
                  typically takes 30-45 minutes to complete and provides immediate results upon submission.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-blue-800">
                  If you have questions about the assessment process or need assistance interpreting 
                  your results, our cybersecurity experts are here to help. Contact our support team 
                  for personalized guidance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);

};

export default HomePage;