import cluster from 'cluster';
import { pid } from 'process';
import { cpus } from 'os';

const multiServer = async () => {
  if (cluster.isPrimary) {
    const cpusQuantity = cpus().length;

    console.log(`Master pid: ${pid}`);
    console.log(`CPUs quantity is ${cpusQuantity}`);

    for (let i = 0; i < cpusQuantity; i += 1) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
      cluster.fork();
    });
  } else {
    await import('./index.js');
  }
};

multiServer();
