/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import "../assets/Home.css";
import { motion, animate, useMotionValue, useInView } from "framer-motion";
import Separator from "./separator";
import { useTranslation } from "react-i18next";
import ServiceSlider from "./ServiceSlider";
import { useTheme } from "../ThemeContext";
import logoDark from "../assets/logo-dark.svg";

const AnimatedCounter = ({ target, duration = 3, suffix = "" }) => {
  const ref = useRef(null);
  const inViewRef = useRef(null);
  const count = useMotionValue(0);
  const isInView = useInView(inViewRef, { once: true, threshold: 1.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: duration,
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${Math.floor(
              latest
            ).toLocaleString()}${suffix}`;
          }
        },
      });
      return controls.stop;
    }
  }, [isInView, count, target, duration, suffix]);

  return (
    <span
      ref={(node) => {
        ref.current = node;
        inViewRef.current = node;
      }}
    >
      0{suffix}
    </span>
  );
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const galleryImages = [
  {
    src: "/assets/work-1.jpg",
    alt: {
      en: "Qalaj",
      ar: "هوية بصرية",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-2.jpg",
    alt: {
      en: "E-commerce Website",
      ar: "موقع تجارة إلكترونية",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-3.jpg",
    alt: {
      en: "Brochure Printing",
      ar: "طباعة كتيبات",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-4.jpg",
    alt: {
      en: "Qalaj ",
      ar: "قلج",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-5.jpg",
    alt: {
      en: "Qalaj ",
      ar: "قلج",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-6.jpg",
    alt: {
      en: "Qalaj ",
      ar: "قلج",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-7.jpg",
    alt: {
      en: "Packaging Design",
      ar: "تصميم تغليف",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-8.jpg",
    alt: {
      en: "Packaging Design",
      ar: "تصميم تغليف",
    },
    caption: {
      en: "Qalaj ",
      ar: "قلج",
    },
  },
  {
    src: "/assets/work-4.jpg",
    alt: {
      en: "Packaging Design",
      ar: "تصميم تغليف",
    },
    caption: {
      en: "Product Packaging",
      ar: "تغليف منتج",
    },
  },
  {
    src: "/assets/logo-dark.svg",
    alt: {
      en: "Qalaj Logo",
      ar: "شعار قلج",
    },
    caption: {
      en: "Dont Hesitate to Contact Us",
      ar: "لا تتردد في التواصل معنا",
    },
  },
];

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function useResponsiveChunkSize() {
  const [chunkSize, setChunkSize] = useState(() =>
    window.innerWidth < 768 ? 1 : 3
  );
  useEffect(() => {
    const handler = () => setChunkSize(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return chunkSize;
}

const Home = () => {
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const chunkSize = useResponsiveChunkSize();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroTextRef.current) {
      observer.observe(heroTextRef.current);
    }
    if (heroImageRef.current) {
      observer.observe(heroImageRef.current);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Qalaj | Qalag | قلج | القلج - Integrated Creative Solutions for Your
          Project's Success
        </title>
        <meta
          name="description"
          content="Qalaj (قلج) is a leading Egyptian company providing creative solutions in graphic design, printing, web development, and supplies. Discover our portfolio, services, and contact us for your next project. Qalag, Qalaj, قلج, القلج."
        />
        <meta
          name="keywords"
          content="Qalaj, Qalag, قلج, القلج, creative solutions, Egypt, graphic design, printing, web development, supplies, portfolio, contact"
        />
        <link rel="canonical" href="https://qalaj.com/" />
        <meta
          property="og:title"
          content="Qalaj | Qalag | قلج | القلج - Creative Solutions in Egypt"
        />
        <meta
          property="og:description"
          content="Qalaj (قلج) offers creative solutions in design, printing, web, and supplies. Explore our work and contact us for your business needs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/" />
        <meta property="og:image" content="/assets/logo-dark.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Qalaj | Qalag | قلج | القلج - Creative Solutions in Egypt"
        />
        <meta
          name="twitter:description"
          content="Qalaj (قلج) offers creative solutions in design, printing, web, and supplies. Explore our work and contact us for your business needs."
        />
        <meta name="twitter:image" content="/assets/logo-dark.svg" />
        <script type="application/ld+json">{`
          [{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Qalaj",
            "alternateName": ["Qalag", "قلج", "القلج"],
            "url": "https://qalaj.com/",
            "logo": "https://qalaj.com/assets/logo-dark.svg",
            "sameAs": [
              "https://qalaj.com/",
              "https://www.facebook.com/qalajcreative",
              "https://www.instagram.com/qalajcreative"
            ],
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+201070870826",
              "contactType": "customer service",
              "areaServed": "EG",
              "availableLanguage": ["en", "ar"]
            }],
            "description": "Qalaj (قلج) is a leading Egyptian company providing creative solutions in graphic design, printing, web development, and supplies."
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Qalaj",
            "alternateName": ["Qalag", "قلج", "القلج"],
            "url": "https://qalaj.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://qalaj.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "SiteNavigationElement",
                "position": 1,
                "name": "Graphic Design",
                "description": "Professional graphic design services",
                "url": "https://qalaj.com/graphic-design"
              },
              {
                "@type": "SiteNavigationElement",
                "position": 2,
                "name": "Printing Services",
                "description": "High-quality printing solutions",
                "url": "https://qalaj.com/printing"
              },
              {
                "@type": "SiteNavigationElement",
                "position": 3,
                "name": "Web Development",
                "description": "Modern web development services",
                "url": "https://qalaj.com/web-development"
              },
              {
                "@type": "SiteNavigationElement",
                "position": 4,
                "name": "Our Work",
                "description": "Portfolio and success stories",
                "url": "https://qalaj.com/our-work"
              },
              {
                "@type": "SiteNavigationElement",
                "position": 5,
                "name": "Contact Us",
                "description": "Get in touch with us",
                "url": "https://qalaj.com/contact"
              }
            ]
          }]
        `}</script>
      </Helmet>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center text-center">
            <Col md={6} ref={heroImageRef} className="hero-image-col">
              <img
                src={theme === "dark" ? logoDark : logoDark}
                alt="Qalaj Creative Solutions"
                className="img-fluid hero-img-contained"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Col>
            <Col md={6}>
              <div ref={heroTextRef} className="hero-text">
                <h1>{t("home.hero_title")}</h1>
                <p>{t("home.hero_desc")}</p>
                <a href="/Our-Work">
                  <button className="Browse-courses">
                    {t("home.services_btn")}
                  </button>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Separator />
      <ServiceSlider />
      <section className="stats-section " style={{ margin: "30px" }}>
        <Container>
          <Row className="text-center">
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={500} suffix="+" />
              </h3>
              <p>{t("home.stats_projects")}</p>
            </Col>
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={50} suffix="+" />
              </h3>
              <p>{t("home.stats_clients")}</p>
            </Col>
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={4} suffix="" />
              </h3>
              <p>{t("home.stats_services")}</p>
            </Col>
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={100} suffix="%" />
              </h3>
              <p>{t("home.stats_satisfaction")}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Separator />
      <section className="why-us" style={{ margin: "30px" }}>
        <Container>
          <h2>{t("home.methodology_title")}</h2>
          <Row>
            <Col md={6}>
              <p>{t("home.methodology_desc")}</p>
            </Col>
            <Col md={6}>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                style={{ listStyle: "none", padding: 0 }}
              >
                {t("home.methodology_steps", { returnObjects: true }).map(
                  (step, idx) => (
                    <motion.li variants={listItemVariants} key={idx}>
                      ✅ {step}
                    </motion.li>
                  )
                )}
              </motion.ul>
            </Col>
          </Row>
        </Container>
      </section>
      <Separator />
      {/* Gallery Section */}
      <section
        className="gallery-section enhanced-gallery-section"
        style={{ padding: "20px 0" }}
      >
        <Container fluid>
          <div className="gallery-header text-center mb-4">
            <h2
              style={{ fontWeight: 800, fontSize: "2.4rem", marginBottom: 12 }}
            >
              {t("pages.our_work.title") || "Our Work"}
            </h2>
          </div>
          <Carousel
            indicators={
              galleryImages.length > chunkSize && window.innerWidth >= 577
            }
            controls={
              galleryImages.length > chunkSize && window.innerWidth >= 577
            }
            interval={2000}
            className="gallery-carousel"
            touch={true}
            slide={true}
            pause={false}
            draggable={true}
          >
            {chunkArray(galleryImages, chunkSize).map((group, idx) => (
              <Carousel.Item key={idx}>
                <Row className="justify-content-center align-items-center">
                  {group.map((img, i) => (
                    <Col
                      md={4}
                      sm={12}
                      key={i}
                      className="d-flex justify-content-center"
                    >
                      <div
                        className="gallery-img-card position-relative mb-3"
                        style={{
                          width: "100%",
                          maxWidth: 400,
                          height: 420,
                          borderRadius: 16,
                          overflow: "hidden",
                          background: `url(${img.src}) center center/cover no-repeat`,
                          boxShadow: "0 4px 24px rgba(22,31,72,0.12)",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                        draggable
                        onDragStart={(e) => e.preventDefault()}
                      >
                        {/* <div
                          className="gallery-img-caption"
                          style={{
                            width: "100%",
                            background: "rgba(22,31,72,0.72)",
                            color: "var(--color-secondary)",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            padding: "12px 18px",
                            borderRadius: "0 0 16px 16px",
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            textAlign: "center",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {img.caption[i18n.language] || img.caption.en}
                        </div> */}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="gallery-cta text-center mt-4 gallery-cta-responsive">
            <a href="/our-work" className="gallery-cta-btn">
              {i18n.language === "ar"
                ? "شاهد المزيد من أعمالنا"
                : "See More of Our Work"}
            </a>
            <span
              className="gallery-cta-separator"
              style={{
                margin: "0 12px",
                color: "var(--color-secondary)",
                fontWeight: 700,
              }}
            >
              |
            </span>
            <a href="/contact" className="gallery-cta-btn alt">
              {i18n.language === "ar"
                ? "تواصل معنا لمشروعك القادم"
                : "Contact Us for Your Next Project"}
            </a>
          </div>
          <style>{`
            @media (max-width: 576px) {
              .carousel-indicators, .carousel-control-prev, .carousel-control-next {
                display: none !important;
              }
              .gallery-img-card {
                width: 90vw !important;
                max-width: 98vw !important;
                height: 220px !important;
              }
            }
            @media (max-width: 576px) {
              .gallery-header h2 {
                font-size: 1.3rem !important;
              }
              .gallery-img-card {
                width: 98vw !important;
                max-width: 99vw !important;
                height: 160px !important;
                border-radius: 10px !important;
              }
              .gallery-cta-responsive {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
              }
              .gallery-cta-separator {
                display: none;
              }
              .gallery-cta-btn, .gallery-cta-btn.alt {
                width: 100%;
                max-width: 320px;
                font-size: 1rem;
                padding: 10px 0;
              }
            }
          `}</style>
        </Container>
      </section>
    </>
  );
};

export default Home;
