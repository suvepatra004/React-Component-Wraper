import React from "react";
import { useCounter } from "../hooks/useCounter";

const Counter = () => {
  const { count, increment } = useCounter();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <p
        data-testid="counter-value"
        style={{
          margin: 0,
          minWidth: 44,
          textAlign: "center",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {count}
      </p>

      <button
        type="button"
        onClick={increment}
        style={{
          padding: "10px 16px",
          fontSize: 18,
          fontWeight: 700,
          borderRadius: 4,
          border: "1px solid white",
          background: "#111827",
          color: "#ffffff",
          cursor: "pointer",
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
