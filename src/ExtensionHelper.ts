// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as vscode from "vscode";
import { FileDownloader } from "./index";

export default class ExtensionHelper {
    private _extension: vscode.Extension<FileDownloader> | undefined;

    public async getApi(): Promise<FileDownloader> {
        if (this._extension == null) {
            const extension = vscode.extensions.getExtension(`mindaro-dev.file-downloader`);
            if (extension == null) {
                throw new Error(`Failed to get File Downloader VS Code extension.`);
            }
            this._extension = extension;
        }
        if (!this._extension.isActive) {
            await this._extension.activate();
        }
        return this._extension.exports;
    }
}
