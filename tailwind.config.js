const buildList = (length, indicator, multi = 10) => {
  const json = Array(length)
    .fill(0)
    .reduce((prev, current, index) => {
      let str = prev;
      index++;

      if (index === 1) str = '{';
      str += `\"${index * multi}\": \"${index * multi}${indicator}\"`;

      if (index === length) return str + '}';
      else return str + ',';
    }, '');

  return JSON.parse(json);
};

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        success: '#1abc9c',
        danger: '#e74c3c',
        warning: '#fcbf00',
      },
      spacing: {
        ...buildList(50, 'px', 50),
        screen: '100vh',
      },
      minWidth: {
        ...buildList(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
      },
      maxWidth: {
        ...buildList(40, 'px', 50),
        full: '100%',
        screen: '100vw',
        unset: 'unset',
      },
      minHeight: {
        ...buildList(40, 'px', 50),
        full: '100%',
        screen: '100vh',
        unset: 'unset',
      },
      maxHeight: {
        ...buildList(40, 'px', 50),
        full: '100%',
        screen: '100vh',
        unset: 'unset',
      },
      zIndex: {
        ...buildList(10, '', 10),
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
