/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const container = css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    });
    return (
        <div css={container}>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
