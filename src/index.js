#! /usr/bin/env node

const commander = require('commander');
const upgrade = require('./upgrade')

commander.on('command:*', () => {
  console.log(commander.args.join(' '));
  process.exit(1);
});

const addCommand = (command) => {
  const options = command.options || [];

  const cmd = commander
    .command(command.name)
    .description(command.description)
    .action(function handleAction(...args) {
      const passedOptions = this.opts();
      const argv = Array.from(args).slice(0, -1);

      Promise.resolve()
        .then(() => {
          return command.func(argv, {}, passedOptions);
        })
        .catch((e) => console.error(e));
    });

  options.forEach(opt =>
    cmd.option(
      opt.command,
      opt.description,
      opt.default,
    ),
  );
}

function setupAndRun() {
  [upgrade].forEach(command => addCommand(command));
  console.log(process.argv)
  commander.parse(process.argv);
}


setupAndRun();