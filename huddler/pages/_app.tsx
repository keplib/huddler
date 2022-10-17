import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Amplify, Auth } from 'aws-amplify';
import { AuthProvider } from '../src/contexts/AuthContext';

import awsconfig from '../src/aws-exports';
Amplify.configure({awsconfig, ssr: true });
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;

