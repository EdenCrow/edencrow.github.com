# EdenCrow.info
This repository hosts my personal homepage, which can be found at [https://edencrow.info](https://edencrow.info).

The project uses [Hugo](https://github.com/gohugoio/hugo) to build a static website.

It uses [Hugo-Coder](https://github.com/luizdepra/hugo-coder) by Luiz F. A. de Prá for its theme.

The site is hosted with the use of [GitHub Pages](https://pages.github.com/).

## Notes on Blog Images
Full sized blog images should be placed in `static/images/blogImages`. Images will be compressed at build/serve with [squoosh](https://github.com/GoogleChromeLabs/squoosh).

To insert the image into the blogpost we use the line:

``` go
{{< image name="[filename]" alt="[altText]" caption="[captionText]" originalFiletype="[originalFileExtension]" lazy="true" >}}
```

[Required]
- `name` is the name of the file (without the file extension)
- `alt` sets the alt text for the image element
- `caption` sets the figcaption for the image

[Optional]
- `originalFiletype` is the file extension for the original file (otherwise defaults to `png`)
- `lazy` if defined with any value will give the image the `loading=lazy` attribute