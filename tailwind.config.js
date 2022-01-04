function generateKeys(length, indicator, multi = 10, negative = false) {
  const obj = {};

  for (let i = 0; i < length; i++) {
    obj[i] = `${i * multi}${indicator}`;
    if (negative) obj['-' + i] = `-${i * multi}${indicator}`;
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
        kitsu: {
          DEFAULT: '#402F3F',
        },
        success: '#1abc9c',
        danger: '#e74c3c',
        warning: '#fcbf00',
      },
      spacing: {
        ...generateKeys(50, 'px', 50),
        screen: '100vh',
        unset: 'unset',
        full: '100%',
      },
      zIndex: {
        ...generateKeys(10, '', 10),
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
