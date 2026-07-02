const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/>ROC WINDOWS</g, '><img src="images/logo.png" alt="Roc Windows" class="h-8 md:h-12 w-auto inline-block"><');
    fs.writeFileSync(f, c);
});
console.log('Done replacing logos in ' + files.length + ' files');
