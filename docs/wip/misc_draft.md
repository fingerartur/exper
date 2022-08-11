---
sidebar_position: 8
---

KNOWLEDGE

React
- hooks
- useImperativehandle + forwardRef to make refs
- useRef for private fields
- useCallback for private and aync methods
- useEffect is after render
‣ useLayoutEffect to synchronize with UI
‣ log inside useEffect, in the body of function it logs 2x (maybe just in debug mode but anyway)
- useMemo instead of memoize-one
React WTF
- animation names are global
- hover style very difficult to do lol
- TODO strips html entities?

styled-compoents
- use wrapper element for hover

TESTING
- testing of hooks
- enzyme
- it is not about testing functionality
- it is using code in a second way => better api
- forces to break code to 100 line files
- forces to break into functions
- prevents one class from doing two things / concerns

FIRESTORE
- max one range query per query
- no joins
- sub-collections exist but we don't need em
- JSON/array can be as attr

DASH vs HLS
- supported by borwsers OK (not safari, not android https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Live_streaming_web_audio_and_video)
- HLS - .m3u8 playlist points to other pieces of playlist and to chunks of different birates. url: xxx.m3u8 (https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming)
- sample m3u8 https://github.com/grafov/m3u8/blob/master/sample-playlists/master-with-stream-inf-1.m3u8
- MPEG-DASH -
-  use .mpd playlist works same as m3u8 and it is standardized XML
‣ sample .mpd https://gist.github.com/shankardevy/cfe77acd9fe7bded116c



VAST
Tizen, LG api packaged app / problems
firebase/firestore
ABS - adaptive bitrate streaming DASH, HLS, Shaka player
UI
- positive
- use WebSocket for data always
- use animation to slow user down
- TODO animation templates
HOCs, redux, middleware, mobx
create-react-library

Profiling (react, js)
memoize-one, zen-observable

NAVRHOVE VZORY
* servicy psat vzdy jako classu - lepe se importuje, lze instancovat znovu!


TODO
- firebase functions
- react native
- yarn workspaces
- apollo, graphql


IDE CONFIG
- TODO plugins
- TODO (make user snippets)
- TODO shortcuts
- styled-components hover parent and hover child
- babel root-import
- global animation names

yarn vs NPm
- small babel and presets


CO ME ZPOMALUJE
- new line, strednik, komentare funkci, zakazanej console.log
- flow je boolnean, ts/js language support to opravi na Boolean
- string musi byt single quote (aka nemuze byt `` ... pak to chci zmeni a mrda me to)



LERNA
- gitHEAD is what?
- how to use learn well?
- lerna doesn't bump peerDependencies, which is ok, bc. only React etc. should be peer dependency
- bad
- lerna publish bumps and publishes all (even unchanged packages) I think ... not nice TODO
- lerna publish seems to be rebuilding everything ... this is too fucking long

NPM
- npm dependencies
- use peerDependency if your lib exports something that depends on a particular verions of eg. react npmjs.com/package/i18n-js
- dependencies have their own copy of sub-dependnecies
‣ can be optimized with dedupe https://docs.npmjs.com/cli/dedupe https://www.freecodecamp.org/news/10-npm-tricks-that-will-make-you-a-pro-a945982afb25/
- TODO publish includes dependencies? i think not
- TODO npm vs yarn is a difference?

HOOKS + global objects/services dont mix well
its always better to use context ... use can have mulitple instances and it is also possible to mock it
useCallback(, []), musi mit empty dependencies array !!!! ... takze se nechova jako useMemo ... takze React doc je sptane!!!



Cypress
- hard to workeleemnts
- how to use localStorage ..seems fucked?

TODO arnost porovnavani testingu

REdux and mobx


TS vs flwo
- ts: export declare flow: declare export class
- ts typy jsou automaticky exact
