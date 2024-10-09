import { useEffect, useState } from "react";
import Calendar from "./pages/Calendar";

function App() { 
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setTheme = async () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDark) {
      await import("./styles/CalendarDark.css");
    } else {
      await import("./styles/CalendarWhite.css");
    }

    setThemeLoaded(true);
  }; 

  useEffect(() => {
    setTheme();

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setTheme();

    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  
  if (!themeLoaded) return null;
  return (
    <>
      <Calendar />
    </>
  );
}

export default App;