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
        });
    });

    // Test case 2:
    test('TC-002: Validate first name field for invalid input', async ({ page }) => {
        // Fill the form with invalid first name, valid other fields
        await formPage.fillForm({
            firstName: '123@#%',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'Password',
            confirmPassword: 'Password',
        });
        await formPage.submitForm(); // Submit the form

        // Register a listener for the dialog event
        page.on('dialog', async (dialog) => {
            // Assert the alert message content
            expect(dialog.message()).toContain('First name must contain alphabetical characters only');
            await dialog.accept();
        });
    });

    // Test case 3:
    test('TC-003: Validate email field for invalid format', async ({ page }) => {
        // Fill the form with an invalid email format, valid other fields
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'abc@example',
            password: 'Password',
            confirmPassword: 'Password'
        });
        await formPage.submitForm(); // Submit the form

        // Register a listener for the dialog event
        page.on('dialog', async (dialog) => {
            // Assert the alert message content
            expect(dialog.message()).toContain('Email must be a valid email address');
            await dialog.accept();
        });
    });

    // Test case 4:
    test('TC-004: Validate password matching', async ({ page }) => {
        // Fill the form with mismatched password and confirm password, valid other fields
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'Password123',
            confirmPassword: 'Passsword456'
        });
        await formPage.submitForm(); // Submit the form

        // Register a listener for the dialog event
        page.on('dialog', async (dialog) => {
            // Assert the alert message content
            expect(dialog.message()).toContain('Passwords do not match');
            await dialog.accept();
        });

    });

    // Test case 5:
    test('TC-005: validate gender selection functionality', async () => {
        // Fill the form with a selected gender, valid other fields
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'John.doe@example.com',
            password: 'Password',
            confirmPassword: 'Password',
            gender: 'male'
        });
        await formPage.submitForm(); // Submit the form
    });

    // Test case 6:
    test('TC-006: Validate phone number field for invalid input', async () => {
        // Fill the form with an invalid phone number, valid other fields
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'John.doe@example.com',
            password: 'Password',
            confirmPassword: 'Password',
            phoneNumber: 'adc123'
        });
        await formPage.submitForm(); // Submit the form
    });

    // Test case 7:
    test('TC-007: Validate LinkedIn URL field for invalid URLs', async () => {
        // Fill the form with an invalid LinkedIn URL, valide other fields
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'John.doe@example.com',
            password: 'Password',
            confirmPassword: 'Password',
            linkedIn: 'example'
        });
        await formPage.submitForm(); // Submit the form
    });

    // Test case 8:
    test('TC-008: Test form submission with valid inputs', async () => {
        // Fill the form with valid inputs
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'John.doe@example.com',
            password: 'Password',
            confirmPassword: 'Password',
            gender: 'male',
            phoneNumber: '1234567890',
            linkedIn: ' https://www.linkedin.com/in/johnsmith'
        });
        await formPage.submitForm(); // Submit the form
    });

    // Test case 9:
    test('TC-009: Validate submission with mandatory fields only', async () => {
        // Fill the form with mandatory fields only
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'John.doe@example.com',
            password: 'Password',
            confirmPassword: 'Password'
        });
        await formPage.submitForm(); // Submit the form
    });

    // Test case 10:
    test('TC-010: Validate submission with one mandatory field missing', async ({ page }) => {
        // Fill the form with a missing first name, valid other fields
        await formPage.fillForm({
            firstName: '',
            lastName: 'Doe',
            email: 'John.doe@example.com',
            password: 'Password',
            confirmPassword: 'Password'
        });
        await formPage.submitForm();
        
        // Register a listener for the dialog event
        page.on('dialog', async (dialog) => {
            // Assert the alert message content
            expect(dialog.message()).toContain('First name must be filled out');
            await dialog.accept();
        });
    }); 
});