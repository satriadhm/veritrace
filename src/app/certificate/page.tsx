'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Shield, ArrowLeft, FileText } from 'lucide-react';
import ModernCertificate from '../../components/organisms/ModernCertificate';
import Button from '../../components/atoms/Button';
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
    
    if (userData) {
      setUser(JSON.parse(userData));
      // Only set declaration data if it exists, but don't require it
      if (currentDeclaration) {
        setDeclarationData(JSON.parse(currentDeclaration));
      }
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

  if (!user) {
    return null;
  }

  // If no current declaration, show a message to create one first
  if (!declarationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 flex items-center justify-center">
        <div className="max-w-md text-center">
          <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            No Active Declaration
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to create a declaration first to generate and view certificates.
          </p>
          <div className="flex space-x-4 justify-center">
            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <Button
              onClick={() => router.push('/declaration')}
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Create Declaration</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ModernCertificate 
      onBack={handleBack}
      declarationData={declarationData}
    />
  );
}
