import * as vscode from 'vscode';
// const util = require('../util');
import * as Pattern from './auto_match';

var StrategyPatternImp: any = NaN;

/**
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 * @param {*} context 
 */
function provideCompletionItems(document :vscode.TextDocument, position :vscode.Position, token :vscode.CancellationToken, context :vscode.CompletionContext) {
  const line = document.lineAt(position);
  // const projectPath = util.getProjectPath(document);
  const lineText = line.text.substring(0, position.character);

  console.log(lineText);
  if (!StrategyPatternImp) {
    StrategyPatternImp = new Pattern.Pattern.StrategyPattern(document);
  }

  if (StrategyPatternImp && lineText.length > 0) {
    return StrategyPatternImp.doWork(lineText);
  }
}


/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item 
 * @param {*} token 
 */
function resolveCompletionItem(item :any, token :any) {
  // console.log(item, token);
	return null;
}

export default function(context :vscode.ExtensionContext) {
  // 注册代码建议提示，只有当按下“.”时才触发
  console.log('自动补全插件已加载。');
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('vue', {
		provideCompletionItems,
		resolveCompletionItem
  }, '.'));
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('javascript', {
		provideCompletionItems,
		resolveCompletionItem
	}, '.'));
};
