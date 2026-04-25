import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import AdminLayout from "../components/layout/admin/Layout";
import { ROUTES } from "../config";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import Leadsadmin from "../pages/admin/Leadsadmin";
import Giveaways from "../pages/admin/Giveaways";
import Coupons from "../pages/admin/Coupons";
import VoucherBeheer from "../pages/admin/Vouchers";
import Settings from "../pages/admin/Settings";

// Derive a relative segment from an absolute admin route path
const seg = (route) => route.replace(`${ROUTES.ADMIN}/`, "");

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Services = lazy(() => import("../pages/Services"));
const ServiceDetail = lazy(() => import("../pages/ServiceDetail"));
const Giveaway = lazy(() => import("../pages/Giveaway"));
const Checkout = lazy(() => import("../pages/Checkout"));
const ReduxDemo = lazy(() => import("../pages/ReduxDemo"));
const Login = lazy(() => import("../pages/Login"));

// Admin pages — each lazy-loaded so they only download when visited
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Emails = lazy(() => import("../pages/admin/Leadsadmin"));
const Leads = lazy(() => import("../pages/admin/Giveaways"));
const Orders = lazy(() => import("../pages/admin/Coupons"));
const CaseStudies = lazy(() => import("../pages/admin/Settings"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
    <h1 className="text-6xl font-bold text-gray-800">404</h1>
    <p className="text-xl text-gray-500">Page not found</p>
    <a
      href={ROUTES.HOME}
      className="mt-2 text-[#F48525] hover:underline text-sm font-medium"
    >
      Back to Home
    </a>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={ROUTES.HOME}
        element={
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SERVICES}
        element={
          <Suspense fallback={<PageLoader />}>
            <Services />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SERVICES_SANITAIR}
        element={
          <Suspense fallback={<PageLoader />}>
            <ServiceDetail />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GIVEAWAY}
        element={
          <Suspense fallback={<PageLoader />}>
            <Giveaway />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CHECKOUT}
        element={
          <Suspense fallback={<PageLoader />}>
            <Checkout />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CONTACT}
        element={
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ABOUT}
        element={
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        }
      />

      <Route
        element={
          <Suspense fallback={<PageLoader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={ROUTES.REDUX_DEMO} element={<ReduxDemo />} />
      </Route>

      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ADMIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route path={seg(ROUTES.ADMIN_DASHBOARD)} element={<Dashboard />} />
        <Route path={seg(ROUTES.ADMIN_EMAILS)} element={<Leadsadmin />} />
        <Route path={seg(ROUTES.ADMIN_LEADS)} element={<Giveaways />} />
        <Route path={seg(ROUTES.ADMIN_ORDERS)} element={<Coupons />} />
        <Route
          path={seg(ROUTES.ADMIN_MARKETPLACE_ORDERS)}
          element={<VoucherBeheer />}
        />
        <Route
          path={seg(ROUTES.ADMIN_CASE_STUDIES)}
          element={<Settings />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

export default router;
