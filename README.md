OmJS
====

A JavaScript based library to provide robust and efficient platform for HTML5 and later based Apps.
Primary focus for making it compliant to port with Firefox Os Apps, so that a tons of Big Omega notation can be saved.
For more info check this out:
omjs.blogspot.com

How to use
==========

There are following Components of OmJs that can be used for ease

<<<<<<< HEAD
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
=======
BootLoader
==========
It provides you a functionality to fire functions/handlers after the window get loaded.
- BootLoader.add(function(){
-   /*
-     Do Something Here
-   */
- }
- );
  It is equivalent to the jquery's - $(document).ready();

Animate
=======
  Wanna have some simple yet easy to use animation function? You can do it in various flavours
  
- Animate(DomObject).fadeIn(20);
- Animate(DomObject).squash({opacity:1, width:378}, 10);
  where DomObject is a DOM node.
  Note: Please be advised to use very low valuee of the timer (I am working to make it efficient i.e. Mathematical way to animate)
        Animate Object is currently not written to be compatible with IE but will be in next version

Event
=====
Bind and Unbind Event Listeners from a DomObject by a very easy method
- Event("click", DomObject).bind(function(){
-   /*
-     Do Something Here
-   */
- }, isBubble);
- 
>>>>>>> 403f97dcc46d9fc3b6025196e96ee920bc16ee92
