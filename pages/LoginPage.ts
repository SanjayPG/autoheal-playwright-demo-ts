import { Page, Locator } from '@playwright/test';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

export class LoginPage {
  private page: Page;
  private autoHeal: any;

  constructor(page: Page) {
    this.page = page;
    this.autoHeal = AutoHealHelper.getAutoHeal(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async getUsernameInput(): Promise<Locator> {
    return await this.autoHeal.find(this.page, '#user-name-Wrong', 'Username input field');
  }

  async getPasswordInput(): Promise<Locator> {
    return await this.autoHeal.find(this.page, '#password', 'Password input field');
  }

  async getLoginButton(): Promise<Locator> {
    return await this.autoHeal.find(this.page, '#login-button-Wrong', 'Login button');
  }

  async login(username: string, password: string): Promise<void> {
    const usernameInput = await this.getUsernameInput();
    const passwordInput = await this.getPasswordInput();
    const loginButton = await this.getLoginButton();

    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
  }
}
