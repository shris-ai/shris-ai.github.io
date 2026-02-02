/**
 * Deploy dist/ to gh-pages branch with dotfiles and .nojekyll so GitHub Pages
 * serves the built site as-is (no Jekyll). Required for /blog/ and _astro/ to work.
 */
const ghpages = require('gh-pages');

ghpages.publish('dist', {
  dotfiles: true,
  nojekyll: true,
}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Deployed to gh-pages (with .nojekyll). Wait 1–2 min then check https://shris-ai.github.io/blog/');
});
