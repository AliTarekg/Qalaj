import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useTranslation } from "react-i18next";
import logoDark from '../assets/logo-dark.svg';

const WhatsAppButton = () => {
  const { t, i18n } = useTranslation();
  
  const handleSubmit = (message) => {
    // Format message with proper line breaks and encoding for WhatsApp
    const formattedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201070870826?text=${formattedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get notification sound
  const notificationSound = new Audio('https://cdn.jsdelivr.net/npm/react-floating-whatsapp@0.1.0/src/whatsapp-notification.mp3');
  
  return (
    <FloatingWhatsApp
      phoneNumber="+201070870826"
      accountName="Qalaj"
      avatar={logoDark}
      statusMessage={t('pages.contact_us.form.success')}
      chatMessage={t('pages.contact_us.intro')}
      placeholder={t('pages.contact_us.form.message')}
      allowClickAway={true}
      allowEsc={true}
      notification={true}
      notificationSound={true}
      notificationSoundSrc={notificationSound.src}
      onSubmit={handleSubmit}
      darkMode={true}
      messageDelay={1000}
      className="whatsapp-button"
      style={{
        // Move button up to avoid conflict with other fixed elements
        bottom: '70px',
        // Adjust based on RTL/LTR
        [i18n.dir() === 'rtl' ? 'left' : 'right']: '25px'
      }}
    />
  );
};

export default WhatsAppButton;