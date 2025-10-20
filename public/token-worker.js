// Web Worker for token refresh
let tokenRefreshInterval = null;

// Function to refresh token
const refreshToken = () => {
  // In the future, this would be an API call like:
  // fetch('/api/refresh-token').then(res => res.json()).then(data => { ... })

  // For now, using Date.now() as token
  const token = Date.now().toString();

  console.log('[Web Worker] Token refreshed:', token);

  // Send token back to main thread
  self.postMessage({
    type: 'TOKEN_REFRESH',
    token: token,
    timestamp: Date.now()
  });
};

// Listen for messages from main thread
self.onmessage = (event) => {
  const { type } = event.data;

  if (type === 'START') {
    console.log('[Web Worker] Starting token refresh interval');

    // Clear existing interval if any
    if (tokenRefreshInterval) {
      clearInterval(tokenRefreshInterval);
    }

    // Send initial token immediately
    refreshToken();

    // Set up interval to refresh every 5 secs (120000ms)
    tokenRefreshInterval = setInterval(() => {
      refreshToken();
    }, 120000);

  } else if (type === 'STOP') {
    console.log('[Web Worker] Stopping token refresh interval');

    if (tokenRefreshInterval) {
      clearInterval(tokenRefreshInterval);
      tokenRefreshInterval = null;
    }
  }
};

console.log('[Web Worker] Token worker initialized');
