'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthForm from '../../components/organisms/AuthForm';
import { UserData } from '../../types';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const userData = localStorage.getItem('veritrace_user');
    if (userData) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = (userData: UserData) => {
    // Store user data in localStorage
    localStorage.setItem('veritrace_user', JSON.stringify(userData));
  };

  return <AuthForm onLogin={handleLogin} />;
}
