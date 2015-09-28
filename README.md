ye.check
========

一个简单的表单验证控件

克隆到本地后使用


克隆方法：git clone https://github.com/joleye/ye.check.git


说明：需要jQuery库

方法说明
===
```js
ye.verify('.form1').do_post({
	method : 'ajax', //默认 ajax模式提交 ajax/post
	msg : {
				right : 'dright',//验证正确后的样式规则
				error : 'derr'//验证失败后的样式规则
	},
	btn : {
				name : '#post',//确定按钮名称 jquery筛选器
				text : 'load...' //等待文字
	},
	errorCallback : function(){}, //验证消息出错回调方法
	success : function(res){}, //提交成功后调用 res 返回对象
	failed : function(xhr){} //提交失败后调用 如:400 , 500错误
});
```

文件说明
==
```
demo.html 演示文档
demo-verify.html 规则写在文本框中的属性演示 
```

