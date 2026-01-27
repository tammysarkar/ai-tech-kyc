// 1. Define the shape of your file data
export interface ExtractedRecord {
  id: number | string;
  productName?: string;
  businessLine?: string;
  subProductName?: string;
  // Add an index signature if the keys vary dynamically
  [key: string]: string | number | boolean | undefined; 
}

// 2. Apply it to your state
