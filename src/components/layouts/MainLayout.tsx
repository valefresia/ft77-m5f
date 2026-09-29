import type { ReactNode } from "react";
import type { StoreRoute } from "../../types/store";
import { Footer } from "../common/Footer";
import { Header } from "../common/header";

type MainLayoutProps = {
  children: ReactNode;
  onNavigate: (path: string) => void;
  currentRoute: StoreRoute;
};

export function MainLayout({
  children,
  onNavigate,
  currentRoute,
}: MainLayoutProps) {
  return (
    <>
      <Header onNavigate={onNavigate} currentRoute={currentRoute} />
      <main>{children}</main>
      <Footer onNavigate={onNavigate} />
    </>
  );
}
