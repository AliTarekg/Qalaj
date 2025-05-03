import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const WebDevelopment = () => {
  const { t } = useTranslation();
  const features = t('pages.web_development.features', { returnObjects: true });
  return (
    <div className="container py-5">
      <Helmet>
        <title>{t('pages.web_development.meta_title')}</title>
        <meta name="description" content={t('pages.web_development.meta_desc')} />
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