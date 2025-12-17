<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as IlluminateResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response|RedirectResponse
    {
        // If user is already authenticated, redirect to dashboard
        if (Auth::check()) {
            return redirect()->route('stock.index');
        }
        
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): IlluminateResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        
        // Regenerate CSRF token to ensure it's fresh after login
        $request->session()->regenerateToken();
        
        // Force session to be saved to database before redirect
        $request->session()->save();
        
        // CRITICAL: Use Inertia::location() to force FULL PAGE RELOAD
        // This ensures the page is loaded with fresh CSRF token from the server
        // instead of using stale token from Inertia props cache
        // This is the ONLY way to ensure CSRF token synchronization after login
        return Inertia::location(route('stock.index'));
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
