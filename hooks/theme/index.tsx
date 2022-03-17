import {
  createContext,
  ReactChildren,
  useCallback,
  useContext,
  useState,
} from "react";

enum ThemeTypes {
  light = "theme-light",
  dark = "theme-dark",
}

interface IThemeProviderProps {
  children: ReactChildren;
}

interface IThemeContextData {
  theme: ThemeTypes;
  switchTheme?: () => void;
}

const initialThemeState: IThemeContextData = {
  theme: ThemeTypes.light,
};

const { Provider, ...ThemeContext } = createContext(initialThemeState);

const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useState(ThemeTypes.light);

  const switchTheme = useCallback(() => {
    setTheme((state) =>
      state === ThemeTypes.light ? ThemeTypes.dark : ThemeTypes.light
    );
  }, []);

  return <Provider value={{ theme: theme, switchTheme }}>{children}</Provider>;
};

function useTheme() {
  const context = useContext({ Provider, ...ThemeContext });

  if (!context) {
    throw new Error();
  } else {
    return context;
  }
}

export { useTheme, ThemeProvider };
