// Profile.test.jsx
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "../Profile";

const flushPromises = () => new Promise((r) => setTimeout(r, 0));

function mockLocalStorage() {
    let store = {};
    const localStorageMock = {
        getItem: (key) => (key in store ? store[key] : null),
        setItem: (key, value) => {
            store[key] = String(value);
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };

    Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
        writable: true,
    });
}

/**
 * Mock GitHub Search API response
 * Always returns { items: [...], total_count }
 */
function mockSearchResults(items = [], totalCount = 0) {
    return vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
            items,
            total_count: totalCount,
        }),
    });
}

/**
 * Mock GitHub Search API error response
 */
function mockSearchError(statusCode) {
    return vi.fn().mockResolvedValue({
        ok: false,
        status: statusCode,
        json: async () => ({}),
    });
}

describe("Profile component", () => {
    beforeEach(() => {
        mockLocalStorage();
        vi.restoreAllMocks();
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    it("renders input, search button, and idle message on mount", () => {
        render(<Profile />);

        // Input and button should render
        expect(
            screen.getByLabelText(/search github username/i),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /search/i }),
        ).toBeInTheDocument();

        // Idle message should display
        expect(
            screen.getByText(/search a github username to see results\./i),
        ).toBeInTheDocument();
    });

    it("shows error 'Set username' on empty submit and does not call fetch", async () => {
        const fetchMock = vi.fn();
        global.fetch = fetchMock;

        const user = userEvent.setup();
        render(<Profile />);

        const btn = screen.getByRole("button", { name: /search/i });
        await user.click(btn);

        expect(screen.getByText(/set username/i)).toBeInTheDocument();
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("successful search displays UserCard results and adds to recent searches", async () => {
        const mockItems = [
            {
                id: 1,
                login: "octo",
                avatar_url: "https://example.com/octo.png",
            },
            {
                id: 2,
                login: "github",
                avatar_url: "https://example.com/github.png",
            },
        ];

        global.fetch = mockSearchResults(mockItems, 2);

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.clear(input);
        await user.type(input, "octo");
        await user.click(screen.getByRole("button", { name: /search/i }));

        // Wait for search results to render (UserCard components)
        await waitFor(() => {
            expect(screen.getByText("octo")).toBeInTheDocument();
            expect(screen.getByText("github")).toBeInTheDocument();
        });

        // Verify recent search was added to localStorage
        const stored = JSON.parse(window.localStorage.getItem("history"));
        expect(stored.users[0]).toBe("octo");
        expect(typeof stored.timestamp).toBe("number");
    });

    it("displays 'User Not Found' when search returns no results", async () => {
        global.fetch = mockSearchResults([], 0); // Empty results

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.type(input, "nonexistentuser");
        await user.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() => {
            expect(screen.getByText(/user not found/i)).toBeInTheDocument();
        });

        // Should not add to recent searches on 404
        expect(window.localStorage.getItem("history")).toBeNull();
    });

    it("displays HTTP error status on server error", async () => {
        global.fetch = mockSearchError(500);

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.type(input, "err");
        await user.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() => {
            expect(screen.getByText("HTTP 500")).toBeInTheDocument();
        });
    });

    it("displays error on 404 fetch error", async () => {
        global.fetch = mockSearchError(404);

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.type(input, "notfound");
        await user.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() => {
            expect(screen.getByText(/user not found/i)).toBeInTheDocument();
        });
    });

    it("search button shows 'Searching...' while fetching", async () => {
        let resolveSearch;
        const searchPromise = new Promise((resolve) => {
            resolveSearch = resolve;
        });

        global.fetch = vi.fn().mockReturnValue(searchPromise);

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.type(input, "test");

        const btn = screen.getByRole("button", { name: /search/i });
        await user.click(btn);

        // Button should show loading state
        expect(screen.getByRole("button", { name: /searching\.\.\./i })).toBeInTheDocument();

        // Resolve the fetch
        resolveSearch({
            ok: true,
            status: 200,
            json: async () => ({ items: [], total_count: 0 }),
        });

        await waitFor(() => {
            expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
        });
    });

    it("loads more pagination: adds next page results to results list", async () => {
        const firstPageItems = [
            { id: 1, login: "u1", avatar_url: "" },
            { id: 2, login: "u2", avatar_url: "" },
        ];
        const secondPageItems = [
            { id: 3, login: "u3", avatar_url: "" },
            { id: 4, login: "u4", avatar_url: "" },
        ];

        global.fetch = vi.fn((url) => {
            if (url.includes("page=2")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: async () => ({
                        items: secondPageItems,
                        total_count: 4,
                    }),
                });
            }
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    items: firstPageItems,
                    total_count: 4,
                }),
            });
        });

        const user = userEvent.setup();
        render(<Profile />);

        // Initial search
        const input = screen.getByLabelText(/search github username/i);
        await user.type(input, "u");
        await user.click(screen.getByRole("button", { name: /search/i }));

        // Wait for first page results
        await waitFor(() => {
            expect(screen.getByText("u1")).toBeInTheDocument();
        });

        // Click load more
        const loadMoreBtn = screen.getByRole("button", { name: /load more/i });
        await user.click(loadMoreBtn);

        // Wait for second page results to be added
        await waitFor(() => {
            expect(screen.getByText("u3")).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it("recent searches history persists across searches via localStorage", async () => {
        global.fetch = vi.fn((url) => {
            const uname = url.includes("u1") ? "u1" : "u2";
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    items: [{ id: 1, login: uname, avatar_url: "" }],
                    total_count: 1,
                }),
            });
        });

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);

        // First search
        await user.type(input, "u1");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        // Second search
        await user.clear(input);
        await user.type(input, "u2");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        const stored = JSON.parse(window.localStorage.getItem("history"));
        expect(stored.users[0]).toBe("u2");
        expect(stored.users[1]).toBe("u1");
        expect(stored.users.length).toBe(2);
    });

    it("duplicate elimination: re-searching same user moves it to front without duplication", async () => {
        global.fetch = vi.fn((url) => {
            const uname = url.includes("u3") ? "u3" : "u";
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    items: [{ id: 1, login: uname, avatar_url: "" }],
                    total_count: 1,
                }),
            });
        });

        // Start with 3 users in history
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);
        window.localStorage.setItem(
            "history",
            JSON.stringify({ users: ["u1", "u2", "u3"], timestamp: now }),
        );

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);

        // Re-search u3
        await user.type(input, "u3");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        const stored = JSON.parse(window.localStorage.getItem("history"));

        // u3 should be first, no duplicates
        expect(stored.users[0]).toBe("u3");
        expect(stored.users.filter((x) => x === "u3").length).toBe(1);
        expect(stored.users).toEqual(["u3", "u1", "u2"]);
    });

    it("limits recent searches to max 5 users, newest first", async () => {
        global.fetch = vi.fn((url) => {
            const uname = url.includes("u4") ? "u4" : url.includes("u5") ? "u5" : url.includes("u6") ? "u6" : "u";
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    items: [{ id: 1, login: uname, avatar_url: "" }],
                    total_count: 1,
                }),
            });
        });

        // Start with 4 users
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);
        window.localStorage.setItem(
            "history",
            JSON.stringify({ users: ["u1", "u2", "u3", "u4"], timestamp: now }),
        );

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);

        // Add u5 (should have 5 total: u5, u1, u2, u3, u4)
        await user.type(input, "u5");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        // Add u6 (should cap at 5: u6, u5, u1, u2, u3)
        await user.clear(input);
        await user.type(input, "u6");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        const stored = JSON.parse(window.localStorage.getItem("history"));
        expect(stored.users.length).toBe(5);
        expect(stored.users[0]).toBe("u6");
        expect(stored.users).not.toContain("u4");
    });
});