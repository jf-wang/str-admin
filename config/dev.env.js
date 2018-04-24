var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"https://www.easy-mock.com/mock/5aa738efcbd0e55803e5e705/lists"'
})
 