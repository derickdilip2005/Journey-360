import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  GlobeAltIcon, 
  CalendarDaysIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

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

interface Step1Props {
  visaTypes: VisaType[];
  selectedVisa: string;
  setSelectedVisa: (id: string) => void;
  onNext: () => void;
}

const Step1VisaSelection: React.FC<Step1Props> = ({
  visaTypes,
  selectedVisa,
  setSelectedVisa,
  onNext
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Step 1: Pick Your Visa Type
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the e-Tourist Visa that best fits your travel plans. Each option is designed for different types of visits to India.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {visaTypes.map((visa, index) => {
          const isSelected = selectedVisa === visa.id;
          
          return (
            <motion.div
              key={visa.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl
                ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}
              `}
              onClick={() => setSelectedVisa(visa.id)}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                  <CheckIcon className="w-4 h-4" />
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4">
                    <GlobeAltIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {visa.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {visa.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Stay Duration</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{visa.duration}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Validity</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{visa.validity}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Entry Type</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{visa.entry}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Max Stay</span>
                    <span className="text-sm font-semibold text-gray-900">{visa.maxStay}</span>
                  </div>

                  {/* Features */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      {visa.extendable ? (
                        <CheckIcon className="w-4 h-4 text-green-500" />
                      ) : (
                        <XMarkIcon className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-600">
                        {visa.extendable ? 'Extendable' : 'Non-extendable'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {visa.convertible ? (
                        <CheckIcon className="w-4 h-4 text-green-500" />
                      ) : (
                        <XMarkIcon className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-600">
                        {visa.convertible ? 'Convertible' : 'Non-convertible'}
                      </span>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="pt-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-900 mb-1">Best For:</p>
                      <p className="text-sm text-blue-700">{visa.bestFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center pt-8">
        <div className="flex space-x-4">
          <button
            onClick={onNext}
            disabled={!selectedVisa}
            className={`
              flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300
              ${
                selectedVisa
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <span>Continue to Quiz</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mt-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <GlobeAltIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Not sure which visa to choose?
            </h4>
            <p className="text-gray-600 mb-4">
              Don't worry! Our recommendation quiz in the next step will help you find the perfect visa type based on your specific travel plans and preferences.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Quick & Easy
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Personalized
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Expert Guidance
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Step1VisaSelection;