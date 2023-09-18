const execSync = require('child_process').execSync;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkAndInstallDependencies() {
  try {
    exec('npm ls express --depth=0', { stdio: 'ignore' });
  } catch (error) {
    console.error('Express не встановлено. Встановлюємо...');
    exec('npm install express --save');
  } finally {
    console.log('Express встановлено');
  }
}

checkAndInstallDependencies();


rl.question('Press Enter to exit...', () => {
  rl.close();
});
