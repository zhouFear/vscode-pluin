// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import auto from './auto/auto_completion'
import tips from './tips/tips';
import check from './check/check';

const fs = require('fs');

let termal: vscode.Terminal | undefined = undefined;
let output: vscode.OutputChannel | undefined = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "entauto" is now active!');
  if (!termal) termal = vscode.window.createTerminal('yyent');
  if (!output) output = vscode.window.createOutputChannel('yyent');
  termal.sendText('echo off', true);

  auto(context);
  tips(context);
  check(context, output, termal);
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
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
}

// this method is called when your extension is deactivated
export function deactivate() { }
