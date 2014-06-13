/**
 * 表单验证控件
 * @author joleye
 */

var ye,JoleYe = ye = {};

ye.browser = {}
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    //IE 8下，以documentMode为准
	ye.browser.ie = document.documentMode || + RegExp['\x241'];
   	ye.browser.ie6 = /msie (6.\d)/i.test(navigator.userAgent);
}

ye.browser.firefox = /FireFox/i.test(navigator.userAgent);

ye.g = function(tag){return typeof(tag)=='string'?document.getElementById(tag):tag;};

/*创建dom对象*/
ye.create = function(tag){
	return document.createElement(tag);	
};

ye.css = function(o,data){
	o = ye.g(o);
	if(!o || !o.style){return;}
	
	for(var k in data){
		o.style[k] = data[k];
	}
};

/*设置对象属性*/
ye.setAttr = function(d,key,data){
	if(typeof data=='undefined'){
		for(var k in key){
			var k1 = JoleYe._NAME_ATTR(k);
			d.setAttribute(k1,key[k]);
		}
	}else{
		if(d){
			key = ye._NAME_ATTR(key);
			if(/INPUT|FORM/.test(d.nodeName)){
				if(typeof(d.getAttribute(key))=='object')
				{
					var dom = d.attributes[key];
					if(dom)
						d.attributes(key).value = data;
					else
						d.setAttribute(key,data);	
				}
				else
					d.setAttribute(key,data);
			}
			else
				d.setAttribute(key,data)
		}
	}
};

/*对象属性读取*/
ye.getAttr = function(d,key){
	if(!d) return;
	d = this.g(d);
	key = JoleYe._NAME_ATTR(key);
	
	if(/INPUT|FORM/.test(d.nodeName))
		if(typeof(d.getAttribute(key))=='object'){
			var dom = d.attributes[key];
			if(dom)
				return d.attributes[key].value
			else
				return d.getAttribute(key)	;
		}
		else
			return d.getAttribute(key)	;
	else
		return d.getAttribute(key)	;
};

/**
 * 对象属性设置
 *  ie6,7下class转换
 */
ye._NAME_ATTR = function(key){
	var _NAME = {
			'cellpadding': 'cellPadding',
			'cellspacing': 'cellSpacing',
			'colspan': 'colSpan',
			'rowspan': 'rowSpan',
			'valign': 'vAlign',
			'usemap': 'useMap',
			'frameborder': 'frameBorder'
	};
	if(ye.browser.ie < 8){
			_NAME['class'] = 'className';
			_NAME['for'] = 'htmlFor';
	} else  {
       _NAME['htmlFor'] = 'for';
       _NAME['className'] = 'class';
   }
	
	return _NAME[key] || key;
}

ye.check = function(c,id){
	if ( window == this ) return new ye.check(d,id);
	var _dom = ye.g(id);
	return this.init(c,_dom);
};

ye.init = function(c,dom){
	this.conf = c;
	this._dom = dom;
	return this;
};

/*新验证提交*/
ye.do_post = function(option){
	var conf = this.conf;
	var err = false;
	this._option = option;
	for(var k in conf){
		var f = this._task_key(k);
		if(f) err = true;
	}
	if(err){
		alert('信息填写格式错误或不完整，请检查红色标记部分');
	}
	else{
		if(typeof option.btn!='undefined'){
			ye.g(option.btn.name).value = option.btn.text;
			ye.g(option.btn.name).disabled = true;
		}
		
		var subdom;
		
		if(typeof this._dom!='undefined')
			subdom = this._dom;
		else if(option.form)
			subdom = option.form;
		
		if(option.method == 'ajax'){
			var action = $(subdom).attr('action');
			$.post(action,$(subdom).serialize(),function(env){
				ye.g(option.btn.name).disabled = false;
				option.success(env);
			});
		}
		else{
			if(option.success){
				option.success.apply(this);
			}
			
			subdom.submit();
		}
	}
};

ye._task_key  = function(k){
	var val = this.conf[k];

	eval('var ret = ye._'+val[0]+'("'+k+'")');
	
	var option = this._option;
	var d = ye.g(k+'_msg');
	if(!d){
		var cd = ye.create("label");
		cd.id = k+'_msg';
		$(cd).addClass('control-label').addClass('text-left');//bootstrap css
		var msgdom;
		if(ye.g(k))
			msgdom = ye.g(k);
		else
			msgdom = $(this._option.form).find('*[name='+k+']')[0];
		
		msgdom.parentNode.parentNode.appendChild(cd);
		
		d = ye.g(k+'_msg');
	}
	
	var val2 = this._task_var(val[2]);
	var val1 = this._task_var(val[1]);
	if(ret==2){
		return ;
	}else if(ret){
		d.innerHTML = val2;
		$(d).removeClass(option.msg.error).addClass(option.msg.right);
		ye.css(ye.g(k),{'borderColor':'','backgroundColor':''});
		return;
	}else{
		d.innerHTML = val1;
		$(d).removeClass(option.msg.right).addClass(option.msg.error);
		ye.css(ye.g(k),{'borderColor':'#f00',
			'backgroundColor':'#FFCCCC'
		});
		return true;
	}
};

/*在开头字母为@的时候当变量处理*/
ye._task_var = function(k){
	if(k.indexOf('@')==0){
		var val = k.substring(1);
		var ret = "";
		eval('ret='+val);
		return ret;
	}
	else
		return k;
};

ye._do_blur = function(d){
	ye._task_key(d);
};

/*焦点移开验证*/
ye.do_blur = function(option){
	this._option = option;
	for(var k in this.conf){
		ye.g(k).onblur = function(){
			ye._do_blur(this.id);
		};
	}
};


/*手机号码验证*/
ye._mobile = function(id){
	 if(id=='') return false;
		var d = ye.g(id).value;
		return /^1\d{10}$/.test(d);
};

/*电子邮件验证*/
ye._email = function(id){
		var d = ye.g(id).value;
		return /^(\w|\d|_|\-|\.){1,20}@(\w|\d|-)+\.(com|cn|net|gov\.cn|com\.cn|net\.cn)$/.test(d);
};

/*日期格式验证*/
ye._date = function(id){
	var d = ye.g(id).value;	
	return /^\d{4}\-\d{1,2}-\d{1,2}$/.test(d);
};

/*必填字段*/
ye._require = function(id){
	var d = ye.g(id).value;
	return d=='' ? false : true;
};

/*必填字段 默认为0情况*/
ye._require0 = function(id){
	var d = ye.g(id).value;
	return d=='0' ? false : true;
};

/*性别*/
ye._sex = function(id){
	return this._radio(id);
};

/*单选*/
ye._radio = function(id){
	var tag = document.getElementsByTagName("input");
	for(var i=0;i<tag.length;i++){
		if(tag[i].name == id){
				if(tag[i].checked)
				return true;
		}	
	}
	return false;
};

/*数字*/
ye._int = function(id){
	var d = ye.g(id) && ye.g(id).value;
	return /^\d+$/.test(d);
};

/*price*/
ye._price = function(id){
	var d = ye.g(id).value;
	return /^(\d|\.)+$/.test(d);
};

/*电话*/
ye._phone = function(id){
	var d = ye.g(id).value;
	return /(^\d{11}$)|(^\d{3,5}\-\d{7,8}$)|(^\d{3,5}\-\d{7,8}\-\d{4}$)/.test(d);
};

/*手机*/
ye._mobile = function(id){
	var d = ye.g(id).value;
	return /^\d{11}$/.test(d);
};

/*身份证号*/
ye._idcard = function(id){
	var d = ye.g(id).value;
	return /^[\dx]{15,18}$/.test(d);
};

/*年龄*/
/**
 *  需要对表单值进行配置 如：<input name='name' check-conf="agestart:18,ageend:60" />
 *  agestart:开始年龄
 *  ageend:结束年龄
 */
ye._age = function(id){
	var d = ye.g(id);
	var checkconf = ye.getAttr(d,'check-conf');	
	eval('var cdataconf='+checkconf);
	
	if(d.value >cdataconf.agestart && d.value <= cdataconf.ageend)
		return true;
	else
		return false;
};

/*IP验证*/
ye._ip = function(id){
	var d = ye.g(id).value;
	return /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/.test(d);
};