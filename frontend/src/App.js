import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import RequireAuth from "@/components/RequireAuth";
import { ContentProvider } from "@/lib/ContentContext";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);
    return null;
}

function PublicLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}

function App() {
    return (
        <div className="App">
            <ContentProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PublicLayout>
                                    <Home />
                                </PublicLayout>
                            }
                        />
                        <Route
                            path="/menu"
                            element={
                                <PublicLayout>
                                    <Menu />
                                </PublicLayout>
                            }
                        />
                        <Route
                            path="/about"
                            element={
                                <PublicLayout>
                                    <About />
                                </PublicLayout>
                            }
                        />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route
                            path="/admin"
                            element={
                                <RequireAuth>
                                    <AdminDashboard />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <PublicLayout>
                                    <Home />
                                </PublicLayout>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ContentProvider>
        </div>
    );
}

export default App;
