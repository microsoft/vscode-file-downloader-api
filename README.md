# VS Code File Downloader API

This package acts as a wrapper around the VS Code File Downloader extension, which exposes an API that allows other
extensions to download and manage binary dependencies.

Useful links:
- VS Code Extension: https://marketplace.visualstudio.com/items?itemName=mindaro-dev.file-downloader
- VS Code Extension Source: https://github.com/microsoft/vscode-file-downloader 
- Package Source: https://github.com/microsoft/vscode-file-downloader-api

## Setup

Place the following in your VS Code extension's `package.json` file:

```json
"extensionDependencies": [
    "mindaro-dev.file-downloader"
]
```

## Usage

To get the API:

```typescript
import { Uri } from "vscode";
import { getApi, FileDownloader } from "@microsoft/vscode-file-downloader-api";
...
const fileDownloader: FileDownloader = await getApi();
```

### Download file:

Simplest case:

```typescript
const file: Uri = await fileDownloader.downloadFile(
    Uri.parse(url),
    filename,
    context
);
```

With cancellation token and download progress callback:

```typescript
import { Uri, CancellationTokenSource } from "vscode";
...

const cancellationTokenSource = new CancellationTokenSource();
const cancellationToken = cancellationTokenSource.token;

const progressCallback = (downloadedBytes: number, totalBytes: number | undefined) => {
    console.log(`Downloaded ${downloadedBytes}/${totalBytes} bytes`);
};

const file: Uri = await fileDownloader.downloadFile(
    Uri.parse(url),
    filename,
    context,
    cancellationToken,
    progressCallback
);
```

Extract .zip file into directory:

If you set `shouldUnzip` to true and download a .zip file, it will be automatically extracted to a folder titled `filename`.

```typescript
const directory: Uri = await fileDownloader.downloadFile(
    Uri.parse(url),
    filename,
    context,
    /* cancellationToken */ undefined,
    /* progressCallback */ undefined,
    { shouldUnzip: true }
);
```

### List previously downloaded files:

```typescript
const downloadedFiles: Uri[] = await fileDownloader.listDownloadedItems(context);
```

### Get a single downloaded file:

```typescript
try {
    const downloadedFile: Uri = await fileDownloader.getItem(filename, context);
}
catch (error) {
    // File does not exist in downloads directory
}
```
or
```typescript
const downloadedFile: Uri = await fileDownloader.tryGetItem(filename, context);
if (downloadedFile === undefined) {
    // File does not exist in downloads directory
}
```

### Delete downloaded files

Delete one file:

```typescript
await fileDownloader.deleteItem(filename, context);
```

Delete all files:

```typescript
await fileDownloader.deleteAllItems(context);
```

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

### Testing changes

Do not use `npm link` to test changes locally. It can result in duplicate type declarations that can cause problems with
TypeScript. To test changes locally, compile and pack the package:

```bash
npm run compile
npm pack
```

This produces a file called `microsoft-vscode-file-downloader-api-X.X.X.tgz` where `X.X.X` is the version number. Install the package in the consumer extension's root folder:

```bash
npm install ./path/to/microsoft-vscode-file-downloader-api-X.X.X.tgz
```