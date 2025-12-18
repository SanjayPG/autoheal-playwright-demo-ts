import { Page } from '@playwright/test';
import { AutoHealLocator, ExecutionStrategy } from '@sdetsanjay/autoheal-locator';

export class AutoHealHelper {
  private static instance: AutoHealLocator | null = null;

  /**
   * Simple version - Uses Gemini with default settings
   * Perfect for beginners who just want it to work!
   */
  static getAutoHeal(page: Page): AutoHealLocator {
    if (!this.instance) {
      this.instance = AutoHealLocator.builder()
        .withPlaywrightPage(page)
        .withAIProvider('gemini')
        .withStrategy(ExecutionStrategy.SMART_SEQUENTIAL)
        .build();
      console.log('✅ AutoHeal initialized (simple mode - Gemini with SMART_SEQUENTIAL)');
    }
    return this.instance;
  }

  /**
   * Advanced version - Reads ALL configuration from .env file
   * The AutoHeal library automatically reads all AUTOHEAL_* environment variables
   * Gives full flexibility through .env configuration
   */
  static getAutoHealWithConfig(page: Page): AutoHealLocator {
    if (!this.instance) {
      // The library will automatically read all AUTOHEAL_* env vars!
      this.instance = AutoHealLocator.builder()
        .withPlaywrightPage(page)
        .build();

      console.log('✅ AutoHeal initialized with config from .env file');
    }
    return this.instance;
  }

  static reset(): void {
    if (this.instance) {
      this.instance.shutdown();
      this.instance = null;
    }
  }

  static clearCache(): void {
    if (this.instance) {
      this.instance.clearCache();
    }
  }

  static getMetrics() {
    return this.instance?.getCacheMetrics();
  }

  static generateReports(outputDir: string = './autoheal-reports'): void {
    if (this.instance) {
      this.instance.shutdown(outputDir);
    }
  }
}
