import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  GlobeAltIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import Step1VisaSelection from './components/Step1VisaSelection';
import Step2RecommendationQuiz from './components/Step2RecommendationQuiz';
import Step3GuidedApplication from './components/Step3GuidedApplication';
import Step4ExtraHelp from './components/Step4ExtraHelp';

interface VisaType {
  id: string;
  name: string;
  duration: string;
  validity: string;
  entry: string;
  maxStay: string;
  extendable: boolean;
  convertible: boolean;
  bestFor: string;
  description: string;
}

interface QuizAnswer {
  questionId: string;
  answer: string;
}

const VisaAssistPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVisa, setSelectedVisa] = useState<string>('');
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [recommendation, setRecommendation] = useState<string>('');

  const visaTypes: VisaType[] = [
    {
      id: '1-month',
      name: 'One Month e-Tourist Visa',
      duration: '30 days',
      validity: '30 days',
      entry: 'Double entry',
      maxStay: '30 days',
      extendable: false,
      convertible: false,
      bestFor: 'Short trips, quick tours',
      description: 'Perfect for short vacation trips and quick business visits'
    },
    {
      id: '1-year',
      name: 'One Year e-Tourist Visa',
      duration: '365 days',
      validity: '365 days',
      entry: 'Multiple',
      maxStay: '180 days per visit',
      extendable: false,
      convertible: false,
      bestFor: 'Long trips or frequent visits',
      description: 'Ideal for extended stays or multiple visits within a year'
    },
    {
      id: '5-year',
      name: 'Five Year e-Tourist Visa',
      duration: '5 years',
      validity: '5 years',
      entry: 'Multiple',
      maxStay: '180 days per year',
      extendable: false,
      convertible: false,
      bestFor: 'Regular visitors',
      description: 'Best for frequent travelers who visit India regularly'
    }
  ];

  const steps = [
    { number: 1, title: 'Pick Your Visa Type', icon: DocumentTextIcon },
    { number: 2, title: 'Quick Recommendation Quiz', icon: QuestionMarkCircleIcon },
    { number: 3, title: 'Guided Application', icon: CheckCircleIcon },
    { number: 4, title: 'Extra Help', icon: GlobeAltIcon }
  ];

  const getRecommendation = (answers: QuizAnswer[]): string => {
    const durationAnswer = answers.find(a => a.questionId === 'duration')?.answer;
    const frequencyAnswer = answers.find(a => a.questionId === 'frequency')?.answer;
    const flexibilityAnswer = answers.find(a => a.questionId === 'flexibility')?.answer;

    if (durationAnswer === 'short' && frequencyAnswer === 'once') {
      return '1-month';
    } else if (frequencyAnswer === 'regular' || flexibilityAnswer === 'open') {
      return '5-year';
    } else if (durationAnswer === 'medium' || frequencyAnswer === 'few') {
      return '1-year';
    }
    return '1-month'; // default
  };

  // Update recommendation when answers change
  React.useEffect(() => {
    if (answers.length >= 3) {
      const newRecommendation = getRecommendation(answers);
      setRecommendation(newRecommendation);
    }
  }, [answers]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1VisaSelection
            visaTypes={visaTypes}
            selectedVisa={selectedVisa}
            setSelectedVisa={setSelectedVisa}
            onNext={() => setCurrentStep(2)}
          />
        );
        
      case 2:
        return (
          <Step2RecommendationQuiz
            answers={answers}
            setAnswers={setAnswers}
            recommendation={recommendation}
            onNext={() => setCurrentStep(3)}
            onPrevious={() => setCurrentStep(1)}
          />
        );
        
      case 3:
        return (
          <Step3GuidedApplication
            selectedVisa={selectedVisa}
            onNext={() => setCurrentStep(4)}
            onPrevious={() => setCurrentStep(2)}
          />
        );
        
      case 4:
        return (
          <Step4ExtraHelp
            selectedVisa={selectedVisa}
            onPrevious={() => setCurrentStep(3)}
            onComplete={() => {
              alert('VISA Assist completed! You now have all the information needed for your application.');
            }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              VISA Assist
            </h1>
            <p className="text-lg text-gray-600">
              Get your Indian e-Tourist Visa with our step-by-step guidance
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : isActive 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'bg-white border-gray-300 text-gray-400'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircleIcon className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`
                      mt-2 text-sm font-medium text-center max-w-24
                      ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                    `}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-4 transition-all duration-300
                      ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default VisaAssistPage;