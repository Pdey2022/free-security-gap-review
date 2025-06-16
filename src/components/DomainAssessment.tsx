import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, X, Minus, HelpCircle, ChevronRight } from 'lucide-react';
import { Domain, Answer } from '@/types/assessment';

interface DomainAssessmentProps {
  domain: Domain;
  answers: Record<string, Answer>;
  onAnswerUpdate: (questionId: string, answer: Answer) => void;
  onNext?: () => void;
  isLastDomain?: boolean;
}

const DomainAssessment: React.FC<DomainAssessmentProps> = ({
  domain,
  answers,
  onAnswerUpdate,
  onNext,
  isLastDomain = false
}) => {
  const answeredQuestions = domain.questions.filter((q) => answers[q.id]).length;
  const progress = answeredQuestions / domain.questions.length * 100;
  const isComplete = progress === 100;

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
        onClick={() => handleAnswerChange(questionId, value)} data-id="11ynslgr1" data-path="src/components/DomainAssessment.tsx">

        {icon}
        {label}
      </Button>);

  };

  return (
    <Card data-id="uncunbyqz" data-path="src/components/DomainAssessment.tsx">
      <CardHeader data-id="kflii82c1" data-path="src/components/DomainAssessment.tsx">
        <div className="flex items-center gap-3" data-id="jh0o1tyuf" data-path="src/components/DomainAssessment.tsx">
          <span className="text-2xl" data-id="b1th648m9" data-path="src/components/DomainAssessment.tsx">{domain.icon}</span>
          <div data-id="csc3equ86" data-path="src/components/DomainAssessment.tsx">
            <CardTitle className="text-xl" data-id="ytbtsxyuw" data-path="src/components/DomainAssessment.tsx">{domain.name}</CardTitle>
            <CardDescription data-id="j8tm5bqo5" data-path="src/components/DomainAssessment.tsx">{domain.description}</CardDescription>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4" data-id="ee6wh3sib" data-path="src/components/DomainAssessment.tsx">
          <span className="text-sm font-medium" data-id="kto4wrtmw" data-path="src/components/DomainAssessment.tsx">Progress</span>
          <span className="text-sm text-slate-600" data-id="ee7wm15if" data-path="src/components/DomainAssessment.tsx">
            {answeredQuestions} of {domain.questions.length} questions
          </span>
        </div>
        <Progress value={progress} className="h-2" data-id="gws26erkh" data-path="src/components/DomainAssessment.tsx" />
      </CardHeader>

      <CardContent className="space-y-6" data-id="ok878lo7y" data-path="src/components/DomainAssessment.tsx">
        {domain.questions.map((question, index) => {
          const answer = answers[question.id];
          const isAnswered = !!answer;

          return (
            <Card key={question.id} className={`${isAnswered ? 'border-green-200 bg-green-50/50' : ''}`} data-id="ecq7955wl" data-path="src/components/DomainAssessment.tsx">
              <CardContent className="pt-6" data-id="8v6ejm6zc" data-path="src/components/DomainAssessment.tsx">
                <div className="space-y-4" data-id="5ds85qalt" data-path="src/components/DomainAssessment.tsx">
                  {/* Question */}
                  <div className="flex items-start gap-3" data-id="urm9e1d93" data-path="src/components/DomainAssessment.tsx">
                    <Badge variant="outline" className="text-xs mt-1" data-id="wone5pr3n" data-path="src/components/DomainAssessment.tsx">
                      {index + 1}
                    </Badge>
                    <div className="flex-1" data-id="g11ucermq" data-path="src/components/DomainAssessment.tsx">
                      <p className="font-medium text-slate-900 leading-relaxed" data-id="7mm7copot" data-path="src/components/DomainAssessment.tsx">
                        {question.text}
                      </p>
                      {question.weight && question.weight > 1 &&
                      <Badge variant="secondary" className="text-xs mt-2" data-id="zgh6t5zbj" data-path="src/components/DomainAssessment.tsx">
                          High Priority (Weight: {question.weight})
                        </Badge>
                      }
                    </div>
                  </div>

                  {/* Answer Buttons */}
                  <div className="flex flex-wrap gap-2 ml-8" data-id="plv8f0cok" data-path="src/components/DomainAssessment.tsx">
                    {getAnswerButton(
                      question.id,
                      'yes',
                      <Check className="w-3 h-3" data-id="9a97eb57r" data-path="src/components/DomainAssessment.tsx" />,
                      'Yes',
                      'bg-green-600 hover:bg-green-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'partial',
                      <Minus className="w-3 h-3" data-id="3at5n8jx0" data-path="src/components/DomainAssessment.tsx" />,
                      'Partial',
                      'bg-yellow-600 hover:bg-yellow-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'no',
                      <X className="w-3 h-3" data-id="5ru8aw20n" data-path="src/components/DomainAssessment.tsx" />,
                      'No',
                      'bg-red-600 hover:bg-red-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'na',
                      <HelpCircle className="w-3 h-3" data-id="7tpssu1dn" data-path="src/components/DomainAssessment.tsx" />,
                      'N/A',
                      'bg-gray-600 hover:bg-gray-700'
                    )}
                  </div>

                  {/* Notes */}
                  {isAnswered &&
                  <div className="ml-8" data-id="agdh0u6p5" data-path="src/components/DomainAssessment.tsx">
                      <Textarea
                      placeholder="Add notes or comments (optional)..."
                      value={answer.notes || ''}
                      onChange={(e) => handleNotesChange(question.id, e.target.value)}
                      className="text-sm"
                      rows={2} data-id="cxrr99gcf" data-path="src/components/DomainAssessment.tsx" />

                    </div>
                  }
                </div>
              </CardContent>
            </Card>);

        })}

        {/* Next Domain Button - Only show if questions are complete and not last domain */}
        {isComplete && !isLastDomain && onNext &&
        <div className="flex justify-end pt-6 border-t" data-id="a56thc3ap" data-path="src/components/DomainAssessment.tsx">
            <Button
            onClick={onNext}
            className="flex items-center gap-2"
            size="lg" data-id="i7ga7k3p0" data-path="src/components/DomainAssessment.tsx">
              Next Domain
              <ChevronRight className="w-4 h-4" data-id="xhfh8pi34" data-path="src/components/DomainAssessment.tsx" />
            </Button>
          </div>
        }

        {/* Assessment Complete Message for last domain */}
        {isComplete && isLastDomain &&
        <div className="flex justify-center pt-6 border-t" data-id="w62c32p2p" data-path="src/components/DomainAssessment.tsx">
            <div className="text-center" data-id="3oet5uxkt" data-path="src/components/DomainAssessment.tsx">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2" data-id="0ku291o9w" data-path="src/components/DomainAssessment.tsx">
                <Check className="w-5 h-5" data-id="x9dlmphio" data-path="src/components/DomainAssessment.tsx" />
                <span className="font-semibold" data-id="fgsgs47d3" data-path="src/components/DomainAssessment.tsx">Assessment Complete!</span>
              </div>
              <p className="text-sm text-slate-600" data-id="8lu98zn39" data-path="src/components/DomainAssessment.tsx">
                View your results and recommendations in the tabs above.
              </p>
            </div>
          </div>
        }
      </CardContent>
    </Card>);

};

export default DomainAssessment;