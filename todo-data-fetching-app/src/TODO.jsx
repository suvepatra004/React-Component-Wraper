import { useState, useEffect } from "react";

const TODO = () => {
  // 1. Create todo state to store data
  const [todo, setTodo] = useState([]);

  // 2. Call API "https://dummyjson.com/todos" to fetch data using useEffect
  // useEffect(() => {
  //     fetch("https://dummyjson.com/todos")
  //         .then((response) => response.json())
  //         .then((data) => { setTodo(data.todos) })
  //         .catch((error) => console.log(error))
  // }, []);

  // Safer Version useEffect
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        setTodo(data.todos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  // 3. Map the JSON data and render to the UI
  return (
    <>
      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f5f7fa",
          borderRadius: "10px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          TODO Lists
        </h2>

        {todo.map((value) => {
          return (
            <div
              key={value.id}
              style={{
                padding: "12px",
                marginBottom: "12px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontWeight: "500",
                  color: "#222",
                }}
              >
                {value.todo}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: value.completed ? "green" : "red",
                }}
              >
                Completed : {value.completed ? "Yes" : "No"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TODO;
