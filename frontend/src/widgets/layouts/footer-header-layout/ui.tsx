import { Hr } from "@/shared/ui/hr";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { ReactNode } from "react";

export function FooterHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Hr />
      {children}
      <Hr />
      <Footer />
    </>
  );
}
