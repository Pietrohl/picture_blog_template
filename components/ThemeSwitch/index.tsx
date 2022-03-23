import { mdiThemeLightDark } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "hooks/theme";
import React from "react";

const ThemeSwitch: React.FC = () => {
  const { switchTheme } = useTheme();
  return (
    <div style={{ padding: "12px" }} onClick={switchTheme}>
      <span className="icon">
        <Icon path={mdiThemeLightDark}></Icon>
      </span>
    </div>
  );
};

export default ThemeSwitch;
