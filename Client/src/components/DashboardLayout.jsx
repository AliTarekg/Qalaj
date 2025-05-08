import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3">
            <div className="px-3 mb-3">
              <span className="text-muted">Welcome, {user?.name || user?.email}</span>
            </div>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/orders" active={location.pathname === '/dashboard/orders'}>
                  {t('dashboard.orders') || 'Orders'}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/inquiries" active={location.pathname === '/dashboard/inquiries'}>
                  {t('dashboard.inquiries') || 'Inquiries'}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/suppliers" active={location.pathname === '/dashboard/suppliers'}>
                  {t('dashboard.suppliers') || 'Suppliers'}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/invoices" active={location.pathname === '/dashboard/invoices'}>
                  {t('dashboard.invoices') || 'Invoices'}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/payments" active={location.pathname === '/dashboard/payments'}>
                  {t('dashboard.payments') || 'Payments'}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;