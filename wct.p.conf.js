module.exports = {
  verbose: true,
  persistent: true,
  plugins: {
    local: {
      skipSeleniumInstall: false,
      browsers: ["chrome", "firefox"]
    },
    sauce: false
  }
}
