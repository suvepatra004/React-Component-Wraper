import { describe, it, expect } from "vitest";
import { act, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
    it("Initial value of useCouter (5)", () => {
        const {result} = renderHook(() => useCounter(5))
        expect(result.current.count).toBe(5);
    })
    it("Increment of counter", () => {
        const {result} = renderHook(() => useCounter(5))
        expect(result.current.count).toBe(5)

        act(() => {
            result.current.increment();
        })
        expect(result.current.count).toBe(6)
    })
    it("Decrement of counter", () => {
        const {result} = renderHook(() => useCounter(5))
        expect(result.current.count).toBe(5)
        act(() => {
            result.current.decrement();
        })
        expect(result.current.count).toBe(4)
    })
})