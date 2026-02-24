import { useState, useEffect } from "react";

const UserData = () => {
    const [user, setUser] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const limit = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
                );
                const data = await response.json();

                setUser(prev => {
                    const unique = data.users.filter(
                        item => !prev.some(p => p.id === item.id)
                    );
                    return [...prev, ...unique];
                });

                if (skip + limit >= data.total) {
                    setHasMore(false);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [skip]);

    const handleDelete = (id) => {
        setUser(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div>
            <h2>User Data - From API</h2>

            {user.map((user) => (
                <div
                    key={user.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        padding: "20px",
                        marginBottom: "16px",
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        border: "1px solid #f0f0f0",
                        position: "relative"
                    }}
                >
                    <img
                        src={user.image}
                        alt={user.username}
                        width="80"
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "3px solid #f2f2f2"
                        }}
                    />

                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: "0 0 6px 0", color: "#222" }}>
                            {user.firstName} {user.lastName}
                        </h3>

                        <p style={{ margin: "2px 0", color: "#555", fontSize: "14px" }}>
                            <strong>Username:</strong> {user.username}
                        </p>

                        <p style={{ margin: "2px 0", color: "#555", fontSize: "14px" }}>
                            <strong>Email:</strong> {user.email}
                        </p>

                        <p style={{ margin: "2px 0", color: "#555", fontSize: "14px" }}>
                            <strong>Phone:</strong> {user.phone}
                        </p>

                        <p style={{ margin: "2px 0", color: "#555", fontSize: "14px" }}>
                            <strong>City:</strong> {user.address?.city}
                            {/* user.address?.city  --> Optional Chaining
                                user ?? "Not Known" --> Nullish Coalescing operator 
                                (t is used to provide a default value when the left-hand side operand is null or undefined)
                            */}
                        </p>

                        <p style={{ margin: "2px 0", color: "#555", fontSize: "14px" }}>
                            <strong>Company:</strong> {user.company?.name}
                        </p>
                    </div>

                    <button
                        onClick={() => handleDelete(user.id)}
                        style={{
                            padding: "8px 14px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#ff4d4f",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            alignSelf: "flex-start"
                        }}
                    >
                        Remove
                    </button>
                </div>
            ))}

            {hasMore && (
                <button onClick={() => setSkip(prev => prev + limit)}>
                    Load More...
                </button>
            )}

        </div>
    );
};

export default UserData;