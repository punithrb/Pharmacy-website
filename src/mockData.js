export const mockMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "HealthCorp",
    category: "Pain Relief",
    price: 5.50,
    availability: true,
    description: "Effective relief for mild to moderate pain and fever.",
    ingredients: ["Paracetamol"],
    dosage: "One tablet every 4-6 hours.",
    discount: 10,
    reviews: 4.5
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    brand: "PharmaGen",
    category: "Antibiotics",
    price: 15.00,
    availability: true,
    description: "Broad-spectrum penicillin antibiotic used to treat bacterial infections.",
    ingredients: ["Amoxicillin"],
    dosage: "As directed by physician.",
    discount: 0,
    reviews: 4.8
  },
  {
    id: 3,
    name: "Vitamin C Tablets",
    brand: "VitaBoost",
    category: "Vitamins & Supplements",
    price: 8.99,
    availability: true,
    description: "Essential for immune support and collagen formation.",
    ingredients: ["Ascorbic Acid"],
    dosage: "One tablet daily.",
    discount: 25,
    reviews: 4.2
  },
  {
    id: 4,
    name: "Lisinopril 10mg",
    brand: "Hypertensol",
    category: "Cardiology",
    price: 22.75,
    availability: false,
    description: "Used to treat high blood pressure and heart failure.",
    ingredients: ["Lisinopril"],
    dosage: "Once daily.",
    discount: 0,
    reviews: 4.6
  },
  {
    id: 5,
    name: "Allergy Relief Capsules",
    brand: "ClearBreath",
    category: "Allergy",
    price: 12.99,
    availability: true,
    description: "Non-drowsy relief from seasonal allergy symptoms.",
    ingredients: ["Cetirizine"],
    dosage: "One capsule daily.",
    discount: 15,
    reviews: 4.1
  }
];

export const mockUser = {
  id: 101,
  name: "Jane Doe",
  email: "jane.doe@example.com",
  medicalHistory: [
    { id: 1, condition: "Seasonal Allergy", medication: "Allergy Relief Capsules" },
    { id: 2, condition: "Hypertension", medication: "Lisinopril 10mg" },
  ],
  pastOrders: [
    { id: 'ORD001', date: '2025-10-01', status: 'Delivered', total: 20.99, items: [{ name: 'Paracetamol 500mg', qty: 2 }] },
    { id: 'ORD002', date: '2025-10-15', status: 'Shipped', total: 15.00, items: [{ name: 'Vitamin C Tablets', qty: 1 }] },
  ],
  prescriptions: [
    { id: 'PRES001', date: '2025-09-20', medicine: 'Lisinopril 10mg', status: 'Verified' },
  ]
};

export const mockOrderUpdates = [
  { id: 1, status: 'Processing', timestamp: '2025-11-10T08:00:00Z' },
  { id: 2, status: 'Shipped', timestamp: '2025-11-10T14:30:00Z' },
  { id: 3, status: 'Out for Delivery', timestamp: '2025-11-11T07:00:00Z' },
];