---
sidebar_position: 10
---

# How to work
* vscode
    * snippets
    * plugins - spell checker, css color picker, tslint, git graph, gitk, git lens (line history), jest auto run, markdown preview,
        auto close tag, zen, (path auto complete), (import sorter)
    * setups - tslint on save, (sort import on save)
    * always use - extract method (ctrl .), rename var (f2), multi cursor (alt click)

## Vscode tricks
* alt click; shift + ctrl + up ...multi cursor
* ctrl + . ...auto import
* ctrl + shift + P + pretty ...prettify command
* 🎃 TODO have snippets and lint rules :)

## Chrome extensions


## The truth about browser engines
- 95% of ES8 is supported in modern engines, and not using transpilation will make the code size much lower and code faster
- only chrome and safari [matters](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers#/media/File:StatCounter-browser-ww-monthly-202011-202011-bar.png) but they [have different engines](./browser_engines.png)

# What I learnt at Komix
* Angular, RXJS, reactive forms
* what I missed
    * code friend, senior to teach me great things (logging, techs, patterns, regime)

# What I learnt at Nangu
* total files : 3.2K
* total code lines : 150K
* what I missed
    * code friend, senior to teach me great things (logging, techs, patterns, regime)
* We have a big logger
  * i think better solution is to have two: consoleLogger, serverLogger. server logger is only for really bad stuff. console
  logger is for development and should be turned off in production.
  * server logger should log each error max 1x (remember error number on local storage)
  * in offline mode, server logger can keep a queue and send it when it comes back online. But it has to be limited in size!!!
  * server logger should only log really bad errors

# What I learnt from uncle Bob
* allow TDD to help you think about your code and architecture and split it well (not to have 100% coverage. I use tests in my advantage I don't force anybody)
* task = finish functionality, then refactor, and fix tech debt (e.g. tooling), then task is done - not sooner!

# How to write frontend
* after you finish a component
    * when somebody wants to continue, will he bloat the code? Did I extract everything into functions?
    * how will people want to change it in the future? let's make it configurable right now
    * will it survive when there is no data / 1000 data items / bad data come from server? (do not trust the server)
    * will it make a lot of / big network requests? (this includes analytics and server logging!)
    * will it re-render too much?
    * is it tested (e2e, logic, not component tests)?
* new project
    * auto-import, auto-lint plugin, lint rules, easy build, easy test script

# What I want at work
- a colleague for reviews
  - esp. about architecture (can be someone from a completely different project I don't care)
- refactor before the end of a task
  - if it was speed coding because of a deadline. Do demo from branch and then refactor after the deadline
  - architecture emerges with time
  - is it possible to exchange this part for a different one? (e.g. exchange db? parser? validator?)
  - if I add functionality later will something break?
- test driven



# Komix knowledge
* Angular, RXJS, reactive forms

# Nangu knowledge
* make customer versions/skins by
    * rewriting paths (webpack), requires absolute paths
    * don't try to share one react project for both mobile and web. You can make a lib and share that
* TODO cross platform, stuff that react native does not support
* positive UI is good :)
* firebase and subscription based data model (mobx, zen observable)
* route drive approach ... is it good? ...
* TS is definitely better than flow :)
* problem with OTT TV ... live manager is DDoSing our own servers wtf :D ... should be fixed on server side in my oppinion but whatever :)
* Make architecture diagrams!! don't use JDoc, ...only for special stuff, and @throws :)
* backend should not pretend like it is not related to FE. They should have a list of requests that FE is making and optimize for them :)
* We need a health monitor, especially when we have 5 customers
    * and devel, preprod, prod environments
    * there should be dedicated users for testers and for devs


# MORE
- always give unique names to coponents a possible -- goood for dev tools, good for ctrl+P everything is faster :)
- logging a vypinani loggeru per component ) a log levels )
- logger.disable()
- jak resit ze mam preklady pro vice zakazniku a chci byt schopnej jim to dat prolozit, ale taky chci dedit abych nemusel updatovat 12 soubori vzdy


# How to develop react
* before end of task:
  * check rerenders
  * put google analytics
