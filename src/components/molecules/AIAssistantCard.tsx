'use client';

import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';

interface AIAssistantCardProps {
  title: string;
  description: string;
  status: 'idle' | 'thinking' | 'responding';
  onInteract: () => void;
  suggestions?: string[];
}

const AIAssistantCard: React.FC<AIAssistantCardProps> = ({
  title,
  description,
  status,
  onInteract,
  suggestions = []
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'thinking':
        return <Brain className="h-4 w-4 animate-pulse" />;
      case 'responding':
        return <Zap className="h-4 w-4 animate-bounce" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'thinking':
        return 'warning';
      case 'responding':
        return 'success';
      default:
        return 'info';
    }
  };

  return (
    <Card variant="gradient" hover className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <Badge variant={getStatusColor()} className="ml-4">
          {getStatusIcon()}
          <span className="ml-1 capitalize">{status}</span>
        </Badge>
      </div>

      {suggestions.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Suggestions:
          </p>
          <div className="flex flex-wrap gap-1">
            {suggestions.map((suggestion, index) => (
              <Badge key={index} variant="default" size="sm">
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button
        variant="gradient"
        size="sm"
        onClick={onInteract}
        disabled={status === 'thinking'}
        className="w-full"
      >
        {status === 'thinking' ? 'AI is thinking...' : 'Ask AI Assistant'}
      </Button>
    </Card>
  );
};

export default AIAssistantCard;
