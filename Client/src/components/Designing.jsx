import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Designing = () => {
  const { t } = useTranslation();
  const features = t('pages.designing.features', { returnObjects: true });
  return (
    <div className="container py-5">
      <Helmet>
        <title>Designing Services | Qalaj | Qalag | قلج | القلج - Graphic Design Experts</title>
        <meta name="description" content="Discover Qalaj (قلج) designing services: branding, logo, and creative graphic design for your business. Qalag, Qalaj, قلج, القلج - Professional design in Egypt." />
        <meta name="keywords" content="Qalaj, Qalag, قلج, القلج, designing, graphic design, branding, logo, Egypt, creative solutions" />
        <link rel="canonical" href="https://qalaj.com/designing" />
        <meta property="og:title" content="Designing Services | Qalaj | Qalag | قلج | القلج - Graphic Design Experts" />
        <meta property="og:description" content="Discover Qalaj (قلج) designing services: branding, logo, and creative graphic design for your business. Professional design in Egypt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/designing" />
        <meta property="og:image" content="/assets/logo-dark.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Designing Services | Qalaj | Qalag | قلج | القلج - Graphic Design Experts" />
        <meta name="twitter:description" content="Discover Qalaj (قلج) designing services: branding, logo, and creative graphic design for your business. Professional design in Egypt." />
        <meta name="twitter:image" content="/assets/logo-dark.svg" />
        <script type="application/ld+json">{`
          [{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Designing Services",
            "description": "Qalaj (قلج) designing services: branding, logo, and creative graphic design for your business.",
            "url": "https://qalaj.com/designing"
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
              "name": "Graphic Design",
              "item": "https://qalaj.com/graphic-design"
            }]
          }]
        `}</script>
      </Helmet>
      <h1 className="mb-4 text-center">{t('pages.designing.heading')}</h1>
      <p className="lead text-center">{t('pages.designing.content')}</p>
      <ul className="list-group list-group-flush mt-4 mb-5 mx-auto" style={{maxWidth: 600}}>
        {features.map((feature, idx) => (
          <li className="list-group-item" key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default Designing;