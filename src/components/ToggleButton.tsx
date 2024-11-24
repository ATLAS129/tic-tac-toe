import { useTheme } from "./ThemeProvider";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="">
      {theme === "dark" ? (
        <MdDarkMode
          onClick={toggleTheme}
          size={30}
          className="cursor-pointer transition"
        />
      ) : (
        <MdOutlineLightMode
          onClick={toggleTheme}
          size={30}
          className="cursor-pointer transition"
        />
      )}
    </button>
  );
};

export default ToggleButton;
