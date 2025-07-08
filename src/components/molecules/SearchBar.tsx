'use client';

import React from 'react';
import { Search } from 'lucide-react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  onSubmit,
  className
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          leftIcon={<Search className="h-4 w-4 text-gray-400" />}
          className="flex-1"
        />
        {onSubmit && (
          <Button type="submit" variant="primary">
            Search
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
