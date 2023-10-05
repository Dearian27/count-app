import { exec, execSync } from 'child_process';
import readline from 'readline';
// import open from 'open';


// execSync('npm start');

const PORT = 8879;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(() => {
  try {
    execSync('npm ls express --depth=0');
  } catch (error) {
    console.error('Express не встановлено. Встановлюємо...');
    execSync('npm install express --save');
  } finally {
    console.log('Express встановлено');
  }
  
  console.log('Завантаження сервера...');
  const server = exec('npm start', (error, stdout, stderr) => {
    if (error) {
      console.error('Помилка завантаження сервера: ', error);
    }
  });
  console.log('Сервер завантажено!')
})();

async function checkAndInstallDependencies() {
  // try {
  //   execSync('npm ls express --depth=0');
  // } catch (error) {
  //   console.error('Express не встановлено. Встановлюємо...');
  //   execSync('npm install express --save');
  // } finally {
  //   console.log('Express встановлено');
  // }
  
  // console.log('Завантаження сервера...');
  // const server = exec('npm start', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error('Помилка завантаження сервера: ', error);
  //   }
  // });
  // console.log('Сервер завантажено!')



  // open(`http://localhost:${PORT}`);
  //open може не працювати на деяких платформах

  
  // server.stdout.on('data', (data) => {
  //   if (data.includes('Server started')) {
  //     rl.question('Press Enter to exit...', () => {
  //       rl.close();
  //     });
  //   }
  // });
}

checkAndInstallDependencies();

// rl.close();