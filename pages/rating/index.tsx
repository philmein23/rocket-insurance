/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { Panel } from "../../components/Panel";
import { useForm } from "react-hook-form";
import { createQuote, parseQuoteBody } from "../../utils/api";

interface RatingInput {
    firstName: string;
    lastName: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal: string;
}

export default function Rating() {
    const { register, handleSubmit } = useForm<RatingInput>();
    const [rating, setRating] = useState<RatingInput | undefined>();
    const [isProcessing, setProcessing] = useState(false);
    const { push } = useRouter();

    const next = (data) => {
        setProcessing(true);
        createQuote(parseQuoteBody(data))
            .then((d) => {
                // cache data into local storage to be consumed in next page
                localStorage.setItem("quote", JSON.stringify(d));

                push("/quote");
            })
            .catch((error) => {
                return new Error(`Error at ${error}`);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    const formContainer = css({
        ">div:last-of-type": {
            marginTop: "20px",
        },
    });

    const policy = css({
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "150px 150px",
        "> span": {
            gridColumn: "1/-1",
        },
        marginBottom: "30px",
    });

    const address = css({
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(3, 150px)",
        "> span, .sa-1, .sa-2": {
            gridColumn: "1/-1",
        },
    });
    const nextBtn = css({
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#000",
        color: "#FFF",
        padding: "10px 15px",
        cursor: "pointer",
        letterSpacing: "1.5px",
    });

    const label = css({
        display: "block",
        fontSize: "20px",
        fontWeight: "500",
    });
    return (
        <Panel>
            <form data-testid="rating-form" css={formContainer} onSubmit={handleSubmit(next)}>
                <div css={policy}>
                    <span css={label}>Policy Holder</span>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" {...register("firstName", { required: true })} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" {...register("lastName", { required: true })} />
                    </div>
                </div>
                <div css={address}>
                    <span css={label}>Address</span>
                    <div className="sa-1">
                        <label htmlFor="line1">Street Address</label>
                        <input type="text" id="line1" {...register("line1", { required: true })} />
                    </div>
                    <div className="sa-2">
                        <label htmlFor="line2">Street Address 2</label>
                        <input type="text" id="line2" {...register("line2")} />
                    </div>

                    <div className="city">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" {...register("city", { required: true })} />
                    </div>

                    <div className="state">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" {...register("state", { required: true })} />
                    </div>

                    <div className="postal">
                        <label htmlFor="postal">Postal Code</label>
                    <input type="text" id="postal" {...register("postal", { required: true })} />
                    </div>
                </div>
                <div>
                    <button type="submit" css={nextBtn}>
                        {isProcessing ? <span>Processing...</span> : <span>Next</span>}
                    </button>
                </div>
            </form>
        </Panel>
    );
}
