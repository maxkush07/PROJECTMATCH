import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

async function main() {
  console.log('🌱 Starting database seed...');

  // Create skills
  const skills = await Promise.all([
    db.skill.upsert({
      where: { name: 'React' },
      update: {},
      create: { name: 'React', category: 'Frontend' },
    }),
    db.skill.upsert({
      where: { name: 'Vue.js' },
      update: {},
      create: { name: 'Vue.js', category: 'Frontend' },
    }),
    db.skill.upsert({
      where: { name: 'Angular' },
      update: {},
      create: { name: 'Angular', category: 'Frontend' },
    }),
    db.skill.upsert({
      where: { name: 'Node.js' },
      update: {},
      create: { name: 'Node.js', category: 'Backend' },
    }),
    db.skill.upsert({
      where: { name: 'Python' },
      update: {},
      create: { name: 'Python', category: 'Backend' },
    }),
    db.skill.upsert({
      where: { name: 'Java' },
      update: {},
      create: { name: 'Java', category: 'Backend' },
    }),
    db.skill.upsert({
      where: { name: 'TypeScript' },
      update: {},
      create: { name: 'TypeScript', category: 'Language' },
    }),
    db.skill.upsert({
      where: { name: 'JavaScript' },
      update: {},
      create: { name: 'JavaScript', category: 'Language' },
    }),
    db.skill.upsert({
      where: { name: 'UI/UX Design' },
      update: {},
      create: { name: 'UI/UX Design', category: 'Design' },
    }),
    db.skill.upsert({
      where: { name: 'Graphic Design' },
      update: {},
      create: { name: 'Graphic Design', category: 'Design' },
    }),
    db.skill.upsert({
      where: { name: 'Product Management' },
      update: {},
      create: { name: 'Product Management', category: 'Management' },
    }),
    db.skill.upsert({
      where: { name: 'Project Management' },
      update: {},
      create: { name: 'Project Management', category: 'Management' },
    }),
  ]);

  console.log(`✅ Created ${skills.length} skills`);

  // Create demo users
  const hashedPassword = await hashPassword('password123');

  const demoUser = await db.user.upsert({
    where: { email: 'demo@projectmatch.com' },
    update: {},
    create: {
      email: 'demo@projectmatch.com',
      name: 'Demo User',
      passwordHash: hashedPassword,
      profile: {
        create: {
          bio: 'Full-stack developer passionate about building amazing products',
          availability: 'FULL_TIME',
          experienceLevel: 'ADVANCED',
          location: 'San Francisco, CA',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          userType: 'Developer',
          goal: 'Find a co-founder',
        },
      },
    },
    include: { profile: true },
  });

  console.log(`✅ Created demo user: ${demoUser.email}`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  });
