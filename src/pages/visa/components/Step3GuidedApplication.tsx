import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  CameraIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  icon: React.ReactNode;
  tips: string[];
}

interface Step3Props {
  selectedVisa: string;
  onNext: () => void;
  onPrevious: () => void;
}

const Step3GuidedApplication: React.FC<Step3Props> = ({
  selectedVisa,
  onNext,
  onPrevious
}) => {
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);
  const [showDeepLinkInfo, setShowDeepLinkInfo] = useState(false);

  const documents: Document[] = [
    {
      id: 'passport',
      name: 'Passport Scan',
      description: 'Clear scan of your passport bio-data page',
      required: true,
      icon: <IdentificationIcon className="w-6 h-6" />,
      tips: [
        'Passport must be valid for at least 6 months',
        'Scan should be clear and readable',
        'File size should be between 10KB - 300KB',
        'Accepted formats: PDF or JPEG'
      ]
    },
    {
      id: 'photo',
      name: 'Digital Photograph',
      description: 'Recent passport-style photograph',
      required: true,
      icon: <CameraIcon className="w-6 h-6" />,
      tips: [
        'White background only',
        'Face should cover 70-80% of the photo',
        'No glasses or headwear (except religious)',
        'File size: 10KB - 1MB, JPEG format'
      ]
    },
    {
      id: 'travel-details',
      name: 'Travel Information',
      description: 'Planned arrival/departure dates and accommodation',
      required: true,
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      tips: [
        'Approximate dates are acceptable',
        'Hotel booking confirmation (if available)',
        'Flight itinerary (if booked)',
        'Contact details in India'
      ]
    },
    {
      id: 'address',
      name: 'Address Proof',
      description: 'Proof of current residential address',
      required: true,
      icon: <MapPinIcon className="w-6 h-6" />,
      tips: [
        'Utility bill, bank statement, or lease agreement',
        'Document should be recent (within 3 months)',
        'Address must match passport details',
        'Clear scan required'
      ]
    },
    {
      id: 'payment',
      name: 'Payment Method',
      description: 'Valid credit/debit card for visa fee payment',
      required: true,
      icon: <CreditCardIcon className="w-6 h-6" />,
      tips: [
        'International transactions must be enabled',
        'Sufficient balance for visa fee',
        'Visa, MasterCard, or American Express accepted',
        'Keep card details handy for payment'
      ]
    }
  ];

  const handleDocumentCheck = (documentId: string) => {
    setCheckedDocuments(prev => 
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const allRequiredDocumentsChecked = () => {
    const requiredDocs = documents.filter(doc => doc.required);
    return requiredDocs.every(doc => checkedDocuments.includes(doc.id));
  };

  const generateDeepLink = () => {
    const baseUrl = 'https://indianvisaonline.gov.in/evisa/tvoa.html';
    const params = new URLSearchParams({
      'purpose': 'Tourism',
      'category': 'e-Tourist Visa',
      'visa_type': selectedVisa === '1-month' ? '30_days' : selectedVisa === '1-year' ? '1_year' : '5_year',
      'pre_filled': 'true'
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  const getVisaTypeDisplay = () => {
    switch (selectedVisa) {
      case '1-month': return 'One Month e-Tourist Visa';
      case '1-year': return 'One Year e-Tourist Visa';
      case '5-year': return 'Five Year e-Tourist Visa';
      default: return 'e-Tourist Visa';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Step 3: Guided Application
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Prepare your documents and apply for your <span className="font-semibold text-blue-600">{getVisaTypeDisplay()}</span> with our streamlined process.
        </p>
      </div>

      {/* Document Checklist */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Document Checklist</h3>
          </div>
          
          <p className="text-gray-600 mb-8">
            Make sure you have all required documents ready before starting your application. Click each item when you have it prepared.
          </p>

          <div className="grid gap-6">
            {documents.map((document, index) => {
              const isChecked = checkedDocuments.includes(document.id);
              
              return (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`
                    border-2 rounded-lg p-6 transition-all duration-300 cursor-pointer
                    ${isChecked 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => handleDocumentCheck(document.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`
                      flex-shrink-0 p-3 rounded-lg transition-colors duration-300
                      ${isChecked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}
                    `}>
                      {document.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {document.name}
                        </h4>
                        {document.required && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Required
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {document.description}
                      </p>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">Important Tips:</h5>
                        <ul className="space-y-1">
                          {document.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-blue-700 flex items-start space-x-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {isChecked ? (
                        <CheckCircleIcon className="w-8 h-8 text-green-600" />
                      ) : (
                        <div className="w-8 h-8 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Application Button */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Ready to Apply?
            </h3>
            
            {allRequiredDocumentsChecked() ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircleIcon className="w-6 h-6" />
                  <span className="font-medium">All documents ready!</span>
                </div>
                
                <button
                  onClick={() => setShowDeepLinkInfo(true)}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Apply Now - Official Portal</span>
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </button>
                
                <p className="text-sm text-gray-600">
                  This will open the official Indian e-Visa portal with pre-filled information
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-amber-600">
                  <ExclamationTriangleIcon className="w-6 h-6" />
                  <span className="font-medium">
                    Please check all required documents above
                  </span>
                </div>
                
                <button
                  disabled
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                >
                  <span>Apply Now - Official Portal</span>
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deep Link Information Modal */}
      {showDeepLinkInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <InformationCircleIcon className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Opening Official Portal
              </h3>
              
              <p className="text-gray-600 mb-6">
                You'll be redirected to the official Indian e-Visa portal with:
              </p>
              
              <div className="text-left space-y-2 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Purpose: Tourism (pre-filled)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Visa Type: {getVisaTypeDisplay()} (pre-selected)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Category: e-Tourist Visa (pre-filled)</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeepLinkInfo(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    window.open(generateDeepLink(), '_blank');
                    setShowDeepLinkInfo(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between max-w-2xl mx-auto">
        <button
          onClick={onPrevious}
          className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>Extra Help & Resources</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default Step3GuidedApplication;