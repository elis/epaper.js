const { ConsoleLogger } = require('@epaperjs/cli/dist/consoleLogger')
const { DisplayCommand } = require('@epaperjs/cli/dist/commands/display')


console.log('Console logger?', { ConsoleLogger })
console.log('DisplayCommand?', { DisplayCommand })
const logger = new ConsoleLogger()
const display = new DisplayCommand(logger)
const run = async () => {
  let rounds = 5
  await display.execute({
    deviceType: 'rpi-7in5b-v2',
    // orientation, 
    // colorMode, 
    url: 'http://localhost:3000',
    // dither
  })
  console.log('Display executed')


  console.log('Display disposed')

}


run()
// display.dispose()