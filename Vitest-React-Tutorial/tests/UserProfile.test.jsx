import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProfile from "../components/UserProfile";


describe('User Profile', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("fetches and displays the user data", async () => {
        global.fetch.mockResolvedValueOnce({
            json: async () => ({ id: 4, name: "John", email: "john@gmail.com" }),
        });
        render(<UserProfile userId={4} />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /^john$/i })).toBeInTheDocument();
            expect(screen.getByText(/^john@gmail\.com$/i)).toBeInTheDocument();
        });

    });
})