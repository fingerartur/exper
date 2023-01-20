---
sidebar_position: 8
---

import { Fail } from '@site/src/components/fail.js'
import { Todo } from '@site/src/components/todo.js'
import { Improve } from '@site/src/components/improve.js'
import { Stars } from '@site/src/components/stars.js'

# Video streaming

## Todo
1. MSE
2. shaka-player
3. video segments vs tracks
4. DASH format / HLS format
5. DRM, EME
6. MP4 format, codecs, etc.

- MP4 streaming
- [ABR streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming)
- live streaming RTP/RTMP

## Presto play / shaka player
1. TODO probably shaka player / presto cannot play all MP4 files! (Because MediaSource API works only with segmented MP4 files).

- TODO read this https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API/Transcoding_assets_for_MSE

<Todo>Report or document this case for cast labs - I have managed to create a segmented mp4 with ffmpeg and it does NOT work with MediaSource. It gives me this cryptic error here https://stackoverflow.com/questions/42234078/html5-mediasource-works-with-some-mp4-files-and-not-with-others-same-codecs</Todo>

## ABR
DASH - used for live and non-live video. Live has latency, so cannot be used for video calls.


## HTML5 video streaming API
ABR streaming protocols are not supported in HTML5. The only thing that is supported out of the box is HLS in Safari, plus maybe FairPlay DRM.

In a nutshell EME and MSE are APIs that allow me to implement ABR, or any other crazy type of custom streaming I want.

### MSE
[MSE is a HTML5 API](./mse) that allows me to control how video data is buffered. This can be used to do crazy stuff like video stitching in JS or even generated video.

### EME
EME
- intro https://www.youtube.com/watch?v=CK5GFgDjN5Y
- https://web.dev/eme-basics/
- https://www.zype.com/blog/drm-video-encryption-explained-protect-your-content-now

## Todo
1. what is the actual difference between RTMP and HLS? why are they different?

## Working with binary


## MP4
- https://www.agama.tv/demystifying-the-mp4-container-format/
- https://www.iso.org/standard/38538.html
- ISO Base MFF https://mpeg.chiariglione.org/standards/mpeg-4/iso-base-media-file-format

## HLS
- https://www.wowza.com/blog/hls-streaming-protocol
- https://broadpeak.tv/blog/how-apple-hls-is-strengthening-its-hand-in-the-abr-game-with-ll-hls/

## DRM
- https://buydrm.com/multikey-service/
- https://www.locklizard.com/digital-rights-management/
- https://web.dev/eme-basics/
