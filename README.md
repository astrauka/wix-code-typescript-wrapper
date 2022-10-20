# wix-code-typescript-wrapper

**NOTE!** this tool is no longer usable as corvid-cli and corvid-types npm modules are no longer available.
Legacy local development editor was replaced with [GitHub integration](https://support.wix.com/en/article/velo-setting-up-git-integration-wix-cli-early-access)

Allows writing typescript developing code with Wix Local Editor. Compiles and uploads javascript to Wix.
Currently, there's no way to write typescript code in Local Editor.
This library allows writing typescript code, then compiles it to javascript and puts to `src` directory
where Wix Editor expects to find the javascript.
It's far from perfect. You need to store typescript code in some repository as it's not part of Local Editor sources.

## Disclaimer

This project is not maintained by Wix, and it has no deep integration with Local Editor.
It adds a build and code sync step, transforming your typescript code to javascript and putting it in the right place.
Typescript files are not synced to remote, which means you cannot edit typescript files in Web Editor.
Changes in Web Editor will be overridden on build for files that have typescript sources defined.

## Setup

* initialize your Wix project with [Local Editor](https://support.wix.com/en/velo-by-wix/local-development-alpha)
* add the `@astrauka/wix-code-typescript-wrapper` module to development dependencies
* initialize typescript project structure `npx wix-code-ts init`
* update `package.json` with build configuration, copy configuration from [example project](./example/package.json):
  * scripts
  * watch
  * devDependencies
* rewrite javascript files to typescript

## Directory structure

```
typescript
  backend
    universal - shared between backend and frontend
    backend-api.ts - javascript module hosting functions to be invoked from frontend, will be copied to backend-api.jsw
    data.ts - data hooks
    tsconfig.json - typescript configuration, optimized to produce nice javascript output
  frontend
    pages - pages code, naming - PageName.ts
    public - public code, backend/universal is copied to public/universal to reuse common code
    page-elements.d.ts - define global page elements
    tsconfig.json - typescript configuration, optimized to produce nice javascript output
    wix-types.ts - references wix page types
```

### Copying rules

* backend -> src/backend
* backend/backend-api.ts -> src/backend/backend-api.jsw
* frontend/pages -> src/pages
* frontend/public -> src/public
* backend/universal -> src/public/universal

Files in `src/backend` and `src/public` are deleted to not leave trash on renaming a file.
You have to port all files from bakcend and public to typescript at once.

Files in `src/pages` are not deleted. If there's no typescript file defined, the src file will not be deleted.
When there is typescript file defined, it's compiled version will override the src file.

## Development flow

* pull changes from remote `npm run wix:pull`
* start build watcher `npm run build:watch`
* launch Local Editor `npm run wix:editor`
* on file updated, it gets built and synced to src directory. To see the changes, exit preview mode and enter it again (Wix Local Editor limitation)
* once you're done with the changes, use Local Editor to push files to remote

Local Editor only pushes directories that it manages, this means you can create custom directories for your purposes.
They are not synced to remove, so you need to use version control system to sync the changes.
This applies to the `typescript` directory as well. There's no deep integration to Local Editor or any other magic.

Once you experiment with the APIs, it's more convenient to do it in Web Editor and copy/paste the code when it works.

## Limitations

## Page elements autocompletion

[PageElements](./initial-structure/frontend/page-elements.d.ts)
define global page elements. There's no support for page specific elements.

In Web Editor `$w('#element')` gets autocompletion and type determination for each page separately.
This is because each page element has a separate combination of `pageElements.d.ts` and `tsconfig.json`.

This project does not support this feature.
You need to define the types of page elements: `$w('#button' as 'Button)` to get autocompletion and fix typescript compiler warnings.

## Contribution guidelines

Check if there's no [open issue](https://github.com/astrauka/wix-code-typescript-wrapper/issues) discussing the same problem.
If not, create an issue. Let's discuss the need and possible implementation and agree on who can implement it.

### Setup

```bash
npm install -f
cd example
npm install -f
npm run build
```
