/**
 * 
 */
const cypress = await import('../node_modules/cypress/lib/cypress.js');

//console.log(`cypress: ${cypress}`)
//console.log(`cypress.run: ${cypress.run}`)
cypress.default.run({
  // the wildcard path is relative to the current working directory
  spec: './*.test.mjs',
})
console.log("Done");