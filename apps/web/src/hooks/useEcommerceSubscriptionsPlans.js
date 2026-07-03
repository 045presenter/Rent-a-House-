import { useEffect, useState } from 'react';
import { getProducts } from '@/api/EcommerceApi';

export function useEcommerceSubscriptionsPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPlans() {
      try {
        const products = await getProducts();
        if (!cancelled) {
          setPlans(products.filter((product) => product?.variants?.length));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setPlans([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPlans();

    return () => {
      cancelled = true;
    };
  }, []);

  return { plans, loading, error };
}
