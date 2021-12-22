import { cleanup, render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Rating from "../pages/rating";
const useRouter = jest.spyOn(require("next/router"), "useRouter");

jest.mock("../utils/api", () => {
    return {
        createQuote: jest.fn(() => Promise.resolve({})),
    };
});

beforeEach(() => {
    jest.clearAllMocks()
    useRouter.mockImplementationOnce(() => ({
        route: "/",
        pathname: "",
        query: "",
        asPath: "",
        push: jest.fn(),
    }));
});

describe("Rating", () => {
    it("should render Rating component", async () => {
        render(<Rating />);

        const ratingForm = screen.getByTestId("rating-form");

        expect(ratingForm).toBeInTheDocument();
    });

    it("should call createQuote with necessary data", async () => {
        render(<Rating />);
        fireEvent.input(screen.getByLabelText("First Name"), { target: { value: "Phil" } });
        fireEvent.input(screen.getByLabelText("Last Name"), { target: { value: "Nguyen" } });

        fireEvent.input(screen.getByLabelText("Street Address"), { target: { value: "123 Cool St." } });
        fireEvent.input(screen.getByLabelText("City"), { target: { value: "Los Angeles" } });
        fireEvent.input(screen.getByLabelText("State"), { target: { value: "CA" } });
        fireEvent.input(screen.getByLabelText("Postal Code"), { target: { value: "12345" } });

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => {});
    });
});
