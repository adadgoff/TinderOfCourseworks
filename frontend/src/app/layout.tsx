import "@/app/_styles/global.scss";
import localFont from "next/font/local";
import ThemeProvider from "./_providers";
import { FooterHeaderLayout } from "@/widgets/layouts";

const HSESans = localFont({
  display: "swap",
  src: [
    {
      path: "../../public/fonts/HSESans-Black.otf",
      style: "normal",
      weight: "900",
    },
    {
      path: "../../public/fonts/HSESans-Bold.otf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../public/fonts/HSESans-Italic.otf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../public/fonts/HSESans-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/HSESans-SemiBold.otf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/fonts/HSESans-Thin.otf",
      style: "normal",
      weight: "200",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={HSESans.className}
      dir="ltr"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FooterHeaderLayout>{children}</FooterHeaderLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
