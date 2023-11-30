const fs = require("fs").promises;
const path = require("path");

const BoilerHTML = (content, fileName, header) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${fileName}</title>
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body>
      ${header && header}
      ${content}
    </body>
    </html>
  `;
  return html;
};

exports.StaticGeneration = async (content, fileName, header) => {
  const html = BoilerHTML(content, fileName, header);
  const publicDir = path.join(__dirname, "public");
  const filePath = path.join(publicDir, `${fileName}.html`);
  try {
    // Ensure 'public' directory exists
    await fs.mkdir(publicDir, { recursive: true });
    // Write HTML file
    await fs.writeFile(filePath, html);
    return filePath;
  } catch (error) {
    console.error(`Error writing file for ${fileName}:`, error);
    throw error;
  }
};
