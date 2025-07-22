'use client';

import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Bot, Sparkles } from 'lucide-react';
import AIPopup from '../molecules/AIPopup';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  aiSuggestions?: string[];
  aiTips?: string[];
  showAI?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  aiSuggestions = [],
  aiTips = [],
  showAI = false,
  ...props
}) => {
  const [showAIPopup, setShowAIPopup] = useState(false);

  const handleAIClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAIPopup(true);
  };

  const handleSuggestionApply = (value: string) => {
    if (props.onChange) {
      const syntheticEvent = {
        target: { value, name: props.name },
        currentTarget: { value, name: props.name }
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(syntheticEvent);
    }
  };

  const hasAIContent = showAI && (aiSuggestions.length > 0 || aiTips.length > 0);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {hasAIContent && (
            <button
              type="button"
              onClick={handleAIClick}
              className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              title="Get AI assistance"
            >
              <Bot className="h-3 w-3" />
              AI
            </button>
          )}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            'w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400',
            leftIcon && 'pl-10',
            (rightIcon || hasAIContent) && 'pr-10',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {(rightIcon || hasAIContent) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {hasAIContent && !rightIcon && (
              <button
                type="button"
                onClick={handleAIClick}
                className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors"
                title="Get AI assistance"
              >
                <Sparkles className="h-4 w-4 text-blue-500" />
              </button>
            )}
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* AI Popup */}
      <AIPopup
        isVisible={showAIPopup}
        onClose={() => setShowAIPopup(false)}
        fieldName={label || props.name || 'Field'}
        onSuggestionApply={handleSuggestionApply}
        suggestions={aiSuggestions}
        tips={aiTips}
      />
    </div>
  );
};

export default Input;
