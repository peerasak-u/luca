/**
 * Utility functions for invoice generation
 */

export interface LineItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface CalculationResult {
  subtotal: number;
  taxAmount: number;
  total: number;
}

/**
 * Calculate subtotal, tax, and total from line items
 */
export function calculateTotals(
  items: LineItem[],
  taxRate: number,
  taxType: "withholding" | "vat"
): CalculationResult {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const taxAmount = subtotal * taxRate;

  let total: number;
  if (taxType === "withholding") {
    // Withholding tax is deducted from subtotal
    total = subtotal - taxAmount;
  } else {
    // VAT is added to subtotal
    total = subtotal + taxAmount;
  }

  return {
    subtotal,
    taxAmount,
    total,
  };
}

/**
 * Format number with Thai thousand separators
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Convert Gregorian date to Buddhist Era (BE) format
 */
export function formatDateThai(dateString: string): string {
  const date = new Date(dateString);

  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const yearBE = date.getFullYear() + 543; // Convert to Buddhist Era

  return `${day} ${month} ${yearBE}`;
}

/**
 * Validate file path exists
 */
export async function fileExists(path: string): Promise<boolean> {
  try {
    const file = Bun.file(path);
    return await file.exists();
  } catch {
    return false;
  }
}

/**
 * Read and parse JSON file
 */
export async function readJSON<T>(path: string): Promise<T> {
  const file = Bun.file(path);
  return await file.json();
}

/**
 * Get output file path
 */
export function getOutputPath(
  type: string,
  documentNumber: string,
  customOutput?: string
): string {
  if (customOutput) {
    return customOutput;
  }

  // Default: output/{type}-{number}.pdf
  const filename = `${type}-${documentNumber}.pdf`;
  return `output/${filename}`;
}
