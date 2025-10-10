# React Token Refresher with Service Worker

A React application that uses Jotai for state management and a Service Worker to automatically refresh tokens every 5 seconds.

## Features

- **React** with Vite for fast development
- **Jotai** for state management
- **Service Worker** registered in vanilla JavaScript in `index.html`
- Token is generated using `Date.now()` in the service worker
- Real-time token display in the UI
- Automatic token refresh every 5 seconds

## How it works

1. Service Worker is registered in `index.html` using vanilla JavaScript
2. Once activated, the Service Worker runs in the background and automatically generates a new token every 5 seconds using `Date.now()`
3. Tokens are sent from the Service Worker to all clients via `postMessage` with type `TOKEN_REFRESH`
4. The page listens for `TOKEN_REFRESH` messages and dispatches custom `tokenUpdate` events
5. The React app listens for `tokenUpdate` events and updates the Jotai state
6. The UI automatically displays the current token value

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

- `index.html` - Contains vanilla JS service worker registration
- `src/store/atoms.js` - Jotai atom for token state
- `public/service-worker.js` - Service Worker that generates tokens every minute
- `src/main.jsx` - App entry point that passes initial token
- `src/App.jsx` - Main React component that displays the token
