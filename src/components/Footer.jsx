import {
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
  } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
  
  export default function Footer() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    return (
      <MDBFooter style={{ background: 'var(--color-navbar)' ,color:'var(--color-text)'}} className={`text-center text-lg-start `}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>{t('footer.about')}</span>
          </div>
        </section>
  
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              {/* About Section */}
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="paint-brush" className="me-3" />
                  Qalaj - قَلچ 
                </h6>
                <p>{t('footer.about')}</p>
              </MDBCol>
  
              {/* Services Categories */}
              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">{t('footer.services')}</h6>
                <p>
                  <a href="/graphic-design" className="text-reset">
                    {t('navbar.graphic_design')}
                  </a>
                </p>
                <p>
                  <a href="/printing" className="text-reset">
                    {t('navbar.printing')}
                  </a>
                </p>
                <p>
                  <a href="/web-development" className="text-reset">
                    {t('navbar.web_development')}
                  </a>
                </p>
                <p>
                  <a href="/supplies" className="text-reset">
                    {t('navbar.supplies')}
                  </a>
                </p>
              </MDBCol>
  
              {/* Useful Links */}
              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">{t('footer.quick_links')}</h6>
                <p>
                  <a href="/about" className="text-reset">
                    {t('footer.about_us')}
                  </a>
                </p>
                <p>
                  <a href="/portfolio" className="text-reset">
                    {t('footer.portfolio')}
                  </a>
                </p>
                <p>
                  <a href="/contact" className="text-reset">
                    {t('footer.contact')}
                  </a>
                </p>
                <p>
                  <a href="/request-quote" className="text-reset">
                    {t('footer.request_quote')}
                  </a>
                </p>
              </MDBCol>
  
              {/* Contact Section */}
              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">{t('footer.contact_us')}</h6>
                <p>
                  <MDBIcon icon="map-marker-alt" className="me-2" />
                  {t('footer.address')}
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  {t('footer.email')}
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> {t('footer.phone')}
                </p>
                <p>
                  <MDBIcon icon="clock" className="me-3" />
                  {t('footer.hours')}
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
  
        <div className="text-center p-4" style={{ backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)" }}>
          {t('footer.copyright')}
        </div>
      </MDBFooter>
    );
  }
