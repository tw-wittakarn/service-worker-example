# React Token Refresher with Service Worker

A React application that uses Jotai for state management and a Service Worker to automatically refresh tokens every minute.

## Features

- **React** with Vite for fast development
- **Jotai** for state management
- **Service Worker** registered in vanilla JavaScript in `index.html`
- Token is generated using `Date.now()` in the service worker
- Real-time token display in the UI
- Initial token passed as prop, subsequent updates from service worker

## How it works

1. React app starts with an initial token from `Date.now()` passed as a prop
2. Service Worker is registered in `index.html` using vanilla JavaScript
3. The Service Worker runs in the background and generates a new token using `Date.now()` every 60 seconds
4. The token is sent from the Service Worker to the React app via `postMessage` and custom events
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
