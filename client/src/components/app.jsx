import React, { useState, useEffect } from 'react'

function App() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch('/api/test')
        .then(res => res.json())
        .then(msg => setMessage(msg.success))
    }, [message]);
    return (
        <div>
            {
                message
            }
        </div>
    )
}

export default App;