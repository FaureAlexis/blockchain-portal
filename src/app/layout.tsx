import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blockchain portal',
  description: 'Sample app to interact with web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-gray-200'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
