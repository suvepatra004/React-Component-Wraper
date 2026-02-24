import { useState, useEffect } from "react";

const DynamicTodo = () => {
    // Set states
    const [todos, setTodos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);

    // Set Limit for Load More
    const limit = 10;

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
                );
                const data = await response.json();

                setTodos(prev => {
                    const unique = data.todos.filter(
                        item => !prev.some(p => p.id === item.id)
                    );
                    return [...prev, ...unique];
                });

            } catch (error) {
                console.log(error);
            }
        };

        fetchTodo();
    }, [skip]);

    return (
        <div>
            <h2>Todo Lists</h2>
            {todos.map(
                (value) => (
                    <div key={value.id}>
                        <p>{value.todo}</p>
                        <p> Completed: {value.completed ? "Yes" : "No"}</p>
                    </div>
                )
            )}
            {hasMore && <button onClick={() => setSkip(prev => prev + limit)}>Load More...</button>}
        </div>
    )
}

export default DynamicTodo;