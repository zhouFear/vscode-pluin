import * as vscode from 'vscode';
// const util = require('../util');
import * as Pattern from './auto_match';

var StrategyPatternImp: any = NaN;

/**
 * 自动提示实现，这里模拟一个很简单的操作
 * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
 * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
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
};
