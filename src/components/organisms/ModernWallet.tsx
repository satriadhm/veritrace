'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Download, 
  Share, 
  Eye, 
  QrCode, 
  FileText, 
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Search,
  Star,
  ExternalLink
} from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import Navigation from '../organisms/Navigation';
import { WalletProps, VerifiableCredential } from '../../types';

const ModernWallet: React.FC<WalletProps> = ({ onBack, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCredential, setSelectedCredential] = useState<VerifiableCredential | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Mock credentials data
  const credentials: VerifiableCredential[] = [
    {
      id: 'VC-2025-001',
      type: 'EUDR_Certificate',
      title: 'EUDR Compliance Certificate',
      issuer: 'VeriTrace Platform',
      issuedDate: '2025-01-15',
      expiryDate: '2026-01-15',
      status: 'valid',
      product: 'Arabica Coffee Beans',
      supplier: 'Amazon Forest Co-op',
      blockchainHash: '0x1234...abcd',
      euReference: 'EU-DDS-2025-001234'
    },
    {
      id: 'VC-2025-002',
      type: 'DID_Identity',
      title: 'Digital Identity Credential',
      issuer: 'VeriTrace Identity Provider',
      issuedDate: '2025-01-01',
      expiryDate: '2026-01-01',
      status: 'valid',
      companyName: user.companyName,
      did: user.did,
      verificationLevel: 'Enhanced'
    },
    {
      id: 'VC-2025-003',
      type: 'EUDR_Certificate',
      title: 'EUDR Compliance Certificate',
      issuer: 'VeriTrace Platform',
      issuedDate: '2025-01-12',
      expiryDate: '2026-01-12',
      status: 'valid',
      product: 'Cocoa Beans',
      supplier: 'Ghana Farmers Union',
      blockchainHash: '0x5678...efgh',
      euReference: 'EU-DDS-2025-001235'
    },
    {
      id: 'VC-2025-004',
      type: 'Supplier_Certificate',
      title: 'Supplier Verification Certificate',
      issuer: 'Global Supply Chain Authority',
      issuedDate: '2025-01-10',
      expiryDate: '2025-12-31',
      status: 'expiring_soon',
      supplier: 'Sustainable Plantations Ltd',
      certificationLevel: 'Gold'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'success';
      case 'expiring_soon': return 'warning';
      case 'expired': return 'error';
      case 'revoked': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="h-4 w-4" />;
      case 'expiring_soon': return <Clock className="h-4 w-4" />;
      case 'expired': return <AlertCircle className="h-4 w-4" />;
      case 'revoked': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'EUDR_Certificate': return <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'DID_Identity': return <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'Supplier_Certificate': return <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />;
      default: return <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const filteredCredentials = credentials.filter(cred => {
    const matchesSearch = cred.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cred.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (cred.product && cred.product.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || cred.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleView = (credential: VerifiableCredential) => {
    setSelectedCredential(credential);
  };

  const handleDownload = (credential: VerifiableCredential) => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(credential, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${credential.id}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async (credential: VerifiableCredential) => {
    const shareUrl = `https://veritrace.eu/verify/${credential.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: credential.title,
          text: `Verifiable Credential: ${credential.title}`,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Credential link copied to clipboard!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('veritrace_user');
    onBack();
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Digital Wallet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your verifiable credentials and digital identity
          </p>
        </div>

        {/* Wallet Overview */}
        <Card variant="gradient" className="p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">Digital Identity</h2>
              <p className="text-white/80 mb-1">DID: {user.did}</p>
              <p className="text-white/80 mb-4">Company: {user.companyName}</p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Badge variant="default" className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
                <Badge variant="default" className="bg-white/20 text-white border-white/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-2xl p-6">
                <QrCode className="h-16 w-16 text-white" />
              </div>
              <div className="text-center text-white">
                <div className="text-2xl font-bold">{credentials.length}</div>
                <div className="text-sm text-white/80">Credentials</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Search and Filter */}
        <Card variant="glass" className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="EUDR_Certificate">EUDR Certificates</option>
                <option value="DID_Identity">Identity Credentials</option>
                <option value="Supplier_Certificate">Supplier Certificates</option>
              </select>
              
              <Button variant="outline" size="md">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredCredentials.map((credential) => (
            <Card key={credential.id} variant="default" hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                    {getTypeIcon(credential.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {credential.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {credential.issuer}
                    </p>
                    <Badge variant={getStatusColor(credential.status)} size="sm">
                      {getStatusIcon(credential.status)}
                      <span className="ml-1 capitalize">{credential.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Issued:</span>
                    <p className="text-gray-900 dark:text-gray-100">
                      {new Date(credential.issuedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                    <p className="text-gray-900 dark:text-gray-100">
                      {new Date(credential.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {credential.product && (
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="info" size="sm">
                      {credential.product}
                    </Badge>
                    {credential.supplier && (
                      <Badge variant="default" size="sm">
                        {credential.supplier}
                      </Badge>
                    )}
                  </div>
                )}

                {credential.blockchainHash && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {credential.blockchainHash}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleView(credential)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(credential)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(credential)}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCredentials.length === 0 && (
          <Card variant="default" className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No credentials found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Your verifiable credentials will appear here once you create declarations.'}
            </p>
            <Button variant="primary" onClick={onBack}>
              Go to Dashboard
            </Button>
          </Card>
        )}
      </main>

      {/* Credential Detail Modal */}
      {selectedCredential && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card variant="glass" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {selectedCredential.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCredential(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-6">
                <Card variant="default" className="p-4">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    Credential Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">ID:</span>
                      <p className="font-mono text-gray-900 dark:text-gray-100">
                        {selectedCredential.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Type:</span>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedCredential.type}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Issuer:</span>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedCredential.issuer}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>
                      <Badge variant={getStatusColor(selectedCredential.status)} size="sm">
                        {selectedCredential.status}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {selectedCredential.blockchainHash && (
                  <Card variant="gradient" className="p-4">
                    <h4 className="font-semibold mb-3 text-white">
                      Blockchain Verification
                    </h4>
                    <div className="text-sm text-white/90">
                      <p className="font-mono break-all">
                        {selectedCredential.blockchainHash}
                      </p>
                      <div className="flex items-center mt-2">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Verified on blockchain</span>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="flex items-center justify-center">
                  <Card variant="default" className="p-6">
                    <div className="text-center">
                      <QrCode className="h-32 w-32 mx-auto text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Scan to verify credential
                      </p>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="primary"
                  onClick={() => handleDownload(selectedCredential)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare(selectedCredential)}
                  className="flex-1"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.open(`https://veritrace.eu/verify/${selectedCredential.id}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ModernWallet;
