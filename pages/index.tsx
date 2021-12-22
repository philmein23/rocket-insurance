/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { Panel } from "../components/Panel";

export default function Home() {
    const container = css({
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
    });

    const mainTitle = css({
        fontSize: "30px",
        letterSpacing: "1.5px",
        marginBottom: '10px'
    });

    const startBtn = css({
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#000",
        color: "#FFF",
        padding: "10px 15px",
        cursor: "pointer",
        letterSpacing: "1.5px",
    })
    return (
        <Panel>
            <main css={container}>
                <span css={mainTitle}>Rocket Insurance</span>

                <div>
                    <Link href="/rating">
                        <button css={startBtn}>Start</button>
                    </Link>
                </div>
            </main>
        </Panel>
    );
}
