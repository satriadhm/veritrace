'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModernCertificate from '../../components/organisms/ModernCertificate';
import { DeclarationData, UserData } from '../../types';

export default function CertificatePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [declarationData, setDeclarationData] = useState<DeclarationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('veritrace_user');
    const currentDeclaration = localStorage.getItem('veritrace_current_declaration');
    
    if (userData && currentDeclaration) {
      setUser(JSON.parse(userData));
      setDeclarationData(JSON.parse(currentDeclaration));
      setIsLoading(false);
    } else {
      router.push('/auth');
    }
  }, [router]);

  const handleBack = () => {
    // Clear current declaration and go back to dashboard
    localStorage.removeItem('veritrace_current_declaration');
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading certificate...</span>
        </div>
      </div>
    );
  }

  if (!user || !declarationData) {
    return null;
  }

  return (
    <ModernCertificate 
      onBack={handleBack}
      declarationData={declarationData}
    />
  );
}
