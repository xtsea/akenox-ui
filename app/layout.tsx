import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AkenoX API',
  description: 'Created with AkenoX API',
  generator: 'xpushz.t.me',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
