import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('Invalid DATABASE_URL'),
  DIRECT_URL: z.string().url('Invalid DIRECT_URL'),
  AUTH_SECRET: z.string().min(32, 'AUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('Invalid NEXTAUTH_URL'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

type EnvType = z.infer<typeof envSchema>;

let env: EnvType;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:');
    error.errors.forEach((err) => {
      console.error(`  ${err.path.join('.')}: ${err.message}`);
    });
    throw new Error('Invalid environment variables');
  }
  throw error;
}

export default env;
