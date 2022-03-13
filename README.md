# EdenCrow.info
This repository hosts my personal homepage, which can be found at [https://edencrow.info](https://edencrow.info).

The project uses [Hugo](https://github.com/gohugoio/hugo) to build a static website.

It uses [Hugo-Coder](https://github.com/luizdepra/hugo-coder) by Luiz F. A. de Prá for its theme.

The site is hosted with the use of [GitHub Pages](https://pages.github.com/).

## Notes on Blog Images
Full sized images should be placed in `static/images/blogImages`.

These images should then be reduced in size with [squoosh](https://github.com/GoogleChromeLabs/squoosh), preferably by running the following command from the `blogImages` directory:

``` bash
 npx @squoosh/cli --mozjpeg '{quality:50}' -d squoosh ./[imageName]
```

Make sure to replace `[imageName]` with the name of the image file, including file extension.

This will create our minimised image in `static/images/blogImages/squoosh`.

To insert the image into the blogpost we use the line:

``` go
{{< image name="[filename]" alt="[altText]" caption="[captionText]" originalFiletype="[originalFileExtension]" squooshFiletype="[squooshFileExtension]" >}}
```

[Required]
- `name` is the name of the file (without the file extension)
- `alt` sets the alt text for the image element
- `caption` sets the figcaption for the image

[Optional]
- `originalFiletype` is the file extension for the original file (otherwise defaults to `png`)
- `squooshFiletype` is the file extension for the minimised file (otherwise defaults to `jpg`)