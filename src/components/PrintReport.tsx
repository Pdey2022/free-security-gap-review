import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { Answer, Domain, MaturityLevel } from '@/types/assessment';

interface PrintReportProps {
  domains: Domain[];
  answers: Record<string, Answer>;
  maturityLevel: MaturityLevel;
  recommendations: any[];
}

const PrintReport: React.FC<PrintReportProps> = ({ 
  domains, 
  answers, 
  maturityLevel, 
  recommendations 
}) => {
  const handlePrint = () => {
    window.print();
  };

  const calculateDomainScore = (domain: Domain): number => {
    const totalWeight = domain.questions.reduce((sum, q) => sum + (q.weight || 1), 0);
    let achievedScore = 0;

    domain.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        const weight = question.weight || 1;
        switch (answer.value) {
          case 'yes': achievedScore += weight; break;
          case 'partial': achievedScore += weight * 0.5; break;
          case 'no': achievedScore += 0; break;
          case 'na': break;
        }
      }
    });

    return totalWeight > 0 ? (achievedScore / totalWeight) * 100 : 0;
  };

  const totalQuestions = domains.reduce((sum, domain) => sum + domain.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const overallProgress = answeredQuestions / totalQuestions * 100;

  const generateReportContent = () => {
    const reportDate = new Date().toLocaleDateString();
    const highPriorityRecs = recommendations.filter(r => r.priority === 'high');
    const mediumPriorityRecs = recommendations.filter(r => r.priority === 'medium');
    const lowPriorityRecs = recommendations.filter(r => r.priority === 'low');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cybersecurity Assessment Report</title>
          <style>
            @media print {
              body { margin: 0; font-family: Arial, sans-serif; }
              .no-print { display: none !important; }
              .page-break { page-break-before: always; }
              .header { background: #1e293b; color: white; padding: 20px; text-align: center; }
              .section { margin: 20px; }
              .domain-summary { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; border: 1px solid #e2e8f0; }
              .recommendation { margin: 15px 0; padding: 15px; border-left: 4px solid #3b82f6; background: #f8fafc; }
              .high-priority { border-left-color: #ef4444; }
              .medium-priority { border-left-color: #f59e0b; }
              .low-priority { border-left-color: #10b981; }
              .maturity-badge { display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold; }
              .maturity-1 { background: #fecaca; color: #991b1b; }
              .maturity-2 { background: #fed7aa; color: #9a3412; }
              .maturity-3 { background: #fef3c7; color: #92400e; }
              .maturity-4 { background: #dbeafe; color: #1e40af; }
              .maturity-5 { background: #dcfce7; color: #166534; }
            }
            @media screen {
              .report-container { max-width: 800px; margin: 0 auto; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="report-container">
            <div class="header">
              <h1>Cybersecurity Assessment Report</h1>
              <p>Generated on ${reportDate}</p>
            </div>

            <div class="section">
              <h2>Executive Summary</h2>
              <p><strong>Overall Completion:</strong> ${Math.round(overallProgress)}% (${answeredQuestions}/${totalQuestions} questions)</p>
              <p><strong>Current Maturity Level:</strong> 
                <span class="maturity-badge maturity-${maturityLevel.level}">
                  Level ${maturityLevel.level} - ${maturityLevel.name}
                </span>
              </p>
              <p><strong>Description:</strong> ${maturityLevel.description}</p>
              <p><strong>Total Recommendations:</strong> ${recommendations.length} (${highPriorityRecs.length} High, ${mediumPriorityRecs.length} Medium, ${lowPriorityRecs.length} Low Priority)</p>
            </div>

            <div class="section page-break">
              <h2>Domain Assessment Results</h2>
              ${domains.map(domain => {
                const score = Math.round(calculateDomainScore(domain));
                const domainAnswers = domain.questions.filter(q => answers[q.id]);
                const completion = Math.round((domainAnswers.length / domain.questions.length) * 100);
                
                return `
                  <div class="domain-summary">
                    <div>
                      <strong>${domain.icon} ${domain.name}</strong><br>
                      <small>${domain.description}</small>
                    </div>
                    <div style="text-align: right;">
                      <div><strong>${score}%</strong> Maturity Score</div>
                      <div>${completion}% Complete</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="section page-break">
              <h2>High Priority Recommendations</h2>
              ${highPriorityRecs.length > 0 ? highPriorityRecs.map(rec => `
                <div class="recommendation high-priority">
                  <h3>${rec.title}</h3>
                  <p>${rec.description}</p>
                  <p><strong>Domain:</strong> ${rec.domain} | <strong>Effort:</strong> ${rec.effort}</p>
                  <p><strong>Technologies:</strong> ${rec.technologies.join(', ')}</p>
                </div>
              `).join('') : '<p>No high priority recommendations - excellent security posture!</p>'}
            </div>

            <div class="section page-break">
              <h2>Medium Priority Recommendations</h2>
              ${mediumPriorityRecs.map(rec => `
                <div class="recommendation medium-priority">
                  <h3>${rec.title}</h3>
                  <p>${rec.description}</p>
                  <p><strong>Domain:</strong> ${rec.domain} | <strong>Effort:</strong> ${rec.effort}</p>
                  <p><strong>Technologies:</strong> ${rec.technologies.join(', ')}</p>
                </div>
              `).join('')}
            </div>

            <div class="section page-break">
              <h2>Low Priority Recommendations</h2>
              ${lowPriorityRecs.map(rec => `
                <div class="recommendation low-priority">
                  <h3>${rec.title}</h3>
                  <p>${rec.description}</p>
                  <p><strong>Domain:</strong> ${rec.domain} | <strong>Effort:</strong> ${rec.effort}</p>
                  <p><strong>Technologies:</strong> ${rec.technologies.join(', ')}</p>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h2>Next Steps</h2>
              <ol>
                <li><strong>Phase 1 (0-3 months):</strong> Address all high priority recommendations</li>
                <li><strong>Phase 2 (3-9 months):</strong> Implement medium priority enhancements</li>
                <li><strong>Phase 3 (9+ months):</strong> Focus on optimization and low priority items</li>
                <li><strong>Continuous:</strong> Regular reassessment and monitoring</li>
              </ol>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const downloadReport = () => {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybersecurity-assessment-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 no-print">
      <Button onClick={handlePrint} variant="outline" size="sm">
        <Printer className="w-4 h-4 mr-2" />
        Print Report
      </Button>
      <Button onClick={downloadReport} variant="outline" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Download HTML Report
      </Button>
    </div>
  );
};

export default PrintReport;