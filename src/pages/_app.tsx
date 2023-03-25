import { ThemeProvider } from '@mui/material/styles';
import { Roboto } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'assets/styles/global.scss';
import { AuthProvider, LayoutProvider, ModalProvider } from 'contexts';
import Modal from 'contexts/ModalContext';
import { AppLayout } from 'layout';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { theme } from 'theme';
const roboto = Roboto({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['400', '700'] });
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getNestedLayout?: (page: React.ReactElement) => React.ReactNode;
  // MainLayout?: ({children}: {children: React.ReactNode}) => React.ReactNode;
  MainLayout?: React.FC<{ children: React.ReactNode }>;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // useVerifySubdomain();
  const getNestedLayout = Component.getNestedLayout || ((page) => page);
  function MainLayout({ children }: { children: React.ReactNode }) {
    const Layout = Component.MainLayout ? Component.MainLayout : AppLayout;
    return <Layout>{children}</Layout>;
  }
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <LayoutProvider>
              <AuthProvider>
                <MainLayout>{getNestedLayout(<Component {...pageProps} />)}</MainLayout>
              </AuthProvider>
            </LayoutProvider>
            <Modal />
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
