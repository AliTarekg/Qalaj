import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import emailjs from '@emailjs/browser';
import WhatsAppButton from './WhatsAppButton';

const ContactUs = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [status, setStatus] = useState({ sent: false, error: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_355ipa8', // Replace with your EmailJS service ID
      'template_o03dt3a', // Replace with your EmailJS template ID
      form.current,
      'cf-taPNYxQMiJFoMP' // Replace with your EmailJS public key
    )
    .then(() => {
      setStatus({ sent: true, error: false });
      form.current.reset();
    })
    .catch(() => {
      setStatus({ sent: false, error: true });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="container py-5">
      <Helmet>
        <title>Contact Us | Qalaj | Qalag | قلج | القلج - Get in Touch</title>
        <meta name="description" content="Contact Qalaj (قلج) for creative solutions in design, printing, and web development. Qalag, Qalaj, قلج, القلج - Reach out for your next project in Egypt." />
        <meta name="keywords" content="Qalaj, Qalag, قلج, القلج, contact, Egypt, design, printing, web development, creative solutions" />
        <link rel="canonical" href="https://qalaj.com/contact" />
        <meta property="og:title" content="Contact Us | Qalaj | Qalag | قلج | القلج - Get in Touch" />
        <meta property="og:description" content="Contact Qalaj (قلج) for creative solutions in design, printing, and web development. Reach out for your next project in Egypt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/contact" />
        <meta property="og:image" content="/assets/logo-dark.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Qalaj | Qalag | قلج | القلج - Get in Touch" />
        <meta name="twitter:description" content="Contact Qalaj (قلج) for creative solutions in design, printing, and web development. Reach out for your next project in Egypt." />
        <meta name="twitter:image" content="/assets/logo-dark.svg" />
        <script type="application/ld+json">{`
          [{
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Qalaj",
            "description": "Contact Qalaj (قلج) for creative solutions in design, printing, and web development.",
            "url": "https://qalaj.com/contact"
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
              "name": "Contact Us",
              "item": "https://qalaj.com/contact"
            }]
          }]
        `}</script>
      </Helmet>
      <h1 className="mb-4 text-center">{t('pages.contact_us.heading')}</h1>
      <p className="lead text-center">{t('pages.contact_us.intro')}</p>
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <form ref={form} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t('pages.contact_us.form.name')}</label>
              <input type="text" className="form-control" name="user_name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('pages.contact_us.form.email')}</label>
              <input type="email" className="form-control" name="user_email" required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('pages.contact_us.form.message')}</label>
              <textarea className="form-control" name="message" rows="5" required />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : t('pages.contact_us.form.submit')}
            </button>
            {status.sent && (
              <div className="alert alert-success mt-3">
                {t('pages.contact_us.form.success')}
              </div>
            )}
            {status.error && (
              <div className="alert alert-danger mt-3">
                An error occurred. Please try again or contact us via WhatsApp.
              </div>
            )}
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
      <WhatsAppButton />
    </div>
  );
};

export default ContactUs;
