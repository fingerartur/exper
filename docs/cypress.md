---
sidebar_position: 5
---

# Cypress

* cypress works with command chains (e.g. `cy.get()...`)
  * they work amazingly for async stuff - get waits up to 4s for the element to appear
  * command chains have `then`, but are not promises (we cannot `await`!)
    ```js
        cy.get('table').then(value => {
            cy.get('').then(...)
        })
    ```
    * possibly could be mitigated by `npm i cypress-promise`
* `cy.get()` waits, scrolls to view, fails the test if element is not found
* increase timeout `cy.get(..., { timeout: 10000 })`
* selectors use jQuery ... jQuery can be accessed directly via `Cypress.$`
* `cy.get().should('exist').should('not.have.class', 'cls')` if we use negative assertions, we have to assert
    existence (it is no longer automatic)
* `cy.get().then($elemnt => ...)` access jquery element
* `cy.get().its('opacity').should('eq', 1)`
* `cy.writeFile('menu.json')`

## Testing REST API

* `cy.request('/admin').its('body').should('include', '<h1>Admin</h1>')` for REST API testing

## Examples

```js
cy.get('.e2e-xxx').click()

cy.visit('/')
cy.window().then(window => { // undefined before first visit
    const xxx = window['e2e-xxx']
})

cy.fixture('base').then(fixture => {})
cy.get('@alias').then(value => {})


// debugging
cy.get('body').debug() // + F12
cy.visit('/').debug()
cy.pause()
// cy.log() is bullshit it only works for string and only 2 args

cy.viewport(550, 750)

cy.contains("Ice Age", { matchCase: false }) // always use matchCase false :)

```

```json
// cypress.json
{
  "baseUrl": "http://localhost:3000"
}
```

## Best practices
* use longer tests instead of many short ones (resetting context is quite slow)
* do not use after/afterEach (bc. you can refresh during test, and also it is good to have dangling state for debugging)
* [login by request example](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__html-web-forms/cypress/integration/logging-in-html-web-form-spec.js)
* [login by code example](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__using-app-code/cypress/integration/spec.js)

## Implementation details
* cypress
    * 1 `<iframe>` for your app (http://localhost:3000/)
    * 2 `<iframe>` from your spec (http://localhost:3000/...)
    * localStorage is per origin (schema://hostname:port), so it is shared
* cypress clears cookies and localStorage before each test
  * local storage can be [saved](https://blog.liplex.de/keep-local-storage-in-cypress/#:~:text=When%20using%20cypress%20for%20tests,lot%20of%20time%20by%20design)
* the test case only CREATES command chains, they are queued and AFTER the unit test finishes execution,
    the command chains are executed one by one


# TODO
* TODO cy.server(), cy.exec, cy.task
* TODO how to inject /change env / vars
* TODO best practices
