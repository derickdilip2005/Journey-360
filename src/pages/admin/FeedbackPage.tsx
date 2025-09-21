import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Separator } from '../../components/ui/separator';
import { Star } from 'lucide-react';
import feedbackBg from '../../assets/Tourist/feedback/feedback.png';

interface FormData {
  name: string;
  email: string;
  overallRating: number;
  experienceCategory: string;
  feedbackText: string;
  improvementSuggestions: string;
}

const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    overallRating: 0,
    experienceCategory: '',
    feedbackText: '',
    improvementSuggestions: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      overallRating: rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Basic validation
    if (!formData.experienceCategory || !formData.feedbackText.trim()) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (formData.overallRating === 0) {
      setError('Please provide an overall rating.');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        overallRating: 0,
        experienceCategory: '',
        feedbackText: '',
        improvementSuggestions: '',
      });
    } catch (err) {
      setError('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">Thank You!</CardTitle>
            <CardDescription>
              Your feedback has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Submit Another Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gray-50 py-8 px-4"
      style={{
        backgroundImage: `url(${feedbackBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Feedback Form</CardTitle>
            <CardDescription className='text-center'>
              We'd love to hear your thoughts about our platform.
            </CardDescription>
          </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  {error}
                </Alert>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Overall Rating */}
               <div className="space-y-4">
                 <h3 className="text-lg font-medium">Overall Rating *</h3>
                 <div className="flex items-center gap-1">
                   {[1, 2, 3, 4, 5].map((rating) => (
                     <button
                       key={rating}
                       type="button"
                       onClick={() => handleRatingChange(rating)}
                       onMouseEnter={() => setHoveredRating(rating)}
                       onMouseLeave={() => setHoveredRating(0)}
                       className={`text-2xl transition-all duration-200 hover:scale-110 transform ${
                         rating <= (hoveredRating || formData.overallRating)
                           ? 'text-yellow-400' 
                           : 'text-gray-300'
                       }`}
                     >
                       ⭐
                     </button>
                   ))}
                   <span className="ml-3 text-sm text-gray-600">
                     {formData.overallRating > 0 ? `${formData.overallRating}/5 stars` : 'Click to rate'}
                   </span>
                 </div>
               </div>

              <Separator />

              {/* Experience Category */}
               <div className="space-y-2">
                 <Label htmlFor="experienceCategory">What did you use our platform for? *</Label>
                 <Select onValueChange={(value) => handleSelectChange('experienceCategory', value)}>
                   <SelectTrigger className="bg-white">
                     <SelectValue placeholder="Select your primary use" />
                   </SelectTrigger>
                   <SelectContent className="bg-white border shadow-lg">
                     <SelectItem value="explore">Exploring destinations</SelectItem>
                     <SelectItem value="visa">Visa assistance</SelectItem>
                     <SelectItem value="marketplace">Marketplace (guides, homestays)</SelectItem>
                     <SelectItem value="safety">Safety information</SelectItem>
                     <SelectItem value="general">General browsing</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                   </SelectContent>
                 </Select>
               </div>

              {/* Detailed Feedback */}
              <div className="space-y-2">
                <Label htmlFor="feedbackText">Detailed Feedback *</Label>
                <Textarea
                  id="feedbackText"
                  name="feedbackText"
                  value={formData.feedbackText}
                  onChange={handleChange}
                  placeholder="Please share your thoughts and experiences..."
                  rows={5}
                />
              </div>

              {/* Improvement Suggestions */}
              <div className="space-y-2">
                <Label htmlFor="improvementSuggestions">Suggestions for Improvement (Optional)</Label>
                <Textarea
                  id="improvementSuggestions"
                  name="improvementSuggestions"
                  value={formData.improvementSuggestions}
                  onChange={handleChange}
                  placeholder="What could we do better? Any features you'd like to see?"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;