// app/router.jsx
import { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

/* ───────────── Lazy Pages (code splitting) ───────────── */
const HomePage     = lazy(() => import("../pages/Home/HomePage.jsx"));
const ShopPage     = lazy(() => import("../pages/Shop/ShopPage.jsx"));
const ProductPage  = lazy(() => import("../pages/Product/ProductPage.jsx"));
const BlogListPage = lazy(() => import("../pages/Blog/BlogListPage.jsx"));
const BlogDetail   = lazy(() => import("../pages/Blog/BlogDetailPage.jsx"));
const CategoryPage = lazy(() => import("../pages/Category/CategoryPage.jsx"));
const ReviewPage   = lazy(() => import("../pages/Review/ReviewPage.jsx"));
const AboutPage    = lazy(() => import("../pages/About/Aboutpage.jsx"));

/* ───────────── Scroll restore ───────────── */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

/* ───────────── Modern Skeleton Loader ───────────── */
const PageLoader = () => (
  <div className="min-h-[60vh] max-w-7xl mx-auto px-6 py-8 animate-pulse">
    
    <div className="h-8 w-52 bg-gray-200 rounded mb-3" />
    <div className="h-4 w-72 bg-gray-200 rounded mb-8" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-56 bg-gray-200 rounded-xl" />
      ))}
    </div>

  </div>
);

/* ───────────── 404 ───────────── */
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
    <h1 className="text-5xl font-bold mb-2">404</h1>
    <p className="text-gray-500 mb-4">Page Not Found</p>

    <Link
      to="/"
      className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
    >
      ← Back Home
    </Link>
  </div>
);

/* ───────────── Page Transition ───────────── */
function AnimatedOutlet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

/* ───────────── Root Layout ───────────── */
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      <ScrollToTop />

      {/* Header always visible */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatedOutlet />
        </Suspense>
      </main>

      {/* Footer stays bottom */}
      <Footer />

    </div>
  );
}

/* ───────────── Router ───────────── */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [

      { path: "/", element: <HomePage /> },

      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/:slug", element: <ShopPage /> },

      { path: "/category/:slug", element: <CategoryPage /> },
      { path: "/product/:slug", element: <ProductPage /> },

      { path: "/blogs", element: <BlogListPage /> },
      { path: "/blog/:slug", element: <BlogDetail /> },

      { path: "/aboutus", element: <AboutPage /> },

      { path: "/review/:slug", element: <ReviewPage /> },

      { path: "*", element: <NotFound /> },

    ],
  },
]);