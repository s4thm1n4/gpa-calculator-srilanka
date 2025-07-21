// lib/universities.ts

// This defines the structure for any university we add
export type University = {
  id: string; // The URL part, e.g., 'sliit'
  name: string; // The full display name
  // We will add the gradePoints here later when building the calculator page
};

// This is our list of universities. For now, it only has one.
export const universities: University[] = [
  {
    id: 'sliit',
    name: 'SLIIT - Sri Lanka Institute of Information Technology',
  },
  // We can add NSBM, UoM, etc., here in the future
];

export const getUniversityById = (id: string) => {
  return universities.find(uni => uni.id === id);
};