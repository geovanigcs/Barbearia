import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "./_components/footer"
import { AuthProvider } from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gigio's Barber",
  description: "Barber app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" />
      <body className={`${inter.className} dark`}>
        {children}
        <AuthProvider>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
