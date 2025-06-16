import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import SecurityAssessment from '@/components/SecurityAssessment';
import AdminPanel from '@/components/AdminPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Settings } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user, isLoading, isAdmin } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.Name}!
          </h1>
          <p className="text-gray-600">
            Manage your security assessments and recommendations
          </p>
        </div>

        {isAdmin ? (
          <Tabs defaultValue="assessment" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Assessment
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin Panel
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assessment">
              <SecurityAssessment />
            </TabsContent>
            
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          </Tabs>
        ) : (
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Assessment Portal
                </CardTitle>
                <CardDescription>
                  Evaluate your organization's cybersecurity posture with our comprehensive assessment tool
                </CardDescription>
              </CardHeader>
            </Card>
            <SecurityAssessment />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;