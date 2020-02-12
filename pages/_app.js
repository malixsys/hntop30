import 'semantic-ui-css/semantic.min.css'
import Head from 'next/head'
import './styles.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Hacker News Top 30</title>
      <script src="https://cdn.firebase.com/js/client/1.1.0/firebase.js"/>
    </Head>
    <Component {...pageProps} />
    </>
}

export default MyApp
