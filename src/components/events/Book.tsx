'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BookProps {
    id: number;
    image: string;
    isSelected: boolean;
    onSelect: (id: number) => void;
    otherSelected: boolean; // True if ANY book is selected (to disable interactions)
}

export default function Book({ id, image, isSelected, onSelect, otherSelected }: BookProps) {
    // When selected:
    // 1. We move to a fixed centered position using layoutId.
    // 2. We apply NO floating/bobbing animations.
    // 3. We animate a "page open" effect.

    return (
        <div className={cn("relative", isSelected ? "z-50" : "z-10")}>
            <motion.div
                layoutId={`book-container-${id}`}
                onClick={() => !otherSelected && onSelect(id)}
                className={cn(
                    "relative cursor-pointer transition-opacity duration-300",
                    !isSelected && otherSelected && "opacity-50 pointer-events-none grayscale-[0.5]",
                    // Basic hover only when NO book is selected
                    !otherSelected && "hover:scale-105"
                )}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
            >
                {/* The Book Cover */}
                <motion.div
                    layoutId={`book-cover-${id}`}
                    className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 z-0" // Removed overflow-hidden, rounded-xl, shadow-xl (moved to children or wrapper)
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* The Book Cover Image (Static/Back) */}
                    <div className="absolute inset-0 ancient-page rounded-xl overflow-hidden shadow-xl">
                        {/* Image removed to ensure blank page */}
                    </div>

                    {/* Overlay for "Opening" animation (The Page that flips) */}
                    {isSelected && (
                        <motion.div
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: -180 }}
                            transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1.000] }} // Cubic-bezier for "classic" feel
                            className="absolute inset-0 ancient-page rounded-xl origin-left"
                            style={{ backfaceVisibility: 'visible', transformStyle: 'preserve-3d' }}
                        >
                            {/* Dynamic Shadow for realism */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 1, times: [0, 0.5, 1] }}
                                className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"
                            />

                            {/* Blank Page */}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            {/* Backdrop when selected - handled by parent or global overlay, 
                but we can ensure this element stays centered here if we used fixed positioning.
                However, existing plan suggests layout animation. 
                For "exact center", usually fixed position is easier, 
                but layoutId works if the target container is centered.
            */}
        </div>
    );
}
