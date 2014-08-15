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
		
		act_func[func] && act_func[func](conf);
	});
};

var act_func = {
	act_link : function(conf){
		location.href = conf.url;
	}
};

