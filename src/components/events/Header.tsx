'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="bg-black/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <nav className="container" style={{ paddingBlock: 'var(--space-sm)' }}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="logo flex items-center" style={{ gap: 'var(--space-xs)' }}>
                        🏛️ UDHAYAM
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center" style={{ gap: 'var(--space-lg)' }}>
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/events" className="nav-link">Events</Link>
                        <Link href="/departments" className="nav-link">Departments</Link>
                        <Link href="/schedule" className="nav-link">Schedule</Link>
                        <Link href="/contact" className="nav-link">Contact</Link>
                    </div>

                    {/* User Profile */}
                    <div className="relative flex items-center" style={{ gap: 'var(--space-sm)' }}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center bg-purple-600 hover:bg-purple-700 transition-colors rounded-full"
                            style={{ gap: 'var(--space-sm)', padding: 'var(--space-xs) var(--space-sm)' }}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                G
                            </div>
                            <span className="hidden sm:block text-sm font-medium">Guru Vishnu</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 top-full w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800" style={{ marginTop: 'var(--space-xs)', paddingBlock: 'var(--space-xs)' }}>
                                <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
                                    Profile
                                </Link>
                                <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
                                    Settings
                                </Link>
                                <hr className="border-gray-800" style={{ marginBlock: 'var(--space-xs)' }} />
                                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
                                    Logout
                                </button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-800 text-group" style={{ marginTop: 'var(--space-sm)', paddingTop: 'var(--space-sm)' }}>
                        <Link href="/" className="block nav-link py-3 px-2 hover:bg-gray-800/50 rounded-lg transition-colors">Home</Link>
                        <Link href="/events" className="block nav-link py-3 px-2 hover:bg-gray-800/50 rounded-lg transition-colors">Events</Link>
                        <Link href="/departments" className="block nav-link py-3 px-2 hover:bg-gray-800/50 rounded-lg transition-colors">Departments</Link>
                        <Link href="/schedule" className="block nav-link py-3 px-2 hover:bg-gray-800/50 rounded-lg transition-colors">Schedule</Link>
                        <Link href="/contact" className="block nav-link py-3 px-2 hover:bg-gray-800/50 rounded-lg transition-colors">Contact</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
