import { test, expect } from '@playwright/test';
import { FormPage } from '../Pages/FormPage';

test.describe('Form validation Tests', () => {
    let formPage: FormPage; // variable to hold the FormPage object

    // Inirialize the FormPage object and navigate to the form URL before each test
    test.beforeEach(async ({ page }) => {
        formPage = new FormPage(page); // initialize the FormPage with the page object
        await formPage.navigateToUrl(); // Navigate to the form URL
    });

    // Test case 1:
    test('TC-001: verify form submission without input', async ({ page }) => {
        await formPage.submitForm(); // Submit the form without filling any fields
        
        // Register a listener for the dialog event
        page.on('dialog', async (dialog) => {
            // Assert the alert message content
            expect(dialog.message()).toContain('First name must be filled out');
            await dialog.accept();
        })
    })
})