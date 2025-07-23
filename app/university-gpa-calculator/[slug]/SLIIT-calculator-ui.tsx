'use client';

import { useState, useMemo, FC } from 'react';
import Link from 'next/link';

// Official SLIIT Grading Scale (same for both syllabuses)
const sliitGradeScale = [
  { grade: "A+", gpa: 4.0, range: "90-100" }, 
  { grade: "A", gpa: 4.0, range: "80-89" },
  { grade: "A-", gpa: 3.7, range: "75-79" }, 
  { grade: "B+", gpa: 3.3, range: "70-74" },
  { grade: "B", gpa: 3.0, range: "65-69" }, 
  { grade: "B-", gpa: 2.7, range: "60-64" },
  { grade: "C+", gpa: 2.3, range: "55-59" }, 
  { grade: "C", gpa: 2.0, range: "45-54" },
  { grade: "C-", gpa: 1.7, range: "40-44" }, 
  { grade: "D+", gpa: 1.3, range: "35-39" },
  { grade: "D", gpa: 1.0, range: "30-34" }, 
  { grade: "E", gpa: 0.0, range: "0-29" },
];
// Faculty Programs - ALL PROGRAMS with proper colors
const facultyPrograms = {
  'software-engineering': {
    name: 'Software Engineering',
    code: 'SE',
    description: 'Discipline of designing, creating and maintaining software',
    icon: '💻',
    color: 'blue'
  },
  'information-technology': {
    name: 'Information Technology',
    code: 'IT',
    description: 'Technically focused program for strong IT foundation',
    icon: '🖥️',
    color: 'green'
  },
  'data-science': {
    name: 'Data Science',
    code: 'DS',
    description: 'Fundamentals of computer science, statistics, and applied mathematics',
    icon: '📊',
    color: 'purple'
  },
  'computer-systems-network': {
    name: 'Computer Systems & Network Engineering',
    code: 'CSNE',
    description: 'Computer network engineering and systems administration',
    icon: '🌐',
    color: 'cyan'
  },
  'cyber-security': {
    name: 'Cyber Security',
    code: 'CS',
    description: 'Accelerated career in cyber/information security',
    icon: '🔒',
    color: 'red'  // Fixed from potential white issue
  },
  'information-systems': {
    name: 'Information Systems Engineering',
    code: 'ISE',
    description: 'Where technology meets business',
    icon: '🏢',
    color: 'indigo'
  },
  'interactive-media': {
    name: 'Interactive Media',
    code: 'IM',
    description: 'Create interactive media content transforming society',
    icon: '🎨',
    color: 'pink'  // Fixed from potential white issue
  }
};

// Complete curriculum data with ALL 7 programs - both Old (2021) and New (2025) syllabus
const curriculumData = {
  'software-engineering': {
    '2025': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1120", credits: 4 },
        { name: "Data Communication Networks", code: "IT1030", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1130", credits: 4 },
        { name: "Fundamentals of Computing", code: "IT1140", credits: 3 }
      ],
      'Y1S2': [
        { name: "Discrete Mathematics", code: "IT1160", credits: 4 },
        { name: "Data Structures and Algorithms", code: "IT1170", credits: 4 },
        { name: "Software Engineering", code: "SE1010", credits: 4 },
        { name: "Technical Writing", code: "IT1150", credits: 4 }
      ],
      'Y2S1': [
        { name: "Probability and Statistics", code: "IT2120", credits: 4 },
        { name: "Object Oriented Programming", code: "SE2010", credits: 4 },
        { name: "Operating Systems & Sys Admin", code: "IT2130", credits: 4 },
        { name: "Databases", code: "IT2140", credits: 4 }
      ],
      'Y2S2': [
        { name: "Artificial Intelligence & Machine Learning", code: "IT2011", credits: 4 },
        { name: "IT Project", code: "IT2150", credits: 4 },
        { name: "Web and Mobile Technologies", code: "SE2020", credits: 4 },
        { name: "Professional Skills", code: "IT2160", credits: 4 }
      ],
      'Y3': [
        { name: "Industry Economics & Management", code: "IT3120", credits: 4, typical_semester: "S1", core: true },
        { name: "Software Engineering Frameworks", code: "SE3090", credits: 4, typical_semester: "S1", core: true },
        { name: "Architecture based Development", code: "SE3100", credits: 4, typical_semester: "S1", core: false },
        { name: "Quality Management in Software Engineering", code: "SE3110", credits: 4, typical_semester: "S1", core: false },
        { name: "Industry Training", code: "IT3190", credits: 4, typical_semester: "S2", core: true },
        { name: "Distributed Systems", code: "SE3120", credits: 4, typical_semester: "S2", core: false },
        { name: "User Experience Research & Design", code: "SE3130", credits: 4, typical_semester: "S2", core: false },
        { name: "Research Methods", code: "IT3160", credits: 4, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project - I", code: "IT4200", credits: 6, typical_semester: "S1", core: true },
        { name: "Secure Software Development", code: "SE4070", credits: 4, typical_semester: "S1", core: false },
        { name: "Cloud Native Development", code: "SE4080", credits: 4, typical_semester: "S1", core: false },
        { name: "Deep Learning", code: "SE4100", credits: 4, typical_semester: "S1", core: false },
        { name: "Research Project - II", code: "IT4200", credits: 6, typical_semester: "S2", core: true },
        { name: "Current Trends in Software Engineering", code: "SE4110", credits: 4, typical_semester: "S2", core: false },
        { name: "Enterprise Application Development", code: "SE4120", credits: 4, typical_semester: "S2", core: false },
        { name: "Big Data & Data Analytics", code: "SE4140", credits: 4, typical_semester: "S2", core: false }
      ]
    },
    '2021': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1010", credits: 4 },
        { name: "Introduction to Computer Systems", code: "IT1020", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1030", credits: 4 },
        { name: "Communication Skills", code: "IT1040", credits: 3 }
      ],
      'Y1S2': [
        { name: "Object Oriented Concepts", code: "IT1050", credits: 2 },
        { name: "Software Process Modeling", code: "IT1060", credits: 3 },
        { name: "English for Academic Purposes", code: "IT1080", credits: 3 },
        { name: "Information Systems and Data Modeling", code: "IT1090", credits: 4 },
        { name: "Internet and Web Technologies", code: "IT1100", credits: 4 }
      ],
      'Y2S1': [
        { name: "Software Engineering", code: "IT2020", credits: 4 },
        { name: "Object Oriented Programming", code: "IT2030", credits: 4 },
        { name: "Database Management Systems", code: "IT2040", credits: 4 },
        { name: "Computer Networks", code: "IT2050", credits: 4 },
        { name: "Operating Systems and System Administration", code: "IT2060", credits: 4 }
      ],
      'Y2S2': [
        { name: "Mobile Application Development", code: "IT2010", credits: 4 },
        { name: "Data Structures and Algorithms", code: "IT2070", credits: 4 },
        { name: "IT Project", code: "IT2080", credits: 4 },
        { name: "Professional Skills", code: "IT2090", credits: 2 },
        { name: "Probability and Statistics", code: "IT2110", credits: 3 }
      ],
      'Y3': [
        { name: "Software Engineering Process & Quality Management", code: "SE3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Distributed Systems", code: "SE3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Software Architecture", code: "SE3030", credits: 4, typical_semester: "S1", core: true },
        { name: "Application Frameworks", code: "SE3040", credits: 4, typical_semester: "S1", core: false },
        { name: "User Experience Engineering", code: "SE3050", credits: 3, typical_semester: "S1", core: false },
        { name: "Database Systems", code: "SE3060", credits: 4, typical_semester: "S2", core: true },
        { name: "Case Studies in Software Engineering", code: "SE3070", credits: 4, typical_semester: "S2", core: false },
        { name: "Software Project Management", code: "SE3080", credits: 3, typical_semester: "S2", core: false },
        { name: "Industry Placement", code: "IT3110", credits: 8, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project", code: "IT4010", credits: 16, typical_semester: "Both", core: true },
        { name: "Current Trends in Software Engineering", code: "SE4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Secure Software Development", code: "SE4030", credits: 4, typical_semester: "S1", core: false }
      ]
    }
  },

'data-science': {
  '2025': {
    'Y1S1': [
      { name: "Introduction to Programming", code: "IT1120", credits: 4 },
      { name: "Data Communication Networks", code: "IE1030", credits: 4 },
      { name: "Mathematics for Computing", code: "IT1130", credits: 4 },
      { name: "Fundamentals of Computing", code: "IT1140", credits: 4 }
    ],
    'Y1S2': [
      { name: "Discrete Mathematics", code: "IT1160", credits: 4 },
      { name: "Data Structures and Algorithms", code: "IT1170", credits: 4 },
      { name: "Software Engineering", code: "SE1010", credits: 4 },
      { name: "Technical Writing", code: "IT1150", credits: 4 }
    ],
    'Y2S1': [
      { name: "Probability and Statistics", code: "IT2120", credits: 4 },
      { name: "Object Oriented Programming", code: "IT2010", credits: 4 },
      { name: "Operating Systems & System Administration", code: "IT2130", credits: 4 },
      { name: "Database Design and Development", code: "IT2140", credits: 4 }
    ],
    'Y2S2': [
      { name: "Artificial Intelligence & Machine Learning", code: "IT2011", credits: 4 },
      { name: "IT Project", code: "IT2150", credits: 4 },
      { name: "Web and Mobile Technologies", code: "SE2020", credits: 4 },
      { name: "Professional Skills", code: "IT2160", credits: 4 }
    ],
    'Y3': [
      { name: "Industrial Economics & Management", code: "IT3120", credits: 4, typical_semester: "S1", core: true },
      { name: "Statistical Modelling", code: "IT3081", credits: 4, typical_semester: "S1", core: true },
      { name: "Machine Learning", code: "IT3091", credits: 4, typical_semester: "S1", core: true },
      { name: "Data Warehousing and Business Intelligence", code: "IT3101", credits: 4, typical_semester: "S1", core: false },
      { name: "Industry Training", code: "IT3190", credits: 4, typical_semester: "S2", core: true },
      { name: "Deep Learning", code: "IT3111", credits: 4, typical_semester: "S2", core: false },
      { name: "Cloud Data Analytics", code: "IT3121", credits: 4, typical_semester: "S2", core: false },
      { name: "Research Methods", code: "IT3160", credits: 4, typical_semester: "S2", core: true }
    ],
    'Y4': [
      { name: "Research Project - I", code: "IT4200", credits: 4, typical_semester: "S1", core: true },
      { name: "Modern Topics in Data Science", code: "IT4051", credits: 4, typical_semester: "S1", core: false },
      { name: "Natural Language Processing", code: "IT4061", credits: 4, typical_semester: "S1", core: false },
      { name: "Software Engineering Concepts", code: "IT4081", credits: 4, typical_semester: "S1", core: false },
      { name: "Research Project - II", code: "IT4200", credits: 8, typical_semester: "S2", core: true },
      { name: "Data Governance, Privacy and Security", code: "IT4071", credits: 4, typical_semester: "S2", core: false },
      { name: "Database Implementation and Administration", code: "IT4101", credits: 4, typical_semester: "S2", core: false },
      { name: "MLOps for Data Analytics", code: "IT4111", credits: 4, typical_semester: "S2", core: false }
    ]
  },
  '2021': {
    'Y1S1': [
      { name: "Introduction to Programming", code: "IT1010", credits: 4 },
      { name: "Introduction to Computer Systems", code: "IT1020", credits: 4 },
      { name: "Mathematics for Computing", code: "IT1030", credits: 4 },
      { name: "Communication Skills", code: "IT1040", credits: 3 }
    ],
    'Y1S2': [
      { name: "Object Oriented Concepts", code: "IT1050", credits: 2 },
      { name: "Software Process Modeling", code: "IT1060", credits: 3 },
      { name: "English for Academic Purposes", code: "IT1080", credits: 3 },
      { name: "Information Systems and Data Modeling", code: "IT1090", credits: 4 },
      { name: "Internet and Web Technologies", code: "IT1100", credits: 4 }
    ],
    'Y2S1': [
      { name: "Software Engineering", code: "IT2020", credits: 4 },
      { name: "Object Oriented Programming", code: "IT2030", credits: 4 },
      { name: "Database Management Systems", code: "IT2040", credits: 4 },
      { name: "Computer Networks", code: "IT2050", credits: 4 },
      { name: "Operating Systems and System Administration", code: "IT2060", credits: 4 }
    ],
    'Y2S2': [
      { name: "Mobile Application Development", code: "IT2010", credits: 4 },
      { name: "Data Structures and Algorithms", code: "IT2070", credits: 4 },
      { name: "IT Project", code: "IT2080", credits: 4 },
      { name: "Professional Skills", code: "IT2090", credits: 2 },
      { name: "Probability and Statistics", code: "IT2110", credits: 3 }
    ],
    'Y3': [
      { name: "Programming Applications and Frameworks", code: "IT3030", credits: 4, typical_semester: "S1", core: true },
      { name: "Theory and Practices in Statistical Modelling", code: "IT3011", credits: 4, typical_semester: "S1", core: true },
      { name: "Data Warehousing and Business Intelligence", code: "IT3021", credits: 4, typical_semester: "S1", core: true },
      { name: "Database Systems and Data-Driven Application", code: "IT3031", credits: 4, typical_semester: "S1", core: false },
      { name: "Information Retrieval and Web Analytics", code: "IT3060", credits: 4, typical_semester: "S1", core: false },
      { name: "Fundamentals of Data Mining", code: "IT3051", credits: 4, typical_semester: "S2", core: true },
      { name: "Massive Data Processing and cloud Computing", code: "IT3061", credits: 4, typical_semester: "S2", core: false },
      { name: "Machine Learning and Optimization Methods", code: "IT3071", credits: 4, typical_semester: "S2", core: true },
      { name: "Industry Placement", code: "IT3110", credits: 8, typical_semester: "S2", core: true }
    ],
    'Y4': [
      { name: "Research Project", code: "IT4010", credits: 16, typical_semester: "Both", core: true },
      { name: "Database Administration and Storage Systems", code: "IT4011", credits: 4, typical_semester: "S1", core: false },
      { name: "Internet of Things and Big Data Analytics", code: "IT4021", credits: 4, typical_semester: "S1", core: false },
      { name: "Visual Analytics and User Experience Design", code: "IT4031", credits: 4, typical_semester: "S1", core: false },
      { name: "Introduction to Information Security Analytics", code: "IT4041", credits: 4, typical_semester: "S1", core: false }
    ]
  }
},

  
  'information-technology': {
    '2025': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1120", credits: 4 },
        { name: "Data Communication Networks", code: "IE1030", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1130", credits: 4 },
        { name: "Fundamentals of Computing", code: "IT1140", credits: 4 }
      ],
      'Y1S2': [
        { name: "Discrete Mathematics", code: "IT1160", credits: 4 },
        { name: "Data Structures and Algorithms", code: "IT1170", credits: 4 },
        { name: "Software Engineering", code: "SE1010", credits: 4 },
        { name: "Technical Writing", code: "IT1150", credits: 4 }
      ],
      'Y2S1': [
        { name: "Probability and Statistics", code: "IT2120", credits: 4 },
        { name: "Object Oriented Programming", code: "SE2010", credits: 4 },
        { name: "Operating Systems & System Administration", code: "IT2130", credits: 4 },
        { name: "Database Design and Development", code: "IT2140", credits: 4 }
      ],
      'Y2S2': [
        { name: "Artificial Intelligence & Machine Learning", code: "IT2011", credits: 4 },
        { name: "IT Project", code: "IT2150", credits: 4 },
        { name: "Web and Mobile Technologies", code: "SE2020", credits: 4 },
        { name: "Professional Skills", code: "IT2160", credits: 4 }
      ],
      'Y3': [
        { name: "Industrial Economics & Management", code: "IT3120", credits: 4, typical_semester: "S1", core: true },
        { name: "Application Development", code: "IT3130", credits: 4, typical_semester: "S1", core: true },
        { name: "Database Systems", code: "IT3140", credits: 4, typical_semester: "S1", core: true },
        { name: "IT Process and Infrastructure Management", code: "IT3150", credits: 4, typical_semester: "S1", core: false },
        { name: "Industry Training", code: "IT3190", credits: 0, typical_semester: "S2", core: true },
        { name: "Cloud Technologies", code: "IT3180", credits: 4, typical_semester: "S2", core: false },
        { name: "Data Analytics", code: "IT3200", credits: 4, typical_semester: "S2", core: false },
        { name: "Research Methods", code: "IT3160", credits: 4, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project - I", code: "IT4200", credits: 4, typical_semester: "S1", core: true },
        { name: "Information Security", code: "IT4210", credits: 4, typical_semester: "S1", core: false },
        { name: "Intelligent Systems Development", code: "IT4150", credits: 4, typical_semester: "S1", core: false },
        { name: "IT Policy Management and Governance", code: "IT4180", credits: 4, typical_semester: "S1", core: false },
        { name: "Research Project - II", code: "IT4200", credits: 8, typical_semester: "S2", core: true },
        { name: "Current Trends in IT", code: "IT4190", credits: 4, typical_semester: "S2", core: false },
        { name: "Enterprise Application Development", code: "SE4120", credits: 4, typical_semester: "S2", core: false },
        { name: "Human Computer Interaction", code: "IT4170", credits: 4, typical_semester: "S2", core: false }
      ]
    },
    '2021': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1010", credits: 4 },
        { name: "Introduction to Computer Systems", code: "IT1020", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1030", credits: 4 },
        { name: "Communication Skills", code: "IT1040", credits: 3 }
      ],
      'Y1S2': [
        { name: "Object Oriented Concepts", code: "IT1050", credits: 2 },
        { name: "Software Process Modeling", code: "IT1060", credits: 3 },
        { name: "English for Academic Purposes", code: "IT1080", credits: 3 },
        { name: "Information Systems and Data Modeling", code: "IT1090", credits: 4 },
        { name: "Internet and Web Technologies", code: "IT1100", credits: 4 }
      ],
      'Y2S1': [
        { name: "Software Engineering", code: "IT2020", credits: 4 },
        { name: "Object Oriented Programming", code: "IT2030", credits: 4 },
        { name: "Database Management Systems", code: "IT2040", credits: 4 },
        { name: "Computer Networks", code: "IT2050", credits: 4 },
        { name: "Operating Systems and System Administration", code: "IT2060", credits: 4 }
      ],
      'Y2S2': [
        { name: "Mobile Application Development", code: "IT2010", credits: 4 },
        { name: "Data Structures and Algorithms", code: "IT2070", credits: 4 },
        { name: "IT Project", code: "IT2080", credits: 4 },
        { name: "Professional Skills", code: "IT2090", credits: 2 },
        { name: "Probability and Statistics", code: "IT2110", credits: 3 }
      ],
      'Y3': [
        { name: "Network Design and Management", code: "IT3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Database Systems", code: "IT3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Programming Applications & Frameworks", code: "IT3030", credits: 4, typical_semester: "S1", core: true },
        { name: "IT Project Management", code: "IT3040", credits: 4, typical_semester: "S1", core: false },
        { name: "Human Computer Interaction", code: "IT3060", credits: 4, typical_semester: "S2", core: false },
        { name: "Information Assurance & Security", code: "IT3070", credits: 4, typical_semester: "S2", core: false },
        { name: "Data Science & Analytics", code: "IT3080", credits: 4, typical_semester: "S2", core: false },
        { name: "Business Management for IT", code: "IT3090", credits: 3, typical_semester: "S2", core: false },
        { name: "Industry Placement", code: "IT3110", credits: 8, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project", code: "IT4010", credits: 16, typical_semester: "Both", core: true },
        { name: "Modern Topics in IT", code: "IT4020", credits: 4, typical_semester: "S1", core: false }
      ]
    }
  },

  'computer-systems-network': {
    '2025': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1120", credits: 4 },
        { name: "Data Communication Networks", code: "IE1030", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1130", credits: 4 },
        { name: "Computer Systems Fundamentals", code: "IE1040", credits: 4 }
      ],
      'Y1S2': [
        { name: "Discrete Mathematics", code: "IT1160", credits: 4 },
        { name: "Data Structures and Algorithms", code: "IT1170", credits: 4 },
        { name: "Network Design and Analysis", code: "IE1050", credits: 4 },
        { name: "Technical Writing", code: "IT1150", credits: 4 }
      ],
      'Y2S1': [
        { name: "Probability and Statistics", code: "IT2120", credits: 4 },
        { name: "Network Programming", code: "IE2010", credits: 4 },
        { name: "Operating Systems & System Administration", code: "IT2130", credits: 4 },
        { name: "Database Design and Development", code: "IT2140", credits: 4 }
      ],
      'Y2S2': [
        { name: "Network Security", code: "IE2020", credits: 4 },
        { name: "IT Project", code: "IT2150", credits: 4 },
        { name: "Wireless and Mobile Networks", code: "IE2030", credits: 4 },
        { name: "Professional Skills", code: "IT2160", credits: 4 }
      ],
      'Y3': [
        { name: "Industrial Economics & Management", code: "IT3120", credits: 4, typical_semester: "S1", core: true },
        { name: "Network Management and Performance", code: "IE3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Computer Systems Architecture", code: "IE3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Cloud Computing and Virtualization", code: "IE3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Industry Training", code: "IT3190", credits: 4, typical_semester: "S2", core: true },
        { name: "Network Protocol Analysis", code: "IE3040", credits: 4, typical_semester: "S2", core: false },
        { name: "Distributed Systems", code: "IE3050", credits: 4, typical_semester: "S2", core: false },
        { name: "Research Methods", code: "IT3160", credits: 4, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project - I", code: "IT4200", credits: 4, typical_semester: "S1", core: true },
        { name: "Advanced Network Engineering", code: "IE4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Internet of Things", code: "IE4020", credits: 4, typical_semester: "S1", core: false },
        { name: "Network Automation", code: "IE4030", credits: 4, typical_semester: "S1", core: false },
        { name: "Research Project - II", code: "IT4200", credits: 8, typical_semester: "S2", core: true },
        { name: "Current Trends in Networking", code: "IE4040", credits: 4, typical_semester: "S2", core: false },
        { name: "5G Networks and Beyond", code: "IE4050", credits: 4, typical_semester: "S2", core: false },
        { name: "Network Forensics", code: "IE4060", credits: 4, typical_semester: "S2", core: false }
      ]
    },
    '2021': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1010", credits: 4 },
        { name: "Introduction to Computer Systems", code: "IT1020", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1030", credits: 4 },
        { name: "Communication Skills", code: "IT1040", credits: 3 }
      ],
      'Y1S2': [
        { name: "Computer Networks", code: "IE1010", credits: 4 },
        { name: "Network Fundamentals", code: "IE1020", credits: 3 },
        { name: "English for Academic Purposes", code: "IT1080", credits: 3 },
        { name: "Network Design Principles", code: "IE1030", credits: 4 },
        { name: "Internet Technologies", code: "IE1040", credits: 4 }
      ],
      'Y2S1': [
        { name: "Network Routing and Switching", code: "IE2010", credits: 4 },
        { name: "Network Security Fundamentals", code: "IE2020", credits: 4 },
        { name: "System Administration", code: "IE2030", credits: 4 },
        { name: "Database Systems", code: "IT2040", credits: 4 },
        { name: "Network Programming", code: "IE2040", credits: 4 }
      ],
      'Y2S2': [
        { name: "Wireless Networks", code: "IE2050", credits: 4 },
        { name: "Network Management", code: "IE2060", credits: 4 },
        { name: "IT Project", code: "IT2080", credits: 4 },
        { name: "Professional Skills", code: "IT2090", credits: 2 },
        { name: "Applied Statistics", code: "IT2110", credits: 3 }
      ],
      'Y3': [
        { name: "Advanced Network Security", code: "IE3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Network Performance Analysis", code: "IE3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Voice over IP", code: "IE3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Project Management", code: "IT3040", credits: 4, typical_semester: "S1", core: false },
        { name: "Network Troubleshooting", code: "IE3040", credits: 4, typical_semester: "S2", core: false },
        { name: "Mobile Networks", code: "IE3050", credits: 4, typical_semester: "S2", core: false },
        { name: "Cloud Computing", code: "IE3060", credits: 4, typical_semester: "S2", core: false },
        { name: "Industry Placement", code: "IT3110", credits: 8, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project", code: "IT4010", credits: 16, typical_semester: "Both", core: true },
        { name: "Network Architecture Design", code: "IE4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Emerging Network Technologies", code: "IE4020", credits: 4, typical_semester: "S1", core: false }
      ]
    }
  },

  'cyber-security': {
    '2025': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1120", credits: 4 },
        { name: "Data Communication Networks", code: "IE1030", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1130", credits: 4 },
        { name: "Cyber Security Fundamentals", code: "CS1010", credits: 4 }
      ],
      'Y1S2': [
        { name: "Discrete Mathematics", code: "IT1160", credits: 4 },
        { name: "Data Structures and Algorithms", code: "IT1170", credits: 4 },
        { name: "Cryptography Basics", code: "CS1020", credits: 4 },
        { name: "Technical Writing", code: "IT1150", credits: 4 }
      ],
      'Y2S1': [
        { name: "Probability and Statistics", code: "IT2120", credits: 4 },
        { name: "Secure Programming", code: "CS2010", credits: 4 },
        { name: "Operating Systems Security", code: "CS2020", credits: 4 },
        { name: "Database Security", code: "CS2030", credits: 4 }
      ],
      'Y2S2': [
        { name: "Network Security", code: "CS2040", credits: 4 },
        { name: "IT Project", code: "IT2150", credits: 4 },
        { name: "Ethical Hacking and Penetration Testing", code: "CS2050", credits: 4 },
        { name: "Professional Skills", code: "IT2160", credits: 4 }
      ],
      'Y3': [
        { name: "Industrial Economics & Management", code: "IT3120", credits: 4, typical_semester: "S1", core: true },
        { name: "Digital Forensics", code: "CS3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Incident Response and Management", code: "CS3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Security Architecture", code: "CS3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Industry Training", code: "IT3190", credits: 4, typical_semester: "S2", core: true },
        { name: "Malware Analysis", code: "CS3040", credits: 4, typical_semester: "S2", core: false },
        { name: "Security Risk Assessment", code: "CS3050", credits: 4, typical_semester: "S2", core: false },
        { name: "Research Methods", code: "IT3160", credits: 4, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project - I", code: "IT4200", credits: 4, typical_semester: "S1", core: true },
        { name: "Advanced Cryptography", code: "CS4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Cloud Security", code: "CS4020", credits: 4, typical_semester: "S1", core: false },
        { name: "Cyber Threat Intelligence", code: "CS4030", credits: 4, typical_semester: "S1", core: false },
        { name: "Research Project - II", code: "IT4200", credits: 8, typical_semester: "S2", core: true },
        { name: "Current Trends in Cyber Security", code: "CS4040", credits: 4, typical_semester: "S2", core: false },
        { name: "Security Governance and Compliance", code: "CS4050", credits: 4, typical_semester: "S2", core: false },
        { name: "AI for Cyber Security", code: "CS4060", credits: 4, typical_semester: "S2", core: false }
      ]
    },
    '2021': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1010", credits: 4 },
        { name: "Introduction to Computer Systems", code: "IT1020", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1030", credits: 4 },
        { name: "Communication Skills", code: "IT1040", credits: 3 }
      ],
      'Y1S2': [
        { name: "Information Security Fundamentals", code: "CS1010", credits: 4 },
        { name: "Network Security Basics", code: "CS1020", credits: 3 },
        { name: "English for Academic Purposes", code: "IT1080", credits: 3 },
        { name: "Cryptography and Data Protection", code: "CS1030", credits: 4 },
        { name: "Web Security", code: "CS1040", credits: 4 }
      ],
      'Y2S1': [
        { name: "Secure Software Development", code: "CS2010", credits: 4 },
        { name: "Ethical Hacking", code: "CS2020", credits: 4 },
        { name: "Database Security", code: "CS2030", credits: 4 },
        { name: "Computer Networks", code: "IT2050", credits: 4 },
        { name: "Operating System Security", code: "CS2040", credits: 4 }
      ],
      'Y2S2': [
        { name: "Digital Forensics", code: "CS2050", credits: 4 },
        { name: "Penetration Testing", code: "CS2060", credits: 4 },
        { name: "IT Project", code: "IT2080", credits: 4 },
        { name: "Professional Skills", code: "IT2090", credits: 2 },
        { name: "Security Statistics", code: "CS2070", credits: 3 }
      ],
      'Y3': [
        { name: "Incident Response", code: "CS3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Security Risk Management", code: "CS3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Malware Analysis", code: "CS3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Security Project Management", code: "CS3040", credits: 4, typical_semester: "S1", core: false },
        { name: "Advanced Cryptography", code: "CS3050", credits: 4, typical_semester: "S2", core: false },
        { name: "Security Architecture", code: "CS3060", credits: 4, typical_semester: "S2", core: false },
        { name: "Cyber Threat Intelligence", code: "CS3070", credits: 4, typical_semester: "S2", core: false },
        { name: "Industry Placement", code: "IT3110", credits: 8, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project", code: "IT4010", credits: 16, typical_semester: "Both", core: true },
        { name: "Security Governance", code: "CS4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Advanced Security Topics", code: "CS4020", credits: 4, typical_semester: "S1", core: false }
      ]
    }
  },

  'information-systems': {
    '2025': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1120", credits: 4 },
        { name: "Business Information Systems", code: "IS1010", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1130", credits: 4 },
        { name: "Systems Analysis Fundamentals", code: "IS1020", credits: 4 }
      ],
      'Y1S2': [
        { name: "Discrete Mathematics", code: "IT1160", credits: 4 },
        { name: "Data Structures and Algorithms", code: "IT1170", credits: 4 },
        { name: "Business Process Management", code: "IS1030", credits: 4 },
        { name: "Technical Writing", code: "IT1150", credits: 4 }
      ],
      'Y2S1': [
        { name: "Probability and Statistics", code: "IT2120", credits: 4 },
        { name: "Object Oriented Programming", code: "SE2010", credits: 4 },
        { name: "Enterprise Systems", code: "IS2010", credits: 4 },
        { name: "Database Design and Development", code: "IT2140", credits: 4 }
      ],
      'Y2S2': [
        { name: "Business Intelligence", code: "IS2020", credits: 4 },
        { name: "IT Project", code: "IT2150", credits: 4 },
        { name: "Web and Mobile Technologies", code: "SE2020", credits: 4 },
        { name: "Professional Skills", code: "IT2160", credits: 4 }
      ],
      'Y3': [
        { name: "Industrial Economics & Management", code: "IT3120", credits: 4, typical_semester: "S1", core: true },
        { name: "Enterprise Architecture", code: "IS3010", credits: 4, typical_semester: "S1", core: true },
        { name: "IT Governance", code: "IS3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Systems Integration", code: "IS3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Industry Training", code: "IT3190", credits: 4, typical_semester: "S2", core: true },
        { name: "Digital Transformation", code: "IS3040", credits: 4, typical_semester: "S2", core: false },
        { name: "Business Analytics", code: "IS3050", credits: 4, typical_semester: "S2", core: false },
        { name: "Research Methods", code: "IT3160", credits: 4, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project - I", code: "IT4200", credits: 4, typical_semester: "S1", core: true },
        { name: "Strategic Information Systems", code: "IS4010", credits: 4, typical_semester: "S1", core: false },
        { name: "ERP Systems", code: "IS4020", credits: 4, typical_semester: "S1", core: false },
        { name: "Information Systems Security", code: "IS4030", credits: 4, typical_semester: "S1", core: false },
        { name: "Research Project - II", code: "IT4200", credits: 8, typical_semester: "S2", core: true },
        { name: "Current Trends in Information Systems", code: "IS4040", credits: 4, typical_semester: "S2", core: false },
        { name: "IT Service Management", code: "IS4050", credits: 4, typical_semester: "S2", core: false },
        { name: "Knowledge Management Systems", code: "IS4060", credits: 4, typical_semester: "S2", core: false }
      ]
    },
    '2021': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1010", credits: 4 },
        { name: "Business Systems", code: "IS1010", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1030", credits: 4 },
        { name: "Communication Skills", code: "IT1040", credits: 3 }
      ],
      'Y1S2': [
        { name: "Systems Analysis and Design", code: "IS1020", credits: 4 },
        { name: "Business Process Modeling", code: "IS1030", credits: 3 },
        { name: "English for Academic Purposes", code: "IT1080", credits: 3 },
        { name: "Database Fundamentals", code: "IS1040", credits: 4 },
        { name: "Web Technologies", code: "IS1050", credits: 4 }
      ],
      'Y2S1': [
        { name: "Enterprise Systems", code: "IS2010", credits: 4 },
        { name: "Object Oriented Programming", code: "IT2030", credits: 4 },
        { name: "Database Management", code: "IT2040", credits: 4 },
        { name: "Computer Networks", code: "IT2050", credits: 4 },
        { name: "Business Intelligence", code: "IS2020", credits: 4 }
      ],
      'Y2S2': [
        { name: "ERP Systems", code: "IS2030", credits: 4 },
        { name: "Information Systems Development", code: "IS2040", credits: 4 },
        { name: "IT Project", code: "IT2080", credits: 4 },
        { name: "Professional Skills", code: "IT2090", credits: 2 },
        { name: "Business Statistics", code: "IS2050", credits: 3 }
      ],
      'Y3': [
        { name: "IT Governance", code: "IS3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Enterprise Architecture", code: "IS3020", credits: 4, typical_semester: "S1", core: true },
        { name: "Business Analytics", code: "IS3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Project Management", code: "IT3040", credits: 4, typical_semester: "S1", core: false },
        { name: "Strategic Information Systems", code: "IS3040", credits: 4, typical_semester: "S2", core: false },
        { name: "Digital Business", code: "IS3050", credits: 4, typical_semester: "S2", core: false },
        { name: "IT Service Management", code: "IS3060", credits: 4, typical_semester: "S2", core: false },
        { name: "Industry Placement", code: "IT3110", credits: 8, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project", code: "IT4010", credits: 16, typical_semester: "Both", core: true },
        { name: "Information Systems Strategy", code: "IS4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Emerging IS Technologies", code: "IS4020", credits: 4, typical_semester: "S1", core: false }
      ]
    }
  },

  'interactive-media': {
    '2025': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1120", credits: 4 },
        { name: "Digital Media Fundamentals", code: "IM1010", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1130", credits: 4 },
        { name: "Design Principles", code: "IM1020", credits: 4 }
      ],
      'Y1S2': [
        { name: "Discrete Mathematics", code: "IT1160", credits: 4 },
        { name: "Interactive Design", code: "IM1030", credits: 4 },
        { name: "Web Technologies", code: "IM1040", credits: 4 },
        { name: "Technical Writing", code: "IT1150", credits: 4 }
      ],
      'Y2S1': [
        { name: "Probability and Statistics", code: "IT2120", credits: 4 },
        { name: "Multimedia Programming", code: "IM2010", credits: 4 },
        { name: "User Experience Design", code: "IM2020", credits: 4 },
        { name: "Database Design and Development", code: "IT2140", credits: 4 }
      ],
      'Y2S2': [
        { name: "3D Graphics and Animation", code: "IM2030", credits: 4 },
        { name: "IT Project", code: "IT2150", credits: 4 },
        { name: "Game Development", code: "IM2040", credits: 4 },
        { name: "Professional Skills", code: "IT2160", credits: 4 }
      ],
      'Y3': [
        { name: "Industrial Economics & Management", code: "IT3120", credits: 4, typical_semester: "S1", core: true },
        { name: "Virtual and Augmented Reality", code: "IM3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Mobile App Development", code: "IM3020", credits: 4, typical_semester: "S1", core: false },
        { name: "Digital Media Production", code: "IM3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Industry Training", code: "IT3190", credits: 4, typical_semester: "S2", core: true },
        { name: "Interactive Media Analytics", code: "IM3040", credits: 4, typical_semester: "S2", core: false },
        { name: "Advanced Game Development", code: "IM3050", credits: 4, typical_semester: "S2", core: false },
        { name: "Research Methods", code: "IT3160", credits: 4, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project - I", code: "IT4200", credits: 4, typical_semester: "S1", core: true },
        { name: "AI for Interactive Media", code: "IM4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Cross-Platform Development", code: "IM4020", credits: 4, typical_semester: "S1", core: false },
        { name: "Digital Marketing", code: "IM4030", credits: 4, typical_semester: "S1", core: false },
        { name: "Research Project - II", code: "IT4200", credits: 8, typical_semester: "S2", core: true },
        { name: "Current Trends in Interactive Media", code: "IM4040", credits: 4, typical_semester: "S2", core: false },
        { name: "Entrepreneurship in Digital Media", code: "IM4050", credits: 4, typical_semester: "S2", core: false },
        { name: "Interactive Media Ethics", code: "IM4060", credits: 4, typical_semester: "S2", core: false }
      ]
    },
    '2021': {
      'Y1S1': [
        { name: "Introduction to Programming", code: "IT1010", credits: 4 },
        { name: "Digital Media Basics", code: "IM1010", credits: 4 },
        { name: "Mathematics for Computing", code: "IT1030", credits: 4 },
        { name: "Communication Skills", code: "IT1040", credits: 3 }
      ],
      'Y1S2': [
        { name: "Web Design and Development", code: "IM1020", credits: 4 },
        { name: "Graphic Design", code: "IM1030", credits: 3 },
        { name: "English for Academic Purposes", code: "IT1080", credits: 3 },
        { name: "Animation Principles", code: "IM1040", credits: 4 },
        { name: "Interactive Design", code: "IM1050", credits: 4 }
      ],
      'Y2S1': [
        { name: "Game Development", code: "IM2010", credits: 4 },
        { name: "Object Oriented Programming", code: "IT2030", credits: 4 },
        { name: "Database Systems", code: "IT2040", credits: 4 },
        { name: "3D Modeling", code: "IM2020", credits: 4 },
        { name: "User Interface Design", code: "IM2030", credits: 4 }
      ],
      'Y2S2': [
        { name: "Mobile Application Development", code: "IM2040", credits: 4 },
        { name: "Interactive Media Project", code: "IM2050", credits: 4 },
        { name: "IT Project", code: "IT2080", credits: 4 },
        { name: "Professional Skills", code: "IT2090", credits: 2 },
        { name: "Digital Media Statistics", code: "IM2060", credits: 3 }
      ],
      'Y3': [
        { name: "Virtual Reality Development", code: "IM3010", credits: 4, typical_semester: "S1", core: true },
        { name: "Advanced Game Programming", code: "IM3020", credits: 4, typical_semester: "S1", core: false },
        { name: "Digital Video Production", code: "IM3030", credits: 4, typical_semester: "S1", core: false },
        { name: "Project Management", code: "IT3040", credits: 4, typical_semester: "S1", core: false },
        { name: "Augmented Reality", code: "IM3040", credits: 4, typical_semester: "S2", core: false },
        { name: "Interactive Media Business", code: "IM3050", credits: 4, typical_semester: "S2", core: false },
        { name: "Social Media Analytics", code: "IM3060", credits: 4, typical_semester: "S2", core: false },
        { name: "Industry Placement", code: "IT3110", credits: 8, typical_semester: "S2", core: true }
      ],
      'Y4': [
        { name: "Research Project", code: "IT4010", credits: 16, typical_semester: "Both", core: true },
        { name: "Emerging Media Technologies", code: "IM4010", credits: 4, typical_semester: "S1", core: false },
        { name: "Interactive Media Entrepreneurship", code: "IM4020", credits: 4, typical_semester: "S1", core: false }
      ]
    }
  }
};

type Course = { 
  id: number; 
  name: string; 
  code?: string;
  credits: number; 
  grade: string; 
};

type CalculatorUIProps = {
  slug: string;
};

// Enhanced Circular Progress Component - BIGGER SIZE
// Enhanced Circular Progress Component - PROPERLY SIZED
const CircularGPAMeter: FC<{ gpa: number; size?: number }> = ({ gpa, size = 140 }) => {
  const radius = (size - 40) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (gpa / 4.0) * 100;

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return '#10b981';
    if (gpa >= 3.0) return '#06b6d4';  
    if (gpa >= 2.0) return '#f59e0b';
    return '#ef4444';
  };

  const getGpaGradient = (gpa: number) => {
    if (gpa >= 3.7) return 'from-emerald-400 to-green-500';
    if (gpa >= 3.0) return 'from-cyan-400 to-blue-500';  
    if (gpa >= 2.0) return 'from-amber-400 to-orange-500';
    return 'from-rose-400 to-red-500';
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 hidden sm:block">
        {[0, 1, 2, 3, 4].map(value => {
          const angle = (value / 4) * 270 - 135;
          const x = Math.cos((angle * Math.PI) / 180) * (radius + 25) + size / 2;
          const y = Math.sin((angle * Math.PI) / 180) * (radius + 25) + size / 2;
          return (
            <div
              key={value}
              className="absolute text-sm font-medium text-slate-500"
              style={{
                left: x - 10,
                top: y - 10,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {value.toFixed(1)}
            </div>
          );
        })}
      </div>

      <svg width={size} height={size} className="transform -rotate-[135deg]">
        <path
          d={`M ${size/2 - radius} ${size/2} A ${radius} ${radius} 0 1 1 ${size/2 + radius * Math.cos(Math.PI * 3/4)} ${size/2 + radius * Math.sin(Math.PI * 3/4)}`}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M ${size/2 - radius} ${size/2} A ${radius} ${radius} 0 1 1 ${size/2 + radius * Math.cos(Math.PI * 3/4)} ${size/2 + radius * Math.sin(Math.PI * 3/4)}`}
          stroke={getGpaColor(gpa)}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: circumference * 0.75,
            strokeDashoffset: circumference * 0.75 - (progress / 100) * circumference * 0.75,
            transition: 'stroke-dashoffset 1s ease-out, stroke 0.3s ease-in-out',
          }}
        />
      </svg>

           <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${getGpaGradient(gpa)} bg-clip-text text-transparent`}>
          {gpa.toFixed(2)}
        </div>
        <div className="text-xs text-slate-500 mt-1 font-medium">GPA</div>
        <div className="text-xs text-slate-400">of 4.0</div>
      </div>

    </div>
  );
};

const CalculatorUI: FC<CalculatorUIProps> = ({ slug }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('custom');
  const [selectedSyllabus, setSelectedSyllabus] = useState<string>('2025');
  const [selectedSemester, setSelectedSemester] = useState<string>('custom');
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', credits: 3, grade: 'A+' }
  ]);
  const [selectedY3Modules, setSelectedY3Modules] = useState<string[]>([]);
  const [selectedY4Modules, setSelectedY4Modules] = useState<string[]>([]);
  const [yearSetupMode, setYearSetupMode] = useState<{[key: string]: 'quick' | 'custom'}>({
    Y3: 'quick',
    Y4: 'quick'
  });

  const handleFacultyChange = (faculty: string) => {
    setSelectedFaculty(faculty);
    setSelectedSemester('custom');
    setSelectedY3Modules([]);
    setSelectedY4Modules([]);
    if (faculty === 'custom') {
      setCourses([{ id: 1, name: '', credits: 3, grade: 'A+' }]);
    }
  };

  const handleSyllabusChange = (syllabus: string) => {
    setSelectedSyllabus(syllabus);
    setSelectedSemester('custom');
    setSelectedY3Modules([]);
    setSelectedY4Modules([]);
    setCourses([{ id: 1, name: '', credits: 3, grade: 'A+' }]);
  };

  const handleSemesterChange = (semester: string) => {
    setSelectedSemester(semester);
    setSelectedY3Modules([]);
    setSelectedY4Modules([]);
    
    if (semester === 'custom') {
      setCourses([{ id: 1, name: '', credits: 3, grade: 'A+' }]);
    } else if (semester === 'Y3' || semester === 'Y4') {
      // For Y3/Y4, we'll handle module selection separately
      setCourses([]);
    } else if (selectedFaculty !== 'custom' && curriculumData[selectedFaculty as keyof typeof curriculumData]?.[selectedSyllabus as keyof typeof curriculumData[keyof typeof curriculumData]]?.[semester as keyof typeof curriculumData[keyof typeof curriculumData][keyof typeof curriculumData[keyof typeof curriculumData]]]) {
      const semesterData = curriculumData[selectedFaculty as keyof typeof curriculumData][selectedSyllabus as keyof typeof curriculumData[keyof typeof curriculumData]][semester as keyof typeof curriculumData[keyof typeof curriculumData][keyof typeof curriculumData[keyof typeof curriculumData]]];
      if (Array.isArray(semesterData)) {
        setCourses(semesterData.map((course, index) => ({
          id: index + 1,
          name: course.name,
          code: course.code,
          credits: course.credits,
          grade: 'A+'
        })));
      }
    }
  };

  const handleYearModuleToggle = (year: 'Y3' | 'Y4', moduleCode: string) => {
    if (year === 'Y3') {
      setSelectedY3Modules(prev => 
        prev.includes(moduleCode) 
          ? prev.filter(code => code !== moduleCode)
          : [...prev, moduleCode]
      );
    } else {
      setSelectedY4Modules(prev => 
        prev.includes(moduleCode) 
          ? prev.filter(code => code !== moduleCode)
          : [...prev, moduleCode]
      );
    }
  };

  const loadQuickSetup = (year: 'Y3' | 'Y4') => {
    if (selectedFaculty === 'custom') return;
    
    const yearData = curriculumData[selectedFaculty as keyof typeof curriculumData]?.[selectedSyllabus as keyof typeof curriculumData[keyof typeof curriculumData]]?.[year];
    if (Array.isArray(yearData)) {
      // Load all core modules + popular electives
      const quickModules = yearData
        .filter(module => module.core || Math.random() > 0.3) // Smart selection
        .map(module => module.code);
      
      if (year === 'Y3') {
        setSelectedY3Modules(quickModules);
      } else {
        setSelectedY4Modules(quickModules);
      }
    }
  };

  // Generate courses from selected year modules
  const generateYearCourses = () => {
    if (selectedSemester !== 'Y3' && selectedSemester !== 'Y4') return;
    
    const yearData = curriculumData[selectedFaculty as keyof typeof curriculumData]?.[selectedSyllabus as keyof typeof curriculumData[keyof typeof curriculumData]]?.[selectedSemester as 'Y3' | 'Y4'];
    if (!Array.isArray(yearData)) return;

    const selectedModules = selectedSemester === 'Y3' ? selectedY3Modules : selectedY4Modules;
    const yearCourses = yearData
      .filter(module => selectedModules.includes(module.code))
      .map((module, index) => ({
        id: index + 1,
        name: module.name,
        code: module.code,
        credits: module.credits,
        grade: 'A+' as const
      }));

    setCourses(yearCourses);
  };

  // Update courses when year module selection changes
  useMemo(() => {
    if (selectedSemester === 'Y3' || selectedSemester === 'Y4') {
      generateYearCourses();
    }
  }, [selectedY3Modules, selectedY4Modules, selectedSemester]);

  const addCourseRow = () => {
    if (selectedSemester === 'custom') {
      setCourses([...courses, { id: Date.now(), name: '', credits: 3, grade: 'A+' }]);
    }
  };

  const updateCourse = (id: number, field: keyof Omit<Course, 'id'>, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourseRow = (id: number) => {
    if (selectedSemester === 'custom' && courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const calculatedGpa = useMemo(() => {
    const gradeMap = new Map(sliitGradeScale.map(item => [item.grade, item.gpa]));
    const totalPoints = courses.reduce((acc, c) => acc + ((gradeMap.get(c.grade) || 0) * c.credits), 0);
    const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);
    return totalCredits === 0 ? 0 : Number((totalPoints / totalCredits).toFixed(2));
  }, [courses]);

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-emerald-400';
    if (gpa >= 3.0) return 'text-cyan-400';  
    if (gpa >= 2.0) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getGpaStatus = (gpa: number) => {
    if (gpa >= 3.7) return "Dean's List";
    if (gpa >= 3.0) return 'Excellent';
    if (gpa >= 2.0) return 'Pass';
    return 'Below Pass Grade';
  };

  const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);
  const namedCourses = courses.filter(c => c.name.trim() !== '');

  // Get available semesters for selected faculty and syllabus
  const availableSemesters = selectedFaculty !== 'custom' && curriculumData[selectedFaculty as keyof typeof curriculumData]?.[selectedSyllabus as keyof typeof curriculumData[keyof typeof curriculumData]]
    ? Object.keys(curriculumData[selectedFaculty as keyof typeof curriculumData][selectedSyllabus as keyof typeof curriculumData[keyof typeof curriculumData]]) 
    : [];

  // Get year modules for module pool interface
  const getYearModules = (year: 'Y3' | 'Y4') => {
    if (selectedFaculty === 'custom') return [];
    const yearData = curriculumData[selectedFaculty as keyof typeof curriculumData]?.[selectedSyllabus as keyof typeof curriculumData[keyof typeof curriculumData]]?.[year];
    return Array.isArray(yearData) ? yearData : [];
  };

  const isYearBasedSemester = selectedSemester === 'Y3' || selectedSemester === 'Y4';

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                <span className="text-xl sm:text-2xl lg:text-3xl">🎓</span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white uppercase tracking-wide drop-shadow-lg leading-tight">
                  {slug} GPA Calculator
                </h1>
                <p className="text-cyan-100 text-base sm:text-lg lg:text-xl mt-2 lg:mt-3 font-medium">
                  Faculty of Computing - Ultimate Calculator
                </p>
              </div>
            </div>
            <p className="text-cyan-50 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-light px-4 sm:px-0">
              Calculate your GPA with precision using official curriculum data. Select your faculty, syllabus, and semester for pre-loaded modules.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-white/20 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-md border border-white/30">
              <span>←</span> <span className="hidden sm:inline">Back to all universities</span><span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 -mt-4 sm:-mt-6 lg:-mt-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Calculator Section - First on mobile */}
          <div className="lg:col-span-2 order-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden border border-blue-100">
              
              {/* Calculator Header */}
              <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Ultimate SLIIT Faculty Of Computing GPA Calculator</h2>
                    <p className="text-slate-300 mt-1 text-sm sm:text-base">Faculty of Computing - Official Curriculum - 2025 </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8 text-slate-800">
                
                {/* Faculty Selection */}
                <div className="mb-8 sm:mb-10">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">🏫</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-700">Select Faculty Program</h3>
                  </div>
                  
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
  <button
    onClick={() => handleFacultyChange('custom')}
    className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-sm font-medium group hover:scale-105 ${
      selectedFaculty === 'custom'
        ? 'bg-gradient-to-br from-gray-500 to-gray-600 border-gray-400 text-white shadow-lg shadow-gray-500/25'
        : 'bg-white border-slate-200 text-slate-700 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:border-gray-300 hover:shadow-md'
    }`}
  >
    <div className="text-base sm:text-lg mb-2">✏️</div>
    <div className="font-bold text-xs sm:text-sm">Custom</div>
    <div className="text-xs opacity-75 mt-1">Add your own</div>
  </button>
  
  {Object.entries(facultyPrograms).map(([key, program]) => {
    // Define color classes for each program
    const getColorClasses = (programKey: string, isSelected: boolean) => {
      const colorMap = {
        'software-engineering': {
          selected: 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/25',
          hover: 'hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:shadow-md'
        },
        'information-technology': {
          selected: 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg shadow-green-500/25',
          hover: 'hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 hover:border-green-300 hover:shadow-md'
        },
        'data-science': {
          selected: 'bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/25',
          hover: 'hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 hover:border-purple-300 hover:shadow-md'
        },
        'computer-systems-network': {
          selected: 'bg-gradient-to-br from-cyan-500 to-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/25',
          hover: 'hover:bg-gradient-to-br hover:from-cyan-50 hover:to-cyan-100 hover:border-cyan-300 hover:shadow-md'
        },
        'cyber-security': {
          selected: 'bg-gradient-to-br from-red-500 to-red-600 border-red-400 text-white shadow-lg shadow-red-500/25',
          hover: 'hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 hover:border-red-300 hover:shadow-md'
        },
        'information-systems': {
          selected: 'bg-gradient-to-br from-indigo-500 to-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/25',
          hover: 'hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 hover:border-indigo-300 hover:shadow-md'
        },
        'interactive-media': {
          selected: 'bg-gradient-to-br from-pink-500 to-pink-600 border-pink-400 text-white shadow-lg shadow-pink-500/25',
          hover: 'hover:bg-gradient-to-br hover:from-pink-50 hover:to-pink-100 hover:border-pink-300 hover:shadow-md'
        }
      };

      const colors = colorMap[programKey as keyof typeof colorMap];
      if (!colors) return 'bg-white border-slate-200 text-slate-700';
      
      return isSelected ? colors.selected : `bg-white border-slate-200 text-slate-700 ${colors.hover}`;
    };

    return (
      <button
        key={key}
        onClick={() => handleFacultyChange(key)}
        className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-sm font-medium group hover:scale-105 ${getColorClasses(key, selectedFaculty === key)}`}
      >
        <div className="text-base sm:text-lg mb-2">{program.icon}</div>
        <div className="font-bold text-xs sm:text-sm">{program.name}</div>
        <div className="text-xs opacity-75 mt-1">{program.code}</div>
      </button>
    );
  })}
</div>

                  
                  {/* Faculty Info */}
                  {selectedFaculty !== 'custom' && facultyPrograms[selectedFaculty as keyof typeof facultyPrograms] && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{facultyPrograms[selectedFaculty as keyof typeof facultyPrograms].icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-800 mb-1">
                            {facultyPrograms[selectedFaculty as keyof typeof facultyPrograms].name}
                          </h4>
                          <p className="text-sm text-blue-700">
                            {facultyPrograms[selectedFaculty as keyof typeof facultyPrograms].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Syllabus Selection */}
                {selectedFaculty !== 'custom' && (
                  <div className="mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600">📋</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-700">Select Syllabus</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleSyllabusChange('2025')}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                          selectedSyllabus === '2025'
                            ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg shadow-green-500/25'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-green-50 hover:border-green-300'
                        }`}
                      >
                        <div className="text-lg mb-2">🆕</div>
                        <div className="font-bold">New Syllabus (2025)</div>
                        <div className="text-xs opacity-75 mt-1">Joined 2024 or later</div>
                      </button>
                      
                      <button
                        onClick={() => handleSyllabusChange('2021')}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                          selectedSyllabus === '2021'
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 text-white shadow-lg shadow-amber-500/25'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300'
                        }`}
                      >
                        <div className="text-lg mb-2">📚</div>
                        <div className="font-bold">Old Syllabus (2021)</div>
                        <div className="text-xs opacity-75 mt-1">Joined before 2024</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Semester Selection */}
                {selectedFaculty !== 'custom' && availableSemesters.length > 0 && (
                  <div className="mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">📅</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-700">Select Academic Level</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      <button
                        onClick={() => handleSemesterChange('custom')}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium ${
                          selectedSemester === 'custom'
                            ? 'bg-gray-500 border-gray-400 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-gray-50'
                        }`}
                      >
                        Custom
                      </button>
                      {availableSemesters.map(semester => (
                        <button
                          key={semester}
                          onClick={() => handleSemesterChange(semester)}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium ${
                            selectedSemester === semester
                              ? 'bg-green-500 border-green-400 text-white'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-green-50'
                          }`}
                        >
                          {semester}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Year-Based Module Pool for Y3/Y4 */}
                {isYearBasedSemester && selectedFaculty !== 'custom' && (
                  <div className="mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600">🎯</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-700">
                        {selectedSemester} Module Selection
                      </h3>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      {/* Setup Mode Selection */}
                      <div className="mb-6">
                        <p className="text-sm text-slate-600 mb-4">
                          SLIIT offers flexible scheduling for {selectedSemester}. Choose your setup approach:
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          <button
                            onClick={() => {
                              setYearSetupMode({...yearSetupMode, [selectedSemester]: 'quick'});
                              loadQuickSetup(selectedSemester as 'Y3' | 'Y4');
                            }}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              yearSetupMode[selectedSemester] === 'quick'
                                ? 'border-blue-400 bg-blue-50 text-blue-700'
                                : 'border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="text-lg mb-2">⚡</div>
                            <div className="font-semibold text-sm">Quick Setup</div>
                            <div className="text-xs opacity-75">Load typical modules</div>
                          </button>
                          
                          <button
                            onClick={() => {
                              setYearSetupMode({...yearSetupMode, [selectedSemester]: 'custom'});
                              if (selectedSemester === 'Y3') setSelectedY3Modules([]);
                              else setSelectedY4Modules([]);
                            }}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              yearSetupMode[selectedSemester] === 'custom'
                                ? 'border-purple-400 bg-purple-50 text-purple-700'
                                : 'border-slate-200 hover:border-purple-300'
                            }`}
                          >
                            <div className="text-lg mb-2">🎛️</div>
                            <div className="font-semibold text-sm">Custom Selection</div>
                            <div className="text-xs opacity-75">Choose specific modules</div>
                          </button>
                          
                          <button
                            onClick={() => loadQuickSetup(selectedSemester as 'Y3' | 'Y4')}
                            className="p-4 rounded-lg border-2 border-green-200 hover:border-green-300 bg-green-50 text-green-700"
                          >
                            <div className="text-lg mb-2">📚</div>
                            <div className="font-semibold text-sm">Load All</div>
                            <div className="text-xs opacity-75">Select all available</div>
                          </button>
                        </div>
                      </div>

                      {/* Module Selection Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {getYearModules(selectedSemester as 'Y3' | 'Y4').map(module => {
                          const selectedModules = selectedSemester === 'Y3' ? selectedY3Modules : selectedY4Modules;
                          const isSelected = selectedModules.includes(module.code);
                          
                          return (
                            <div
                              key={module.code}
                              onClick={() => handleYearModuleToggle(selectedSemester as 'Y3' | 'Y4', module.code)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'bg-blue-50 border-blue-300 shadow-md'
                                  : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-25'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                    isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'
                                  }`}>
                                    {isSelected && <span className="text-white text-xs">✓</span>}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div className="font-semibold text-slate-800 text-sm">{module.name}</div>
                                    {module.core && (
                                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded ml-2">
                                        Core
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                    <span>{module.code}</span>
                                    <span>•</span>
                                    <span>{module.credits} credits</span>
                                    {module.typical_semester && (
                                      <>
                                        <span>•</span>
                                        <span className="px-2 py-0.5 bg-slate-200 rounded text-xs">
                                          Usually {module.typical_semester}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Selection Summary */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-sm font-semibold text-blue-800">
                            Selected: {selectedSemester === 'Y3' ? selectedY3Modules.length : selectedY4Modules.length} modules
                          </div>
                          <div className="text-xs text-blue-600">
                            {getYearModules(selectedSemester as 'Y3' | 'Y4')
                              .filter(m => (selectedSemester === 'Y3' ? selectedY3Modules : selectedY4Modules).includes(m.code))
                              .reduce((acc, m) => acc + m.credits, 0)} total credits
                          </div>
                        </div>
                        
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-sm font-semibold text-green-800">
                            Core Modules: {getYearModules(selectedSemester as 'Y3' | 'Y4')
                              .filter(m => m.core && (selectedSemester === 'Y3' ? selectedY3Modules : selectedY4Modules).includes(m.code))
                              .length}
                          </div>
                          <div className="text-xs text-green-600">
                            / {getYearModules(selectedSemester as 'Y3' | 'Y4').filter(m => m.core).length} required
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (selectedSemester === 'Y3') setSelectedY3Modules([]);
                            else setSelectedY4Modules([]);
                          }}
                          className="p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                        >
                          Clear All Selections
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Course Input Section - Only show if not year-based or no modules selected */}
                {(selectedSemester === 'custom' || !isYearBasedSemester || courses.length > 0) && (
                  <div className="mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600">📝</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-700">Course Information</h3>
                      {selectedFaculty !== 'custom' && selectedSemester !== 'custom' && !isYearBasedSemester && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Official {facultyPrograms[selectedFaculty as keyof typeof facultyPrograms]?.name} - {selectedSemester} ({selectedSyllabus} Syllabus)
                        </span>
                      )}
                      {isYearBasedSemester && courses.length > 0 && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {selectedSemester} Selected Modules ({selectedSyllabus} Syllabus)
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                      
                      {/* Mobile: Card Layout */}
                      <div className="block sm:hidden space-y-4">
                        {courses.map((course, index) => (
                          <div key={course.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-600">Module {index + 1}</span>
                                {course.code && <span className="text-xs text-slate-500">{course.code}</span>}
                              </div>
                              <button
                                onClick={() => removeCourseRow(course.id)}
                                disabled={selectedSemester !== 'custom'}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  selectedSemester !== 'custom' ? 'text-slate-400 cursor-not-allowed' : 'text-red-500 hover:bg-red-100'
                                }`}
                              >
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="8" cy="8" r="7"></circle>
                                  <path d="M5 8h6"></path>
                                </svg>
                              </button>
                            </div>
                            
                            <div className="space-y-3">
                              <input
                                type="text"
                                placeholder={`Enter module name`}
                                value={course.name}
                                disabled={selectedSemester !== 'custom'}
                                onChange={e => updateCourse(course.id, 'name', e.target.value)}
                                className={`w-full rounded-lg border-2 px-3 py-2 text-sm transition-all duration-200 ${
                                  selectedSemester !== 'custom'
                                    ? 'bg-slate-100 text-slate-500 border-slate-300 cursor-not-allowed'
                                    : 'bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
                                }`}
                              />
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Credits</label>
                                  <select
                                    value={course.credits}
                                    disabled={selectedSemester !== 'custom'}
                                    onChange={e => updateCourse(course.id, 'credits', Number(e.target.value))}
                                    className={`w-full rounded-lg border-2 px-2 py-2 text-sm text-center transition-all duration-200 ${
                                      selectedSemester !== 'custom'
                                        ? 'bg-slate-100 text-slate-500 border-slate-300 cursor-not-allowed'
                                        : 'bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
                                    }`}
                                  >
                                    {[1, 2, 3, 4, 5, 6].map(n => (
                                      <option key={n} value={n}>{n}</option>
                                    ))}
                                  </select>
                                </div>
                                
                                <div>
                                  <label className="block text-xs font-medium text-slate-600 mb-1">Grade</label>
                                  <select
                                    value={course.grade}
                                    onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                                    className="w-full rounded-lg border-2 px-2 py-2 text-sm text-center bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-200"
                                  >
                                    {sliitGradeScale.map(g => (
                                      <option key={g.grade} value={g.grade}>{g.grade}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop: Table Layout */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-[420px] w-full text-sm text-slate-800 border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                              <th className="text-left py-3 pl-6 rounded-l-lg font-semibold">Module Name</th>
                              <th className="w-20 text-center py-3 font-semibold">Code</th>
                              <th className="w-24 text-center py-3 font-semibold">Credits</th>
                              <th className="w-28 text-center py-3 font-semibold">Grade</th>
                              <th className="w-16 text-center py-3 pr-6 rounded-r-lg font-semibold">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {courses.map((course, index) => (
                              <tr key={course.id} className="hover:bg-blue-50 transition-colors duration-200">
                                <td className="py-4 pl-6 pr-4">
                                  <input
                                    type="text"
                                    placeholder={`Enter module ${index + 1} name`}
                                    value={course.name}
                                    disabled={selectedSemester !== 'custom'}
                                    onChange={e => updateCourse(course.id, 'name', e.target.value)}
                                    className={`w-full rounded-lg border-2 px-4 py-2 transition-all duration-200 ${
                                      selectedSemester !== 'custom'
                                        ? 'bg-slate-100 text-slate-500 border-slate-300 cursor-not-allowed'
                                        : 'bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
                                    }`}
                                  />
                                </td>
                                <td className="py-4 text-center">
                                  <span className="text-xs text-slate-500 font-mono">{course.code || '-'}</span>
                                </td>
                                <td className="py-4 text-center">
                                  <select
                                    value={course.credits}
                                    disabled={selectedSemester !== 'custom'}
                                    onChange={e => updateCourse(course.id, 'credits', Number(e.target.value))}
                                    className={`w-20 rounded-lg border-2 px-2 py-2 text-center transition-all duration-200 ${
                                      selectedSemester !== 'custom'
                                        ? 'bg-slate-100 text-slate-500 border-slate-300 cursor-not-allowed'
                                        : 'bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
                                    }`}
                                  >
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 16].map(n => (
                                      <option key={n} value={n}>{n}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-4 text-center">
                                  <select
                                    value={course.grade}
                                    onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                                    className="w-24 rounded-lg border-2 px-2 py-2 text-center bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-200"
                                  >
                                    {sliitGradeScale.map(g => (
                                      <option key={g.grade} value={g.grade}>{g.grade}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-4 pr-6 text-center">
                                  <button
                                    onClick={() => removeCourseRow(course.id)}
                                    disabled={selectedSemester !== 'custom'}
                                    aria-label="Remove course"
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                      selectedSemester !== 'custom'
                                        ? 'text-slate-400 cursor-not-allowed'
                                        : 'text-red-500 hover:bg-red-100 hover:text-red-600'
                                    }`}
                                  >
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                      <circle cx="9" cy="9" r="8"></circle>
                                      <path d="M6 9h6"></path>
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Add Module Button */}
                      {selectedSemester === 'custom' && (
                        <div className="mt-6 flex justify-center">
                          <button
                            onClick={addCourseRow}
                            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg shadow-cyan-500/25 hover:scale-105"
                          >
                            <span className="text-lg sm:text-xl">+</span>
                            <span>Add Module</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                              {/* Enhanced Results Section */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600">📊</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-700">Calculation Results</h3>
                  </div>
                  
                  {/* Main GPA Display Card */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100 mb-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                      
                      {/* GPA Meter */}
                      <div className="flex-shrink-0">
                        <CircularGPAMeter gpa={calculatedGpa} size={140} />
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">{namedCourses.length}</div>
                          <div className="text-xs text-blue-700 font-medium mt-1">Modules</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                          <div className="text-2xl font-bold text-green-600">{totalCredits}</div>
                          <div className="text-xs text-green-700 font-medium mt-1">Credits</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                          <div className="text-2xl font-bold text-purple-600">{((calculatedGpa / 4.0) * 100).toFixed(0)}%</div>
                          <div className="text-xs text-purple-700 font-medium mt-1">Percentage</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                          <div className="text-2xl font-bold text-orange-600">{selectedSyllabus}</div>
                          <div className="text-xs text-orange-700 font-medium mt-1">Syllabus</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Status Card */}
                  <div className="bg-white rounded-xl p-6 border-l-4 border-cyan-500 shadow-md">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-center sm:text-left">
                        <div className="text-sm text-slate-600 mb-1">Academic Status</div>
                        <div className={`text-xl sm:text-2xl font-bold ${getGpaColor(calculatedGpa)}`}>
                          {getGpaStatus(calculatedGpa)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <span className={calculatedGpa >= 2.0 ? 'text-green-600' : 'text-red-600'}>
                          {calculatedGpa >= 2.0 ? '✅' : '⚠️'}
                        </span>
                        <span className="text-slate-600">
                          {calculatedGpa >= 2.0 ? 'Meeting graduation requirements' : 'Below minimum passing grade'}
                        </span>
                      </div>
                    </div>
                    
                    {/* WGPA Information */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="text-sm text-slate-600 text-center">
                        <strong className="text-blue-700">Faculty of Computing WGPA Weightings:</strong> 
                        <span className="ml-2">Y1 (0%) • Y2 (20%) • Y3 (30%) • Y4 (50%)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Enhanced Grading Scale Sidebar - Second on mobile */}
          <div className="lg:col-span-1 order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden border border-blue-100 lg:sticky lg:top-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-base sm:text-lg">📋</span>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">Official SLIIT Scale</h2>
                    <p className="text-indigo-100 text-xs sm:text-sm">Faculty of Computing</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  {sliitGradeScale.map(grade => (
                    <div key={grade.grade} className="flex justify-between items-center py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg sm:rounded-xl hover:from-slate-100 hover:to-blue-100 transition-all duration-200 border border-slate-200">
                      <span className="font-bold text-slate-800 text-base sm:text-lg">{grade.grade}</span>
                      <span className="text-slate-600 font-semibold text-sm sm:text-base">{grade.gpa.toFixed(1)}</span>
                      <span className="text-xs sm:text-sm text-slate-500 bg-white px-2 py-1 rounded-md">{grade.range}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg sm:rounded-xl border-2 border-cyan-200">
                  <div className="text-center">
                    <div className="font-bold text-slate-700 mb-2 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <span className="text-green-500">✅</span>
                      Pass Requirement
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600">
                      Minimum &quot;C&quot; grade (2.0 GPA) required. 80% attendance mandatory.
                    </div>
                  </div>
                </div>

                {/* Faculty Stats */}
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <div className="text-center text-sm text-slate-600">
                    <div className="font-semibold mb-1">Faculty Statistics</div>
                    <div className="text-xs">13,000+ Students • 160+ Staff • 7 Programs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced SEO Content Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          
          {/* Content Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200 mb-4">
              <span className="text-blue-600">📚</span>
              <span className="text-sm font-semibold text-blue-700">Complete Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
      Everything You Need to Know About SLIIT GPA
    </h2>
    <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg">
      Master your academic performance with our comprehensive guide to GPA calculations, grading systems, and academic success strategies.
    </p>
  </div>

  {/* Main Content Cards */}
  <div className="grid lg:grid-cols-2 gap-8 mb-12">
    
    {/* Introduction Card */}
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl">🎯</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Academic Journey Navigation</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
        </div>
      </div>
      <p className="text-slate-600 leading-relaxed">
        Navigating your academic journey at the Sri Lanka Institute of Information Technology (SLIIT) requires a clear understanding of your performance. Our SLIIT GPA Calculator is a vital tool designed to help you instantly calculate your Grade Point Average. By simply entering your course grades and credit points, you can get an accurate assessment of your current academic standing, track your semester GPA, and plan effectively for future scholarships and graduate programs.
      </p>
    </div>

    {/* Performance Impact Card */}
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-green-200">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl">📈</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Academic Performance Impact</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
        </div>
      </div>
      <p className="text-slate-600 leading-relaxed mb-4">
        Understanding your Grade Point Average (GPA) is more than just a number; it's a key indicator of your academic performance at SLIIT. Your GPA plays a critical role in your eligibility for honours, scholarships, and even future employment opportunities.
      </p>
      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg">
        <span>💡</span>
        <span className="font-medium">Track progress • Make informed decisions • Boost your score</span>
      </div>
    </div>
  </div>

  {/* Key Concepts Section */}
  <div className="mb-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-8">
      Key Concepts & Calculations
    </h2>
    
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* What is GPA Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600">🤔</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">What is a Grade Point Average?</h3>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          A Grade Point Average is a standard metric used to measure a student's academic achievement over a specific period, such as a semester or an entire degree program. Each letter grade you receive for a course corresponds to a numerical grade point.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
          <p className="text-sm text-slate-600">
            <strong>Key Point:</strong> GPA provides a comprehensive summary of your overall performance, making it easier for institutions and employers to assess your capabilities.
          </p>
        </div>
      </div>

      {/* How GPA is Calculated Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
            <span className="text-cyan-600">🧮</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">How is Your GPA Calculated?</h3>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          Calculating your GPA at SLIIT follows a straightforward formula. First, convert each letter grade to its corresponding grade point value, then multiply by credit hours.
        </p>
        <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200 mb-4">
          <div className="text-center">
            <div className="text-sm text-cyan-700 font-medium mb-2">Formula</div>
            <div className="text-lg font-bold text-cyan-800 font-mono">
              GPA = Σ (Grade Points × Credits) ÷ Total Credits
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Our tool automates this entire process - just enter your grades and credits!
        </p>
      </div>
    </div>
  </div>

  {/* Enhanced Grading Scale Table */}
  <div className="mb-12">
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <span className="text-white text-lg">📋</span>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Official SLIIT Grading Scale</h3>
          <p className="text-slate-600 text-sm mt-1">12-grade system with corresponding GPA values</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="text-left py-4 px-6 font-semibold">Grade</th>
              <th className="text-center py-4 px-6 font-semibold">Grade Point</th>
              <th className="text-center py-4 px-6 font-semibold">Marks Range</th>
            </tr>
          </thead>
          <tbody>
            {[
              { grade: "A+", gpa: "4.0", range: "90-100", color: "text-green-600" },
              { grade: "A", gpa: "4.0", range: "80-89", color: "text-green-600" },
              { grade: "A-", gpa: "3.7", range: "75-79", color: "text-green-500" },
              { grade: "B+", gpa: "3.3", range: "70-74", color: "text-blue-600" },
              { grade: "B", gpa: "3.0", range: "65-69", color: "text-blue-600" },
              { grade: "B-", gpa: "2.7", range: "60-64", color: "text-blue-500" },
              { grade: "C+", gpa: "2.3", range: "55-59", color: "text-yellow-600" },
              { grade: "C", gpa: "2.0", range: "45-54", color: "text-yellow-600" },
              { grade: "C-", gpa: "1.7", range: "40-44", color: "text-orange-500" },
              { grade: "D+", gpa: "1.3", range: "35-39", color: "text-red-500" },
              { grade: "D", gpa: "1.0", range: "30-34", color: "text-red-500" },
              { grade: "E", gpa: "0.0", range: "0-29", color: "text-red-600" }
            ].map((row, index) => (
              <tr key={row.grade} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition-colors`}>
                <td className="py-3 px-6">
                  <span className={`font-bold text-lg ${row.color}`}>{row.grade}</span>
                </td>
                <td className="text-center py-3 px-6 font-semibold text-slate-700">{row.gpa}</td>
                <td className="text-center py-3 px-6 text-slate-600">{row.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <span className="text-green-600 text-lg">✅</span>
        <p className="text-green-700 font-medium">
          Pass Requirement: Minimum "C" grade (2.0 GPA) required for module completion
        </p>
      </div>
    </div>
  </div>

  {/* WGPA Information Card */}
  <div className="mb-12">
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-indigo-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
          <span className="text-white text-lg">⚖️</span>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Weighted GPA (WGPA) at SLIIT</h3>
          <p className="text-slate-600 text-sm mt-1">How different academic years impact your final classification</p>
        </div>
      </div>

      <p className="text-slate-600 leading-relaxed mb-6">
        Beyond the standard semester GPA, SLIIT uses a Weighted Grade Point Average (WGPA) to determine final class honours. The WGPA gives different weights to your academic performance in different years of study.
      </p>

      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { faculty: "Faculty of Computing", weights: ["1st: 0%", "2nd: 20%", "3rd: 30%", "4th: 50%"], color: "blue" },
          { faculty: "School of Business", weights: ["1st: 10%", "2nd: 20%", "3rd: 30%", "4th: 40%"], color: "green" },
          { faculty: "Faculty of Engineering", weights: ["1st: 10%", "2nd: 20%", "3rd: 30%", "4th: 40%"], color: "purple" }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className={`font-bold mb-3 text-${item.color}-600`}>{item.faculty}</h4>
            <div className="space-y-2">
              {item.weights.map((weight, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-600">{weight.split(':')[0]} Year</span>
                  <span className={`font-semibold text-${item.color}-600`}>{weight.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
        <p className="text-sm text-slate-600">
          <strong>Important:</strong> This system emphasizes sustained academic improvement and rewards strong performance in higher-level courses. Our tool helps you calculate your unweighted GPA, which forms the foundation for WGPA calculations.
        </p>
      </div>
    </div>
  </div>


          {/* All 10 FAQs - No Expandable Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full border border-yellow-200 mb-4">
                <span className="text-yellow-600">❓</span>
                <span className="text-sm font-semibold text-yellow-700">Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                Complete FAQ Guide
              </h2>
              <p className="text-slate-600">Everything you need to know about GPA calculations at SLIIT Faculty of Computing</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What is considered a good GPA at SLIIT Faculty of Computing?",
                  answer: "A 'good' GPA is subjective, but generally, a cumulative GPA of 3.0 or higher is considered strong. For Dean's List recognition, you typically need 3.7+. For First Class Honours, the WGPA calculation considers different weightings: Y1(0%), Y2(20%), Y3(30%), Y4(50%).",
                  icon: "🏆"
                },
                {
                  question: "Is this an official SLIIT GPA Calculator?",
                  answer: "This is an unofficial tool designed to help students calculate their GPA based on the official SLIIT grading system and curriculum data from 2025. For your official GPA and academic transcript, always consult the Student System or contact the Registrar's Office.",
                  icon: "🏢"
                },
                {
                  question: "How do I find the number of credits for my subjects?",
                  answer: "Credit points are listed in your course handbook, available on SLIIT's student portal (Courseweb). You can also find this on your academic transcript. Our calculator includes official credit values from the 2025 Faculty of Computing curriculum.",
                  icon: "📖"
                },
                {
                  question: "What are the different Faculty of Computing programs available?",
                  answer: "SLIIT offers 7 computing programs: Software Engineering, Information Technology, Data Science, Computer Systems & Network Engineering, Cyber Security, Information Systems Engineering, and Interactive Media.",
                  icon: "💻"
                },
                {
                  question: "How does the WGPA (Weighted GPA) calculation work?",
                  answer: "The Faculty of Computing uses WGPA for final honors classification with weightings: Year 1 (0%), Year 2 (20%), Year 3 (30%), Year 4 (50%). This means your final year performance has the highest impact on your degree classification.",
                  icon: "⚖️"
                },
                {
                  question: "What are the entry requirements for different computing programs?",
                  answer: "Most programs require 3 A-Level passes and passing the SLIIT Aptitude Test. Computer Systems & Network Engineering requires Physical Science stream. Some programs like Interactive Media have additional interviews.",
                  icon: "📝"
                },
                {
                  question: "How are 'Pass'/'Fail' courses treated in GPA calculation?",
                  answer: "Pass/Fail courses typically aren't included in GPA calculations. Industry Training modules (coded as 0 credits) don't affect GPA. A 'Pass' earns credits but doesn't impact GPA, while 'Fail' results in no credits earned.",
                  icon: "✅"
                },
                {
                  question: "What is the minimum attendance requirement at SLIIT?",
                  answer: "SLIIT requires 80% minimum attendance to sit for examinations. This is strictly enforced across all Faculty of Computing programs. Poor attendance can result in being barred from exams regardless of academic performance.",
                  icon: "📅"
                },
                {
                  question: "How can I improve my GPA at SLIIT?",
                  answer: "Focus on consistent study habits, maintain 80%+ attendance, utilize SLIIT's digital resources (IEEE, O'Reilly), engage with faculty during office hours, participate in study groups, and consider retaking modules where improvement is possible.",
                  icon: "📈"
                },
                {
                  question: "Where can I get official academic support at SLIIT?",
                  answer: "Contact SLIIT's Academic Advising, the Registrar's Office, or your specific department head. The Faculty of Computing has 160+ staff including 9 professors and 30+ PhD holders available for academic guidance and support.",
                  icon: "🎓"
                }
              ].map((faq, index) => (
                <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
                  <summary className="p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span>{faq.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 group-open:text-blue-600 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <div className="pl-12">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is considered a good GPA at SLIIT Faculty of Computing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 'good' GPA is subjective, but generally, a cumulative GPA of 3.0 or higher is considered strong. For Dean's List recognition, you typically need 3.7+. For First Class Honours, the WGPA calculation considers different weightings."
                }
              },
              {
                "@type": "Question", 
                "name": "What are the different Faculty of Computing programs available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SLIIT offers 7 computing programs: Software Engineering, Information Technology, Data Science, Computer Systems & Network Engineering, Cyber Security, Information Systems Engineering, and Interactive Media."
                }
              }
            ]
          })}}
        />
      </div>
    </main>
  );
};

export default CalculatorUI;
