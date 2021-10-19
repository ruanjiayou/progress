# progress
> 控制显示多行进度条

## 安装
> `npm install https://github.com/ruanjiayou/progress.git`

## 使用
```js
// 更新多行进度条
progress.update(arr.join('\n'));
// 在进度条上方打印日志(进度条还是在下面)
progress.print(str);
// 解除进度条
progress.clear();
```

## 参考
- http://nodejs.cn/api/tty.html 
- https://github.com/freeall/single-line-log