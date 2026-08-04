import { describe, it, expect } from "vitest";
import Profile from "../Profile";
import { render, screen } from "@testing-library/react"

describe("math", () => {
    it("adds correctly", () => {
        expect(2 + 3).toBe(5);
    });

    it("multiplies correctly", () => {
        expect(4 * 5).toBe(20);
    });
});

// Component Rendering (or Not)
describe("Profile Component Rendering", () => {
    it("Initial Render of Profile Component", () => {
        render(<Profile />);
    });
});
// All Contents and Texts are Correct (or Not)
// Triggering Error message (or Not)
// User can search or type in Search bar
// Loading is working (or Not) after User input
// Profile Details fetched Correctly (or Not)
