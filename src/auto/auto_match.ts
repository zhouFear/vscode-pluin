import autoComplate = require("./auto_object");
import * as vscode from "vscode";

class Context{
  private strategy: autoComplate.Strategy.auto_object;
  constructor(_strategy: autoComplate.Strategy.auto_object) {
    this.strategy = _strategy;
  }

  apply(text: string): any {
    return this.strategy.match(text);
  }
}


export module Pattern {
  export class StrategyPattern {
    private entTempContext: Context;
    private entDataContext: Context;
    private utilsContext: Context;
    private entServerContext: Context;
    private activityMgrContext: Context;
    private packContent: Context;
    private unPackContent: Context;
    constructor(_document: vscode.TextDocument) {
      this.entTempContext = new Context(new autoComplate.Strategy.entTempalte(_document));
      this.entDataContext = new Context(new autoComplate.Strategy.entData(_document));
      this.utilsContext = new Context(new autoComplate.Strategy.utils(_document));
      this.entServerContext = new Context(new autoComplate.Strategy.entServer(_document));
      this.activityMgrContext = new Context(new autoComplate.Strategy.activityMgr(_document));
      this.packContent = new Context(new autoComplate.Strategy.pack(_document));
      this.unPackContent = new Context(new autoComplate.Strategy.unPack(_document));
    }
  
    doWork(text :string) :any {
      return this.entTempContext.apply(text) ||
      this.entDataContext.apply(text) ||
      this.utilsContext.apply(text) ||
      this.entServerContext.apply(text) ||
      this.activityMgrContext.apply(text) ||
      this.packContent.apply(text) ||
      this.unPackContent.apply(text);
    }
  }
}

