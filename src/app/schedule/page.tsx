"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLoading } from "@/contexts/LoadingContext";

// Department data structure
interface Department {
  id: string;
  name: string;
  shortName: string;
  color: string;
  gradient: string;
  icon: string;
}

// Event data structure
interface Event {
  id: string;
  name: string;
  venue: string;
  startTime: string;
  endTime: string;
  day: 1 | 2;
  description: string;
  type: "Technical" | "Non-Technical" | "Workshop" | "Quiz" | "Seminar";
}

// Tooltip state
interface TooltipState {
  event: (Event & { category?: string }) | (SportsEvent & { type?: string }) | (CulturalEvent & { type?: string }) | null;
  x: number;
  y: number;
}

// 14 Departments with gradients
const departments: Department[] = [
  { id: "aero", name: "Aeronautical Engineering", shortName: "AERO", color: "#3b82f6", gradient: "from-blue-500 to-sky-600", icon: "✈️" },
  { id: "agri", name: "Agricultural Engineering", shortName: "AGRI", color: "#22c55e", gradient: "from-green-500 to-emerald-600", icon: "🌾" },
  { id: "aids", name: "Artificial Intelligence & Data Science", shortName: "AI&DS", color: "#ec4899", gradient: "from-pink-500 to-rose-600", icon: "🤖" },
  { id: "bme", name: "Biomedical Engineering", shortName: "BME", color: "#ef4444", gradient: "from-red-500 to-rose-600", icon: "🏥" },
  { id: "biotech", name: "Biotechnology", shortName: "BIO", color: "#84cc16", gradient: "from-lime-500 to-green-600", icon: "🧬" },
  { id: "csbs", name: "Computer Science & Business Systems", shortName: "CSBS", color: "#14b8a6", gradient: "from-teal-500 to-cyan-600", icon: "📊" },
  { id: "cse", name: "Computer Science & Engineering", shortName: "CSE", color: "#8b5cf6", gradient: "from-violet-600 to-purple-700", icon: "💻" },
  { id: "cse-aiml", name: "CSE (Artificial Intelligence & Machine Learning)", shortName: "CSE-AIML", color: "#f97316", gradient: "from-orange-500 to-amber-600", icon: "🧠" },
  { id: "cse-cs", name: "CSE (Cyber Security)", shortName: "CSE-CS", color: "#06b6d4", gradient: "from-cyan-500 to-teal-600", icon: "🔒" },
  { id: "ece", name: "Electronics & Communication Engineering", shortName: "ECE", color: "#a855f7", gradient: "from-purple-500 to-violet-600", icon: "📡" },
  { id: "ece-vlsi", name: "Electronics Engineering (VLSI Design and Technology)", shortName: "ECE-VLSI", color: "#f59e0b", gradient: "from-amber-500 to-orange-600", icon: "🔌" },
  { id: "eee", name: "Electrical & Electronics Engineering", shortName: "EEE", color: "#fbbf24", gradient: "from-yellow-500 to-amber-600", icon: "⚡" },
  { id: "mech", name: "Mechanical Engineering", shortName: "MECH", color: "#64748b", gradient: "from-slate-500 to-gray-600", icon: "⚙️" },
  { id: "mba", name: "Master of Business Administration", shortName: "MBA", color: "#10b981", gradient: "from-emerald-500 to-green-600", icon: "🎓" },
  { id: "mca", name: "Master of Computer Applications", shortName: "MCA", color: "#6366f1", gradient: "from-indigo-500 to-blue-600", icon: "💼" },
];

// Events for each department (varies by department)
const departmentEvents: Record<string, Event[]> = {
  aero: [
    { id: "aero-1", name: "Paper Presentation", venue: "E104", startTime: "09:00", endTime: "11:00", day: 1, description: "Present your research papers on aeronautical engineering", type: "Technical" },
    { id: "aero-2", name: "Technical Quiz", venue: "E101", startTime: "11:30", endTime: "13:00", day: 1, description: "Test your technical knowledge in aeronautics", type: "Technical" },
    { id: "aero-3", name: "Water Rocketry", venue: "Near Hand Ball Ground", startTime: "13:30", endTime: "15:30", day: 1, description: "Build and launch water-powered rockets", type: "Technical" },
    { id: "aero-4", name: "Brain Oh Bunch", venue: "E102", startTime: "10:30", endTime: "12:30", day: 2, description: "Brain teasers and puzzle solving competition", type: "Non-Technical" },
    { id: "aero-5", name: "E-Arena", venue: "E101", startTime: "13:00", endTime: "15:00", day: 2, description: "E-sports gaming tournament", type: "Non-Technical" },
    { id: "aero-6", name: "Parachute Landing", venue: "E312", startTime: "15:30", endTime: "17:00", day: 2, description: "Parachute landing challenge competition", type: "Non-Technical" },
  ],
  agri: [
    { id: "agri-1", name: "Project Expo", venue: "AGRI LAB", startTime: "09:00", endTime: "11:00", day: 1, description: "Showcase innovative agricultural projects and innovations", type: "Technical" },
    { id: "agri-2", name: "Paper Presentation", venue: "C312", startTime: "11:30", endTime: "13:30", day: 1, description: "Present your research papers on agricultural engineering", type: "Technical" },
    { id: "agri-3", name: "Minute to win It", venue: "AGRI LAB", startTime: "14:00", endTime: "16:00", day: 1, description: "Fast-paced challenges and competitions", type: "Technical" },
    { id: "agri-4", name: "Fireless Cooking", venue: "AGRI LAB", startTime: "09:00", endTime: "11:00", day: 2, description: "Cook delicious dishes without using fire", type: "Non-Technical" },
    { id: "agri-5", name: "Reel Making", venue: "AGRI LAB", startTime: "11:30", endTime: "14:00", day: 2, description: "Create engaging video reels and content", type: "Non-Technical" },
  ],
  aids: [
    { id: "aids-1", name: "E-Gaming", venue: "Gaming Lab", startTime: "09:00", endTime: "12:00", day: 1, description: "Competitive e-sports gaming tournament", type: "Non-Technical" },
    { id: "aids-2", name: "Paper Presentation", venue: "Seminar Hall", startTime: "12:30", endTime: "14:30", day: 1, description: "Present your research papers and innovations", type: "Technical" },
    { id: "aids-3", name: "Technical Quiz", venue: "D10", startTime: "15:00", endTime: "16:30", day: 1, description: "Test your technical knowledge across domains", type: "Quiz" },
    { id: "aids-4", name: "Logical Rivera", venue: "CSL 3", startTime: "09:00", endTime: "11:00", day: 2, description: "Solve complex logical puzzles and riddles", type: "Technical" },
  ],
  bme: [
    { id: "bme-1", name: "Project Expo", venue: "F Block Hall", startTime: "09:00", endTime: "11:00", day: 1, description: "Showcase your innovative biomedical engineering projects", type: "Technical" },
    { id: "bme-2", name: "Idea Sprint", venue: "BME Lab", startTime: "11:30", endTime: "13:30", day: 1, description: "Poster making competition showcasing innovative ideas", type: "Technical" },
    { id: "bme-3", name: "Bio Quiz", venue: "D11", startTime: "14:00", endTime: "15:30", day: 1, description: "Test your biomedical engineering knowledge", type: "Technical" },
    { id: "bme-4", name: "Connection", venue: "Open Ground", startTime: "09:00", endTime: "11:30", day: 2, description: "Team building and networking event", type: "Non-Technical" },
    { id: "bme-5", name: "Engineering Meme Mania", venue: "M502", startTime: "12:00", endTime: "14:30", day: 2, description: "Create and share hilarious engineering memes", type: "Non-Technical" },
  ],
  biotech: [
    { id: "bio-1", name: "Biopresenta", venue: "Seminar Hall", startTime: "09:00", endTime: "11:00", day: 1, description: "Paper presentation on biotechnology research and innovations", type: "Technical" },
    { id: "bio-2", name: "Bioexpo", venue: "F Block Hall", startTime: "11:30", endTime: "14:00", day: 1, description: "Project exhibition showcasing biotech innovations", type: "Technical" },
    { id: "bio-3", name: "Bio Puzzle", venue: "D12", startTime: "14:30", endTime: "16:00", day: 1, description: "Solve complex biotechnology puzzles and challenges", type: "Technical" },
    { id: "bio-4", name: "Connection", venue: "Open Ground", startTime: "09:00", endTime: "11:30", day: 2, description: "Team building and networking event", type: "Non-Technical" },
    { id: "bio-5", name: "Funfinity", venue: "Quadrangle", startTime: "12:00", endTime: "15:00", day: 2, description: "Fun-filled entertainment and games", type: "Non-Technical" },
  ],
  csbs: [
    { id: "csbs-1", name: "Paper presentation", venue: "Seminar Hall", startTime: "09:00", endTime: "11:00", day: 1, description: "Present your research papers and innovations", type: "Technical" },
    { id: "csbs-2", name: "ThinkNflow", venue: "M501", startTime: "11:30", endTime: "13:30", day: 1, description: "Think and flow through challenging problems", type: "Technical" },
    { id: "csbs-3", name: "Project expo", venue: "F Block Hall", startTime: "14:00", endTime: "16:00", day: 1, description: "Showcase your innovative projects", type: "Technical" },
    { id: "csbs-4", name: "come play confuse", venue: "M502", startTime: "09:00", endTime: "11:00", day: 2, description: "Fun and engaging puzzle solving competition", type: "Non-Technical" },
    { id: "csbs-5", name: "E Gamezz", venue: "Gaming Lab", startTime: "12:30", endTime: "15:00", day: 2, description: "Competitive e-gaming tournament", type: "Non-Technical" },
  ],
  cse: [
    { id: "cse-1", name: "Technical quiz", venue: "D Block Auditorium", startTime: "09:00", endTime: "11:00", day: 1, description: "Test your technical knowledge across domains", type: "Technical" },
    { id: "cse-2", name: "Spot the bot", venue: "CSL 1, CSL 2", startTime: "11:30", endTime: "13:30", day: 1, description: "Identify and analyze bot behavior patterns", type: "Technical" },
    { id: "cse-3", name: "project expo", venue: "F Block Hall", startTime: "14:00", endTime: "16:00", day: 1, description: "Showcase your innovative projects", type: "Technical" },
    { id: "cse-4", name: "Theme photography", venue: "Campus Ground", startTime: "09:00", endTime: "11:00", day: 2, description: "Capture stunning photographs based on given themes", type: "Non-Technical" },
    { id: "cse-5", name: "Gaming corner", venue: "Gaming Lab", startTime: "12:30", endTime: "15:00", day: 2, description: "Competitive gaming tournament", type: "Non-Technical" },
  ],
  "cse-aiml": [
    { id: "aiml-1", name: "Paper Presentation", venue: "Seminar Hall", startTime: "09:00", endTime: "11:00", day: 1, description: "Present your research papers and innovations in AI and ML", type: "Technical" },
    { id: "aiml-2", name: "TechFusion Quest", venue: "AI Lab 1", startTime: "11:30", endTime: "13:30", day: 1, description: "Multi-domain technical challenge combining AI, ML, and emerging technologies", type: "Technical" },
    { id: "aiml-3", name: "Mind Snap", venue: "D13", startTime: "14:00", endTime: "16:00", day: 1, description: "Create innovative mind maps showcasing AI and ML concepts", type: "Technical" },
    { id: "aiml-4", name: "Free Fire Battle", venue: "Gaming Lab", startTime: "09:00", endTime: "12:00", day: 2, description: "Competitive FreeFire gaming tournament", type: "Non-Technical" },
    { id: "aiml-5", name: "Lens & Motion", venue: "Open Ground", startTime: "12:30", endTime: "15:00", day: 2, description: "Photography and videography competition capturing motion and moments", type: "Non-Technical" },
  ],
  "cse-cs": [
    { id: "cs-1", name: "Technical quiz", venue: "D14", startTime: "09:00", endTime: "11:00", day: 1, description: "Test your technical knowledge in cyber security", type: "Technical" },
    { id: "cs-2", name: "Spot the bot", venue: "Cyber Lab", startTime: "11:30", endTime: "13:30", day: 1, description: "Identify and analyze bot behavior patterns", type: "Technical" },
    { id: "cs-3", name: "project expo", venue: "F Block Hall", startTime: "14:00", endTime: "16:00", day: 1, description: "Showcase your innovative projects", type: "Technical" },
    { id: "cs-4", name: "Theme photography", venue: "Campus Ground", startTime: "09:00", endTime: "11:00", day: 2, description: "Capture stunning photographs based on given themes", type: "Non-Technical" },
    { id: "cs-5", name: "Gaming corner", venue: "Gaming Lab", startTime: "12:30", endTime: "15:00", day: 2, description: "Competitive gaming tournament", type: "Non-Technical" },
  ],
  ece: [
    { id: "ece-1", name: "PAPER PRESENTATION", venue: "Seminar Hall", startTime: "09:00", endTime: "11:00", day: 1, description: "Present your research papers on electronics and communication", type: "Technical" },
    { id: "ece-2", name: "CIRCUIT DEBUGGING", venue: "ECE Lab 1", startTime: "11:30", endTime: "13:30", day: 1, description: "Debug and fix electronic circuit problems", type: "Technical" },
    { id: "ece-3", name: "Project Expo", venue: "F Block Hall", startTime: "14:00", endTime: "16:00", day: 1, description: "Showcase your innovative ECE projects", type: "Technical" },
    { id: "ece-4", name: "IPL AUCTION", venue: "M501", startTime: "09:00", endTime: "12:00", day: 2, description: "Participate in IPL team auction simulation", type: "Non-Technical" },
    { id: "ece-5", name: "E FOOTBALL", venue: "Gaming Lab", startTime: "12:30", endTime: "15:00", day: 2, description: "Competitive e-football gaming tournament", type: "Non-Technical" },
  ],
  "ece-vlsi": [
    { id: "vlsi-1", name: "PAPER PRESENTATION", venue: "Seminar Hall", startTime: "09:00", endTime: "11:00", day: 1, description: "Present your research papers on electronics and communication", type: "Technical" },
    { id: "vlsi-2", name: "CIRCUIT DEBUGGING", venue: "ECE Lab 1", startTime: "11:30", endTime: "13:30", day: 1, description: "Debug and fix electronic circuit problems", type: "Technical" },
    { id: "vlsi-3", name: "Project Expo", venue: "F Block Hall", startTime: "14:00", endTime: "16:00", day: 1, description: "Showcase your innovative ECE projects", type: "Technical" },
    { id: "vlsi-4", name: "IPL AUCTION", venue: "M501", startTime: "09:00", endTime: "12:00", day: 2, description: "Participate in IPL team auction simulation", type: "Non-Technical" },
    { id: "vlsi-5", name: "E FOOTBALL", venue: "Gaming Lab", startTime: "12:30", endTime: "15:00", day: 2, description: "Competitive e-football gaming tournament", type: "Non-Technical" },
  ],
  eee: [
    { id: "eee-1", name: "Project Expo", venue: "F Block Hall", startTime: "14:00", endTime: "16:00", day: 1, description: "Showcase your innovative electrical projects", type: "Technical" },
    { id: "eee-2", name: "Quiz Sprint", venue: "M504", startTime: "09:00", endTime: "11:00", day: 1, description: "Fast-paced quiz competition on electrical engineering", type: "Technical" },
    { id: "eee-3", name: "Paper presentation", venue: "Seminar Hall", startTime: "11:30", endTime: "13:30", day: 1, description: "Present your research papers on electrical engineering", type: "Technical" },
    { id: "eee-4", name: "Doodle Detectives", venue: "M501", startTime: "12:30", endTime: "15:00", day: 2, description: "Solve mysteries through creative doodling and detective work", type: "Non-Technical" },
    { id: "eee-5", name: "Free Fire", venue: "Gaming Lab", startTime: "09:00", endTime: "12:00", day: 2, description: "Competitive Free Fire gaming tournament", type: "Non-Technical" },
  ],
  mech: [
    { id: "mech-1", name: "Paper Presentation", venue: "Seminar Hall", startTime: "12:00", endTime: "14:00", day: 1, description: "Present your research papers and innovations", type: "Technical" },
    { id: "mech-2", name: "CAD Modelling", venue: "CAD Lab", startTime: "09:00", endTime: "11:30", day: 1, description: "3D modeling and design competition", type: "Technical" },
    { id: "mech-3", name: "Projec Expo", venue: "F Block Hall", startTime: "14:30", endTime: "16:30", day: 1, description: "Showcase your innovative mechanical projects", type: "Technical" },
    { id: "mech-4", name: "Freefire", venue: "Gaming Lab", startTime: "09:00", endTime: "12:00", day: 2, description: "Competitive Free Fire gaming tournament", type: "Non-Technical" },
    { id: "mech-5", name: "Art of Aperture", venue: "Open Ground", startTime: "12:30", endTime: "15:00", day: 2, description: "Photography competition showcasing mechanical marvels", type: "Non-Technical" },
  ],
  mba: [
    { id: "mba-1", name: "Paper Presentation", venue: "Seminar Hall", startTime: "09:00", endTime: "11:00", day: 1, description: "Present your research papers on business management", type: "Technical" },
    { id: "mba-2", name: "AD zap", venue: "MBA Lab", startTime: "11:30", endTime: "13:30", day: 1, description: "SAP software demonstration and competition", type: "Technical" },
    { id: "mba-3", name: "Best Manager", venue: "Auditorium", startTime: "09:00", endTime: "12:00", day: 2, description: "Management skills and leadership competition", type: "Non-Technical" },
    { id: "mba-4", name: "Business Paln Development", venue: "M501", startTime: "14:00", endTime: "16:00", day: 1, description: "Develop comprehensive business plans", type: "Technical" },
    { id: "mba-5", name: "Brand in a brush", venue: "M502", startTime: "12:30", endTime: "15:00", day: 2, description: "Creative branding and marketing challenge", type: "Non-Technical" },
  ],
  mca: [
    { id: "mca-1", name: "Paper Presentation", venue: "Seminar Hall", startTime: "11:30", endTime: "13:30", day: 1, description: "Present your research papers and innovations in computer applications", type: "Technical" },
    { id: "mca-2", name: "Technical Quiz", venue: "CSL 1", startTime: "09:00", endTime: "11:00", day: 1, description: "Test your technical knowledge in computer applications", type: "Quiz" },
    { id: "mca-3", name: "Debugging", venue: "CSL 2", startTime: "14:00", endTime: "16:00", day: 1, description: "Debug and fix code problems in various programming languages", type: "Technical" },
    { id: "mca-4", name: "Connections", venue: "Open Ground", startTime: "09:00", endTime: "11:30", day: 2, description: "Team building and networking event", type: "Non-Technical" },
  ],
};

const eventTypeColors: Record<string, { bg: string; text: string }> = {
  Technical: { bg: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20", text: "text-cyan-400" },
  "Non-Technical": { bg: "bg-gradient-to-r from-rose-500/20 to-pink-500/20", text: "text-rose-400" },
  Workshop: { bg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20", text: "text-purple-400" },
  Quiz: { bg: "bg-gradient-to-r from-amber-500/20 to-orange-500/20", text: "text-amber-400" },
  Seminar: { bg: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20", text: "text-emerald-400" },
};

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return minutes === 0 ? `${hour12} ${period}` : `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function calculateDuration(startTime: string, endTime: string): string {
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  const diff = (endH * 60 + endM) - (startH * 60 + startM);
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

// Convert time to minutes from 09:00
function timeToMinutes(time: string): number {
  if (!time || typeof time !== 'string') return 0;
  const parts = time.split(":");
  if (parts.length !== 2) return 0;
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return (hours - 9) * 60 + minutes;
}

// Convert minutes to percentage of day (09:00 to 20:00 = 11 hours = 660 minutes)
function minutesToPercentage(minutes: number): number {
  return (minutes / 660) * 100; // 09:00 to 20:00 is 11 hours = 660 minutes
}

// Calculate position based on hour slots
// Grid represents 11 hours (09:00 to 20:00 = 660 minutes)
// Events are positioned as percentages of the 660-minute span
function calculateEventPosition(startTime: string, endTime: string): { left: number; width: number } {
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  
  // Convert to minutes from 09:00
  const startTotalMinutes = (startH - 9) * 60 + startM;
  const endTotalMinutes = (endH - 9) * 60 + endM;
  
  // Total time span: 09:00 to 20:00 = 11 hours = 660 minutes
  // Calculate position as percentage of the 660-minute span
  
  // Clamp start time to be within bounds (0 to 660 minutes)
  const clampedStart = Math.max(0, Math.min(660, startTotalMinutes));
  const clampedEnd = Math.max(0, Math.min(660, endTotalMinutes));
  
  // Ensure end is after start
  const validStart = Math.min(clampedStart, clampedEnd);
  const validEnd = Math.max(clampedStart, clampedEnd);
  
  // Calculate position and width as percentages
  const left = (validStart / 660) * 100;
  const width = ((validEnd - validStart) / 660) * 100;
  
  // Ensure width is at least 2% for visibility, and clamp values
  const finalWidth = Math.max(2, Math.min(100, width));
  const finalLeft = Math.max(0, Math.min(100 - finalWidth, left));
  
  return { left: finalLeft, width: finalWidth };
}

// Generate time slots from 09:00 to 20:00
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return slots;
}

type EventType = "department" | "cultural" | "sports" | null;

// Sports events data
interface SportsEvent {
  id: string;
  name: string;
  category: string;
  venue: string;
  startTime: string;
  endTime: string;
  day: 1 | 2;
  description: string;
}

// Cultural events data
interface CulturalEvent {
  id: string;
  name: string;
  venue: string;
  startTime: string;
  endTime: string;
  day: 1 | 2;
  description: string;
}

const sportsEvents: SportsEvent[] = [
  { id: "sports-1", name: "Ball Badminton", category: "M&W", venue: "Sports Complex", startTime: "09:00", endTime: "11:00", day: 1, description: "Ball Badminton tournament for Men & Women" },
  { id: "sports-2", name: "Basketball", category: "M&W", venue: "Basketball Court", startTime: "11:30", endTime: "13:30", day: 1, description: "Basketball tournament for Men & Women" },
  { id: "sports-3", name: "Cricket", category: "M", venue: "Cricket Ground", startTime: "14:00", endTime: "17:00", day: 1, description: "Cricket tournament for Men" },
  { id: "sports-4", name: "Football (Five Side)", category: "M", venue: "Football Ground", startTime: "09:00", endTime: "12:00", day: 2, description: "Five-a-side Football tournament for Men" },
  { id: "sports-5", name: "Handball", category: "M", venue: "Handball Court", startTime: "12:30", endTime: "14:30", day: 2, description: "Handball tournament for Men" },
  { id: "sports-6", name: "Kabaddi", category: "M", venue: "Indoor Stadium", startTime: "15:00", endTime: "17:00", day: 2, description: "Kabaddi tournament for Men" },
  { id: "sports-7", name: "Kho – Kho", category: "M", venue: "Open Ground", startTime: "09:00", endTime: "11:00", day: 1, description: "Kho-Kho tournament for Men" },
  { id: "sports-8", name: "Table Tennis", category: "M&W", venue: "Table Tennis Hall", startTime: "11:30", endTime: "14:00", day: 1, description: "Table Tennis tournament for Men & Women" },
  { id: "sports-9", name: "Throwball", category: "W", venue: "Throwball Court", startTime: "14:00", endTime: "16:00", day: 2, description: "Throwball tournament for Women" },
  { id: "sports-10", name: "Volleyball", category: "M&W", venue: "Volleyball Court", startTime: "16:30", endTime: "18:30", day: 2, description: "Volleyball tournament for Men & Women" },
  { id: "ncc-1", name: "NCC Drill", category: "NCC", venue: "Parade Ground", startTime: "09:00", endTime: "11:00", day: 1, description: "NCC drill and parade competition" },
  { id: "ncc-2", name: "NCC March Past", category: "NCC", venue: "Parade Ground", startTime: "11:30", endTime: "13:00", day: 1, description: "NCC march past competition" },
  { id: "ncc-3", name: "NCC Display", category: "NCC", venue: "Open Ground", startTime: "14:00", endTime: "16:00", day: 2, description: "NCC display and demonstration" },
];

const culturalEvents: CulturalEvent[] = [
  { id: "cultural-1", name: "Dance", venue: "Auditorium", startTime: "09:00", endTime: "11:00", day: 1, description: "Dance performance competition showcasing various dance forms" },
  { id: "cultural-2", name: "Music", venue: "Auditorium", startTime: "11:30", endTime: "13:30", day: 1, description: "Musical performances and competitions" },
  { id: "cultural-3", name: "Mime", venue: "Auditorium", startTime: "14:00", endTime: "16:00", day: 1, description: "Mime performances and competitions" },
  { id: "cultural-4", name: "Reels Making", venue: "Seminar Hall", startTime: "09:00", endTime: "12:00", day: 2, description: "Video reels creation and competition" },
  { id: "cultural-5", name: "Adapt Tune", venue: "Auditorium", startTime: "13:00", endTime: "15:00", day: 2, description: "Music adaptation and tune competition" },
];

export default function SchedulePage() {
  const { setIsLoading } = useLoading();
  const [selectedEventType, setSelectedEventType] = useState<EventType>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({ event: null, x: 0, y: 0 });
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const handleEventTypeClick = (type: EventType) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedEventType(type);
      setIsTransitioning(false);
    }, 300);
  };

  const handleDepartmentClick = (dept: Department) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDepartment(dept);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToEventTypes = () => {
    // Removed - event type selection screen should not reappear once selected
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDepartment(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToDepartments = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDepartment(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleDownloadSchedule = () => {
    if (!selectedDepartment) return;

    const dayEvents = departmentEvents[selectedDepartment.id]?.filter((e) => e.day === selectedDay) || [];
    
    // Create CSV content
    let csvContent = `"${selectedDepartment.name} - Day ${selectedDay} Schedule"\n\n`;
    csvContent += `"Event Name","Start Time","End Time","Duration","Venue","Type","Description"\n`;
    
    dayEvents.forEach((event) => {
      csvContent += `"${event.name}","${formatTime(event.startTime)}","${formatTime(event.endTime)}","${calculateDuration(event.startTime, event.endTime)}","${event.venue}","${event.type}","${event.description}"\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedDepartment.shortName}_Day${selectedDay}_Schedule.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSportsSchedule = () => {
    const dayEvents = sportsEvents.filter((e) => e.day === selectedDay);
    
    // Create CSV content
    let csvContent = `"Sports / NCC Events - Day ${selectedDay} Schedule"\n\n`;
    csvContent += `"Event Name","Start Time","End Time","Duration","Venue","Category","Description"\n`;
    
    dayEvents.forEach((event) => {
      csvContent += `"${event.name}","${formatTime(event.startTime)}","${formatTime(event.endTime)}","${calculateDuration(event.startTime, event.endTime)}","${event.venue}","${event.category}","${event.description}"\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Sports_NCC_Day${selectedDay}_Schedule.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCulturalSchedule = () => {
    const dayEvents = culturalEvents.filter((e) => e.day === selectedDay);
    
    // Create CSV content
    let csvContent = `"Cultural Events - Day ${selectedDay} Schedule"\n\n`;
    csvContent += `"Event Name","Start Time","End Time","Duration","Venue","Description"\n`;
    
    dayEvents.forEach((event) => {
      csvContent += `"${event.name}","${formatTime(event.startTime)}","${formatTime(event.endTime)}","${calculateDuration(event.startTime, event.endTime)}","${event.venue}","${event.description}"\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Cultural_Day${selectedDay}_Schedule.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen relative z-10 pb-12 pt-20 sm:pt-24 md:pt-28 transition-opacity duration-300 section-container ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
      {/* Animated Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20"></div>
      </div>

      {/* Magical radial glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-[rgba(201,162,39,0.05)] via-transparent to-transparent blur-3xl" />
      </div>

      {/* Event Type Selection Screen */}
      {!selectedEventType && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-4 gold-glow">
              Event Schedule
            </h1>
            <p className="text-[#8b7355] text-lg">Choose an event category to view schedules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Department Events */}
          <button
              onClick={() => handleEventTypeClick("department")}
              className="group flex flex-col items-center p-8 bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-3xl transition-all duration-500 hover:border-[rgba(201,162,39,0.4)] hover:scale-105 hover:shadow-2xl"
          >
              <div className="relative mb-6 w-32 h-32 sm:w-40 sm:h-40">
                <Image
                  src="/schedule ball.png"
                  alt="Department Events"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#d4c5a9] mb-2 group-hover:text-[#c9a227] transition-colors duration-300">
                Department Events
              </h3>
              <p className="text-[#8b7355] text-sm text-center">View schedules for all department events</p>
            </button>

            {/* Cultural Events */}
            <button
              onClick={() => handleEventTypeClick("cultural")}
              className="group flex flex-col items-center p-8 bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-3xl transition-all duration-500 hover:border-[rgba(201,162,39,0.4)] hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative mb-6 w-32 h-32 sm:w-40 sm:h-40">
                <Image
                  src="/schedule ball.png"
                  alt="Cultural Events"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                />
            </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#d4c5a9] mb-2 group-hover:text-[#c9a227] transition-colors duration-300">
                Cultural Events
              </h3>
              <p className="text-[#8b7355] text-sm text-center">View schedules for cultural events</p>
          </button>

            {/* Sports Events */}
            <button
              onClick={() => handleEventTypeClick("sports")}
              className="group flex flex-col items-center p-8 bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-3xl transition-all duration-500 hover:border-[rgba(201,162,39,0.4)] hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative mb-6 w-32 h-32 sm:w-40 sm:h-40">
                <Image
                  src="/schedule ball.png"
                  alt="Sports Events"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#d4c5a9] mb-2 group-hover:text-[#c9a227] transition-colors duration-300">
                Sports / NCC Events
              </h3>
              <p className="text-[#8b7355] text-sm text-center">View schedules for sports events</p>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar (Only on department selection) */}
      {selectedEventType === "department" && !selectedDepartment && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#8b7355]">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[rgba(13,19,33,0.8)] border border-[rgba(201,162,39,0.2)] rounded-xl text-[#d4c5a9] placeholder-[#8b7355] focus:outline-none focus:border-[rgba(201,162,39,0.5)] focus:ring-2 focus:ring-[rgba(201,162,39,0.1)] transition-all duration-300 backdrop-blur-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8b7355] hover:text-[#c9a227] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}


      {/* Department Grid View */}
      {selectedEventType === "department" && !selectedDepartment && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {filteredDepartments.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-[#8b8b7a] text-lg">No departments found</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#c9a227] hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredDepartments.map((dept, index) => (
                <button
                  key={dept.id}
                  onClick={() => handleDepartmentClick(dept)}
                  className="dept-card group relative overflow-hidden rounded-2xl text-left transition-all duration-500"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.1)] group-hover:border-transparent rounded-2xl p-6 h-full transition-all duration-500 group-hover:bg-transparent">
                    {/* Glow Effect */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                      style={{ backgroundColor: dept.color }}
                    ></div>

                    {/* Icon Container */}
                    <div className="relative mb-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{ backgroundColor: `${dept.color}20` }}
                      >
                        {dept.icon}
                      </div>
                      {/* Floating particles on hover */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ backgroundColor: dept.color }}></div>
                    </div>

                    {/* Department Info */}
                    <h3
                      className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:text-white"
                      style={{ color: dept.color }}
                    >
                      {dept.shortName}
                    </h3>
                    <p className="text-[#8b8b7a] text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {dept.name}
                    </p>

                    {/* Events Badge */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const eventCount = departmentEvents[dept.id]?.length || 0;
                          const maxCircles = Math.min(eventCount, 4); // Show max 4 circles
                          return (
                            <>
                        <div className="flex -space-x-1">
                                {[...Array(maxCircles)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full border border-[rgba(5,5,8,0.5)]"
                              style={{ backgroundColor: dept.color, opacity: 1 - i * 0.2 }}
                            ></div>
                          ))}
                        </div>
                              <span className="text-[#8b8b7a] text-xs group-hover:text-white/60 transition-colors">
                                {eventCount} {eventCount === 1 ? 'Event' : 'Events'}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                      
                      {/* Arrow */}
                      <div className="w-8 h-8 rounded-full bg-[rgba(201,162,39,0.1)] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 group-hover:bg-white/10">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#c9a227] group-hover:text-white">
                          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sports Events View */}
      {selectedEventType === "sports" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Sports Hero Card */}
          <div className="relative overflow-hidden rounded-3xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,162,39,0.2)] to-[rgba(201,162,39,0.1)] opacity-20"></div>
            <div className="relative bg-gradient-to-br from-[rgba(13,19,33,0.9)] to-[rgba(5,5,8,0.95)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-3xl p-6 sm:p-8">
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                {/* Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center shadow-lg bg-[rgba(201,162,39,0.1)]">
                  <Image
                    src="/schedule ball.png"
                    alt="Sports Events"
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sports / NCC Events</h2>
                  <p className="text-[#8b8b7a] text-sm sm:text-base">Competitive sports tournaments, matches, and NCC activities</p>
                </div>

                {/* Day Selector and Download Button */}
                <div className="flex items-center gap-2">
                  {([1, 2] as const).map((day) => {
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedDay === day
                            ? "text-white"
                            : "text-[#8b8b7a] hover:text-[#d4c5a9]"
                        }`}
                        style={{
                          backgroundColor: selectedDay === day ? "#c9a227" : "rgba(201,162,39,0.1)",
                        }}
                      >
                        Day {day}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleDownloadSportsSchedule}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#d4c5a9] hover:text-white transition-all bg-[rgba(201,162,39,0.1)] hover:bg-[rgba(201,162,39,0.2)] border border-[rgba(201,162,39,0.3)] hover:border-[rgba(201,162,39,0.5)]"
                    title="Download Schedule"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Card Layout */}
          <div className="lg:hidden space-y-4">
            {(() => {
              const dayEvents = sportsEvents.filter((e) => e.day === selectedDay);
              if (dayEvents.length === 0) {
                return (
                  <div className="text-center py-12 text-[#8b8b7a]">
                    No events scheduled for Day {selectedDay}
                  </div>
                );
              }

              // Sort events by start time
              const sortedEvents = [...dayEvents].sort((a, b) => {
                const aMinutes = timeToMinutes(a.startTime);
                const bMinutes = timeToMinutes(b.startTime);
                return aMinutes - bMinutes;
              });

              return sortedEvents.map((event) => {
                return (
                  <div
                    key={event.id}
                    className="relative bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(201,162,39,0.3)] hover:shadow-lg"
                  >
                    {/* Colored Top Border */}
                    <div
                      className="h-1 w-full"
                      style={{ backgroundColor: "#c9a227" }}
              ></div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          {/* Event Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{event.name}</h3>
                          
                          {/* Category */}
                          <p className="text-sm text-[#8b8b7a] mb-3">{event.category}</p>

                          {/* Venue */}
                          <div className="flex items-center gap-2 text-sm text-[#8b8b7a] mb-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                            </svg>
                            <span className="truncate">{event.venue}</span>
                          </div>

                          {/* Time Range */}
                          <div className="text-sm text-[#8b8b7a]">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </div>
                        </div>

                        {/* Right: Large Timestamp */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-white">
                            {event.startTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Desktop: Timeline Grid */}
          <div
            ref={timelineRef}
            className="hidden lg:block relative bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-2xl p-4 sm:p-6 overflow-x-auto"
            style={{
              backgroundColor: "rgba(13, 19, 33, 0.95)",
            }}
          >
            {/* Time Header */}
            <div className="flex mb-4 min-w-[1100px] relative border-b border-[rgba(201,162,39,0.15)] pb-2">
              <div className="w-32 sm:w-40 flex-shrink-0"></div>
              <div className="flex-1 relative" style={{ height: '28px' }}>
                {generateTimeSlots().map((time, index) => {
                  const position = index === 0 ? 0 : index === 11 ? 100 : (index / 11) * 100;
                  return (
                    <div
                      key={`time-${time}-${index}`}
                      className="absolute text-center text-xs sm:text-sm text-[#8b7355] font-medium"
                      style={{
                        left: `${position}%`,
                        transform: 'translateX(-50%)',
                        top: 0,
                      }}
                    >
                      {index > 0 && (
                        <div 
                          className="absolute left-1/2 top-0 w-px bg-[rgba(201,162,39,0.15)] -translate-x-1/2" 
                          style={{ 
                            height: 'calc(100% + 8px)',
                            bottom: '-8px',
                          }}
                        ></div>
                      )}
                      <div className="relative z-10 whitespace-nowrap px-1">{time}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Tracks */}
            <div className="min-w-[1100px] relative">
              {(() => {
                const dayEvents = sportsEvents.filter((e) => e.day === selectedDay);
                if (dayEvents.length === 0) {
                  return (
                    <div className="text-center py-12 text-[#8b8b7a] relative z-10">
                      No events scheduled for Day {selectedDay}
                    </div>
                  );
                }

                // Group events by time to avoid overlaps
                const sortedEvents = [...dayEvents].sort((a, b) => {
                  const aStart = timeToMinutes(a.startTime);
                  const bStart = timeToMinutes(b.startTime);
                  if (aStart !== bStart) return aStart - bStart;
                  return timeToMinutes(a.endTime) - timeToMinutes(b.endTime);
                });

                // Create tracks for overlapping events
                const tracks: SportsEvent[][] = [];
                sortedEvents.forEach((event) => {
                  let placed = false;
                  for (const track of tracks) {
                    const lastEvent = track[track.length - 1];
                    const lastEnd = timeToMinutes(lastEvent.endTime);
                    const currentStart = timeToMinutes(event.startTime);
                    if (currentStart >= lastEnd) {
                      track.push(event);
                      placed = true;
                      break;
                    }
                  }
                  if (!placed) {
                    tracks.push([event]);
                  }
                });

                return (
                  <div className="relative" style={{ minHeight: `${tracks.length * 80}px` }}>
                    {tracks.map((track, trackIndex) => (
                      <div
                        key={`track-${trackIndex}`}
                        className="relative mb-4"
                        style={{
                          height: '70px',
                          marginBottom: '16px',
                        }}
                      >
                        {/* Horizontal line */}
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-[rgba(201,162,39,0.15)] -translate-y-1/2"></div>

                        {/* Event blocks */}
                        {track.map((event) => {
                          const { left, width } = calculateEventPosition(event.startTime, event.endTime);
                          const tooltipId = `sports-tooltip-${event.id}`;
                          
                          return (
                            <div
                              key={event.id}
                              className="absolute top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 group"
                              style={{
                                left: `calc(${left}% + 160px)`,
                                width: `calc(${width}% - 8px)`,
                                minWidth: '120px',
                                backgroundColor: '#ec4899',
                                border: '1px solid rgba(236, 72, 153, 0.3)',
                                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
                              }}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setTooltip({
                                  event: event as SportsEvent & { type?: string },
                                  x: rect.left + rect.width / 2,
                                  y: rect.top - 10,
                                });
                              }}
                              onMouseLeave={() => setTooltip({ event: null, x: 0, y: 0 })}
                            >
                              <div className="text-white text-sm font-semibold truncate mb-1">
                                {event.name}
                              </div>
                              <div className="text-white/80 text-xs truncate">
                                {event.venue}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Tooltip */}
          {tooltip.event && (
            <div
              ref={tooltipRef}
              className="fixed z-50 pointer-events-none bg-gradient-to-br from-[rgba(13,19,33,0.98)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.3)] rounded-xl p-4 shadow-2xl max-w-xs"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                transform: 'translate(-50%, -100%)',
                marginTop: '-8px',
              }}
            >
              <h4 className="text-white font-bold text-lg mb-2">{tooltip.event.name}</h4>
              {tooltip.event.category && (
                <div className="mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-[rgba(201,162,39,0.15)] text-[#c9a227] border border-[rgba(201,162,39,0.3)]">
                    {tooltip.event.category}
                  </span>
                </div>
              )}
              <div className="text-[#8b8b7a] text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                  </svg>
                  <span>{tooltip.event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{formatTime(tooltip.event.startTime)} - {formatTime(tooltip.event.endTime)}</span>
                </div>
                {tooltip.event.description && (
                  <p className="mt-2 text-[#d4c5a9]">{tooltip.event.description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cultural Events View */}
      {selectedEventType === "cultural" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Cultural Hero Card */}
          <div className="relative overflow-hidden rounded-3xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,162,39,0.2)] to-[rgba(201,162,39,0.1)] opacity-20"></div>
            <div className="relative bg-gradient-to-br from-[rgba(13,19,33,0.9)] to-[rgba(5,5,8,0.95)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-3xl p-6 sm:p-8">
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                {/* Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center shadow-lg bg-[rgba(201,162,39,0.1)] text-5xl">
                  🎭
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Cultural Events</h2>
                  <p className="text-[#8b8b7a] text-sm sm:text-base">Cultural performances and competitions</p>
                </div>

                {/* Day Selector and Download Button */}
                <div className="flex items-center gap-2">
                  {([1, 2] as const).map((day) => {
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedDay === day
                            ? "text-white"
                            : "text-[#8b8b7a] hover:text-[#d4c5a9]"
                        }`}
                        style={{
                          backgroundColor: selectedDay === day ? "#c9a227" : "rgba(201,162,39,0.1)",
                        }}
                      >
                        Day {day}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleDownloadCulturalSchedule}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#d4c5a9] hover:text-white transition-all bg-[rgba(201,162,39,0.1)] hover:bg-[rgba(201,162,39,0.2)] border border-[rgba(201,162,39,0.3)] hover:border-[rgba(201,162,39,0.5)]"
                    title="Download Schedule"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Card Layout */}
          <div className="lg:hidden space-y-4">
            {(() => {
              const dayEvents = culturalEvents.filter((e) => e.day === selectedDay);
              if (dayEvents.length === 0) {
                return (
                  <div className="text-center py-12 text-[#8b8b7a]">
                    No events scheduled for Day {selectedDay}
                  </div>
                );
              }

              // Sort events by start time
              const sortedEvents = [...dayEvents].sort((a, b) => {
                const aMinutes = timeToMinutes(a.startTime);
                const bMinutes = timeToMinutes(b.startTime);
                return aMinutes - bMinutes;
              });

              return sortedEvents.map((event) => {
                return (
                  <div
                    key={event.id}
                    className="relative bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(201,162,39,0.3)] hover:shadow-lg"
                  >
                    {/* Colored Top Border */}
                    <div
                      className="h-1 w-full"
                      style={{ backgroundColor: "#c9a227" }}
                    ></div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          {/* Event Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{event.name}</h3>

                          {/* Venue */}
                          <div className="flex items-center gap-2 text-sm text-[#8b8b7a] mb-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                            </svg>
                            <span className="truncate">{event.venue}</span>
                          </div>

                          {/* Time Range */}
                          <div className="text-sm text-[#8b8b7a]">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </div>
                        </div>

                        {/* Right: Large Timestamp */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-white">
                            {event.startTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Desktop: Timeline Grid */}
          <div
            ref={timelineRef}
            className="hidden lg:block relative bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-2xl p-4 sm:p-6 overflow-x-auto"
            style={{
              backgroundColor: "rgba(13, 19, 33, 0.95)",
            }}
          >
            {/* Time Header */}
            <div className="flex mb-4 min-w-[1100px] relative border-b border-[rgba(201,162,39,0.15)] pb-2">
              <div className="w-32 sm:w-40 flex-shrink-0"></div>
              <div className="flex-1 relative" style={{ height: '28px' }}>
                {generateTimeSlots().map((time, index) => {
                  const position = index === 0 ? 0 : index === 11 ? 100 : (index / 11) * 100;
                  return (
                    <div
                      key={`time-${time}-${index}`}
                      className="absolute text-center text-xs sm:text-sm text-[#8b7355] font-medium"
                      style={{
                        left: `${position}%`,
                        transform: 'translateX(-50%)',
                        top: 0,
                      }}
                    >
                      {index > 0 && (
                        <div 
                          className="absolute left-1/2 top-0 w-px bg-[rgba(201,162,39,0.15)] -translate-x-1/2" 
                          style={{ 
                            height: 'calc(100% + 8px)',
                            bottom: '-8px',
                          }}
                        ></div>
                      )}
                      <div className="relative z-10 whitespace-nowrap px-1">{time}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Tracks */}
            <div className="min-w-[1100px] relative">
              {(() => {
                const dayEvents = culturalEvents.filter((e) => e.day === selectedDay);
                if (dayEvents.length === 0) {
                  return (
                    <div className="text-center py-12 text-[#8b8b7a] relative z-10">
                      No events scheduled for Day {selectedDay}
                    </div>
                  );
                }

                // Group events by time to avoid overlaps
                const sortedEvents = [...dayEvents].sort((a, b) => {
                  const aStart = timeToMinutes(a.startTime);
                  const bStart = timeToMinutes(b.startTime);
                  if (aStart !== bStart) return aStart - bStart;
                  return timeToMinutes(a.endTime) - timeToMinutes(b.endTime);
                });

                // Create tracks for overlapping events
                const tracks: CulturalEvent[][] = [];
                sortedEvents.forEach((event) => {
                  let placed = false;
                  for (const track of tracks) {
                    const lastEvent = track[track.length - 1];
                    const lastEnd = timeToMinutes(lastEvent.endTime);
                    const currentStart = timeToMinutes(event.startTime);
                    if (currentStart >= lastEnd) {
                      track.push(event);
                      placed = true;
                      break;
                    }
                  }
                  if (!placed) {
                    tracks.push([event]);
                  }
                });

                return (
                  <div className="relative" style={{ minHeight: `${tracks.length * 80}px` }}>
                    {tracks.map((track, trackIndex) => (
                      <div
                        key={`track-${trackIndex}`}
                        className="relative mb-4"
                        style={{
                          height: '70px',
                          marginBottom: '16px',
                        }}
                      >
                        {/* Horizontal line */}
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-[rgba(201,162,39,0.15)] -translate-y-1/2"></div>

                        {/* Event blocks */}
                        {track.map((event) => {
                          const { left, width } = calculateEventPosition(event.startTime, event.endTime);
                          
                          return (
                            <div
                              key={event.id}
                              className="absolute top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 group"
                              style={{
                                left: `calc(${left}% + 160px)`,
                                width: `calc(${width}% - 8px)`,
                                minWidth: '120px',
                                backgroundColor: '#a855f7',
                                border: '1px solid rgba(168, 85, 247, 0.3)',
                                boxShadow: '0 4px 12px rgba(168, 85, 247, 0.2)',
                              }}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setTooltip({
                                  event: event as CulturalEvent & { type?: string },
                                  x: rect.left + rect.width / 2,
                                  y: rect.top - 10,
                                });
                              }}
                              onMouseLeave={() => setTooltip({ event: null, x: 0, y: 0 })}
                            >
                              <div className="text-white text-sm font-semibold truncate mb-1">
                                {event.name}
                              </div>
                              <div className="text-white/80 text-xs truncate">
                                {event.venue}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Department Events View - Grid Timeline */}
      {selectedEventType === "department" && selectedDepartment && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Department Hero Card */}
          <div className="relative overflow-hidden rounded-3xl mb-8">
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedDepartment.gradient} opacity-20`}></div>
            <div className="relative bg-gradient-to-br from-[rgba(13,19,33,0.9)] to-[rgba(5,5,8,0.95)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-3xl p-6 sm:p-8">
              {/* Close/Back Button - Top Right */}
              <button
                onClick={handleBackToDepartments}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[rgba(13,19,33,0.9)] border border-[rgba(201,162,39,0.2)] backdrop-blur-xl flex items-center justify-center hover:border-[rgba(201,162,39,0.4)] hover:bg-[rgba(201,162,39,0.1)] transition-all duration-300 shadow-lg z-10 group"
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#d4c5a9] group-hover:text-[#c9a227] transition-colors duration-300"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                {/* Icon */}
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl shadow-lg"
                  style={{ backgroundColor: `${selectedDepartment.color}30`, boxShadow: `0 0 40px ${selectedDepartment.color}30` }}
                >
                  {selectedDepartment.icon}
                </div>
                
                {/* Info */}
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#d4c5a9] mb-2">{selectedDepartment.name}</h2>
                  <p className="text-[#8b8b7a] mb-4">Event Schedule Timeline</p>
                  
                  {/* Day Selector and Download */}
                  <div className="flex justify-center sm:justify-start items-center gap-3 flex-wrap">
                    <div className="flex gap-2">
                      {[1, 2].map((day) => {
                        const dayEvents = departmentEvents[selectedDepartment.id]?.filter((e) => e.day === day) || [];
                        if (dayEvents.length === 0) return null;
                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day as 1 | 2)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedDay === day
                                ? "text-white"
                                : "text-[#8b8b7a] hover:text-[#d4c5a9]"
                            }`}
                            style={{
                              backgroundColor: selectedDay === day ? selectedDepartment.color : "rgba(201,162,39,0.1)",
                            }}
                          >
                            Day {day}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleDownloadSchedule}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#d4c5a9] hover:text-white transition-all bg-[rgba(201,162,39,0.1)] hover:bg-[rgba(201,162,39,0.2)] border border-[rgba(201,162,39,0.3)] hover:border-[rgba(201,162,39,0.5)]"
                      title="Download Schedule"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Mobile/Tablet: Vertical Card Layout */}
          <div className="lg:hidden space-y-4">
            {(() => {
              const dayEvents = departmentEvents[selectedDepartment.id]?.filter((e) => e.day === selectedDay) || [];
              if (dayEvents.length === 0) {
                return (
                  <div className="text-center py-12 text-[#8b8b7a]">
                    No events scheduled for Day {selectedDay}
          </div>
                );
              }

              // Sort events by start time
              const sortedEvents = [...dayEvents].sort((a, b) => {
                const aMinutes = timeToMinutes(a.startTime);
                const bMinutes = timeToMinutes(b.startTime);
                return aMinutes - bMinutes;
              });

              return sortedEvents.map((event) => {
            return (
                  <div
                    key={event.id}
                    className="relative bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(201,162,39,0.3)] hover:shadow-lg"
                  >
                    {/* Colored Top Border */}
                    <div
                      className="h-1 w-full"
                      style={{ backgroundColor: selectedDepartment.color }}
                    ></div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          {/* Event Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{event.name}</h3>
                          
                          {/* Category/Type */}
                          <p className="text-sm text-[#8b8b7a] mb-3">{event.type}</p>

                          {/* Venue */}
                          <div className="flex items-center gap-2 text-sm text-[#8b8b7a] mb-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                            </svg>
                            <span className="truncate">{event.venue}</span>
                  </div>

                          {/* Time Range */}
                          <div className="text-sm text-[#8b8b7a]">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          </div>
                </div>

                        {/* Right: Large Timestamp */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-white">
                            {event.startTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Desktop: Timeline Grid */}
          <div
            ref={timelineRef}
            className="hidden lg:block relative bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-2xl p-4 sm:p-6 overflow-x-auto"
            style={{
              backgroundColor: "rgba(13, 19, 33, 0.95)",
            }}
          >
            {/* Time Header */}
            <div className="flex mb-4 min-w-[1100px] relative border-b border-[rgba(201,162,39,0.15)] pb-2">
              <div className="w-32 sm:w-40 flex-shrink-0"></div>
              <div className="flex-1 relative" style={{ height: '28px' }}>
                {/* Position markers to represent 11-hour span correctly */}
                {generateTimeSlots().map((time, index) => {
                  // 12 markers for 11 hours: position at 0%, 9.09%, 18.18%, ..., 100%
                  const position = index === 0 ? 0 : index === 11 ? 100 : (index / 11) * 100;
                  return (
                    <div
                      key={`time-${time}-${index}`}
                      className="absolute text-center text-xs sm:text-sm text-[#8b7355] font-medium"
                      style={{
                        left: `${position}%`,
                        transform: 'translateX(-50%)',
                        top: 0,
                      }}
                    >
                      {/* Grid line at each marker position */}
                      {index > 0 && (
                        <div 
                          className="absolute left-1/2 top-0 w-px bg-[rgba(201,162,39,0.15)] -translate-x-1/2" 
                          style={{ 
                            height: 'calc(100% + 8px)',
                            bottom: '-8px',
                          }}
                        ></div>
                      )}
                      <div className="relative z-10 whitespace-nowrap px-1">{time}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Tracks */}
            <div className="min-w-[1100px] relative">
              {(() => {
                const dayEvents = departmentEvents[selectedDepartment.id]?.filter((e) => e.day === selectedDay) || [];
                if (dayEvents.length === 0) {
                  return (
                    <div className="text-center py-12 text-[#8b8b7a] relative z-10">
                      No events scheduled for Day {selectedDay}
                          </div>
                  );
                }

                // Filter out invalid events and sort by start time
                const validEvents = dayEvents.filter((e) => {
                  if (!e.startTime || !e.endTime) return false;
                  const [startH, startM] = e.startTime.split(":").map(Number);
                  const [endH, endM] = e.endTime.split(":").map(Number);
                  if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return false;
                  return true;
                });

                if (validEvents.length === 0) {
                  return (
                    <div className="text-center py-12 text-[#8b8b7a] relative z-10">
                      No valid events scheduled for Day {selectedDay}
                            </div>
                  );
                }

                // Sort events by start time, then by end time
                const sortedEvents = [...validEvents].sort((a, b) => {
                  const aMinutes = timeToMinutes(a.startTime);
                  const bMinutes = timeToMinutes(b.startTime);
                  if (aMinutes !== bMinutes) return aMinutes - bMinutes;
                  // If start times are equal, sort by end time
                  const aEndMinutes = timeToMinutes(a.endTime);
                  const bEndMinutes = timeToMinutes(b.endTime);
                  return aEndMinutes - bEndMinutes;
                });

                return sortedEvents.map((event, index) => {
                  const { left, width } = calculateEventPosition(event.startTime, event.endTime);

                  return (
                    <div key={event.id} className="relative border-b border-[rgba(201,162,39,0.15)] last:border-b-0">
                      {/* Track Label */}
                      <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 flex items-center px-2 sm:px-4 z-10 bg-[rgba(13,19,33,0.95)]">
                        <div
                          className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm md:text-base font-semibold text-white whitespace-nowrap truncate"
                          style={{ 
                            backgroundColor: selectedDepartment.color,
                            textShadow: '0 0 10px rgba(201, 162, 39, 0.8), 0 0 20px rgba(201, 162, 39, 0.6), 0 0 30px rgba(201, 162, 39, 0.4)'
                          }}
                          title={event.name || 'Event'}
                        >
                          {event.name || 'Event'}
                              </div>
                              </div>

                      {/* Track Content with vertical grid lines */}
                      <div className="ml-32 sm:ml-40 relative h-16 sm:h-20 md:h-24 flex items-center">
                        {/* Vertical grid lines aligned with time header markers */}
                        <div className="absolute inset-0 pointer-events-none">
                          {generateTimeSlots().map((time, slotIndex) => {
                            // Match the positioning from time header: 0%, 9.09%, 18.18%, ..., 100%
                            const position = slotIndex === 0 ? 0 : slotIndex === 11 ? 100 : (slotIndex / 11) * 100;
                            // Show grid line for all markers except the first (left edge)
                            if (slotIndex === 0) return null;
                            return (
                              <div
                                key={`grid-${time}-${slotIndex}-${event.id}`}
                                className="absolute top-0 bottom-0 w-px bg-[rgba(201,162,39,0.15)]"
                                style={{
                                  left: `${position}%`,
                                }}
                              ></div>
                            );
                          })}
                        </div>

                        {/* Event Block */}
                        {width > 0 && (
                          <div
                            className="absolute rounded-lg cursor-pointer transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-lg flex items-center px-3 sm:px-4 md:px-5 relative z-10"
                            style={{
                              left: `${Math.max(0, Math.min(100, left))}%`,
                              width: `${Math.max(2, Math.min(100, width))}%`,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              height: 'calc(100% - 12px)',
                              backgroundColor: selectedDepartment.color,
                              minWidth: width < 5 ? "60px" : "100px",
                              maxWidth: '100%',
                            }}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const containerRect = timelineRef.current?.getBoundingClientRect();
                              if (containerRect) {
                                setTooltip({
                                  event,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                });
                              }
                            }}
                            onMouseLeave={() => setTooltip({ event: null, x: 0, y: 0 })}
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setTooltip({
                                event,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                          >
                            <div className="text-white overflow-hidden w-full flex flex-col justify-center">
                              <div className="text-sm sm:text-base md:text-lg font-bold truncate leading-tight">
                                {event.name || 'Event'}
                              </div>
                              {width > 8 && event.venue && (
                                <div className="text-xs sm:text-sm md:text-base opacity-80 truncate mt-0.5 leading-tight">
                                  {event.venue}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
                            </div>
                          </div>

          {/* Tooltip */}
          {tooltip.event && (
            <div
              ref={tooltipRef}
              className="fixed z-50 pointer-events-none mb-2"
              style={{
                left: `${Math.max(150, Math.min(typeof window !== 'undefined' ? window.innerWidth - 150 : tooltip.x, tooltip.x))}px`,
                top: `${Math.max(100, tooltip.y - 10)}px`,
                transform: "translate(-50%, calc(-100% - 8px))",
              }}
            >
              <div className="bg-gradient-to-br from-[rgba(13,19,33,0.98)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl rounded-lg shadow-xl p-4 min-w-[220px] max-w-[280px] border border-[rgba(201,162,39,0.3)]">
                <h4 className="font-bold text-[#d4c5a9] mb-3 text-base">{tooltip.event.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#8b8b7a]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#c9a227] flex-shrink-0">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                    <span>{formatTime(tooltip.event.startTime)} - {formatTime(tooltip.event.endTime)}</span>
                            </div>
                  <div className="flex items-center gap-2 text-[#8b8b7a]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#c9a227] flex-shrink-0">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                    </svg>
                    <span>{tooltip.event.venue}</span>
                          </div>
                  <div className="flex items-center gap-2 text-[#8b8b7a]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#c9a227] flex-shrink-0">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span>{tooltip.event.type}</span>
                        </div>
                  <div className="flex items-center gap-2 text-[#8b8b7a]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#c9a227] flex-shrink-0">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>{calculateDuration(tooltip.event.startTime, tooltip.event.endTime)}</span>
                      </div>
                    </div>
                {tooltip.event.description && (
                  <p className="mt-3 text-xs text-[#8b7355] pt-3 border-t border-[rgba(201,162,39,0.2)]">{tooltip.event.description}</p>
                )}
                </div>
              </div>
          )}
        </div>
      )}
    </div>
  );
}
