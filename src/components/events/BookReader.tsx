'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'framer-motion';
import { generateBookPages, BookPage } from '@/utils/generateBookPages';
import './BookReader.css';

const DUST_PARTICLE_COUNT = 40;

interface BookReaderProps {
    bookId: string;
    bookName: string;
    frontCover: string;
    backCover: string;
    onClose: () => void;
    initialRect?: { top: number; left: number; width: number; height: number };
}

export default function BookReader({
    bookId,
    bookName,
    frontCover,
    backCover,
    initialRect,
    onClose,
}: BookReaderProps) {
    const [pages] = useState<BookPage[]>(() =>
        generateBookPages(bookId, frontCover, backCover)
    );

    const bookRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const calculateDimensions = () => {
            const mobile = window.innerWidth < 640;
            const tablet = window.innerWidth >= 640 && window.innerWidth < 1024;
            setIsMobile(mobile);

            // Target aspect ratio for a single page (width/height)
            const singlePageRatio = 500 / 700; // 0.714

            // On mobile/tablet, show single page (portrait), so target ratio is just the page ratio
            // On desktop, show spread (2 pages), so target ratio is double
            const targetRatio = (mobile || tablet) ? singlePageRatio : singlePageRatio * 2;

            // Available space in viewport - Improved design
            let availableWidth, availableHeight;

            if (mobile) {
                // Mobile: Even larger size
                availableWidth = window.innerWidth * 0.88;
                availableHeight = window.innerHeight * 0.72;
            } else if (tablet) {
                // Tablet: Even larger size
                availableWidth = window.innerWidth * 0.82;
                availableHeight = window.innerHeight * 0.72;
            } else {
                // Desktop: Even larger size
                availableWidth = window.innerWidth * 0.85;
                availableHeight = window.innerHeight * 0.75;
            }

            // Calculate dimensions that fit within available space while maintaining aspect ratio
            let finalWidth = availableWidth;
            let finalHeight = finalWidth / targetRatio;

            // If height exceeds available height, scale down based on height
            if (finalHeight > availableHeight) {
                finalHeight = availableHeight;
                finalWidth = finalHeight * targetRatio;
            }

            // Set minimum dimensions for readability
            if (mobile) {
                finalWidth = Math.max(finalWidth, 280);
                finalHeight = Math.max(finalHeight, 400);
            }

            setDimensions({ width: finalWidth, height: finalHeight });
            setIsReady(true);
        };

        // Calculate immediately and on resize
        calculateDimensions();
        window.addEventListener('resize', calculateDimensions);

        return () => window.removeEventListener('resize', calculateDimensions);
    }, []);

    // Close handler
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    // Navigation handlers
    const handleBack = useCallback(() => {
        if (!isReady || !bookRef.current) return;

        // Always go to previous page, don't close the book
        bookRef.current.pageFlip().flipPrev();
    }, [isReady]);

    const handleNext = useCallback(() => {
        if (!isReady || !bookRef.current) return;

        // If on last page, close the book
        if (currentPage >= pages.length - 1) {
            handleClose();
        } else {
            bookRef.current.pageFlip().flipNext();
        }
    }, [isReady, currentPage, pages.length, handleClose]);


    // Auto-flip to page 1 animation (Desktop only - creates "opening" effect)
    useEffect(() => {
        if (isReady && bookRef.current && !isMobile) {
            setTimeout(() => {
                bookRef.current.pageFlip().flip(1);
                setCurrentPage(1);
            }, 500);
        } else if (isReady) {
            setCurrentPage(0);
        }
    }, [isReady, isMobile]);

    // Track page changes
    useEffect(() => {
        if (!bookRef.current || !isReady) return;

        const pageFlip = bookRef.current.pageFlip();
        if (!pageFlip) return;

        // Listen for page flip events
        const handleFlip = (e: any) => {
            // react-pageflip passes page index in e.data
            const page = e?.data ?? pageFlip.getCurrentPageIndex() ?? 0;
            setCurrentPage(page);
        };

        // react-pageflip uses 'flip' event
        pageFlip.on('flip', handleFlip);

        // Initialize current page
        const current = pageFlip.getCurrentPageIndex();
        if (current !== null && current !== undefined) {
            setCurrentPage(current);
        }

        return () => {
            pageFlip.off('flip', handleFlip);
        };
    }, [isReady]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isReady) return;
            if (e.key === 'ArrowRight') {
                bookRef.current?.pageFlip()?.flipNext();
            } else if (e.key === 'ArrowLeft') {
                bookRef.current?.pageFlip()?.flipPrev();
            } else if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isReady, handleClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurred Click-to-Close Layer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
                onClick={handleClose}
            />

            {/* Close Button - Matching Departments Page Style */}
            <button
                onClick={handleClose}
                className="absolute top-8 right-8 sm:top-16 sm:right-16 z-[60] text-amber-400 hover:text-amber-200 transition-colors drop-shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Book Container - The moving element */}
            <AnimatePresence>
                {dimensions.width > 0 && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                        style={{ width: dimensions.width, height: dimensions.height }}
                        className="relative z-50 shadow-2xl"
                    >
                        <HTMLFlipBook
                            width={Math.floor(isMobile ? dimensions.width : dimensions.width / 2)} // Explicit single page width
                            height={Math.floor(dimensions.height)} // Explicit page height
                            size="fixed" // Enforce our calculated dimensions
                            minWidth={100}
                            maxWidth={2000}
                            minHeight={150}
                            maxHeight={2000}
                            maxShadowOpacity={0.5}
                            showCover={false}
                            mobileScrollSupport={true}
                            className="html-flip-book"
                            ref={bookRef}
                            style={{ opacity: 1, margin: 'auto' }} // Force center in container
                            startPage={0}
                            drawShadow={true}
                            flippingTime={1000}
                            usePortrait={isMobile} // Single page on mobile, spread on desktop
                            startZIndex={0}
                            autoSize={false}
                            clickEventForward={true}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={true}
                            disableFlipByClick={false}
                        >
                            {/* Content Pages */}
                            {pages.map((page, index) => {
                                const isFirstOrLast = index === 0 || index === pages.length - 1;
                                return (
                                    <div
                                        className="book-page relative"
                                        key={index}
                                    >
                                        {/* Universal: Left side click on first page closes */}
                                        {index === 0 && (
                                            <div
                                                className="absolute left-0 top-0 bottom-0 w-1/5 z-20 cursor-w-resize"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClose();
                                                }}
                                                title="Close Book"
                                            />
                                        )}

                                        {/* Universal: Right side click on last page closes */}
                                        {index === pages.length - 1 && (
                                            <div
                                                className="absolute right-0 top-0 bottom-0 w-1/5 z-20 cursor-e-resize"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClose();
                                                }}
                                                title="Close Book"
                                            />
                                        )}

                                        <div className="book-page-content">
                                            {/* Reusing the ancient page style */}
                                            <div className="ancient-page-content relative border-2 border-amber-900/10 m-2 rounded">
                                                <div className="page-border"></div>
                                                <div className="corner-ornament top-left"></div>
                                                <div className="corner-ornament top-right"></div>
                                                <div className="corner-ornament bottom-left"></div>
                                                <div className="corner-ornament bottom-right"></div>

                                                <div className="w-full h-full overflow-auto custom-scrollbar p-2"
                                                    dangerouslySetInnerHTML={{ __html: page.content }}
                                                />
                                            </div>
                                            <button className="register-btn">Register</button>
                                            <div className="page-number">{index + 1}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </HTMLFlipBook>

                        {/* Navigation Buttons Container - Bottom of book */}
                        <div className="nav-buttons-container">
                            <button
                                onClick={handleBack}
                                className="nav-btn nav-btn-back"
                                title="Previous Page"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                className="nav-btn nav-btn-next"
                                title={currentPage >= pages.length - 1 ? "Close Book" : "Next Page"}
                            >
                                Next
                            </button>
                        </div>

                        {/* Dust Particles Overlay - Moved inside book container */}
                        <div className="dust-container">
                            {Array.from({ length: DUST_PARTICLE_COUNT }).map((_, i) => (
                                <div
                                    key={i}
                                    className="dust-particle"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        width: `${Math.random() * 4 + 1}px`,
                                        height: `${Math.random() * 4 + 1}px`,
                                        animationDelay: `${Math.random() * 5}s`,
                                        animationDuration: `${Math.random() * 10 + 5}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
