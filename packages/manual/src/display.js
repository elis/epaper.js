const { ConsoleLogger } = require('@epaperjs/cli/dist/consoleLogger')
const { DisplayCommand } = require('@epaperjs/cli/dist/commands/display')


console.log('Console logger?', { ConsoleLogger })
console.log('DisplayCommand?', { DisplayCommand })
const logger = new ConsoleLogger()
const display = new DisplayCommand(logger)
let rounds = 20
const run = async () => {
  await display.execute({
    deviceType: 'rpi-7in5b-v2',
    // orientation: 'v', 
    // colorMode, 
    url: 'http://localhost:3000',
    dither: true
  })
  console.log('Display executed')


  console.log('Display disposed')
  // if (rounds--) {
  console.log('Setting timeout', rounds)
  setTimeout(() => run(), 10000)
  // }
}


run()

// display.dispose()