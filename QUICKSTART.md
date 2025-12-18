# AutoHeal Playwright - Quick Start Guide

Get started with AutoHeal self-healing Playwright tests in 5 minutes!

## 📦 Prerequisites

- Node.js 16 or higher
- Google Gemini API Key ([Get free key](https://makersuite.google.com/app/apikey))

## 🚀 Running the Demo

### 1. Install Dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Configure API Key
```bash
copy .env.example .env
```

Edit `.env`:
```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Run Tests
```bash
npm test                 # Headless mode
npm run test:headed      # With visible browser
```

### 4. View Reports
```bash
npm run report                                    # Playwright report
start autoheal-reports\AutoHeal_*_Report.html    # AutoHeal report
```

## 🏗️ Add to Your Project

### Step 1: Install
```bash
npm install @sdetsanjay/autoheal-locator
```

### Step 2: Create Helper

Create `helpers/AutoHealHelper.ts`:

```typescript
import { Page } from '@playwright/test';
import { AutoHealLocator, ExecutionStrategy } from '@sdetsanjay/autoheal-locator';

export class AutoHealHelper {
  private static instance: AutoHealLocator | null = null;

  /**
   * Simple version - Uses Gemini with default settings (Recommended for beginners)
   */
  static getAutoHeal(page: Page): AutoHealLocator {
    if (!this.instance) {
      this.instance = AutoHealLocator.builder()
        .withPlaywrightPage(page)
        .withAIProvider('gemini')
        .withStrategy(ExecutionStrategy.SMART_SEQUENTIAL)
        .build();
      console.log('✅ AutoHeal initialized (simple mode)');
    }
    return this.instance;
  }

  /**
   * Advanced version - Reads ALL config from .env (For full control)
   */
  static getAutoHealWithConfig(page: Page): AutoHealLocator {
    if (!this.instance) {
      this.instance = AutoHealLocator.builder()
        .withPlaywrightPage(page)
        .build();
      console.log('✅ AutoHeal initialized with config from .env');
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
```

**Two modes available:**
- `getAutoHeal()` - Simple, uses Gemini (just add `GEMINI_API_KEY` to `.env`)
- `getAutoHealWithConfig()` - Advanced, reads all config from `.env` (full control)

### Step 3: Update Page Object

```typescript
import { Page, Locator } from '@playwright/test';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

export class LoginPage {
  private page: Page;
  private autoHeal: any;

  constructor(page: Page) {
    this.page = page;
    this.autoHeal = AutoHealHelper.getAutoHeal(page);
  }

  async getUsernameInput(): Promise<Locator> {
    return await this.autoHeal.find(
      this.page,
      this.page.locator('#username'),
      'Username input field'  // AI uses this for healing
    );
  }
}
```

### Step 4: Update Test

```typescript
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

test.describe('Login Tests', () => {
  test.afterAll(async () => {
    AutoHealHelper.generateReports();
  });

  test('should login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://example.com');

    const username = await loginPage.getUsernameInput();
    await username.fill('testuser');
  });
});
```

### Step 5: Add .env
```env
GEMINI_API_KEY=your_api_key_here
```

Load in test:
```typescript
import * as dotenv from 'dotenv';
dotenv.config();
```

## 🎯 Test AI Healing

Break a selector to see AutoHeal in action:

```typescript
async getUsernameInput(): Promise<Locator> {
  return await this.autoHeal.find(
    this.page,
    this.page.locator('#wrong-id'),  // ❌ Broken selector
    'Username input field'            // ✅ AI uses this
  );
}
```

Run tests:
```bash
npm test
```

Check report to see:
- Original: `#wrong-id` (failed)
- AI healed to: `#username` (success!)
- Time: ~2000ms, Cost: ~$0.0001
- Next run: Cached! (~50ms, $0)

## 📊 Report Output

### Console
```
✅ AutoHeal initialized
Original selector failed: #wrong-id
🤖 AI HEALING → user-name
✅ SUCCESS ✅ [2143ms] #wrong-id → #user-name

============================================================
AUTOHEAL TEST SUMMARY
============================================================
Total: 3 | Success: 3 | Failed: 0
Original: 2 | DOM Healed: 1 | Visual: 0 | Cached: 0
============================================================
📊 HTML Report: autoheal-reports\AutoHeal_2024-01-15_10-30-45_Report.html
```

### HTML Report Includes:
- Summary statistics
- Filterable selector table
- AI reasoning details
- Token usage and costs
- Cache metrics

## ⚙️ Configuration Options

### Environment Variables

**Simple Mode (`getAutoHeal()`):**
```env
GEMINI_API_KEY=your_key_here
```

**Advanced Mode (`getAutoHealWithConfig()`):**
```env
# Required: API key for your chosen provider
GEMINI_API_KEY=your_gemini_key_here
# OR
OPENAI_API_KEY=your_openai_key_here

# Optional: Customize behavior
AUTOHEAL_AI_PROVIDER=gemini
AUTOHEAL_AI_MODEL=gemini-2.0-flash-exp
AUTOHEAL_EXECUTION_STRATEGY=SMART_SEQUENTIAL
AUTOHEAL_CACHE_TYPE=PERSISTENT_FILE
AUTOHEAL_CACHE_MAX_SIZE=10000
# ... (see .env.example for all options)
```

### Strategies

| Strategy | Use Case | Cost | Speed |
|----------|----------|------|-------|
| `SMART_SEQUENTIAL` | Balanced (recommended) | 💰💰 | ⚡⚡ |
| `DOM_ONLY` | Fast & cheap | 💰 | ⚡⚡⚡ |
| `VISUAL_FIRST` | Complex UIs | 💰💰 | ⚡ |
| `PARALLEL` | Speed critical | 💰💰💰 | ⚡⚡⚡ |

### AI Providers

| Provider | Setup |
|----------|-------|
| Google Gemini (recommended) | [Get Key](https://makersuite.google.com/app/apikey) |
| OpenAI | [Get Key](https://platform.openai.com/api-keys) |
| Claude | [Get Key](https://console.anthropic.com/) |
| DeepSeek | [Get Key](https://platform.deepseek.com/) |
| Grok | [Get Key](https://console.x.ai/) |
| Groq | [Get Key](https://console.groq.com/) |

**To switch providers:**
- **Simple mode**: Edit code in `AutoHealHelper.ts` - change `.withAIProvider('gemini')` to another provider
- **Advanced mode**: Just update `.env` file - set `AUTOHEAL_AI_PROVIDER=openai` (no code changes needed!)

## 💡 Best Practices

### 1. Descriptive Descriptions
```typescript
// ✅ Good
'Submit button on login form'
'Username input field in header'

// ❌ Bad
'Button'
'Input'
```

### 2. Stable Selectors
```typescript
// ✅ Prefer
page.getByTestId('login-btn')
page.getByRole('button', { name: 'Login' })
page.locator('#login-button')

// ❌ Avoid
page.locator('.css-abc123-xyz')
page.locator('div:nth-child(3) > button')
```

### 3. Always Generate Reports
```typescript
test.afterAll(async () => {
  AutoHealHelper.generateReports();
});
```

## 🔧 Troubleshooting

### Cannot find module error
```bash
npm install @sdetsanjay/autoheal-locator
```

### Playwright not installed
```bash
npx playwright install chromium
```

### API key not working
- Check `.env` file exists
- Verify `GEMINI_API_KEY=your_key_here`
- Ensure `dotenv.config()` is called
- Get new key: https://makersuite.google.com/app/apikey

### Cache not working
```bash
# Clear cache
rm -rf autoheal-cache

# Or programmatically
AutoHealHelper.clearCache();
```

### Debug mode
```typescript
.withConfiguration({
  logging: {
    enableDebugLogs: true
  }
})
```

## 💰 Cost Estimate

- **Per healing**: ~$0.0001 (Google Gemini)
- **100 healings**: ~$0.01
- **Cached lookups**: $0 (free!)
- **Monthly (typical)**: ~$0.10

## 📚 Learn More

- **Full README**: [README.md](./README.md)
- **NPM Package**: [@sdetsanjay/autoheal-locator](https://www.npmjs.com/package/@sdetsanjay/autoheal-locator)
- **GitHub**: [autoheal-locator-js](https://github.com/SanjayPG/autoheal-locator-js)
- **Playwright Docs**: [playwright.dev](https://playwright.dev)

## 🎓 Example Test Suite

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AutoHealHelper } from '../helpers/AutoHealHelper';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
  });

  test.afterAll(async () => {
    AutoHealHelper.generateReports();
  });

  test('should login successfully', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });
});
```

---

**That's it! You're ready to use AutoHeal in your Playwright tests!** 🎭

For detailed documentation, see [README.md](./README.md)
