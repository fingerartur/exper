---
sidebar_position: 8
---

# Graphql

## Compared to REST API
* simpler - just query a mutate (not POST,PUT,DELETE,GET)
* query can be deep (e.g. give me user, and all friends and all his cars)
    * because here can be nested pagination, people usually used `edges.node` [convention](https://relay.dev/graphql/connections.htm)
    this gives me a cursor for pagination
* fully typed
* very easy to document (graphiql)
* can be versionless, but not automatically [src](https://www.youtube.com/watch?v=fBkmlFfwRu0)
    - evolve schema by adding attributes or params. For this we have to use best practices that allow adding. The new client
    has to wait until the BE is rolled out!
    - addability:
      - make objects deep (image.uri instead of imageUrl)
      - use arguments (e.g. `desription(lang: "eng", format: "object | string")`)
      - use `edges.node` for
        - paginated stuff
        - relationships (e.g. recommended items - add similarity measure (metadata) into edges)

## WTFs
* 🐷 graphql data types are always optional by default. Non null types can be awkward to write (e.g. `[User!]!`)
* 🐷 graphql query validation makes it impossible to use non-existing attributes. The server has to be deployed before
    FE!

https://stackoverflow.com/questions/59891325/apollo-client-cache-vs-redux
apollo cache has reactive variables
- in my estimate it is not better than redux... maybe if you keep them in react context it could work??
- links
- context?

# Apollo
* fetch policies
    * `cache-fist` ...from cache (old data) 🐷 default - big source of bugs lol
    * `cache-and-network` ...returns 2x ✔️ use this
    * `network-only`
    * `no-cache` ...does not update cache
    * `cache-only`
* 🐷 there are some articles that Apollo can be used for local stat ... it can't be fuck off :) 🎃 TODO why was that?
* 🎃 TODO writing to cache :)

# 🎃 TODO @apollo/client, @apollo/cache
* 🐷 funny they renamed the lib from apollo-cache, now people who just use yarn upgrade won't notice it
* 🐷 default fetch policy is `cache-fist`. Oops it does not fetch correct data but whatever `cache-and-network`
* 🐷 on Samsung TV, writing to cache can take 5s (old browser, or little RAM?)

# Compared to Websocket - TODO

# RPC style API (Badoo)
- is RPC styled (like REST API + JSON, but it is stateful - it has an init() call)
- 2 strategies
  - feature negotiation (client supports this and this) + dashboard of client version, BE feature
  - bad old property and good new property live alongside
  - a/b config - client has IFs

# Firestore client
- websocket, client side caching for offline access :)
