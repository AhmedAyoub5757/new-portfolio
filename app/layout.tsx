import Navbar from "../components/Navbar";
import LenisProvider from "../components/LenisProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}