const fs = require('fs');
const css = fs.readFileSync('brighton_jones_app.css', 'utf8');

// Match hex colors
const hexColors = css.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
const uniqueColors = [...new Set(hexColors)];
console.log('Hex Colors:', uniqueColors);

// Match font families
const fonts = css.match(/font-family:[^;]+/g) || [];
const uniqueFonts = [...new Set(fonts)];
console.log('Font Families:', uniqueFonts);

// Match main selectors
const classes = css.match(/\.[a-zA-Z0-9_-]+(\s|\{|,)/g) || [];
const uniqueClasses = [...new Set(classes.map(c => c.trim().replace(/\{|,/, '')))];
console.log('Top classes sample (first 100):', uniqueClasses.slice(0, 100));
