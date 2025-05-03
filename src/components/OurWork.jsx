import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const OurWork = () => {
  const { t } = useTranslation();
  const projects = t('pages.our_work.projects', { returnObjects: true });
  return (
    <div className="container py-5">
      <Helmet>
        <title>{t('pages.our_work.meta_title')}</title>
        <meta name="description" content={t('pages.our_work.meta_desc')} />
      </Helmet>
      <h1 className="mb-4 text-center">{t('pages.our_work.heading')}</h1>
      <p className="lead text-center">{t('pages.our_work.intro')}</p>
      <div className="row mt-5">
        {projects.map((project, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWork;