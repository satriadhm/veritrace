// Product mapping data for AI-powered autofill
export interface ProductMapping {
  productType: string;
  productName: string;
  hsCode: string;
  category: 'EUDR' | 'Agricultural' | 'Industrial';
  riskLevel: 'Low' | 'Medium' | 'High';
  commonDescriptions: string[];
  typicalUnits: string[];
  typicalCertifications: string[];
  riskFactors: string[];
}

export const PRODUCT_MAPPINGS: ProductMapping[] = [
  // Coffee Products
  {
    productType: 'coffee',
    productName: 'Arabica Coffee Beans',
    hsCode: '090111',
    category: 'EUDR',
    riskLevel: 'Medium',
    commonDescriptions: [
      'Arabica coffee beans, raw/green',
      'High-quality arabica coffee beans from sustainable farms',
      'Single-origin arabica coffee beans'
    ],
    typicalUnits: ['kg', 'tons'],
    typicalCertifications: ['Rainforest Alliance', 'UTZ', 'Fair Trade', 'Organic'],
    riskFactors: ['Deforestation in coffee-growing regions', 'Land use change', 'Biodiversity impact']
  },
  {
    productType: 'coffee',
    productName: 'Robusta Coffee Beans',
    hsCode: '090112',
    category: 'EUDR',
    riskLevel: 'Medium',
    commonDescriptions: [
      'Robusta coffee beans, raw/green',
      'Commercial grade robusta coffee beans',
      'Robusta coffee beans for espresso blends'
    ],
    typicalUnits: ['kg', 'tons'],
    typicalCertifications: ['Rainforest Alliance', 'UTZ', 'Fair Trade'],
    riskFactors: ['Forest conversion for coffee plantations', 'Habitat destruction']
  },

  // Cocoa Products
  {
    productType: 'cocoa',
    productName: 'Cocoa Beans',
    hsCode: '180100',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Raw cocoa beans, dried and fermented',
      'Premium cocoa beans for chocolate production',
      'Bulk cocoa beans from certified farms'
    ],
    typicalUnits: ['kg', 'tons'],
    typicalCertifications: ['Rainforest Alliance', 'UTZ', 'Fair Trade', 'Organic'],
    riskFactors: ['Primary forest conversion', 'Protected area encroachment', 'Illegal logging']
  },
  {
    productType: 'cocoa',
    productName: 'Cocoa Paste',
    hsCode: '180310',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Cocoa paste (liquor), not defatted',
      'Pure cocoa paste for chocolate manufacturing',
      'Cocoa mass/paste from sustainable sources'
    ],
    typicalUnits: ['kg', 'tons'],
    typicalCertifications: ['Rainforest Alliance', 'UTZ', 'Fair Trade'],
    riskFactors: ['Derived from high-risk cocoa beans', 'Traceability challenges']
  },

  // Palm Oil Products
  {
    productType: 'palm-oil',
    productName: 'Crude Palm Oil',
    hsCode: '151110',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Crude palm oil, unrefined',
      'Virgin palm oil from certified plantations',
      'Sustainable palm oil for food industry'
    ],
    typicalUnits: ['liters', 'tons'],
    typicalCertifications: ['RSPO', 'ISPO', 'MSPO', 'Rainforest Alliance'],
    riskFactors: ['Primary forest clearing', 'Peatland destruction', 'Orangutan habitat loss']
  },
  {
    productType: 'palm-oil',
    productName: 'Refined Palm Oil',
    hsCode: '151190',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Refined, bleached, deodorized palm oil',
      'Processed palm oil for consumer products',
      'Industrial grade refined palm oil'
    ],
    typicalUnits: ['liters', 'tons'],
    typicalCertifications: ['RSPO', 'ISPO', 'MSPO'],
    riskFactors: ['Derived from potentially high-risk crude palm oil', 'Supply chain complexity']
  },

  // Soy Products
  {
    productType: 'soy',
    productName: 'Soybeans',
    hsCode: '120100',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Soybeans, dried, for sowing or consumption',
      'Non-GMO soybeans from sustainable farms',
      'Organic soybeans for food production'
    ],
    typicalUnits: ['kg', 'tons'],
    typicalCertifications: ['RTRS', 'ProTerra', 'Organic', 'Non-GMO Project'],
    riskFactors: ['Cerrado savanna conversion', 'Amazon rainforest encroachment', 'Grassland conversion']
  },
  {
    productType: 'soy',
    productName: 'Soybean Oil',
    hsCode: '150710',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Crude soybean oil, unrefined',
      'Soybean oil for food processing',
      'Industrial soybean oil for biodiesel'
    ],
    typicalUnits: ['liters', 'tons'],
    typicalCertifications: ['RTRS', 'ProTerra', 'Organic'],
    riskFactors: ['Derived from high-risk soybean cultivation', 'Land use conversion']
  },

  // Beef Products
  {
    productType: 'beef',
    productName: 'Fresh Beef',
    hsCode: '020110',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Fresh or chilled beef carcasses',
      'Grass-fed beef from sustainable ranches',
      'Premium beef cuts for export'
    ],
    typicalUnits: ['kg', 'tons'],
    typicalCertifications: ['Certified Sustainable Beef', 'Global Animal Partnership', 'Organic'],
    riskFactors: ['Pasture expansion into forests', 'Ranch-related deforestation', 'Illegal cattle ranching']
  },

  // Rubber Products
  {
    productType: 'rubber',
    productName: 'Natural Rubber',
    hsCode: '400110',
    category: 'EUDR',
    riskLevel: 'Medium',
    commonDescriptions: [
      'Natural rubber latex, liquid form',
      'Concentrated natural rubber latex',
      'Sustainable natural rubber from certified plantations'
    ],
    typicalUnits: ['kg', 'liters'],
    typicalCertifications: ['FSC', 'PEFC', 'Rainforest Alliance'],
    riskFactors: ['Plantation expansion', 'Forest conversion', 'Biodiversity impact']
  },

  // Wood Products
  {
    productType: 'wood',
    productName: 'Tropical Hardwood Logs',
    hsCode: '440320',
    category: 'EUDR',
    riskLevel: 'High',
    commonDescriptions: [
      'Tropical wood logs, rough or squared',
      'Certified sustainable timber logs',
      'FSC-certified tropical hardwood'
    ],
    typicalUnits: ['m3', 'pieces'],
    typicalCertifications: ['FSC', 'PEFC', 'FLEGT', 'CITES'],
    riskFactors: ['Illegal logging', 'Primary forest extraction', 'Protected area harvesting']
  },
  {
    productType: 'wood',
    productName: 'Wood Pulp',
    hsCode: '470100',
    category: 'EUDR',
    riskLevel: 'Medium',
    commonDescriptions: [
      'Chemical wood pulp, dissolving grades',
      'Bleached softwood kraft pulp',
      'Sustainable wood pulp for paper production'
    ],
    typicalUnits: ['tons', 'kg'],
    typicalCertifications: ['FSC', 'PEFC', 'ECOLABEL'],
    riskFactors: ['Forest plantation impacts', 'Water resource usage', 'Chemical processing concerns']
  }
];

// AI-powered suggestions based on product type
export const getProductSuggestions = (productType: string): ProductMapping[] => {
  return PRODUCT_MAPPINGS.filter(mapping => 
    mapping.productType.toLowerCase() === productType.toLowerCase()
  );
};

// Get HS Code suggestions based on product name
export const getHSCodeSuggestions = (productName: string): string[] => {
  const matches = PRODUCT_MAPPINGS.filter(mapping =>
    mapping.productName.toLowerCase().includes(productName.toLowerCase()) ||
    productName.toLowerCase().includes(mapping.productName.toLowerCase())
  );
  return matches.map(match => match.hsCode);
};

// Get product description suggestions
export const getDescriptionSuggestions = (productType: string, productName: string): string[] => {
  const mapping = PRODUCT_MAPPINGS.find(m => 
    m.productType.toLowerCase() === productType.toLowerCase() &&
    m.productName.toLowerCase().includes(productName.toLowerCase())
  );
  return mapping ? mapping.commonDescriptions : [];
};

// Get certification suggestions
export const getCertificationSuggestions = (productType: string): string[] => {
  const mappings = PRODUCT_MAPPINGS.filter(m => 
    m.productType.toLowerCase() === productType.toLowerCase()
  );
  const allCertifications = mappings.flatMap(m => m.typicalCertifications);
  return [...new Set(allCertifications)]; // Remove duplicates
};

// Get unit suggestions
export const getUnitSuggestions = (productType: string): string[] => {
  const mappings = PRODUCT_MAPPINGS.filter(m => 
    m.productType.toLowerCase() === productType.toLowerCase()
  );
  const allUnits = mappings.flatMap(m => m.typicalUnits);
  return [...new Set(allUnits)]; // Remove duplicates
};

// Get risk assessment suggestions
export const getRiskAssessmentSuggestions = (productType: string): string => {
  const mappings = PRODUCT_MAPPINGS.filter(m => 
    m.productType.toLowerCase() === productType.toLowerCase()
  );
  if (mappings.length === 0) return '';
  
  const riskFactors = mappings.flatMap(m => m.riskFactors);
  const riskLevel = mappings[0].riskLevel;
  
  return `Risk Level: ${riskLevel}\n\nKey Risk Factors:\n${riskFactors.map(factor => `• ${factor}`).join('\n')}\n\nRecommendation: Implement appropriate due diligence measures based on the ${riskLevel.toLowerCase()} risk profile of this product category.`;
};
