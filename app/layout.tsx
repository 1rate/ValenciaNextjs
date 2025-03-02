import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Providers } from '@/components/shared/providers';
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
        {children}
        <Providers />
      </body>
    </html>
  );
}




// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Nunito } from "next/font/google";
// import { Suspense } from "react";
// import "./globals.css";
// import { Header } from "@/components/shared/header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const nunito = Nunito({
//   subsets: ['cyrillic'],
//   variable: '--font-nunito',
//   weight: ['400', '500', '600', '700', '800', '900'],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Valencia",
//   description: "Валенсия тортики купить торты пермь",
// };

// export function generateViewport() {
//   return { width: "device-width", initialScale: 1, viewportFit: "cover" };
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         // className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         className={nunito.className}>
//         <main className="min-h-screen">
//           <Suspense>
//           <Header />
//           </Suspense>
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }
