const fs = require('fs');
const css = fs.readFileSync('brighton_jones_app.css', 'utf8');

// Search for @font-face
const fontFaces = css.match(/@font-face\s*\{[^}]*\}/g) || [];
console.log('Font face declarations:', fontFaces);

// Search for external urls (images, woff, etc)
const urls = css.match(/url\(([^)]+)\)/g) || [];
const uniqueUrls = [...new Set(urls)];
console.log('External URLs sample (first 10):', uniqueUrls.slice(0, 10));
