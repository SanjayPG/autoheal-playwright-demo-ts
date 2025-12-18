# 🚀 START HERE - Create Your Own AutoHeal Playwright Project from Scratch

**Want to create your own project with AutoHeal?** Follow these steps to build everything from scratch!

> **Note:** If you just want to run THIS demo project, see [README.md](README.md) instead.

---

## Prerequisites

Before starting, you need:
- **Node.js 16 or higher** ([Download here](https://nodejs.org/) - Choose the LTS version)
- A text editor (VS Code, Notepad++, Notepad, or any editor)
- Terminal/Command Prompt (Command Prompt on Windows, Terminal on Mac/Linux)

---

## Step 1: Verify Node.js Installation

First, let's make sure Node.js is installed correctly.

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and type:

```bash
node -v
```

**What you should see:** Something like `v16.20.0` or `v18.17.0` or `v20.10.0` or `v22.11.0` (any version 16 or higher is fine)

**Example output:**
```
v22.11.0
```

**If you see an error like "command not found" or "'node' is not recognized":**
1. Node.js is not installed - Download it from https://nodejs.org/
2. After installing, **close and reopen** your terminal
3. Try `node -v` again

**Now verify npm is also installed:**

> **Note:** npm (Node Package Manager) is automatically installed when you install Node.js. You don't need to install it separately!

```bash
npm -v
```

**What you should see:** Something like `9.0.0` or `10.2.0` or higher

**Example output:**
```
10.2.4
```

✅ If both commands show version numbers, you're ready to continue!

---

## Step 2: Create Your Project Directory

Now create a new folder for your project:

```bash
mkdir my-autoheal-project
cd my-autoheal-project
```

**What this does:** Creates a new empty folder and navigates into it.

---

## Step 3: Open Project in VS Code

Now open this folder in your code editor. **We'll use VS Code as an example** - if you use a different editor, search Google for "how to open terminal in [your editor name]".

### Using VS Code:

**Option 1: Open from terminal**
```bash
code .
```

**Option 2: Open from VS Code**
1. Open VS Code
2. Click **File** → **Open Folder**
3. Navigate to `my-autoheal-project` folder and click **Select Folder**

**Now open the integrated terminal in VS Code:**
1. Click **View** → **Terminal** (or press `` Ctrl+` `` on Windows/Linux, `` Cmd+` `` on Mac)
2. The terminal opens at the bottom of VS Code
3. It's already in your project folder!

**From now on, run all commands in this integrated terminal.**

✅ **Why use the integrated terminal?**
- You can see your code and terminal in the same window
- Easy to switch between editing files and running commands
- Terminal is already in the correct folder

> **Note:** If you're using a different editor (Notepad++, Sublime, etc.), you can continue using your regular Command Prompt/Terminal. Just make sure you're in the `my-autoheal-project` folder when running commands.

---

## Step 4: Initialize Playwright Project

Run the official Playwright setup command:

```bash
npm init playwright@latest
```

**You'll be asked several questions. Answer like this:**

1. **Do you want to use TypeScript or JavaScript?**
   - Type: `TypeScript` and press Enter

2. **Where to put your end-to-end tests?**
   - Type: `tests` and press Enter (default)

3. **Add a GitHub Actions workflow?**
   - Type: `n` (No) and press Enter

4. **Install Playwright browsers?**
   - Type: `y` (Yes) and press Enter

**What this does:**
- Creates `package.json` with Playwright installed
- Creates `playwright.config.ts` configuration file
- Creates `tests/` folder with an example test
- Creates `tests-examples/` folder
- Installs Playwright browsers (Chromium, Firefox, WebKit)

**Wait for it to complete** - you'll see "Installing Playwright browsers..." This takes 1-2 minutes.

---

## Step 5: Verify and Update package.json Scripts

After Playwright initialization, let's make sure the test scripts are properly set up.

Open `package.json` and find the `"scripts"` section. It might look like this:

```json
"scripts": {},
```

or

```json
"scripts": {
  "test": "playwright test"
},
```

**If it's empty `{}`, update it to this:**

```json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "test:ui": "playwright test --ui",
  "test:debug": "playwright test --debug",
  "report": "playwright show-report"
},
```

**What these scripts do:**
- `npm test` - Run tests in headless mode
- `npm run test:headed` - Run tests with visible browser
- `npm run test:ui` - Run tests in Playwright UI mode (interactive)
- `npm run test:debug` - Run tests in debug mode
- `npm run report` - Open the HTML test report

**Save the file** after making changes.

---

## Step 6: Install AutoHeal Library

Now add the AutoHeal library to your project:

```bash
npm install @sdetsanjay/autoheal-locator
```

**What this does:** Installs the AutoHeal self-healing locator library.

---

## Step 7: Create Additional Project Folders

You need two more folders: `helpers` and `pages`

### Option 1: Using VS Code (Recommended for beginners)

If you have VS Code open with your project:

1. In the Explorer panel (left side), right-click on your project folder
2. Select **"New Folder"**
3. Type `helpers` and press Enter
4. Repeat to create `pages` folder

### Option 2: Using Command Line

**On Windows:**
```bash
mkdir helpers
mkdir pages
```

**On Mac/Linux:**
```bash
mkdir helpers pages
```

**Your project structure should now look like:**
```
my-autoheal-project/
├── helpers/           (you just created)
├── pages/             (you just created)
├── tests/             (created by Playwright)
├── tests-examples/    (created by Playwright)
├── node_modules/
├── package.json
├── playwright.config.ts
└── package-lock.json
```

---

## Step 8: Update Playwright Configuration

The `playwright.config.ts` file was auto-created by Playwright. We just need to make a small change.

Open `playwright.config.ts` and find this section:

```typescript
use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
```

**Change it to this** (uncomment baseURL and set your website):

```typescript
use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://www.saucedemo.com',  // Or any website you want to automate

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
```

**What to change:**
- Uncomment `baseURL` (remove `//`)
- Set it to **any website you want to automate**
  - Example: `https://www.saucedemo.com` (we'll use this in our demo)
  - Or your own website: `https://yourwebsite.com`
  - Or your local app: `http://localhost:3000`

**That's it!** Keep everything else as it is. The auto-generated config is already set up well for testing.

---

## Step 9: Get Your API Keys

You need at least ONE API key from these providers:

### Option 1: Google Gemini (Recommended - FREE)
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key (looks like: `AIzaSyABC123...`)

### Option 2: OpenAI
1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy your key (looks like: `sk-...`)

### Option 3: Groq (Fast and Free)
1. Go to: https://console.groq.com/keys
2. Click "Create API Key"
3. Copy your key

---

## Step 10: Create .env.example File (Template)

First, create a template file that shows all available configuration options.

Create a file named `.env.example` in your project root:

```env
# =============================================================================
# AI Provider API Keys (Choose ONE)
# =============================================================================

# Google Gemini (Recommended - Fast and Free)
GEMINI_API_KEY=your_gemini_api_key_here
# Default Model: gemini-2.0-flash-exp
# Other Options: gemini-1.5-flash, gemini-1.5-pro, gemini-1.5-flash-8b

# OpenAI
# OPENAI_API_KEY=your_openai_api_key_here
# Default Model: gpt-4o-mini
# Other Options: gpt-4o, gpt-4-turbo, gpt-3.5-turbo

# Anthropic Claude
# CLAUDE_API_KEY=your_claude_api_key_here
# Default Model: claude-3-5-sonnet-20241022
# Other Options: claude-3-5-haiku-20241022, claude-3-opus-20240229

# DeepSeek
# DEEPSEEK_API_KEY=your_deepseek_api_key_here
# Default Model: deepseek-chat
# Other Options: deepseek-coder

# Grok (X.AI)
# GROK_API_KEY=your_grok_api_key_here
# Default Model: grok-beta
# Other Options: grok-2-1212, grok-2-vision-1212

# Groq (Fast Inference)
# GROQ_API_KEY=your_groq_api_key_here
# Default Model: llama-3.3-70b-versatile
# Other Options: llama-3.1-70b-versatile, mixtral-8x7b-32768

# =============================================================================
# Test Application Credentials
# =============================================================================
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce

# =============================================================================
# AutoHeal Configuration (Optional - Defaults shown)
# =============================================================================

# AI Provider to use (default: gemini)
# Options: gemini, openai, claude, deepseek, grok, groq
# AUTOHEAL_AI_PROVIDER=gemini

# AI Model to use (optional - uses provider's default if not specified)
# Examples:
#   For Gemini: gemini-2.0-flash-exp, gemini-1.5-flash, gemini-1.5-pro
#   For OpenAI: gpt-4o-mini, gpt-4o, gpt-4-turbo, gpt-3.5-turbo
#   For Claude: claude-3-5-sonnet-20241022, claude-3-5-haiku-20241022
#   For DeepSeek: deepseek-chat, deepseek-coder
#   For Grok: grok-beta, grok-2-1212, grok-2-vision-1212
#   For Groq: llama-3.3-70b-versatile, llama-3.1-70b-versatile, mixtral-8x7b-32768
# AUTOHEAL_AI_MODEL=

# Execution Strategy (default: SMART_SEQUENTIAL)
# Options: SMART_SEQUENTIAL, DOM_ONLY, VISUAL_FIRST, PARALLEL
# AUTOHEAL_EXECUTION_STRATEGY=SMART_SEQUENTIAL

# Cache Type (default: PERSISTENT_FILE)
# Options: PERSISTENT_FILE, IN_MEMORY, NONE
# AUTOHEAL_CACHE_TYPE=PERSISTENT_FILE

# Cache Directory (default: ./autoheal-cache)
# AUTOHEAL_CACHE_DIR=./autoheal-cache

# Cache Max Size (default: 10000)
# AUTOHEAL_CACHE_MAX_SIZE=10000

# Cache TTL in hours (default: 24)
# AUTOHEAL_CACHE_TTL_HOURS=24

# Enable AI Visual Analysis (default: true)
# AUTOHEAL_VISUAL_ANALYSIS_ENABLED=true

# Element Timeout in milliseconds (default: 30000)
# AUTOHEAL_ELEMENT_TIMEOUT_MS=30000

# AI Request Timeout in milliseconds (default: 30000)
# AUTOHEAL_AI_TIMEOUT_MS=30000

# Max Retry Attempts (default: 3)
# AUTOHEAL_MAX_RETRIES=3

# Enable Reporting (default: true)
# AUTOHEAL_REPORTING_ENABLED=true

# Reports Output Directory (default: ./autoheal-reports)
# AUTOHEAL_REPORTS_DIR=./autoheal-reports

# Enable Debug Logs (default: false)
# AUTOHEAL_DEBUG_LOGS=false
```

**This is just a template file** showing all available options with their default values (commented out).

---

## Step 11: Create Your .env File

Now create your actual `.env` file with your API key.

**Copy the `.env.example` file:**

**On Windows:**
```bash
copy .env.example .env
```

**On Mac/Linux:**
```bash
cp .env.example .env
```

**Now edit the `.env` file** and uncomment the API key you want to use:

```env
# Uncomment and add your actual API key
GEMINI_API_KEY=AIzaSyABC123YourActualKeyHere

# Keep the test credentials
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce

# Optional: Uncomment to customize AutoHeal behavior
# AUTOHEAL_EXECUTION_STRATEGY=SMART_SEQUENTIAL
# AUTOHEAL_CACHE_MAX_SIZE=10000
```

**Important:**
- Replace `AIzaSyABC123YourActualKeyHere` with your real API key
- Only uncomment the settings you want to change
- Commented settings use their default values automatically

---

## Step 12: Create AutoHeal Helper

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

**Two Functions - Choose What Works Best for You:**

### 1. **Simple Mode** - `getAutoHeal()` (Recommended for Beginners)
- Hardcoded to use **Gemini** AI provider
- Uses **SMART_SEQUENTIAL** strategy (best balance of speed and reliability)
- **Only requires:** `GEMINI_API_KEY` in your `.env` file
- Perfect when you just want it to work without configuration

**Example usage in your page objects:**
```typescript
this.autoHeal = AutoHealHelper.getAutoHeal(page);
```

**What you need in .env:**
```env
GEMINI_API_KEY=your_api_key_here
```

---

### 2. **Advanced Mode** - `getAutoHealWithConfig()` (Full Control)
- Reads **ALL** configuration from `.env` file automatically
- The AutoHeal library reads all `AUTOHEAL_*` environment variables
- Change provider, model, strategy, cache, timeouts, etc. without touching code
- Perfect when you want full flexibility

**Example usage in your page objects:**
```typescript
this.autoHeal = AutoHealHelper.getAutoHealWithConfig(page);
```

**What you can configure in .env:**
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

**Switch between providers easily:**
```env
# Use Gemini (default)
GEMINI_API_KEY=AIza...
AUTOHEAL_AI_PROVIDER=gemini

# Switch to OpenAI
OPENAI_API_KEY=sk-...
AUTOHEAL_AI_PROVIDER=openai
AUTOHEAL_AI_MODEL=gpt-4o

# Switch to Claude
CLAUDE_API_KEY=sk-ant-...
AUTOHEAL_AI_PROVIDER=claude
AUTOHEAL_AI_MODEL=claude-3-5-sonnet-20241022
```

**For this tutorial, we'll use the simple mode** - but you can always switch to advanced mode later by changing one line in your page objects!

---

## Step 13: Create Login Page Object

Create `pages/LoginPage.ts`:

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

  async goto(): Promise<void> {
    // Use '/' to go to the baseURL we set in playwright.config.ts
    // If baseURL is 'https://www.saucedemo.com', this goes to that URL
    // If you change baseURL later, you don't need to update this code!
    await this.page.goto('/');
  }

  async getUsernameInput(): Promise<Locator> {
    // INTENTIONALLY WRONG LOCATOR to demonstrate AI healing!
    return await this.autoHeal.find(
      this.page,
      this.page.locator('#wrong-username-id'),  // ❌ This is wrong!
      'Username input field'                     // ✅ AI will use this to find it
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
      this.page.locator('#login-button'),
      'Login submit button'
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

**Notice:** The username locator is intentionally wrong (`#wrong-username-id`) to show AI healing in action!

---

## Step 14: Create Inventory Page Object

Create `pages/InventoryPage.ts`:

```typescript
import { Page, Locator } from '@playwright/test';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

export class InventoryPage {
  private page: Page;
  private autoHeal: any;

  constructor(page: Page) {
    this.page = page;
    this.autoHeal = AutoHealHelper.getAutoHeal(page);
  }

  async getInventoryContainer(): Promise<Locator> {
    return await this.autoHeal.find(
      this.page,
      this.page.locator('.inventory_container'),
      'Main inventory container'
    );
  }

  async getProductTitle(index: number = 0): Promise<Locator> {
    return await this.autoHeal.find(
      this.page,
      this.page.locator('.inventory_item_name').nth(index),
      `Product title at index ${index}`
    );
  }

  async addProductToCart(productId: string): Promise<void> {
    const addButton = await this.autoHeal.find(
      this.page,
      this.page.locator(`[data-test="add-to-cart-${productId}"]`),
      `Add to cart button for ${productId}`
    );
    await addButton.click();
  }

  async getCartBadge(): Promise<Locator> {
    return await this.autoHeal.find(
      this.page,
      this.page.locator('.shopping_cart_badge'),
      'Shopping cart item count badge'
    );
  }

  async getCartItemCount(): Promise<number> {
    const badge = await this.getCartBadge();
    const text = await badge.textContent();
    return parseInt(text || '0');
  }
}
```

---

## Step 15: Create Your First Test

Create `tests/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { AutoHealHelper } from '../helpers/AutoHealHelper';

test.describe('AutoHeal Login Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test.afterAll(async () => {
    // Generate AutoHeal reports after all tests
    AutoHealHelper.generateReports('./autoheal-reports');
  });

  test('should login successfully with correct credentials', async ({ page }) => {
    // This will demonstrate AI healing because username locator is wrong!
    await loginPage.login(
      process.env.TEST_USERNAME || 'standard_user',
      process.env.TEST_PASSWORD || 'secret_sauce'
    );

    // Wait a bit for navigation
    await page.waitForTimeout(1000);

    // Verify we're on inventory page
    const inventoryContainer = await inventoryPage.getInventoryContainer();
    await expect(inventoryContainer).toBeVisible();

    console.log('✅ Login successful!');
  });

  test('should display products after login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(1000);

    // Get first product title
    const productTitle = await inventoryPage.getProductTitle(0);
    await expect(productTitle).toBeVisible();

    const titleText = await productTitle.textContent();
    console.log(`✅ First product: ${titleText}`);
  });

  test('should add product to cart', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(1000);

    // Add a product to cart
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await page.waitForTimeout(500);

    // Verify cart count
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(1);

    console.log('✅ Product added to cart successfully!');
  });
});
```

---

## Step 16: Run Your Tests!

Now run your tests:

```bash
npm test
```

**What you'll see:**
- Tests will run
- The username locator will FAIL initially (it's wrong!)
- ✨ **AI will automatically heal it** using the description
- Tests will pass
- AutoHeal report will be generated

---

## Step 17: View AutoHeal Report

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

**What you'll see in the report:**
- ❌ Original locator: `#wrong-username-id` (FAILED)
- ✅ AI healed to: `#user-name` (SUCCESS!)
- Time taken, tokens used, cost estimate
- Next time it runs, it will use the cached healed locator (much faster!)

---

## ✅ Congratulations!

You've successfully created your own AutoHeal Playwright project from scratch!

---

## 🎯 What Just Happened?

1. You used the official Playwright setup command (`npm init playwright@latest`)
2. Playwright automatically created the project structure, config files, and installed browsers
3. You added the AutoHeal library
4. You created helper and page object classes using AutoHeal
5. You intentionally used a **wrong locator** for username (`#wrong-username-id`)
6. AI automatically found the correct locator (`#user-name`) using your description
7. Your tests passed even with a broken locator!

---

## 🔄 Next Steps

### Fix the Wrong Locator (Optional)

Now that you've seen AI healing work, you can fix the locator:

1. Open `pages/LoginPage.ts`
2. Change line:
   ```typescript
   this.page.locator('#wrong-username-id'),  // ❌ Wrong
   ```
   To:
   ```typescript
   this.page.locator('#user-name'),  // ✅ Correct
   ```
3. Run tests again - they'll use the original locator (no AI needed)

### Add More Tests

- Create more page objects
- Add more test scenarios
- Try different AI providers (change in `AutoHealHelper.ts`)

### Try Different Providers

Edit `helpers/AutoHealHelper.ts` and change:

```typescript
// For OpenAI:
.withAIProvider('openai')

// For Groq:
.withAIProvider('groq')
```

Update your `.env` file with the corresponding API key.

---

## 📊 Understanding the Reports

**AutoHeal Report shows:**
- Which locators worked immediately
- Which ones needed AI healing
- Cache hit rate (2nd run onwards)
- Token usage and costs
- AI reasoning for each healing

**Playwright Report shows:**
- Standard test results
- Screenshots on failure
- Test execution timeline

---

## 💡 Tips

1. **Use descriptive element descriptions** - The better your description, the better AI can find elements
2. **Monitor the reports** - Check which locators need frequent healing
3. **Fix frequently healed locators** - Update them in your code for better performance
4. **Cache saves money** - Healed locators are cached, so healing happens only once

---

## ❌ Troubleshooting

### "Cannot find module '@sdetsanjay/autoheal-locator'"
**Solution:** Run `npm install @sdetsanjay/autoheal-locator`

### "API key not found" or "401 Unauthorized"
**Solution:**
1. Check `.env` file exists in project root
2. Verify your API key is correct
3. Make sure you're using the right provider name ('gemini', 'openai', 'groq')

### Tests timing out
**Solution:** Increase timeout in test:
```typescript
test('my test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ... test code
});
```

### AI healing not working
**Solution:**
1. Verify API key is valid
2. Check internet connection
3. Make sure element description is clear and specific
4. Check console for error messages

---

## 📞 Need More Help?

- See full documentation: [README.md](README.md)
- Quick reference: [QUICKSTART.md](QUICKSTART.md)
- AutoHeal package: https://www.npmjs.com/package/@sdetsanjay/autoheal-locator

---

**Happy Testing! 🎭**
