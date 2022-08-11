---
sidebar_position: 11
---

# Know - index
Key takeaways about FE software engineering, techs and hacks

* [How to work](./readme_howtowork.md)

## Techs
* [Git](./readme_git.md)
* [React](./readme_react.md) redux, reselect
* [Mobx](./readme_mobx.md) very crude
* [Cypress](./readme_cypress.md) e2e testing
* [Graphql](./readme_graphql.md) and Apollo
* [Webpack](./readme_webpack.md)



## CI / (CD)
* Continuous integration = merge all the time even if it is unfinished, reduce git conflicts
* circle CI
  * 🐷 cannot assign local variables, but this can be worked around by using temp files
* gitlab CI
  * pipeline runs in a runner (online machine, that runs docker containers)
  * pipeline
    * has stages (default: build, test, deploy)
    * image: docker image w preinstalled programs
      * node image has also yarn
  * can define/assign local variables
    * defined for the job
    * assigned in steps of script
  * can defined env variables via UI, then paste them to .env file via a simple bash script
  * NPM deps can be cached outside of docker container
    * local temp
    * remote server


## Storybook
* supports all frameworks (React, Angular, ...)
* can pass variables to story (`Template.bind`)
* has custom config in `.storybook/main.js`
  * webpack config
  * babel config
  * storybook addons
* has common config for all stories
  * 🐷 `storybook/preview.js` this is the official way but does not support JSX. but there is a seconds way to do it, with  `story.decorators`



* TODO craco
* TODO Jest :)
  * - describe.only. it.only (like in cypress)
* TODO OAuth basics
* TODO react-native basics
* TODO what should be in a well designed FE system
  * styled theme
  * services and data in context
  * central error handler? sentry?
  * decouple entities from BE
* TODO Apollo
* TODO perks of Karma

- TODO write down small knowledge: redux thunk, recompost
- TODO nangu TChannel type 3x (subsets ... how to handle?)
- TODO performance reduxu v portalu?
-
- TODO google analytics (API)
  - multi customer/skin
- TODO positive vs negative UI and websocket vs rest api



KNOW


# Styled components
- styled styled components for them .attrs does not work ... it works only on the lowest level!
- props do not work if too many changes ... use attrs + `style: {}`
- when writing a library use prefix plugin TODO
- typing is a bitch TODO my github

* allow usage of CSS strings (cool easier to copy/paste)
* allow
* primitive vs custom components `styled.div`, `Styled(CustomComponent  < className= />)`
    * TODO how does it work with classes?
    * TODO how about typescript?
    * TODO createglobalStyle
    * TODO theming
    * TODO .attrs, `css`
* technical
    * styling results in a class `<button class="sc-AxiKw fXKynN">w fragment</button>` (fXKynN is the style hash,sc-AxiKw is just an identifier)
    * restyling results in a uniquer style hash `<h1 class="sc-AxiKw sc-AxhCb cwAsGP">with fragment</h1>`
    and multiple identifiers (sc-AxiKw sc-AxhCb)
    * style hash is unique per interpolated instance
            `<span color="green" class="sc-AxgMl iBcRje">green text</span>
            <span color="red" class="sc-AxgMl dCnCWa">red text</span>
            `





- TODO how to make JS lib with subdirectory imports (e.g. like lodash)
- TODO how namespaces work for overriding types? it seems i cannot module 'yargs' namespace 'helpers' , i have
  - have to use module 'yargs/helpers' and I'm like wtf?

# DUMP: -----------------------------------------------------

## JEST
- jest focusmanager
- jest, fail, mock bunch of shit :)
- jest strange syntax
- expect(async () => {
            const firebase = new Firebase({
                apiKey: '',
                authDomain: '',
                databaseURL: '',
                projectId: '',
                storageBucket: '',
                messagingSenderId: '',
                appId: '',
            })

            const doc = await firebase.getFirestore()
        }).rejects.toThrow()
- jest.useFakeTiemrs + jest.runAllTimers vs. runONlyPendingTimers
- TODO how to await in jest test inside funciton? - testawaiter promise :)
- TODO how to [debug](https://artsy.github.io/blog/2018/08/24/How-to-debug-jest-tests/) ... also the plugin has debug support so try that?

## Linux shortcuts
* `win L` lock
* `win D` hide all
* `win ~` sleep (custom)

## Linux bash
```bash
rm -rf folder
chmod 777 -R folder
ps
ls -la
apt update; apt list; apt install xxx;
# Ctrl R search
# Ctrl C
# man command
```


linux
- rm -rf
- chmod -R 777 .
- nice -n 7 ...



# Yarn v1
- `yarn link` is great. Just does a symlink to the lib
- 🐷 `yarn link` does not work for libs with `react` peerDependency. It is actually not so much `yarn`s fault ad `webpack`s fault I think. Webpack bundles the lib and sees it depends on react so it searches the nearest react and takes the one from devDependencies of the lib. Can be fixed by webpack config. [fix](https://github.com/facebook/react/issues/14257)
- TODO npm conflict resolution [src](https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f)

# YARN (v2)
* care: yarn and npm cannot be used together (package.json.lock conflicts with yarn.lock)
* TODO what is new in yarn 2
* TODO how to do npx in yarn?
* compared to npm should be a little faster
* TODO lock files?
* TODO flats - which one to choose?
    * `yarn install --flat` force only one version of each packages ...this may not be feasible
    * npm does deduplication (according to version ranges) automatically. There is also `npm dedupe` to do the same ... not sure if it is used during resolution or not
    * TODO webpack also fucks this up? seems so :D
* `yarn why` find out why a module was installed
* yarn workspaces allows to develop app and lib in one project. It does automatic `yarn link`. Good for monorepo
    * `yarn link; yarn link @tivio/utils` to develop a lib
* `npx create-react-app` downloads and executes (also caches)
* TODO why ranges if we have bullshit
YARN WORKSPACES
- never use `yarn add @local` !!!!! it will always take from npm, thats the exact opposite of what we want ... if you use `yarn add @local@1.2.3` (specific version), then it will take the file which is local thank you very much :)`
- TODO how yarn lock works exactly?`

* TODO eslint
  * sort-import

# Lerna
* TODO use independent mode
* TODO don't know what bootstrap does






# CSS
* TODO how to do multiple resolutions?
* TODO master the flex
* TODO master animations ... there is a library ...but also, just know what and when :)
- toolbox
  - center both `display: flex; align-items: center; justify-content: center;`
  - full screen `position: absolute; top: 0; bottom: 0; right: 0; left: 0;`
  - ellipsis `text-overflow: ellipsis; overflow: hidden; whitespace: nowrap; width: 100px;` and `alt=xxx`
  - use precentages for width`box-sizing: border-box;`
  - spill over container `margin: -20px` or matrioshka `positon: relative;` and `position: absolute; top: -20px`
  - justify right `display: flex; flex-direction: row; justify-content: flex-end;`
  - shadow on text or element or image `filter: drop-shadow(right top blur color);`
- 🐷 all the above should be fucking simpler :)
# General designs
* do not use modular singletons in react ... use the context instead :)
* TODO lazy data loading hocs or no?? .... I have to wait ( but no data loaded redundantly )
* TODO component lib lada vs javascript


# Create React app 3.4.1
`npx create-react-app --template typescript`
* 🐷 it needs additional installs and config
```
    npm i -d @types/react`
    npm i -d @types/react-dom`
```
tsconfig: "noImplicitAny": false,


* TODO source maps and bullshits




-------------------

# TODO points of interest
* react-native - yes it uses react but in a retarded way
  * can be improved by styled-components
* PWAs - they look great, but in the browsers they are hidden as shit :I



# TODO how to architect and tool
# TODO global error catching, sentry, server logging
* window.onerror
* react error boundary
* input database-coupled data types etc. :)
* ser/deser (hydration/dehydration)




# HTML and CSS tips
- 🐷 `animation-fill-mode: both` animate in, stay there. Why the fuck is this not default?
- boxSizing: BorderBox
- 1vw, 1rem
- `<video/>` does not support adaptive video HLS, DASH, etc. (Use Shaka, but why JWPlayer is so much better at startup?)
- on mouse leave /out, enter over
- negative margin
- ResizeObserver
- box-sizing border box
- mobile resolutions are very large, but in reality they have a small amount of [CSS pixels](https://medium.com/@flik185/understanding-device-resolution-for-web-design-and-development-3bb4a5183478). E.g. 370 CSS px -> 1080 rendered px -> 980 device px after down-sampling. This is the effect of `pixel ratio` and extra `down sampling`.
  - therefore small media queries really work and can be used for responsive web :)
  - on the other hand we should use high resolution image assets (e.g. 1920x1080 but display them in a container of 600x400 px)


NPM
# Libs
* peerDependencies have to be also in devDependencies of lib ) - picovina
* if consumer does not install peerDependencies, it is not an error. It is just a warning!!



# AMD, UMD, require (a little bit about writing libs and/or fixing libs :)
- and related problems (using library)
- node.js
vyvyjim reactovou knihovnu
- peerDependencies: react
- devDependencies: react (jinak mi to nepujde testovat)
- webpack.config.js resolve.alias: { react: require.resolve("react") }



# react native
* flipper https://fbflipper.com/

# UX
* always use spinners! (maybe after 100ms delay)
- dobry UX: delayovane akce, naopak preloadovana data, neviditelnej hover margin, animace, delayovane animace
- pred odevzdanim - projit console.log, rerendering, profiler ram consumption, UX responsivity


# Sentry


(only necessary for JSX/TSX)
https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics


npm publish --tag alpha" (for alpha, beta channel .. otherwise 2.1.2.alpha.1 will be presented as latest stable and that is shit)


# Writing node.js & browser code
- use `if (typeof window !== 'undefined')`. typeof takes any symbol, does not matter if it exists or not
- checking `if (window) {}` throws `ReferenceError: window is not defined` because this global variable does not exist in node (actually both browser and node behave like this so e.g. `if (xxx)` will throw `ReferenceError: xxx is not defined` in the browser)



# Jest

await expect
```
it('invalid uri returns false', async () => {
    await expect(async () => {
        const mp4 = 'https://cdn.flashtalking.com/161990/Braun.txt'
        await supportsProgressiveDownload(mp4)
    })
        .rejects
        .toThrow('HTTP error 404');
})
```
