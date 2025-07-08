'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModernDeclarationForm from '../../components/organisms/ModernDeclarationForm';
import { DeclarationData, UserData } from '../../types';

export default function DeclarationPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('veritrace_user');
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoading(false);
    } else {
      router.push('/auth');
    }
  }, [router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleSubmit = (declarationData: DeclarationData) => {
    // Store declaration data for certificate generation
    localStorage.setItem('veritrace_current_declaration', JSON.stringify(declarationData));
    router.push('/certificate');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ModernDeclarationForm 
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}
