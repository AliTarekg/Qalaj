import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const WebDevelopment = () => {
  const { t } = useTranslation();
  const features = t('pages.web_development.features', { returnObjects: true });
  return (
    <div className="container py-5">
      <Helmet>
        <title>Web Development | Qalaj | Qalag | قلج | القلج - Modern Websites & Solutions</title>
        <meta name="description" content="Qalaj (قلج) provides web development services: modern websites, e-commerce, and digital solutions. Qalag, Qalaj, قلج, القلج - Professional web in Egypt." />
        <meta name="keywords" content="Qalaj, Qalag, قلج, القلج, web development, websites, e-commerce, Egypt, digital solutions, creative solutions" />
        <link rel="canonical" href="https://qalaj.com/web-development" />
        <meta property="og:title" content="Web Development | Qalaj | Qalag | قلج | القلج - Modern Websites & Solutions" />
        <meta property="og:description" content="Qalaj (قلج) provides web development services: modern websites, e-commerce, and digital solutions. Professional web in Egypt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/web-development" />
        <meta property="og:image" content="/assets/logo-dark.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development | Qalaj | Qalag | قلج | القلج - Modern Websites & Solutions" />
        <meta name="twitter:description" content="Qalaj (قلج) provides web development services: modern websites, e-commerce, and digital solutions. Professional web in Egypt." />
        <meta name="twitter:image" content="/assets/logo-dark.svg" />
        <script type="application/ld+json">{`
          [{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Web Development",
            "description": "Qalaj (قلج) provides web development services: modern websites, e-commerce, and digital solutions.",
            "url": "https://qalaj.com/web-development"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://qalaj.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://qalaj.com/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Web Development",
              "item": "https://qalaj.com/web-development"
            }]
          }]
        `}</script>
      </Helmet>
      <h1 className="mb-4 text-center">{t('pages.web_development.heading')}</h1>
      <p className="lead text-center">{t('pages.web_development.content')}</p>
      <ul className="list-group list-group-flush mt-4 mb-5 mx-auto" style={{maxWidth: 600}}>
        {features.map((feature, idx) => (
          <li className="list-group-item" key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebDevelopment;