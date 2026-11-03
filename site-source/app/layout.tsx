import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '余白 | 学びと仕事の記録', description: '日々の学びを静かに振り返る記録帳' };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ja"><body>{children}</body></html>}
