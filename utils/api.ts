const BASE_URL = "https://fed-challenge-api.sure.now.sh/api/v1/quotes";

export interface Quote {
    first_name: string;
    last_name: string;
    address: {
        line_1: string;
        line_2: string;
        city: string;
        region: string;
        postal: string;
    };
}

export interface QuoteUpdatePayload {
    quoteId: string;
    rating_address: {
        line_1: string;
        line_2: string;
        city: string;
        region: string;
        postal: string;
    };
    policy_holder: {
        first_name: string;
        last_name: string;
    };
    variable_selections: {
        deductible: number;
        asteroid_collision: number;
    };
}

export const parseQuoteBody = (body): Quote => {
    return {
        first_name: body.firstName,
        last_name: body.lastName,
        address: {
            line_1: body.line1,
            line_2: body.line2,
            city: body.city,
            region: body.state,
            postal: body.postal,
        },
    };
};

export const parseQuoteUpdatePayload = (body): QuoteUpdatePayload => {
    return {
        quoteId: body.quoteId,
        rating_address: {
            ...body.rating_address,
        },
        policy_holder: {
            ...body.policy_holder,
        },
        variable_selections: {
            deductible: Number(body.deductibleValue),
            asteroid_collision: Number(body.asteroidCollisionValue),
        },
    };
};

export const createQuote = async (body: Quote) => {
    const config = {
        method: "post",
        body: JSON.stringify(body),
    };
    const response = await fetch(BASE_URL, config);

    return response.json();
};

export const updateQuote = async (quote: QuoteUpdatePayload, quoteId: string) => {
    const config = {
        method: "put",
        body: JSON.stringify({ quote }),
    };

    const response = await fetch(`${BASE_URL}/${quoteId}`, config);

    return response.json();
};
