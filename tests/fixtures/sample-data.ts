/**
 * Sample test data fixtures
 */

import type {
  InvoiceData,
  QuotationData,
  ReceiptData,
  FreelancerConfig,
  Customer,
} from "../../src/validator";
import type { LineItem } from "../../src/utils";

export const sampleCustomer: Customer = {
  name: "John Doe",
  company: "Acme Corp",
  address: "123 Main St, Bangkok 10110",
  taxId: "1234567890123",
  phone: "02-123-4567",
};

export const sampleItems: LineItem[] = [
  {
    description: "Web Development",
    quantity: 40,
    unit: "ชม.",
    unitPrice: 1000,
  },
  {
    description: "UI/UX Design",
    quantity: 20,
    unit: "ชม.",
    unitPrice: 1500,
  },
];

export const sampleInvoice: InvoiceData = {
  documentNumber: "INV-202410-001",
  issueDate: "2024-10-15",
  dueDate: "2024-11-15",
  customer: sampleCustomer,
  items: sampleItems,
  taxRate: 0.03,
  taxType: "withholding",
  taxLabel: "หัก ณ ที่จ่าย 3%",
  notes: "กรุณาชำระเงินภายในกำหนด",
  paymentTerms: ["ชำระ 50% ภายใน 7 วัน", "ชำระที่เหลือเมื่อส่งมอบงาน"],
};

export const sampleQuotation: QuotationData = {
  documentNumber: "QT-202410-001",
  issueDate: "2024-10-15",
  validUntil: "2024-11-15",
  customer: sampleCustomer,
  items: sampleItems,
  taxRate: 0.07,
  taxType: "vat",
  taxLabel: "ภาษีมูลค่าเพิ่ม 7%",
  notes: "ราคานี้รวม VAT แล้ว",
};

export const sampleReceipt: ReceiptData = {
  documentNumber: "REC-202410-001",
  issueDate: "2024-10-15",
  paymentDate: "2024-10-15",
  paymentMethod: "โอนเงินผ่านธนาคาร",
  referenceNumber: "TXN-123456789",
  paidAmount: 68810,
  customer: sampleCustomer,
  items: sampleItems,
  taxRate: 0.03,
  taxType: "withholding",
  taxLabel: "หัก ณ ที่จ่าย 3%",
};

export const sampleFreelancerConfig: FreelancerConfig = {
  name: "Jane Smith",
  title: "Full-Stack Developer",
  email: "jane@example.com",
  phone: "089-999-8888",
  address: "456 Tech St, Bangkok 10110",
  taxId: "9876543210987",
  bankInfo: {
    bankName: "Bangkok Bank",
    accountName: "Jane Smith",
    accountNumber: "123-4-56789-0",
    branch: "Sukhumvit",
  },
};

// Invalid data for negative testing
export const invalidInvoice = {
  documentNumber: "",
  issueDate: "invalid-date",
  dueDate: "2024-13-45", // Invalid date
  customer: {
    name: "",
    address: "",
    taxId: "",
  },
  items: [],
  taxRate: 1.5, // Invalid rate > 1
  taxType: "invalid",
  taxLabel: "",
};

export const invalidCustomer = {
  name: 123, // Should be string
  address: null,
  taxId: undefined,
  phone: ["not", "a", "string"],
};

export const invalidItems = [
  {
    description: "",
    quantity: -5, // Negative quantity
    unit: "",
    unitPrice: -100, // Negative price
  },
  {
    description: "Valid item",
    quantity: 0, // Zero quantity
    unit: "unit",
    unitPrice: 100,
  },
];
