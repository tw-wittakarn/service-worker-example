# React Token Refresher with Web Worker

A React application that uses Jotai for state management and a Web Worker to automatically refresh tokens every 2 minutes in a background thread.

## Features

- **React** with Vite for fast development
- **Jotai** for state management
- **Web Worker** for background token refresh without blocking the UI
- Token is generated using `Date.now()` (ready for API call replacement)
- Real-time token display in the UI
- Automatic token refresh every 2 minutes (120 seconds)
- Non-blocking architecture - token refresh happens in background thread

## How it works

1. When the React app mounts, it creates a Web Worker from `token-worker.js`
2. The Web Worker runs in a background thread (separate from main UI thread)
3. Worker automatically generates a new token every 2 minutes using `Date.now()`
4. Tokens are sent from the Web Worker to the React app via `postMessage` with type `TOKEN_REFRESH`
5. The React app receives the token and updates the Jotai state
6. The UI automatically displays the current token value
7. When the component unmounts, the Web Worker is properly terminated

## Why Web Worker?

- **Non-blocking**: Token refresh (including future API calls) runs in background thread
- **Performance**: Won't slow down or block the UI, even if API calls are slow
- **Reliable**: `setInterval` works reliably in Web Workers (unlike Service Workers)
- **Simple**: One worker per tab, straightforward implementation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

- `src/App.jsx` - Main React component that creates Web Worker and displays the token
- `src/store/atoms.js` - Jotai atom for token state
- `public/token-worker.js` - Web Worker that generates tokens every 2 minutes
- `src/main.jsx` - App entry point that passes initial token
- `index.html` - Main HTML file

## Adding API Call

To replace the `Date.now()` token with an actual API call, update `public/token-worker.js`:

```javascript
// Replace this:
const token = Date.now().toString();

// With your API call:
fetch('/api/refresh-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
  .then(res => res.json())
  .then(data => {
    self.postMessage({
      type: 'TOKEN_REFRESH',
      token: data.token,
      timestamp: Date.now()
    });
  })
  .catch(error => {
    console.error('[Web Worker] Token refresh failed:', error);
  });
```
