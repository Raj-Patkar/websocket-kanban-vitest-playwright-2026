import { test, expect } from "@playwright/test";

test("user can create a task", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.click("text=Add Task");
  await page.fill('input[placeholder="Title"]', "Playwright Task");
  await page.fill(
    'textarea[placeholder="Description"]',
    "Created via E2E test"
  );
  await page.click('[data-testid="submit-task"]');

  await expect(
    page.locator("text=Playwright Task").first()
  ).toBeVisible();
});

test("user can delete a task", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.click("text=Add Task");
  await page.fill('input[placeholder="Title"]', "Delete Me");
  await page.fill(
    'textarea[placeholder="Description"]',
    "Task to be deleted"
  );
  await page.click('[data-testid="submit-task"]');

  const task = page.locator("text=Delete Me").first();
  await expect(task).toBeVisible();

  await task.click();
  await page.click('[data-testid="delete-task"]');

  await expect(page.locator("text=Delete Me")).toHaveCount(0);
});