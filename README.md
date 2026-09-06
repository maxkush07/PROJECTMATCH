# ProjectMatch - Collaborative Platform

A modern full-stack web application that connects talented creators, developers, designers, and entrepreneurs to collaborate on innovative projects.

## 🚀 Features

### User Management
- **Authentication**: Secure email/password authentication with NextAuth.js
- **User Profiles**: Comprehensive profiles with skills, experience levels, and availability
- **Onboarding**: Interactive onboarding flow to help users get started
- **Profile Completion**: Progress tracking to encourage profile completion

### Matching Algorithm
- **Smart Matching**: AI-powered algorithm to find compatible collaborators
- **Skill-Based Matching**: Connect based on complementary or shared skills
- **Availability Matching**: Find collaborators with compatible schedules
- **Match Score**: Visual representation of compatibility (0-100%)

### Collaboration Features
- **User Discovery**: Browse and explore other creators' profiles
- **Connection Requests**: Send and receive collaboration requests
- **Messaging**: Real-time messaging with collaborators
- **Project Management**: Integrated tools for managing collaborative projects

### Dashboard
- **Recommendations**: Personalized recommendations based on profile
- **Recent Matches**: View your latest matches
- **Active Projects**: Track ongoing collaborative projects
- **Quick Stats**: Profile completion and activity overview

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component library
- **Lucide Icons**: Beautiful icon set

### Backend
- **Next.js Server Actions**: Serverless functions
- **NextAuth.js 5**: Authentication and authorization
- **Prisma ORM**: Database management
- **Zod**: Schema validation

### Database
- **PostgreSQL**: Relational database
- **Prisma Client**: ORM for database operations

### Authentication & Security
- **bcryptjs**: Password hashing
- **NextAuth.js**: Session management
- **CSRF Protection**: Built-in protection

## 📦 Project Structure

```
ProjectMatch/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── profile/           # Profile pages
│   ├── onboarding/        # Onboarding flow
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── actions/               # Server actions
│   ├── auth.ts           # Authentication actions
│   └── profile.ts        # Profile actions
├── components/            # Reusable components
│   └── ui/               # UI components
├── lib/                  # Utility functions
│   ├── auth.ts          # Auth utilities
│   ├── db.ts            # Database client
│   ├── utils.ts         # General utilities
│   └── constants.ts     # Application constants
├── validations/         # Zod schemas
│   ├── auth.ts         # Auth validation
│   └── profile.ts      # Profile validation
├── prisma/             # Prisma configuration
│   └── schema.prisma   # Database schema
├── auth.config.ts      # NextAuth configuration
├── auth.ts             # NextAuth export
├── middleware.ts       # Next.js middleware
└── package.json        # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL 14+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/maxkush07/PROJECTMATCH.git
cd PROJECTMATCH
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/projectmatch"
NEXTAUTH_SECRET="generate-a-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
npm run db:push
```

5. **Seed the database (optional)**
```bash
npm run db:seed
```

6. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Push schema to database
npm run db:migrate      # Run migrations
npm run db:studio       # Open Prisma Studio

# Linting
npm run lint            # Run ESLint
```

## 🔑 Key Features Explained

### Smart Matching Algorithm
The matching algorithm considers:
- **Shared Skills (30%)**: Users with overlapping skills
- **Complementary Skills (30%)**: Users with skills that complement each other
- **Availability (20%)**: Similar time availability
- **Experience Level (20%)**: Compatible experience levels

### Authentication Flow
1. User registers with email and password
2. Password is hashed using bcryptjs
3. User completes onboarding (skills, availability, goals)
4. NextAuth creates a session
5. User is redirected to dashboard

### Profile Completion
Profile completion is calculated based on:
- Basic information (20%)
- Bio (10%)
- Skills (30%)
- Availability (20%)
- Experience level (20%)

## 🗄️ Database Schema

### User
- id (UUID)
- email (String, unique)
- name (String)
- passwordHash (String)
- avatarUrl (String, optional)
- createdAt (DateTime)
- updatedAt (DateTime)

### Profile
- id (UUID)
- userId (UUID, foreign key)
- bio (String, optional)
- availability (String)
- experienceLevel (String)
- location (String, optional)
- website (String, optional)
- twitter (String, optional)
- github (String, optional)
- linkedin (String, optional)
- createdAt (DateTime)
- updatedAt (DateTime)

### Skill
- id (UUID)
- name (String, unique)
- category (String)
- createdAt (DateTime)

### UserSkill
- userId (UUID, foreign key)
- skillId (UUID, foreign key)
- level (String: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- yearsExperience (Int)
- createdAt (DateTime)

## 🔐 Security Considerations

- Passwords are hashed with bcryptjs (10 rounds)
- NextAuth.js handles session management securely
- CSRF protection is built-in
- Environment variables for sensitive data
- Middleware protects routes that require authentication
- Server actions validate input with Zod schemas

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1440px)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎨 Design System

### Color Scheme
- **Primary**: Dark theme optimized for productivity
- **Accent**: Orange (#FF8C42) for primary actions
- **Background**: Dark gray with gradient overlays
- **Borders**: Subtle gray dividers

### Typography
- **Font**: System fonts (San Francisco, Segoe UI, etc.)
- **Sizes**: 12px to 48px scale
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy with one click

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production
```env
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<strong-secret-key>
DATABASE_URL=<production-database-url>
```

## 📚 API Documentation

### Server Actions

#### Authentication
- `registerUser(data)` - Register a new user
- `getUserByEmail(email)` - Fetch user by email

#### Profile
- `updateProfile(userId, data)` - Update user profile
- `getUserProfile(userId)` - Get user profile
- `addUserSkill(userId, skillId, level)` - Add skill to user
- `removeUserSkill(userId, skillId)` - Remove skill from user
- `getUserSkills(userId)` - Get all user skills
- `getAllSkills()` - Get all available skills
- `completeOnboarding(userId, data)` - Complete onboarding
- `calculateProfileCompletion(userId)` - Get profile completion %

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL is correct
# Reset database
npm run db:push -- --force-reset
```

### Authentication Issues
- Clear browser cookies
- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@projectmatch.com or open an issue on GitHub.

## 🎯 Future Features

- [ ] Real-time messaging with WebSockets
- [ ] Video call integration
- [ ] Project management tools
- [ ] Portfolio showcase
- [ ] Skill verification badges
- [ ] Reputation system
- [ ] Advanced search and filters
- [ ] Notifications system
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

## 📊 Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ Profile management
- ✅ Basic matching
- ✅ Dashboard

### Phase 2
- [ ] Messaging system
- [ ] Advanced matching
- [ ] Skill verification
- [ ] Project management

### Phase 3
- [ ] Video calls
- [ ] Collaboration tools
- [ ] Portfolio integration
- [ ] Mobile app

---

**Built with ❤️ by ProjectMatch Team**
