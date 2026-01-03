import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-800 section-padding">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 section">
                    {/* Brand Section */}
                    <div className="text-group-md">
                        <h3 className="logo">UDHAYAM</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            India&apos;s premier intercollege fest
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Organized by KIT - Kalaignar Karunanidhi Institute of Technology
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Developed by <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Dinesh B</Link>, <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Sheehan P</Link> & <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Dharaneesh S K</Link>
                        </p>
                    </div>



                    {/* Contact Info */}
                    <div className="text-group md:justify-self-end">
                        <h4 className="font-semibold text-white text-sm" style={{ marginBottom: 'var(--space-sm)' }}>Contact</h4>
                        <div className="flex flex-col gap-3 text-sm text-gray-400">
                            <div className="flex items-start" style={{ gap: 'var(--space-sm)' }}>
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:support@udhayam.com" className="footer-link text-xs">support@udhayam.com</a>
                            </div>
                            <div className="flex items-start" style={{ gap: 'var(--space-sm)' }}>
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+91-XXXX-XXXX" className="footer-link text-xs">+91-XXXX-XXXX</a>
                            </div>
                            <div className="flex items-start" style={{ gap: 'var(--space-sm)' }}>
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="leading-relaxed text-xs">KIT - Kalaignar Karunanidhi Institute of Technology</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 text-center text-xs text-gray-500" style={{ paddingTop: 'var(--space-lg)' }}>
                    <p>© 2025 UDHAYAM. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
