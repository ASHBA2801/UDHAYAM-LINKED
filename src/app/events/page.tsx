'use client';

import BookReader from '@/components/events/BookReader';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Book {
    id: string;
    name: string;
    coverImage: string;
    frontCover: string;
    backCover: string;
}

export default function EventsPage() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const books: Book[] = [
        {
            id: 'technical',
            name: 'Technical',
            coverImage: '/Technical_Book.png',
            frontCover: '/book_1_front.png',
            backCover: '/book_1_back.png',
        },
        {
            id: 'non-technical',
            name: 'Non-Technical',
            coverImage: '/Non_Technical_Book.png',
            frontCover: '/book_2_front.png',
            backCover: '/book_2_back.png',
        },
        {
            id: 'cultural',
            name: 'Cultural',
            coverImage: '/Cultural_Book.png',
            frontCover: '/book_3_front.png',
            backCover: '/book_3_back.png',
        },
        {
            id: 'sports',
            name: 'Sports',
            coverImage: '/Sports_Book.png',
            frontCover: '/book_4_front.png',
            backCover: '/book_4_back.png',
        },
    ];

    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-12 lg:pt-28 lg:pb-0">
                {/* EVENTS Title - Upper Middle */}
                <h1 className="absolute top-16 lg:top-24 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-amber-400 tracking-wider drop-shadow-lg z-10 text-float">
                    EVENTS
                </h1>

                {/* Books Grid */}
                <div className="w-full max-w-7xl px-4 sm:px-6 mt-24 sm:mt-28 lg:mt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 justify-items-center">
                        {books.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => setSelectedBook(book)}
                            >
                                {/* Book with floating animation - responsive size */}
                                <div className="relative w-32 h-44 sm:w-44 sm:h-56 md:w-56 md:h-72 lg:w-64 lg:h-80 book-float">
                                    <Image
                                        src={book.coverImage}
                                        alt={book.name}
                                        fill
                                        className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                        priority
                                    />
                                </div>

                                {/* Book Name - responsive text */}
                                <h2 className="book-name-spacing text-sm sm:text-lg md:text-xl lg:text-2xl font-serif text-amber-100 tracking-wide group-hover:text-amber-400 transition-colors text-center text-float-delayed">
                                    {book.name}
                                </h2>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Floating Animation Styles */}
                <style jsx>{`
                    @keyframes bookFloat {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }

                    @keyframes textFloat {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }

                    .book-float {
                        animation: bookFloat 3s ease-in-out infinite;
                        will-change: transform;
                    }

                    .text-float {
                        animation: textFloat 3s ease-in-out infinite;
                        will-change: transform;
                    }

                    .text-float-delayed {
                        animation: textFloat 3s ease-in-out infinite;
                        will-change: transform;
                    }

                    .book-name-spacing {
                        margin-top: 12px;
                    }

                    @media (min-width: 640px) {
                        .book-name-spacing {
                            margin-top: 15px;
                        }
                    }

                    @media (min-width: 768px) {
                        .book-name-spacing {
                            margin-top: 20px;
                        }
                    }

                    @media (min-width: 1024px) {
                        .book-name-spacing {
                            margin-top: 25px;
                        }
                    }
                `}</style>
            </main>

            {/* Book Reader Modal */}
            <AnimatePresence>
                {selectedBook && (
                    <BookReader
                        bookId={selectedBook.id}
                        bookName={selectedBook.name}
                        frontCover={selectedBook.frontCover}
                        backCover={selectedBook.backCover}
                        onClose={() => setSelectedBook(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
