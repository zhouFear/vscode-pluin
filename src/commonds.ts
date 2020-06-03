import * as vscode from 'vscode';
const fs = require('fs');
import {TextEditor, TextEditorEdit} from 'vscode';

export default function(context: vscode.ExtensionContext, termal: vscode.Terminal) {
  function getSelectText(textEditor: TextEditor) {
    let selection = textEditor.selection;
    return textEditor.document.getText(selection);
  };


  let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
  });

  let openEntdoc = vscode.commands.registerCommand('extension.openEntdoc', () => {
    vscode.env.openExternal(vscode.Uri.parse('http://entdoc.yypm.io/#/')).then((success) => {
      console.log(success);
    });
  });

  let mdn = vscode.commands.registerTextEditorCommand('extension.mdn', (textEditor: TextEditor) => {
    const url = `https://developer.mozilla.org/zh-CN/search?q=${getSelectText(textEditor)}`;
    vscode.env.openExternal(vscode.Uri.parse(url)).then((success) => {
      console.log(success);
    });
  });

  let baidu = vscode.commands.registerTextEditorCommand('extension.baidu', (textEditor: TextEditor) => {
    const url = `https://www.baidu.com/s?wd=${getSelectText(textEditor)}`;
    vscode.env.openExternal(vscode.Uri.parse(url)).then((success) => {
      console.log(success);
    });
  });

  let google = vscode.commands.registerTextEditorCommand('extension.google', (textEditor: TextEditor) => {
    const url = `https://www.google.com/search?q=${getSelectText(textEditor)}`;
    vscode.env.openExternal(vscode.Uri.parse(url)).then((success) => {
      console.log(success);
    });
  });

  // 右键yss编译
  const pcPath = `${vscode.workspace.rootPath}\\pc\\`;

  let yssCommand = vscode.commands.registerCommand('extension.yss', () => {
    fs.exists(pcPath, (exists: any) => {
      if (exists) {
        termal?.sendText(`cd ${pcPath}`, true);
        termal?.sendText('yss d', true);
        termal?.show();
      } else {
        vscode.window.showErrorMessage('当前根目录下不存在pc文件夹');
      }
    });
  });

  context.subscriptions.push(openEntdoc);
  context.subscriptions.push(disposable);
  context.subscriptions.push(yssCommand);
  context.subscriptions.push(mdn);
  context.subscriptions.push(baidu);
  context.subscriptions.push(google);
};
