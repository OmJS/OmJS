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
function Ajax(url,method) {
	if(this==window)
		return new Ajax(url,method);
	else
		this.object=(window.XMLHttpRequest)?new window.XMLHttpRequest():new window.ActiveXObject("Microsoft.XMLHTTP");
		this.url=url;
		this.d=null;
		this.onError=[];
		this.method=method?method:"POST";
		return this;
}
	Ajax.prototype.data=function(data){
								this.d=data;
							return this;
					};
	Ajax.prototype.send=function(callbacks){
	this.object.open(this.method,this.url,true);
		for(headers in this.d){
			this.object.setRequestHeader(headers,this.d[headers]);
		}
		this.object.onreadystatechange=callbacks;
		this.object.send(this.url,null,true);
		return this;
	}