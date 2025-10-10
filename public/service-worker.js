let tokenRefreshInterval;

// Function to refresh token
const refreshToken = () => {
  const token = Date.now().toString();

  // Send token to all clients
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'TOKEN_REFRESH',
        token: token
      });
    });
  });
};

// Start token refresh on service worker activation
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');

  // Set up interval to refresh every minute (5000ms)
  if (tokenRefreshInterval) {
    clearInterval(tokenRefreshInterval);
  }

  tokenRefreshInterval = setInterval(() => {
    refreshToken();
  }, 5000); // 5 seconds

  event.waitUntil(self.clients.claim());
});

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});
