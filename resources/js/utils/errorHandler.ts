import { router } from '@inertiajs/react';

/**
 * Handle Inertia errors globally
 * Specifically handles 419 CSRF token expiration
 */
export function handleInertiaError(error: any): boolean {
    // Check for 419 CSRF token mismatch
    if (error.response?.status === 419 ||
        error?.message?.includes('419') ||
        error?.message?.includes('CSRF') ||
        error?.message?.includes('expired')) {

        // Show user-friendly message
        const shouldReload = confirm(
            'Your session has expired. The page will reload to get a fresh session.\n\n' +
            'Note: Any unsaved changes will be preserved.'
        );

        if (shouldReload) {
            window.location.reload();
        }

        return true;
    }

    // Check for 401 Unauthorized
    if (error.response?.status === 401) {
        alert('You are not authorized. Redirecting to login...');
        router.visit('/login');
        return true;
    }

    // Check for 500 Server Error
    if (error.response?.status === 500) {
        alert('A server error occurred. Please try again or contact support.');
        return true;
    }

    return false;
}

/**
 * Save form data to localStorage
 */
export function saveFormData(formKey: string, data: any): void {
    try {
        localStorage.setItem(`form_backup_${formKey}`, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.error('Failed to save form data:', error);
    }
}

/**
 * Restore form data from localStorage
 * Returns null if no data or data is too old (> 1 hour)
 */
export function restoreFormData(formKey: string): any | null {
    try {
        const stored = localStorage.getItem(`form_backup_${formKey}`);
        if (!stored) return null;

        const { data, timestamp } = JSON.parse(stored);

        // Check if data is less than 1 hour old
        const oneHour = 60 * 60 * 1000;
        if (Date.now() - timestamp > oneHour) {
            // Data too old, remove it
            localStorage.removeItem(`form_backup_${formKey}`);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Failed to restore form data:', error);
        return null;
    }
}

/**
 * Clear form data from localStorage
 */
export function clearFormData(formKey: string): void {
    try {
        localStorage.removeItem(`form_backup_${formKey}`);
    } catch (error) {
        console.error('Failed to clear form data:', error);
    }
}
