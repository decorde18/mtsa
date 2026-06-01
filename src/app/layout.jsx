import "../styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: "MTSA Registrations",
  description: "Secure admin login and password recovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
