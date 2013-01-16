/*

    The build files are for developers and will later be merged with the master.

*/

/*
    BootLoader[Object]:It will server the purpose of window.onload firing
    Methods-:
    _init:Use to initialise the Bootloader Array
        params: a[Array] which contains the list of functions to be fired or it can be set to true in case
                you require to reset the BootLoaders.
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
                        if(a)
                        BootLoader.list=new Array();
                        }
                    },
                    list:null,
                    add:function(f){
                        if(BootLoader.isSet){
                            if(f typeof "function"|| f typeof "object"){
                                BootLoader.list.push(f);
                                }
                            }
                            };
