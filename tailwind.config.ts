import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        foreground: '#FAFAFA',
        card: '#18181B',
        'card-foreground': '#FAFAFA',
        muted: '#A1A1AA',
        'muted-foreground': '#71717A',
        accent: '#A855F7',
        'accent-foreground': '#FAFAFA',
        border: '#27272A',
        input: '#27272A',
        ring: '#A855F7',
      },
      borderColor: {
        DEFAULT: '#27272A',
      },
    },
  },
  plugins: [],
};

export default config;
