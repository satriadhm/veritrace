'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  CheckCircle, 
  Shield, 
  Calendar, 
  MapPin,
  FileText,
  Globe,
  Award,
  Sparkles
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { DeclarationData } from '../../types';

interface ModernCertificateProps {
  onBack: () => void;
  declarationData: DeclarationData;
}

const ModernCertificate: React.FC<ModernCertificateProps> = ({ onBack, declarationData }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
  };

  const certificateId = `VT-${Date.now().toString().slice(-6)}`;
  const issueDate = new Date().toLocaleDateString();
  const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                EUDR Certificate
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Deforestation-Free Compliance Certificate
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              Share
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownload}
              isLoading={isDownloading}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </Button>
          </div>
        </div>

        {/* Certificate Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">VeriTrace</h2>
                    <p className="text-blue-100">EUDR Compliance Certificate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle size={20} />
                  <span className="font-semibold">VERIFIED & COMPLIANT</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-2">
                  {certificateId}
                </div>
                <div className="text-blue-100">
                  Certificate ID
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {/* Certificate Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Product Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {declarationData.productName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {declarationData.productType}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {declarationData.quantity} {declarationData.unit}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {declarationData.hsCode}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        HS Code
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Supplier Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {declarationData.supplierName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Supplier Name
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {declarationData.farmLocation}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Farm Location
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {declarationData.landOwnership}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Land Ownership
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            {declarationData.supplierCertifications.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {declarationData.supplierCertifications.map((cert) => (
                    <Badge key={cert} variant="success" className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance Status */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                    EUDR Compliant
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    This product meets all EUDR requirements
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    100%
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Deforestation Free
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    A+
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Compliance Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {declarationData.documents.length}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Documents Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Metadata */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Issue Date
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{issueDate}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Expiry Date
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{expiryDate}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Blockchain Hash
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                    0x{Math.random().toString(16).slice(2, 12)}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-center">
          <Button
            variant="gradient"
            size="lg"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <Sparkles size={20} />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernCertificate;
