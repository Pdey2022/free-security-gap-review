import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, X, Minus, HelpCircle } from 'lucide-react';
import { Domain, Answer } from '@/types/assessment';

interface DomainAssessmentProps {
  domain: Domain;
  answers: Record<string, Answer>;
  onAnswerUpdate: (questionId: string, answer: Answer) => void;
}

const DomainAssessment: React.FC<DomainAssessmentProps> = ({
  domain,
  answers,
  onAnswerUpdate
}) => {
  const answeredQuestions = domain.questions.filter((q) => answers[q.id]).length;
  const progress = answeredQuestions / domain.questions.length * 100;

  const handleAnswerChange = (questionId: string, value: Answer['value']) => {
    const currentAnswer = answers[questionId];
    onAnswerUpdate(questionId, {
      questionId,
      value,
      notes: currentAnswer?.notes || ''
    });
  };

  const handleNotesChange = (questionId: string, notes: string) => {
    const currentAnswer = answers[questionId];
    if (currentAnswer) {
      onAnswerUpdate(questionId, {
        ...currentAnswer,
        notes
      });
    }
  };

  const getAnswerButton = (questionId: string, value: Answer['value'], icon: React.ReactNode, label: string, colorClass: string) => {
    const isSelected = answers[questionId]?.value === value;

    return (
      <Button
        variant={isSelected ? "default" : "outline"}
        size="sm"
        className={`flex items-center gap-1 ${isSelected ? colorClass : ''}`}
        onClick={() => handleAnswerChange(questionId, value)} data-id="algek4kpi" data-path="src/components/DomainAssessment.tsx">

        {icon}
        {label}
      </Button>);

  };

  return (
    <Card data-id="3gcod74t1" data-path="src/components/DomainAssessment.tsx">
      <CardHeader data-id="qkigcjpnp" data-path="src/components/DomainAssessment.tsx">
        <div className="flex items-center gap-3" data-id="p8ivfm4h7" data-path="src/components/DomainAssessment.tsx">
          <span className="text-2xl" data-id="f5xgog2y5" data-path="src/components/DomainAssessment.tsx">{domain.icon}</span>
          <div data-id="98k4mpe0n" data-path="src/components/DomainAssessment.tsx">
            <CardTitle className="text-xl" data-id="s8yqawyq7" data-path="src/components/DomainAssessment.tsx">{domain.name}</CardTitle>
            <CardDescription data-id="2zuvs3zuw" data-path="src/components/DomainAssessment.tsx">{domain.description}</CardDescription>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4" data-id="aeb9gjp7t" data-path="src/components/DomainAssessment.tsx">
          <span className="text-sm font-medium" data-id="l3cix1ac8" data-path="src/components/DomainAssessment.tsx">Progress</span>
          <span className="text-sm text-slate-600" data-id="x0566p6mt" data-path="src/components/DomainAssessment.tsx">
            {answeredQuestions} of {domain.questions.length} questions
          </span>
        </div>
        <Progress value={progress} className="h-2" data-id="epgvcvxu2" data-path="src/components/DomainAssessment.tsx" />
      </CardHeader>

      <CardContent className="space-y-6" data-id="zx7otp51r" data-path="src/components/DomainAssessment.tsx">
        {domain.questions.map((question, index) => {
          const answer = answers[question.id];
          const isAnswered = !!answer;

          return (
            <Card key={question.id} className={`${isAnswered ? 'border-green-200 bg-green-50/50' : ''}`} data-id="ed5ebktrg" data-path="src/components/DomainAssessment.tsx">
              <CardContent className="pt-6" data-id="9l6mxspox" data-path="src/components/DomainAssessment.tsx">
                <div className="space-y-4" data-id="irqc2ek0a" data-path="src/components/DomainAssessment.tsx">
                  {/* Question */}
                  <div className="flex items-start gap-3" data-id="87zm92z89" data-path="src/components/DomainAssessment.tsx">
                    <Badge variant="outline" className="text-xs mt-1" data-id="0auz0tdt8" data-path="src/components/DomainAssessment.tsx">
                      {index + 1}
                    </Badge>
                    <div className="flex-1" data-id="rozex0a72" data-path="src/components/DomainAssessment.tsx">
                      <p className="font-medium text-slate-900 leading-relaxed" data-id="q9q8amob3" data-path="src/components/DomainAssessment.tsx">
                        {question.text}
                      </p>
                      {question.weight && question.weight > 1 &&
                      <Badge variant="secondary" className="text-xs mt-2" data-id="i9svxf3ls" data-path="src/components/DomainAssessment.tsx">
                          High Priority (Weight: {question.weight})
                        </Badge>
                      }
                    </div>
                  </div>

                  {/* Answer Buttons */}
                  <div className="flex flex-wrap gap-2 ml-8" data-id="35u3msaym" data-path="src/components/DomainAssessment.tsx">
                    {getAnswerButton(
                      question.id,
                      'yes',
                      <Check className="w-3 h-3" data-id="d8bqezwc7" data-path="src/components/DomainAssessment.tsx" />,
                      'Yes',
                      'bg-green-600 hover:bg-green-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'partial',
                      <Minus className="w-3 h-3" data-id="i1mucfyv0" data-path="src/components/DomainAssessment.tsx" />,
                      'Partial',
                      'bg-yellow-600 hover:bg-yellow-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'no',
                      <X className="w-3 h-3" data-id="sir9gfgmf" data-path="src/components/DomainAssessment.tsx" />,
                      'No',
                      'bg-red-600 hover:bg-red-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'na',
                      <HelpCircle className="w-3 h-3" data-id="qqlcu9xz8" data-path="src/components/DomainAssessment.tsx" />,
                      'N/A',
                      'bg-gray-600 hover:bg-gray-700'
                    )}
                  </div>

                  {/* Notes */}
                  {isAnswered &&
                  <div className="ml-8" data-id="2edx5ix28" data-path="src/components/DomainAssessment.tsx">
                      <Textarea
                      placeholder="Add notes or comments (optional)..."
                      value={answer.notes || ''}
                      onChange={(e) => handleNotesChange(question.id, e.target.value)}
                      className="text-sm"
                      rows={2} data-id="439vtbo2k" data-path="src/components/DomainAssessment.tsx" />

                    </div>
                  }
                </div>
              </CardContent>
            </Card>);

        })}
      </CardContent>
    </Card>);

};

export default DomainAssessment;