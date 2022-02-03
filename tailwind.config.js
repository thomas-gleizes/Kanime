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
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
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
      },
      minWidth: {
        ...generateKeys(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
      },
      maxWidth: {
        ...generateKeys(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
      },
      minHeight: {
        ...generateKeys(50, 'px', 50),
        full: '100%',
        screen: '100vh',
        unset: 'unset',
      },
      maxHeight: {
        ...generateKeys(50, 'px', 50),
        full: '100%',
        screen: '100vh',
        unset: 'unset',
      },
      zIndex: {
        ...generateKeys(11, '', 10, true),
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
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
    },
  },
  plugins: [],
};
