'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModernCertificate from '../../components/organisms/ModernCertificate';
import { DeclarationData, UserData } from '../../types';

export default function CertificatePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [declarationData, setDeclarationData] = useState<DeclarationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('veritrace_user');
    const currentDeclaration = localStorage.getItem('veritrace_current_declaration');
    
    if (userData) {
      setUser(JSON.parse(userData));
      // Only set declaration data if it exists, but don't require it
      if (currentDeclaration) {
        setDeclarationData(JSON.parse(currentDeclaration));
      }
      setIsLoading(false);
    } else {
      router.push('/auth');
    }
  }, [router]);

  const handleBack = () => {
    // Clear current declaration and go back to dashboard
    localStorage.removeItem('veritrace_current_declaration');
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading certificate...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // If no current declaration, create sample data for demonstration
  if (!declarationData) {
    const sampleDeclarationData: DeclarationData = {
      id: 'SAMPLE-2025-001',
      timestamp: new Date().toISOString(),
      status: 'approved',
      
      // Product Information
      productType: 'coffee',
      productName: 'Premium Arabica Coffee Beans',
      productDescription: 'High-quality single-origin Arabica coffee beans from sustainable farms in the Amazon rainforest region. Grown at 1,200-1,800m altitude using traditional shade-grown methods.',
      hsCode: '090111',
      quantity: '2500',
      unit: 'kg',
      
      // Supplier Information
      supplierName: 'Amazon Forest Coffee Cooperative',
      supplierAddress: 'Rua das Palmeiras, 123, Acre, Brazil, 69900-000',
      supplierContact: 'contact@amazoncoffee.coop | +55 68 3224-5678',
      supplierTaxId: 'BR12.345.678/0001-90',
      supplierCertifications: ['Rainforest Alliance', 'Fair Trade', 'Organic', 'UTZ Certified'],
      
      // Geolocation Data
      farmLocation: 'Serra do Divisor National Park Buffer Zone, Acre, Brazil',
      coordinates: '-7.6598, -72.7794 (Farm Block A), -7.6612, -72.7801 (Farm Block B)',
      landOwnership: 'Cooperative Land Title - registered with INCRA (Instituto Nacional de Colonização e Reforma Agrária)',
      forestRiskAssessment: `COMPREHENSIVE FOREST RISK ASSESSMENT:

🌳 DEFORESTATION RISK: VERY LOW
- Farm established pre-1995 on previously cleared agricultural land
- No forest conversion after December 31, 2020 (EUDR cutoff date)
- Satellite monitoring shows 15% forest cover INCREASE since 2020
- Active reforestation program: 500+ native trees planted annually

📍 LOCATION VERIFICATION:
- GPS coordinates verified via multiple satellite sources
- Farm boundaries mapped using precision GPS surveying
- Regular drone monitoring for land use changes
- Integration with Brazil's National Forest Monitoring System

🛡️ COMPLIANCE MEASURES:
- Monthly satellite imagery analysis via PRODES/DETER systems
- Third-party verification by SGS Brazil (Annual)
- SNCI (National System for Control of Origin) registration
- CAR (Rural Environmental Registry) compliance verified

🌱 ENVIRONMENTAL IMPACT:
- Zero deforestation commitment with legal guarantees
- 25% of farm area designated as permanent preservation
- Biodiversity corridor maintenance along water sources
- Carbon sequestration: ~12 tons CO2/hectare/year`,
      
      // Supporting Documents
      documents: [
        {
          id: 1,
          name: 'Rainforest_Alliance_Certificate_2024.pdf',
          type: 'application/pdf',
          size: 1024000
        },
        {
          id: 2,
          name: 'Fair_Trade_Certification.pdf',
          type: 'application/pdf',
          size: 856000
        },
        {
          id: 3,
          name: 'Organic_Certificate_USDA_EU.pdf',
          type: 'application/pdf',
          size: 745000
        },
        {
          id: 4,
          name: 'GPS_Survey_Farm_Boundaries.pdf',
          type: 'application/pdf',
          size: 2048000
        },
        {
          id: 5,
          name: 'Satellite_Monitoring_Report_2024.pdf',
          type: 'application/pdf',
          size: 3072000
        },
        {
          id: 6,
          name: 'CAR_Environmental_Registry.pdf',
          type: 'application/pdf',
          size: 1536000
        },
        {
          id: 7,
          name: 'Purchase_Invoice_Coffee_2024.pdf',
          type: 'application/pdf',
          size: 512000
        },
        {
          id: 8,
          name: 'Third_Party_Audit_SGS_2024.pdf',
          type: 'application/pdf',
          size: 2560000
        }
      ],
      
      // Additional Information
      riskMitigation: `COMPREHENSIVE RISK MITIGATION STRATEGY:

🔍 SUPPLY CHAIN MONITORING:
• Real-time satellite monitoring using PRODES and DETER systems
• Quarterly on-site inspections by certified auditors
• Blockchain-based traceability from farm to export
• GPS tracking of all transportation routes

🤝 SUPPLIER PARTNERSHIP:
• Long-term contracts (5+ years) with verified sustainable farmers
• Direct relationships eliminating intermediary risks
• Financial support for sustainable farming practices
• Training programs on EUDR compliance requirements

📊 VERIFICATION SYSTEMS:
• Multi-source satellite data cross-verification
• Integration with Brazilian government monitoring systems
• Annual third-party audits by internationally recognized bodies
• Continuous AI-powered risk assessment updates

⚠️ RISK RESPONSE PROTOCOLS:
• Immediate supplier suspension if deforestation detected
• 24-hour alert system for environmental compliance breaches
• Legal guarantees and insurance coverage for all shipments
• Alternative supplier network maintained for supply security

🌍 ENVIRONMENTAL COMMITMENTS:
• Zero net deforestation across entire supply chain
• Support for local community conservation initiatives
• Investment in reforestation projects (500+ trees/year per farm)
• Biodiversity monitoring and protection programs`,
      
      additionalNotes: `SAMPLE CERTIFICATE - DEMONSTRATION PURPOSES

This is a comprehensive sample certificate demonstrating VeriTrace's full EUDR compliance capabilities. The data represents a realistic coffee import scenario showcasing:

✅ Complete product traceability
✅ Verified supplier credentials  
✅ Geolocation compliance
✅ Risk assessment documentation
✅ Supporting document portfolio
✅ Blockchain verification
✅ EU system integration

Key Features Demonstrated:
• RAG AI-powered compliance intelligence
• Immutable blockchain record keeping
• Real-time satellite monitoring integration
• Comprehensive document management
• Automated risk assessment
• EU Information System connectivity

Certificate ID: VT-SAMPLE-${Date.now().toString().slice(-6)}
Generated: ${new Date().toLocaleString()}
Platform: VeriTrace EUDR Platform v2.0
Technology: RAG AI + Blockchain Infrastructure`
    };

    return (
      <ModernCertificate 
        onBack={handleBack}
        declarationData={sampleDeclarationData}
      />
    );
  }

  return (
    <ModernCertificate 
      onBack={handleBack}
      declarationData={declarationData}
    />
  );
}
