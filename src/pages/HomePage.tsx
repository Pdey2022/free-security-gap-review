import React from 'react';
import SecurityAssessment from '@/components/SecurityAssessment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Target, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8" data-id="3s84rhy2b" data-path="src/pages/HomePage.tsx">
      <div className="text-center mb-12" data-id="r5lphw7lu" data-path="src/pages/HomePage.tsx">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-id="anetk18aa" data-path="src/pages/HomePage.tsx">
          Cybersecurity Risk Assessment
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-id="0gikulaj8" data-path="src/pages/HomePage.tsx">
          Evaluate your organization's security posture with our comprehensive assessment tool
        </p>
      </div>

      {/* Feature highlights */}
      <div className="grid md:grid-cols-3 gap-6 mb-12" data-id="wds1sejhl" data-path="src/pages/HomePage.tsx">
        <Card className="bg-slate-800/50 border-slate-700" data-id="kt7d85r3j" data-path="src/pages/HomePage.tsx">
          <CardHeader data-id="8hji2rfzr" data-path="src/pages/HomePage.tsx">
            <CardTitle className="flex items-center gap-2 text-white" data-id="ebs539o13" data-path="src/pages/HomePage.tsx">
              <Shield className="h-5 w-5 text-blue-400" data-id="rrrep9svk" data-path="src/pages/HomePage.tsx" />
              Comprehensive Assessment
            </CardTitle>
            <CardDescription className="text-slate-400" data-id="tabh0kdh7" data-path="src/pages/HomePage.tsx">
              Evaluate all critical security domains in your organization
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700" data-id="7gt6jwy8i" data-path="src/pages/HomePage.tsx">
          <CardHeader data-id="adorrjtiy" data-path="src/pages/HomePage.tsx">
            <CardTitle className="flex items-center gap-2 text-white" data-id="yu0jqlab2" data-path="src/pages/HomePage.tsx">
              <Target className="h-5 w-5 text-green-400" data-id="8ltos5nfi" data-path="src/pages/HomePage.tsx" />
              NIST Framework
            </CardTitle>
            <CardDescription className="text-slate-400" data-id="2kp1nya83" data-path="src/pages/HomePage.tsx">
              Based on industry-standard NIST Cybersecurity Framework
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700" data-id="lb95v1fcz" data-path="src/pages/HomePage.tsx">
          <CardHeader data-id="dh7bt0ttt" data-path="src/pages/HomePage.tsx">
            <CardTitle className="flex items-center gap-2 text-white" data-id="3c2holtl6" data-path="src/pages/HomePage.tsx">
              <TrendingUp className="h-5 w-5 text-purple-400" data-id="pdz6zg28n" data-path="src/pages/HomePage.tsx" />
              Actionable Insights
            </CardTitle>
            <CardDescription className="text-slate-400" data-id="99m6u0k44" data-path="src/pages/HomePage.tsx">
              Get detailed recommendations to improve your security posture
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="assessment" className="space-y-4" data-id="dgpkfz47d" data-path="src/pages/HomePage.tsx">
        <TabsList className="grid w-full grid-cols-1" data-id="hwaofskxp" data-path="src/pages/HomePage.tsx">
          <TabsTrigger value="assessment" data-id="idygxfrf7" data-path="src/pages/HomePage.tsx">Security Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment" className="space-y-4" data-id="fwvf3e6uz" data-path="src/pages/HomePage.tsx">
          <SecurityAssessment data-id="etl6a551e" data-path="src/pages/HomePage.tsx" />
        </TabsContent>
      </Tabs>
    </div>);

};

export default HomePage;