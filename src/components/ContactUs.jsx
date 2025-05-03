import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-5">
      <Helmet>
        <title>{t('pages.contact_us.meta_title')}</title>
        <meta name="description" content={t('pages.contact_us.meta_desc')} />
      </Helmet>
      <h1 className="mb-4 text-center">{t('pages.contact_us.heading')}</h1>
      <p className="lead text-center">{t('pages.contact_us.intro')}</p>
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t('pages.contact_us.form.name')}</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('pages.contact_us.form.email')}</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('pages.contact_us.form.message')}</label>
              <textarea className="form-control" name="message" rows="5" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">{t('pages.contact_us.form.submit')}</button>
            {sent && <div className="alert alert-success mt-3">{t('pages.contact_us.form.success')}</div>}
          </form>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm p-4">
            <h5 className="mb-3">{t('pages.contact_us.title')}</h5>
            <p><strong>{t('footer.address')}:</strong> {t('pages.contact_us.details.address')}</p>
            <p><strong>{t('footer.phone')}:</strong> {t('pages.contact_us.details.phone')}</p>
            <p><strong>{t('footer.email')}:</strong> {t('pages.contact_us.details.email')}</p>
            <p><strong>{t('footer.hours')}:</strong> {t('pages.contact_us.details.hours')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
