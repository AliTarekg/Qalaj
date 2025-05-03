import "../assets/Home.css";

const services = [
  {
    icon: "/assets/text-dark.svg",
    title: "تصميم جرافيك",
    subtitle: "Graphic Design",
    desc: "تصميم شعارات، هويات بصرية، سوشيال ميديا وأكثر."
  },
  {
    icon: "/assets/logo-dark.svg",
    title: "الطباعة",
    subtitle: "Printing",
    desc: "جميع خدمات الطباعة التجارية والدعائية بجودة عالية."
  },
  {
    icon: "/assets/text-dark.svg",
    title: "تطوير الأنظمة",
    subtitle: "System Development",
    desc: "برمجة مواقع وتطبيقات وحلول برمجية متكاملة."
  },
  {
    icon: "/assets/logo-dark.svg",
    title: "توريدات الشركات",
    subtitle: "Company Supplies",
    desc: "توريد مستلزمات مكتبية وأجهزة للشركات والمؤسسات."
  }
];

const ServiceSlider = () => {
  return (
    <section className="services-slider-section">
      <div className="services-slider-header">
        <h2 className="text-center">خدماتنا</h2>
      </div>
      <div
        className="services-slider hide-scrollbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
          cursor: "default"
        }}
      >
        {services.map((svc, i) => (
          <div
            key={i}
            className="service-card improved"
            style={{
              flex: "0 1 260px",
              maxWidth: "360px",
              minWidth: "320px"
            }}
          >
            <div className="service-icon-bg">
              <img src={svc.icon} alt={svc.title} className="service-icon" />
            </div>
            <h3>{svc.title}</h3>
            <h4>{svc.subtitle}</h4>
            <p>{svc.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSlider;