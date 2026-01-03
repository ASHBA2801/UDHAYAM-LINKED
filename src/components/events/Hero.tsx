import Link from 'next/link';
import BookTable from './BookTable';

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 'var(--space-xl)' }}>
                    {/* Left Content */}
                    <div className="text-group-md" style={{ gap: 'var(--space-lg)' }}>
                        <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest">
                            WELCOME TO UDHAYAM
                        </p>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                            Experience <br />
                            <span className="gradient-text">India&apos;s Premier</span> <br />
                            Intercollege Fest
                        </h1>

                        <div className="text-group-md">
                            <p className="text-gray-400 text-xs font-medium">
                                Organized by KIT - Kalaignar Karunanidhi Institute of Technology
                            </p>

                            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Discover amazing events, connect with fellow participants, and create unforgettable memories
                                across cultural, technical, and sports competitions.
                            </p>
                        </div>

                        <div style={{ marginTop: 'var(--space-md)' }}>
                            <Link href="/events" className="btn-primary">
                                Browse Events
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Image Grid */}
                    {/* Right Content - Book Table */}
                    <div className="w-full">
                        <BookTable
                            books={[
                                { id: 1, image: "/event1.png" },
                                { id: 2, image: "/event2.png" },
                                { id: 3, image: "/event3.png" },
                                { id: 4, image: "/event4.png" },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
