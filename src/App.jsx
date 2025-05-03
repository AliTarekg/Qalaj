import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
const NotFound = React.lazy(() => import("./components/404"));
const Home = React.lazy(() => import("./components/HomePage"));
const OurWork = React.lazy(() => import("./components/OurWork"));
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const WebDevelopment = React.lazy(() => import("./components/WebDevelopment"));
const Printing = React.lazy(() => import("./components/Printing"));
const Designing = React.lazy(() => import("./components/Designing"));
const ContactUs = React.lazy(() => import("./components/ContactUs"));

function App() {
  return (
    <Router>
      <NavigationBar />
      <Suspense fallback={<div className="text-center my-3">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/printing" element={<Printing />} />
          <Route path="/graphic-design" element={<Designing />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
