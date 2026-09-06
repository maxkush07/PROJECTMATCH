import { User, Profile, Skill, UserSkill } from '@prisma/client';

export type UserWithProfile = User & {
  profile: Profile | null;
};

export type ProfileWithSkills = Profile & {
  user: User;
};

export type SkillWithCategory = Skill;

export type UserSkillWithSkill = UserSkill & {
  skill: Skill;
};
