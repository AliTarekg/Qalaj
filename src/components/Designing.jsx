import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Designing = () => {
  const { t } = useTranslation();
  const features = t('pages.designing.features', { returnObjects: true });
  return (
    <div className="container py-5">
      <Helmet>
        <title>{t('pages.designing.meta_title')}</title>
        <meta name="description" content={t('pages.designing.meta_desc')} />
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