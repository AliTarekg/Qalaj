import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import DashboardLayout from "./components/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./AuthContext";

// Lazy load public components
const NotFound = React.lazy(() => import("./components/404"));
const Home = React.lazy(() => import("./components/HomePage"));
const OurWork = React.lazy(() => import("./components/OurWork"));
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const WebDevelopment = React.lazy(() => import("./components/WebDevelopment"));
const Printing = React.lazy(() => import("./components/Printing"));
const Designing = React.lazy(() => import("./components/Designing"));
const ContactUs = React.lazy(() => import("./components/ContactUs"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

// Lazy load dashboard components
const OrdersList = React.lazy(() => import("./components/dashboard/OrdersList"));
const OrderForm = React.lazy(() => import("./components/dashboard/OrderForm"));
const InquiriesList = React.lazy(() => import("./components/dashboard/InquiriesList"));
const SuppliersList = React.lazy(() => import("./components/dashboard/SuppliersList"));
const SupplierForm = React.lazy(() => import("./components/dashboard/SupplierForm"));
const InvoicesList = React.lazy(() => import("./components/dashboard/InvoicesList"));
const InvoiceForm = React.lazy(() => import("./components/dashboard/InvoiceForm"));
const PaymentsList = React.lazy(() => import("./components/dashboard/PaymentsList"));
const PaymentForm = React.lazy(() => import("./components/dashboard/PaymentForm"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Suspense fallback={<div className="text-center my-3">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/printing" element={<Printing />} />
            <Route path="/graphic-design" element={<Designing />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardLayout>
                  <OrdersList />
                </DashboardLayout>
              </PrivateRoute>
            } />

            {/* Orders Routes */}
            <Route path="/dashboard/orders" element={
              <PrivateRoute>
                <DashboardLayout>
                  <OrdersList />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/orders/new" element={
              <PrivateRoute>
                <DashboardLayout>
                  <OrderForm />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/orders/:id" element={
              <PrivateRoute>
                <DashboardLayout>
                  <OrderForm />
                </DashboardLayout>
              </PrivateRoute>
            } />

            {/* Inquiries Routes */}
            <Route path="/dashboard/inquiries" element={
              <PrivateRoute>
                <DashboardLayout>
                  <InquiriesList />
                </DashboardLayout>
              </PrivateRoute>
            } />

            {/* Suppliers Routes */}
            <Route path="/dashboard/suppliers" element={
              <PrivateRoute>
                <DashboardLayout>
                  <SuppliersList />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/suppliers/new" element={
              <PrivateRoute>
                <DashboardLayout>
                  <SupplierForm />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/suppliers/:id" element={
              <PrivateRoute>
                <DashboardLayout>
                  <SupplierForm />
                </DashboardLayout>
              </PrivateRoute>
            } />

            {/* Invoices Routes */}
            <Route path="/dashboard/invoices" element={
              <PrivateRoute>
                <DashboardLayout>
                  <InvoicesList />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/invoices/new" element={
              <PrivateRoute>
                <DashboardLayout>
                  <InvoiceForm />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/invoices/:id" element={
              <PrivateRoute>
                <DashboardLayout>
                  <InvoiceForm />
                </DashboardLayout>
              </PrivateRoute>
            } />

            {/* Payments Routes */}
            <Route path="/dashboard/payments" element={
              <PrivateRoute>
                <DashboardLayout>
                  <PaymentsList />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/payments/new" element={
              <PrivateRoute>
                <DashboardLayout>
                  <PaymentForm />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/dashboard/payments/:id" element={
              <PrivateRoute>
                <DashboardLayout>
                  <PaymentForm />
                </DashboardLayout>
              </PrivateRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
