import * as vscode from 'vscode';
var window = vscode.window;
var workspace = vscode.workspace;
const util = require('../util');

export default function (context: vscode.ExtensionContext, _output:vscode.OutputChannel | undefined, _termal:vscode.Terminal | undefined): void {
  var activeEditor = window.activeTextEditor;
  var settings: vscode.WorkspaceConfiguration = workspace.getConfiguration('entauto');
  init(settings);
  var pattern: RegExp;
  var isCaseSensitive: any;
  var timeout: any;
  var output: vscode.OutputChannel | undefined = _output;
  var termal: vscode.Terminal | undefined = _termal;

  window.onDidChangeActiveTextEditor(function (editor) {
    activeEditor = editor;
    if (editor) {
      triggerUpdateDecorations();
    }
  }, null, context.subscriptions);

  workspace.onDidChangeTextDocument(function (event) {
    if (activeEditor && event.document === activeEditor.document) {
      triggerUpdateDecorations();
    }
  }, null, context.subscriptions);

  if (activeEditor) {
    triggerUpdateDecorations();
  }


  function updateDecorations() {
    if (!activeEditor || !activeEditor.document) {
      return;
    }

    if (!output) output = window.createOutputChannel('yyent');
    if (!termal) termal = window.createTerminal('yyent');

    if (activeEditor.document.languageId != 'vue' &&
      activeEditor.document.languageId != 'javascript' &&
      activeEditor.document.languageId != 'css') return;

    var text = activeEditor.document.getText();
    const shieldPattern = new RegExp('http-check-off');
    if (shieldPattern.test(text)) {
      return;
    }
    var mathes: Array<vscode.Range> | undefined = undefined;
    var match: RegExpExecArray | null;
    // var cmdText = 'echo 检测到你的代码里有非法字符\n';
    // termal.sendText(cmdText, false);
    while (match = pattern.exec(text)) {
      var startPos = activeEditor.document.positionAt(match.index);
      var endPos = activeEditor.document.positionAt(match.index + match[0].length);
      var decoration = {
        range: new vscode.Range(startPos, endPos)
      };
      if (match.length > 0) {
        window.showErrorMessage(`检测到你的代码里有非法字符：${match[0]},line:${startPos.line+1},character:${startPos.character+1}`, ).then(() => {
          console.log('dianji');
        });
        // output.appendLine(`检测到你的代码里有非法字符：'${match[0]}',${activeEditor.document.fileName}:${startPos.line + 1}:${startPos.character + 1}`);
        // window.showErrorMessage(`检测到你的代码里有非法字符(${match[0]}):${activeEditor.document.fileName}:${startPos.line+1}:${startPos.character+1}`);
        // cmdText += `echo ${activeEditor.document.fileName}:${startPos.line + 1}:${startPos.character + 1}\n`;
        // termal.sendText(cmdText, true);
      }
      if (!mathes) {
        mathes = [decoration.range];
      } else {
        mathes.push(decoration.range);
      }

    }
    if (!mathes || mathes.length === 0) return;
    var style = {
      color: '#fff',
      backgroundColor: '#ff0000',
      overviewRulerColor: '#ff0000'
    }
    var decorationType = window.createTextEditorDecorationType(style);
    activeEditor.setDecorations(decorationType, mathes);
  }

  function triggerUpdateDecorations(): void {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(updateDecorations, 0);
  }

  function init(settings: vscode.WorkspaceConfiguration): void {
    // const keyWords: any = settings.get('keywords');
    // if (keyWords) {
    //   pattern = new RegExp(keyWords[0]);
    // } else {
    //   pattern = new RegExp('http://');
    // }
    pattern = new RegExp('http://');
    isCaseSensitive = false;
    pattern = new RegExp(pattern, 'gi');
    if (isCaseSensitive) {
      pattern = new RegExp(pattern, 'g');
    }
    // console.log(typeof keyWords, keyWords);
  }
};