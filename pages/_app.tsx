import { AppProps } from "next/dist/shared/lib/router/router";
import theme from "../styled/theme";
import { ThemeProvider } from "styled-components";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
