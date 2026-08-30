// RecentUser.test.jsx
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecentUser from "../../components/RecentUser";

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

describe("RecentUser component", () => {
    beforeEach(() => {
        mockLocalStorage();
        vi.restoreAllMocks();
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    it("renders nothing when no recent searches in localStorage", () => {
        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        expect(screen.queryByText(/recent searches/i)).toBeNull();
    });

    it("displays recent searches heading when history is fresh", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["alice", "bob"],
                timestamp: now - 60_000, // 1 minute ago
            }),
        );

        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        expect(screen.getByText(/recent searches/i)).toBeInTheDocument();
        expect(screen.getByText("alice")).toBeInTheDocument();
        expect(screen.getByText("bob")).toBeInTheDocument();
    });

    it("clears history when older than 5 minutes and removes from localStorage", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["oldUser"],
                timestamp: now - 6 * 60 * 1000, // 6 minutes ago
            }),
        );

        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        // Should not display recent searches
        expect(screen.queryByText(/recent searches/i)).toBeNull();
        expect(screen.queryByText("oldUser")).toBeNull();

        // Should clear from localStorage
        expect(window.localStorage.getItem("history")).toBeNull();
    });

    it("handles invalid JSON in localStorage by clearing it", () => {
        window.localStorage.setItem("history", "not-valid-json");

        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        // Should not display recent searches
        expect(screen.queryByText(/recent searches/i)).toBeNull();

        // Should remove invalid data from localStorage
        expect(window.localStorage.getItem("history")).toBeNull();
    });

    it("calls onSelectUsername callback when clicking a recent search item", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["octocat"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        const user = userEvent.setup();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        const recentItem = screen.getByText("octocat");
        await user.click(recentItem);

        expect(mockCallback).toHaveBeenCalledWith("octocat");
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it("triggers callback on Enter key when recent item is focused", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["github"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        const user = userEvent.setup();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        const recentItem = screen.getByText("github").closest("div[role='button']");

        // Focus and press Enter
        recentItem?.focus();
        await user.keyboard("{Enter}");

        expect(mockCallback).toHaveBeenCalledWith("github");
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it("triggers callback on Space key when recent item is focused", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["nodejs"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        const user = userEvent.setup();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        const recentItem = screen.getByText("nodejs").closest("div[role='button']");

        // Focus and press Space
        recentItem?.focus();
        await user.keyboard("{Space}");

        expect(mockCallback).toHaveBeenCalledWith("nodejs");
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it("does not trigger callback on other keys", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["test"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        const user = userEvent.setup();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        const recentItem = screen.getByText("test");
        recentItem.focus();

        await user.keyboard("a");

        expect(mockCallback).not.toHaveBeenCalled();
    });

    it("reloads history when recentVersion prop changes", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["alice"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        const { rerender } = render(
            <RecentUser onSelectUsername={mockCallback} recentVersion={0} />,
        );

        expect(screen.getByText("alice")).toBeInTheDocument();

        // Update history and increment recentVersion
        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["alice", "bob", "charlie"],
                timestamp: now,
            }),
        );

        rerender(
            <RecentUser onSelectUsername={mockCallback} recentVersion={1} />,
        );

        // Should now show updated list
        expect(screen.getByText("alice")).toBeInTheDocument();
        expect(screen.getByText("bob")).toBeInTheDocument();
        expect(screen.getByText("charlie")).toBeInTheDocument();
    });

    it("displays users in the correct order (newest first)", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["first", "second", "third"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        const items = screen.getAllByRole("button");
        // First button should be "first" (newest)
        expect(items[0].textContent).toContain("first");
        // Second button should be "second"
        expect(items[1].textContent).toContain("second");
        // Third button should be "third"
        expect(items[2].textContent).toContain("third");
    });

    it("handles history with max 5 users", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["u1", "u2", "u3", "u4", "u5"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        expect(screen.getByText("u1")).toBeInTheDocument();
        expect(screen.getByText("u2")).toBeInTheDocument();
        expect(screen.getByText("u3")).toBeInTheDocument();
        expect(screen.getByText("u4")).toBeInTheDocument();
        expect(screen.getByText("u5")).toBeInTheDocument();
    });

    it("does not render if history users array is empty", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: [],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        expect(screen.queryByText(/recent searches/i)).toBeNull();
    });

    it("handles missing users array in localStorage by treating as empty", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                // Missing users array
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        expect(screen.queryByText(/recent searches/i)).toBeNull();
    });

    it("highlights on hover with visual feedback", async () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        window.localStorage.setItem(
            "history",
            JSON.stringify({
                users: ["hover-test"],
                timestamp: now,
            }),
        );

        const mockCallback = vi.fn();
        const user = userEvent.setup();
        render(<RecentUser onSelectUsername={mockCallback} recentVersion={0} />);

        const item = screen.getByText("hover-test");

        // Check that item has hover styles (has className with transition-colors)
        expect(item.closest("div")?.className).toContain("hover:bg-cyan-700");
        expect(item.closest("div")?.className).toContain("cursor-pointer");
    });
});
