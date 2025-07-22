'use client';

import React, { useState } from 'react';
import { Sparkles, Wand2, Bot } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { cn } from '../../utils/cn';
import { 
  getProductSuggestions, 
  getHSCodeSuggestions, 
  getDescriptionSuggestions,
  getUnitSuggestions,
  getRiskAssessmentSuggestions
} from '../../data/productMappings';

interface AIEnhancedInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fieldType: 'productName' | 'hsCode' | 'productDescription' | 'unit' | 'forestRiskAssessment' | 'default';
  productType?: string;
  productName?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showAISuggestions?: boolean;
}

const AIEnhancedInput: React.FC<AIEnhancedInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  fieldType,
  productType,
  productName,
  className,
  leftIcon,
  rightIcon,
  showAISuggestions = true,
  ...props
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = () => {
    if (!showAISuggestions || !productType) return;

    let newSuggestions: string[] = [];

    switch (fieldType) {
      case 'productName':
        const productSuggestions = getProductSuggestions(productType);
        newSuggestions = productSuggestions.map(p => p.productName);
        break;
      
      case 'hsCode':
        if (productName) {
          newSuggestions = getHSCodeSuggestions(productName);
        } else {
          const allProducts = getProductSuggestions(productType);
          newSuggestions = allProducts.map(p => p.hsCode);
        }
        break;
      
      case 'productDescription':
        if (productName) {
          newSuggestions = getDescriptionSuggestions(productType, productName);
        }
        break;
      
      case 'unit':
        newSuggestions = getUnitSuggestions(productType);
        break;
      
      case 'forestRiskAssessment':
        const riskAssessment = getRiskAssessmentSuggestions(productType);
        if (riskAssessment) {
          newSuggestions = [riskAssessment];
        }
        break;
      
      default:
        newSuggestions = [];
    }

    setSuggestions(newSuggestions.slice(0, 3)); // Limit to top 3 suggestions
    setShowSuggestions(newSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Create a synthetic event to match the expected onChange signature
    const syntheticEvent = {
      target: { value: suggestion },
      currentTarget: { value: suggestion }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
    setShowSuggestions(false);
  };

  const handleAIAssist = () => {
    generateSuggestions();
  };

  const shouldShowAIButton = showAISuggestions && productType && 
    ['productName', 'hsCode', 'productDescription', 'unit', 'forestRiskAssessment'].includes(fieldType);

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          leftIcon={leftIcon}
          rightIcon={
            shouldShowAIButton ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAIAssist}
                className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md"
                title="Get AI suggestions"
              >
                <Sparkles className="h-4 w-4 text-blue-500" />
              </Button>
            ) : rightIcon
          }
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
                "w-full text-left p-2 rounded-md text-sm",
                "hover:bg-blue-50 dark:hover:bg-blue-900/20",
                "border border-transparent hover:border-blue-200 dark:hover:border-blue-700",
                "transition-all duration-150"
              )}
            >
              <div className="flex items-center gap-2">
                <Wand2 className="h-3 w-3 text-blue-500 flex-shrink-0" />
                <span className="text-gray-900 dark:text-gray-100 truncate">
                  {fieldType === 'forestRiskAssessment' 
                    ? suggestion.substring(0, 100) + (suggestion.length > 100 ? '...' : '')
                    : suggestion
                  }
                </span>
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

export default AIEnhancedInput;
