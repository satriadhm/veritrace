'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Building, 
  Shield, 
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  Wallet,
  Key
} from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import ThemeToggle from '../molecules/ThemeToggle';
import { UserData } from '../../types';

interface AuthFormProps {
  onLogin: (userData: UserData) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock authentication
    const userData: UserData = {
      email: formData.email,
      companyName: formData.companyName || 'Demo Company',
      did: `did:web:${Date.now()}.veritrace.eu`,
      publicKey: `0x${Math.random().toString(16).substring(2)}`,
      isVerified: true,
      authMethod: 'email'
    };

    onLogin(userData);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const authMethods = [
    { name: 'MetaMask', icon: Wallet, color: 'text-orange-500' },
    { name: 'Hardware Wallet', icon: Shield, color: 'text-green-500' },
    { name: 'DID Wallet', icon: Key, color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            VeriTrace
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Welcome back to the future of compliance' : 'Join the next generation of supply chain verification'}
          </p>
        </div>

        {/* Auth Form */}
        <Card variant="glass" className="p-8 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isLogin
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !isLogin
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Company Name"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your company name"
                leftIcon={<Building className="h-4 w-4 text-gray-400" />}
                required
              />
            )}

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
              required
            />

            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              required
            />

            {!isLogin && (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                required
              />
            )}

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full group"
              isLoading={isLoading}
            >
              {isLoading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Forgot your password?
              </button>
            </div>
          )}
        </Card>

        {/* Web3 Authentication */}
        <Card variant="default" className="p-6">
          <div className="text-center mb-4">
            <Badge variant="neon" className="mb-2">
              <Shield className="h-3 w-3 mr-1" />
              Web3 Authentication
            </Badge>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect with your Web3 wallet for enhanced security
            </p>
          </div>

          <div className="space-y-2">
            {authMethods.map((method, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start group"
                onClick={() => {
                  // Mock Web3 authentication
                  const userData: UserData = {
                    email: `${method.name.toLowerCase()}@veritrace.eu`,
                    companyName: 'Web3 Company',
                    did: `did:web:${Date.now()}.veritrace.eu`,
                    publicKey: `0x${Math.random().toString(16).substring(2)}`,
                    isVerified: true,
                    authMethod: method.name.toLowerCase()
                  };
                  onLogin(userData);
                  router.push('/dashboard');
                }}
              >
                <method.icon className={`h-4 w-4 mr-3 ${method.color}`} />
                Connect with {method.name}
                <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
