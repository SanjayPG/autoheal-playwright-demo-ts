import { Page, Locator } from '@playwright/test';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

export class InventoryPage {
  private page: Page;
  private autoHeal: any;

  constructor(page: Page) {
    this.page = page;
    this.autoHeal = AutoHealHelper.getAutoHeal(page);
  }

  async getPageTitle(): Promise<Locator> {
    return await this.autoHeal.find(this.page, '.title', 'Products page title');
  }

  async addProductToCart(productName: string): Promise<void> {
    const addToCartButton = await this.autoHeal.find(
      this.page,
      `[data-test="add-to-cart-${productName}"]`,
      `Add to cart button for ${productName}`
    );
    await addToCartButton.click();
  }

  async getCartItemCount(): Promise<number> {
    const cartBadge = await this.autoHeal.find(
      this.page,
      '.shopping_cart_badge',
      'Shopping cart badge'
    );
    const text = await cartBadge.textContent();
    return parseInt(text || '0', 10);
  }
}
