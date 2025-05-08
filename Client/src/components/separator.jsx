import { useTheme } from "../ThemeContext";
import textDark from '../assets/text-dark.svg';
import textLight from '../assets/text-light.svg';

const Separator = () => {
  const { theme } = useTheme();
  const borderColor = "#023047";

  const containerStyle = {
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const flexContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const lineStyleLeft = {
    flex: 1,
    borderBottom: `2px solid ${borderColor}`,
    marginRight: "2.5rem",
    marginTop: "2rem",
  };

  const lineStyleRight = {
    flex: 1,
    borderBottom: `2px solid ${borderColor}`,
    marginLeft: "1rem",
    marginTop: "2rem",
  };

  const logoStyle = {
    width: "90px",
    height: "auto",
  };

  return (
    <div style={containerStyle}>
      <div style={flexContainerStyle}>
        <div style={lineStyleLeft} />
        <img src={theme === 'dark' ? textDark : textLight} alt="Website Logo" style={logoStyle} />
        <div style={lineStyleRight} />
      </div>
    </div>
  );
};

export default Separator;
