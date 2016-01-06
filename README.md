ye.check
========

一个简单的表单验证控件

克隆到本地后使用


克隆方法：git clone https://github.com/joleye/ye.check.git


说明：需要jQuery库

###方法说明

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

#####枚举方式验证
```js
ye.check({
				'username' : [ 'require', '不能为空', '&nbsp;' ],
				'password' : [ 'require', '不能为空', '&nbsp;' ],
				'mobile' : [ 'mobile', '不能为空', '&nbsp;' ],
				'idcard' : [ 'idcard', '不能为空', '&nbsp;' ],
				'sex' : [ 'radio', '不能为空', '&nbsp;' ],
				'age' : [ 'age', '年龄格式错误', '&nbsp;' ],
				'ip' : [ 'ip2', '@errmsg', '&nbsp;' ],
				//'ip' : [ 'require', 'ip格式错误', '&nbsp;' ],
			}).do_post({
				msg : {
					right : 'dright',
					error : 'derr'
				},
				form : ye.g('form1'),
				btn : {
					name : 'post',
					text : 'load...'
				}
			});
```

#####寄存验证
```js
		ye.verify('#form1').do_post({
			method : 'ajax',//默认 ajax模式提交
			msg : {
				right : 'dright',
				error : 'derr'
			},
			btn : {
				name : '#post',
				text : 'load...'
			},
			success : function(res){ //成功回调
				alert(res);
			},
			failed : function(xhr){ //错误回调 , 500错误等
				alert(xhr);
			},
			errorCallback : function(){ //验证错误回调
				alert('验证信息出错了');
			}
		});
```

#####默认验证方法列表
>eg: <input type="text" name="idcard" check-rule="idcard" check-warning="错误" check-correct="正确" />

>属性说明  check-rule:  规则, check-warning: 错误提示消息 check-correct: 正确提示消息

>mobile 11位的手机号码

>email 电子邮件地址 如 : testmail@gmail.com

>date 日期格式验证 如 : 2015-1-1

>require 必填字段

>require0 必填字段 默认为0情况

>sex 性别

>radio 单选, 必选 根据name读取多个值

>int 整数, 数字

>price 价格 如: 5.10

>phone 电话号码 如: 11位手机号, 3-5位带区号的座机, 或带4位分机

>idcard 身份证号码, 15或18位

>age 年龄, 需要属性配置 check-conf="{agestart : 6, ageend : 18}"

>ip ip地址

>null 是否为空 undefined, null ,''

#####验证方法扩展
```js
	/*IP验证*/
		var errmsg = "";
		ye.extend({
			ip2 :  function(id){
				var d = ye.g(id).value;
				if(d==''){
					errmsg = '不能为空';
					return false;
				}
				else{
					if(!ye._ip(id)){
						errmsg = '格式错误';
						return false;
					}
					else{
						return true;
					}
				}			
			}
		})
```

>验证使用
>var rule = {'ip' : [ 'ip2', '@errmsg', '&nbsp;' ]}

#####操作符号说明
>var rule = {'ip' : [ 'ip|null', '正确', '只能填写ip地址或者为空' ]}


#####文件说明
>demo.html 演示文档

>demo-verify.html 规则写在文本框中的属性演示 

