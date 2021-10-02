/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// does not currently work for some reason not sure why it won't connect. error is that it is trying to connect to username as DB
const db = require('../../models/model')


module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

module.exports = async (on, config) => {
  on('task', {
    async "dbDestroyUser"() {
      // cy.task('log')
      // console.log(db)
      // console.log(db)
      // await db.sequelize.sync()
      return true
      // await db.Patients.destroy({
      //   where: {},
      //   truncate: true
      // })
    }
  })
  on('task', {
    log(message) {
      console.log(message)
      return null
    }
  })
}