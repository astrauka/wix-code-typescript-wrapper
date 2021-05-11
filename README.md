# wix-code-typescript-wrapper

Allows to write typescript developing code with Wix Local Editor. Compiles and uploads javascript to Wix.
Currently there's no way to write typescript code in Wix Editor.
This library allows to write typescript code, then compiles it to javascript and puts to `src` directory
where Wix Editor expects to find the javascript.
It's far from perfect. You need to store typescript code in some repository as it's not part of Wix Editor sources.

## Limitations

[PageElements](./initial-structure/frontend/page-elements.d.ts)
define global page elements. There's no support for page specific elements.
