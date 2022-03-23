import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export enum ThemeTypes {
  light = "theme-light",
  dark = "theme-dark",
}

interface IThemeProviderProps {
  children: ReactNode;
}

interface IThemeContextData {
  theme: ThemeTypes;
  switchTheme: () => void;
}

const initialThemeState: IThemeContextData = {
  theme: ThemeTypes.light,
  switchTheme: () => {
    return null;
  },
};

const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  const switchTheme = useCallback(() => {
    setTheme((state) =>
      state === ThemeTypes.light ? ThemeTypes.dark : ThemeTypes.light
    );
  }, [setTheme]);

  const contextValue = useMemo(() => {
    return {
      theme,
      switchTheme,
    };
  }, [theme, switchTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error();
  } else {
    return context;
  }
}

export { useTheme, ThemeProvider };
