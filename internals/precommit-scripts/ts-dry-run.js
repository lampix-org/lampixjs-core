const { exec, execSync } = require('child_process');
const diff = execSync(`git diff --name-only --staged`).toString();

console.log('Looking for *.ts files...');
if (!diff || diff.indexOf('.ts') === -1) {
  console.log('No *.ts files found.');
  process.exit();
}

console.log('Checking *.ts files for errors...');
exec('npm run ts-dry-run', { stdio: 'inherit' }, (err, stdout, stderr) => {
  if (err) throw new Error(stdout);
});
