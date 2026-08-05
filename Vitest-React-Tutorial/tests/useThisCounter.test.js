import { describe, it, expect } from "vitest";
import { renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCounter } from "../hooks/useCounter";

describe("useCounter", () => {
    it("Initial value of useCouter", () => {
        expect(useCounter()).toBe(0);
    })
    it("Increment of counter")
    it("Decrement of counter")
})