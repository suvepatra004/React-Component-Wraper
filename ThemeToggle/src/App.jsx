import { useState } from "react";
import "./App.css";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";
import { ThemeProvider } from "./contexts/theme";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeProvider
      value={{
        themeMode: theme,
        darkTheme: () => setTheme("dark"),
        lightTheme: () => setTheme("light"),
      }}
    >
      <div className="flex flex-wrap items-center min-h-screen">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
