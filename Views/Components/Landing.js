const { StaticGeneration } = require("../Boilerhtml");

const header = require("./Header");

async function getLanding() {
  const content = `<div style="margin:0;padding:0">this was the frontpage or you can say landing page</div>`;
  const headers = header();
  const htmlFile = await StaticGeneration(content, "Home", headers);
  return htmlFile;
}

module.exports = getLanding;
