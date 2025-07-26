'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Shield, 
  TrendingUp, 
  Globe, 
  FileText, 
  Users, 
  Brain,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Leaf,
  Award
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Navigation from '../organisms/Navigation';
import AIAssistantCard from '../molecules/AIAssistantCard';
import SimpleAIAssistant from '../organisms/SimpleAIAssistant';
import { UserData } from '../../types';
import { cn } from '../../utils/cn';

interface ModernDashboardProps {
  user: UserData;
  onCreateDeclaration: () => void;
  onOpenWallet: () => void;
}

const ModernDashboard: React.FC<ModernDashboardProps> = ({
  user,
  onCreateDeclaration,
  onOpenWallet
}) => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState<'idle' | 'thinking' | 'responding'>('idle');
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('veritrace_user');
    router.push('/landing');
  };

  const handleAIInteraction = () => {
    setShowAIAssistant(true);
    setAiStatus('thinking');
    setTimeout(() => {
      setAiStatus('responding');
      setTimeout(() => {
        setAiStatus('idle');
      }, 2000);
    }, 1500);
  };

  // Mock form data for AI assistant - in a real app, this would come from actual form state
  const mockFormData = {
    productType: '',
    productName: '',
    hsCode: '',
    unit: '',
    productDescription: '',
    forestRiskAssessment: ''
  };

  const handleAutofill = (field: string, value: string) => {
    // In a real app, this would update the actual form data
    console.log(`Autofill ${field}: ${value}`);
  };

  const stats = [
    {
      icon: FileText,
      label: 'Total Declarations',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: CheckCircle,
      label: 'Approved Certificates',
      value: '22',
      change: '+8%',
      changeType: 'positive' as const,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Users,
      label: 'Active Suppliers',
      value: '18',
      change: '+5%',
      changeType: 'positive' as const,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: TrendingUp,
      label: 'Compliance Score',
      value: '98%',
      change: '+2%',
      changeType: 'positive' as const,
      color: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'declaration',
      title: 'Coffee Beans Declaration Approved',
      description: 'Brazilian Santos coffee beans - 2,500 kg',
      time: '2 hours ago',
      status: 'approved' as const,
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'certificate',
      title: 'EUDR Certificate Generated',
      description: 'Certificate ID: CERT-2025-001',
      time: '4 hours ago',
      status: 'completed' as const,
      icon: Shield
    },
    {
      id: 3,
      type: 'supplier',
      title: 'New Supplier Verified',
      description: 'Amazon Forest Co-op - Enhanced verification',
      time: '1 day ago',
      status: 'verified' as const,
      icon: Users
    },
    {
      id: 4,
      type: 'ai',
      title: 'AI Risk Assessment Complete',
      description: 'Low risk detected for cocoa supply chain',
      time: '2 days ago',
      status: 'completed' as const,
      icon: Brain
    }
  ];

  const quickActions = [
    {
      title: 'Create Declaration',
      description: 'Start a new EUDR declaration',
      icon: Plus,
      action: onCreateDeclaration,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'Open Wallet',
      description: 'Access your digital credentials',
      icon: Shield,
      action: onOpenWallet,
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      title: 'AI Assistant',
      description: 'Get help with compliance',
      icon: Brain,
      action: handleAIInteraction,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      textColor: 'text-white'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
      case 'verified':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'rejected':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      <Navigation
        isOpen={isNavOpen}
        onToggle={() => setIsNavOpen(!isNavOpen)}
        onLogout={handleLogout}
        user={user}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Welcome back, {user.companyName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                Your AI-powered compliance dashboard
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="success" className="hidden sm:flex">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Badge variant="neon" className="hidden sm:flex">
                <Brain className="h-3 w-3 mr-1" />
                AI Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} variant="glass" hover className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn('p-3 rounded-xl bg-white/50 dark:bg-gray-800/50', stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <Badge variant={stat.changeType === 'positive' ? 'success' : 'error'} size="sm">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & AI */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card variant="default" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      'w-full justify-start p-4 h-auto group',
                      action.color.includes('gradient') && 'border-0 ' + action.color
                    )}
                    onClick={action.action}
                  >
                    <div className={cn('p-2 rounded-lg mr-4', action.color)}>
                      <action.icon className={cn('h-5 w-5', action.textColor)} />
                    </div>
                    <div className="text-left">
                      <p className={cn(
                        'font-medium',
                        action.color.includes('gradient') 
                          ? 'text-white' 
                          : 'text-gray-900 dark:text-gray-100'
                      )}>
                        {action.title}
                      </p>
                      <p className={cn(
                        'text-sm',
                        action.color.includes('gradient') 
                          ? 'text-white/80' 
                          : 'text-gray-600 dark:text-gray-400'
                      )}>
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className={cn(
                      'h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform',
                      action.color.includes('gradient') 
                        ? 'text-white' 
                        : 'text-gray-600 dark:text-gray-400'
                    )} />
                  </Button>
                ))}
              </div>
            </Card>

            {/* AI Assistant */}
            <AIAssistantCard
              title="AI Compliance Assistant"
              description="Get intelligent insights and recommendations for your supply chain compliance"
              status={aiStatus}
              onInteract={handleAIInteraction}
              suggestions={['Risk Assessment', 'Document Review', 'Compliance Check']}
            />
          </div>

          {/* Right Column - Recent Activity */}
          <div className="lg:col-span-2">
            <Card variant="default" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Recent Activity
                </h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className={cn('p-2 rounded-lg bg-white dark:bg-gray-700', getStatusColor(activity.status))}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                    <Badge 
                      variant={activity.status === 'approved' || activity.status === 'completed' || activity.status === 'verified' ? 'success' : 'default'}
                      size="sm"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Additional Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="gradient" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <Badge variant="default" className="bg-white/20 text-white">
                Global
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Supply Chain Network
            </h3>
            <p className="text-sm text-white/80 mb-4">
              Track your global supply chain with real-time visibility
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Explore Network
            </Button>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <Badge variant="success">
                Active
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Sustainability Score
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Monitor your environmental impact metrics
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Report
            </Button>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge variant="info">
                Premium
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Certification Hub
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Manage all your certificates in one place
            </p>
            <Button variant="primary" size="sm" className="w-full">
              Access Hub
            </Button>
          </Card>
        </div>
      </main>

      {/* AI Assistant Popup */}
      <SimpleAIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        formData={mockFormData}
        onAutofill={handleAutofill}
        currentStep={1}
      />
    </div>
  );
};

export default ModernDashboard;
