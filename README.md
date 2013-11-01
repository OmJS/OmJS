OmJS
====

A JavaScript based library to provide robust and efficient platform for HTML5 and later based Apps.
Primary focus for making it compliant to port with Firefox Os Apps, so that a tons of Big Omega notation can be saved.
For more info check this out:
omjs.blogspot.com

How to use
==========

There are following Components of OmJs that can be used for ease

## BootLoader

It provides you a functionality to fire functions/handlers after the window get loaded.
```
BootLoader.add(function(){
   /*
     Do Something Here
   */
 }
 );
```
  It is equivalent to the jquery's ``` $(document).ready(); ```

## Animate

  Wanna have some simple yet easy to use animation function? You can do it in various flavors
```  
 Animate(DomObject).fadeIn(20);
 Animate(DomObject).squash({opacity:1, width:378}, 10);
```
where DomObject is a DOM node.
  Note: Please be advised to use very low valuee of the timer (I am working to make it efficient i.e. Mathematical way to animate)
        Animate Object is currently not written to be compatible with IE but will be in next version

## Event

Bind and Unbind Event Listeners from a DomObject by a very easy method
```
Event("click", DomObject).bind(function(){
   /*
     Do Something Here
   */
 }, isBubble);
```
## JSON

In OmJS, JSON is treated as the smallest component to help you with the following things:
* To Parse a string into a JS object

```
var object = JSON.parse( string, errorHandler);
```

* To replace character stuffing from the strings use to format the data

```
var object = JSON.toString( string, characterToSearch, characterToReplaceWith);
```

for example

```
/*
	Below will output "Hi! I am Good"
*/
var object = JSON.toString( "Hi\u2323 I am good", "\u2323", "!");
```

## XHR Class
A simplest API to help you out with your XHR calls, you can attach it to a form element or call it individually, it just work awesome in both the cases

```
var xhr = new XHR( URL, Method, Form Element/optional);
xhr.send(function(xhr){
	/*
		xhr param here is the original XMLHTTPREQUEST object,
		so you can use xhr.responseText to access output and so on
	*/
});
```
If you provide a form element as an input, then URL and Method are automatically picked up from the form DOM Node.
The beauty still doesn't end, what about JSON XHR calls?
Well that too is possible:

```
var xhr = new XHR( "http://testserver/test?q=2", "GET");
xhr.JSON(function(data){
	/*
		Process things
	*/
});
```


## require Object

To inject CSS, JS objects you can use the require object, its easy and robust, you can load the files asynchronously or synchronously.

```
require.add( {type: "js", src: "myJsFile.js"}, onLoadHandler, errorHandler );
```
