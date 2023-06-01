import '../styles/globals.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout/Layout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        autoClose={1500}
      />
    </>
  )
}

export default MyApp
