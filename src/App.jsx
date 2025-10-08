import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { tokenAtom } from './store/atoms'
import './App.css'

function App({ initialToken }) {
  const [token, setToken] = useAtom(tokenAtom)

  useEffect(() => {
    // Set initial token
    if (initialToken) {
      setToken(initialToken)
    }

    // Listen for token updates from service worker (registered in index.html)
    const handleTokenUpdate = (event) => {
      setToken(event.detail.token)
    }

    window.addEventListener('tokenUpdate', handleTokenUpdate)

    return () => {
      window.removeEventListener('tokenUpdate', handleTokenUpdate)
    }
  }, [initialToken, setToken])

  return (
    <div className="app-container">
      <h1>Token Refresher</h1>
      <div className="token-display">
        <h2>Current Token:</h2>
        <p className="token-value">{token || 'Loading...'}</p>
        <p className="token-info">Token refreshes every minute via Service Worker</p>
      </div>
    </div>
  )
}

export default App
