'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Bot, 
  FileText, 
  CheckCircle,
  Loader,
  X,
  Sparkles
} from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';
import { DeclarationFormProps, DeclarationData, DocumentFile } from '../../types';
import { cn } from '../../utils/cn';

const ModernDeclarationForm: React.FC<DeclarationFormProps> = ({ onBack, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

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
      const newFiles: DocumentFile[] = Array.from(files).map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        id: Date.now() + Math.random()
      }));
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    }
  };

  const handleAiAssistant = async () => {
    if (!aiQuestion.trim()) return;
    
    setIsLoadingAi(true);
    setAiResponse('');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses = {
      'what is eudr': 'EUDR (EU Deforestation Regulation) requires companies to ensure their products are not linked to deforestation. You must provide due diligence information about your supply chain.',
      'geolocation': 'Geolocation data should include GPS coordinates of the farm or production area. This helps verify the product origin and assess deforestation risks.',
      'documents': 'Required documents typically include: supplier certificates, land ownership documents, forest risk assessment reports, and product traceability records.',
      'risk assessment': 'Forest risk assessment evaluates the likelihood of deforestation in your supply chain. Consider factors like location, supplier practices, and local regulations.'
    };
    
    const defaultResponse = "I'm here to help with EUDR compliance. Could you please be more specific about what you'd like to know regarding product declarations, supplier information, or risk assessments?";
    
    const response = Object.entries(responses).find(([key]) => 
      aiQuestion.toLowerCase().includes(key)
    )?.[1] || defaultResponse;
    
    setAiResponse(response);
    setIsLoadingAi(false);
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
              <Input
                label="Product Name"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="e.g., Arabica Coffee Beans"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Description
              </label>
              <textarea
                value={formData.productDescription}
                onChange={(e) => handleInputChange('productDescription', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Detailed product description..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="HS Code"
                value={formData.hsCode}
                onChange={(e) => handleInputChange('hsCode', e.target.value)}
                placeholder="e.g., 090111"
              />
              <Input
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="e.g., 1000"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Unit</option>
                  <option value="kg">Kilograms</option>
                  <option value="tons">Tons</option>
                  <option value="liters">Liters</option>
                  <option value="pieces">Pieces</option>
                  <option value="m3">Cubic Meters</option>
                </select>
              </div>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supplier Address
              </label>
              <textarea
                value={formData.supplierAddress}
                onChange={(e) => handleInputChange('supplierAddress', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Complete supplier address..."
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Forest Risk Assessment
              </label>
              <textarea
                value={formData.forestRiskAssessment}
                onChange={(e) => handleInputChange('forestRiskAssessment', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Describe the forest risk assessment for this product..."
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
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop files here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Select Files
                  </Button>
                </label>
              </div>
              
              {formData.documents.length > 0 && (
                <div className="mt-6 space-y-3">
                  {formData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {(doc.size / 1024).toFixed(1)} KB
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Risk Mitigation Measures
              </label>
              <textarea
                value={formData.riskMitigation}
                onChange={(e) => handleInputChange('riskMitigation', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Describe risk mitigation measures taken..."
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

      {/* AI Assistant Modal */}
      {isAiAssistantOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Assistant
              </h3>
              <button
                onClick={() => setIsAiAssistantOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Ask a question"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="e.g., What is EUDR?"
              />
              
              <Button
                variant="primary"
                onClick={handleAiAssistant}
                disabled={isLoadingAi}
                className="w-full"
              >
                {isLoadingAi ? (
                  <>
                    <Loader className="animate-spin mr-2" size={16} />
                    Thinking...
                  </>
                ) : (
                  'Ask AI'
                )}
              </Button>
              
              {aiResponse && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    {aiResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDeclarationForm;
