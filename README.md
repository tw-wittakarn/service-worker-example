# React Token Refresher with Service Worker

A React application that uses Jotai for state management and a Service Worker to automatically refresh tokens every minute.

## Features

- **React** with Vite for fast development
- **Jotai** for state management
- **Service Worker** that generates and refreshes tokens every minute
- Token is generated using `Date.now()` in the service worker
- Real-time token display in the UI

## How it works

1. The Service Worker runs in the background and generates a new token using `Date.now()` every 60 seconds
2. The token is sent from the Service Worker to the React app via `postMessage`
3. The React app receives the token and updates the Jotai state
4. The UI displays the current token value

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

- `src/store/atoms.js` - Jotai atom for token state
- `src/utils/registerServiceWorker.js` - Service Worker registration and message handling
- `public/service-worker.js` - Service Worker that generates tokens every minute
- `src/App.jsx` - Main React component that displays the token
