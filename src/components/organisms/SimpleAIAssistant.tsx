'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Wand2, 
  X, 
  Send
} from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../atoms/Card';
import { 
  getProductSuggestions, 
  getDescriptionSuggestions,
  getCertificationSuggestions,
  getUnitSuggestions,
  getRiskAssessmentSuggestions
} from '../../data/productMappings';

interface SimpleAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Record<string, string | number | string[]>;
  onAutofill: (field: string, value: string) => void;
  currentStep: number;
}

const SimpleAIAssistant: React.FC<SimpleAIAssistantProps> = ({
  isOpen,
  onClose,
  formData,
  onAutofill,
  currentStep
}) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) return;
    
    setIsThinking(true);
    setResponse('');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiResponse = generateResponse(question, formData, currentStep);
    setResponse(aiResponse);
    setIsThinking(false);
  };

  const generateResponse = (q: string, data: Record<string, string | number | string[]>, step: number): string => {
    const query = q.toLowerCase();
    
    if (query.includes('hs code') || query.includes('harmonized')) {
      if (data.productType && typeof data.productType === 'string') {
        const suggestions = getProductSuggestions(data.productType);
        if (suggestions.length > 0) {
          return `For ${data.productType} products, common HS codes include: ${suggestions.map(s => s.hsCode).join(', ')}. The most common is ${suggestions[0].hsCode} for ${suggestions[0].productName}.`;
        }
      }
      return 'HS codes classify products for international trade. They help determine which EUDR regulations apply to your product.';
    }
    
    if (query.includes('certification') || query.includes('certificate')) {
      if (data.productType && typeof data.productType === 'string') {
        const certs = getCertificationSuggestions(data.productType);
        return `For ${data.productType} products, recommended certifications include: ${certs.slice(0, 4).join(', ')}. These demonstrate sustainable sourcing practices.`;
      }
      return 'Certifications help demonstrate compliance with sustainability standards and reduce supply chain risks.';
    }
    
    if (query.includes('risk') || query.includes('deforestation')) {
      if (data.productType && typeof data.productType === 'string') {
        return getRiskAssessmentSuggestions(data.productType) || 'Conduct thorough due diligence on your supply chain to identify and mitigate deforestation risks.';
      }
      return 'EUDR requires companies to ensure their products are not linked to deforestation after December 31, 2020.';
    }
    
    // Step-specific responses
    switch (step) {
      case 1:
        return 'For product information, provide accurate product names, HS codes, and quantities. I can help suggest appropriate HS codes based on your product type.';
      case 2:
        return 'Supplier information should include complete business details and relevant certifications. I can suggest appropriate certifications for your product type.';
      case 3:
        return 'Geolocation data must include precise GPS coordinates of production areas. This is crucial for deforestation risk assessment.';
      case 4:
        return 'Upload supporting documents like certificates, invoices, and traceability records to strengthen your declaration.';
      default:
        return "I'm here to help with your EUDR declaration. Ask about product codes, certifications, risk assessment, or any compliance questions.";
    }
  };

  const handleAutofillSuggestion = (type: string) => {
    const productType = formData.productType as string;
    
    switch (type) {
      case 'hsCode':
        if (productType) {
          const suggestions = getProductSuggestions(productType);
          if (suggestions.length > 0) {
            onAutofill('hsCode', suggestions[0].hsCode);
          }
        }
        break;
      case 'productName':
        if (productType) {
          const suggestions = getProductSuggestions(productType);
          if (suggestions.length > 0) {
            onAutofill('productName', suggestions[0].productName);
          }
        }
        break;
      case 'description':
        if (productType && formData.productName) {
          const descriptions = getDescriptionSuggestions(productType, formData.productName as string);
          if (descriptions.length > 0) {
            onAutofill('productDescription', descriptions[0]);
          }
        }
        break;
      case 'unit':
        if (productType) {
          const units = getUnitSuggestions(productType);
          if (units.length > 0) {
            onAutofill('unit', units[0]);
          }
        }
        break;
      case 'riskAssessment':
        if (productType) {
          const assessment = getRiskAssessmentSuggestions(productType);
          if (assessment) {
            onAutofill('forestRiskAssessment', assessment);
          }
        }
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Form Assistant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smart autofill and compliance guidance
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              Quick Autofill
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {currentStep === 1 && (
                <>
                  {formData.productType && !formData.hsCode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAutofillSuggestion('hsCode')}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-3 w-3" />
                      Suggest HS Code
                    </Button>
                  )}
                  {formData.productType && !formData.productName && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAutofillSuggestion('productName')}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-3 w-3" />
                      Suggest Product Name
                    </Button>
                  )}
                  {formData.productType && !formData.unit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAutofillSuggestion('unit')}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-3 w-3" />
                      Suggest Unit
                    </Button>
                  )}
                  {formData.productType && formData.productName && !formData.productDescription && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAutofillSuggestion('description')}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-3 w-3" />
                      Suggest Description
                    </Button>
                  )}
                </>
              )}
              
              {currentStep === 3 && formData.productType && !formData.forestRiskAssessment && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAutofillSuggestion('riskAssessment')}
                  className="flex items-center gap-2 col-span-2"
                >
                  <Sparkles className="h-3 w-3" />
                  Generate Risk Assessment
                </Button>
              )}
            </div>
          </div>

          {/* AI Chat */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Ask AI Assistant
            </h4>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about EUDR compliance..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                className="flex-1"
              />
              <Button
                onClick={handleAskAI}
                disabled={isThinking || !question.trim()}
                size="md"
              >
                {isThinking ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {response && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    {response}
                  </p>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Quick questions:</p>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuestion("What HS code should I use for coffee?")}
                  className="text-left justify-start w-full text-xs"
                >
                  &bull; What HS code should I use for coffee?
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuestion("What certifications are recommended for palm oil?")}
                  className="text-left justify-start w-full text-xs"
                >
                  &bull; What certifications are recommended for palm oil?
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuestion("How do I assess deforestation risk?")}
                  className="text-left justify-start w-full text-xs"
                >
                  &bull; How do I assess deforestation risk?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SimpleAIAssistant;
