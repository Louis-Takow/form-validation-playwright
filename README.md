# Form Validation Testing with Playwright

This project uses [Playwright](https://playwright.dev/) with TypeScript to automate testing of form validation scenarios across **Chromium**, **Firefox**, and **Webkit**.
----

## Getting Started

### 1. Clone the repo

``` bash
git clone https://github.com/Louis-Takow/form-validation-playwright.git
cd form-validation-playwright
```

### 2. Install dependencies 

```bash
npm install
```
### 3. Install browsers

```bash
npx playwright install
```
### 4. Running Tests
**Headless mode (default)**
This is how CI piplines and most local runs executs:

``` bash
npx playwright test
```
**Headed mode (show browser UI)**
Use the --headed flag to debug visually:

``` bash
npx playwright test --headed
```
### 5. View Test Report
After running tests:

``` bash
npx playwright show-report
```
