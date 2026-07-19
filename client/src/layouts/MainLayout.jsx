import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import BackToTop from "../components/layout/BackToTop";

const MainLayout = ({ children }) => {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default MainLayout;