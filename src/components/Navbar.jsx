import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useTheme } from "../ThemeContext";
import "./NavigationBar.css";
import logoDark from '../assets/logo-dark.svg';
import logoLight from '../assets/logo-light.svg';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLang = i18n.language || 'ar';
  const { theme, toggleTheme } = useTheme();
  const dir = document.documentElement.dir || 'ltr';

  const toggleLang = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="py-3 shadow-sm navbar-modern sticky-top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={theme === 'dark' ? logoDark : logoLight}
            alt="Logo"
            className="d-inline-block align-top me-2"
            style={{ height: "48px" }}
          />
          <span className="fw-bold " style={{ marginRight: "8px" }}>
            {currentLang === 'ar' ? ' قَلچ ' : 'Qalaj'}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="position-relative"
        >
          <Nav className="custom-center-nav mx-auto">
            <Nav.Link as={NavLink} to="/">
              {t('navbar.home')}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/our-work">
              {t('pages.our_work.title')}
            </Nav.Link>
            <NavDropdown title={t('navbar.services')} id="services-dropdown">
              <NavDropdown.Item as={NavLink} to="/graphic-design">
                {t('navbar.graphic_design')}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/printing">
                {t('navbar.printing')}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/web-development">
                {t('navbar.web_development')}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/supplies">
                {t('navbar.supplies')}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/contact">
              {t('navbar.contact')}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              {t('footer.about_us')}
            </Nav.Link>
          </Nav>
          <div className={`d-flex align-items-center ${dir === 'rtl' ? 'me-auto' : 'ms-auto'}`} style={{ gap: '0.5rem' }}>
            <Nav.Link onClick={toggleLang} style={{ fontWeight: 700 }}>
              {t('lang.toggle')}
            </Nav.Link>
            <Nav.Link onClick={toggleTheme} style={{ fontWeight: 700 }}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
