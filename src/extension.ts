// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import auto from './auto/auto_completion'
import tips from './tips/tips';
import check from './check/check';

let termal: vscode.Terminal | undefined = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "entauto" is now active!');
  auto(context);
  tips(context);
  check(context);
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
  if (!termal) termal = vscode.window.createTerminal('yss');
  const fileName: string | undefined = vscode.window.activeTextEditor?.document.fileName;
  const index: Number | undefined = fileName?.indexOf('\\pc\\');
  let dir: string | undefined = undefined;
  if (index) {
    dir = fileName?.substring(0, +index + 4);
  }

  let yssCommand = vscode.commands.registerCommand('extension.yss', () => {
    if (dir != '') {
      termal?.sendText(`cd ${dir}`, true);
      termal?.sendText('yss d', true);
      termal?.show();
    }
  });

  context.subscriptions.push(openEntdoc);
  context.subscriptions.push(disposable);
  context.subscriptions.push(yssCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
