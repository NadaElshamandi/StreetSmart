const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async function fetchData(url) {
  const response = await fetch(url);
  return response.text();
};

// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      const worker = require('./worker');
      
      // Use spawnSync to run worker synchronously
      const cssContent = JSON.parse(require('child_process')
        .spawnSync(process.execPath, [require.resolve('./worker'), 'your-url'])
        .stdout.toString());

      // Add utilities based on fetched data
      const utilities = parseCSS(cssContent);
      addUtilities(utilities);
    })
  ]
};