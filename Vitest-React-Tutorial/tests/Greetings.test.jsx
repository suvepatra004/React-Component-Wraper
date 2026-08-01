import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greetings from "../components/Greetings";

describe("Greetings", () => {
    it("Render Default Greeting message", () => {
        render(<Greetings />);
        // expect(screen.queryByText("Hello "));
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    })
    it("Render Greeting message using prop", ({ name }) => {
        render(<Greetings name={name} />)
        expect(screen.getByText(`Hello ${name}`)).toBeInTheDocument();
    })
})