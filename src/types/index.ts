// User and Authentication Types
export interface UserData {
  email: string;
  companyName: string;
  did: string;
  publicKey: string;
  isVerified: boolean;
  authMethod?: string;
}

// Declaration Form Types
export interface DeclarationData {
  id?: string;
  timestamp?: string;
  status?: string;
  
  // Product Information
  productType: string;
  productName: string;
  productDescription: string;
  hsCode: string;
  quantity: string;
  unit: string;
  
  // Supplier Information
  supplierName: string;
  supplierAddress: string;
  supplierContact: string;
  supplierTaxId: string;
  supplierCertifications: string[];
  
  // Geolocation Data
  farmLocation: string;
  coordinates: string;
  landOwnership: string;
  forestRiskAssessment: string;
  
  // Supporting Documents
  documents: DocumentFile[];
  
  // Additional Information
  riskMitigation: string;
  additionalNotes: string;
}

export interface DocumentFile {
  id: number;
  name: string;
  type: string;
  size: number;
}

// Certificate Types
export interface CertificateData {
  id: string;
  declarationId: string;
  euReference: string;
  blockchainHash: string;
  issuedDate: string;
  expiryDate: string;
  status: string;
  complianceScore: number;
}

// Wallet and Credential Types
export interface VerifiableCredential {
  id: string;
  type: 'EUDR_Certificate' | 'DID_Identity' | 'Supplier_Certificate';
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring_soon' | 'expired' | 'revoked';
  product?: string;
  supplier?: string;
  blockchainHash?: string;
  euReference?: string;
  companyName?: string;
  did?: string;
  verificationLevel?: string;
  certificationLevel?: string;
}

// Processing Step Types
export interface ProcessingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Component Props Types
export interface AuthProps {
  onLogin: (userData: UserData) => void;
}

export interface DeclarationFormProps {
  onBack: () => void;
  onSubmit: (declarationData: DeclarationData) => void;
}

export interface CertificateProps {
  onBack: () => void;
  declarationData: DeclarationData;
}

export interface WalletProps {
  onBack: () => void;
  user: UserData;
}
