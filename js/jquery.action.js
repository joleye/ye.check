/**
 * jquery.action 插件，支持事件操作
 * @author joleye
 */
;
$.fn.action = function(){
	this.click(function(){
		var attr = $(this).attr('act-conf');
		var conf;
		eval('conf = {'+attr+'}');
		
		var func = 'act_'+conf.act;
		
		act_func[func] && act_func[func](conf,this);
	});
};

var act_func = {
	act_link : function(conf){
		location.href = conf.url;
	},
	act_post : function(conf,dthis){
		var ext = conf.extend?conf.extend:{};
		
		ye.verify(conf.form,ext).do_post({
			method : 'ajax',
			msg : {
				right : 'dright',
				error : 'derr'
			},
			btn : {
				name : dthis,
				text : 'load...'
			},
			success : function(env){
				if(env.result){
					$.messager.alert("系统提示",env.msg);
				}else{
					$.messager.alert("错误提示",env.msg);
				}
			}
		});
	}
};

