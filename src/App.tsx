import './App.css'
import {useAppKit, useAppKitAccount } from '@reown/appkit/react'

function App() {
    const { isConnected, address } = useAppKitAccount();
    const { open, close } = useAppKit();






    return (
        <>
            <div>
                isConnected: {isConnected}
                address: {address && address}
            </div>
            <button onClick={() => open()} disabled={isConnected}>COnnect</button>
            <appkit-button/>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
