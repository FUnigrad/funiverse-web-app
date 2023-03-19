import { ThemeProvider } from '@mui/material/styles';
import { Roboto } from '@next/font/google';
import 'assets/styles/global.scss';
import { LayoutProvider } from 'contexts';
import Modal, { ModalProvider } from 'contexts/ModalContext';
import { Layout } from 'layout';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { theme } from 'theme';
const roboto = Roboto({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['400', '700'] });
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <LayoutProvider>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          </LayoutProvider>
          <Modal />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}
