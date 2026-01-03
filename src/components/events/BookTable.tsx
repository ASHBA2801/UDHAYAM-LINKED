'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Book from './Book';

interface BookTableProps {
    books: { id: number; image: string }[];
}

export default function BookTable({ books }: BookTableProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="relative w-full h-full">
            {/* The Background Blur Overlay - appears when any book is selected */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)} // Click outside to close
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
                    />
                )}
            </AnimatePresence>

            {/* The Grid of Books */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-2xl mx-auto">
                {books.map((book) => (
                    <div key={book.id} className="relative flex justify-center items-center h-64">
                        {/* We only render the grid version if it's NOT selected.
                             Or we keep it but hide it? 
                             Framer Motion's layoutId works best when one creates and the other destroys.
                             So if selectedId === book.id, we DO NOT render it here.
                          */}
                        {selectedId !== book.id && (
                            <Book
                                id={book.id}
                                image={book.image}
                                isSelected={false}
                                otherSelected={!!selectedId}
                                onSelect={setSelectedId}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* The Selected Book (Centered Overlay) */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        {/* We use a container to center, but the Book handles the layoutId */}
                        {books.filter(b => b.id === selectedId).map(book => (
                            <div key={book.id} className="pointer-events-auto" onClick={() => setSelectedId(null)}>
                                {/* Added generic onClick to close if clicking the book itself? 
                                     Request says "Keep the selected book as the only interactive element".
                                     The user might want to interact WITH the book, not close it by clicking it.
                                     So I won't put onClick={close} on the book itself, only the background.
                                 */}
                                <Book
                                    id={book.id}
                                    image={book.image}
                                    isSelected={true}
                                    otherSelected={true}
                                    onSelect={() => { }} // Already selected
                                />
                            </div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
