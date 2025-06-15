import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { SecurityDomain, Question, AssessmentResult } from '@/types/assessment';

interface DomainAssessmentProps {
  domain: SecurityDomain;
  onComplete: (result: AssessmentResult) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentDomainIndex: number;
  totalDomains: number;
}

const DomainAssessment: React.FC<DomainAssessmentProps> = ({
  domain,
  onComplete,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  currentDomainIndex,
  totalDomains
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [notes, setNotes] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = domain.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / domain.questions.length) * 100;
  const domainProgress = ((currentDomainIndex + 1) / totalDomains) * 100;

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNoteChange = (questionId: number, note: string) => {
    setNotes(prev => ({ ...prev, [questionId]: note }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < domain.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete domain assessment
      const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
      const maxScore = domain.questions.length * 4;
      const percentage = (totalScore / maxScore) * 100;
      
      const result: AssessmentResult = {
        domainId: domain.id,
        domainName: domain.name,
        score: totalScore,
        maxScore: maxScore,
        percentage: percentage,
        maturityLevel: getMaturityLevel(percentage),
        answers: answers,
        notes: notes,
        recommendations: []
      };
      
      setIsCompleted(true);
      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getMaturityLevel = (percentage: number): string => {
    if (percentage >= 90) return 'Optimized';
    if (percentage >= 70) return 'Managed';
    if (percentage >= 50) return 'Defined';
    if (percentage >= 30) return 'Repeatable';
    return 'Initial';
  };

  const getScoreColor = (score: number) => {
    if (score >= 3) return 'text-green-600';
    if (score >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 3) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 2) return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const currentAnswer = answers[currentQuestion.id];
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Badge variant="outline" className="mb-2">
              Domain {currentDomainIndex + 1} of {totalDomains}
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">{domain.name}</h2>
            <p className="text-gray-600 mt-1">{domain.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
            <div className="w-32">
              <Progress value={domainProgress} className="h-2" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {domain.questions.length}
          </div>
          <div className="w-64">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-start gap-3">
            <span className="text-lg leading-relaxed">{currentQuestion.question}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { score: 0, label: 'Not Implemented', desc: 'No evidence of implementation' },
              { score: 1, label: 'Partially Implemented', desc: 'Some basic implementation' },
              { score: 2, label: 'Largely Implemented', desc: 'Good implementation with minor gaps' },
              { score: 3, label: 'Fully Implemented', desc: 'Complete and mature implementation' }
            ].map((option) => (
              <button
                key={option.score}
                onClick={() => handleAnswer(currentQuestion.id, option.score)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                  currentAnswer === option.score
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{option.label}</span>
                  {currentAnswer === option.score && getScoreIcon(option.score)}
                </div>
                <p className="text-sm text-gray-600">{option.desc}</p>
              </button>
            ))}
          </div>

          {/* Notes Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                Additional Notes & Comments (Optional)
              </label>
            </div>
            <Textarea
              placeholder="Add any additional context, evidence, or observations for this question..."
              value={notes[currentQuestion.id] || ''}
              onChange={(e) => handleNoteChange(currentQuestion.id, e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              {currentAnswer !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Selected:</span>
                  <span className={`font-medium ${getScoreColor(currentAnswer)}`}>
                    {currentAnswer === 0 && 'Not Implemented'}
                    {currentAnswer === 1 && 'Partially Implemented'}
                    {currentAnswer === 2 && 'Largely Implemented'}
                    {currentAnswer === 3 && 'Fully Implemented'}
                  </span>
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-2"
              >
                {currentQuestionIndex === domain.questions.length - 1 ? 'Complete Domain' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Navigation (shown after completion) */}
      {isCompleted && (
        <Card className="shadow-sm border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">
                    {domain.name} Assessment Complete
                  </h3>
                  <p className="text-sm text-green-700">
                    {isLast ? 'All domains completed!' : 'Ready to move to the next domain'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {!isFirst && (
                  <Button variant="outline" onClick={onPrevious}>
                    Previous Domain
                  </Button>
                )}
                {!isLast && (
                  <Button onClick={onNext} className="flex items-center gap-2">
                    Next Domain
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                {isLast && (
                  <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
                    View Results & Recommendations
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DomainAssessment;