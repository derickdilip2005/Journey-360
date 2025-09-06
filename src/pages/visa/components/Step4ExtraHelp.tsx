import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface Step4Props {
  selectedVisa: string;
  onPrevious: () => void;
  onComplete: () => void;
}

interface VisaFee {
  country: string;
  oneMonth: number;
  oneYear: number;
  fiveYear: number;
  currency: string;
}

interface Embassy {
  country: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  workingHours: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'extension' | 'overstay' | 'documents';
}

const Step4ExtraHelp: React.FC<Step4Props> = ({
  selectedVisa,
  onPrevious,
  onComplete
}) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fees' | 'embassy' | 'faq'>('fees');

  const visaFees: VisaFee[] = [
    { country: 'US', oneMonth: 25, oneYear: 40, fiveYear: 80, currency: 'USD' },
    { country: 'UK', oneMonth: 25, oneYear: 40, fiveYear: 80, currency: 'USD' },
    { country: 'Canada', oneMonth: 25, oneYear: 40, fiveYear: 80, currency: 'USD' },
    { country: 'Australia', oneMonth: 25, oneYear: 40, fiveYear: 80, currency: 'USD' },
    { country: 'Germany', oneMonth: 82, oneYear: 82, fiveYear: 82, currency: 'USD' },
    { country: 'France', oneMonth: 82, oneYear: 82, fiveYear: 82, currency: 'USD' },
    { country: 'Japan', oneMonth: 25, oneYear: 40, fiveYear: 80, currency: 'USD' },
    { country: 'Singapore', oneMonth: 36, oneYear: 56, fiveYear: 105, currency: 'USD' }
  ];

  const embassies: Embassy[] = [
    {
      country: 'US',
      name: 'Embassy of India, Washington D.C.',
      address: '2107 Massachusetts Ave NW, Washington, DC 20008',
      phone: '+1-202-939-7000',
      email: 'cons.washington@mea.gov.in',
      website: 'https://www.indianembassyusa.gov.in',
      workingHours: 'Mon-Fri: 9:30 AM - 6:00 PM'
    },
    {
      country: 'UK',
      name: 'High Commission of India, London',
      address: 'India House, Aldwych, London WC2B 4NA',
      phone: '+44-20-7836-8484',
      email: 'cons.london@mea.gov.in',
      website: 'https://www.hcilondon.gov.in',
      workingHours: 'Mon-Fri: 9:30 AM - 5:30 PM'
    },
    {
      country: 'Canada',
      name: 'High Commission of India, Ottawa',
      address: '10 Springfield Rd, Ottawa, ON K1M 1C9',
      phone: '+1-613-744-3751',
      email: 'hci.ottawa@mea.gov.in',
      website: 'https://www.hciottawa.gov.in',
      workingHours: 'Mon-Fri: 9:00 AM - 5:30 PM'
    },
    {
      country: 'Australia',
      name: 'High Commission of India, Canberra',
      address: '3-5 Moonah Pl, Yarralumla ACT 2600',
      phone: '+61-2-6273-3999',
      email: 'hci.canberra@mea.gov.in',
      website: 'https://www.hcicanberra.gov.in',
      workingHours: 'Mon-Fri: 9:00 AM - 5:30 PM'
    }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Can I extend my e-Tourist Visa while in India?',
      answer: 'No, e-Tourist Visas cannot be extended, converted, or renewed while in India. You must exit the country and apply for a new visa if you wish to return.',
      category: 'extension'
    },
    {
      id: '2',
      question: 'What happens if I overstay my visa?',
      answer: 'Overstaying your visa can result in fines, deportation, and future visa restrictions. Contact the nearest Foreigners Regional Registration Office (FRRO) immediately if you cannot leave before your visa expires.',
      category: 'overstay'
    },
    {
      id: '3',
      question: 'How long does it take to process an e-Tourist Visa?',
      answer: 'E-Tourist Visas are typically processed within 72 hours (3 business days). However, it\'s recommended to apply at least 4-7 days before your travel date to account for any delays.',
      category: 'general'
    },
    {
      id: '4',
      question: 'Can I enter India through any port with an e-Tourist Visa?',
      answer: 'No, e-Tourist Visas are valid for entry through designated airports and seaports only. Check the official list of authorized entry points before traveling.',
      category: 'general'
    },
    {
      id: '5',
      question: 'What if my passport expires while I\'m in India?',
      answer: 'Your passport must be valid for at least 6 months from your date of arrival. If it expires while you\'re in India, contact your embassy immediately for passport renewal and visa transfer procedures.',
      category: 'documents'
    },
    {
      id: '6',
      question: 'Can I work with an e-Tourist Visa?',
      answer: 'No, e-Tourist Visas are strictly for tourism purposes. Any form of employment, business activities, or paid work is prohibited and can result in deportation.',
      category: 'general'
    },
    {
      id: '7',
      question: 'What documents do I need to carry while traveling in India?',
      answer: 'Always carry your original passport with the e-Tourist Visa, a printed copy of your ETA (Electronic Travel Authorization), and proof of accommodation. Keep digital copies as backup.',
      category: 'documents'
    },
    {
      id: '8',
      question: 'Can I apply for a new e-Tourist Visa immediately after my current one expires?',
      answer: 'There are restrictions on consecutive e-Tourist Visas. Generally, you must wait 2 months between e-Tourist Visa applications, except for certain nationalities with special agreements.',
      category: 'extension'
    }
  ];

  const getCurrentFee = () => {
    const countryFees = visaFees.find(fee => fee.country === selectedCountry);
    if (!countryFees) return null;

    switch (selectedVisa) {
      case '1-month': return countryFees.oneMonth;
      case '1-year': return countryFees.oneYear;
      case '5-year': return countryFees.fiveYear;
      default: return countryFees.oneMonth;
    }
  };

  const getCurrentEmbassy = () => {
    return embassies.find(embassy => embassy.country === selectedCountry);
  };

  const getVisaTypeDisplay = () => {
    switch (selectedVisa) {
      case '1-month': return 'One Month e-Tourist Visa';
      case '1-year': return 'One Year e-Tourist Visa';
      case '5-year': return 'Five Year e-Tourist Visa';
      default: return 'e-Tourist Visa';
    }
  };

  const filteredFAQs = (category?: string) => {
    return category ? faqs.filter(faq => faq.category === category) : faqs;
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
          Step 4: Extra Help & Resources
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get additional support with visa fees, embassy contacts, and answers to frequently asked questions.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'fees', label: 'Visa Fee Estimator', icon: CurrencyDollarIcon },
            { id: 'embassy', label: 'Embassy Contacts', icon: PhoneIcon },
            { id: 'faq', label: 'FAQs', icon: QuestionMarkCircleIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'fees' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Visa Fee Estimator</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Country/Nationality
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {visaFees.map((fee) => (
                    <option key={fee.country} value={fee.country}>
                      {fee.country === 'US' ? 'United States' :
                       fee.country === 'UK' ? 'United Kingdom' :
                       fee.country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Estimated Fee for {getVisaTypeDisplay()}
                </h4>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${getCurrentFee()}
                  </div>
                  <p className="text-gray-600">USD (approximate)</p>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1 Month Visa:</span>
                    <span className="font-medium">${visaFees.find(f => f.country === selectedCountry)?.oneMonth}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1 Year Visa:</span>
                    <span className="font-medium">${visaFees.find(f => f.country === selectedCountry)?.oneYear}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">5 Year Visa:</span>
                    <span className="font-medium">${visaFees.find(f => f.country === selectedCountry)?.fiveYear}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Fees are approximate and may vary. Additional service charges may apply. 
                    Check the official portal for exact fees at the time of application.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'embassy' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <PhoneIcon className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Embassy & Consulate Contacts</h3>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {embassies.map((embassy) => (
                  <option key={embassy.country} value={embassy.country}>
                    {embassy.country === 'US' ? 'United States' :
                     embassy.country === 'UK' ? 'United Kingdom' :
                     embassy.country}
                  </option>
                ))}
              </select>
            </div>

            {getCurrentEmbassy() && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {getCurrentEmbassy()!.name}
                </h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{getCurrentEmbassy()!.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <PhoneIcon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a 
                          href={`tel:${getCurrentEmbassy()!.phone}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {getCurrentEmbassy()!.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a 
                          href={`mailto:${getCurrentEmbassy()!.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {getCurrentEmbassy()!.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <GlobeAltIcon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <a 
                          href={getCurrentEmbassy()!.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Visit Official Website
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <InformationCircleIcon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Working Hours</p>
                        <p className="text-gray-600">{getCurrentEmbassy()!.workingHours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <QuestionMarkCircleIcon className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span className="font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4"
                    >
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Completion Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            You're All Set!
          </h3>
          
          <p className="text-gray-600 mb-6">
            You now have all the information and resources needed for your Indian e-Tourist Visa application. 
            Good luck with your journey to India!
          </p>
          
          <button
            onClick={onComplete}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <CheckCircleIcon className="w-5 h-5" />
            <span>Complete VISA Assist</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-start max-w-2xl mx-auto">
        <button
          onClick={onPrevious}
          className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Step4ExtraHelp;