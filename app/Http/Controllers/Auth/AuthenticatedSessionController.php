<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        
        // Regenerate CSRF token to ensure it's fresh after login
        $request->session()->regenerateToken();
        
        // CRITICAL: Manually set XSRF-TOKEN cookie to match the new session token
        // This ensures the cookie is synchronized immediately after regeneration
        // Without this, Inertia will send the old XSRF-TOKEN causing 419 errors
        $token = $request->session()->token();
        cookie()->queue('XSRF-TOKEN', $token, 120, '/', null, true, false, false, 'lax');
        
        // Force session to be saved to database before redirect
        $request->session()->save();
        
        // Small delay to ensure database write completes
        usleep(100000); // 100ms delay

        return redirect()->intended(route('stock.index', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
