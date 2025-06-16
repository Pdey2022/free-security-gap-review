import React from 'react'
import SecurityAssessment from '@/components/SecurityAssessment'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Target, TrendingUp } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Cybersecurity Risk Assessment
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Evaluate your organization's security posture with our comprehensive assessment tool
        </p>
      </div>

      {/* Feature highlights */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-blue-400" />
              Comprehensive Assessment
            </CardTitle>
            <CardDescription className="text-slate-400">
              Evaluate all critical security domains in your organization
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-green-400" />
              NIST Framework
            </CardTitle>
            <CardDescription className="text-slate-400">
              Based on industry-standard NIST Cybersecurity Framework
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Actionable Insights
            </CardTitle>
            <CardDescription className="text-slate-400">
              Get detailed recommendations to improve your security posture
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="assessment" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="assessment">Security Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment" className="space-y-4">
          <SecurityAssessment />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HomePage