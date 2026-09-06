import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing skills
  await prisma.skill.deleteMany({});

  const skills = [
    // Frontend
    { name: 'React', category: 'FRONTEND' },
    { name: 'Next.js', category: 'FRONTEND' },
    { name: 'TypeScript', category: 'FRONTEND' },
    { name: 'JavaScript', category: 'FRONTEND' },
    { name: 'Tailwind CSS', category: 'FRONTEND' },
    { name: 'Vue.js', category: 'FRONTEND' },
    { name: 'Angular', category: 'FRONTEND' },
    { name: 'HTML/CSS', category: 'FRONTEND' },
    
    // Backend
    { name: 'Node.js', category: 'BACKEND' },
    { name: 'Python', category: 'BACKEND' },
    { name: 'PHP', category: 'BACKEND' },
    { name: 'Java', category: 'BACKEND' },
    { name: 'Go', category: 'BACKEND' },
    { name: 'Rust', category: 'BACKEND' },
    { name: 'Laravel', category: 'BACKEND' },
    { name: 'Django', category: 'BACKEND' },
    { name: 'Express.js', category: 'BACKEND' },
    
    // Fullstack
    { name: 'MERN Stack', category: 'FULLSTACK' },
    { name: 'MEAN Stack', category: 'FULLSTACK' },
    { name: 'Supabase', category: 'FULLSTACK' },
    { name: 'Firebase', category: 'FULLSTACK' },
    
    // Mobile
    { name: 'React Native', category: 'MOBILE' },
    { name: 'Flutter', category: 'MOBILE' },
    { name: 'Swift', category: 'MOBILE' },
    { name: 'Kotlin', category: 'MOBILE' },
    
    // Design
    { name: 'Figma', category: 'DESIGN' },
    { name: 'UI/UX', category: 'DESIGN' },
    { name: 'Graphic Design', category: 'DESIGN' },
    { name: 'Adobe XD', category: 'DESIGN' },
    { name: 'Sketch', category: 'DESIGN' },
    { name: 'Wireframing', category: 'DESIGN' },
    
    // Product
    { name: 'Product Management', category: 'PRODUCT' },
    { name: 'Product Strategy', category: 'PRODUCT' },
    { name: 'User Research', category: 'PRODUCT' },
    
    // Marketing
    { name: 'Content Marketing', category: 'MARKETING' },
    { name: 'Social Media', category: 'MARKETING' },
    { name: 'SEO', category: 'MARKETING' },
    { name: 'SEM', category: 'MARKETING' },
    { name: 'Email Marketing', category: 'MARKETING' },
    { name: 'Growth Hacking', category: 'MARKETING' },
    { name: 'Community Management', category: 'MARKETING' },
    { name: 'Copywriting', category: 'MARKETING' },
    
    // Business
    { name: 'Business Development', category: 'BUSINESS' },
    { name: 'Sales', category: 'BUSINESS' },
    { name: 'Fundraising', category: 'BUSINESS' },
    { name: 'Accounting', category: 'BUSINESS' },
    { name: 'Legal', category: 'BUSINESS' },
    
    // Other
    { name: 'AI/Machine Learning', category: 'OTHER' },
    { name: 'Data Science', category: 'OTHER' },
    { name: 'DevOps', category: 'OTHER' },
    { name: 'Cloud Architecture', category: 'OTHER' },
    { name: 'Video Editing', category: 'OTHER' },
    { name: 'Audio Production', category: 'OTHER' },
  ];

  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
