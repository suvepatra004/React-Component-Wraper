import React from 'react'
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log("Unable to Fetch the user profile"));

    }, [userId]);

    if (!user) return <h2 style={{ color: "cyan" }}>Loading...</h2>
    return (
        <>
            <div>
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
            </div>
        </>
    )
}

export default UserProfile