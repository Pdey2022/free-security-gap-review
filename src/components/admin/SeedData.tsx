import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';

const SeedData = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [seedingStatus, setSeedingStatus] = useState<'idle' | 'seeding' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const TABLE_ID = 17255;

  // Base recommendations data from the original file
  const baseRecommendations = [
  {
    recommendation_id: 'gov-policy',
    title: 'Implement Comprehensive Security Policy Framework',
    description: 'Develop and implement a comprehensive security policy framework covering all aspects of information security.',
    priority: 'high',
    domain: 'governance',
    technologies: JSON.stringify(['Policy Management Platforms', 'GRC Tools', 'Document Management Systems']),
    effort: '3-6 months',
    is_active: true
  },
  {
    recommendation_id: 'gov-grc',
    title: 'Deploy GRC Platform',
    description: 'Implement a Governance, Risk, and Compliance platform to centralize policy management and compliance tracking.',
    priority: 'medium',
    domain: 'governance',
    technologies: JSON.stringify(['RSA Archer', 'ServiceNow GRC', 'MetricStream', 'LogicGate']),
    effort: '2-4 months',
    is_active: true
  },
  {
    recommendation_id: 'iam-mfa',
    title: 'Implement Universal MFA',
    description: 'Deploy multi-factor authentication across all user accounts and systems.',
    priority: 'high',
    domain: 'iam',
    technologies: JSON.stringify(['Azure AD', 'Okta', 'Duo Security', 'RSA SecurID']),
    effort: '1-3 months',
    is_active: true
  },
  {
    recommendation_id: 'iam-pam',
    title: 'Deploy Privileged Access Management',
    description: 'Implement PAM solution to secure and monitor privileged accounts.',
    priority: 'high',
    domain: 'iam',
    technologies: JSON.stringify(['CyberArk', 'BeyondTrust', 'Thycotic', 'Azure PIM']),
    effort: '2-4 months',
    is_active: true
  },
  {
    recommendation_id: 'net-ztna',
    title: 'Implement Zero Trust Network Architecture',
    description: 'Deploy Zero Trust principles with micro-segmentation and continuous verification.',
    priority: 'medium',
    domain: 'network',
    technologies: JSON.stringify(['Zscaler', 'Palo Alto Prisma', 'Cisco Umbrella', 'Fortinet ZTNA']),
    effort: '4-8 months',
    is_active: true
  },
  {
    recommendation_id: 'net-ngfw',
    title: 'Upgrade to Next-Generation Firewalls',
    description: 'Replace traditional firewalls with NGFWs for advanced threat protection.',
    priority: 'high',
    domain: 'network',
    technologies: JSON.stringify(['Palo Alto Networks', 'Fortinet FortiGate', 'Cisco Firepower', 'Check Point']),
    effort: '2-4 months',
    is_active: true
  },
  {
    recommendation_id: 'end-edr',
    title: 'Deploy EDR/XDR Solution',
    description: 'Implement endpoint detection and response capabilities for advanced threat hunting.',
    priority: 'high',
    domain: 'endpoint',
    technologies: JSON.stringify(['CrowdStrike Falcon', 'Microsoft Defender', 'SentinelOne', 'Carbon Black']),
    effort: '1-2 months',
    is_active: true
  },
  {
    recommendation_id: 'end-encryption',
    title: 'Implement Full Disk Encryption',
    description: 'Deploy full disk encryption across all endpoints and mobile devices.',
    priority: 'high',
    domain: 'endpoint',
    technologies: JSON.stringify(['BitLocker', 'FileVault', 'VeraCrypt', 'Symantec Encryption']),
    effort: '1-2 months',
    is_active: true
  },
  {
    recommendation_id: 'cld-cspm',
    title: 'Deploy Cloud Security Posture Management',
    description: 'Implement CSPM to continuously monitor cloud configurations and compliance.',
    priority: 'high',
    domain: 'cloud',
    technologies: JSON.stringify(['Wiz', 'Prisma Cloud', 'CloudGuard', 'Azure Security Center']),
    effort: '1-3 months',
    is_active: true
  },
  {
    recommendation_id: 'cld-secrets',
    title: 'Implement Cloud Secrets Management',
    description: 'Deploy centralized secrets management for cloud workloads.',
    priority: 'high',
    domain: 'cloud',
    technologies: JSON.stringify(['HashiCorp Vault', 'AWS Secrets Manager', 'Azure Key Vault', 'Google Secret Manager']),
    effort: '2-3 months',
    is_active: true
  },
  {
    recommendation_id: 'vuln-scanner',
    title: 'Deploy Vulnerability Management Platform',
    description: 'Implement comprehensive vulnerability scanning and management solution.',
    priority: 'high',
    domain: 'vulnerability',
    technologies: JSON.stringify(['Tenable', 'Rapid7', 'Qualys', 'OpenVAS']),
    effort: '1-2 months',
    is_active: true
  },
  {
    recommendation_id: 'vuln-patch',
    title: 'Implement Automated Patch Management',
    description: 'Deploy automated patch management system for timely security updates.',
    priority: 'medium',
    domain: 'vulnerability',
    technologies: JSON.stringify(['Microsoft WSUS', 'Red Hat Satellite', 'Tanium Patch', 'Automox']),
    effort: '2-4 months',
    is_active: true
  },
  {
    recommendation_id: 'app-sast',
    title: 'Implement Static Application Security Testing',
    description: 'Deploy SAST tools in the development pipeline for early vulnerability detection.',
    priority: 'medium',
    domain: 'application',
    technologies: JSON.stringify(['Veracode', 'Checkmarx', 'SonarQube', 'Fortify']),
    effort: '1-3 months',
    is_active: true
  },
  {
    recommendation_id: 'app-waf',
    title: 'Deploy Web Application Firewall',
    description: 'Implement WAF to protect web applications from common attacks.',
    priority: 'high',
    domain: 'application',
    technologies: JSON.stringify(['Cloudflare WAF', 'AWS WAF', 'F5 BIG-IP', 'Imperva']),
    effort: '1-2 months',
    is_active: true
  },
  {
    recommendation_id: 'data-dlp',
    title: 'Deploy Data Loss Prevention',
    description: 'Implement DLP solution to prevent unauthorized data exfiltration.',
    priority: 'medium',
    domain: 'data',
    technologies: JSON.stringify(['Microsoft Purview', 'Symantec DLP', 'Forcepoint DLP', 'Digital Guardian']),
    effort: '2-4 months',
    is_active: true
  },
  {
    recommendation_id: 'data-classification',
    title: 'Implement Data Classification',
    description: 'Deploy automated data classification and labeling solution.',
    priority: 'medium',
    domain: 'data',
    technologies: JSON.stringify(['Microsoft Purview', 'Varonis', 'Spirion', 'BigID']),
    effort: '3-6 months',
    is_active: true
  },
  {
    recommendation_id: 'ops-siem',
    title: 'Deploy SIEM Solution',
    description: 'Implement Security Information and Event Management platform for centralized logging and analysis.',
    priority: 'high',
    domain: 'operations',
    technologies: JSON.stringify(['Splunk', 'IBM QRadar', 'Microsoft Sentinel', 'Elastic SIEM']),
    effort: '2-4 months',
    is_active: true
  },
  {
    recommendation_id: 'ops-soar',
    title: 'Implement SOAR Platform',
    description: 'Deploy Security Orchestration, Automation and Response for incident management.',
    priority: 'medium',
    domain: 'operations',
    technologies: JSON.stringify(['Phantom', 'Demisto', 'Swimlane', 'Chronicle SOAR']),
    effort: '3-6 months',
    is_active: true
  }];


  const seedDatabase = async () => {
    setIsSeeding(true);
    setSeedingStatus('seeding');
    setProgress(0);

    try {
      console.log('Starting database seeding...');

      // Check if data already exists
      const { data: existingData } = await window.ezsite.apis.tablePage(TABLE_ID, {
        PageNo: 1,
        PageSize: 1,
        OrderByField: 'ID',
        IsAsc: false,
        Filters: []
      });

      if (existingData?.List && existingData.List.length > 0) {
        console.log('Data already exists, asking for confirmation...');
        if (!confirm('The database already contains recommendations. Do you want to continue and add more data?')) {
          setSeedingStatus('idle');
          setIsSeeding(false);
          return;
        }
      }

      const total = baseRecommendations.length;
      let completed = 0;

      for (const recommendation of baseRecommendations) {
        try {
          console.log(`Seeding recommendation: ${recommendation.recommendation_id}`);

          const { error } = await window.ezsite.apis.tableCreate(TABLE_ID, recommendation);

          if (error) {
            if (error.includes('duplicate') || error.includes('already exists')) {
              console.log(`Recommendation ${recommendation.recommendation_id} already exists, skipping...`);
            } else {
              throw new Error(error);
            }
          }

          completed++;
          setProgress(completed / total * 100);

          // Small delay to show progress
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error seeding recommendation ${recommendation.recommendation_id}:`, error);
          // Continue with other recommendations
        }
      }

      console.log('Database seeding completed successfully');
      setSeedingStatus('success');
      toast({
        title: "Database Seeded Successfully",
        description: `Added ${completed} recommendations to the database.`
      });

    } catch (error) {
      console.error('Error seeding database:', error);
      setSeedingStatus('error');
      toast({
        title: "Seeding Failed",
        description: error instanceof Error ? error.message : 'Failed to seed database',
        variant: "destructive"
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Database className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle>Seed Database</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {seedingStatus === 'idle' &&
        <>
            <p className="text-sm text-gray-600 text-center">
              Initialize the database with security recommendations
            </p>
            <Button
            onClick={seedDatabase}
            disabled={isSeeding}
            className="w-full">

              Seed Database
            </Button>
          </>
        }

        {seedingStatus === 'seeding' &&
        <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Seeding recommendations...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </>
        }

        {seedingStatus === 'success' &&
        <div className="text-center space-y-2">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
            <p className="text-sm text-green-600 font-medium">
              Database seeded successfully!
            </p>
          </div>
        }

        {seedingStatus === 'error' &&
        <div className="text-center space-y-2">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto" />
            <p className="text-sm text-red-600 font-medium">
              Seeding failed. Please try again.
            </p>
            <Button
            onClick={() => setSeedingStatus('idle')}
            variant="outline"
            size="sm">

              Try Again
            </Button>
          </div>
        }
      </CardContent>
    </Card>);

};

export default SeedData;