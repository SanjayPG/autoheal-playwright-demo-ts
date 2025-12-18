# AutoHeal Playwright TypeScript Demo

AI-powered test automation framework for Playwright with self-healing locators, comprehensive reporting, and intelligent caching.

## ⚡ Quick Overview

```typescript
// Install
npm install @sdetsanjay/autoheal-locator

// Use in your tests
import { AutoHealLocator, ExecutionStrategy } from '@sdetsanjay/autoheal-locator';

const autoHeal = AutoHealLocator.builder()
  .withPlaywrightPage(page)
  .withAIProvider('gemini')  // Get free key: https://makersuite.google.com/app/apikey
  .withStrategy(ExecutionStrategy.SMART_SEQUENTIAL)
  .build();

// Find elements with auto-healing
const element = await autoHeal.find(page, page.locator('#username'), 'Username input field');
```

**What you need:**
1. ✅ Node.js 16+
2. ✅ An AI API key (Google Gemini recommended - free tier available)
3. ✅ 5 minutes to integrate

---

## 🎯 New to AutoHeal? Start Here!

**Want to create your own AutoHeal project from scratch?**

👉 **[START HERE - Complete Beginner's Guide](START_HERE.md)** 👈

This step-by-step guide walks you through:
- ✅ Creating a new Playwright project from zero
- ✅ Installing and configuring AutoHeal
- ✅ Building your first self-healing test
- ✅ No prior knowledge required!

**Already have a project?** Continue reading below to add AutoHeal to your existing tests.

---

## 📚 Table of Contents

- **[START HERE - Complete Beginner's Guide](START_HERE.md)** - Create your own project from scratch (No prior knowledge required!)
- [Quick Start](#-start-here---quick-start) - Run this demo project in 5 minutes
- [Implementing in Your Own Project](#-implementing-in-your-own-project) - Add AutoHeal to existing project
- [AI Provider Setup](#-ai-provider-setup) - Configure AI providers
- [Testing AI Healing](#-testing-ai-healing) - See healing in action
- [How It Works](#-how-it-works) - Understanding the healing flow
- [Configuration](#-configuration) - Advanced configuration options
- [Best Practices](#-best-practices) - Writing effective AutoHeal selectors
- [Troubleshooting](#-troubleshooting) - Common issues and solutions

## 🚀 START HERE - Quick Start

**New to this project?** Follow these simple steps to run your first self-healing test in 5 minutes!

> **Note:** This guide is for running the demo project. If you want to add AutoHeal to your existing project, jump to [Implementing in Your Own Project](#-implementing-in-your-own-project).

### What You'll Need

Before starting, make sure you have:
- ✅ **Node.js 16 or higher** - [Download here](https://nodejs.org/)
- ✅ **A free Google Gemini API Key** - [Get your key here](https://makersuite.google.com/app/apikey)
- ✅ **Chrome browser** installed on your machine

---

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages including the AutoHeal library and Playwright.

Next, install the Chromium browser for Playwright:

```bash
npx playwright install chromium
```

**What this does:** Downloads the Chromium browser that Playwright will use to run your tests.

---

### Step 2: Set Up Your API Key

First, create your environment file by copying the example:

**On Windows:**
```bash
copy .env.example .env
```

**On Mac/Linux:**
```bash
cp .env.example .env
```

Now open the newly created `.env` file in any text editor and replace `your_api_key_here` with your actual Gemini API key:

```env
GEMINI_API_KEY=paste_your_actual_key_here
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

**Don't have an API key?** Get a free one at [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---

### Step 3: Run Your First Test

You're ready! Run the tests with:

```bash
npm test
```

This runs all tests in headless mode (no visible browser).

**Want to see the browser in action?** Use:

```bash
npm run test:headed
```

**Other useful commands:**
- `npm run test:ui` - Opens Playwright's interactive UI mode
- `npm run test:debug` - Run tests in debug mode with step-by-step execution

---

### Step 4: View Your Test Reports

After the tests complete, you'll see two types of reports:

**1. Playwright HTML Report:**
```bash
npm run report
```
This shows standard test results (passed/failed tests, screenshots, etc.)

**2. AutoHeal Report (The Magic!):**

**On Windows:**
```bash
start autoheal-reports\AutoHeal_*_Report.html
```

**On Mac:**
```bash
open autoheal-reports/AutoHeal_*_Report.html
```

**On Linux:**
```bash
xdg-open autoheal-reports/AutoHeal_*_Report.html
```

**What you'll see:** Detailed analytics showing which selectors worked, which were healed by AI, cache hit rates, and token costs.

## 📊 What You'll See

### Console Output
```
✅ AutoHeal initialized
Original selector worked: #user-name
✅ SUCCESS ✅ [72ms] #user-name → #user-name

============================================================
AUTOHEAL TEST SUMMARY
============================================================
Total: 9 | Success: 9 | Failed: 0
Original: 9 | DOM Healed: 0 | Visual: 0 | Cached: 0
============================================================
📊 HTML Report generated: autoheal-reports\AutoHeal_2024-01-15_10-30-45_Report.html
```

### AutoHeal HTML Report
The interactive report includes:
- **Summary Statistics** - Success rates, healing breakdown, timing
- **Detailed Selector Table** - Filterable by strategy, sortable, searchable
- **AI Implementation Details** - Reasoning, token usage, costs
- **Performance Metrics** - Execution times, cache hit rates
- **Cost Tracking** - Token consumption and estimated costs

## 🏗️ Implementing in Your Own Project

Want to add AutoHeal to your existing Playwright TypeScript project? Follow these steps:

### Step 1: Install the Package

```bash
npm install @sdetsanjay/autoheal-locator
```

### Step 2: Create AutoHealHelper

Create `helpers/AutoHealHelper.ts`:

```typescript
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
```

**Choose Your Approach:**

**Option 1: Simple Mode (Recommended for Beginners)**
- Use `getAutoHeal(page)` - Hardcoded Gemini provider
- Only needs `GEMINI_API_KEY` in `.env` file
- Perfect for getting started quickly

**Option 2: Advanced Mode (Full Control)**
- Use `getAutoHealWithConfig(page)` - Reads from `.env` file
- Configure provider, model, strategy, cache, etc. via environment variables
- Perfect when you need flexibility without code changes

### Step 3: Set Up Environment Variables

Create a `.env` file in your project root:

```env
GEMINI_API_KEY=your_api_key_here
```

**Note**: `dotenv` is already included in the package dependencies, so it's installed automatically with `npm install`.

Load it in your test file:

```typescript
import * as dotenv from 'dotenv';
dotenv.config();
```

### Step 4: Update Your Page Objects

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

  // Replace page.locator() with autoHeal.find()
  async getUsernameInput(): Promise<Locator> {
    // Before: return this.page.locator('#username');
    // After:
    return await this.autoHeal.find(
      this.page,
      this.page.locator('#username'),
      'Username input field'
    );
  }

  async getPasswordInput(): Promise<Locator> {
    return await this.autoHeal.find(
      this.page,
      this.page.locator('#password'),
      'Password input field'
    );
  }

  async getLoginButton(): Promise<Locator> {
    return await this.autoHeal.find(
      this.page,
      this.page.getByRole('button', { name: 'Login' }),
      'Login button'
    );
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
```

### Step 5: Generate Reports in Tests

Add report generation to your test cleanup:

```typescript
import { test } from '@playwright/test';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

test.describe('My Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test.afterEach(async () => {
    const metrics = AutoHealHelper.getMetrics();
    if (metrics) {
      console.log('\n📊 Cache Metrics:');
      console.log(`   Hit Rate: ${(metrics.hitRate * 100).toFixed(2)}%`);
      console.log(`   Entries: ${metrics.totalEntries}`);
    }
  });

  test.afterAll(async () => {
    // Generate AutoHeal reports after all tests
    AutoHealHelper.generateReports();
  });

  test('should login successfully', async ({ page }) => {
    // Your test code here
  });
});
```

### Step 6: Run Your Tests

```bash
npm test
```

Check the `autoheal-reports/` folder for detailed healing analytics!

---

## 🤖 AI Provider Setup

AutoHeal supports multiple AI providers. Choose one and get your API key:

| Provider | Models | Get API Key | Cost |
|----------|--------|-------------|------|
| **Google Gemini** ⭐ | Gemini 2.0 Flash, Pro | [Get Key](https://makersuite.google.com/app/apikey) | ~$0.0001/healing |
| **OpenAI** | GPT-4o, GPT-4, GPT-3.5 | [Get Key](https://platform.openai.com/api-keys) | Variable |
| **Anthropic Claude** | Claude 3.5 Sonnet, Haiku | [Get Key](https://console.anthropic.com/) | Variable |
| **DeepSeek** | DeepSeek V2, V3 | [Get Key](https://platform.deepseek.com/) | Low cost |
| **Grok** | Grok-2, Grok-beta | [Get Key](https://console.x.ai/) | Variable |
| **Groq** | LLaMA, Mixtral | [Get Key](https://console.groq.com/) | Fast inference |

⭐ **Recommended**: Google Gemini for fast, cost-effective healing.

### Configuring a Different Provider

**Option 1: Advanced Mode (No Code Changes)**

Use `getAutoHealWithConfig()` and configure via `.env` file:

1. Get your API key from the provider's website
2. Update `.env`:
   ```env
   # Switch to OpenAI
   OPENAI_API_KEY=your_key_here
   AUTOHEAL_AI_PROVIDER=openai
   AUTOHEAL_AI_MODEL=gpt-4o-mini  # Optional, uses default if not set

   # Or switch to Claude
   CLAUDE_API_KEY=your_key_here
   AUTOHEAL_AI_PROVIDER=claude
   AUTOHEAL_AI_MODEL=claude-3-5-haiku-20241022
   ```

3. In your page objects, use:
   ```typescript
   this.autoHeal = AutoHealHelper.getAutoHealWithConfig(page);
   ```

**Option 2: Simple Mode (Edit Code)**

If using `getAutoHeal()`, update `helpers/AutoHealHelper.ts`:
```typescript
.withAIProvider('openai')  // or 'claude', 'deepseek', 'grok', 'groq'
```

## 🎯 Testing AI Healing

Want to see AI healing in action? Break a selector intentionally!

**Edit `pages/LoginPage.ts`:**
```typescript
async getUsernameInput(): Promise<Locator> {
  return await this.autoHeal.find(
    this.page,
    this.page.locator('#wrong-id'),  // ❌ Wrong selector
    'Username input field'           // ✅ AI uses this description
  );
}
```

**Run tests and watch AutoHeal work:**
```bash
npm test
```

**Check the report to see:**
- Original selector: `#wrong-id` (failed)
- AI healed to: `#user-name` (success!)
- Time taken: ~2000ms
- Tokens used: ~1500
- Cost: ~$0.0001
- Next run: Cached! (~50ms, $0)

## 📁 Project Structure

```
autoheal-playwright-demo-ts/
├── helpers/
│   └── AutoHealHelper.ts          # AutoHeal singleton initialization
├── pages/
│   ├── LoginPage.ts               # Login page object
│   └── InventoryPage.ts           # Inventory page object
├── tests/
│   └── login.spec.ts              # Test specifications
├── autoheal-reports/              # Generated reports (after tests)
├── autoheal-cache/                # Cached selectors (auto-created)
│   └── selectors.json             # Persistent cache of healed selectors
├── .env                           # Your API keys (create from .env.example)
├── .env.example                   # Environment template
├── package.json                   # npm configuration
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # This file
└── QUICKSTART.md                  # Quick reference guide
```

## 🔧 How It Works

### Self-Healing Flow

```
1. Try Original Selector
   └─ Success? ✅ Done
   └─ Failed? → Continue

2. Check Cache
   └─ Found? ✅ Use cached selector
   └─ Not found? → Continue

3. AI Healing (DOM Analysis)
   └─ Analyze page HTML
   └─ Find best selector
   └─ Success? ✅ Cache & use
   └─ Failed? → Continue

4. AI Healing (Visual Analysis)
   └─ Take screenshot
   └─ Analyze visually
   └─ Find element coordinates
   └─ Success? ✅ Cache & use
   └─ Failed? ❌ Report failure
```

### Playwright Locator Support

AutoHeal works with all Playwright locator types:

```typescript
// CSS Selectors
await autoHeal.find(page, page.locator('#user-name'), 'Username field');
await autoHeal.find(page, page.locator('.submit-btn'), 'Submit button');

// Playwright getBy Methods
await autoHeal.find(page, page.getByRole('button', { name: 'Login' }), 'Login button');
await autoHeal.find(page, page.getByTestId('submit-btn'), 'Submit button');
await autoHeal.find(page, page.getByText('Submit'), 'Submit button');
await autoHeal.find(page, page.getByLabel('Username'), 'Username field');

// String selectors (converted to page.locator())
await autoHeal.find(page, '#user-name', 'Username field');
```

### Healing Strategies

AutoHeal supports multiple strategies (configured in `AutoHealHelper.ts`):

**SMART_SEQUENTIAL** (Recommended - Default)
- Tries: Original → Cache → DOM AI → Visual AI (if DOM fails)
- Best balance of speed, cost, and accuracy

**DOM_ONLY**
- Tries: Original → Cache → DOM AI
- Fast and cheap, no visual analysis

**VISUAL_FIRST**
- Tries: Original → Cache → Visual AI → DOM AI (if Visual fails)
- Most accurate for complex UIs

**PARALLEL**
- Runs DOM and Visual AI simultaneously
- Fastest healing, higher cost

### Caching System

Healed selectors are cached in `autoheal-cache/selectors.json`:

```json
{
  "#user-name-Wrong__Username input field": {
    "selector": "#user-name",
    "description": "Username input field",
    "strategy": "DOM_ANALYSIS",
    "lastUsed": "2024-01-15T10:30:45.000Z",
    "hitCount": 3,
    "successRate": 1.0
  }
}
```

**Cache Benefits:**
- ⚡ Fast retrieval (~50ms vs ~2000ms)
- 💰 Zero AI cost for cached selectors
- 📊 Persistent file-based storage (survives restarts)
- ⏱️ TTL support (optional expiration)
- 🎯 Success rate tracking

## ⚙️ Configuration

### Environment Variables (.env)

**For Simple Mode (`getAutoHeal()`):**
```env
# Required: Only API key needed
GEMINI_API_KEY=your_api_key_here

# Test Configuration
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

**For Advanced Mode (`getAutoHealWithConfig()`):**
```env
# Required: API key for your chosen provider
GEMINI_API_KEY=your_gemini_key_here
# OR
OPENAI_API_KEY=your_openai_key_here
# OR
CLAUDE_API_KEY=your_claude_key_here

# Test Configuration
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce

# Optional AutoHeal Configuration (only used with getAutoHealWithConfig)
AUTOHEAL_AI_PROVIDER=gemini
AUTOHEAL_AI_MODEL=gemini-2.0-flash-exp
AUTOHEAL_EXECUTION_STRATEGY=SMART_SEQUENTIAL
AUTOHEAL_CACHE_TYPE=PERSISTENT_FILE
AUTOHEAL_CACHE_MAX_SIZE=10000
AUTOHEAL_CACHE_TTL_HOURS=24
AUTOHEAL_VISUAL_ANALYSIS_ENABLED=true
AUTOHEAL_ELEMENT_TIMEOUT_MS=30000
AUTOHEAL_AI_TIMEOUT_MS=30000
AUTOHEAL_MAX_RETRIES=3
AUTOHEAL_REPORTING_ENABLED=true
AUTOHEAL_REPORTS_DIR=./autoheal-reports
AUTOHEAL_DEBUG_LOGS=false
```

> **Note:** See `.env.example` for complete list of all configuration options with detailed comments.

### Code Configuration (helpers/AutoHealHelper.ts)

```typescript
import { AutoHealLocator, ExecutionStrategy, CacheType, AIProvider } from '@sdetsanjay/autoheal-locator';

AutoHealLocator.builder()
  .withPlaywrightPage(page)
  .withConfiguration({
    ai: {
      provider: AIProvider.GOOGLE_GEMINI,      // AI provider
      apiKey: process.env.GEMINI_API_KEY!,     // API key
      model: 'gemini-2.0-flash-exp',           // Model version
      timeout: 30000,                          // AI request timeout (ms)
      maxRetries: 3,                           // Max retry attempts
      visualAnalysisEnabled: true,             // Enable visual healing
    },
    cache: {
      type: CacheType.PERSISTENT_FILE,         // Cache type
      cacheDirectory: './autoheal-cache',      // Cache location
      maxSize: 10000,                          // Max cached selectors
      expireAfterWriteMs: 24 * 60 * 60 * 1000, // 24 hours TTL
    },
    performance: {
      executionStrategy: ExecutionStrategy.SMART_SEQUENTIAL,
      elementTimeoutMs: 30000,                 // Element wait timeout
      maxParallelExecutions: 3,                // Parallel healing limit
    },
    reporting: {
      enabled: true,                           // Generate reports
      outputDirectory: './autoheal-reports',   // Report location
      generateHtml: true,                      // HTML report
      generateJson: true,                      // JSON report
      generateText: false,                     // Text summary
    },
    logging: {
      enableDebugLogs: false,                  // Debug logging
    },
  })
  .build();
```

## 🎨 Advanced Usage Examples

### Example 1: Simple Page Object

```typescript
import { Page, Locator } from '@playwright/test';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

export class HomePage {
  private page: Page;
  private autoHeal: any;

  constructor(page: Page) {
    this.page = page;
    this.autoHeal = AutoHealHelper.getAutoHeal(page);
  }

  async searchFor(query: string): Promise<void> {
    const searchInput = await this.autoHeal.find(
      this.page,
      this.page.getByPlaceholder('Search'),
      'Search input field'
    );
    const searchButton = await this.autoHeal.find(
      this.page,
      this.page.getByRole('button', { name: 'Search' }),
      'Search submit button'
    );

    await searchInput.fill(query);
    await searchButton.click();
  }
}
```

### Example 2: Using Different Locator Types

```typescript
// CSS ID selector
const element1 = await autoHeal.find(page, page.locator('#submit-btn'), 'Submit button');

// CSS class selector
const element2 = await autoHeal.find(page, page.locator('.primary-button'), 'Primary button');

// Data attribute
const element3 = await autoHeal.find(page, page.locator('[data-testid="login"]'), 'Login button');

// getByRole
const element4 = await autoHeal.find(page, page.getByRole('button', { name: 'Submit' }), 'Submit button');

// getByText
const element5 = await autoHeal.find(page, page.getByText('Submit'), 'Submit button');

// XPath (wrapped in page.locator)
const element6 = await autoHeal.find(page, page.locator('xpath=//button[@type="submit"]'), 'Submit button');
```

### Example 3: Complete Test Suite

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { AutoHealHelper } from '../helpers/AutoHealHelper';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('E-Commerce Tests with AutoHeal', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test.afterEach(async () => {
    const metrics = AutoHealHelper.getMetrics();
    if (metrics) {
      console.log('\n📊 Cache Metrics:');
      console.log(`   Hit Rate: ${(metrics.hitRate * 100).toFixed(2)}%`);
      console.log(`   Entries: ${metrics.totalEntries}`);
    }
  });

  test.afterAll(async () => {
    // Generate AutoHeal reports after all tests
    AutoHealHelper.generateReports();
  });

  test('should login and add product to cart', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(1000);

    await inventoryPage.addProductToCart('sauce-labs-backpack');

    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(1);
  });
});
```

## 📊 Understanding Reports

### HTML Report Features

**Summary Section:**
- Total selectors used
- Success vs failure rate
- Healing strategy breakdown (Original/Cache/DOM/Visual)
- Cache hit rate
- Total execution time
- Token usage and costs

**Selector Table:**
- **Filterable** by strategy (Original, Cache, DOM, Visual)
- **Sortable** by any column (selector, status, time, tokens)
- **Searchable** by selector or description
- **Color-coded** rows:
  - 🟢 Green: Original selector worked
  - 🔵 Blue: Cache hit
  - 🟡 Yellow: DOM healing
  - 🟣 Purple: Visual healing
  - 🔴 Red: Failed

**AI Details:**
- Element details found
- AI reasoning and analysis
- Tokens used per healing
- Estimated cost per operation

### JSON Report

Machine-readable format for CI/CD integration:

```json
{
  "testRunId": "20240115-103045",
  "startTime": "2024-01-15T10:30:45.000Z",
  "endTime": "2024-01-15T10:31:12.000Z",
  "summary": {
    "totalSelectors": 9,
    "successCount": 9,
    "failedCount": 0,
    "originalSelectorWorked": 9,
    "domHealed": 0,
    "visualHealed": 0,
    "cachedHealed": 0,
    "totalTokensUsed": 0,
    "estimatedCost": 0
  },
  "reports": [...]
}
```

## 💡 Best Practices

### 1. Use Descriptive Element Descriptions

```typescript
// ✅ Good - AI can understand context
'Submit button on login form'
'Username input field in header'
'Product title in first cart item'
'Add to cart button for sauce-labs-backpack'

// ❌ Bad - Too generic
'Button'
'Input'
'Text'
'Element'
```

### 2. Start with Stable Selectors

Prefer (in order):
1. Test IDs: `page.getByTestId('login-button')`
2. Semantic roles: `page.getByRole('button', { name: 'Login' })`
3. IDs: `page.locator('#login-button')`
4. Stable classes: `page.locator('.login-form-submit')`
5. Data attributes: `page.locator('[data-test="login"]')`

Avoid:
- Positional selectors: `.form > div:nth-child(3) > button`
- Dynamic classes: `.css-abc123-xyz`
- Complex XPath: `//div[contains(@class,'x')]/following-sibling::div[2]`

### 3. Leverage Playwright Locators

```typescript
// ✅ Use native Playwright locators
await autoHeal.find(page, page.getByRole('button', { name: 'Submit' }), 'Submit button');

// ✅ Also works with simple selectors
await autoHeal.find(page, '#submit-btn', 'Submit button');
```

### 4. Monitor AI Usage

- Check reports after test runs
- Look for frequently healed selectors
- Update selectors in code if healing too often
- Cache will help reduce costs over time

### 5. Configure Healing Strategy

```typescript
// For stable apps with occasional changes
ExecutionStrategy.SMART_SEQUENTIAL  // Balanced (recommended)

// For fast CI/CD with stable selectors
ExecutionStrategy.DOM_ONLY          // Fast & cheap

// For complex visual UIs
ExecutionStrategy.VISUAL_FIRST      // Most accurate
```

### 6. Always Generate Reports

```typescript
test.afterAll(async () => {
  AutoHealHelper.generateReports('./autoheal-reports');
});
```

Benefits:
- Track healing patterns
- Monitor AI costs
- Identify flaky selectors
- Archive for trend analysis

## 🔍 Troubleshooting

### Tests Failing to Start

**Issue:** `Cannot find module '@sdetsanjay/autoheal-locator'`

**Solution:**
```bash
npm install @sdetsanjay/autoheal-locator
```

### Playwright Not Installed

**Issue:** `browserType.launch: Executable doesn't exist`

**Solution:**
```bash
npx playwright install chromium
```

### AI Healing Not Working

**Issue:** Original selector fails, but AI doesn't heal

**Checklist:**
1. ✅ Valid API key in `.env`
2. ✅ Element description is descriptive
3. ✅ Element exists on page (check manually)
4. ✅ No network issues (check console)
5. ✅ dotenv.config() called before tests

**Debug:**
```typescript
.withConfiguration({
  logging: {
    enableDebugLogs: true
  }
})
```

### High AI Costs

**Issue:** Too many AI healing calls

**Solutions:**
1. **Fix flaky selectors** - Update selectors that heal frequently
2. **Enable cache** - Ensure caching is enabled and working (default: enabled)
3. **Use DOM_ONLY** - Switch to cheaper strategy
4. **Increase cache size** - Store more healed selectors

**Check report** to identify which selectors heal most often.

### Cache Not Working

**Issue:** Same selector heals every time

**Check:**
1. Cache directory exists: `autoheal-cache/`
2. Cache file created: `autoheal-cache/selectors.json`
3. Cache type set to `PERSISTENT_FILE` (default)
4. File permissions (write access)

**Force cache clear:**
```bash
rm -rf autoheal-cache
```

Or programmatically:
```typescript
AutoHealHelper.clearCache();
```

### Report Not Generated

**Issue:** No HTML/JSON report after tests

**Check:**
1. `AutoHealHelper.generateReports()` called in `test.afterAll`
2. `reporting.enabled: true` in config (default: true)
3. Output directory has write permissions
4. No errors in console

## 💰 Cost Estimation

### Google Gemini Pricing (as of 2025)

- **Gemini 2.0 Flash**: ~$0.075 per 1M input tokens
- **Average healing**: ~1500 tokens per selector
- **Cost per healing**: ~$0.0001 (one hundredth of a cent)

### Example Project Costs

**100 selectors, 10% need healing:**
- Healings: 10
- Tokens: 10 × 1500 = 15,000
- Cost: ~$0.001

**With caching (subsequent runs):**
- Healings: 0 (all cached)
- Cost: $0

**Monthly (100 test runs):**
- First run each selector: ~$0.001
- Cached runs: $0
- Total: ~$0.10/month (extremely cheap!)

## 🔗 Resources

- **Test Website**: [SauceDemo](https://www.saucedemo.com)
- **Playwright Docs**: [playwright.dev](https://playwright.dev)
- **Gemini API**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **AutoHeal NPM Package**: [@sdetsanjay/autoheal-locator](https://www.npmjs.com/package/@sdetsanjay/autoheal-locator)
- **AutoHeal GitHub**: [SanjayPG/autoheal-locator-js](https://github.com/SanjayPG/autoheal-locator-js)
- **Playwright Demo (this repo)**: [autoheal-playwright-demo-ts](https://github.com/spgorai/autoheal-playwright-demo-ts)
- **Selenium Demo**: [autoheal-selenium-demo-ts](https://github.com/spgorai/autoheal-selenium-demo-ts)

## 🚀 Next Steps

1. ✅ Run the demo tests
2. ✅ View the reports
3. ✅ Break a selector intentionally
4. ✅ Watch AI heal it
5. ✅ Check cache on second run
6. ✅ Integrate into your project!

## 📞 Support

If you encounter issues:
1. Check this README's [Troubleshooting](#-troubleshooting) section
2. Verify `.env` configuration
3. Ensure dependencies are installed (`npm install`)
4. Check Node.js version (16+ required)
5. Review AutoHeal reports for errors
6. Check browser installation (`npx playwright install chromium`)

For bugs and feature requests:
- **GitHub Issues**: [autoheal-locator-js issues](https://github.com/SanjayPG/autoheal-locator-js/issues)
- **GitHub Discussions**: [autoheal-locator-js discussions](https://github.com/SanjayPG/autoheal-locator-js/discussions)

---

**Happy Testing! 🎭**

*AutoHeal Playwright Demo - Self-healing test automation powered by AI*
