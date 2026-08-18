import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Program from '../models/Program.js';
import News from '../models/News.js';
import User from '../models/User.js';
import Document from '../models/Document.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedPrograms = [
  {
    id: 'qca-101',
    title: 'B.S. in Quantum Computing & Algorithms',
    department: 'Department of Quantum Science & Computing',
    category: 'Computer Science',
    degree: 'Undergraduate',
    duration: '4 Years (Full-Time)',
    tuition: '$48,500 / Year',
    featured: true,
    rating: '4.98',
    studentsEnrolled: 142,
    description: 'An elite undergraduate program designed to bridge traditional theoretical physics with cutting-edge algorithmic computer science. Students gain direct hands-on access to BMU’s 100-qubit superconducting quantum annealing processors starting in their sophomore year.',
    careerPathways: [
      'Quantum Algorithm Architect at Google/IBM',
      'Cryogenic Hardware Systems Engineer',
      'Quantum Cryptography & Security Specialist',
      'Principal Research Scientist in Quantum AI',
    ],
    curriculumHighlights: [
      'Quantum Error Correction & Fault-Tolerant Design',
      'Topological Quantum Computing & Majorana Fermions',
      'Superconducting Qubit Fabrication & Microwave Control',
      'Post-Quantum Cryptography & Lattice-Based Security',
      'Variational Quantum Eigensolvers (VQE) for Chemistry',
    ],
  },
  {
    id: 'aar-202',
    title: 'M.S. in Autonomous AI & Humanoid Robotics',
    department: 'School of Artificial Intelligence & Machine Learning',
    category: 'Artificial Intelligence',
    degree: 'Graduate',
    duration: '2 Years (Full-Time)',
    tuition: '$52,000 / Year',
    featured: true,
    rating: '4.99',
    studentsEnrolled: 98,
    description: 'A master’s foundry focused on embodiment intelligence—combining deep reinforcement learning, computer vision, and real-time biomechanical control to build the next generation of autonomous humanoid and industrial robotics.',
    careerPathways: [
      'Lead Robotics Engineer at Tesla/Boston Dynamics',
      'Autonomous Systems Safety Director',
      'Deep Reinforcement Learning Research Scientist',
      'Vision-Language-Action (VLA) Model Architect',
    ],
    curriculumHighlights: [
      'Multimodal Vision-Language-Action (VLA) Foundations',
      'Sim-to-Real Transfer & Domain Randomization in Isaac Gym',
      'Non-Linear Dynamics & Biomechanical Bipedal Control',
      'Neuromorphic Sensor Fusion & LiDAR Processing',
      'Ethics & Safety Constraints in Autonomous Systems',
    ],
  },
  {
    id: 'neb-303',
    title: 'Ph.D. in Neural Engineering & BCI',
    department: 'Institute of Neuroengineering & Bio-Tech',
    category: 'Bio-Tech',
    degree: 'Doctoral',
    duration: '4-5 Years (Full Funding)',
    tuition: 'Fully Funded + $45k Stipend',
    featured: false,
    rating: '4.97',
    studentsEnrolled: 45,
    description: 'Pioneering research at the intersection of neuroscience, nanofabrication, and machine learning. Doctoral candidates develop high-density intracortical electrode arrays and non-invasive neural decoding algorithms to restore motor and cognitive functions.',
    careerPathways: [
      'Principal Neuroprosthetics Architect at Neuralink/Synchron',
      'Tenured Professor of Neural Engineering',
      'Director of Clinical Neuro-Interface Trials',
      'Bio-Signal Signal Processing Chief Engineer',
    ],
    curriculumHighlights: [
      'High-Density Intracortical Microelectrode Fabrication',
      'Real-Time Spike Sorting & Neural Decoding Algorithms',
      'Biocompatible Polymers & Chronic Implant Longevity',
      'Closed-Loop Deep Brain Stimulation (DBS) for Neuroprosthetics',
      'Ethical & Legal Frameworks for Cognitive Enhancement',
    ],
  },
  {
    id: 'cws-404',
    title: 'B.S. in Cyber Warfare & Zero-Trust Architecture',
    department: 'Department of Cybersecurity & Defense',
    category: 'Cybersecurity',
    degree: 'Undergraduate',
    duration: '4 Years (Full-Time)',
    tuition: '$46,000 / Year',
    featured: true,
    rating: '4.95',
    studentsEnrolled: 210,
    description: 'Train in government-certified SCIF labs in offensive cyber warfare, vulnerability exploitation, and zero-trust infrastructure defense. Graduates are recruited directly by top national security agencies and Silicon Valley cloud infrastructure giants.',
    careerPathways: [
      'Offensive Security Principal Engineer (Red Team Lead)',
      'Cloud Zero-Trust Infrastructure Architect',
      'National Security Cyber Intelligence Analyst',
      'Kernel-Level Exploit Development Engineer',
    ],
    curriculumHighlights: [
      'Reverse Engineering & x86/ARM Assembly Exploitation',
      'Zero-Trust Network Architecture & Cryptographic Enclaves',
      'Automated Malware Analysis & Sandbox Evasion',
      'SCADA & Industrial Control Systems (ICS) Cyber Defense',
      'Post-Quantum Cryptographic Migration Protocols',
    ],
  },
  {
    id: 'cbe-505',
    title: 'M.S. in Computational Bioengineering & Genomics',
    department: 'School of Biological Engineering & Bioinformatics',
    category: 'Bio-Tech',
    degree: 'Graduate',
    duration: '2 Years (Full-Time)',
    tuition: '$49,500 / Year',
    featured: false,
    rating: '4.93',
    studentsEnrolled: 76,
    description: 'Harness the power of AI and CRISPR gene editing to engineer synthetic organisms, discover novel oncology therapeutics, and model protein folding dynamics using supercomputing clusters.',
    careerPathways: [
      'AI Drug Discovery Lead at Moderna/Pfizer',
      'Computational Genomics & CRISPR Architect',
      'Protein Engineering Research Scientist',
      'Bioinformatics Pipeline Director',
    ],
    curriculumHighlights: [
      'AI-Driven Protein Structure Prediction (AlphaFold & Rosetta)',
      'CRISPR-Cas9 Off-Target Prediction & Epigenetic Editing',
      'Single-Cell RNA Sequencing & Multi-Omics Integration',
      'Synthetic Biology & Metabolic Pathway Engineering',
      'High-Throughput Drug Screening via Quantum Simulation',
    ],
  },
  {
    id: 'svf-606',
    title: 'B.S. in Silicon Valley Financial Technology & DeFi',
    department: 'Department of Computational Finance & Economics',
    category: 'Engineering',
    degree: 'Undergraduate',
    duration: '4 Years (Full-Time)',
    tuition: '$47,000 / Year',
    featured: false,
    rating: '4.91',
    studentsEnrolled: 180,
    description: 'Merge algorithmic trading, blockchain zero-knowledge proofs, and quantitative finance. Students manage a live $5M university endowment fund using quantitative AI models they build from scratch.',
    careerPathways: [
      'Quantitative High-Frequency Trading (HFT) Strategist',
      'Zero-Knowledge Proof (ZKP) Blockchain Architect',
      'Algorithmic Risk & Derivatives Modeler',
      'FinTech Venture Capital Technical Associate',
    ],
    curriculumHighlights: [
      'Stochastic Calculus & Quantitative Derivatives Pricing',
      'Zero-Knowledge Cryptography (zk-SNARKs & zk-STARKs)',
      'Ultra-Low Latency C++ Trading Execution Systems',
      'Decentralized Automated Market Makers (AMMs) & Liquidity',
      'AI Sentiment Analysis for Global Macroeconomics',
    ],
  },
];

const seedNews = [
  {
    id: 'news-001',
    title: 'BMU Quantum Lab Achieves 99.9% Superconducting Qubit Fidelity',
    category: 'Research Breakthrough',
    date: 'July 05, 2026',
    author: 'Dr. Evelyn Vance (Chair of Quantum Science)',
    readTime: '5 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    summary: 'In a historic milestone for fault-tolerant quantum computing, BMU researchers have demonstrated 99.9% two-qubit gate fidelity using novel topological braiding techniques.',
    content: `BMU University’s Department of Quantum Science and Computing has officially recorded a historic breakthrough in quantum error correction. By implementing a proprietary topological braiding algorithm on our 100-qubit superconducting processor, the research team achieved an unprecedented 99.9% two-qubit gate fidelity.`,
    tags: ['Quantum Computing', 'Superconducting Qubits', 'Silicon Valley Lab', 'Physics'],
  },
  {
    id: 'news-002',
    title: 'BMU Forms $100M AI Supercomputing Alliance with NVIDIA & Google',
    category: 'Industry Partnership',
    date: 'June 28, 2026',
    author: 'Office of Executive Partnerships',
    readTime: '4 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    summary: 'A new joint venture will expand BMU’s on-campus neural network training cluster to over 25,000 next-generation H200 Tensor Core GPUs.',
    content: `BMU University has finalized a landmark $100 million infrastructure agreement with Silicon Valley technology giants NVIDIA and Google DeepMind. The initiative will establish the "BMU-Silicon Valley AI Supercomputing Foundry," doubling the university's computational power to over 200 PFLOPS.`,
    tags: ['Artificial Intelligence', 'Supercomputing', 'NVIDIA', 'DeepMind', 'Partnership'],
  },
];

const seedUsers = [
  {
    name: 'Dr. Alan Vance (Super Admin)',
    email: 'admin@bmu.edu',
    password: 'BmuWebsite2026#',
    role: 'admin',
    department: 'BMU AI & SCIF Foundry Management',
  },
  {
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@bmu.edu',
    password: 'QuantumKey2026',
    role: 'faculty',
    department: 'Faculty of Computing & Cyber Defense',
  },
];

const seedDocuments = [
  {
    title: 'Presidential Merit Scholarship & Quantum Fellowship Guidelines (2026)',
    category: 'Scholarship Announcement',
    description: 'Full tuition waiver criteria, SCIF lab quotas, and monthly research stipend application process.',
    fileUrl: '/uploads/bmu-merit-guidelines-2026.pdf',
    fileName: 'bmu-merit-guidelines-2026.pdf',
    fileSize: '3.1 MB',
    fileType: 'application/pdf',
    uploadedBy: 'Office of the University President',
    downloads: 1420,
  },
  {
    title: 'SCIF Enclave & Quantum Foundry Security Protocol Whitepaper',
    category: 'Research Whitepaper',
    description: 'Technical architecture of the BMU air-gapped cryptographic research network and red-team auditing rules.',
    fileUrl: '/uploads/scif-security-whitepaper.pdf',
    fileName: 'scif-security-whitepaper.pdf',
    fileSize: '4.8 MB',
    fileType: 'application/pdf',
    uploadedBy: 'Faculty of Computing & Defense Systems',
    downloads: 980,
  },
  {
    title: 'International Student Exchange & Dual-Degree Articulation Charter',
    category: 'Exchange Report',
    description: 'Bilateral transfer guidelines and shared credits across True VISIONS, Google Garage, and Yulin University.',
    fileUrl: '/uploads/bmu-international-exchange-report.pdf',
    fileName: 'bmu-international-exchange-report.pdf',
    fileSize: '2.5 MB',
    fileType: 'application/pdf',
    uploadedBy: 'BMU Global Relations Directorate',
    downloads: 650,
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Program.deleteMany();
    await News.deleteMany();
    await User.deleteMany();
    await Document.deleteMany();

    await Program.insertMany(seedPrograms);
    await News.insertMany(seedNews);
    await User.insertMany(seedUsers);
    await Document.insertMany(seedDocuments);

    console.log('✅ [Database Seeding Successful]: Programs, News, Users, and Documents imported into MongoDB Atlas (BmuWeb).');
    process.exit();
  } catch (error) {
    console.error(`❌ [Database Seeding Error]: ${error.message}`);
    process.exit(1);
  }
};

importData();
