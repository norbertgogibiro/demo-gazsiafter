import App from "next/app";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  // This object will be merged into all props
  //  of MyApp, therefore its "router" data too:
  return { ...appProps };
};

export default MyApp;
