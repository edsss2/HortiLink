// src/components/Layout.jsx
import React from "react";
import { HortiNavbar } from './Navbar.jsx' 
import { HortiFooter } from './Footer.jsx' 

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar no topo */}
      <HortiNavbar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Footer no final */}
      <HortiFooter />
    </div>
  );
};

export default Layout;
