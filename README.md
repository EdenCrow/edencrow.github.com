<p align="center">
  <img alt="Eden's avatar" src="static/images/avatar.png" width="100px" />
  <h1 align="center">EdenCrow.info</h1>
</p>

<div style="text-align:center">

![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![image](https://img.shields.io/badge/Hugo-FF4088?style=for-the-badge&logo=Hugo&logoColor=white)
![image](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHubPages&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

*The repository for my personal homepage.*
</div>

![image](screenshot.png)

<details open>
<summary>Table of Contents</summary>

1. [About](#about)
2. [Development](#dev)
    - [Prerequisites](#devPrereq)
    - [Download](#devDownload)
    - [Serving locally](#devLocal)
3. [Roadmap](#map)
    - [Guide](#mapGuide)
    - [Roadmap table](#mapTable)
4. [Licenses](#license)
4. [Acknowledgements](#acknowledgements)
    - [README support](#readme)

</details>

<a id="about"></a>

## :raised_eyebrow: About

This repository contains the source code for my personal website [EdenCrow.info](https://edencrow.info).

The site is created with the use of:
- **[NodeJS](https://nodejs.org/)**: Javascript runtime environment
- **[npm](https://npmjs.org/)**: package management
- **[Hugo](https://gohugo.io/) (via [hugo-bin](https://www.npmjs.com/package/hugo-bin))**: static site generation
- **[hugo-coder](https://github.com/luizdepra/hugo-coder)**: site theme
- **[Webpack](https://webpack.js.org/)**: module bundling
- and a small selection of other npm packages

It is hosted from this repo via [GitHub Pages](https://pages.github.com/).

Each section (eg. the homepage) is being developed one at a time, and will be pushed live once complete. For more information see [the roadmap](#map).

<a id="dev"></a>

## :wrench: Development

<a id="devPrereq"></a>

### Prerequisites
- [NodeJS](https://nodejs.org/)
- [npm](https://npmjs.org/)

<a id="devDownload"></a>

### Download
1) Clone this repository
2) Run `npm install` to install dependencies

<a id="devLocal"></a>

### Serving locally
1) Run `npm run serve`
2) The site will be accessible at http://localhost:1313/ and saved changes will automatically rebuild
3) Terminate the process when finished
4) Run `npm run clean` to clean folder structure

<a id="map"></a>

## :dart: Roadmap

<a id="mapGuide"></a>

### Guide
:heavy_check_mark:: Complete

:wrench:: In development

:x:: Not yet in development

<a id="mapTable"></a>

### Roadmap table
|Version|Description|Completion|Estimate
|---|---|---|---|
|0.1.0|Homepage|:wrench:Avatar<br/>:wrench:Info panel w/ [TypewriterJS](https://github.com/tameemsafi/typewriterjs)<br/>:wrench:Social icons<br/>:x:Build & deployment|Q1 2023
|0.2.0|Blog|:x:Use of blog from theme<br/>:x:Image zoom w/ [medium-zoom](https://github.com/francoischalifour/medium-zoom)|Q2 2023
|0.3.0|About|:x:Custom page|Q2 2023
|0.4.0|Contact|:x:Custom page<br/>:x:Self-hosted backend|Q3 2023
|0.5.0|Monitoring|:x:Self-hosted analytics w/ [Plausible](https://github.com/plausible/analytics)<br/>:x:[Home Assitant](https://www.home-assistant.io/) integration|Q4 2023

<a id="license"></a>

## :scroll: Licenses
Original code for this project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

Blog content posted to the site is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

<a id="acknowledgements"></a>

## :star: Acknowledgements

<a id="readme"></a>

### README support
- [Shields](https://github.com/badges/shields)
- [Badges4-README.md-Profile](https://github.com/alexandresanlim/Badges4-README.md-Profile)
- [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet)