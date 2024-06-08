import type { AppProps } from 'next/app'
import './globals.css'
import { BaseLayout } from '@/widgets/layouts';
 
export function App({ Component, pageProps }: AppProps) {

  return ( 
    <BaseLayout>
      <Component {...pageProps}/>
    </BaseLayout>
  );
}