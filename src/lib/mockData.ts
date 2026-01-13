export interface Internship {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  category: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadline: string;
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  appliedDate: string;
  status: 'Pending' | 'Viewed' | 'Accepted' | 'Rejected';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'TechCorp Nigeria',
    logo: 'https://ui-avatars.com/api/?name=TC&background=0d9488&color=fff&size=64',
    location: 'Lagos, Nigeria',
    type: 'Hybrid',
    duration: '3 months',
    stipend: '₦80,000/month',
    category: 'Technology',
    description: 'Join our engineering team to build innovative solutions that impact millions of users. You will work on real projects, collaborate with senior engineers, and gain hands-on experience with modern technologies.',
    requirements: ['Currently pursuing a degree in Computer Science or related field', 'Knowledge of Python, JavaScript, or similar languages', 'Understanding of data structures and algorithms', 'Strong problem-solving skills'],
    responsibilities: ['Develop and maintain web applications', 'Write clean, maintainable code', 'Participate in code reviews', 'Collaborate with cross-functional teams'],
    postedDate: '2024-01-10',
    deadline: '2024-02-28',
  },
  {
    id: '2',
    title: 'Digital Marketing Intern',
    company: 'MediaHub Africa',
    logo: 'https://ui-avatars.com/api/?name=MH&background=f97316&color=fff&size=64',
    location: 'Remote',
    type: 'Remote',
    duration: '6 months',
    stipend: '₦50,000/month',
    category: 'Marketing',
    description: 'Be part of our dynamic marketing team and help create impactful digital campaigns. Learn SEO, content marketing, and social media strategies while working with major brands.',
    requirements: ['Strong written and verbal communication', 'Familiarity with social media platforms', 'Creative mindset', 'Basic understanding of digital marketing concepts'],
    responsibilities: ['Create and schedule social media content', 'Analyze campaign performance', 'Assist in SEO optimization', 'Support email marketing initiatives'],
    postedDate: '2024-01-12',
    deadline: '2024-03-15',
  },
  {
    id: '3',
    title: 'Financial Analyst Intern',
    company: 'FirstBank Nigeria',
    logo: 'https://ui-avatars.com/api/?name=FB&background=1e40af&color=fff&size=64',
    location: 'Abuja, Nigeria',
    type: 'On-site',
    duration: '4 months',
    stipend: '₦100,000/month',
    category: 'Finance',
    description: 'Gain valuable experience in financial analysis and reporting at one of Nigeria\'s leading banks. Work alongside experienced analysts on real financial projects.',
    requirements: ['Pursuing degree in Finance, Accounting, or Economics', 'Proficiency in Microsoft Excel', 'Strong analytical skills', 'Attention to detail'],
    responsibilities: ['Assist in financial modeling', 'Prepare financial reports', 'Conduct market research', 'Support budget analysis'],
    postedDate: '2024-01-08',
    deadline: '2024-02-20',
  },
  {
    id: '4',
    title: 'UI/UX Design Intern',
    company: 'DesignLab Studios',
    logo: 'https://ui-avatars.com/api/?name=DL&background=8b5cf6&color=fff&size=64',
    location: 'Lagos, Nigeria',
    type: 'Hybrid',
    duration: '3 months',
    stipend: '₦70,000/month',
    category: 'Design',
    description: 'Join our creative team to design beautiful, user-centered interfaces. You will learn from senior designers and work on products used by thousands of people.',
    requirements: ['Portfolio showcasing design work', 'Proficiency in Figma or Adobe XD', 'Understanding of UI/UX principles', 'Eye for detail and aesthetics'],
    responsibilities: ['Create wireframes and prototypes', 'Conduct user research', 'Design UI components', 'Collaborate with developers'],
    postedDate: '2024-01-14',
    deadline: '2024-03-01',
  },
  {
    id: '5',
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    logo: 'https://ui-avatars.com/api/?name=AP&background=059669&color=fff&size=64',
    location: 'Remote',
    type: 'Remote',
    duration: '6 months',
    stipend: '₦90,000/month',
    category: 'Technology',
    description: 'Work on cutting-edge data science projects involving machine learning, statistical analysis, and data visualization. Perfect for students passionate about data.',
    requirements: ['Knowledge of Python and SQL', 'Understanding of statistics and ML basics', 'Experience with data visualization', 'Currently pursuing relevant degree'],
    responsibilities: ['Clean and preprocess data', 'Build predictive models', 'Create data visualizations', 'Present findings to stakeholders'],
    postedDate: '2024-01-11',
    deadline: '2024-03-10',
  },
  {
    id: '6',
    title: 'Human Resources Intern',
    company: 'PeopleFirst HR',
    logo: 'https://ui-avatars.com/api/?name=PF&background=dc2626&color=fff&size=64',
    location: 'Port Harcourt, Nigeria',
    type: 'On-site',
    duration: '4 months',
    stipend: '₦45,000/month',
    category: 'Human Resources',
    description: 'Learn the fundamentals of HR management including recruitment, employee relations, and performance management in a fast-paced environment.',
    requirements: ['Pursuing degree in HR, Business, or Psychology', 'Strong interpersonal skills', 'Excellent communication abilities', 'Organized and detail-oriented'],
    responsibilities: ['Assist in recruitment process', 'Maintain employee records', 'Support onboarding activities', 'Help with HR documentation'],
    postedDate: '2024-01-13',
    deadline: '2024-02-25',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Adaeze Okonkwo',
    role: 'Software Engineer',
    company: 'Google',
    image: 'https://ui-avatars.com/api/?name=AO&background=0d9488&color=fff&size=128',
    quote: 'The internship I found through this portal launched my tech career. Now I work at Google!',
  },
  {
    id: '2',
    name: 'Chidi Emenike',
    role: 'Marketing Manager',
    company: 'Flutterwave',
    image: 'https://ui-avatars.com/api/?name=CE&background=f97316&color=fff&size=128',
    quote: 'Bells University Portal connected me with amazing opportunities. Highly recommend it!',
  },
  {
    id: '3',
    name: 'Fatima Ibrahim',
    role: 'Financial Analyst',
    company: 'GTBank',
    image: 'https://ui-avatars.com/api/?name=FI&background=1e40af&color=fff&size=128',
    quote: 'Found my dream internship here. The platform made it so easy to apply and track my applications.',
  },
];

export const categories = [
  'Technology',
  'Finance',
  'Marketing',
  'Design',
  'Human Resources',
  'Engineering',
  'Legal',
  'Healthcare',
];

export const mockApplications: Application[] = [
  {
    id: '1',
    internshipId: '1',
    internshipTitle: 'Software Engineering Intern',
    company: 'TechCorp Nigeria',
    appliedDate: '2024-01-15',
    status: 'Viewed',
  },
  {
    id: '2',
    internshipId: '3',
    internshipTitle: 'Financial Analyst Intern',
    company: 'FirstBank Nigeria',
    appliedDate: '2024-01-12',
    status: 'Pending',
  },
  {
    id: '3',
    internshipId: '4',
    internshipTitle: 'UI/UX Design Intern',
    company: 'DesignLab Studios',
    appliedDate: '2024-01-10',
    status: 'Accepted',
  },
];

export const savedInternships = ['2', '5'];
