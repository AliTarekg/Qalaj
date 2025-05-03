/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/Home.css";
import { motion, animate, useMotionValue, useInView } from "framer-motion";
import Separator from "./separator";
import { useTranslation } from "react-i18next";
import ServiceSlider from "./ServiceSlider";
import { useTheme } from "../ThemeContext";
import logoDark from '../assets/logo-dark.svg';
import logoLight from '../assets/logo-light.svg';

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

const Home = () => {
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const { t } = useTranslation();
  const { theme } = useTheme();

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
        <title>Qalaj - قَلچ | تصميم جرافيك | طباعة | تطوير ويب | توريدات مكتبية</title>
        <meta name="description" content="قلج (Qalaj) شركة مصرية تقدم حلولاً إبداعية متكاملة في التصميم الجرافيكي، الطباعة، تطوير الويب، وتوريد المستلزمات. خبرة في تنفيذ المشاريع للشركات والمؤسسات التعليمية بأعلى جودة وأسعار تنافسية. Graphic Design, Printing, Web Development, Supplies in Egypt." />
        <meta name="keywords" content="قلج, القلج, qalaj, kalag, qalg, qalag, kalg, تصميم جرافيك, طباعة, تطوير ويب, توريدات مكتبية, Graphic Design, Printing, Web Development, Supplies, Egypt, شركة قلج, Qalaj Egypt, Qalaj Creative Solutions, Qalaj Services, Qalaj Printing, Qalaj Web, Qalaj Design, Qalaj Supplies, Kalag, Kalg, Qalag, Qalg, Kalaj, Kalag Egypt, Kalaj Egypt, Qalaj Company, Qalaj Agency, Qalaj Portfolio, Qalaj Contact" />
        <link rel="canonical" href="https://qalaj.com/" />
        <meta property="og:title" content="Qalaj - قَلچ | تصميم جرافيك | طباعة | تطوير ويب | توريدات مكتبية" />
        <meta property="og:description" content="قلج (Qalaj) شركة مصرية تقدم حلولاً إبداعية متكاملة في التصميم الجرافيكي، الطباعة، تطوير الويب، وتوريد المستلزمات. خبرة في تنفيذ المشاريع للشركات والمؤسسات التعليمية بأعلى جودة وأسعار تنافسية." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qalaj.com/" />
        <meta property="og:image" content="/assets/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Qalaj - قَلچ | تصميم جرافيك | طباعة | تطوير ويب | توريدات مكتبية" />
        <meta name="twitter:description" content="قلج (Qalaj) شركة مصرية تقدم حلولاً إبداعية متكاملة في التصميم الجرافيكي، الطباعة، تطوير الويب، وتوريد المستلزمات." />
        <meta name="twitter:image" content="/assets/logo.svg" />
      </Helmet>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center text-center">
            <Col md={6}>
              <div ref={heroTextRef} className="hero-text">
                <h1>{t('home.hero_title')}</h1>
                <p>{t('home.hero_desc')}</p>
                <a href="/Our-Work">
                  <button className="Browse-courses">{t('home.services_btn')}</button>
                </a>
              </div>
            </Col>
            <Col md={6} ref={heroImageRef} className="hero-image-col">
              <img
                src={theme === 'dark' ? logoDark : logoDark}
                alt="Qalaj Creative Solutions"
                className="img-fluid hero-img-contained"
                style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Separator />
      <ServiceSlider />
      <section className="stats-section " style={{ margin:'30px' }}>
        <Container>
          <Row className="text-center">
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={500} suffix="+" />
              </h3>
              <p>{t('home.stats_projects')}</p>
            </Col>
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={50} suffix="+" />
              </h3>
              <p>{t('home.stats_clients')}</p>
            </Col>
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={4} suffix="" />
              </h3>
              <p>{t('home.stats_services')}</p>
            </Col>
            <Col md={3} className="stat">
              <h3>
                <AnimatedCounter target={100} suffix="%" />
              </h3>
              <p>{t('home.stats_satisfaction')}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Separator />
      <section className="why-us"style={{ margin:'30px' }}>
        <Container>
          <h2>{t('home.methodology_title')}</h2>
          <Row>
            <Col md={6}>
              <p>{t('home.methodology_desc')}</p>
            </Col>
            <Col md={6}>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                style={{ listStyle: "none", padding: 0 }}
              >
                {t('home.methodology_steps', { returnObjects: true }).map((step, idx) => (
                  <motion.li variants={listItemVariants} key={idx}>
                    ✅ {step}
                  </motion.li>
                ))}
              </motion.ul>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
