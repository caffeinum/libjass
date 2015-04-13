/**
 * libjass
 *
 * https://github.com/Arnavion/libjass
 *
 * Copyright 2013 Arnav Singh
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(["intern/dojo/node!fs", "intern/dojo/node!png-crop", "intern!tdd", "intern/dojo/node!intern/node_modules/leadfoot/helpers/pollUntil", "require"], function (fs, PNGCrop, tdd, pollUntil, require) {
	tdd.suite("WebDriver", function () {
		tdd.test("Basic", function () {
			this.remote.session.setExecuteAsyncTimeout(10000);
			return this.remote
				.setWindowSize(1920, 1080)
				.get(require.toUrl("./test-page.html"))
				.then(pollUntil('return (document.readyState === "complete") ? true : null;'), 100)
				.sleep(5000)
				.executeAsync(function (callback) {
					window.clock = new libjass.renderers.ManualClock();
					var libjassSubsWrapper = document.querySelector(".libjass-wrapper");

					libjass.ASS.fromUrl("kfx.ass").then(function (ass) {
						libjassSubsWrapper.style.width = ass.properties.resolutionX + "px";
						libjassSubsWrapper.style.height = ass.properties.resolutionY + "px";

						var renderer = new libjass.renderers.WebRenderer(ass, clock, libjassSubsWrapper);
						renderer.addEventListener("ready", function () {
							renderer.resize(ass.properties.resolutionX, ass.properties.resolutionY);
							clock.pause();
							callback();
						});
					});
				})
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-0.png"), buffer, 1280, 720); })
				.execute(function () { clock.tick(1); })
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-1.png"), buffer, 1280, 720); })
				.execute(function () { clock.tick(2); })
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-2.png"), buffer, 1280, 720); })
				.execute(function () { clock.tick(3); })
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-3.png"), buffer, 1280, 720); })
				.execute(function () { clock.tick(4); })
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-4.png"), buffer, 1280, 720); })
				.execute(function () { clock.tick(5); })
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-5.png"), buffer, 1280, 720); })
				.execute(function () { clock.tick(6); })
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-6.png"), buffer, 1280, 720); })
				.execute(function () { clock.tick(7); })
				.takeScreenshot()
				.then(function (buffer) { writeScreenshot(require.toUrl("./kfx-7.png"), buffer, 1280, 720); });

			/*
			return this.remote
				.get("http://arnaviont61/libjass/index.xhtml")
				.then(pollUntil('return (document.readyState === "complete") ? true : null;'), 100)
				.findByCssSelector("video")
				.then(pollUntil('var video = document.querySelector("video"); return video.currentTime > 5 ? video : null;'), 100);
			*/
		});
	});

	function writeScreenshot(filename, buffer, width, height) {
		PNGCrop.cropToStream(buffer, { width: width, height: height }, function (error, outputStream) {
			if (error !== null) {
				throw error;
			}

			outputStream.pipe(fs.createWriteStream(filename));
		});
	}
});
