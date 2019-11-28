import * as vscode from "vscode";
// import util = require('../util');
// import path = require('path');

export module Strategy {
  export class tip_object {
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

    show(word: string, _key: string): any {
      if(word && _key) {
        const obj = this.json[_key];
        if (obj) {
          const desc = obj[word];
          if (desc && desc !== "") {
            return new vscode.Hover(`* **模块**：${_key}\n* **函数**：${word}\n* **说明**：${desc}`);
          }
        }
      }
      return 0;
    };
  }

  // 提示entTemplate
  export class entTempalte extends tip_object {
    constructor(document :vscode.TextDocument) {
      super(document);
      this.regex = new RegExp('.*?(entTemplate)');
      this.sourcePath = '../../entTemplate.json';
      this.key = 'temp';
      this.json = JSON.parse(JSON.stringify(require(this.sourcePath)));
    }
  }

  export class entData extends tip_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(entData)');
      this.sourcePath = '../../entData.json';
      this.key = 'entData';
      this.json = JSON.parse(JSON.stringify(require(this.sourcePath)));
    }
  }

  export class activityMgr extends tip_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(activityMgr)');
      this.sourcePath = '../../activityMgr.json';
      this.key = 'activityMgr';
      this.json = JSON.parse(JSON.stringify(require(this.sourcePath)));
    }
  }

  export class entServer extends tip_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(entServer)');
      this.sourcePath = '../../entServer.json';
      this.key = 'entServer';
      this.json = JSON.parse(JSON.stringify(require(this.sourcePath)));
    }
  }

  export class utils extends tip_object {
    constructor(document :any) {
      super(document);
      this.regex = new RegExp('.*?(utils)');
      this.sourcePath = '../../utils.json';
      this.key = 'utils';
      this.json = JSON.parse(JSON.stringify(require(this.sourcePath)));
    }
  }
}
