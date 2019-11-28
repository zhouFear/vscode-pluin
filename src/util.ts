import * as vscode from 'vscode';

export module uilt {

  export function getProjectPath(document: any): string {
    if (!document) {
      document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;
    }
    if (!document) {
      // this.showError('当前激活的编辑器不是文件或者没有文件被打开！');
      console.log('当前激活的编辑器不是文件或者没有文件被打开！');
      return '';
    }
    const currentFile = (document.uri ? document.uri : document).fsPath;
    let projectPath = null;
    if (vscode.workspace.workspaceFolders) {
      let workspaceFolders = vscode.workspace.workspaceFolders.map(item => item.uri.path);
      // 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
      // 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
      if (workspaceFolders.length == 1 && formatPath(workspaceFolders[0]) === formatPath(vscode.workspace.rootPath || '')) {
        return vscode.workspace.rootPath || '';
      }
      workspaceFolders.forEach(folder => {
        if (currentFile.indexOf(folder) === 0) {
          projectPath = folder;
        }
      })
      if (!projectPath) {
        console.log('获取工程根路径异常！');
        return '';
      }
      return projectPath;
    }
    return '';
  };

  function formatPath(path: string): string {
    const toks = path.split('\\');
    if (toks.length > 1) {
      const dest = `/${toks.join('/')}`;
      return dest;
    }
    return path;
  };
}