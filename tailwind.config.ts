import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const spacings: { [key: string | number]: string } = {
  unset: 'unset',
}
for (let i = -100; i < 500; i += 0.5) {
  spacings[i] = `${i / 4}rem`
}

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: spacings,
      fontFamily: {
        primary: ['OpenSans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#4474FF',
        dark: '#121212',
        light: '#ECF2FF',
        gray: {
          DEFAULT: '#545454',
          c4: '#c4c4c4',
          f7: '#f7f7f7',
        },
      },
    },
  },
} satisfies Config;
