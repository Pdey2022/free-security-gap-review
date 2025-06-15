import { Domain } from '@/types/assessment';

export const securityDomains: Domain[] = [
{
  id: 'governance',
  name: 'Governance, Risk & Compliance',
  icon: '🏛️',
  description: 'Policies, governance frameworks, risk management, and compliance programs',
  questions: [
  { id: 'gov-1', text: 'Do you have an overarching security policy?', weight: 3 },
  { id: 'gov-2', text: 'Are security policies reviewed and updated annually?', weight: 2 },
  { id: 'gov-3', text: 'Are policies aligned with regulatory or compliance requirements (e.g., GDPR, HIPAA, PCI-DSS)?', weight: 3 },
  { id: 'gov-4', text: 'Is there an appointed security leader (CISO, Head of Security)?', weight: 3 },
  { id: 'gov-5', text: 'Is security discussed at the board level?', weight: 2 },
  { id: 'gov-6', text: 'Do you maintain a risk register?', weight: 2 },
  { id: 'gov-7', text: 'Are security risks assessed and prioritized using a consistent methodology?', weight: 3 },
  { id: 'gov-8', text: 'Do you perform business impact assessments?', weight: 2 },
  { id: 'gov-9', text: 'Which industry-specific regulations apply to you (ISO 27001, SOC 2, NIST)?', weight: 2 },
  { id: 'gov-10', text: 'Are regular internal/external audits conducted?', weight: 2 },
  { id: 'gov-11', text: 'Do you use any GRC (Governance, Risk, Compliance) tools?', weight: 1 }]

},
{
  id: 'iam',
  name: 'Identity & Access Management',
  icon: '🔐',
  description: 'Authentication, authorization, and identity governance controls',
  questions: [
  { id: 'iam-1', text: 'Is Multi-Factor Authentication (MFA) enforced across all users?', weight: 3 },
  { id: 'iam-2', text: 'Is MFA enforced for privileged/admin accounts?', weight: 3 },
  { id: 'iam-3', text: 'Do you have a centralised identity provider (e.g., Azure AD, Okta)?', weight: 2 },
  { id: 'iam-4', text: 'Are roles and permissions reviewed periodically?', weight: 2 },
  { id: 'iam-5', text: 'Is there a Joiner-Mover-Leaver process?', weight: 3 },
  { id: 'iam-6', text: 'Are service accounts reviewed for use and scope?', weight: 2 },
  { id: 'iam-7', text: 'Are credentials stored securely (e.g., Vault, Secret Manager)?', weight: 3 },
  { id: 'iam-8', text: 'Do you use passwordless authentication or biometric controls?', weight: 1 }]

},
{
  id: 'network',
  name: 'Network Security',
  icon: '🌐',
  description: 'Network controls, segmentation, and traffic monitoring',
  questions: [
  { id: 'net-1', text: 'Are firewalls (NGFWs) deployed at the perimeter?', weight: 3 },
  { id: 'net-2', text: 'Are NSGs/SGs used in cloud environments?', weight: 2 },
  { id: 'net-3', text: 'Is traffic segmented (e.g., Prod vs Dev vs UAT)?', weight: 2 },
  { id: 'net-4', text: 'Are ingress/egress points logged and monitored?', weight: 2 },
  { id: 'net-5', text: 'Are firewall rules reviewed at least annually?', weight: 2 },
  { id: 'net-6', text: 'Do you use a Zero Trust Network Architecture (ZTNA)?', weight: 2 },
  { id: 'net-7', text: 'Are there controls for east-west traffic?', weight: 2 },
  { id: 'net-8', text: 'Is VPN access monitored and controlled?', weight: 2 }]

},
{
  id: 'endpoint',
  name: 'Endpoint Security',
  icon: '🖥️',
  description: 'Device protection, management, and monitoring capabilities',
  questions: [
  { id: 'end-1', text: 'What EPP/EDR/XDR solution is deployed (e.g., CrowdStrike, Defender)?', weight: 3 },
  { id: 'end-2', text: 'Are USB and removable storage devices controlled?', weight: 2 },
  { id: 'end-3', text: 'Are operating systems and applications updated regularly?', weight: 3 },
  { id: 'end-4', text: 'Is endpoint telemetry sent to a centralised platform?', weight: 2 },
  { id: 'end-5', text: 'Are devices encrypted at rest (e.g., BitLocker, FileVault)?', weight: 3 },
  { id: 'end-6', text: 'Are mobile devices enrolled in MDM?', weight: 2 }]

},
{
  id: 'cloud',
  name: 'Cloud Security',
  icon: '☁️',
  description: 'Cloud infrastructure security and configuration management',
  questions: [
  { id: 'cld-1', text: 'What cloud providers are used?', weight: 1 },
  { id: 'cld-2', text: 'Do you use a CSPM (e.g., Wiz, Prisma Cloud)?', weight: 2 },
  { id: 'cld-3', text: 'Are IAM roles and permissions in the cloud regularly reviewed?', weight: 3 },
  { id: 'cld-4', text: 'Do you use workload identity federation?', weight: 2 },
  { id: 'cld-5', text: 'Are cloud security logs ingested into a SIEM?', weight: 2 },
  { id: 'cld-6', text: 'Are serverless or containerized workloads scanned for misconfigurations?', weight: 2 },
  { id: 'cld-7', text: 'Is there encryption for data at rest and in transit?', weight: 3 },
  { id: 'cld-8', text: 'Are secrets managed using a vault (e.g., AWS Secrets Manager, HashiCorp Vault)?', weight: 3 }]

},
{
  id: 'vulnerability',
  name: 'Threat & Vulnerability Management',
  icon: '🧪',
  description: 'Vulnerability identification, assessment, and remediation processes',
  questions: [
  { id: 'vuln-1', text: 'Do you conduct regular internal/external vulnerability scans?', weight: 3 },
  { id: 'vuln-2', text: 'Is vulnerability prioritization based on CVSS + exploitability/business context?', weight: 2 },
  { id: 'vuln-3', text: 'Do you run regular penetration tests?', weight: 2 },
  { id: 'vuln-4', text: 'Are containers and serverless functions scanned for vulnerabilities?', weight: 2 },
  { id: 'vuln-5', text: 'Is there a patch management program?', weight: 3 },
  { id: 'vuln-6', text: 'Do you use threat intelligence feeds?', weight: 2 },
  { id: 'vuln-7', text: 'Are vulnerabilities tracked and remediated within defined SLAs?', weight: 2 }]

},
{
  id: 'application',
  name: 'Application Security',
  icon: '📦',
  description: 'Secure development practices and application protection controls',
  questions: [
  { id: 'app-1', text: 'Are secure coding practices in place?', weight: 3 },
  { id: 'app-2', text: 'Do you run SAST/DAST/IAST scans on code and applications?', weight: 2 },
  { id: 'app-3', text: 'Are 3rd-party/open-source dependencies monitored (e.g., SBOM)?', weight: 2 },
  { id: 'app-4', text: 'Are APIs protected (e.g., via API gateway or WAF)?', weight: 3 },
  { id: 'app-5', text: 'Do you perform threat modeling for critical apps?', weight: 2 },
  { id: 'app-6', text: 'Are developers trained in secure coding practices?', weight: 2 }]

},
{
  id: 'data',
  name: 'Data Protection & Privacy',
  icon: '🛡️',
  description: 'Data classification, encryption, and privacy controls',
  questions: [
  { id: 'data-1', text: 'Is data classified according to sensitivity (PII, PHI, IP)?', weight: 3 },
  { id: 'data-2', text: 'Is sensitive data encrypted at rest and in transit?', weight: 3 },
  { id: 'data-3', text: 'Do you use DLP (Data Loss Prevention) tools?', weight: 2 },
  { id: 'data-4', text: 'Are data retention policies defined and enforced?', weight: 2 },
  { id: 'data-5', text: 'Are backup & recovery plans in place and tested?', weight: 3 },
  { id: 'data-6', text: 'Are privacy notices and consent mechanisms in place for end users?', weight: 2 }]

},
{
  id: 'operations',
  name: 'Security Operations',
  icon: '🚨',
  description: 'SOC capabilities, monitoring, and incident response',
  questions: [
  { id: 'ops-1', text: 'Do you have a SOC (internal or outsourced)?', weight: 2 },
  { id: 'ops-2', text: 'What SIEM or log aggregation tools do you use?', weight: 2 },
  { id: 'ops-3', text: 'Are use cases/playbooks defined for threat detection?', weight: 2 },
  { id: 'ops-4', text: 'Do you have an Incident Response Plan (IRP)?', weight: 3 },
  { id: 'ops-5', text: 'Is IR tested annually (e.g., tabletop exercises)?', weight: 2 },
  { id: 'ops-6', text: 'Is there a ticketing system for tracking incidents?', weight: 1 },
  { id: 'ops-7', text: 'Do you use SOAR (Security Orchestration & Response)?', weight: 1 }]

},
{
  id: 'awareness',
  name: 'Security Awareness & Training',
  icon: '👥',
  description: 'Security education and awareness programs',
  questions: [
  { id: 'aware-1', text: 'Do you conduct mandatory security awareness training?', weight: 3 },
  { id: 'aware-2', text: 'Are phishing simulations performed regularly?', weight: 2 },
  { id: 'aware-3', text: 'Are employees trained on reporting incidents?', weight: 2 },
  { id: 'aware-4', text: 'Is developer-specific security training available?', weight: 2 },
  { id: 'aware-5', text: 'Is training tracked and audited?', weight: 1 }]

},
{
  id: 'thirdparty',
  name: 'Third-Party Security',
  icon: '🔄',
  description: 'Vendor risk management and supply chain security',
  questions: [
  { id: 'third-1', text: 'Do you assess vendor security before onboarding?', weight: 3 },
  { id: 'third-2', text: 'Are vendor risk assessments reviewed periodically?', weight: 2 },
  { id: 'third-3', text: 'Are third-party access controls in place?', weight: 2 },
  { id: 'third-4', text: 'Do you track 4th-party (sub-processor) risks?', weight: 2 }]

},
{
  id: 'physical',
  name: 'Physical Security & Resilience',
  icon: '🌍',
  description: 'Physical security controls and business continuity',
  questions: [
  { id: 'phys-1', text: 'Are physical facilities secured (badge access, CCTV, visitor logs)?', weight: 2 },
  { id: 'phys-2', text: 'Are data centres certified (e.g., ISO 27001, SOC 2)?', weight: 2 },
  { id: 'phys-3', text: 'Is business continuity planning documented and tested?', weight: 3 },
  { id: 'phys-4', text: 'Is disaster recovery tested at least annually?', weight: 3 }]

}];