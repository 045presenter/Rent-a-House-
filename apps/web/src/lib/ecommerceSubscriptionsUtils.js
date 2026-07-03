export function activeSubscription(subscriptions = []) {
  return subscriptions.find(
    (subscription) =>
      subscription &&
      (subscription.status === 'active' || subscription.status === 'trialing'),
  ) ?? null;
}
