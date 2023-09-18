const { exec, execSync } = require('child_process');
const readline = require('readline');
const spinners = require('cli-spinners');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function checkAndInstallDependencies() {

  try {
    execSync('npm ls express --depth=0');
  } catch (error) {
    console.error('Express не встановлено. Встановлюємо...');
    execSync('npm install express --save');
  } finally {
    // clearInterval(loadingInterval);
    console.log('Express встановлено');
    console.log('Завантаження сервера...');

    const server = exec('npm start', (error, stdout, stderr) => {
      if (error) {
        console.error('Помилка завантаження сервера: ', error);
      }
    });

    server.stdout.on('data', (data) => {
      if (data.includes('Server started')) {
        rl.question('Press Enter to exit...', () => {
          server.kill(); // Stop the server process
          rl.close();
        });
      }
    });
  }
  // try {
  //   exec('npm start');
  // } catch (error) {
  //   console.error('Помилка завантаження сервера: ', error);
  // }
}

checkAndInstallDependencies();

rl.question('Press Enter to exit...', () => {
  rl.close();
});
