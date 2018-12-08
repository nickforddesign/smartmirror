const path = require('path')
const webpack = require('webpack')
const env = require('./env/env.json')

console.log(typeof env.mbta)

module.exports = {
  lintOnSave: 'error',
  chainWebpack: config => {
    config.entry('app')
      .clear()
      .add('./src/js/main.js')
    config.resolve.alias
      .delete('@')
      .set('@', path.resolve(__dirname, 'src/js'))
      .set('%', path.resolve(__dirname, 'src/scss/modules'))
    config.plugin('define')
      .use(webpack.DefinePlugin, [
        {
          'process.env.MBTA_KEY': JSON.stringify(env.mbta),
          'process.env.OPENWEATHERMAP_KEY': env.openWeatherMap
        }
      ])
  }
}
