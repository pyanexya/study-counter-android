const { spawn } = require('node:child_process');
const newman = require('newman');
const server = spawn(process.execPath, ['server.cjs'], { cwd: __dirname, env: { ...process.env, PORT: '3107' } });
server.stderr.pipe(process.stderr);
const timer = setTimeout(() => { server.kill(); process.exitCode = 1; console.error('Server startup timeout'); }, 15000);
server.stdout.once('data', data => {
  clearTimeout(timer); process.stdout.write(data);
  newman.run({ collection: require('./users.postman_collection.json'), envVar: [{ key: 'baseUrl', value: 'http://127.0.0.1:3107' }], reporters: ['cli', 'json'], reporter: { json: { export: __dirname + '/test-results.json' } } }, (err, summary) => {
    server.kill(); process.exitCode = err || summary.run.failures.length ? 1 : 0;
  });
});
