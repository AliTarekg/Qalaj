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
      <MDBFooter style={{ background: 'var(--color-navbar)', color:'var(--color-text)', fontSize: '1.1rem', lineHeight: '1.8' }} className={`text-center text-lg-start`}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>{t('footer.about')}</span>
          </div>
        </section>
  
        <section>
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ fontSize: '1.3rem', letterSpacing: '0.5px' }}>
                  <MDBIcon icon="paint-brush" className="me-3" />
                  Qalaj - قَلچ 
                </h6>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{t('footer.about')}</p>
              </MDBCol>
  
              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ fontSize: '1.2rem' }}>{t('footer.services')}</h6>
                {['graphic_design', 'printing', 'web_development', 'supplies'].map((service) => (
                  <p key={service}>
                    <a href={`/${service.replace('_', '-')}`} className="text-reset" style={{ 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '1.1rem',
                      display: 'block',
                      padding: '0.3rem 0'
                    }}>
                      {t(`navbar.${service}`)}
                    </a>
                  </p>
                ))}
              </MDBCol>
  
              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ fontSize: '1.2rem' }}>{t('footer.quick_links')}</h6>
                {[
                  { path: '/about', text: 'footer.about_us' },
                  { path: '/portfolio', text: 'footer.portfolio' },
                  { path: '/contact', text: 'footer.contact' },
                  { path: '/request-quote', text: 'footer.request_quote' }
                ].map((link) => (
                  <p key={link.path}>
                    <a href={link.path} className="text-reset" style={{ 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '1.1rem',
                      display: 'block',
                      padding: '0.3rem 0'
                    }}>
                      {t(link.text)}
                    </a>
                  </p>
                ))}
              </MDBCol>
  
              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ fontSize: '1.2rem' }}>{t('footer.contact_us')}</h6>
                {[
                  { icon: 'map-marker-alt', text: 'footer.address', className: 'me-2' },
                  { icon: 'envelope', text: 'footer.email', className: 'me-3' },
                  { icon: 'phone', text: 'footer.phone', className: 'me-3' },
                  { icon: 'clock', text: 'footer.hours', className: 'me-3' }
                ].map((item) => (
                  <p key={item.text} style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
                    <MDBIcon icon={item.icon} className={item.className} />
                    {t(item.text)}
                  </p>
                ))}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
  
        <div className="text-center p-4" style={{ 
          backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          {t('footer.copyright')}
        </div>
      </MDBFooter>
    );
  }
