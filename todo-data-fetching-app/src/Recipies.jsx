import { useState, useEffect } from "react";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [limit, setLimit] = useState(1);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch(`https://dummyjson.com/recipes?limit=${limit}`)
            .then((response) => response.json())
            .then((data) => setRecipes(data.recipes))
            .catch((error) => console.log(error));
    }, [limit]);

    const handleReceipies = (value) => {
        const num = Number(value);
        if (isNaN(num) || num < 1) {
            alert("Invalid Limit");
            return;
        }
        setLimit(num);
    };

    const containerStyle = {
        minHeight: "100vh",
        background: "#EAEFEF",
        padding: "60px 80px",
        fontFamily: "Inter, Segoe UI, sans-serif",
        color: "#25343F"
    };

    const inputStyle = {
        padding: "12px 14px",
        borderRadius: "6px",
        border: "1px solid #BFC9D1",
        background: "#FFFFFF",
        width: "220px",
        fontSize: "14px",
        marginRight: "10px"
    };

    const primaryButton = {
        padding: "12px 18px",
        borderRadius: "6px",
        border: "none",
        background: "#25343F",
        color: "#FFFFFF",
        cursor: "pointer",
        fontWeight: "600"
    };

    const orderButton = {
        marginTop: "16px",
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        background: "#FF9B51",
        color: "#25343F",
        fontWeight: "600",
        cursor: "pointer"
    };

    return (
        <div style={containerStyle}>
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "40px",
                    fontWeight: "700",
                    letterSpacing: "0.5px"
                }}
            >
                Recipe Playbook
            </h1>

            {/* Input Section */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="number"
                    placeholder="How many recipes?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={inputStyle}
                />

                <button
                    onClick={() => handleReceipies(inputValue)}
                    style={primaryButton}
                >
                    Show
                </button>
            </div>

            {/* Grid Section */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "40px"
                }}
            >
                {recipes.map((data) => (
                    <div
                        key={data.id}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid #BFC9D1",
                            borderRadius: "24px",
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            maxHeight: '650px'
                        }}
                    >
                        <img
                            src={data.image}
                            alt={data.name}
                            style={{
                                width: "100%",
                                height: "240px",
                                objectFit: "cover",
                                borderRadius: "12px",
                                marginBottom: "16px"
                            }}
                        />

                        <h3 style={{ marginBottom: "10px", fontWeight: "600" }}>
                            {data.name}
                        </h3>

                        {/* Meta Row */}
                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                alignItems: "center",
                                marginBottom: "18px"
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    letterSpacing: "0.6px",
                                    textTransform: "uppercase",
                                    padding: "5px 12px",
                                    borderRadius: "20px",
                                    background:
                                        data.difficulty === "Easy"
                                            ? "rgba(46, 125, 50, 0.12)"
                                            : data.difficulty === "Medium"
                                                ? "rgba(245, 124, 0, 0.12)"
                                                : "rgba(198, 40, 40, 0.12)",
                                    color:
                                        data.difficulty === "Easy"
                                            ? "#2E7D32"
                                            : data.difficulty === "Medium"
                                                ? "#F57C00"
                                                : "#C62828",
                                    border: "1px solid rgba(0,0,0,0.05)"
                                }}
                            >
                                {data.difficulty ?? "Unknown"}
                            </span>

                            <span
                                style={{
                                    fontSize: "11px",
                                    fontWeight: "500",
                                    letterSpacing: "0.4px",
                                    padding: "5px 12px",
                                    borderRadius: "20px",
                                    border: "1px solid #BFC9D1",
                                    color: "#25343F",
                                    background: "transparent"
                                }}
                            >
                                {data.cuisine}
                            </span>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                overflowY: "auto"
                            }}
                        >
                            <h4 style={{ marginBottom: "6px" }}>Ingredients</h4>
                            <ul style={{ paddingLeft: "18px", marginBottom: "16px" }}>
                                {data.ingredients.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                            <h4 style={{ marginBottom: "6px" }}>Instructions</h4>
                            <ol style={{ paddingLeft: "18px" }}>
                                {data.instructions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>

                        </div>

                        <button
                            onClick={() => alert("Order preparation started")}
                            style={orderButton}
                        >
                            Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;