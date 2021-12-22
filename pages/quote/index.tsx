import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import { Panel } from "../../components/Panel";
import Link from 'next/link';

export default function Quote() {
    const [ quote, setQuote ] = useState({});
    useEffect(() => {
        const data = localStorage.getItem("quote");
       
        setQuote(JSON.parse(data));
    }, []) 

    console.log("QUOTE: ", quote)

    return (
        <Panel>
            <div>
                <Link href="/rating">Back</Link>
            </div>
            <form></form>
        </Panel>
    );
}
