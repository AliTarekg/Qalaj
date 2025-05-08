import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Printing = () => {
  const { t } = useTranslation();
  const features = t('pages.printing.features', { returnObjects: true });
  return (
    <div className="container py-5">
      <Helmet>
        <title>Printing Services | Qalaj | Qalag | قلج | القلج - High-Quality Printing</title>
        <meta name="description" content="Qalaj (قلج) offers high-quality printing services for businesses and institutions. Qalag, Qalaj, قلج, القلج - Brochures, business cards, and more in Egypt." />
        <meta name="keywords" content="Qalaj, Qalag, قلج, القلج, printing, print services, Egypt, brochures, business cards, creative solutions" />
        <link rel="canonical" href="https://qalaj.com/printing" />
        <meta property="og:title" content="Printing Services | Qalaj | Qalag | قلج | القلج - High-Quality Printing" />
        <meta property="og:description" content="Qalaj (قلج) offers high-quality printing services for businesses and institutions. Brochures, business cards, and more in Egypt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/printing" />
        <meta property="og:image" content="/assets/logo-dark.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Printing Services | Qalaj | Qalag | قلج | القلج - High-Quality Printing" />
        <meta name="twitter:description" content="Qalaj (قلج) offers high-quality printing services for businesses and institutions. Brochures, business cards, and more in Egypt." />
        <meta name="twitter:image" content="/assets/logo-dark.svg" />
        <script type="application/ld+json">{`
          [{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Printing Services",
            "description": "Qalaj (قلج) offers high-quality printing services for businesses and institutions.",
            "url": "https://qalaj.com/printing"
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
              "name": "Printing Services",
              "item": "https://qalaj.com/printing"
            }]
          }]
        `}</script>
      </Helmet>
      <h1 className="mb-4 text-center">{t('pages.printing.heading')}</h1>
      <p className="lead text-center">{t('pages.printing.content')}</p>
      <ul className="list-group list-group-flush mt-4 mb-5 mx-auto" style={{maxWidth: 600}}>
        {features.map((feature, idx) => (
          <li className="list-group-item" key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default Printing;