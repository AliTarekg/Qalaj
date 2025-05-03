import "../assets/Home.css";
import textDark from '../assets/text-dark.svg';
import logoDark from '../assets/logo-dark.svg';
import { useTranslation } from "react-i18next";

const ServiceSlider = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: textDark,
      titleKey: 'navbar.graphic_design',
      descKey: 'pages.designing.card_desc'
    },
    {
      icon: logoDark,
      titleKey: 'navbar.printing',
      descKey: 'pages.printing.card_desc'
    },
    {
      icon: textDark,
      titleKey: 'navbar.web_development',
      descKey: 'pages.web_development.card_desc'
    },
    {
      icon: logoDark,
      titleKey: 'navbar.supplies',
      descKey: 'pages.supplies.card_desc'
    }
  ];

  return (
    <section className="services-slider-section">
      <div className="services-slider-header">
        <h2 className="text-center">{t('navbar.services')}</h2>
      </div>
      <div
        className="services-slider hide-scrollbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
          cursor: "default"
        }}
      >
        {services.map((svc, i) => (
          <div
            key={i}
            className="service-card improved"
            style={{
              flex: "0 1 260px",
              maxWidth: "360px",
              minWidth: "320px"
            }}
          >
            <div className="service-icon-bg">
              <img src={svc.icon} alt={t(svc.titleKey)} className="service-icon" />
            </div>
            <h3>{t(svc.titleKey)}</h3>
            <p>{t(svc.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSlider;