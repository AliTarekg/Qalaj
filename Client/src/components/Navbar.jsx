import  { useRef, useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import "./NavigationBar.css";
import { FaCog, FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";
import ToastContainer from "./ToastContainer";
import Cookies from 'js-cookie'
const NavigationBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLang = i18n.language || "ar";
  const { theme, toggleTheme } = useTheme();
  const dir = document.documentElement.dir || "ltr";
  const navDropdownRef = useRef();
  const navbarRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();

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
  const handleLogout = () => {
    // Remove auth cookies
    Cookies.remove("token");
    Cookies.remove("user");
    // Redirect to login
    navigate("/login");
    // Optionally, close dropdown or cart if open
    setExpanded(false);
    setCartOpen(false);
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
          <span className="fw-bold" style={{ marginRight: "8px" }}>
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
            {user && (
              <>
                <Nav.Item as="li">
                  <Nav.Link
                    as={NavLink}
                    to="/dashboard/inquiries"
                    onClick={() => handleNavClick("/dashboard/inquiries")}
                  >
                    Inquiries{" "}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link
                    as={NavLink}
                    to="/Customers"
                    onClick={() => handleNavClick("/Customers")}
                  >
                    Customers{" "}
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>

          <Nav
            className={`align-items-center ${
              dir === "rtl" ? "me-auto" : "ms-auto"
            }`}
          >
            {/* Floating Cart Icon */}
            <div
              className="cart-icon-wrapper position-relative me-3"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => setCartOpen(true)}
            >
              <FaShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="cart-count-badge">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </div>
            <NavDropdown
              // for RTL pages: open “start” (left), for LTR: open “end” (right)
              align={dir === "rtl" ? "start" : "end"}
              // optional: if you want the menu itself to drop to the left in RTL:
              // drop={dir === "rtl" ? "start" : "down"}
              title={<FaCog size={20} />}
              id="settings-dropdown"
              menuVariant={theme === "dark" ? "dark" : "light"}
              renderMenuOnMount
              // apply a directional CSS class
              menuClassName={
                dir === "rtl" ? "dropdown-menu-rtl" : "dropdown-menu-ltr"
              }
            >
              <NavDropdown.Item
                as="button"
                onClick={() => {
                  toggleLang();
                  setExpanded(false);
                }}
              >
                {t("lang.toggle")}
              </NavDropdown.Item>
              <NavDropdown.Item
                as="button"
                onClick={() => {
                  toggleTheme();
                  setExpanded(false);
                }}
              >
                {theme === "dark"
                  ? t("Light Mode") || "Light Mode"
                  : t("Dark Mode") || "Dark Mode"}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {!user ? (
                <>
                  <NavDropdown.Item
                    as={Link}
                    to="/login"
                    onClick={() => setExpanded(false)}
                  >
                    {t("Login") || "Login"}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/register"
                    onClick={() => setExpanded(false)}
                  >
                    {t("Register") || "Register"}
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.ItemText>
                    {user.username || user.email}
                  </NavDropdown.ItemText>
                  <NavDropdown.Item as="button" onClick={handleLogout}>
                    {t("Logout") || "Logout"}
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <CartDrawer show={cartOpen} onClose={() => setCartOpen(false)} />
      <ToastContainer />
    </Navbar>
  );
};

export default NavigationBar;
