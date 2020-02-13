import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import './styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <React.Fragment>
    <Head>
      <title>Hacker News Top 30</title>
      <script src="https://cdn.firebase.com/js/client/1.1.0/firebase.js" />
    </Head>
    <Component {...pageProps} />
  </React.Fragment>
);

export default MyApp;
