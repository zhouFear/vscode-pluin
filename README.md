version 1.0.2
author：zp

说明：该插件主要功能是娱乐模板vue代码entsdk代码补全和提示
## 代码片段模板
输入命令简写，自动加入代码模板。

|  command  |  内容  |
|  ----  | ----  |
|  maixu  | 麦序变化 |
|  rsm  | 注册服务端消息 |
|  rmm  | 注册模块间消息 |
|  ajax  | ajax请求 |
|  ajaxjsonp  | ajaxjsonp请求 |
|  taskcmd  | 网页透传回调 |
|  initact  | 初始化活动 |
|  initactrb  | 初始化右下角活动 |
|  msgbox  | 打开通用弹窗 |
|  entlog  | 写ent日志 |

## 右键快速打开 MDN 百度 谷歌
在编辑窗口右键菜单中加入快速打开MDN，百度，谷歌功能，如果有选中文字，将搜索选中内容。

## 代码补全
输入模板名.将列出该模块下所有接口

![buquan](https://raw.githubusercontent.com/zhouFear/vscode-pluin/master/img/buquan.png)

## 代码提示
点击entsdk下模块的接口hover几秒钟后弹出提示

![tips](https://raw.githubusercontent.com/zhouFear/vscode-pluin/master/img/tips.png)

## 非法字符检测
对文件类的非法字符进行检测，目前只支持http://检测,检测到非法字符会有高亮显示，右下角会出现错误弹窗  在代码中添加注释 /* http-check-off */在当前文件中屏蔽改功能。

![check](https://raw.githubusercontent.com/zhouFear/vscode-pluin/master/img/check.png)

## 一键打开娱乐模板文档

## 一键yss编译

## 中文翻译成英文单词
输入"#中文。"会自动吧#。之间的中文翻译成英文