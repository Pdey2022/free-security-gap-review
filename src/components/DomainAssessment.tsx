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
        onClick={() => handleAnswerChange(questionId, value)}>

        {icon}
        {label}
      </Button>);

  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{domain.icon}</span>
          <div>
            <CardTitle className="text-xl">{domain.name}</CardTitle>
            <CardDescription>{domain.description}</CardDescription>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-slate-600">
            {answeredQuestions} of {domain.questions.length} questions
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {domain.questions.map((question, index) => {
          const answer = answers[question.id];
          const isAnswered = !!answer;

          return (
            <Card key={question.id} className={`${isAnswered ? 'border-green-200 bg-green-50/50' : ''}`}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Question */}
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="text-xs mt-1">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 leading-relaxed">
                        {question.text}
                      </p>
                      {question.weight && question.weight > 1 &&
                      <Badge variant="secondary" className="text-xs mt-2">
                          High Priority (Weight: {question.weight})
                        </Badge>
                      }
                    </div>
                  </div>

                  {/* Answer Buttons */}
                  <div className="flex flex-wrap gap-2 ml-8">
                    {getAnswerButton(
                      question.id,
                      'yes',
                      <Check className="w-3 h-3" />,
                      'Yes',
                      'bg-green-600 hover:bg-green-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'partial',
                      <Minus className="w-3 h-3" />,
                      'Partial',
                      'bg-yellow-600 hover:bg-yellow-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'no',
                      <X className="w-3 h-3" />,
                      'No',
                      'bg-red-600 hover:bg-red-700'
                    )}
                    {getAnswerButton(
                      question.id,
                      'na',
                      <HelpCircle className="w-3 h-3" />,
                      'N/A',
                      'bg-gray-600 hover:bg-gray-700'
                    )}
                  </div>

                  {/* Notes */}
                  {isAnswered &&
                  <div className="ml-8">
                      <Textarea
                      placeholder="Add notes or comments (optional)..."
                      value={answer.notes || ''}
                      onChange={(e) => handleNotesChange(question.id, e.target.value)}
                      className="text-sm"
                      rows={2} />

                    </div>
                  }
                </div>
              </CardContent>
            </Card>);

        })}

        {/* Next Domain Button - Only show if questions are complete and not last domain */}
        {isComplete && !isLastDomain && onNext && (
          <div className="flex justify-end pt-6 border-t">
            <Button 
              onClick={onNext}
              className="flex items-center gap-2"
              size="lg">
              Next Domain
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Assessment Complete Message for last domain */}
        {isComplete && isLastDomain && (
          <div className="flex justify-center pt-6 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <Check className="w-5 h-5" />
                <span className="font-semibold">Assessment Complete!</span>
              </div>
              <p className="text-sm text-slate-600">
                View your results and recommendations in the tabs above.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>);

};

export default DomainAssessment;