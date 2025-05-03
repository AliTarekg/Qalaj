import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="container py-5">
      <Helmet>
        <title>{t('pages.about_us.meta_title')}</title>
        <meta name="description" content={t('pages.about_us.meta_desc')} />
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