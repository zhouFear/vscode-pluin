import tips = require("./tip_object");
import * as vscode from "vscode";

class TipContext{
  private strategy: tips.Strategy.tip_object;
  constructor(_strategy: tips.Strategy.tip_object) {
    this.strategy = _strategy;
  }

  apply(word: string, key: string): any {
    return this.strategy.show(word, key);
  }
}

export module Pattern {
  export class StrategyPattern {
    private entTempContext: TipContext;
    private entDataContext: TipContext;
    private utilsContext: TipContext;
    private entServerContext: TipContext;
    private activityMgrContext: TipContext;
    constructor(_document: vscode.TextDocument) {
      this.entTempContext = new TipContext(new tips.Strategy.entTempalte(_document));
      this.entDataContext = new TipContext(new tips.Strategy.entData(_document));
      this.utilsContext = new TipContext(new tips.Strategy.utils(_document));
      this.entServerContext = new TipContext(new tips.Strategy.entServer(_document));
      this.activityMgrContext = new TipContext(new tips.Strategy.activityMgr(_document));
    }
  
    doWork(word :string, key: string) :any {
      return this.entTempContext.apply(word, key) ||
      this.entDataContext.apply(word, key) ||
      this.utilsContext.apply(word, key) ||
      this.entServerContext.apply(word, key) ||
      this.activityMgrContext.apply(word, key);
    }
  }
}

