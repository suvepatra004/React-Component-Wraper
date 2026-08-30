import { test, expect } from "@playwright/test";

test("Github Profile Dashboard testing", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("http://localhost:5173");
  await expect(page.locator("body")).toBeVisible();
});
