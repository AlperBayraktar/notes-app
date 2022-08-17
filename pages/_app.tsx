// import "../styles/variables.less";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../state/store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <div style={{ maxWidth: "685px", margin: "auto" }}>
                <Component {...pageProps} />
            </div>
        </Provider>
    );
}

export default MyApp;
