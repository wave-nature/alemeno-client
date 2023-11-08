import React from "react";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center">{children}</main>
    </>
  );
}

export default Layout;
