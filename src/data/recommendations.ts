import { Recommendation } from '@/types/assessment';

export const recommendationDatabase = (answers: Record<string, any> = {}): Recommendation[] => {
  const baseRecommendations: Recommendation[] = [
  // Governance
  {
    id: 'gov-policy',
    title: 'Implement Comprehensive Security Policy Framework',
    description: 'Develop and implement a comprehensive security policy framework covering all aspects of information security.',
    priority: 'high',
    domain: 'governance',
    technologies: ['Policy Management Platforms', 'GRC Tools', 'Document Management Systems'],
    effort: '3-6 months'
  },
  {
    id: 'gov-grc',
    title: 'Deploy GRC Platform',
    description: 'Implement a Governance, Risk, and Compliance platform to centralize policy management and compliance tracking.',
    priority: 'medium',
    domain: 'governance',
    technologies: ['RSA Archer', 'ServiceNow GRC', 'MetricStream', 'LogicGate'],
    effort: '2-4 months'
  },

  // IAM
  {
    id: 'iam-mfa',
    title: 'Implement Universal MFA',
    description: 'Deploy multi-factor authentication across all user accounts and systems.',
    priority: 'high',
    domain: 'iam',
    technologies: ['Azure AD', 'Okta', 'Duo Security', 'RSA SecurID'],
    effort: '1-3 months'
  },
  {
    id: 'iam-pam',
    title: 'Deploy Privileged Access Management',
    description: 'Implement PAM solution to secure and monitor privileged accounts.',
    priority: 'high',
    domain: 'iam',
    technologies: ['CyberArk', 'BeyondTrust', 'Thycotic', 'Azure PIM'],
    effort: '2-4 months'
  },

  // Network
  {
    id: 'net-ztna',
    title: 'Implement Zero Trust Network Architecture',
    description: 'Deploy Zero Trust principles with micro-segmentation and continuous verification.',
    priority: 'medium',
    domain: 'network',
    technologies: ['Zscaler', 'Palo Alto Prisma', 'Cisco Umbrella', 'Fortinet ZTNA'],
    effort: '4-8 months'
  },
  {
    id: 'net-ngfw',
    title: 'Upgrade to Next-Generation Firewalls',
    description: 'Replace traditional firewalls with NGFWs for advanced threat protection.',
    priority: 'high',
    domain: 'network',
    technologies: ['Palo Alto Networks', 'Fortinet FortiGate', 'Cisco Firepower', 'Check Point'],
    effort: '2-4 months'
  },

  // Endpoint
  {
    id: 'end-edr',
    title: 'Deploy EDR/XDR Solution',
    description: 'Implement endpoint detection and response capabilities for advanced threat hunting.',
    priority: 'high',
    domain: 'endpoint',
    technologies: ['CrowdStrike Falcon', 'Microsoft Defender', 'SentinelOne', 'Carbon Black'],
    effort: '1-2 months'
  },
  {
    id: 'end-encryption',
    title: 'Implement Full Disk Encryption',
    description: 'Deploy full disk encryption across all endpoints and mobile devices.',
    priority: 'high',
    domain: 'endpoint',
    technologies: ['BitLocker', 'FileVault', 'VeraCrypt', 'Symantec Encryption'],
    effort: '1-2 months'
  },

  // Cloud
  {
    id: 'cld-cspm',
    title: 'Deploy Cloud Security Posture Management',
    description: 'Implement CSPM to continuously monitor cloud configurations and compliance.',
    priority: 'high',
    domain: 'cloud',
    technologies: ['Wiz', 'Prisma Cloud', 'CloudGuard', 'Azure Security Center'],
    effort: '1-3 months'
  },
  {
    id: 'cld-secrets',
    title: 'Implement Cloud Secrets Management',
    description: 'Deploy centralized secrets management for cloud workloads.',
    priority: 'high',
    domain: 'cloud',
    technologies: ['HashiCorp Vault', 'AWS Secrets Manager', 'Azure Key Vault', 'Google Secret Manager'],
    effort: '2-3 months'
  },

  // Vulnerability Management
  {
    id: 'vuln-scanner',
    title: 'Deploy Vulnerability Management Platform',
    description: 'Implement comprehensive vulnerability scanning and management solution.',
    priority: 'high',
    domain: 'vulnerability',
    technologies: ['Tenable', 'Rapid7', 'Qualys', 'OpenVAS'],
    effort: '1-2 months'
  },
  {
    id: 'vuln-patch',
    title: 'Implement Automated Patch Management',
    description: 'Deploy automated patch management system for timely security updates.',
    priority: 'medium',
    domain: 'vulnerability',
    technologies: ['Microsoft WSUS', 'Red Hat Satellite', 'Tanium Patch', 'Automox'],
    effort: '2-4 months'
  },

  // Application Security
  {
    id: 'app-sast',
    title: 'Implement Static Application Security Testing',
    description: 'Deploy SAST tools in the development pipeline for early vulnerability detection.',
    priority: 'medium',
    domain: 'application',
    technologies: ['Veracode', 'Checkmarx', 'SonarQube', 'Fortify'],
    effort: '1-3 months'
  },
  {
    id: 'app-waf',
    title: 'Deploy Web Application Firewall',
    description: 'Implement WAF to protect web applications from common attacks.',
    priority: 'high',
    domain: 'application',
    technologies: ['Cloudflare WAF', 'AWS WAF', 'F5 BIG-IP', 'Imperva'],
    effort: '1-2 months'
  },

  // Data Protection
  {
    id: 'data-dlp',
    title: 'Deploy Data Loss Prevention',
    description: 'Implement DLP solution to prevent unauthorized data exfiltration.',
    priority: 'medium',
    domain: 'data',
    technologies: ['Microsoft Purview', 'Symantec DLP', 'Forcepoint DLP', 'Digital Guardian'],
    effort: '2-4 months'
  },
  {
    id: 'data-classification',
    title: 'Implement Data Classification',
    description: 'Deploy automated data classification and labeling solution.',
    priority: 'medium',
    domain: 'data',
    technologies: ['Microsoft Purview', 'Varonis', 'Spirion', 'BigID'],
    effort: '3-6 months'
  },

  // Security Operations
  {
    id: 'ops-siem',
    title: 'Deploy SIEM Solution',
    description: 'Implement Security Information and Event Management platform for centralized logging and analysis.',
    priority: 'high',
    domain: 'operations',
    technologies: ['Splunk', 'IBM QRadar', 'Microsoft Sentinel', 'Elastic SIEM'],
    effort: '2-4 months'
  },
  {
    id: 'ops-soar',
    title: 'Implement SOAR Platform',
    description: 'Deploy Security Orchestration, Automation and Response for incident management.',
    priority: 'medium',
    domain: 'operations',
    technologies: ['Phantom', 'Demisto', 'Swimlane', 'Chronicle SOAR'],
    effort: '3-6 months'
  }];


  // Smart recommendation prioritization logic
  const prioritizedRecommendations = [...baseRecommendations];

  // Check for Defender EPP/EDR usage
  const hasDefender = Object.values(answers).some((answer) =>
  answer.notes?.toLowerCase().includes('defender') ||
  answer.notes?.toLowerCase().includes('microsoft defender')
  );

  // Check for Azure cloud usage
  const hasAzure = Object.values(answers).some((answer) =>
  answer.notes?.toLowerCase().includes('azure') ||
  answer.notes?.toLowerCase().includes('microsoft azure')
  );

  // Prioritize SIEM/Sentinel if Defender or Azure is detected
  if (hasDefender || hasAzure) {
    const siemIndex = prioritizedRecommendations.findIndex((rec) => rec.id === 'ops-siem');
    if (siemIndex !== -1) {
      // Update SIEM recommendation to prioritize Sentinel
      prioritizedRecommendations[siemIndex] = {
        ...prioritizedRecommendations[siemIndex],
        title: 'Deploy Microsoft Sentinel SIEM',
        description: 'Implement Microsoft Sentinel for centralized security monitoring and analysis. Perfect integration with your existing Microsoft ecosystem.',
        technologies: ['Microsoft Sentinel', 'Azure Monitor', 'Log Analytics', 'Microsoft Defender Integration'],
        priority: 'high'
      };

      // Move SIEM recommendation to the top of the array
      const siemRec = prioritizedRecommendations.splice(siemIndex, 1)[0];
      prioritizedRecommendations.unshift(siemRec);
    }
  }

  return prioritizedRecommendations;
};