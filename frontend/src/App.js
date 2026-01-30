import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RoomsPage from "./pages/RoomsPage";
import AmenitiesPage from "./pages/AmenitiesPage";
import WeddingsPage from "./pages/WeddingsPage";
import CorporatePage from "./pages/CorporatePage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          style: {
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/amenities" element={<AmenitiesPage />} />
            <Route path="/weddings" element={<WeddingsPage />} />
            <Route path="/corporate" element={<CorporatePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
