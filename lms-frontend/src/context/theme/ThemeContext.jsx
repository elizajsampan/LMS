import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createContext, useReducer, useCallback } from "react";
import { hideToastNotification, showToastNotification } from "./themeActions";
import themeReducer from "./themeReducer";

export const ThemeContext = createContext({
  theme: null,
  toastNotification: null,
  onShowToastNotification: () => {},
  onHideToastNotification: () => {},
});

export const ThemeProvider = ({ children }) => {
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   const isDarkModeInStorage = localStorage.getItem("isDarkMode");
  //   if (isDarkModeInStorage) {
  //     return isDarkModeInStorage === "true";
  //   }

  //   return matchMedia("(prefers-color-scheme: dark)").matches;
  // });

  const [{ toastNotification }, dispatch] = useReducer(themeReducer, {
    isDarkMode: false,
    toastNotification: null,
  });

  const rawTheme = createTheme({
    palette: {
      primary: {
        light: "#69696a",
        main: "#28282a",
        dark: "#1e1e1f",
      },
      secondary: {
        light: "#fff5f8",
        main: "#ff3366",
        dark: "#e62958",
      },
      warning: {
        main: "#ffc071",
        dark: "#ffb25e",
      },
    },
    typography: {
      fontFamily: "'Work Sans', sans-serif",
      fontSize: 14,
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700, // Roboto Condensed
    },
  });

  const fontHeader = {
    color: rawTheme.palette.text.primary,
    fontWeight: rawTheme.typography.fontWeightMedium,
    fontFamily: "'Roboto Condensed', sans-serif",
    textTransform: "uppercase",
  };

  const theme = {
    ...rawTheme,
    palette: {
      ...rawTheme.palette,
      background: {
        ...rawTheme.palette.background,
        default: rawTheme.palette.common.white,
        placeholder: grey[200],
      },
    },
    typography: {
      ...rawTheme.typography,
      fontHeader,
      h1: {
        ...rawTheme.typography.h1,
        ...fontHeader,
        letterSpacing: 0,
        fontSize: 60,
      },
      h2: {
        ...rawTheme.typography.h2,
        ...fontHeader,
        fontSize: 48,
      },
      h3: {
        ...rawTheme.typography.h3,
        ...fontHeader,
        fontSize: 42,
      },
      h4: {
        ...rawTheme.typography.h4,
        ...fontHeader,
        fontSize: 36,
      },
      h5: {
        ...rawTheme.typography.h5,
        fontSize: 20,
        fontWeight: rawTheme.typography.fontWeightLight,
      },
      h6: {
        ...rawTheme.typography.h6,
        ...fontHeader,
        fontSize: 18,
      },
      subtitle1: {
        ...rawTheme.typography.subtitle1,
        fontSize: 18,
      },
      body1: {
        ...rawTheme.typography.body2,
        fontWeight: rawTheme.typography.fontWeightRegular,
        fontSize: 16,
      },
      body2: {
        ...rawTheme.typography.body1,
        fontSize: 14,
      },
    },
  };

  // const toggleDarkMode = () => {
  //   const newDarkModeValue = !isDarkMode;
  //   localStorage.setItem("isDarkMode", newDarkModeValue);
  //   setIsDarkMode(newDarkModeValue);
  // };

  const onShowToastNotification = useCallback((toastConfig) => {
    dispatch(showToastNotification(toastConfig));
  }, []);

  const onHideToastNotification = useCallback(() => {
    dispatch(hideToastNotification());
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        onShowToastNotification,
        onHideToastNotification,
        toastNotification,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
