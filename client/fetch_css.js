const fs = require('fs');

const cssUrl = 'https://www.brightonjones.com/wp-content/themes/brightonjones/assets/css/app.min.css';

fetch(cssUrl)
  .then(res => res.text())
  .then(css => {
    fs.writeFileSync('brighton_jones_app.css', css);
    console.log('Successfully saved brighton_jones_app.css. Length:', css.length);

    // Let's search the css for some keywords and print summary
    const matches = css.match(/dashed/g);
    console.log('Dashed occurrences in CSS:', matches ? matches.length : 0);

    const maskMatches = css.match(/\.bg-mask/g);
    console.log('bg-mask class in CSS:', !!maskMatches);
  })
  .catch(err => console.error(err));
