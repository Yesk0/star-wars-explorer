import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
    <Footer />
  </div>
);

export default Layout;
