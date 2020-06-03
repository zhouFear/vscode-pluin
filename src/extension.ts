// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import auto from './auto/auto_completion'
import tips from './tips/tips';
import check from './check/check';
import command from './commonds';

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
  command(context, termal);
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  
}

// this method is called when your extension is deactivated
export function deactivate() { }
