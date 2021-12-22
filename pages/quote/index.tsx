/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { Panel } from "../../components/Panel";
import { updateQuote, parseQuoteUpdatePayload } from "../../utils/api";
import Link from "next/link";

type Premium = number;

interface Quote {
    quote: {
        quoteId: string;
        rating_address: {
            line_1: string;
            line_2: string;
            city: string;
            state: string;
            postal: string;
        };
        postal_holder: {
            first_name: string;
            last_name: string;
        };
        variable_selections: {
            deductible: number;
            asteroid_collision: number;
        };
        variable_options: {
            deductible: {
                title: string;
                description: string;
                values: [number];
                default: number;
            };
            asteroid_collision: {
                title: string;
                description: string;
                values: [number];
                default: number;
            };
        };
        premium: number;
    };
}

export default function Quote() {
    const [quoteData, setQuote] = useState<Quote>();
    const [isProcessing, setProcessing] = useState(false);
    const [premium, setPremium] = useState<Premium | null>(null);
    const { register, handleSubmit, getValues } = useForm();

    const onConfirm = (data) => {
        const body = {
            ...quoteData.quote,
            asteroidCollisionValue: getValues("asteroidCollisionValue") || quoteData.quote.variable_selections.asteroid_collision,
            deductibleValue: getValues("deductibleValue") || quoteData.quote.variable_selections.deductible,
        };

        setProcessing(true);

        updateQuote(parseQuoteUpdatePayload(body), body.quoteId)
            .then((data) => {
                setPremium(data.quote.premium);
            })
            .catch((error) => {
                return Error(`Error at: ${error}`);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    useEffect(() => {
        // grab quote from cache then load into memory via setQuote.
        const data = localStorage.getItem("quote");

        setQuote(JSON.parse(data));
    }, []);

    const title = css({
        display: "block",
        fontSize: "18px",
        fontWeight: 600,
    });

    const container = css({
        padding: "10px 15px",
    });

    const btnContainer = css({
        display: "flex",
        gap: "10px",
        alignItems: "center",
        paddingLeft: "15px",
    });

    const confirmBtn = css({
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#000",
        color: "#FFF",
        padding: "10px 15px",
        cursor: "pointer",
        letterSpacing: "1.5px",
    });

    const mainContainer = css({
        display: "flex",
        flexDirection: "column",
    });

    const premiumContainer = css({
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    });

    return (
        <Panel>
            <div css={mainContainer}>
                <form onSubmit={handleSubmit(onConfirm)}>
                    <div css={container}>
                        <span css={title}>{quoteData?.quote?.variable_options?.asteroid_collision.title}</span>
                        <span>{quoteData?.quote?.variable_options?.asteroid_collision.description}</span>
                        <div>
                            {quoteData?.quote?.variable_options?.asteroid_collision.values.map((val, index) => {
                                return (
                                    <label key={index}>
                                        <input type="radio" {...register("asteroidCollisionValue")} value={val} />
                                        {val}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div css={container}>
                        <span css={title}>{quoteData?.quote?.variable_options?.deductible.title}</span>
                        <span>{quoteData?.quote?.variable_options?.deductible.description}</span>
                        <div>
                            {quoteData?.quote?.variable_options?.deductible.values.map((val, index) => {
                                return (
                                    <label key={index}>
                                        <input type="radio" {...register("deductibleValue")} value={val} />
                                        {val}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div css={btnContainer}>
                        <Link href="/rating">Back</Link>
                        <button css={confirmBtn} type="submit">
                            {isProcessing ? <span>Processing...</span> : <span>Confirm</span>}
                        </button>
                    </div>
                </form>
                {premium ? <div css={premiumContainer}>Premium: ${premium} </div> : null}
            </div>
        </Panel>
    );
}
