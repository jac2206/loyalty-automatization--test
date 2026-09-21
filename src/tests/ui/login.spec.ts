import { test, expect } from "@playwright/test";
import { validUser, invalidUser } from "../../data/users";

test.describe("Auth UI - Login", () => {
  test("should login successfully", async ({ page }) => {
    await test.step("Open login page", async () => {
      await page.goto("https://loyalty-web-mocha.vercel.app/login");
    });

    await test.step("Enter valid credentials", async () => {
      await page.getByLabel("Email").fill(validUser.email);
      await page.getByLabel("Contrasena").fill(validUser.password);
    });

    await test.step("Submit login form", async () => {
      await page.getByRole("button", { name: "Ingresar" }).click();
    });

    await test.step("Validate successful login", async () => {
      await expect(page).toHaveURL(/\/home/);
    });
  });

  test("should fail with invalid credentials", async ({ page }) => {
    await test.step("Open login page", async () => {
      await page.goto("https://loyalty-web-mocha.vercel.app/login");
    });

    await test.step("Enter invalid credentials", async () => {
      await page.getByLabel("Email").fill(invalidUser.email);
      await page.getByLabel("Contrasena").fill(invalidUser.password);
    });

    await test.step("Submit login form", async () => {
      await page.getByRole("button", { name: "Ingresar" }).click();
    });

    await test.step("Validate login error", async () => {
    //   await expect(
    //     page.getByText("Credenciales inválidas")
    //   ).toBeVisible();

    await expect(
        page.getByText("Invalid email or password")
      ).toBeVisible();

      await expect(page).toHaveURL(/\/login/);
    });
  });
});