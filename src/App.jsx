import { useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { tokenAtom } from './store/atoms'
import './App.css'

function App({ initialToken }) {
  const [token, setToken] = useAtom(tokenAtom)
  const workerRef = useRef(null)

  useEffect(() => {
    // Set initial token
    if (initialToken) {
      setToken(initialToken)
    }

    // Create Web Worker
    const worker = new Worker('/token-worker.js')
    workerRef.current = worker

    // Listen for messages from Web Worker
    worker.onmessage = (event) => {
      if (event.data.type === 'TOKEN_REFRESH') {
        console.log('Received token from Web Worker:', event.data.token)
        setToken(event.data.token)
      }
    }

    // Handle worker errors
    worker.onerror = (error) => {
      console.error('Web Worker error:', error)
    }

    // Start token refresh in worker
    worker.postMessage({ type: 'START' })

    // Cleanup function
    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'STOP' })
        workerRef.current.terminate()
      }
    }
  }, [initialToken, setToken])

  return (
    <div className="app-container">
      <h1>Token Refresher</h1>
      <div className="token-display">
        <h2>Current Token:</h2>
        <p className="token-value">{token || 'Loading...'}</p>
        <p className="token-info">Token refreshes every 2 minutes via Web Worker (background thread)</p>
      </div>
    </div>
  )
}

export default App
