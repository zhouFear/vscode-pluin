import * as vscode from "vscode";

const http = require('http');
const APP_KID = '5e203c9113eee';
const APP_KEY = '7da9d91a1aa03096d9ddcab3573546ba';
const reg = new RegExp('#[\u4e00-\u9fa5 \， \； \s \  a-z A-Z 0-9]+\。$');

export default function (lineText: string, position: vscode.Position): any {
  const test = reg.test(lineText);
  const strs = lineText.match(reg);
  if (test) {
    const keyWord = strs?.pop();
    const length = keyWord?.length || 0;
    const word:string|undefined = keyWord?.substring(1, length - 1);
    let responce = '';
    http.get(`http://api.yeekit.com/dotranslate.php?from=zh&to=en&app_kid=5e203c9113eee&app_key=7da9d91a1aa03096d9ddcab3573546ba&text=${word}`, (res: any) => {
      res.on('data', (chunck: any) => {
        responce += chunck;
      });
      res.on('end', () => {
        let fc = responce.charCodeAt(0);
        if (fc < 0x20 || fc > 0x7f) {
          responce = responce.substring(1); // 去除第一个字符
        }
        const res = JSON.parse(responce);
        const result: any = [];
        res?.translation?.forEach((element: any) => {
          if (element && element.translated) {
            element.translated.forEach((element1:any) => {
              if (element1 && element1.text) {
                result.push(element1.text);
              }
            });
          }
        });
        vscode.window.activeTextEditor?.edit((editBuilder) => {
          editBuilder.replace(new vscode.Range(position.translate(0, (0 - length)), position), result[0]);
        });
      });
    });
  }


};