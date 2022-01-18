// @ts-ignore
const run = async () => {};

run()
  .then(() => console.log('script is finish with success'))
  .catch((e) => console.error('Script error :'))
  .finally(() => process.exit(1));
