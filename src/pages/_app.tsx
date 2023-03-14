import { ThemeProvider } from '@mui/material/styles';
import { Roboto } from '@next/font/google';
import 'assets/styles/global.scss';
import { Layout } from 'layout';
import type { AppProps } from 'next/app';
import { theme } from 'theme';
const roboto = Roboto({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['400', '700'] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
