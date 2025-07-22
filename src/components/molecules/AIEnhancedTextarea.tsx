'use client';

import React, { useState } from 'react';
import { Sparkles, Wand2, Bot } from 'lucide-react';
import Button from '../atoms/Button';
import { cn } from '../../utils/cn';
import { 
  getDescriptionSuggestions,
  getRiskAssessmentSuggestions
} from '../../data/productMappings';

interface AIEnhancedTextareaProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  fieldType: 'productDescription' | 'forestRiskAssessment' | 'riskMitigation' | 'additionalNotes' | 'supplierAddress';
  productType?: string;
  productName?: string;
  className?: string;
  rows?: number;
  showAISuggestions?: boolean;
}

const AIEnhancedTextarea: React.FC<AIEnhancedTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  fieldType,
  productType,
  productName,
  className,
  rows = 4,
  showAISuggestions = true,
  ...props
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = () => {
    if (!showAISuggestions) return;

    let newSuggestions: string[] = [];

    switch (fieldType) {
      case 'productDescription':
        if (productType && productName) {
          newSuggestions = getDescriptionSuggestions(productType, productName);
        }
        break;
      
      case 'forestRiskAssessment':
        if (productType) {
          const riskAssessment = getRiskAssessmentSuggestions(productType);
          if (riskAssessment) {
            newSuggestions = [riskAssessment];
          }
        }
        break;
      
      case 'riskMitigation':
        if (productType) {
          newSuggestions = [
            `Based on the ${productType} supply chain analysis, we implement the following risk mitigation measures:\n\n1. Supplier due diligence and verification\n2. Regular on-site inspections and monitoring\n3. Satellite imagery monitoring for deforestation detection\n4. Certification requirements for all suppliers\n5. Traceability system implementation\n6. Training programs for farmers and suppliers\n7. Community engagement and local partnerships`,
            `Risk mitigation strategy for ${productType} sourcing:\n\n• Establish direct relationships with certified suppliers\n• Implement GPS tracking and geolocation verification\n• Conduct annual third-party audits\n• Maintain comprehensive documentation and records\n• Monitor environmental compliance regularly\n• Support sustainable farming practices\n• Engage with local communities and stakeholders`
          ];
        }
        break;

      case 'supplierAddress':
        newSuggestions = [
          'Please provide the complete legal business address including:\n- Company name\n- Street address\n- City, State/Province\n- Postal/ZIP code\n- Country'
        ];
        break;
      
      default:
        newSuggestions = [];
    }

    setSuggestions(newSuggestions.slice(0, 2)); // Limit to top 2 suggestions for textareas
    setShowSuggestions(newSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Create a synthetic event to match the expected onChange signature
    const syntheticEvent = {
      target: { value: suggestion },
      currentTarget: { value: suggestion }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    
    onChange(syntheticEvent);
    setShowSuggestions(false);
  };

  const handleAIAssist = () => {
    generateSuggestions();
  };

  const shouldShowAIButton = showAISuggestions && 
    ['productDescription', 'forestRiskAssessment', 'riskMitigation', 'supplierAddress'].includes(fieldType);

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {shouldShowAIButton && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAIAssist}
                className="ml-2 p-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md inline-flex items-center gap-1"
                title="Get AI suggestions"
              >
                <Sparkles className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400">AI</span>
              </Button>
            )}
          </label>
        )}
        
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-vertical',
            className
          )}
          {...props}
        />
      </div>

      {/* AI Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg shadow-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <Bot className="h-3 w-3" />
            AI Suggestions
          </div>
          
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "w-full text-left p-3 rounded-md text-sm",
                "hover:bg-blue-50 dark:hover:bg-blue-900/20",
                "border border-transparent hover:border-blue-200 dark:hover:border-blue-700",
                "transition-all duration-150"
              )}
            >
              <div className="flex items-start gap-2">
                <Wand2 className="h-3 w-3 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-900 dark:text-gray-100">
                  {suggestion.length > 150 ? (
                    <>
                      <div className="whitespace-pre-line">
                        {suggestion.substring(0, 150)}...
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Click to use full suggestion
                      </div>
                    </>
                  ) : (
                    <div className="whitespace-pre-line">{suggestion}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
          
          <button
            onClick={() => setShowSuggestions(false)}
            className="w-full text-center py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Hide suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default AIEnhancedTextarea;
