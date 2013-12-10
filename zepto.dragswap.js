/*!
 * Zepto HTML5 Drag and Drop Sortable
 * Author: James Doyle(@james2doyle) http://ohdoylerules.com
 * Repository: https://github.com/james2doyle/zepto-dragswap
 * Licensed under the MIT license
 */
 ;(function($) {
  $.fn.dragswap = function(options) {
    var dragSrcEl;
    function getPrefix() {
      var el = document.createElement('p'),
      getPre, transforms = {
        'webkitAnimation': '-webkit-animation',
        'OAnimation': '-o-animation',
        'msAnimation': '-ms-animation',
        'MozAnimation': '-moz-animation',
        'animation': 'animation'
      };
      document.body.insertBefore(el, null);
      for (var t in transforms) {
        if (el.style[t] !== undefined) {
          el.style[t] = "translate3d(1px,1px,1px)";
          getPre = window.getComputedStyle(el).getPropertyValue(transforms[t]);
          // return the successful prefix
          return t;
        }
      }
      document.body.removeChild(el);
    }
    this.defaultOptions = {
      element: 'li',
      overClass: 'over',
      moveClass: 'moving',
      dropClass: 'drop',
      dropAnimation: false,
      exclude: '.disabled',
      prefix: getPrefix(),
      dropComplete: function() {
        return;
      }
    };
    
    function excludePattern(elem){
        return elem.is(settings.excludePatt);
    }
      
    function onAnimEnd(elem) {
      var $elem = $(elem);
      $elem.addClass(settings.dropClass);
      // add an event for when the animation has finished
      $elem.on(settings.prefix + 'End', function() {
        // remove the class now that the animation is done
        $elem.removeClass(settings.dropClass);
      }, false);
    }

    function handleDragStart(e) {
      if( !excludePattern($(this))){
          e.preventDefault();
          e.stopPropagation();
          return false;
      }
      $(this).addClass(settings.moveClass);
      // get the dragging element
      dragSrcEl = this;
      // it is moving
      if(e.dataTransfer){
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
      }
    }

    function handleDragEnter(e) {
        
      // this / e.target is the current hover target.
      $(this).addClass(settings.overClass);
    }

    function handleDragLeave(e) {
      $(this).removeClass(settings.overClass); // this / e.target is previous target element.
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }
      if(e.dataTransfer){
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
      }
      return false;
    }

    function handleDrop(e) {
      // this / e.target is current target element.
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }
      if( !excludePattern($(this))){
          return false;
      }    
        
      // Don't do anything if dropping the same column we're draggi.
      if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column dropped on.
        var oldEl = {
          html: this.innerHTML,
          id: this.id
        };
        var newEl = {
          html: dragSrcEl.innerHTML,
          id: dragSrcEl.id
        };
        // swap all the data
        dragSrcEl.innerHTML = oldEl.html;
        dragSrcEl.id = oldEl.id;
        this.innerHTML = newEl.html;
        this.id = newEl.id;
        if (settings.dropAnimation) {
          onAnimEnd(this);
          onAnimEnd(dragSrcEl);
        }
        $(this).siblings().removeAttr('draggable'); 
        $(this).siblings().filter(settings.excludePatt).attr('draggable', true);  
        settings.dropComplete();
      }
      return false;
    }

    var settings = $.extend({}, this.defaultOptions, options);
    if(settings.exclude){  
        if(typeof settings.exclude != 'string'){
            var excludePatt = '';
            for(var i =0; i< settings.exclude.length; i++){
                excludePatt += ':not(' + settings.exclude[i] + ')';
            } 
            settings.excludePatt = excludePatt;
        }
        else{
          settings.excludePatt = ':not(' + settings.exclude + ')';
        }
    }
      
    var method = String(options);
    var items = [];
    // check for the methods
    if (/^(toArray|toJSON)$/.test(method)) {
      if (method == 'toArray') {
        $(this).find(settings.element).each(function(index, elem) {
          items.push(this.id);
        });
        return items;
      } else if (method == 'toJSON') {
        $(this).find(settings.element).each(function(index, elem) {
          items[index] = {
            id: this.id
          };
        });
        return JSON.stringify(items);
      }
      return;
    }
      
    
      
    return this.each(function(index, item) {
      var $this = $(this);
      // select all but the disabled things
      var $elem = $this.find(settings.element);
  
      var target = this;  
      var config = { childList: true };  
      var observer = new MutationObserver(function(mutations) {
          //console.log(mutations); 
          var $element = $this.find(settings.element);
          $element.siblings().removeAttr('draggable'); 
          $element.siblings().filter(settings.excludePatt).attr('draggable', true);      
      });  
        
      observer.observe(target, config);         
      
      function handleDragEnd(e) {   
        $this.removeClass(settings.moveClass);
        // this/e.target is the source node.
        //console.log('handleDragEnd');
        $elem = $this.find(settings.element);
        $elem.each(function(index, item) {
           // console.log(item);
          $(item).removeClass(settings.overClass);
          $(item).removeClass(settings.moveClass);
        });
      }
      // set the items to draggable
      $elem.filter(settings.excludePatt).attr('draggable', true);
        
      $this.on('dragstart', settings.element, handleDragStart);

      $this.on('dragenter', settings.element, handleDragEnter);
      $this.on('dragover', settings.element, handleDragOver);
      $this.on('dragleave', settings.element, handleDragLeave);
      $this.on('drop', settings.element, handleDrop);
      $this.on('dragend', settings.element, handleDragEnd);

    });
  };
})(Zepto);