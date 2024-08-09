import ClientLayout from "./ClientLayout";
import "../styles/global.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Star Wars API</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="light">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
