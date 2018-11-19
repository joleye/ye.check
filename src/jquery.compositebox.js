/**
 *    复合复选框 - ye.check
 */

(function($){
	
	function init(name,target,onSelect){
		var item = $(target);
		
		item.hide();
		
		var ops = $.data(target);
		
		$('<span class="comp-box"><input class="icon-compositebox '+ops.status[0]+'" type="button" value=" "/></span>').insertBefore(item).click(function(){
			var inp = $(this).find('input');
			var cls = inp.attr('class').match(/\s+\w+$/)[0].replace(/\s+/g,'');
			
			var newcls = ye.array(ops.status).next(cls);
			
			inp.removeClass(cls).addClass(newcls);
			
			var index = 0;
			$('input[name='+name+']').each(function(){
				
				if($(this).val()==ops.map[newcls]){
					$(this).attr('checked',true);
					if(onSelect){
						onSelect.call(this,index,true);
					}
				}else{
					$(this).attr('checked',false);
				}
				
				if(onSelect && ops.map[newcls]==''){
					onSelect.call(this,index,false);
				}
				
				index++;
			});
		});
		
	};
	
	$.fn.compositebox = function(option){
		var options = $.extend({
			status : ['none','checked','del']
		},option);
		
		var nodes = {};
		this.each(function(){
			nodes[this.name] = this.parentNode.parentNode;
			$(nodes[this.name]).hide();
		});
		
		$.each(nodes,function(k,val){
			var new_option = ['none'];
			options.map = {'none':''};
			$('input[name='+k+']').each(function(){
				var b = $(this).attr('composite-box'); 
				if(b){
					new_option.push(b);
					options.map[b] = $(this).val();
				}
			});
			
			options.status = $.extend(options.status,new_option);
			
			$.data(val,options);
			
			init(k,val,options.onSelect);
		});
	};
})($);
