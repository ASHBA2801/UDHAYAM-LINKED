"use client";

import { useState, useEffect } from "react";
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

// Coordinator data structure
interface Coordinator {
  name: string;
  phone: string;
}

interface EventCoordinatorPerson {
  name: string;
  phone: string;
}

interface EventCoordinator {
  eventName: string;
  coordinators: EventCoordinatorPerson[];
}

interface DepartmentCoordinators {
  staffCoordinator: Coordinator;
  studentCoordinator: Coordinator;
  eventCoordinators?: EventCoordinator[];
  allEventsCoordinator?: Coordinator; // For departments without event-specific coordinators
}

interface CulturalCoordinators {
  staffCoordinators: Coordinator[];
  eventCoordinators: EventCoordinator[];
}

interface SportsCoordinators {
  staffCoordinators: Coordinator[];
  eventCoordinators: EventCoordinator[];
}

type EventType = "department" | "cultural" | "sports" | null;

// 14 Departments with gradients (same as schedule page)
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

// Coordinator data for each department (placeholder data - replace with actual data)
const departmentCoordinators: Record<string, DepartmentCoordinators> = {
  aero: {
    staffCoordinator: { name: "S L Pradeep kumar", phone: "+91 9659191486" },
    studentCoordinator: { name: "K. SIVA SUDHAN", phone: "+91 6383644972" },
    eventCoordinators: [
      { eventName: "Paper Presentation", coordinators: [{ name: "THAPASYA MUTHANNA K", phone: "+91 0000000000" }] },
      { eventName: "TECHNICAL QUIZ", coordinators: [{ name: "ADWAITH BIJU", phone: "+91 0000000000" }] },
      { eventName: "WATER ROCKETRY", coordinators: [{ name: "LOGA PRATHAP B", phone: "+91 0000000000" }] },
      { eventName: "BRAIN OH BUNCH", coordinators: [{ name: "ABISRI R", phone: "+91 0000000000" }] },
      { eventName: "E - ARENA", coordinators: [{ name: "KUMARAN U", phone: "+91 0000000000" }] },
    ],
  },
  agri: {
    staffCoordinator: { name: "Ms.R.Vennila", phone: "+91 9790564132" },
    studentCoordinator: { name: "M.THIRUPATHY", phone: "+91 9345452095" },
    eventCoordinators: [
      { eventName: "Project Expo", coordinators: [{ name: "A. Tamilarasu", phone: "+91 0000000000" }, { name: "S. Vinothini", phone: "+91 0000000000" }] },
      { eventName: "Paper presentation", coordinators: [{ name: "T. Karthik", phone: "+91 0000000000" }, { name: "A.Kiruthika", phone: "+91 0000000000" }] },
      { eventName: "Minute to win It", coordinators: [{ name: "J. P.Allwin Winny", phone: "+91 0000000000" }, { name: "S. Priyadharshika", phone: "+91 0000000000" }] },
      { eventName: "Fireless cooking", coordinators: [{ name: "A. Gopinath", phone: "+91 0000000000" }, { name: "D .Hemalatha", phone: "+91 0000000000" }] },
      { eventName: "Reel Making", coordinators: [{ name: "P. Darvin", phone: "+91 0000000000" }, { name: "B.Dhusith Eshana", phone: "+91 0000000000" }] },
    ],
  },
  aids: {
    staffCoordinator: { name: "Mrs.K.Aarthi", phone: "+91 7708534032" },
    studentCoordinator: { name: "Mr.Vijesh", phone: "+91 9345699340" },
    eventCoordinators: [
      { eventName: "Paper Presentation", coordinators: [{ name: "S.SANJAI KUMAR", phone: "+91 9500488817" }, { name: "S.PANNEER SELVAM", phone: "+91 6384075795" }] },
      { eventName: "TECHNICAL QUIZ", coordinators: [{ name: "K.V.KEERTHIKA", phone: "+91 7550048676" }, { name: "S.NISSAN", phone: "+91 7358591550" }] },
      { eventName: "E- GAMING", coordinators: [{ name: "R.SHIVARAM", phone: "+91 6382097510" }, { name: "V.M.THUVARAKESH", phone: "+91 9629004051" }] },
      { eventName: "LOGICAL RIVERA", coordinators: [{ name: "S.BHAVADHARANI", phone: "+91 9042204369" }, { name: "J.VARSHA", phone: "+91 8438630051" }] },
    ],
  },
  bme: {
    staffCoordinator: { name: "Mrs.Tryphena", phone: "+91 8870944599" },
    studentCoordinator: { name: "Mr. Shanmuga Sundar", phone: "+91 9364162471" },
    eventCoordinators: [
      { eventName: "Project Expo", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Idea Sprint", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Technical Quiz", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Rebus", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Engg Meme Mania", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  biotech: {
    staffCoordinator: { name: "Dr. N. Verasekar", phone: "+91 9677903484" },
    studentCoordinator: { name: "V. Jagadeeshwaran", phone: "+91 7603806857" },
    eventCoordinators: [
      { eventName: "Paper presentation", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Bioquiz", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Biopuzzle", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Bioclick", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  csbs: {
    staffCoordinator: { name: "Mr.V.Surya", phone: "+91 8838108746" },
    studentCoordinator: { name: "Mr. V. RISHI ADHINARAYAN", phone: "+91 8754873181" },
    eventCoordinators: [
      { eventName: "Paper presentation", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "ThinkNflow", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Project expo", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "come play confuse", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "E Gamezz", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  cse: {
    staffCoordinator: { name: "Mr. Vijayarajasekaran", phone: "+91 8825631838" },
    studentCoordinator: { name: "Rajaganapathy", phone: "+91 7010492023" },
    eventCoordinators: [
      { eventName: "Technical quiz", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Spot the bot", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "project expo", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Theme photography", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Gaming corner", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  "cse-aiml": {
    staffCoordinator: { name: "Mr.S. Deepan", phone: "+91 9655882039" },
    studentCoordinator: { name: "Sarveshram", phone: "+91 9952849291" },
    eventCoordinators: [
      { eventName: "Paper Presentation", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "TechFusion Quest", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Mind Snap", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Free Fire Battle", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Lens & Motion", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  "cse-cs": {
    staffCoordinator: { name: "Mr. Vijayarajasekaran", phone: "+91 8825631838" },
    studentCoordinator: { name: "Rajaganapathy", phone: "+91 7010492023" },
    eventCoordinators: [
      { eventName: "Technical quiz", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Spot the bot", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "project expo", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Theme photography", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Gaming corner", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  ece: {
    staffCoordinator: { name: "Mr. P. Balasubramani", phone: "+91 9003384508" },
    studentCoordinator: { name: "Sai nithish", phone: "+91 9791542683" },
    eventCoordinators: [
      { eventName: "PAPER PRESENTATION", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "CIRCUIT DEBUGGING", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Project Expo", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "IPL AUCTION", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "E FOOTBALL", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  "ece-vlsi": {
    staffCoordinator: { name: "Mr. P. Balasubramani", phone: "+91 9003384508" },
    studentCoordinator: { name: "Sai nithish", phone: "+91 9791542683" },
    eventCoordinators: [
      { eventName: "PAPER PRESENTATION", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "CIRCUIT DEBUGGING", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Project Expo", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "IPL AUCTION", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "E FOOTBALL", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  eee: {
    staffCoordinator: { name: "Mr.K.Pradheep", phone: "+91 9597261232" },
    studentCoordinator: { name: "Mr.Harshan", phone: "+91 6379011674" },
    eventCoordinators: [
      { eventName: "Project Expo", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Quiz Sprint", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Paper presentation", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Doodle Detectives", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Free Fire", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  mech: {
    staffCoordinator: { name: "Mr.C .Ramkumar", phone: "+91 9942966447" },
    studentCoordinator: { name: "Madhankumar C.S", phone: "+91 9025476197" },
    eventCoordinators: [
      { 
        eventName: "Paper Presentation", 
        coordinators: [
          { name: "A.Joyal Christ", phone: "+91 9489312877" },
          { name: "G.Jeevanandham", phone: "+91 9361425838" }
        ]
      },
      { 
        eventName: "CAD Modelling", 
        coordinators: [
          { name: "B.Sathya Prakash", phone: "+91 9345555069" },
          { name: "B.Ba1velan", phone: "+91 7990769013" }
        ]
      },
      { 
        eventName: "Projec Expo", 
        coordinators: [
          { name: "S. Mohan Kumar", phone: "+91 9952699874" },
          { name: "C. Dinesh", phone: "+91 9361584718" }
        ]
      },
      { 
        eventName: "Freefire", 
        coordinators: [
          { name: "S.Gokul Kannan", phone: "+91 9361297190" },
          { name: "P.Thishon Prabhu", phone: "+91 9344595256" }
        ]
      },
      { 
        eventName: "Art of Aperture", 
        coordinators: [
          { name: "Suresh", phone: "+91 9790487391" },
          { name: "Gnana Deva Snegan", phone: "+91 9345302204" }
        ]
      },
    ],
  },
  mba: {
    staffCoordinator: { name: "Dr.K.Vimala", phone: "+91 9677553407" },
    studentCoordinator: { name: "Madhavan. S", phone: "+91 9994601404" },
    eventCoordinators: [
      { eventName: "Paper Presentation", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "AD zap", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Best Manager", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Business Paln Development", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Brand in a brush", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
  mca: {
    staffCoordinator: { name: "Ms .M. Umamaheswari", phone: "+91 8344367159" },
    studentCoordinator: { name: "Abirami M", phone: "+91 6374570711" },
    eventCoordinators: [
      { eventName: "Paper Presentation", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Technical Quiz", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Debugging", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
      { eventName: "Connections", coordinators: [{ name: "TBD", phone: "+91 0000000000" }] },
    ],
  },
};

// Cultural Events Coordinators
const culturalCoordinators: CulturalCoordinators = {
  staffCoordinators: [
    { name: "Dr.Nithya", phone: "+91 8667352579" },
    { name: "Dr.Geetha", phone: "+91 9994166420" },
    { name: "Dr. Kalpana", phone: "+91 9750555077" },
  ],
  eventCoordinators: [
    { eventName: "Dance", coordinators: [{ name: "Yuvan Shankar.S", phone: "+91 9094853407" }] },
    { eventName: "Music", coordinators: [{ name: "Manin Babu", phone: "+91 7695873020" }] },
    { eventName: "Mime", coordinators: [{ name: "Elakiya", phone: "+91 7305201728" }] },
    { eventName: "Reels Making", coordinators: [{ name: "Diganth U", phone: "+91 6382627312" }] },
    { eventName: "Adapt Tune", coordinators: [{ name: "Pooja", phone: "+91 8438850784" }] },
  ],
};

// Sports / NCC Events Coordinators
const sportsCoordinators: SportsCoordinators = {
  staffCoordinators: [
    { name: "Mr.A. Jayaprakash", phone: "+91 9843949510" },
    { name: "Mr.K. Jeganathan", phone: "+91 9976244576" },
    { name: "Lt.M. Dinesh", phone: "+91 9994599234" },
  ],
  eventCoordinators: [
    { eventName: "Ball Badminton (Men)", coordinators: [{ name: "S Krihtik 1st Year Mech", phone: "+91 8122858679" }] },
    { eventName: "Ball Badminton (Women)", coordinators: [{ name: "K Nikritha 1st Year VLSI", phone: "+91 7418790774" }] },
    { eventName: "Basketball (Men)", coordinators: [{ name: "J Bastin Jose 3rd Year ECE", phone: "+91 9344809589" }] },
    { eventName: "Basketball (Women)", coordinators: [{ name: "S Sindhu 3rd Year BME", phone: "+91 9500245276" }] },
    { eventName: "Cricket (Men)", coordinators: [{ name: "P Kaviraj 4th Year Mech", phone: "+91 8072759860" }] },
    { eventName: "Football (Men)", coordinators: [{ name: "N Vignesh Kumar 3rd Year CSBS", phone: "+91 7708225919" }] },
    { eventName: "Handball (Men)", coordinators: [{ name: "R Vijayaragavan 3rd Year Mech", phone: "+91 7548872607" }] },
    { eventName: "Kabaddi (Men)", coordinators: [{ name: "M Gaurav 3rd Year Aero", phone: "+91 8489549405" }] },
    { eventName: "KHO - KHO (Men)", coordinators: [{ name: "V Sabari Raja 3rd Year EEE", phone: "+91 9080179623" }] },
    { eventName: "Table Tennis (Men)", coordinators: [{ name: "D Godson Joel 3rd Year BME", phone: "+91 7639472242" }] },
    { eventName: "Table Tennis (Women)", coordinators: [{ name: "N Tanushree 1st Year VLSI", phone: "+91 9489189586" }] },
    { eventName: "Throwball (Women)", coordinators: [{ name: "A Manjula 3rd Year Aero", phone: "+91 9790671983" }] },
    { eventName: "Volleyball (Men)", coordinators: [{ name: "M.B Akashi Kanna 3rd Year CSBS", phone: "+91 8807674022" }] },
    { eventName: "Volleyball (Women)", coordinators: [{ name: "C Brindha 4th Year BME", phone: "+91 9361879959" }] },
    { eventName: "NCC Events", coordinators: [{ name: "S Dinesh", phone: "+91 8778831518" }, { name: "Divya Arjun Pawar", phone: "+91 9080047677" }] },
  ],
};

export default function ContactPage() {
  const { setIsLoading } = useLoading();
  const [selectedEventType, setSelectedEventType] = useState<EventType>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const handleBackToDepartments = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDepartment(null);
      setIsTransitioning(false);
    }, 300);
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const coordinators = selectedDepartment
    ? departmentCoordinators[selectedDepartment.id]
    : null;

  return (
    <div className={`min-h-screen relative z-10 section-container pt-24 sm:pt-28 md:pt-32 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
      {/* Animated Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20"></div>
      </div>

      {/* Magical radial glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-[rgba(201,162,39,0.05)] via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 opacity-90">
                <Image
                  src="/owl-3.png"
                  alt="Contact"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain animate-float"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d4c5a9] mb-4 gold-glow">
              Contact Coordinators
            </h1>
            <p className="text-[#8b7355] text-lg max-w-2xl mx-auto leading-relaxed">
              Reach out to our event coordinators for any queries or assistance
            </p>
          </div>

          {/* Tab Navigation - Hide when department is selected */}
          {!selectedDepartment && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
              <div className="inline-flex bg-[rgba(13,19,33,0.6)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-2xl p-1.5">
                <button
                  onClick={() => handleEventTypeClick("department")}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 relative ${
                    selectedEventType === "department"
                      ? "text-[#c9a227] bg-[rgba(201,162,39,0.15)] shadow-lg shadow-[rgba(201,162,39,0.1)]"
                      : "text-[#8b7355] hover:text-[#d4c5a9]"
                  }`}
                >
                  Department Events
                </button>
                <button
                  onClick={() => handleEventTypeClick("cultural")}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 relative ${
                    selectedEventType === "cultural"
                      ? "text-[#c9a227] bg-[rgba(201,162,39,0.15)] shadow-lg shadow-[rgba(201,162,39,0.1)]"
                      : "text-[#8b7355] hover:text-[#d4c5a9]"
                  }`}
                >
                  Cultural Events
                </button>
                <button
                  onClick={() => handleEventTypeClick("sports")}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 relative ${
                    selectedEventType === "sports"
                      ? "text-[#c9a227] bg-[rgba(201,162,39,0.15)] shadow-lg shadow-[rgba(201,162,39,0.1)]"
                      : "text-[#8b7355] hover:text-[#d4c5a9]"
                  }`}
                >
                  Sports / NCC Events
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar (Only on department selection) */}
        {selectedEventType === "department" && !selectedDepartment && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="relative max-w-2xl mx-auto">
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
                className="w-full pl-12 pr-4 py-3.5 bg-[rgba(13,19,33,0.6)] border border-[rgba(201,162,39,0.2)] rounded-xl text-[#d4c5a9] placeholder-[#8b7355] focus:outline-none focus:border-[rgba(201,162,39,0.5)] focus:ring-2 focus:ring-[rgba(201,162,39,0.1)] transition-all duration-300 backdrop-blur-xl"
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

        {/* Back Button for Department Detail View */}
        {selectedDepartment && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={handleBackToDepartments}
              className="flex items-center gap-2 text-[#d4c5a9] hover:text-[#c9a227] transition-colors duration-300 group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-1 transition-transform duration-300">
                <path d="M19 12H5M5 12l6-6M5 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium">Back to Departments</span>
            </button>
          </div>
        )}

        {/* Department Grid View */}
        {selectedEventType === "department" && !selectedDepartment && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {filteredDepartments.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-[#8b7355] text-xl mb-4">No departments found</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#c9a227] hover:text-[#d4c5a9] transition-colors duration-300 font-medium"
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

                      {/* Contact Badge */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[#8b8b7a] text-xs group-hover:text-white/60 transition-colors">
                            Contact
                          </span>
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

        {/* Cultural Events Section */}
        {selectedEventType === "cultural" && !selectedDepartment && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
            {/* Header */}
            <div className="mb-8 pb-4 border-b border-[rgba(201,162,39,0.1)]">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#d4c5a9] mb-2">
                Cultural Events Coordinators
              </h2>
              <p className="text-[#8b7355]">Get in touch with cultural event coordinators</p>
            </div>

            {/* Staff Coordinators */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#d4c5a9] mb-5">Staff Coordinators</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {culturalCoordinators.staffCoordinators.map((staff, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] p-6 hover:border-[rgba(201,162,39,0.4)] hover:shadow-lg hover:shadow-[rgba(201,162,39,0.2)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(201,162,39,0.2)] to-[rgba(201,162,39,0.1)] flex items-center justify-center mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#c9a227]">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-[#d4c5a9] mb-2">Staff Coordinator</h3>
                      <p className="text-[#c9a227] font-medium mb-2">{staff.name}</p>
                      <a
                        href={`tel:${staff.phone.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="text-sm">{staff.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Coordinators */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#d4c5a9] mb-5">Event Coordinators</h3>
              <div className="bg-[rgba(13,19,33,0.6)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {culturalCoordinators.eventCoordinators.map((eventCoord, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[rgba(201,162,39,0.05)] to-[rgba(201,162,39,0.02)] border border-[rgba(201,162,39,0.1)] p-4 hover:border-[rgba(201,162,39,0.3)] hover:shadow-md hover:shadow-[rgba(201,162,39,0.15)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-[#c9a227] mb-3 uppercase">{eventCoord.eventName}</h4>
                        <div className="space-y-2">
                          {eventCoord.coordinators.map((coordinator, coordIndex) => (
                            <div key={coordIndex} className="flex flex-col">
                              <p className="text-[#d4c5a9] text-sm font-medium mb-1">{coordinator.name}</p>
                              <a
                                href={`tel:${coordinator.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-1.5 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300 text-xs mb-2"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>{coordinator.phone}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sports Events Section */}
        {selectedEventType === "sports" && !selectedDepartment && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
            {/* Header */}
            <div className="mb-8 pb-4 border-b border-[rgba(201,162,39,0.1)]">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#d4c5a9] mb-2">
                Sports / NCC Events Coordinators
              </h2>
              <p className="text-[#8b7355]">Get in touch with sports and NCC event coordinators</p>
            </div>

            {/* Staff Coordinators */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#d4c5a9] mb-5">Staff Coordinators</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {sportsCoordinators.staffCoordinators.map((staff, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] p-6 hover:border-[rgba(201,162,39,0.4)] transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(201,162,39,0.2)] to-[rgba(201,162,39,0.1)] flex items-center justify-center mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#c9a227]">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-[#d4c5a9] mb-2">Staff Coordinator</h3>
                      <p className="text-[#c9a227] font-medium mb-2">{staff.name}</p>
                      <a
                        href={`tel:${staff.phone.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="text-sm">{staff.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Coordinators */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#d4c5a9] mb-5">Event Coordinators</h3>
              <div className="bg-[rgba(13,19,33,0.6)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sportsCoordinators.eventCoordinators.map((eventCoord, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[rgba(201,162,39,0.05)] to-[rgba(201,162,39,0.02)] border border-[rgba(201,162,39,0.1)] p-4 hover:border-[rgba(201,162,39,0.3)] hover:shadow-md hover:shadow-[rgba(201,162,39,0.15)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-[#c9a227] mb-3 uppercase">{eventCoord.eventName}</h4>
                        <div className="space-y-2">
                          {eventCoord.coordinators.map((coordinator, coordIndex) => (
                            <div key={coordIndex} className="flex flex-col">
                              <p className="text-[#d4c5a9] text-sm font-medium mb-1">{coordinator.name}</p>
                              <a
                                href={`tel:${coordinator.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-1.5 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300 text-xs mb-2"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>{coordinator.phone}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coordinator Details View */}
        {selectedDepartment && coordinators && (
          <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"} transition-all duration-300`}>
            {/* Department Header */}
            <div className="mb-8 pb-4 border-b border-[rgba(201,162,39,0.1)]">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: `${selectedDepartment.color}25` }}
                >
                  {selectedDepartment.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#d4c5a9] mb-1">
                    {selectedDepartment.name}
                  </h2>
                  <p className="text-[#8b7355] text-sm">Department Coordinators</p>
                </div>
              </div>
            </div>

            {/* Coordinators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Staff Coordinator */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] p-6 hover:border-[rgba(201,162,39,0.4)] hover:shadow-lg hover:shadow-[rgba(201,162,39,0.2)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(201,162,39,0.2)] to-[rgba(201,162,39,0.1)] flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#c9a227]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#d4c5a9] mb-2">Staff Coordinator</h3>
                  <p className="text-[#c9a227] font-medium mb-2">{coordinators.staffCoordinator.name}</p>
                  <a
                    href={`tel:${coordinators.staffCoordinator.phone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-sm">{coordinators.staffCoordinator.phone}</span>
                  </a>
                </div>
              </div>

              {/* Student Coordinator */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] p-6 hover:border-[rgba(201,162,39,0.4)] hover:shadow-lg hover:shadow-[rgba(201,162,39,0.2)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(201,162,39,0.2)] to-[rgba(201,162,39,0.1)] flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#c9a227]">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#d4c5a9] mb-2">Student Coordinator</h3>
                  <p className="text-[#c9a227] font-medium mb-2">{coordinators.studentCoordinator.name}</p>
                  <a
                    href={`tel:${coordinators.studentCoordinator.phone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-sm">{coordinators.studentCoordinator.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Event Coordinators Section */}
            {coordinators.eventCoordinators && coordinators.eventCoordinators.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-[#d4c5a9] mb-5">Event Coordinators</h3>
                <div className="bg-[rgba(13,19,33,0.6)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coordinators.eventCoordinators.map((eventCoord, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[rgba(201,162,39,0.05)] to-[rgba(201,162,39,0.02)] border border-[rgba(201,162,39,0.1)] p-4 hover:border-[rgba(201,162,39,0.3)] hover:shadow-md hover:shadow-[rgba(201,162,39,0.15)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-[#c9a227] mb-3 uppercase">{eventCoord.eventName}</h4>
                        <div className="space-y-2">
                          {eventCoord.coordinators.map((coordinator, coordIndex) => (
                            <div key={coordIndex} className="flex flex-col">
                              <p className="text-[#d4c5a9] text-sm font-medium mb-1">{coordinator.name}</p>
                              <a
                                href={`tel:${coordinator.phone.replace(/\s/g, "")}`}
                                className="flex items-center gap-1.5 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300 text-xs mb-2"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>{coordinator.phone}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            ) : coordinators.allEventsCoordinator && (
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(13,19,33,0.95)] to-[rgba(5,5,8,0.98)] backdrop-blur-xl border border-[rgba(201,162,39,0.15)] p-6 hover:border-[rgba(201,162,39,0.4)] hover:shadow-lg hover:shadow-[rgba(201,162,39,0.2)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(201,162,39,0.2)] to-[rgba(201,162,39,0.1)] flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#c9a227]">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#d4c5a9] mb-2">All Events Coordinator</h3>
                  <p className="text-[#c9a227] font-medium mb-2">{coordinators.allEventsCoordinator.name}</p>
                  <a
                    href={`tel:${coordinators.allEventsCoordinator.phone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 text-[#8b7355] hover:text-[#c9a227] transition-colors duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-sm">{coordinators.allEventsCoordinator.phone}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

