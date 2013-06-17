/*

    The build files are for developers and will later be merged with the master.

*/

/*
    BootLoader[Object]:It will serve the purpose of window.onload firing and Ajax.onLoad firing
    Methods-:
    _init:Use to initialise the Bootloader Array
        params: a[Array] which contains the list of functions to be fired or it can be set to true in case
                you require to reset the BootLoaders.
    list:Array List having the list of functions and handlers to be fired
    add:To add a new function or handler to the BootLoader.
        param:f[function/object]: The parameter is directly pushed to the list.
                In case of Object, the init function of the object is called when the BootLoaders are fired!
    isSet: If not initialised then set to false, else true.

*/
BootLoader={_init:function(a){
                    if(!BootLoader.isSet){
                    if(a){
                        BootLoader.list=a;
                        BootLoader.isSet=true;
                    }else{
                        BootLoader.list=new Array();
                        BootLoader.isSet=true;
                        }
                    }else{
                        if(a){
                            BootLoader.list=new Array();
    						}
                        }
                        if(BootLoader.element.addEventListener)
						BootLoader.element.addEventListener("readystatechange",BootLoader.listener,false);
						else
						BootLoader.element.attachEvent("onreadystatechange",BootLoader.listener,false);
                    },
					element:document,
                    listener:function(){
                    	if(BootLoader.element.readyState=="complete"){
							if(BootLoader.element.addEventListener)
							BootLoader.element.removeEventListener("readystatechange",BootLoader.listener,false);
							else
							BootLoader.element.detachEvent("onreadystatechange",BootLoader.listener,false);
						BootLoader.fire();
						}
                    },
					fire:function(){
						if(BootLoader.element.readyState=="complete"&&BootLoader.list.length>0){
							for(func in BootLoader.list){
								if(typeof(BootLoader.list[func])=="function"){
									BootLoader.list[func]();
								}else{
									BootLoader.list[func].init();
								}
							}
						}
					},
                    list:null,
                    add:function(f){
                        if(BootLoader.isSet){
                            if((typeof(f)=="function")||(typeof(f)=="object")){
                                BootLoader.list.push(f);
                                }
                            }else{
                            	BootLoader._init();
                            	BootLoader.add(f);
                            }
                        },isSet:false
            };

	function Ajax(url,method,element) {
	if(this==window)
		return new Ajax(url,method);
	else
		this.object=(window.XMLHttpRequest)?new window.XMLHttpRequest():new window.ActiveXObject("Microsoft.XMLHTTP");
		this.url=url;
		this.d=null;
		this.onError=[];
		this.object.form=null;
		this.object.callback=null;
		this.object.element=element?element:null;
		this.object.ajax=this;
		this.method=method?method:"POST";
		return this;
}
	Ajax.prototype.data=function(raw_data){
							/*
								If it is a Form Element
							*/
							if(raw_data.elements){
								this.d="";
								this.object.form=raw_data;
								for(i=0;i<raw_data.elements.length;i++){
									if(raw_data.elements[i].type!="button"&&raw_data.elements[i].type!="reset"&&raw_data.elements[i].type!="submit")
									this.d+="&" + raw_data.elements[i].name + "=" + raw_data.elements[i].value;
								}
							}else{
								this.d="";
								for(elem in raw_data){
									this.d+=elem+"="+raw_data[elem];
								}
							}
							return this;
					};
	Ajax.prototype.send=function(callbacks){
	this.object.open(this.method,this.url,true);
		if(this.method=="POST")
		this.object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.object.callback=callbacks;
		this.object.onreadystatechange=this.handler;
		this.object.send(this.d);
		return this;
	}
	Ajax.prototype.handler=function(xhr){
		if(this.readyState==4){
						if(this.status==200){
							this.callback(this,this.form);
								
						} else {
							if (this.form) 
							this.form.setAttribute("_ajax",0);
							alert("Could not connect!\nPlease try again.");
						}
		}
	}
function Event(type,object){
	if (this==window) {
		return new Event(type,object);
	}
	this.type=type;
	this.object=object;
	this.__func=null;
}
Event.prototype.bind=function(func,bubble){
	this.__func=func;
	if (window.addEventListener)
		this.object.addEventListener(this.type, this.__func, (bubble ? true : false));
	else
		this.object.addEvent("on"+this.type, this.__func, (bubble ? true : false));
};
Event.prototype.unbind=function(func,bubble){
	this.__func=func;
	if (window.removeEventListener)
		this.object.removeEventListener(this.type, this.__func, (bubble ? true : false));
	else
		this.object.detachEvent("on"+this.type, this.__func, (bubble ? true : false));
};

function Animate(object){
	if (this==window) {
		return new Animate(object);
	}
	this.object=object;
	this.style=window.getComputedStyle(this.object);
	return this;
}
Animate.prototype.fadeIn=function(timer){
	var opacity=this.style["opacity"];
	var display=this.style["display"];
	this.__each(this.object,"opacity",(opacity<=1&&display!="none"?opacity:0), 1.0, 0.1, "", timer);
}
Animate.prototype.fadeOut=function(timer){
	var opacity=this.style["opacity"];
	var display=this.style["display"];
	this.__each(this.object,"opacity",(opacity<=1&&display!="none"?opacity:1), 0.0, 0.1, "", timer);
}
Animate.prototype.fadeTo=function(value,timer){
	var opacity=this.style["opacity"];
	var display=this.style["display"];
	this.__each(this.object,"opacity",(opacity<=1&&display!="none"?opacity:1), value, 0.1, "", timer);
}
Animate.prototype.squash=function(props, timer){
	var property;
	for (property in props) {
		var current=getABS(this.style[property]);
		var object=this.object;
		var inc=current<props[property]?getABS((10*props[property])/current):getABS((10*current)/props[property]);
		if (current<props[property]) {
			inc=(props[property]-current)/inc<4 ? 2 : inc;
		} else {
			inc=(current-props[property])/inc<4 ? 2 : inc;
		}
		this.__each(
		object, property,
		current,
		props[property],
		(property==="opacity"?0.1:(isFinite(inc) ? inc : 1)) ,
		(property==="opacity"?"":"px"),
		(property==="opacity"&&timer<80?120:timer)
		, true);
		
	}
}

Animate.prototype.__each=function(object, property, start, end, inc, unit, timer, override){
	/*
		We dont want to fall in multiple animations running at same instance
		for the same object
	*/
	override=(override)?true:false;
	start=start?start:getABS(window.getComputedStyle(object)[property]);
	if(object.getAttribute("_d")==false||!object.getAttribute("_d")||override){
		object.style[property]=start+unit;
		if (window.getComputedStyle(object)["display"]=="none") {
			object.style.display="block";
		}
		if (!unit) {
			unit="";
		}
		var ticker=setInterval(function(){
			var expander=inc;
			object.setAttribute(property+timer,true);
			if (start<end) {
				if (getABS(object.style[property])<end) {
					object.style[property]=(start-end<10) ? ((inc<0?getABS(object.style[property])+inc : getABS(object.style[property])+inc))+unit : (inc<0 ? (getABS(object.style[property])*expander<end ? getABS(object.style[property])*expander : getABS(object.style[property])+inc) : (getABS(object.style[property])*expander<end ? getABS(object.style[property])*expander : getABS(object.style[property])+inc))+unit;
					expander*=expander;
				} else {
					object.removeAttribute(property+timer,false);
					clearInterval(ticker);
				}
			} else {
				if (getABS(object.style[property])>end) {
					object.style[property]=(end-start<10) ? ((inc<0?(getABS(object.style[property])-inc<end ? getABS(object.style[property])-0.1 : getABS(object.style[property])-inc) : (getABS(object.style[property])-inc<end) ? getABS(object.style[property])-1 : getABS(object.style[property])-inc))+unit : (inc<0 ? (getABS(object.style[property])/expander<end ? getABS(object.style[property])/expander : getABS(object.style[property])-inc) : (getABS(object.style[property])/expander<end ? getABS(object.style[property])/expander : getABS(object.style[property])-inc))+unit;
					expander*=expander;
				} else {
					if (property=="opacity" && object.style[property]==0) {
						object.style.display="none";
					}
					object.removeAttribute(property+timer,false);
					clearInterval(ticker);
				}
			}
		}, timer);
	}
}
function getABS(value){
	if (value!=0) {
	if (isNaN(parseInt(value))||parseInt(value)==0)
		return parseFloat(value);
	else return parseInt(value);
	} else {
		return 0;
	}
}
$=function(id){return document.getElementById(id) ? document.getElementById(id) : null;}
