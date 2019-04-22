#! /usr/bin/env node

const commander = require('commander');
const upgrade = require('./upgrade')

commander.on('command:*', () => {
  console.log(commander.args.join(' '));
  process.exit(1);
});


const cmd = commander
  .command('upgrade')
  .description("Upgrade your app's template files to the specified or latest npm version using `apollos-upgrade` project. Only valid semver versions are allowed.")
  .action(function (...args) {
    const passedOptions = this.opts();
    return Promise.resolve(upgrade(passedOptions)).catch(e => console.warn(e));
  })

const options = [{
    command: '--from [string]',
  },
  {
    command: '--to [string]',
  },
  {
    command: '--platform [api|client]'
  },
  {
    command: '--projectName [string]'
  },
  {
    command: '--packageName [string]'
  }];

options.forEach((opt) => {
  cmd.option(
    opt.command
  )
})

function setupAndRun() {
  commander.parse(process.argv);
}


setupAndRun();