const fs = require('fs');
const path = require('path');
const dir = '.';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== '404.html');

files.forEach(file => {
    let c = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Remove the hamburger menu icon
    c = c.replace(/<span class="[^"]*" data-icon="menu">\s*menu\s*<\/span>\s*/g, '');
    
    // Update header logo size (was h-8 md:h-12) to h-12 md:h-16
    c = c.replace(/(class="[^"]*headline-sm[^"]*"(?:[^>]*>|.*?)<img src="images\/logo\.png" alt="Roc Windows" class=")h-8 md:h-12 w-auto inline-block(")/gs, '$1h-12 md:h-16 w-auto inline-block$2');
    
    // Update footer logo size (was h-8 md:h-12) to h-16 md:h-24
    c = c.replace(/(class="[^"]*headline-md[^"]*"(?:[^>]*>|.*?)<img src="images\/logo\.png" alt="Roc Windows" class=")h-8 md:h-12 w-auto inline-block(")/gs, '$1h-20 md:h-24 w-auto inline-block$2');
    
    fs.writeFileSync(path.join(dir, file), c);
});
console.log('Modifications applied');
