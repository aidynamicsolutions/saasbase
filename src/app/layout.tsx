import './globals.css'
import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

import { cn, constructMetadata } from '@/lib/utils'
import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import TRPCProvider from '@/components/TRPCProviders'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export const viewport: Viewport = {
  themeColor: '#FFF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <TRPCProvider>
        <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
          <Toaster />
          <Navbar />
          {children}
        </body>
      </TRPCProvider>
    </html>
  )
}
