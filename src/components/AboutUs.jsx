import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="container py-5">
      <Helmet>
        <title>About Us | Qalaj | Qalag | قلج | القلج - Creative Team & Vision</title>
        <meta name="description" content="Learn about Qalaj (قلج), our mission, vision, and creative team. Qalag, Qalaj, قلج, القلج - Your partner for design, printing, and web solutions in Egypt." />
        <meta name="keywords" content="Qalaj, Qalag, قلج, القلج, about us, creative team, mission, vision, Egypt, design, printing, web development" />
        <link rel="canonical" href="https://qalaj.com/about-us" />
        <meta property="og:title" content="About Us | Qalaj | Qalag | قلج | القلج - Creative Team & Vision" />
        <meta property="og:description" content="Learn about Qalaj (قلج), our mission, vision, and creative team. Your partner for design, printing, and web solutions in Egypt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/about-us" />
        <meta property="og:image" content="/assets/logo-dark.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Qalaj | Qalag | قلج | القلج - Creative Team & Vision" />
        <meta name="twitter:description" content="Learn about Qalaj (قلج), our mission, vision, and creative team. Your partner for design, printing, and web solutions in Egypt." />
        <meta name="twitter:image" content="/assets/logo-dark.svg" />
        <script type="application/ld+json">{`
          [{
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Qalaj",
            "description": "Learn about Qalaj (قلج), our mission, vision, and creative team.",
            "url": "https://qalaj.com/about-us"
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
              "name": "About Us",
              "item": "https://qalaj.com/about-us"
            }]
          }]
        `}</script>
      </Helmet>
      <h1 className="mb-4 text-center">{t('pages.about_us.heading')}</h1>
      <p className="lead text-center">{t('pages.about_us.content')}</p>
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{t('pages.about_us.mission')}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{t('pages.about_us.vision')}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;