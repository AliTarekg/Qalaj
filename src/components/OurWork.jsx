import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const OurWork = () => {
  const { t } = useTranslation();
  const projects = t('pages.our_work.projects', { returnObjects: true });
  return (
    <div className="our-work-section container py-5">
      <Helmet>
        <title>Our Work | Qalaj | Qalag | قلج | القلج - Portfolio & Success Stories</title>
        <meta name="description" content="Explore Qalaj's (قلج) portfolio of creative projects in web development, printing, and design. Qalag, Qalaj, قلج, القلج - See our success stories and outstanding results for businesses and institutions in Egypt." />
        <meta name="keywords" content="Qalaj, Qalag, قلج, القلج, portfolio, creative projects, web development, printing, design, Egypt" />
        <link rel="canonical" href="https://qalaj.com/our-work" />
        <meta property="og:title" content="Our Work | Qalaj | Qalag | قلج | القلج - Portfolio & Success Stories" />
        <meta property="og:description" content="Explore Qalaj's (قلج) portfolio of creative projects in web development, printing, and design. See our success stories and results for businesses and institutions in Egypt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/our-work" />
        <meta property="og:image" content="/assets/logo-dark.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Work | Qalaj | Qalag | قلج | القلج - Portfolio & Success Stories" />
        <meta name="twitter:description" content="Explore Qalaj's (قلج) portfolio of creative projects in web development, printing, and design. See our success stories and results for businesses and institutions in Egypt." />
        <meta name="twitter:image" content="/assets/logo-dark.svg" />
        <script type="application/ld+json">{`
          [{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Qalaj Portfolio",
            "description": "Qalaj (قلج) portfolio of creative projects in web development, printing, and design.",
            "url": "https://qalaj.com/our-work"
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
              "name": "Our Work",
              "item": "https://qalaj.com/our-work"
            }]
          }]
        `}</script>
      </Helmet>
      <h1 className="our-work-title mb-4 text-center">{t('pages.our_work.heading')}</h1>
      <p className="our-work-intro lead text-center">{t('pages.our_work.intro')}</p>
      <div className="row mt-5 justify-content-center">
        {projects.map((project, idx) => (
          <div className="col-12 col-sm-10 col-md-6 col-lg-4 mb-4 d-flex justify-content-center" key={idx}>
            <div className="our-work-card card h-100 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center text-center">
                <h5 className="card-title mb-3">{project.name}</h5>
                <p className="card-text">{project.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .our-work-section {
          max-width: 1100px;
          margin: 0 auto;
        }
        .our-work-title {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .our-work-intro {
          font-size: 1.15rem;
          font-weight: 500;
          margin-bottom: 2.5rem;
        }
        .our-work-card {
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(22,31,72,0.10);
          transition: box-shadow 0.2s, transform 0.2s;
          min-width: 90%;
          max-width: 370px;
          background: var(--color-card);
          color: var(--color-text-dark);
        }
        .our-work-card:hover {
          box-shadow: 0 8px 32px rgba(216,171,65,0.18);
          transform: translateY(-6px) scale(1.03);
        }
        .our-work-card .card-title {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .our-work-card .card-text {
          font-size: 1.05rem;
          color: var(--color-text-dark);
        }
        @media (max-width: 768px) {
          .our-work-title {
            font-size: 1.3rem;
          }
          .our-work-intro {
            font-size: 1rem;
          }
          .our-work-card {
            min-width: 98%;
            max-width: 98vw;
            padding: 10px 2px;
          }
          .our-work-card .card-title {
            font-size: 1.1rem;
          }
          .our-work-card .card-text {
            font-size: 0.98rem;
          }
        }
        @media (max-width: 576px) {
          .our-work-section {
            padding: 0 2px;
          }
          .our-work-card {
            min-width: 100%;
            max-width: 100vw;
            border-radius: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default OurWork;