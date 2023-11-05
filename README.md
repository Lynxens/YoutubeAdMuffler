# YouTube - AdMuffler

Chrome & Firefox extension that dulls ads in YouTube videos by
- Muting them.
- Speeding them up by 16x.
- Adjusting the color scale to a darkened gray scale.

## Installation
### Chrome
1. Open `chrome://extensions/` in you Chrome browser.
2. Turn on developer mode in the top right.
3. Click on 'Load unpacked'.
4. Select the 'dist/chrome' folder of this directory.

### Firefox
1. Open `about:addons` in your Firefox browser
2. Select Settings -> Install add-on from file
3. Select the xpi file in the `dist/firefox` of this directory.

## Build
Requirements: 
- npm (`^9.5.1`)

Instructions
1. Install packages: `npm ci`
2. Build: `npm run build`
