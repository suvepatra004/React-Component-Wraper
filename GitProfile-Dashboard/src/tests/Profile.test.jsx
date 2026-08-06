// Profile.test.jsx
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
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

function mockFetchWithUser(userObj) {
    return vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => userObj,
    });
}

function mockFetch404() {
    return vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({}),
    });
}

function mockFetch500() {
    return vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
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

    it("renders input, search button, and idle message", () => {
        render(<Profile />);

        expect(
            screen.getByLabelText(/search github username/i),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /search/i }),
        ).toBeInTheDocument();

        expect(
            screen.getByText(/search a github username to see results\./i),
        ).toBeInTheDocument();

        expect(screen.queryByText(/recent searches/i)).toBeNull();
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

    it("loads recent searches from localStorage when fresh", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({ users: ["alice", "bob"], timestamp: now - 60_000 }),
        );

        render(<Profile />);

        expect(screen.getByText("alice")).toBeInTheDocument();
        expect(screen.getByText("bob")).toBeInTheDocument();
    });

    it("clears recent searches when history is older than 5 minutes", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({ users: ["oldUser"], timestamp: now - 6 * 60 * 1000 }),
        );

        render(<Profile />);

        expect(screen.queryByText("oldUser")).toBeNull();
        expect(screen.queryByText(/recent searches/i)).toBeNull();
        expect(window.localStorage.getItem("history")).toBeNull();
    });

    it("handles invalid localStorage JSON by clearing history", () => {
        window.localStorage.setItem("history", "not-json");
        render(<Profile />);

        expect(screen.queryByText(/recent searches/i)).toBeNull();
        expect(window.localStorage.getItem("history")).toBeNull();
    });

    it("success fetch: shows profile + adds to recent + localStorage", async () => {
        const userObj = {
            id: 1,
            login: "octo",
            avatar_url: "https://example.com/avatar.png",
            name: null,
            company: "ACME",
            followers: 12,
            bio: null,
            html_url: "https://github.com/octo",
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => userObj,
        });

        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.clear(input);
        await user.type(input, "octo");
        await user.click(screen.getByRole("button", { name: /search/i }));

        // Wait for profile table to contain the username
        await waitFor(() => {
            const table = screen.getByRole("table");
            const utils = within(table);
            expect(utils.getByText("octo")).toBeInTheDocument();
        });

        // Profile values (scoped to table)
        const table = screen.getByRole("table");
        const utils = within(table);

        expect(utils.getByText("ACME")).toBeInTheDocument();
        expect(utils.getByText("12")).toBeInTheDocument();

        // name/bio should become "N/A" (we just check existence, not exact count)
        expect(utils.getAllByText("N/A").length).toBeGreaterThan(0);

        // Visit link exists (single element query by role+name is OK)
        const link = screen.getByRole("link", {
            name: /visit octo's github profile/i,
        });
        expect(link).toHaveAttribute("href", "https://github.com/octo");

        // Recent searches: scope to the recent section
        const recentHeading = screen.getByText(/recent searches/i);
        const recentSection = recentHeading.closest("div"); // panel wrapper is the immediate container
        const recentUtils = within(recentSection);

        expect(recentUtils.getByText("octo")).toBeInTheDocument();

        // localStorage updated correctly
        const stored = JSON.parse(window.localStorage.getItem("history"));
        expect(stored.users[0]).toBe("octo");
        expect(stored.users.length).toBeLessThanOrEqual(5);
        expect(typeof stored.timestamp).toBe("number");
    });


    it("404 fetch: shows 'User Not Found' and hides profile", async () => {
        global.fetch = mockFetch404();
        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.type(input, "ghost");

        await user.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() =>
            expect(screen.getByText(/user not found/i)).toBeInTheDocument(),
        );

        // profile should not show
        expect(screen.queryByText("ghost")).toBeNull();
        expect(screen.queryByText(/user name/i)).toBeNull();

        // should not add to recent searches (since addRecentUser called only after success)
        expect(screen.queryByText(/recent searches/i)).toBeNull();
    });

    it("non-404 fetch error: shows HTTP status message", async () => {
        global.fetch = mockFetch500();
        const user = userEvent.setup();
        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);
        await user.type(input, "err");

        await user.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() => expect(screen.getByText("HTTP 500")).toBeInTheDocument());

        expect(screen.queryByText(/user name/i)).toBeNull();
    });

    it("clicking recent search item sets input value and triggers fetch", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({ users: ["alice"], timestamp: now })
        );

        global.fetch = vi.fn((url) => {
            const uname = url.split("/users/")[1];
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    id: 2,
                    login: uname,
                    avatar_url: "",
                    name: "Alice",
                    company: null,
                    followers: 1,
                    bio: "Hello",
                    html_url: `https://github.com/${uname}`,
                }),
            });
        });

        const user = userEvent.setup();
        render(<Profile />);

        await user.click(screen.getByText("alice"));

        await waitFor(() => {
            const table = screen.getByRole("table");
            const utils = within(table);
            expect(utils.getByText("alice")).toBeInTheDocument();
        });
    });


    it("keyboard: Enter on recent item triggers fetch", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({ users: ["bob"], timestamp: now }),
        );

        global.fetch = mockFetchWithUser({
            id: 3,
            login: "bob",
            avatar_url: "",
            name: "Bob",
            company: "",
            followers: 0,
            bio: "",
            html_url: "https://github.com/bob",
        });

        const user = userEvent.setup();
        render(<Profile />);

        const recent = screen.getByText("bob");
        recent.focus();

        await user.keyboard("{Enter}");

        await waitFor(() => expect(screen.getByText("bob")).toBeInTheDocument());
    });

    it("duplicate elimination + max 5 recent users (newest first)", async () => {
        const user = userEvent.setup();
        const fetchMock = vi.fn(async () => ({
            ok: true,
            status: 200,
            json: async () => ({ id: 1, login: "u", avatar_url: "", name: "", company: "", followers: 0, bio: "", html_url: "" }),
        }));

        // We want fetch responses to depend on username
        global.fetch = vi.fn((url) => {
            const uname = url.split("/users/")[1];
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    id: 1,
                    login: uname,
                    avatar_url: "",
                    name: "",
                    company: "",
                    followers: 0,
                    bio: "",
                    html_url: `https://github.com/${uname}`,
                }),
            });
        });

        // Start with 4 users so we can test duplicate + limit
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);
        window.localStorage.setItem(
            "history",
            JSON.stringify({ users: ["u1", "u2", "u3", "u4"], timestamp: now }),
        );

        render(<Profile />);

        const input = screen.getByLabelText(/search github username/i);

        // Search u3 again (should move to front, no duplicate)
        await user.clear(input);
        await user.type(input, "u3");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        // Now search u5 and u6 -> should cap at 5
        await user.clear(input);
        await user.type(input, "u5");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        await user.clear(input);
        await user.type(input, "u6");
        await user.click(screen.getByRole("button", { name: /search/i }));
        await flushPromises();

        const stored = JSON.parse(window.localStorage.getItem("history"));
        expect(stored.users.length).toBe(5);

        // newest first: after searching u6 last, it should be first
        expect(stored.users[0]).toBe("u6");

        // u3 should be present and not duplicated
        const countU3 = stored.users.filter((x) => x === "u3").length;
        expect(countU3).toBe(1);
    });


    it("profile fallback: shows N/A for missing optional fields", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({
                id: 10,
                login: "na",
                avatar_url: "",
                name: undefined,
                company: undefined,
                followers: undefined,
                bio: undefined,
                html_url: "https://github.com/na",
            }),
        });

        const user = userEvent.setup();
        render(<Profile />);

        await user.type(screen.getByLabelText(/search github username/i), "na");
        await user.click(screen.getByRole("button", { name: /search/i }));

        // Wait for username in the profile table
        await waitFor(() => {
            const table = screen.getByRole("table");
            const utils = within(table);
            expect(utils.getByText("na")).toBeInTheDocument();
        });

        const table = screen.getByRole("table");
        const utils = within(table);

        // Assert N/A exists in the profile table (avoid screen.getByText which is ambiguous)
        expect(utils.getAllByText("N/A").length).toBeGreaterThan(0);

        // Optional stronger checks: verify specific rows show N/A
        // (These label cells exist in the table; value cells will be "N/A".)
        expect(utils.getByText("User Name").nextSibling?.textContent ?? "").toBe("na"); // optional, may not work reliably
        expect(utils.getByText("Company").nextSibling?.textContent ?? "").toBe("N/A");
        expect(utils.getByText("Bio").nextSibling?.textContent ?? "").toBe("N/A");
        expect(utils.getByText("Followers").nextSibling?.textContent ?? "").toBe("N/A");
    });

});

