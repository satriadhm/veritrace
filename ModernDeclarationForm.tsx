'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Bot, 
  FileText, 
  CheckCircle,
  X,
  Sparkles
} from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { DeclarationFormProps, DeclarationData, DocumentFile } from '../../types';
import { cn } from '../../utils/cn';
import SimpleAIAssistant from './SimpleAIAssistant';
import AIEnhancedInput from '../molecules/AIEnhancedInput';
import AIEnhancedTextarea from '../molecules/AIEnhancedTextarea';

const ModernDeclarationForm: React.FC<DeclarationFormProps> = ({ onBack, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<string>('');

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const [formData, setFormData] = useState<DeclarationData>({
    productType: '',
    productName: '',
    productDescription: '',
    hsCode: '',
    quantity: '',
    unit: '',
    supplierName: '',
    supplierAddress: '',
    supplierContact: '',
    supplierTaxId: '',
    supplierCertifications: [],
    farmLocation: '',
    coordinates: '',
    landOwnership: '',
    forestRiskAssessment: '',
    documents: [],
    riskMitigation: '',
    additionalNotes: ''
  });

  const steps = [
    { id: 1, title: 'Product Information', description: 'Basic product details', icon: FileText },
    { id: 2, title: 'Supplier Information', description: 'Supplier details and certifications', icon: CheckCircle },
    { id: 3, title: 'Geolocation Data', description: 'Farm location and risk assessment', icon: MapPin },
    { id: 4, title: 'Documents', description: 'Supporting documentation', icon: Upload },
    { id: 5, title: 'Review & Submit', description: 'Final review and submission', icon: Sparkles }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];

      const validFiles: DocumentFile[] = [];
      const errors: string[] = [];

      Array.from(files).forEach(file => {
        // Check file size
        if (file.size > maxFileSize) {
          errors.push(`${file.name} is too large (max 10MB)`);
          return;
        }

        // Check file type
        if (!allowedTypes.includes(file.type)) {
          errors.push(`${file.name} has unsupported file type`);
          return;
        }

        // Check for duplicates
        const isDuplicate = formData.documents.some(doc => 
          doc.name === file.name && doc.size === file.size
        );
        
        if (isDuplicate) {
          errors.push(`${file.name} is already uploaded`);
          return;
        }

        validFiles.push({
          name: file.name,
          type: file.type,
          size: file.size,
          id: Date.now() + Math.random()
        });
      });

      if (validFiles.length > 0) {
        setFormData(prev => ({
          ...prev,
          documents: [...prev.documents, ...validFiles]
        }));
        
        // Show success message
        setUploadSuccess(`Successfully uploaded ${validFiles.length} file${validFiles.length > 1 ? 's' : ''}`);
        setTimeout(() => setUploadSuccess(''), 3000);
      }

      // Update errors state instead of using alert
      setUploadErrors(errors);
      
      // Clear errors after 5 seconds
      if (errors.length > 0) {
        setTimeout(() => setUploadErrors([]), 5000);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag over to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const declarationData: DeclarationData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    onSubmit(declarationData);
  };

  const removeDocument = (id: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== id)
    }));
  };

  const addCertification = (cert: string) => {
    if (cert.trim() && !formData.supplierCertifications.includes(cert)) {
      setFormData(prev => ({
        ...prev,
        supplierCertifications: [...prev.supplierCertifications, cert]
      }));
    }
  };

  const removeCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      supplierCertifications: prev.supplierCertifications.filter(c => c !== cert)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Type
                </label>
                <select
                  value={formData.productType}
                  onChange={(e) => handleInputChange('productType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Product Type</option>
                  <option value="coffee">Coffee</option>
                  <option value="cocoa">Cocoa</option>
                  <option value="palm-oil">Palm Oil</option>
                  <option value="soy">Soy</option>
                  <option value="beef">Beef</option>
                  <option value="rubber">Rubber</option>
                  <option value="wood">Wood</option>
                </select>
              </div>
              <AIEnhancedInput
                label="Product Name"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="e.g., Arabica Coffee Beans"
                fieldType="productName"
                productType={formData.productType}
              />
            </div>
            
            <div>
              <AIEnhancedTextarea
                label="Product Description"
                value={formData.productDescription}
                onChange={(e) => handleInputChange('productDescription', e.target.value)}
                placeholder="Detailed product description..."
                fieldType="productDescription"
                productType={formData.productType}
                productName={formData.productName}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AIEnhancedInput
                label="HS Code"
                value={formData.hsCode}
                onChange={(e) => handleInputChange('hsCode', e.target.value)}
                placeholder="e.g., 090111"
                fieldType="hsCode"
                productType={formData.productType}
                productName={formData.productName}
              />
              <Input
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="e.g., 1000"
              />
              <AIEnhancedInput
                label="Unit"
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                placeholder="Select or type unit"
                fieldType="unit"
                productType={formData.productType}
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Supplier Name"
                value={formData.supplierName}
                onChange={(e) => handleInputChange('supplierName', e.target.value)}
                placeholder="Supplier company name"
              />
              <Input
                label="Supplier Contact"
                value={formData.supplierContact}
                onChange={(e) => handleInputChange('supplierContact', e.target.value)}
                placeholder="Contact person or email"
              />
            </div>
            
            <div>
              <AIEnhancedTextarea
                label="Supplier Address"
                value={formData.supplierAddress}
                onChange={(e) => handleInputChange('supplierAddress', e.target.value)}
                placeholder="Complete supplier address..."
                fieldType="supplierAddress"
                rows={3}
              />
            </div>
            
            <Input
              label="Supplier Tax ID"
              value={formData.supplierTaxId}
              onChange={(e) => handleInputChange('supplierTaxId', e.target.value)}
              placeholder="Tax identification number"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supplier Certifications
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.supplierCertifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="default"
                    className="flex items-center gap-2"
                  >
                    {cert}
                    <button
                      onClick={() => removeCertification(cert)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addCertification(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Add Certification</option>
                  <option value="FSC">FSC (Forest Stewardship Council)</option>
                  <option value="PEFC">PEFC (Programme for Endorsement of Forest Certification)</option>
                  <option value="Rainforest Alliance">Rainforest Alliance</option>
                  <option value="UTZ">UTZ Certified</option>
                  <option value="Fair Trade">Fair Trade</option>
                  <option value="Organic">Organic Certification</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <Input
              label="Farm Location"
              value={formData.farmLocation}
              onChange={(e) => handleInputChange('farmLocation', e.target.value)}
              placeholder="Farm or production area location"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GPS Coordinates
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Latitude"
                  value={formData.coordinates.split(',')[0] || ''}
                  onChange={(e) => {
                    const lng = formData.coordinates.split(',')[1] || '';
                    handleInputChange('coordinates', `${e.target.value},${lng}`);
                  }}
                />
                <Input
                  placeholder="Longitude"
                  value={formData.coordinates.split(',')[1] || ''}
                  onChange={(e) => {
                    const lat = formData.coordinates.split(',')[0] || '';
                    handleInputChange('coordinates', `${lat},${e.target.value}`);
                  }}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Land Ownership
              </label>
              <select
                value={formData.landOwnership}
                onChange={(e) => handleInputChange('landOwnership', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Land Ownership</option>
                <option value="owned">Owned</option>
                <option value="leased">Leased</option>
                <option value="contracted">Contracted</option>
                <option value="cooperative">Cooperative</option>
              </select>
            </div>
            
            <div>
              <AIEnhancedTextarea
                label="Forest Risk Assessment"
                value={formData.forestRiskAssessment}
                onChange={(e) => handleInputChange('forestRiskAssessment', e.target.value)}
                placeholder="Describe the forest risk assessment for this product..."
                fieldType="forestRiskAssessment"
                productType={formData.productType}
                rows={4}
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Supporting Documents
              </label>
              
              <div 
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
                  isDragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
                )}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    document.getElementById('file-upload')?.click();
                  }
                }}
                aria-label="Upload files by clicking or dragging and dropping"
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                  Supported: PDF, DOC, DOCX, JPG, PNG, TXT (max 10MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  Select Files
                </Button>
              </div>
              
              {uploadSuccess && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <p className="text-sm text-green-800 dark:text-green-400">
                    ✓ {uploadSuccess}
                  </p>
                </div>
              )}
              
              {uploadErrors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-400 mb-2">
                    Upload Errors:
                  </h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    {uploadErrors.map((error) => (
                      <li key={error}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {formData.documents.length > 0 && (
                <div className="mt-6 space-y-3">
                  {formData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatFileSize(doc.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <AIEnhancedTextarea
                label="Risk Mitigation Measures"
                value={formData.riskMitigation}
                onChange={(e) => handleInputChange('riskMitigation', e.target.value)}
                placeholder="Describe risk mitigation measures taken..."
                fieldType="riskMitigation"
                productType={formData.productType}
                rows={4}
              />
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Declaration Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Product: {formData.productName}</p>
                  <p className="text-gray-600 dark:text-gray-400">Type: {formData.productType}</p>
                  <p className="text-gray-600 dark:text-gray-400">Quantity: {formData.quantity} {formData.unit}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Supplier: {formData.supplierName}</p>
                  <p className="text-gray-600 dark:text-gray-400">Location: {formData.farmLocation}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Documents: {formData.documents.length} files uploaded
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Any additional notes or comments..."
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

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
                Create Declaration
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                EUDR Compliance Declaration
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center gap-2"
          >
            <Bot size={16} />
            AI Assistant
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center",
                  index < steps.length - 1 && "flex-1"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    currentStep >= step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 dark:border-gray-600 text-gray-400"
                  )}
                >
                  <step.icon size={20} />
                </div>
                <div className="ml-3">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-4 transition-all",
                    currentStep > step.id
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {steps[currentStep - 1].title}
            </h2>
            {renderStepContent()}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="flex space-x-4">
            {currentStep < steps.length ? (
              <Button
                variant="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="gradient"
                onClick={handleSubmit}
                className="flex items-center gap-2"
              >
                <Sparkles size={16} />
                Submit Declaration
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <SimpleAIAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        formData={formData as unknown as Record<string, string | number | string[]>}
        onAutofill={handleInputChange}
        currentStep={currentStep}
      />
    </div>
  );
};

export default ModernDeclarationForm;
