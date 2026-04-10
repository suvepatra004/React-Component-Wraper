import { createContext, useContext } from "react";

/**
 * Professional Approach to Create a Context
 * 1. Context creation
 * 2. The Provider
 * 3. Custom hook
 */

// 1. Creating Context with default values
export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

// 2. Export the provider
export const ThemeProvider = ThemeContext.Provider();

// 3. Custom hook to use in different files
export const useTheme = () => {
  return useContext(ThemeContext);
};

/**
 * 
Step 1: (The Blueprint - theme.js): You create a context using createContext() and fill it with "placeholder" data (like themeMode: "light").
        This defines the structure so your editor can give you autocompletion suggestions.

Step 2: (The Shortened Hook - theme.js): Inside the same file, you export a custom hook (e.g., useTheme) that already contains useContext(ThemeContext).
        This means you don't have to import two things in your components later.

Step 3: (The Real Data - App.jsx): You define the actual living state using useState.
        You also write the real functions (e.g., darkTheme()) that will change that state.

        function App() {
            const [themeMode, setThemeMode] = useState("light");

            // These are the REAL functions that actually do something
            const darkTheme = () => setThemeMode("dark");
            const lightTheme = () => setThemeMode("light");

            return (
                // The 'value' prop here OVERWRITES the template. When a child asks for 'darkTheme', it gets the real function above, not the empty one from theme.js.
                <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
                    <div className="min-h-screen items-center">
                        <ThemeBtn />
                        <Card />
                    </div>
                </ThemeProvider>
            );
        }

Step 4: (The Connection - App.jsx): You wrap your main UI inside the <ThemeProvider> component.
        You pass your "Real Data" and "Real Functions" into the value prop. This overwrites the placeholders from Step 1.

Step 5: (The Access - ThemeBtn.jsx): Inside your button component, you simply call const {themeMode, darkTheme} = useTheme().

Step 6: (The Interaction - ThemeBtn.jsx): When the user clicks the toggle, it triggers the darkTheme() function.
        Because this function was "plugged in" via the Provider in App.jsx, it updates the state in the parent.

Step 7: (The Re-render - Card.jsx): Since the state in App.jsx changed, the Provider sends the new value down.
        Your Card.jsx component sees the updated themeMode and changes its background color from white to black automatically.
 */
