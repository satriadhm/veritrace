'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModernDashboard from '../../components/organisms/ModernDashboard';
import { UserData } from '../../types';

export default function DashboardPage() {
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

  const handleCreateDeclaration = () => {
    router.push('/declaration');
  };

  const handleOpenWallet = () => {
    router.push('/wallet');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ModernDashboard 
      user={user}
      onCreateDeclaration={handleCreateDeclaration}
      onOpenWallet={handleOpenWallet}
    />
  );
}
