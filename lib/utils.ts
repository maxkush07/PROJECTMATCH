export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function calculateProfileCompleteness(profile: any): number {
  let score = 0;
  const totalFields = 5;

  if (profile.bio) score++;
  if (profile.availability) score++;
  if (profile.experienceLevel) score++;
  if (profile.location) score++;
  if (profile.website) score++;

  return Math.round((score / totalFields) * 100);
}

export function calculateMatchScore(user1: any, user2: any): number {
  // Simple matching algorithm
  let score = 0;

  // Same availability (20%)
  if (user1.availability === user2.availability) score += 20;

  // Similar experience level (20%)
  const expLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
  const diff = Math.abs(
    expLevels.indexOf(user1.experienceLevel || 'INTERMEDIATE') -
    expLevels.indexOf(user2.experienceLevel || 'INTERMEDIATE')
  );
  score += Math.max(20 - diff * 10, 0);

  // Shared skills (30%)
  const user1Skills = new Set(user1.skills?.map((s: any) => s.id) || []);
  const user2Skills = new Set(user2.skills?.map((s: any) => s.id) || []);
  const sharedSkills = [...user1Skills].filter((skill) =>
    user2Skills.has(skill)
  ).length;
  const totalSkills = Math.max(user1Skills.size, user2Skills.size);
  if (totalSkills > 0) {
    score += (sharedSkills / totalSkills) * 30;
  }

  // Complementary skills (30%)
  const complementarySkills = [...user1Skills].filter(
    (skill) => !user2Skills.has(skill)
  ).length + [...user2Skills].filter(
    (skill) => !user1Skills.has(skill)
  ).length;
  if (complementarySkills > 0) {
    score += Math.min(15, complementarySkills * 2);
  }

  return Math.round(score);
}
