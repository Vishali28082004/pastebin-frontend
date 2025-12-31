import './globals.css'

export const metadata = {
  title: 'Pastebin Lite - Share Your Code',
  description: 'Create and share temporary text pastes with TTL and view limits',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}