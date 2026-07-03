const ecommerceBaseUrl = (import.meta.env.VITE_ECOMMERCE_API_URL || '').replace(/\/$/, '');

function endpoint(path) {
  if (!ecommerceBaseUrl) {
    return null;
  }

  return `${ecommerceBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

async function request(path, options) {
  const url = endpoint(path);

  if (!url) {
    throw new Error('VITE_ECOMMERCE_API_URL is not configured.');
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Ecommerce request failed: ${response.status}`);
  }

  return response.json();
}

export function formatCurrency(amountInCents, currencyInfo = {}) {
  const code = currencyInfo.code || currencyInfo.currency || 'KES';

  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: code,
  }).format((amountInCents || 0) / 100);
}

export async function getProducts() {
  const data = await request('/products');
  return Array.isArray(data) ? data : data.products ?? data.items ?? [];
}

export async function getProduct(id) {
  return request(`/products/${id}`);
}

export async function getProductQuantities() {
  const data = await request('/products/quantities');
  return data.quantities ?? data;
}

export async function initializeCheckout(payload) {
  return request('/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
