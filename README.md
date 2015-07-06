ye.check
========

一个简单的表单验证控件

克隆到本地后使用


克隆方法：git clone https://github.com/joleye/ye.check.git


说明：需要jQuery库


ye.check('.form1').do_post({
	errorCallback : function(){}, //验证消息出错回调方法
	success : function(res){}, //提交成功后调用 res 返回对象
	failed : function(xhr){} //提交失败后调用 如:400 , 500错误
});