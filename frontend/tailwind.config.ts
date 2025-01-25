import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        warning: 'var(--action-warning)',
      },
      backgroundColor: {
        DEFAULT: 'var(--background)',
        gray: 'var(--background-gray)',
        modal: 'var(--background-modal)',
        kakao: 'var(--background-kakao)',
      },
      textColor: {
        DEFAULT: 'var(--text-black)',
        deepgray: 'var(--text-deepgray)',
        disabled: 'var(--text-disabled)',
        placeholder: 'var(--text-placeholder)',
      },
      fontSize: {
        heading1: 'var(--text-heading1)',
        heading2: 'var(--text-heading2)',
        heading3: 'var(--text-heading3)',
        heading4: 'var(--text-heading4)',
        body1: 'var(--text-body1)',
        body2: 'var(--text-body2)',
        detail: 'var(--text-detail)',
      },
      width: {
        base: 'var(--width-base)',
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 0.75rem)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 0.25rem)',
        sm: 'calc(var(--radius) - 0.5rem)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        input: 'var(--border-input)',
        activate: 'var(--border-activate)',
      },
      outlineColor: {
        activate: 'var(--border-activate)',
      },
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        bounceY: 'bounceY 1.5s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
