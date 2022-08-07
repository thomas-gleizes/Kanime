function generateKeys(length, indicator, multi = 10, negative = false) {
  const obj = {};

  for (let i = 0; i < length; i++) {
    obj[i * multi] = `${i * multi}${indicator}`;
    if (negative) obj[`-${i * multi}`] = `-${i * multi}${indicator}`;
  }

  return obj;
}

module.exports = {
  mode: 'jit',
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        primary: {
          light: '#64171E',
          DEFAULT: '#541218',
          dark: '#430F14',
        },
        secondary: {
          light: '#64171E',
          DEFAULT: '#541218',
          dark: '#430F14',
        },
        tertiary: {
          light: '#64171E',
          DEFAULT: '#541218',
          dark: '#430F14',
        },
        success: '#1abc9c',
        danger: '#e74c3c',
        warning: '#fcbf00',
        kitsu: {
          DEFAULT: '#402F3F',
          dark: '#332532',
        },
      },
      spacing: {
        ...generateKeys(50, 'px', 50),
        unset: 'unset',
        full: '100%',
        header: '56px',
        banner: `${400 - 56}px`,
        inherit: 'inherit',
      },
      minWidth: {
        ...generateKeys(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
        inherit: 'inherit',
      },
      maxWidth: {
        ...generateKeys(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
        inherit: 'inherit',
      },
      minHeight: {
        ...generateKeys(50, 'px', 50),
        full: '100%',
        screen: '100vh',
        unset: 'unset',
        inherit: 'inherit',
      },
      maxHeight: {
        ...generateKeys(50, 'px', 50),
        full: '100%',
        screen: '100vh',
        unset: 'unset',
        inherit: 'inherit',
      },
      zIndex: {
        ...generateKeys(11, '', 10, true),
        inherit: 'inherit',
      },
      lineClamp: {
        ...generateKeys(20, '', 1),
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked', 'disabled', 'group-focus'],
      backgroundOpacity: ['group-focus'],
      borderWidth: ['group-focus'],
      opacity: ['group-focus'],
      borderColor: ['checked', 'disabled'],
      boxShadow: ['active'],
      rotate: ['group-focus'],
      inset: ['hover', 'focus', 'group-focus'],
      display: [
        'children',
        'default',
        'children-first',
        'children-last',
        'children-odd',
        'children-even',
        'children-not-first',
        'children-not-last',
        'children-hover',
        'hover',
        'children-focus',
        'focus',
        'children-focus-within',
        'focus-within',
        'children-active',
        'active',
        'children-visited',
        'visited',
        'children-disabled',
        'disabled',
        'responsive',
      ],
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};
