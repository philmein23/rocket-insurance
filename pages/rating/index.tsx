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
    const { push } = useRouter();

    const next = (data) => {
        createQuote(parseQuoteBody(data))
            .then((d) => {
                localStorage.setItem("quote", JSON.stringify(d));

                push("/quote");
            })
            .catch((error) => {
                return new Error(`Error at ${error}`);
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
        marginBottom: '30px'
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
            <form css={formContainer} onSubmit={handleSubmit(next)}>
                <div css={policy}>
                    <span css={label}>Policy Holder</span>
                    <div>
                        <label>First Name</label>
                        <input type="text" {...register("firstName", { required: true })} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" {...register("lastName", { required: true })} />
                    </div>
                </div>
                <div css={address}>
                    <span css={label}>Address</span>
                    <div className="sa-1">
                        <label>Street Address</label>
                        <input type="text" {...register("line1", { required: true })} />
                    </div>
                    <div className="sa-2">
                        <label>Street Address 2</label>
                        <input type="text" {...register("line2")} />
                    </div>

                    <div className="city">
                        <label>City</label>
                        <input type="text" {...register("city", { required: true })} />
                    </div>

                    <div className="state">
                        <label>State</label>
                        <input type="text" {...register("state", { required: true })} />
                    </div>

                    <div className="postal">
                        <label>Postal Code</label>
                        <input type="text" {...register("postal", { required: true })} />
                    </div>
                </div>
                <div>
                    <button type="submit" css={nextBtn}>
                        Next
                    </button>
                </div>
            </form>
        </Panel>
    );
}
