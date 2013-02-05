HTML5 Sortable jQuery Plugin
============================

**[Demos](http://james2doyle.github.com/zepto-drag-sort)**

Why Not Sortable
----------------
It is sortable, but its more like swappable...

Features
--------

* 2KB (minified).
* Built using native HTML5 drag and drop API.
* Supports both list and grid style layouts.
* Add drop animations with CSS3.
* Class control for move, over, drop and exclude.
* Vender prefix getter for detecting animation end.
* Works in IE 7+, Firefox 16+, Chrome 23+, Safari 5.1+ and, Opera 12.1+.

Usage
-----
Use `sortable` method to create a sortable list:

``` javascript
$('.sortable').dragswap({
    element: 'li', // the child element you are targeting
    overClass: 'over', // class when element goes over another element
    moveClass: 'moving', // class when element is moving
    dropClass: 'drop', // the class to add when the element is dropped
    dropAnimation: false, // do you want to detect animation end?
    exclude: '.disabled', // excluded elements class
    prefix: getPrefix() // function to get the prefix of the browser
});
```

Drop Animation
--------------
There is a function to detect animation end in the drop handler. Enabling dropAnimation will detect this. Otherwise the class will stay on the elements.

To Do
-----

* serialize/toArray/toJSON export
* afterDrop function for AJAX save or something
* elements actually sort and don't just swap
* test in <IE9 because classList should be used
* connected lists
* drag handle

License
-------
(The MIT License)

Copyright (c) 2013 James Doyle(james2doyle) <james2doyle@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
