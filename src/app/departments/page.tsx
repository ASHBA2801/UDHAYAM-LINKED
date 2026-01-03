'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

// Updated Department Types
type DepartmentType =
    | 'AERO' | 'AGRI' | 'AI & DS' | 'BME' | 'BIOTECH'
    | 'CSE' | 'CSBS' | 'ECE' | 'VLSI' | 'EEE'
    | 'MECH' | 'AIML' | 'MBA' | 'MCA'
    | null;


export default function DepartmentsPage() {
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [showCoins, setShowCoins] = useState(false);
    const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

    // Viewport state for responsive coin positions
    const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

    // Lock scroll when event is selected
    useEffect(() => {
        if (selectedEventIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedEventIndex]);

    // Handle window resize for responsive coin positions
    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        // Set initial value
        setViewportWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCoinClick = (deptId: string) => {
        setSelectedDepartment(deptId);
    };

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedDepartment) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'; // or 'unset'
        }

        // Cleanup function to ensure scroll is re-enabled if component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedDepartment]);

    // Automatically show coins after 1.5 seconds when department is selected
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (selectedDepartment) {
            // Reset showCoins initially effectively handled by "else" in previous logic or default state, 
            // but ensuring it's false at start of selection might be needed if not handled elsewhere.
            // Currently onClick sets selectedDepartment. 

            timer = setTimeout(() => {
                setShowCoins(true);
            }, 1500);
        } else {
            setShowCoins(false);
        }

        return () => clearTimeout(timer);
    }, [selectedDepartment]);

    const departments = [
        { id: 'AERO', name: 'AERO' },
        { id: 'AGRI', name: 'AGRI' },
        { id: 'AI&DS', name: 'AI & DS' },
        { id: 'BME', name: 'BME' },
        { id: 'BIOTECH', name: 'BIOTECH' },
        { id: 'CSE', name: 'CSE' },
        { id: 'CSBS', name: 'CSBS' },
        { id: 'ECE', name: 'ECE' },
        { id: 'VLSI', name: 'VLSI' },
        { id: 'EEE', name: 'EEE' },
        { id: 'MECH', name: 'MECH' },
        { id: 'CSE(AI&ML)', name: 'CSE (AI&ML)' },
        { id: 'MBA', name: 'MBA' },
        { id: 'MCA', name: 'MCA' },
    ];


    return (
        <>
            <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">


                <div className="w-full max-w-7xl px-6 pt-40 pb-24">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-amber-400 mt-8 sm:mt-12 mb-8 sm:mb-12 pt-[10px] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        DEPARTMENTS
                    </h1>

                    {/* Treasure Chests Grid */}
                    {/* Department Rows: 5 - 4 - 5 */}
                    {/* Department Rows: 5 - 4 - 5 */}
                    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full">
                        {[
                            departments.slice(0, 5),   // First row: 5 items
                            departments.slice(5, 9),   // Second row: 4 items
                            departments.slice(9, 14)   // Third row: 5 items
                        ].map((row, rowIndex) => (
                            <div key={rowIndex} className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                                {row.map((dept) => (
                                    <div
                                        key={dept.id as string}
                                        className="group flex flex-col items-center cursor-pointer"
                                        onClick={() => handleCoinClick(dept.id as string)}
                                    >
                                        {/* Treasure Chest Container with Tilt Effect */}
                                        <Tilt
                                            scale={1.1}
                                            tiltMaxAngleX={15}
                                            tiltMaxAngleY={15}
                                            perspective={1000}
                                            transitionSpeed={1000}
                                            className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                                        >
                                            <Image
                                                src="/treasure_chest_final.png"
                                                alt={dept.name}
                                                fill
                                                className="object-contain drop-shadow-2xl"
                                                priority
                                            />
                                        </Tilt>

                                        {/* Department Label */}
                                        <div className="mt-4 text-center">
                                            <span className="text-amber-100/80 font-serif text-sm md:text-base font-bold tracking-widest uppercase group-hover:text-amber-400 transition-colors duration-300">
                                                {dept.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Open Chest Modal Overlay */}
                    <AnimatePresence>
                        {selectedDepartment && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => {
                                    if (selectedEventIndex !== null) {
                                        setSelectedEventIndex(null);
                                    } else {
                                        setSelectedDepartment(null);
                                        setShowCoins(false);
                                    }
                                }}
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer"
                            >
                                {/* Close/Back Button for Department View */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (selectedEventIndex !== null) {
                                            setSelectedEventIndex(null); // Go back to coins
                                        } else {
                                            setSelectedDepartment(null); // Close department
                                            setShowCoins(false);
                                        }
                                    }}
                                    className="absolute top-8 right-8 sm:top-16 sm:right-16 z-[60] text-amber-400 hover:text-amber-200 transition-colors drop-shadow-md"
                                >
                                    {selectedEventIndex !== null ? (
                                        // Back Arrow Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    ) : (
                                        // Close X Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </button>
                                <div className="relative w-full max-w-4xl flex flex-col sm:flex-row justify-center items-center h-auto sm:h-[500px] px-4 sm:px-0">
                                    <motion.div
                                        layoutId={`chest-${selectedDepartment}`}
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{
                                            scale: showCoins ? 0.9 : 1,
                                            opacity: selectedEventIndex !== null ? 0 : 1 // Fade out chest when event is selected
                                        }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        whileHover={{ scale: showCoins ? 0.9 : 1.05 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1 }}
                                        className="relative z-20 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (selectedEventIndex === null) setShowCoins(true);
                                        }}
                                    >
                                        <Image
                                            src="/open_chest.png"
                                            alt="Open Chest"
                                            fill
                                            className="object-contain drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]"
                                            priority
                                        />


                                        {/* Department name below chest */}
                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="absolute -bottom-12 sm:-bottom-20 left-1/2 -translate-x-1/2 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-amber-400 font-bold drop-shadow-lg whitespace-nowrap tracking-widest"
                                        >
                                            {departments.find(d => d.id === selectedDepartment)?.name}
                                        </motion.h3>
                                    </motion.div>

                                    {/* Flying Coins */}
                                    <AnimatePresence>
                                        {showCoins && (
                                            <>
                                                {(() => {
                                                    const coinPositions = viewportWidth < 640
                                                        ? [
                                                            { x: -100, y: -220, label: "Event 1", name: "Paper Presentation", date: "Oct 12, 2025", time: "10:00 AM", coordinator: "John Doe", contact: "9876543210" },
                                                            { x: 100, y: -220, label: "Event 2", name: "Code Debugging", date: "Oct 12, 2025", time: "02:00 PM", coordinator: "Jane Smith", contact: "9876543211" },
                                                            { x: -100, y: 220, label: "Event 3", name: "Web Design", date: "Oct 13, 2025", time: "09:00 AM", coordinator: "Robert Brown", contact: "9876543212" },
                                                            { x: 100, y: 220, label: "Event 4", name: "Technical Quiz", date: "Oct 13, 2025", time: "01:00 PM", coordinator: "Emily White", contact: "9876543213" },
                                                        ]
                                                        : viewportWidth < 1024
                                                            ? [
                                                                { x: -220, y: -130, label: "Event 1", name: "Paper Presentation", date: "Oct 12, 2025", time: "10:00 AM", coordinator: "John Doe", contact: "9876543210" },
                                                                { x: 220, y: -130, label: "Event 2", name: "Code Debugging", date: "Oct 12, 2025", time: "02:00 PM", coordinator: "Jane Smith", contact: "9876543211" },
                                                                { x: -220, y: 130, label: "Event 3", name: "Web Design", date: "Oct 13, 2025", time: "09:00 AM", coordinator: "Robert Brown", contact: "9876543212" },
                                                                { x: 220, y: 130, label: "Event 4", name: "Technical Quiz", date: "Oct 13, 2025", time: "01:00 PM", coordinator: "Emily White", contact: "9876543213" },
                                                            ]
                                                            : [
                                                                { x: -350, y: -140, label: "Event 1", name: "Paper Presentation", date: "Oct 12, 2025", time: "10:00 AM", coordinator: "John Doe", contact: "9876543210" },
                                                                { x: 350, y: -140, label: "Event 2", name: "Code Debugging", date: "Oct 12, 2025", time: "02:00 PM", coordinator: "Jane Smith", contact: "9876543211" },
                                                                { x: -350, y: 140, label: "Event 3", name: "Web Design", date: "Oct 13, 2025", time: "09:00 AM", coordinator: "Robert Brown", contact: "9876543212" },
                                                                { x: 350, y: 140, label: "Event 4", name: "Technical Quiz", date: "Oct 13, 2025", time: "01:00 PM", coordinator: "Emily White", contact: "9876543213" },
                                                            ];
                                                    return coinPositions;
                                                })().map((item, index) => {
                                                    // Hide the selected coin from the list so the shared layout element in the popup can take over
                                                    if (selectedEventIndex === index) return null;

                                                    return (
                                                        <motion.div
                                                            key={`coin-${index}`}
                                                            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotateY: 0 }}
                                                            animate={{
                                                                x: item.x,
                                                                y: item.y,
                                                                scale: selectedEventIndex === null ? 1 : 0, // Others shrink
                                                                opacity: selectedEventIndex === null ? 1 : 0.2, // Others fade
                                                                rotateY: 720,
                                                                zIndex: 30
                                                            }}
                                                            exit={{ scale: 0, opacity: 0, rotateY: 0 }}
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{
                                                                duration: 1.5,
                                                                ease: "easeOut",
                                                                delay: index * 0.1
                                                            }}
                                                            className="absolute z-30 flex flex-col items-center justify-center cursor-pointer"
                                                            style={{ width: '200px', height: '200px' }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedEventIndex(index);
                                                            }}
                                                        >
                                                            {/* Added layoutId to the Coin Image Wrapper for seamless transition */}
                                                            <motion.div
                                                                layoutId={`coin-visual-${index}`}
                                                                className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72"
                                                            >
                                                                <Image
                                                                    src="/udhayam_coin_updated.png"
                                                                    alt={item.label}
                                                                    fill
                                                                    className="object-contain drop-shadow-xl"
                                                                />
                                                            </motion.div>

                                                            {/* Event Label */}
                                                            <motion.span
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ delay: 2.2 + (index * 0.1), duration: 0.5 }}
                                                                className="mt-1 sm:mt-2 text-amber-400 font-serif font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl drop-shadow-md whitespace-nowrap px-2 sm:px-3 py-1 rounded-full"
                                                            >
                                                                {item.label}
                                                            </motion.span>
                                                        </motion.div>
                                                    );
                                                })}

                                                {/* Event Details Popup */}
                                                <AnimatePresence>
                                                    {selectedEventIndex !== null && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 50 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 50 }}
                                                            className="absolute z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] lg:w-[90vw] max-h-[85vh] overflow-y-auto p-6 sm:p-10 md:p-12 lg:p-20 rounded-2xl text-left backdrop-blur-xl shadow-2xl custom-scrollbar"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >

                                                            <div className="flex flex-col lg:flex-row lg:gap-20 lg:items-start h-full">

                                                                {/* LEFT COLUMN: Visual + CTA (Desktop) */}
                                                                <div className="flex flex-col items-center lg:w-1/3 lg:border-amber-400/20 lg:pr-8">
                                                                    {/* Large Event Visual (Coin) */}
                                                                    <motion.div
                                                                        layoutId={`coin-visual-${selectedEventIndex}`}
                                                                        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1.2 }}
                                                                        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-80 lg:h-80 mb-6 lg:mb-12 perspective-1000"
                                                                    >
                                                                        <motion.div
                                                                            animate={{ rotateY: 360 }}
                                                                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                position: 'relative',
                                                                                transformStyle: 'preserve-3d'
                                                                            }}
                                                                        >
                                                                            {/* 3D Thickness Layers */}
                                                                            {[...Array(6)].map((_, i) => (
                                                                                <div
                                                                                    key={i}
                                                                                    className="absolute inset-0"
                                                                                    style={{
                                                                                        transform: `translateZ(${i * 2}px)`,
                                                                                        backfaceVisibility: 'visible'
                                                                                    }}
                                                                                >
                                                                                    <Image
                                                                                        src="/udhayam_coin_updated.png"
                                                                                        alt="Event Visual"
                                                                                        fill
                                                                                        className="object-contain"
                                                                                    />
                                                                                </div>
                                                                            ))}
                                                                            {/* Back Face to cover gaps */}
                                                                            <div
                                                                                className="absolute inset-0"
                                                                                style={{
                                                                                    transform: `translateZ(-2px) rotateY(180deg)`,
                                                                                    backfaceVisibility: 'visible'
                                                                                }}
                                                                            >
                                                                                <Image
                                                                                    src="/udhayam_coin_updated.png"
                                                                                    alt="Event Visual"
                                                                                    fill
                                                                                    className="object-contain"
                                                                                />
                                                                            </div>
                                                                        </motion.div>
                                                                    </motion.div>

                                                                    {/* Register Button - Moved Here */}
                                                                    <div
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            alert('Registration feature coming soon!');
                                                                        }}
                                                                        className="group relative w-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex justify-center mt-8 lg:mt-16"
                                                                    >
                                                                        {/* Button Image */}
                                                                        <div className="relative w-64 h-20 sm:w-80 sm:h-24 lg:w-[500px] lg:h-[140px] transition-all duration-300">
                                                                            <Image
                                                                                src="/register_button_new.png"
                                                                                alt="Register Button"
                                                                                fill
                                                                                className="object-contain drop-shadow-2xl"
                                                                                priority
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* RIGHT COLUMN: Event Details */}
                                                                <div className="lg:w-2/3 flex flex-col justify-center text-center lg:text-left mt-6 lg:mt-0">
                                                                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-serif text-amber-400 mb-2 sm:mb-4 lg:mb-8 uppercase tracking-wider">
                                                                        {[
                                                                            { label: "Event 1", name: "Paper Presentation" },
                                                                            { label: "Event 2", name: "Code Debugging" },
                                                                            { label: "Event 3", name: "Web Design" },
                                                                            { label: "Event 4", name: "Technical Quiz" },
                                                                        ][selectedEventIndex].name}
                                                                    </h3>

                                                                    <div className="space-y-2 sm:space-y-4 lg:space-y-8 text-amber-100/90 font-sans text-sm sm:text-base md:text-lg lg:text-2xl">
                                                                        {(() => {
                                                                            const events = [
                                                                                {
                                                                                    description: "Participants are required to make a presentation about recent trends in artificial intelligence and computer science domain.",
                                                                                    rules: ["No. of Participants: 3/team (Maximum)", "Time Duration: 15 to 20 Minutes"],
                                                                                    date: "Oct 12, 2025", time: "10:00 AM",
                                                                                    facultyCoordinators: ["Dr. John Smith", "Prof. Sarah Johnson"],
                                                                                    studentCoordinators: ["Mike Ross (9876543210)", "Harvey Specter (9876543211)"]
                                                                                },
                                                                                {
                                                                                    description: "Solve complex coding challenges and debug existing codebases within the given time limit.",
                                                                                    rules: ["Individual Participation", "Time Duration: 1 Hour", "Languages: C, C++, Java, Python"],
                                                                                    date: "Oct 12, 2025", time: "02:00 PM",
                                                                                    facultyCoordinators: ["Dr. Emily Davis", "Prof. Michael Brown"],
                                                                                    studentCoordinators: ["Jessica Pearson (9876543212)", "Louis Litt (9876543213)"]
                                                                                },
                                                                                {
                                                                                    description: "Design a responsive and creative website landing page based on the theme provided on the spot.",
                                                                                    rules: ["Team Size: 2 Members", "Time Duration: 2 Hours", "Tools: Figma, Adobe XD"],
                                                                                    date: "Oct 13, 2025", time: "09:00 AM",
                                                                                    facultyCoordinators: ["Dr. Robert Wilson", "Prof. Linda Taylor"],
                                                                                    studentCoordinators: ["Rachel Zane (9876543214)", "Donna Paulsen (9876543215)"]
                                                                                },
                                                                                {
                                                                                    description: "Test your technical knowledge in this rapid-fire quiz covering various domains of engineering.",
                                                                                    rules: ["Team Size: 2 Members", "Rounds: 3 (Prelims, Semi, Final)", "Buzzers used in final"],
                                                                                    date: "Oct 13, 2025", time: "01:00 PM",
                                                                                    facultyCoordinators: ["Dr. William Anderson", "Prof. Elizabeth Thomas"],
                                                                                    studentCoordinators: ["Daniel Hardman (9876543216)", "Katrina Bennett (9876543217)"]
                                                                                },
                                                                            ];
                                                                            const event = events[selectedEventIndex];
                                                                            return (
                                                                                <>
                                                                                    {/* Description */}
                                                                                    <div className="mb-6 lg:mb-10 px-6 sm:px-10 lg:px-0">
                                                                                        <p className="text-amber-100/90 leading-relaxed italic lg:text-3xl lg:leading-normal">
                                                                                            "{event.description}"
                                                                                        </p>
                                                                                    </div>

                                                                                    {/* Rules */}
                                                                                    <div className="mb-6 lg:mb-10">
                                                                                        <h4 className="text-amber-400 font-bold mb-2 lg:mb-4 uppercase tracking-widest text-sm lg:text-xl border-b border-amber-400/30 inline-block pb-1 lg:pb-2">Event Rules:</h4>
                                                                                        <ul className="list-disc list-inside text-amber-100 font-medium space-y-1 ml-2">
                                                                                            {event.rules.map((rule, idx) => (
                                                                                                <li key={idx}>{rule}</li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>

                                                                                    {/* Date & Time Row */}
                                                                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 mb-6 lg:mb-10 text-amber-100/90 font-sans">
                                                                                        <div className="flex flex-col items-center lg:items-start">
                                                                                            <span className="text-amber-400 font-bold uppercase text-sm lg:text-lg tracking-wider mb-1 border-b border-amber-400/30 inline-block pb-1">Date</span>
                                                                                            <span className="text-xl lg:text-2xl font-serif text-amber-100">{event.date}</span>
                                                                                        </div>
                                                                                        <div className="flex flex-col items-center lg:items-start">
                                                                                            <span className="text-amber-400 font-bold uppercase text-sm lg:text-lg tracking-wider mb-1 border-b border-amber-400/30 inline-block pb-1">Time</span>
                                                                                            <span className="text-xl lg:text-2xl font-serif text-amber-100">{event.time}</span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* Coordinators Section */}
                                                                                    <div className="flex flex-col sm:flex-row gap-8 lg:gap-16">
                                                                                        {/* Faculty Coordinators */}
                                                                                        <div className="flex flex-col items-center lg:items-start">
                                                                                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-sm lg:text-lg mb-2 lg:mb-4 border-b border-amber-400/30 inline-block pb-1">Faculty Coordinators</h4>
                                                                                            <ul className="space-y-1 lg:space-y-2">
                                                                                                {event.facultyCoordinators.map((name, idx) => (
                                                                                                    <li key={idx} className="text-amber-100 lg:text-xl">{name}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>

                                                                                        {/* Student Coordinators */}
                                                                                        <div className="flex flex-col items-center lg:items-start">
                                                                                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-sm lg:text-lg mb-2 lg:mb-4 border-b border-amber-400/30 inline-block pb-1">Student Coordinators</h4>
                                                                                            <ul className="space-y-1 lg:space-y-2">
                                                                                                {event.studentCoordinators.map((info, idx) => (
                                                                                                    <li key={idx} className="text-amber-100 lg:text-xl">{info}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            );
                                                                        })()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>

                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </main >
        </>
    );
}
