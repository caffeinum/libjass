[![Build Status](https://travis-ci.org/Arnavion/libjass.png?branch=master)](https://travis-ci.org/Arnavion/libjass)

libjass is a JavaScript library written in TypeScript to render ASS subs on HTML5 video in the browser.


### What's special about libjass?

* libjass requires no tweaks to the ASS file from the original video.

* It's easy to deploy. There is no server-side support required. A static hosting is all that's needed.

* libjass uses the browser's native CSS engine by converting the components of each line in the ASS script into a series of styled &lt;div&gt; and &lt;span&gt; elements. This allows all the layout and rendering to be handled by the browser instead of requiring complex and costly drawing and animation code. For example, libjass uses CSS3 animations to simulate tags such as \fad. While a canvas-drawing library would have to re-draw such a subtitle on the canvas for every frame of the video, libjass only renders it once and lets the browser render the fade effect.

As a result, libjass is able to render subtitles with very low CPU usage. The downside to libjass's aproach is that it is hard (and potentially impossible) to map all effects possible in ASS (using \t, ASS draw) etc. into DOM elements. As of now, the subset of tags supported by libjass has no such problems.


### What are all these files?

* The .ts files are the source of libjass. They are TypeScript files and must be compiled into JavaScript for the browser using the TypeScript compiler.

* The rest of the files - index.xhtml, index.js, index.css and fonts.css - are a sample implementation of how to use libjass on a web page. They demonstrate the API to call, how to place &lt;div&gt; elements to render the subs, etc.


### I want to use libjass for my website. What do I need to do?

1. You need to build libjass.js using the instructions in BUILD.md
1. You need to load libjass.js on the page with your video.
1. You need to call the libjass API.

Only libjass.js is needed to use libjass on your website. The other files are only used during the build process and you don't need to deploy them to your website.


### Where's the API documentation? What API do I need to call to use libjass?

The API documentation is linked in the Links section below. Here's an overview:

* The constructor [ASS()](http://arnavion.github.io/libjass/api.xhtml#libjass.ASS) takes in the raw ASS string and returns an object representing the script information, the line styles and dialogue lines in it. The example index.js uses XHR to get this data using the URL specified in a track tag.

* index.js initializes a default renderer that libjass ships with, the [DefaultRenderer](http://arnavion.github.io/libjass/api.xhtml#libjass.renderers.DefaultRenderer). This renderer uses information from the ASS object to build up a series of div elements around the video tag. There is a wrapper (.libjass-subs) containing div's corresponding to the 9 alignment directions, 9 for each layer in the ASS script. libjass.css contains styles for these div's to render them at the correct location.

* The renderer starts a timer that ticks every 41ms. In each tick, it determines the set of dialogues to be shown at the current video time, renders each of them as a div, and appendChild's the div into the appropriate layer+alignment div.

* The renderer handles resizing the video and subs when the user clicks the browser's native fullscreen-video button. index.js also contains code to change the size of the video based on user input.

* Lastly, the renderer contains an implementation of preloading fonts before playing the video. It uses a map of font names to URLs - index.js creates this map from the @font-face rules in fonts.css.


### Can I contribute?

Yes! Feature requests, suggestions, bug reports and pull requests are welcome! I'm especially looking for details and edge-cases of the ASS syntax that libjass doesn't support.

You can also join the IRC channel below and ask any questions.


## Links

* [GitHub](https://github.com/Arnavion/libjass/)
* IRC channel - #libjass on irc.rizon.net
* [API documentation](http://arnavion.github.io/libjass/api.xhtml)
* [Aegisub's documentation on ASS](http://docs.aegisub.org/3.0/ASS_Tags/)


## Supported features

* Styles: Italic, Bold, Underline, StrikeOut, FontName, FontSize, ScaleX, ScaleY, Spacing, PrimaryColor, OutlineColor, Outline, Alignment, MarginL, MarginR, MarginV
* Tags: \i, \b, \u, \s, \bord, \xbord, \ybord, \blur, \fn, \fs, \fscx, \fscy, \fsp, \frx, \fry, \frz, \fr, \fax, \fay, \c, \1c, \3c, \alpha, \1a, \3a, \an, \a, \r, \pos, \move, \fad, \fade, \p
* Custom fonts, using CSS web fonts.


## Known bugs

* Unsupported tags: \shad, \xshad, \yshad, \be, \fe, \2c, \4c, \2a, \4a, \k, \K, \kf, \ko, \q, \org, \t, \clip, \iclip
* \an4, \an5, \an6 aren't positioned correctly.
* Font sizes aren't pixel perfect.


## Planned improvements

* Document browser compatibility. Currently libjass is tested on IE11 (Windows 7), Firefox Nightly and Google Chrome (Dev channel).
* Write API documentation. Add more explanatory comments to the code.
* Write more parser tests. Also figure out a way to test layout.
* Evaluate (document, benchmark) the benefits and drawbacks of DOM+CSS-based drawing over canvas.


# License

```
libjass

https://github.com/Arnavion/libjass

Copyright 2013 Arnav Singh

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
