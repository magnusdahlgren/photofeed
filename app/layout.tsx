import "../styles/variables.css";
import "../styles/globals.css";
import "../styles/photofeed.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Magnus×365",
};

export default function PhotofeedLayout({
  photomodal,
  children,
}: Readonly<{
  photomodal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {photomodal}
        <SpeedInsights />
      </body>
    </html>
  );
}
