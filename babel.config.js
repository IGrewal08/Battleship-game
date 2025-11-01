module.exports = {
  // Use the env preset to handle modern JavaScript features
  presets: [
    [
      '@babel/preset-env',
      {
        // Tell Babel to target the current version of Node.js 
        // which runs Jest, ensuring compatibility.
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};