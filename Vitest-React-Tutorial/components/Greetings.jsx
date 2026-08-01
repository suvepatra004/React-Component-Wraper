import React from 'react'

function Greetings({ name }) {
    return (
        <div>
            <h2>Hello {name || 'World'}</h2>
        </div>
    )
}

export default Greetings