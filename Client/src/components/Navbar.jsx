import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useTheme } from "../ThemeContext";
import "./NavigationBar.css";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../AuthContext";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLang = i18n.language || "ar";
  const { theme, toggleTheme } = useTheme();
  const dir = document.documentElement.dir || "ltr";
  const navDropdownRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef();
  const { user, logout } = useAuth();

  const toggleLang = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  // Close dropdown on navigation
  const handleDropdownSelect = (eventKey) => {
    if (navDropdownRef.current) {
      navDropdownRef.current.props.onToggle(false);
    }
    navigate(eventKey);
  };

  // Collapse navbar on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        expanded &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  // Collapse navbar on navigation
  const handleNavClick = (to) => {
    setExpanded(false);
    if (to) navigate(to);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="py-3 shadow-sm navbar-modern sticky-top"
      role="navigation"
      aria-label="Main navigation"
      expanded={expanded}
      onToggle={setExpanded}
      ref={navbarRef}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Logo"
            className="d-inline-block align-top me-2"
            style={{ height: "48px" }}
          />
          <span className="fw-bold " style={{ marginRight: "8px" }}>
            {currentLang === "ar" ? " قَلچ " : "Qalaj"}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded((prev) => !prev)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="position-relative"
        >
          <Nav className="custom-center-nav mx-auto" as="ul">
            <Nav.Item as="li">
              <Nav.Link
                as={NavLink}
                to="/"
                end
                onClick={() => handleNavClick("/")}
              >
                {t("navbar.home")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={NavLink}
                to="/our-work"
                onClick={() => handleNavClick("/our-work")}
              >
                {t("pages.our_work.title")}
              </Nav.Link>
            </Nav.Item>
            <NavDropdown
              title={t("navbar.services")}
              id="services-dropdown"
              ref={navDropdownRef}
              onSelect={(eventKey) => {
                setExpanded(false);
                handleDropdownSelect(eventKey);
              }}
              menuVariant={theme === "dark" ? "dark" : "light"}
              renderMenuOnMount={true}
              aria-label={t("navbar.services")}
            >
              <NavDropdown.Item
                eventKey="/graphic-design"
                as="button"
                onClick={() => handleNavClick("/graphic-design")}
              >
                {t("navbar.graphic_design")}
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="/printing"
                as="button"
                onClick={() => handleNavClick("/printing")}
              >
                {t("navbar.printing")}
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="/web-development"
                as="button"
                onClick={() => handleNavClick("/web-development")}
              >
                {t("navbar.web_development")}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item as="li">
              <Nav.Link
                as={NavLink}
                to="/contact"
                onClick={() => handleNavClick("/contact")}
              >
                {t("navbar.contact")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={NavLink}
                to="/about"
                onClick={() => handleNavClick("/about")}
              >
                {t("footer.about_us")}
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div
            className={`d-flex align-items-center navbar-actions ${
              dir === "rtl" ? "me-auto" : "ms-auto"
            }`}
            style={{ gap: "0.5rem" }}
          >
            <button
              onClick={() => {
                toggleLang();
                setExpanded(false);
              }}
              className="nav-action-btn lang-toggle"
              aria-label={
                currentLang === "ar"
                  ? "Switch to English"
                  : "التبديل إلى العربية"
              }
              tabIndex={0}
              type="button"
            >
              {t("lang.toggle")}
            </button>
            <button
              onClick={() => {
                toggleTheme();
                setExpanded(false);
              }}
              className="nav-action-btn theme-toggle"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              tabIndex={0}
              type="button"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            {/* Auth links */}
            {!user && (
              <>
                <NavLink to="/login" className="btn btn-outline-primary ms-2" onClick={() => setExpanded(false)}>
                  {t("navbar.login") || "Login"}
                </NavLink>
                <NavLink to="/register" className="btn btn-primary ms-2" onClick={() => setExpanded(false)}>
                  {t("navbar.register") || "Register"}
                </NavLink>
              </>
            )}
            {user && (
              <>
                <span className="navbar-text ms-2">
                  {user.name || user.email}
                </span>
                <button
                  className="btn btn-danger ms-2"
                  onClick={async () => {
                    await logout();
                    navigate("/");
                    setExpanded(false);
                  }}
                >
                  {t("navbar.logout") || "Logout"}
                </button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
