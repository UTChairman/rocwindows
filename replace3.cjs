const fs = require('fs');
const path = require('path');
const dir = '.';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== '404.html');

files.forEach(file => {
    let c = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // The footer uses headline-md. Let's find it.
    // Replace all logos inside headline-md to h-16 md:h-24
    // Since we know the HTML structure:
    // class="text-headline-md ..."><img src="images/logo.png" alt="Roc Windows" class="h-12 md:h-16 w-auto inline-block">
    c = c.replace(/(headline-md[^>]*>\s*<img src="images\/logo\.png" alt="Roc Windows" class=")h-12 md:h-16/g, '$1h-16 md:h-24');
    
    fs.writeFileSync(path.join(dir, file), c);
});
console.log('Footers fixed');
