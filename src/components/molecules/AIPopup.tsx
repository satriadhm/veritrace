'use client';

import React from 'react';
import { Bot, X, Lightbulb, Sparkles } from 'lucide-react';
import Button from '../atoms/Button';

interface AIPopupProps {
  isVisible: boolean;
  onClose: () => void;
  fieldName: string;
  onSuggestionApply: (value: string) => void;
  suggestions: string[];
  tips: string[];
}

const AIPopup: React.FC<AIPopupProps> = ({
  isVisible,
  onClose,
  fieldName,
  onSuggestionApply,
  suggestions,
  tips
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              AI Assistant for {fieldName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-2">
                <Sparkles className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  Smart Suggestions
                </span>
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSuggestionApply(suggestion);
                      onClose();
                    }}
                    className="w-full text-left p-2 text-xs bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md border border-blue-200 dark:border-blue-800 transition-colors"
                  >
                    {suggestion.length > 80 ? `${suggestion.substring(0, 80)}...` : suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {tips.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-2">
                <Lightbulb className="h-3 w-3 text-amber-500" />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  Helpful Tips
                </span>
              </div>
              <div className="space-y-1">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-2 text-xs bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100"
                  >
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {suggestions.length === 0 && tips.length === 0 && (
            <div className="text-center py-4">
              <Bot className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No suggestions available for this field at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIPopup;
