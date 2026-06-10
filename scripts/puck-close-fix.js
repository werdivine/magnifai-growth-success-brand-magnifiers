const fs = require('fs');

const file = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/lib/puck-config.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find the precise syntax error location for ROICalculator
// In the current file, it looks like:
//                 </Section>
//             )
//         },
// We just need to replace the single instance of the ROICalculator closing with the FadeIn closing

const badBlock = `                        <ROICalculator />\r
                    </div>\r
                </Section>\r
            )\r
        },`;

const fixedBlock = `                        <ROICalculator />\r
                    </div>\r
                </Section>\r
                </FadeIn>\r
            )\r
        },`;

const badBlockUnix = `                        <ROICalculator />\n                    </div>\n                </Section>\n            )\n        },`;

const fixedBlockUnix = `                        <ROICalculator />\n                    </div>\n                </Section>\n                </FadeIn>\n            )\n        },`;


if (content.includes(badBlock)) {
    content = content.replace(badBlock, fixedBlock);
    console.log('Fixed Windows CRLF closing tag.');
} else if (content.includes(badBlockUnix)) {
    content = content.replace(badBlockUnix, fixedBlockUnix);
    console.log('Fixed Unix LF closing tag.');
} else {
    // Fallback: Just look for ROICalculator block and close it safely using targeted replace
    const targetBlockRegex = /(<ROICalculator \/>[\s\S]*?<\/Section>)\s*\)/;
    if (targetBlockRegex.test(content)) {
        content = content.replace(targetBlockRegex, '$1\n                </FadeIn>\n            )');
        console.log('Fixed using fallback regex.');
    }
}

// Ensure no other stray </Section> is left unclosed if they got a FadeIn
// We know BookingWidget did NOT get a <FadeIn> open tag originally due to regex fail.
// So we don't need to close it.

fs.writeFileSync(file, content);
console.log('Syntax fix applied.');
