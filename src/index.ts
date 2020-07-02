// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ExtensionHelper from "./ExtensionHelper";
import FileDownloaderInterface from "./FileDownloader";

type FileDownloader = FileDownloaderInterface;
const extensionHelper = new ExtensionHelper();
const getApi = () => extensionHelper.getApi();

export { getApi, FileDownloader };