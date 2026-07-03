const ecommerceApiUrl = (process.env.ECOMMERCE_API_URL || '').replace(/\/$/, '');

function requireBaseUrl() {
  if (!ecommerceApiUrl) {
    throw new Error('ECOMMERCE_API_URL is not configured');
  }

  return ecommerceApiUrl;
}

async function request(path, options) {
  const response = await fetch(`${requireBaseUrl()}${path}`, options);

  if (!response.ok) {
    throw new Error(`Ecommerce API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getUserSubscriptions({ userId }) {
  const data = await request(`/subscriptions?userId=${encodeURIComponent(userId)}`);
  return data.subscriptions ?? data.items ?? [];
}

export async function createManageUserSubscriptionUrl({ userId, returnUrl, subscriptionId }) {
  const data = await request('/subscriptions/manage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, returnUrl, subscriptionId }),
  });

  return data.url;
}
