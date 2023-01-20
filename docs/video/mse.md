---
sidebar_position: 1
---

import { Fail } from '@site/src/components/fail.js'
import { Todo } from '@site/src/components/todo.js'
import { Improve } from '@site/src/components/improve.js'
import { Stars } from '@site/src/components/stars.js'

# MSE
[Media source extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API) allows more fine-grained control of creating media (audio/video) streams and playing them, as opposed to just passing a URI to video/audio element.

I am in charge of downloading the video file binary. I can download a large file in chunks, I can switch between qualities (switch between two binary files), etc.

**Caveat**: when I feed the video to media source, [it must be specially formatted - it must be **segmented**](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API/Transcoding_assets_for_MSE). MSE does not support classic whole MP4 files, etc - it must be a special segmented MP4 format.


## Media source
[`MediaSource`](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource) represents one video file

- Notable methods: `addSourceBuffer`, `removeSourceBuffer`, `endOfStream`
- Notable events: `sourceclose`, `sourceopen`, `sourceended`

## Source Buffer
[`SourceBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer) represents binary data of one video file

- When creating `SourceBuffer` I must specify the MIME type very much in detail, e.g. mime `video/mp4; codecs="avc1.640020, mp4a.40.2"`. **Simple `video/mp4` is not supported!**.

- Notable methods: `appendBuffer()` (must wait until `updateend` / until `updating` is false), `remove`
- Notable events: `updatestart`, `updateend`, `error`

### Tools that reveal MIME
1. Good CLI tool `npx get-video-mime video.mp4`
2. [Good online tool is here ](https://nickdesaulniers.github.io/mp4info/)


### Notable behavior
1. When I append binary chunks of video to `SourceBuffer`, I can append chunks of any size (100B, 1000B, ...) it do not need to parse the MP4 in order to parse out logical segments, no - just chunk it into any pieces I want and feed it in via `appendBuffer()`.
2. While not all pieces have been fed in, the video element does not know the duration of the video, therefore duration UI and progress UI is wrong. This can be fixed by manually setting `MediaSource.duration = 10`.

<Todo>Find out about SourceBuffer.mode, SourceBuffer.appendWindowStart, SourceBuffer.appendWindowEnd</Todo>

## Video stitching
It is possible to take and stitch together multiple video files on javascript by feeding them one by one into `SourceBuffer.appendBuffer()` and for each new video file setting `SourceBuffer.changeType(newMime)` and `SourceBuffer.timestampOffset = (duration of previous video in seconds)`.

## Bugs
1. Sometimes when I stitch videos, progress bar shows buffered only the first video and only it plus a bit of the second plays, then the player stops at buffering and never continues. In the console there are no errors. This seems to be a bug of MSE!


## What video formats are supported by MSE?
Even though MSE is standardized, there is **no compulsory support** for formats / codecs in the standard.

Somebody made [this list of what is supported across browsers](https://cconcolato.github.io/media-mime-support/).

## Web worker
[MSE works in web worker (since Chrome 108 is beta as of October 27, 2022)](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API#availability_in_workers)


## Sources
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API) and an important section here about [how to prepare the video to be compatible with MSE](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API/Transcoding_assets_for_MSE)
- [About video stitching - undocumented](https://stackoverflow.com/questions/30436099/smooth-representation-change-using-media-source-api)
- [mini demo](https://github.com/nickdesaulniers/netfix/blob/gh-pages/demo/bufferAll.html)
- [W3 spec](https://www.w3.org/TR/media-source-2/#dom-sourcebuffer)

## Sources TODO to read
- [MSE basics](https://web.dev/media-mse-basics/)
- https://joshuatz.com/posts/2020/appending-videos-in-javascript-with-mediasource-buffers/
- https://www.w3.org/TR/mse-byte-stream-format-registry/


## To Report
1. The fact that MSE consumes only specific formatted files (e.g. only a subset of MP4) is not obvious and not well documented at least not on MDN. [I am not the first one to complain about this.](https://stackoverflow.com/questions/42234078/html5-mediasource-works-with-some-mp4-files-and-not-with-others-same-codecs)


## TODO
- TODO why MediaSource accepts multiple buffers, what is this useful for and how does this work? [Actually here is some stackoverflow about how it does not work](https://stackoverflow.com/questions/30436099/smooth-representation-change-using-media-source-api)
- TODO what is MediaSource.activeSourceBuffers? I thought only one can be active
- [About multiple SourceBuffers](https://stackoverflow.com/questions/48468375/javascript-append-multiple-buffer-to-sourcebuffer-and-play-them-as-a-single-vide)


