var ye,JoleYe = ye = {};
JoleYe.browser = {}
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    //IE 8下，以documentMode为准
   	JoleYe.browser.ie = document.documentMode || + RegExp['\x241'];
	JoleYe.browser.ie6 = /msie (6.\d)/i.test(navigator.userAgent);
}

JoleYe.browser.firefox = /FireFox/i.test(navigator.userAgent);

JoleYe.g = function(tag){
	this.find(tag);
	return this._d;
};

JoleYe.find = function(seltext){
	if(typeof(tag)=='string'){
		if(/^(#)(\w|_|-)/.test(seltext)){
			this._d = JoleYe.g(seltext.substring(1));
		}
		if(/^.(\w|_|-)/.test(seltext)){
			this._d = JoleYe.g(seltext.substring(1));
		}
	}
	else
		this._d = tag;
			
	return this;
};

JoleYe.done = function(event){
	e = event ? event : window.event;
	if(!e) e = JoleYe.getEvent();
	if(e && JoleYe.browser.ie) {
		e.returnValue = false;
		e.cancelBubble = true;
	} else if(e) {
		e.stopPropagation();
		e.preventDefault();
	}
}

JoleYe.getEvent = function() {
	if(document.all) return window.event;
	
	func = getEvent.caller;
	
	while(func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if((arg0.constructor  == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func=func.caller;
	}
	return null;
};

JoleYe.d = function(func){
	func.apply(this._d);
}

JoleYe.setVal = function(val){
	this._d.value = val;
}

JoleYe.getVal = function(){
	return this._d.value;	
}

JoleYe.setHtml = function(html){
	this._d.innerHTML = html;
}

JoleYe.css = function(o,data){
	o = JoleYe.g(o);
	if(!o || !o.style){return;}
	
	for(var k in data){
		o.style[k] = data[k];
	}
}

/**
  * 对象属性设置
  *  ie6,7下class转换
  */
JoleYe._NAME_ATTR = function(key){
	var _NAME = {
			'cellpadding': 'cellPadding',
			'cellspacing': 'cellSpacing',
			'colspan': 'colSpan',
			'rowspan': 'rowSpan',
			'valign': 'vAlign',
			'usemap': 'useMap',
			'frameborder': 'frameBorder'
	}
	if(JoleYe.browser.ie < 8){
			_NAME['class'] = 'className';
			_NAME['for'] = 'htmlFor';
	} else  {
        _NAME['htmlFor'] = 'for';
        _NAME['className'] = 'class';
    }
	
	return _NAME[key] || key;
}

/*设置对象属性*/
JoleYe.setAttr = function(d,key,data){
	if(typeof data=='undefined'){
		for(var k in key){
			var k1 = JoleYe._NAME_ATTR(k);
			d.setAttribute(k1,key[k]);
		}
	}else{
		if(d){
			key = JoleYe._NAME_ATTR(key);
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
}

/*对象属性读取*/
JoleYe.getAttr = function(d,key){
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
}

/*创建dom对象*/
JoleYe.create = function(tag){
	return document.createElement(tag);	
}

/*点击事件绑定*/
JoleYe.click = function(d,f){
	if(typeof d=='string')
		d = JoleYe.g(d);

	if(d)
		JoleYe.dom.bindEvent(d,'click',f)
		//d.onclick = f;
}

/*改变文本框值*/
JoleYe.input = function(d,fn){
	if(typeof d=='string')
		d = JoleYe.g(d);
	if(d){
		if(JoleYe.browser.ie){
			d.onpropertychange = fn;	
		}
		else{
			d.addEventListener("input",fn,false);
		}
	}
}

/*鼠标移到事件*/
JoleYe.mouseover = function(d,f){
	if(typeof d=='string')
		d = JoleYe.g(d);

	d.onmouseover = f;
}

/*鼠标移出事件*/
JoleYe.mouseout = function(d,f){
	if(typeof d=='string')
		d = JoleYe.g(d);

	d.onmouseout = f;
}

JoleYe.submit = function(d,f){
	if(typeof d=='string')
		d = JoleYe.g(d);
	if(typeof f=='undefined')
		d.submit();
	d.onsubmit = function(){
		return f.apply(d);
	};
}

JoleYe.change = function(d,f){
	if(typeof d=='string')
		d = JoleYe.g(d);

	d.onchange = f;
}

/*加载事件*/
JoleYe.ready = function(func){
	if(typeof(window.onload)=="function"){
		var ofunc = window.onload;
		window.onload = function(){
			ofunc();func();
		}
	}
	else{
		window.onload = function(){
			func();
		}
	}
}

/*统计数据数量*/
JoleYe.count = function(o){
	var i=0;
	for(var k in o){
		i++;
	}
	return i;
}

/*扩展部分 start*/
/*flash 显示*/
JoleYe.swf = {};
JoleYe.swf.display = function(data,d){
	var s = "";
	s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="'+data.width+'" height="'+data.height+'">';
    s += '<param name="movie" value="'+data.url+'" />';
    s += '<param name="quality" value="high" />';
    s += '<param name="wmode" value="opaque" />';
    s += '<param name="wmode" value="transparent" />';
    s += '<embed src="'+data.url+'" quality="high" wmode="opaque" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="'+data.width+'" height="'+data.height+'"></embed>';
  	s += '</object>';
	
	if(typeof(data.href)=='string')
	{
		JoleYe.g(d).style.position = "relative";
		s +=  '<a style="position:absolute;width:'+data.width+'px;height:'+data.height+'px;left:0px;top:0px;cursor:pointer;z-index:10;background-color:#fff;filter:alpha(opacity=0);opacity:0;" href="'+data.href+'" target="_blank"></a>'
	}
	JoleYe.g(d).innerHTML = s;
}

/*日期计算*/
JoleYe.date = {};
JoleYe.date.datediff = function(interval,date1,date2){
	date1 = date1.replace(/-| |:/g,',');
	date2 = date2.replace(/-| |:/g,',');
	
	var d1 = new Date(date1);
	var d2 = new Date(date2);
	
    var d=d1, i={}, t=d.getTime(), t2=d2.getTime();
    i['y']=d2.getFullYear()-d.getFullYear();
    i['q']=i['y']*4+Math.floor(d2.getMonth()/4)-Math.floor(d.getMonth()/4);
    i['m']=i['y']*12+d2.getMonth()-d.getMonth();
    i['ms']=d2.getTime()-d.getTime();
    i['w']=Math.floor((t2+345600000)/(604800000))-Math.floor((t+345600000)/(604800000));
    i['d']=Math.floor(t2/86400000)-Math.floor(t/86400000);
    i['h']=Math.floor(t2/3600000)-Math.floor(t/3600000);
    i['n']=Math.floor(t2/60000)-Math.floor(t/60000);
    i['s']=Math.floor(t2/1000)-Math.floor(t/1000);
    return i[interval];
}

/*ajax请求*/
JoleYe.ajax = {};
JoleYe.ajax.get = function(uri,func){
	if(!uri)
	return;
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest():new ActiveXObject("MSXML2.XMLHTTP");
	xhr.open('GET', uri, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4)
			func(xhr);
		};
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	xhr.send(''); 
}

/*post 方法*/
JoleYe.ajax.post = function(uri,data,func){
	var xhr = (window.XMLHttpRequest)? new XMLHttpRequest():new ActiveXObject("MSXML2.XMLHTTP");
	xhr.open('POST', uri, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4)
			func(xhr);
		};
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
	var sdata = "";
	for(var k in data){
		sdata += k+'='+data[k]+'&'	;
	}
	xhr.send(sdata); 
}

JoleYe.dom = {};
JoleYe.dom._ARRAY_DATA =  function(id){
		return JoleYe._ARRAY_DATA(id);
}

/*移除*/
JoleYe.dom.remove = function(e){
	if(typeof e=='string'){
		if(JoleYe.g(e)){
			JoleYe.g(e).innerHTML = '';
			document.body.removeChild(JoleYe.g(e));
		}
	}
	else{
		//e.innerHTML = '';
		document.body.removeChild(e);
	}
}

/*遍历dom对象*/
JoleYe.dom.each = function(d,func){
	if(typeof d == 'string')
		d = JoleYe.g(d);
	if(typeof d == 'object' && typeof d.length !='undefined'){
		for(var i=0;i<d.length;i++){
			//if (d.hasOwnProperty(k)) {
				func.apply(d[i]);
			//}
		}
	}
	else{
			func.apply(d);
	}
}

/*申明快捷方式*/
JoleYe.each = function(d,func){
	JoleYe.dom.each(d,func);	
}

/*下拉框选中*/
JoleYe.dom.option = function(id,v){
		var d = JoleYe.g(id);
		if(d==null)
			return;
		if(typeof d == 'object' && typeof d.length !='undefined'){
			for(var i=0;i<d.length;i++){
				if(d[i].value == v)
					d[i].setAttribute("selected","selected")
			}
		}
}

JoleYe.dom.addClass = function(d,name){
	d.className += ' '+name;	
}

JoleYe.dom.removeClass = function(d,name){
	var newclass = d.className.replace(name,'');
	newclass = newclass.replace(/ $/,'');
	d.className = newclass;
}

JoleYe.dom.bindEvent = function(elem,type,fn){
	if(elem.attachEvent){
		elem.attachEvent("on"+type,function(){
			fn.apply(elem,arguments);
		});
	}else{
		elem.addEventListener(type,fn,false);
	}
};

/*浏览器对象*/
JoleYe.location = {
	get:function(paras){
		var url = location.href;
		var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
		var paraObj = {}
		for (i=0; j=paraString[i]; i++){
			paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
		}
		var returnValue = paraObj[paras.toLowerCase()];
		if(typeof(returnValue)=="undefined"){
		return "";
		}else{
		return returnValue;
		} 
	}	
};

/*自动切换 需要jq库
	ye.tab({
		box:'boxId',		//最外面的div
		cont:'contId',		//包裹内容的div
		item:'item li',		//重复部分，支持jquery筛选器
		btnNext:'btn_right',	//下一个的按钮
		btnPrev:'btn_left', //上一个的按钮
		autoplay:false,		//
		interval:4			//自动播放间隔，单位秒
	});
	*/
JoleYe.tablist = {};
JoleYe.tab = function(options){
	var jcont = $('#'+options.cont);
	var jbox = $('#'+options.box);
	var jitem = jcont.find(options.item+':first');
	
	//边框宽度
	var border = parseInt(jitem.css('borderLeftWidth'))+parseInt(jitem.css('borderRightWidth'));
	
	//单个宽度
	var itemwidth = parseInt(jitem.css('width'))+(parseInt(jitem.css('marginLeft')))+parseInt(jitem.css('marginRight'))+border;
	
	//可用数量
	var itemnum = jcont.find(options.item).length;
	
	//滚动区宽度
	var swidth = itemwidth*itemnum;
	jcont.css({'width':(swidth*2)+'px','margin-left':(swidth*-1)+'px'});
	
	var width = T.g(options.box).offsetWidth;
	var html = $('#'+options.cont).html();
	jcont.html(html+html);
	
	JoleYe.click(options.btnNext,function(){
		var ml = (parseInt(jcont.css('marginLeft'))*-1);
		if(ml+width>=parseInt(jcont.css('width'))){
			var wid = swidth-width;
			jcont.css('marginLeft',(wid*-1)+'px');
			ml = -wid*-1;
		}
		var step = width+ml;
		jcont.animate({
			marginLeft:(step*-1)+"px"}
		,"slow");
		
		play();
		
		var tdom = jbox.find('.tab-ui-list .hover').next();
		if(tdom.html()==null)
			tdom = jbox.find('.tab-ui-list span:first');
		
		jbox.find('.tab-ui-list .hover').removeClass('hover');
		tdom.addClass('hover');
	})
	
	JoleYe.click(options.btnPrev,function(){
		var ml = (parseInt(jcont.css('marginLeft'))*-1);
		if(ml<=0){
			var wid = swidth;
			jcont.css('marginLeft',(wid*-1)+'px');
			ml = wid;
		}
		var step = ml-width;
		jcont.animate({
			marginLeft:(step*-1)+"px"}
		,"slow");
	})
	
	jcont.hover(function(){
		clearInterval(JoleYe.tablist[options.cont]);
	},function(){
		play();
	})
	
	//自动播放
	function play(){
		clearInterval(JoleYe.tablist[options.cont]);
		if(options.autoplay){
			JoleYe.tablist[options.cont] = setInterval(function(){
				JoleYe.g(options.btnNext).click();
				
			},options.interval*1000,options)
		}
	}
	
	play();
	
	if(options.type=='pt'){
		var html = '<div class="tab-ui-list">';
        
		for(var i=0;i<itemnum;i++){
			html += '<span';
			if(i==0)
				html += ' class="hover"';
			
			html += '>•</span>';
		}
		html += '</div>'
        
		$(html).appendTo(jbox);
		jbox.find('.tab-ui-list>span').hover(function(){
			jbox.find('.tab-ui-list .hover').removeClass('hover');
			$(this).addClass('hover');
		
			clearInterval(tochgo.tablist[options.cont]);
			var index = jbox.find('.tab-ui-list span').index(this);
			var left = (index + itemnum) * width;
			jcont.animate({
				marginLeft:(left*-1)+"px"}
			,"slow");
		},function(){
			play();	
		})
	}
};