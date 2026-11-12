import "./globals.css";

export const metadata = {
  title: "To Do List em React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
