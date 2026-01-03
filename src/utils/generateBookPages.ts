export interface BookPage {
  pageNumber: number;
  content: string;
  isImage: boolean;
  imagePath?: string;
}

export interface Coordinator {
  name: string;
  phone: string;
}

export interface EventData {
  eventName: string;
  department: string;
  date: string;
  time: string;
  rules: string[];
  facultyCoordinators: Coordinator[];
  studentCoordinators: Coordinator[];
}

export function generateBookPages(
  bookId: string,
  frontCover: string,
  backCover: string,
  eventData?: EventData
): BookPage[] {
  const pages: BookPage[] = [];

  // All pages 1-30: Generated content with ancient styling (no cover images)
  for (let i = 1; i <= 30; i++) {
    pages.push({
      pageNumber: i,
      content: generatePageContent(bookId, i, eventData),
      isImage: false,
    });
  }

  return pages;
}

function generatePageContent(bookId: string, pageNumber: number, eventData?: EventData): string {
  // Default/fallback values if eventData is not provided
  const defaultEventData: EventData = {
    eventName: 'Mystic Code Challenge',
    department: 'Computer Science & Engineering',
    date: 'March 15, 2026',
    time: '10:00 AM',
    rules: [
      'Team size: 2-3 members per team',
      'Duration of event: 2 hours',
      'Electronic gadgets are strictly prohibited',
      'Judges\' decision will be final'
    ],
    facultyCoordinators: [
      { name: 'Dr. A. Smith', phone: '+91 98765 43210' },
      { name: 'Prof. B. Jones', phone: '+91 98765 43211' }
    ],
    studentCoordinators: [
      { name: 'John Doe', phone: '+91 98765 12345' },
      { name: 'Jane Doe', phone: '+91 98765 12346' }
    ]
  };

  const data = eventData || defaultEventData;

  // Generate rules list HTML
  const rulesList = data.rules.map(rule => `
    <li class="flex items-start text-[#3e2b18] text-sm font-medium leading-snug">
      <span class="mr-3 text-[#8b6f47] text-lg flex-shrink-0">❖</span>
      <span>${rule}</span>
    </li>
  `).join('');

  // Generate faculty coordinators list HTML
  const facultyCoordinatorsList = data.facultyCoordinators.map(coord => `
    <div class="flex justify-between items-center border-b-2 border-[#8b6f47]/20 pb-1">
      <span class="text-[#3e2b18] font-bold text-xs">${coord.name}</span>
      <span class="text-[#5d4a2f] font-mono text-[0.65rem] tracking-wider">${coord.phone}</span>
    </div>
  `).join('');

  // Generate student coordinators list HTML
  const studentCoordinatorsList = data.studentCoordinators.map(coord => `
    <div class="flex justify-between items-center border-b-2 border-[#8b6f47]/20 pb-1">
      <span class="text-[#3e2b18] font-bold text-xs">${coord.name}</span>
      <span class="text-[#5d4a2f] font-mono text-[0.65rem] tracking-wider">${coord.phone}</span>
    </div>
  `).join('');

  return `
    <div class="page-text h-full flex flex-col justify-start" style="padding: 0.3rem 1rem 4rem 1rem;">
      
      <div class="main-info grid grid-cols-1 gap-1 w-full mb-1">
        <div class="info-block border-l-[6px] border-[#8b6f47] py-0.5">
            <div class="pl-[20px] pr-4">
                <label class="block text-[#8b6f47] font-bold text-[0.6rem] uppercase tracking-widest mb-0">Event Name</label>
                <div class="text-[#3e2b18] text-xl font-serif font-bold italic leading-tight">${data.eventName}</div>
            </div>
        </div>

        <div class="info-block border-l-[6px] border-[#8b6f47] py-0.5">
            <div class="pl-[20px] pr-4">
                <label class="block text-[#8b6f47] font-bold text-[0.6rem] uppercase tracking-widest mb-0">Department</label>
                <div class="text-[#3e2b18] text-lg font-bold leading-tight">${data.department}</div>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-1">
            <div class="info-block border-l-[6px] border-[#8b6f47] py-0.5">
                <div class="pl-[20px] pr-4">
                    <label class="block text-[#8b6f47] font-bold text-[0.6rem] uppercase tracking-widest mb-0">Date</label>
                    <div class="text-[#3e2b18] text-base font-bold leading-tight">${data.date}</div>
                </div>
            </div>
            <div class="info-block border-l-[6px] border-[#8b6f47] py-0.5">
                <div class="pl-[20px] pr-4">
                    <label class="block text-[#8b6f47] font-bold text-[0.6rem] uppercase tracking-widest mb-0">Time</label>
                    <div class="text-[#3e2b18] text-base font-bold leading-tight">${data.time}</div>
                </div>
            </div>
        </div>
      </div>

      <div class="rules-section flex flex-col justify-center my-0.5 py-1 px-4 border-y-2 border-[#8b6f47]/30 bg-[#8b6f47]/5 rounded-lg">
          <h3 class="text-center text-[#5d4a2f] font-bold text-sm uppercase tracking-[0.2em] mb-0.5 mt-0.5 decoration-dotted underline underline-offset-2">Rules & Regulations</h3>
          <ul class="space-y-0.5 px-3">
              ${rulesList}
          </ul>
      </div>

      <div class="coordinators-section pt-0.5 border-t-4 border-double border-[#8b6f47]">
      <div class="grid grid-cols-1 gap-0.5">
            <div class="coordinator-group">
                <h4 class="text-center text-[#5d4a2f] text-[0.65rem] uppercase tracking-[0.3em] mb-0.5 mt-0.5 font-bold">- Faculty Co-ordinators -</h4>
                <div class="flex flex-col space-y-0.5 px-3">
                    ${facultyCoordinatorsList}
                </div>
            </div>
            
            <div class="coordinator-group">
                <h4 class="text-center text-[#5d4a2f] text-[0.65rem] uppercase tracking-[0.3em] mb-0.5 mt-0.5 font-bold">- Student Co-ordinators -</h4>
                <div class="flex flex-col space-y-0.5 px-3">
                    ${studentCoordinatorsList}
                </div>
            </div>
        </div>
      </div>
    </div>
  `;
}

function generatePosterContent(bookId: string, pageNumber: number): string {
  const themes: Record<string, string> = {
    technical: 'Technical Programs',
    'non-technical': 'Non-Technical Programs',
    cultural: 'Cultural Programs',
    sports: 'Sports Programs',
  };
  const theme = themes[bookId] || 'Events';

  return `
    <div class="h-full w-full flex flex-col items-center justify-center p-4">
        <div class="border-4 border-double border-[#8b6f47] p-2 bg-[#8b6f47]/10 w-full h-full flex items-center justify-center">
             <div class="relative w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-[#8b6f47]/40">
                <h3 class="text-[#5d4a2f] font-black uppercase tracking-widest mb-4 text-center">${theme}</h3>
                <div class="w-32 h-32 rounded-full bg-[#8b6f47]/20 flex items-center justify-center mb-4">
                    <span class="text-4xl">📸</span>
                </div>
                <p class="text-[#3e2b18] font-serif italic text-lg text-center px-4">Event Poster ${pageNumber}</p>
                <p class="text-[#8b6f47] text-xs uppercase tracking-widest mt-2">(Image Placeholder)</p>
             </div>
        </div>
    </div>
  `;
}
