import * as vscode from 'vscode';
const path = require('path');
const fs = require('fs');
import * as Pattern from './tip_match';

var StrategyPatternImp :any = NaN;

/**
 * 
 * 
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideHover(document :vscode.TextDocument, position:vscode.Position, token:vscode.CancellationToken) {
    const word        = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);
    const lineText = line.text;
    const regex = new RegExp(`(?<=[\.= (]).*?(?=.${word})`);
    let key = lineText.match(regex);
    let ketStr:string = "";
    if (key) {
      ketStr = key[0].replace(/^\s*/g,"");
    }

    if (!StrategyPatternImp) {
      StrategyPatternImp = new Pattern.Pattern.StrategyPattern(document);
    }

    if (ketStr !== "" && word) {
      return StrategyPatternImp.doWork(word, ketStr);
    }
}

export default function(context :vscode.ExtensionContext) {
    // 注册鼠标悬停提示
    context.subscriptions.push(vscode.languages.registerHoverProvider('vue', {
        provideHover
    }));
};