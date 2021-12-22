const URL = "https://fed-challenge-api.sure.now.sh/api/v1/quotes";

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

export const createQuote = async (body) => {
    const config = {
        method: "post",
        body: JSON.stringify(body),
    };
    const response = await fetch(URL, config);

    return response.json();
};
