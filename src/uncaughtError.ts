export default () => {
  process.on('uncaughtException', (err: NodeJS.UncaughtExceptionListener) => {
    console.error('Uncaught error happened', err);
  });
};
