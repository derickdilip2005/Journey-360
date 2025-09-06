import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QuestionMarkCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface QuizAnswer {
  questionId: string;
  answer: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
}

interface Step2Props {
  answers: QuizAnswer[];
  setAnswers: (answers: QuizAnswer[]) => void;
  recommendation: string;
  onNext: () => void;
  onPrevious: () => void;
}

const Step2RecommendationQuiz: React.FC<Step2Props> = ({
  answers,
  setAnswers,
  recommendation,
  onNext,
  onPrevious
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 'duration',
      question: 'How long do you plan to stay in India?',
      description: 'This helps us determine the most suitable visa duration for your trip.',
      options: [
        {
          value: 'short',
          label: 'Less than 30 days',
          description: 'Perfect for short vacations or business trips',
          icon: <ClockIcon className="w-6 h-6" />
        },
        {
          value: 'medium',
          label: '1-6 months',
          description: 'Ideal for extended travel or longer stays',
          icon: <CalendarDaysIcon className="w-6 h-6" />
        },
        {
          value: 'long',
          label: 'Multiple visits throughout the year',
          description: 'Great for frequent travelers or business needs',
          icon: <GlobeAltIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'frequency',
      question: 'How often do you plan to visit India?',
      description: 'This determines whether you need single or multiple entry options.',
      options: [
        {
          value: 'once',
          label: 'Just this one trip',
          description: 'Single visit for tourism or business',
          icon: <CheckCircleIcon className="w-6 h-6" />
        },
        {
          value: 'few',
          label: '2-3 times this year',
          description: 'Occasional visits for various purposes',
          icon: <CalendarDaysIcon className="w-6 h-6" />
        },
        {
          value: 'regular',
          label: 'Regular visits (4+ times)',
          description: 'Frequent travel for business or family',
          icon: <GlobeAltIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'flexibility',
      question: 'Do you need flexibility in your travel dates?',
      description: 'Some visas offer more flexibility for changing travel plans.',
      options: [
        {
          value: 'fixed',
          label: 'Fixed dates - I know exactly when I\'m traveling',
          description: 'Specific travel dates already planned',
          icon: <CalendarDaysIcon className="w-6 h-6" />
        },
        {
          value: 'flexible',
          label: 'Flexible - I might change my travel dates',
          description: 'Need options to adjust travel plans',
          icon: <ClockIcon className="w-6 h-6" />
        },
        {
          value: 'open',
          label: 'Very flexible - I want maximum options',
          description: 'Want the most flexibility possible',
          icon: <GlobeAltIcon className="w-6 h-6" />
        }
      ]
    }
  ];

  const handleAnswerSelect = (questionId: string, answer: string) => {
    const newAnswers = answers.filter(a => a.questionId !== questionId);
    newAnswers.push({ questionId, answer });
    setAnswers(newAnswers);
  };

  const getCurrentAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.answer || '';
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowRecommendation(true);
    }
  };

  const handlePrevious = () => {
    if (showRecommendation) {
      setShowRecommendation(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPrevious();
    }
  };

  const isCurrentQuestionAnswered = () => {
    return getCurrentAnswer(questions[currentQuestion]?.id) !== '';
  };

  const getRecommendationDetails = () => {
    switch (recommendation) {
      case '1-month':
        return {
          title: 'One Month e-Tourist Visa',
          subtitle: 'Perfect for your travel plans!',
          features: [
            '30 days stay duration',
            'Double entry allowed',
            'Quick processing',
            'Cost-effective for short trips'
          ],
          color: 'blue'
        };
      case '1-year':
        return {
          title: 'One Year e-Tourist Visa',
          subtitle: 'Great choice for extended travel!',
          features: [
            '365 days validity',
            'Multiple entries allowed',
            'Up to 180 days per visit',
            'Perfect for longer stays'
          ],
          color: 'green'
        };
      case '5-year':
        return {
          title: 'Five Year e-Tourist Visa',
          subtitle: 'Ideal for frequent travelers!',
          features: [
            '5 years validity',
            'Multiple entries',
            'Maximum flexibility',
            'Best value for regular visitors'
          ],
          color: 'purple'
        };
      default:
        return {
          title: 'One Month e-Tourist Visa',
          subtitle: 'A safe choice for most travelers',
          features: ['30 days stay', 'Double entry', 'Quick processing'],
          color: 'blue'
        };
    }
  };

  const recommendationDetails = getRecommendationDetails();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Step 2: Quick Recommendation Quiz
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Answer a few quick questions to get a personalized visa recommendation tailored to your travel needs.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {showRecommendation ? 'Complete!' : `Question ${currentQuestion + 1} of ${questions.length}`}
          </span>
          <span className="text-sm text-gray-500">
            {showRecommendation ? '100%' : `${Math.round(((currentQuestion + 1) / questions.length) * 100)}%`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: showRecommendation ? '100%' : `${((currentQuestion + 1) / questions.length) * 100}%` 
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showRecommendation ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {questions[currentQuestion]?.question}
                </h3>
                {questions[currentQuestion]?.description && (
                  <p className="text-gray-600">
                    {questions[currentQuestion].description}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {questions[currentQuestion]?.options.map((option, index) => {
                  const isSelected = getCurrentAnswer(questions[currentQuestion].id) === option.value;
                  
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => handleAnswerSelect(questions[currentQuestion].id, option.value)}
                      className={`
                        w-full text-left p-4 rounded-lg border-2 transition-all duration-300
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 p-2 rounded-lg ${
                          isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {option.label}
                          </h4>
                          {option.description && (
                            <p className="text-sm text-gray-600">
                              {option.description}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${recommendationDetails.color}-100 rounded-full mb-4`}>
                  <CheckCircleIcon className={`w-8 h-8 text-${recommendationDetails.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {recommendationDetails.title}
                </h3>
                <p className={`text-lg text-${recommendationDetails.color}-600 font-medium`}>
                  {recommendationDetails.subtitle}
                </p>
              </div>

              <div className={`bg-${recommendationDetails.color}-50 rounded-lg p-6 mb-6`}>
                <h4 className="font-semibold text-gray-900 mb-4">Why this visa is perfect for you:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recommendationDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className={`w-5 h-5 text-${recommendationDetails.color}-600 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center">
                  This recommendation is based on your answers. You can still choose a different visa type in the next step if needed.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-2xl mx-auto">
        <button
          onClick={handlePrevious}
          className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>

        {showRecommendation ? (
          <button
            onClick={onNext}
            className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Continue to Application</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className={`
              flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300
              ${
                isCurrentQuestionAnswered()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <span>{currentQuestion === questions.length - 1 ? 'Get Recommendation' : 'Next Question'}</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Step2RecommendationQuiz;