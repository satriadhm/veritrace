'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Globe,
  Zap,
  CheckCircle,
  Brain,
  Leaf,
  Users
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import ThemeToggle from '../molecules/ThemeToggle';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'RAG-Enhanced AI Compliance',
      description: 'Retrieval-Augmented Generation AI provides real-time EUDR guidance using the latest regulatory knowledge base.',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Brain,
      title: 'Intelligent Knowledge Retrieval',
      description: 'Advanced RAG technology instantly accesses comprehensive compliance databases for accurate recommendations.',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Globe,
      title: 'Immutable Blockchain Records',
      description: 'Decentralized blockchain infrastructure ensures tamper-proof compliance verification and audit trails.',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Zap,
      title: 'Smart Contract Automation',
      description: 'Automated blockchain smart contracts streamline verification processes and ensure instant compliance validation.',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: Leaf,
      title: 'Cryptographic Supply Chain',
      description: 'End-to-end cryptographic verification powered by blockchain technology for complete supply chain transparency.',
      color: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      icon: Users,
      title: 'Decentralized Trust Network',
      description: 'Blockchain-based trust network eliminates intermediaries while ensuring verifiable stakeholder collaboration.',
      color: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  const stats = [
    { number: 'RAG', label: 'AI Knowledge Engine', icon: Brain },
    { number: '100%', label: 'Blockchain Secured', icon: CheckCircle },
    { number: 'Global', label: 'Supply Chain Coverage', icon: Globe },
    { number: 'Real-time', label: 'Smart Verification', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="relative">
        <nav className="flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VeriTrace
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="gradient" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="neon" className="mb-6">
            <Sparkles className="h-3 w-3 mr-1" />
            RAG AI + Blockchain Technology
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-gray-100 dark:via-blue-400 dark:to-purple-400">
            The Future of
            <br />
            Compliance
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Harness the power of Retrieval-Augmented Generation (RAG) AI and immutable blockchain technology 
            to revolutionize EUDR compliance with intelligent, decentralized verification systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button variant="gradient" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} variant="glass" className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">
              <Brain className="h-3 w-3 mr-1" />
              RAG AI + Blockchain
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Next-Generation Technology Stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform leverages Retrieval-Augmented Generation AI and decentralized blockchain infrastructure 
              to deliver unprecedented compliance intelligence and verification capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="default" hover className="p-8 group">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 w-fit">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the future of compliance with our revolutionary RAG AI and blockchain-powered 
            platform designed for unmatched precision and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button variant="secondary" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">VeriTrace</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 VeriTrace. All rights reserved. Built with AI for the future.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
