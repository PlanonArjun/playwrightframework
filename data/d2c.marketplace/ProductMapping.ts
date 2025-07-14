export interface Product {
    name: string,
    key: string,
    type: string,
    description?: string
}

export const products: Product[] = [
    {name: 'Best Buy', key: 'bestbuy', type: 'Retailer', description: 'Best Buy'},
    {name: 'Amazon', key: 'amazon', type: 'Retailer', description: 'Amazon'},
    {name: 'Mattress Firm', key: 'mattressfirm', type: 'Retailer', description: 'Desk Organization. Make your study time as productive as possible with smart, stylish solutions that put everything you need at your fingertips.'}
]

// Utility function to get key by name
export function getProductKeyByName(productName: string): string {
  const product = products.find(p => p.name === productName);
  if (!product) {
    throw new Error(`No product found with name: ${productName}`);
  }
  return product.key;
}

// Utility function to get desc by name
export function getProductDescriptionByName(productName: string): string {
  const product = products.find(p => p.name === productName);
  if (!product) {
    throw new Error(`No product found with name: ${productName}`);
  }
  return product.description;
}

// Utility function to get type by name
export function getProductTypeByName(productName: string): string {
  const product = products.find(p => p.name === productName);
  if (!product) {
    throw new Error(`No product found with name: ${productName}`);
  }
  return product.description;
}