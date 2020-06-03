import * as vscode from "vscode";
// import util = require('../util');
// import path = require('path');


export module Strategy {
  export class auto_object {
    protected regex: RegExp;
    protected projectPath: string;
    protected sourcePath: string;
    protected key: string;
    protected json: any;

    constructor(document :any) {
      this.regex = new RegExp('');
      this.sourcePath = '';
      this.key = '';
      this.projectPath = '';
      this.json = null;
    };

    protected load() :void {
      this.json = JSON.parse(JSON.stringify(require(this.sourcePath)));
    }

    match(text: string): any {
      if(this.json && this.regex.test(text)) {
        const dependencies = Object.keys(this.json[this.key]);
        return dependencies.map(dep => {
          // vscode.CompletionItemKind 表示提示的类型
          return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
        })
      }
      return 0;
    };
  }

  // 提示entTemplate
  export class entTempalte extends auto_object {
    constructor(document :vscode.TextDocument) {
      super(document);
      this.regex = new RegExp('.*?(entTemplate.)$');
      this.sourcePath = '../../config/entTemplate.json';
      this.key = 'entTemplate';
      this.load();
    }
  }

  export class entData extends auto_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(entData.)$');
      this.sourcePath = '../../config/entData.json';
      this.key = 'entData';
      this.load();
    }
  }

  export class activityMgr extends auto_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(activityMgr.)$');
      this.sourcePath = '../../config/activityMgr.json';
      this.key = 'activityMgr';
      this.load();
    }
  }

  export class entServer extends auto_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(entServer.)$');
      this.sourcePath = '../../config/entServer.json';
      this.key = 'entServer';
      this.load();
    }
  }

  export class utils extends auto_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(utils.)$');
      this.sourcePath = '../../config/utils.json';
      this.key = 'utils';
      this.load();
    }
  }

  export class pack extends auto_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(pack.|pk.)$');
      this.sourcePath = '../../config/pack.json';
      this.key = 'pack';
      this.load();
    }
  }

  export class unPack extends auto_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(unPack.|up.)$');
      this.sourcePath = '../../config/unpack.json';
      this.key = 'unpack';
      this.load();
    }
  }
}
