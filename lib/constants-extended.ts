// Messaging & Chat
export const MESSAGING_ROUTES = {
  conversations: '/api/conversations',
  messages: '/api/messages',
  markAsRead: '/api/messages/read',
};

// Notifications
export const NOTIFICATION_TYPES = {
  MATCH: 'MATCH',
  MESSAGE: 'MESSAGE',
  CONNECTION_ACCEPTED: 'CONNECTION_ACCEPTED',
  SKILL_ENDORSED: 'SKILL_ENDORSED',
  REVIEW_RECEIVED: 'REVIEW_RECEIVED',
  PROJECT_INVITE: 'PROJECT_INVITE',
  MEETING_SCHEDULED: 'MEETING_SCHEDULED',
};

// Portfolio
export const PORTFOLIO_TYPES = ['PROJECT', 'CASE_STUDY', 'TESTIMONIAL'];
export const MAX_PORTFOLIO_ITEMS = 20;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Reviews & Ratings
export const RATING_SCALE = [1, 2, 3, 4, 5];
export const REVIEW_CATEGORIES = {
  COMMUNICATION: 'Communication',
  RELIABILITY: 'Reliability',
  QUALITY: 'Quality of Work',
  COLLABORATION: 'Collaboration',
};

// Projects
export const PROJECT_STATUS = ['IDEATION', 'RECRUITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
export const PROJECT_ROLES = ['FOUNDER', 'LEAD', 'DEVELOPER', 'DESIGNER', 'MANAGER', 'CONTRIBUTOR'];
export const TASK_STATUS = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'BLOCKED'];
export const TASK_PRIORITY = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

// Calendar
export const MEETING_STATUS = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
export const MEETING_DURATIONS = [15, 30, 45, 60, 90, 120];

// Sharing & Social
export const SOCIAL_PLATFORMS = ['TWITTER', 'LINKEDIN', 'FACEBOOK', 'GITHUB'];

// SEO & Public Profiles
export const PUBLIC_PROFILE_FIELDS = [
  'name',
  'bio',
  'avatar',
  'skills',
  'portfolio',
  'experience',
  'reviews',
];
