/*!
 * Zepto HTML5 Drag and Drop Sortable
 * Author: @james2doyle james2doyle@gmail.com
 * Licensed under the MIT license
 */
;(function($) {
  $.fn.dragswap = function(options) {
    var dragSrcEl;
    function getPrefix() {
      var d = document, el = d.createElement('p'),
      getPre, transforms = {
        'webkitAnimation': '-webkit-animation',
        'OAnimation': '-o-animation',
        'msAnimation': '-ms-animation',
        'MozAnimation': '-moz-animation',
        'animation': 'animation'
      };
      d.body.insertBefore(el, null);
      for(var t in transforms) {
        if(el.style[t] !== undefined) {
          el.style[t] = "translate3d(1px,1px,1px)";
          getPre = window.getComputedStyle(el).getPropertyValue(transforms[t]);
          // return the successful prefix
          return t;
        }
      }
      d.body.removeChild(el);
    }
    this.defaultOptions = {
      element: 'li',
      overClass: 'over',
      moveClass: 'moving',
      dropClass: 'drop',
      dropAnimation: false,
      exclude: '.disabled',
      prefix: getPrefix()
    };

    function onAnimEnd(elem) {
      $(elem).addClass(settings.dropClass);
      // add an event for when the animation has finished
      $(elem).on(settings.prefix + 'End', function() {
        // remove the class now that the animation is done
        $(elem).removeClass(settings.dropClass);
      }, false);
    }

    function handleDragStart(e) {
      $(this).addClass('moving');
      // get the dragging element
      dragSrcEl = this;
      // it is moving
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnter(e) {
      // this / e.target is the current hover target.
      $(this).addClass(settings.overClass);
    }

    function handleDragLeave(e) {
      $(this).removeClass(settings.overClass); // this / e.target is previous target element.
    }
    function handleDragOver(e) {
      if(e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        return false;
      }
      var settings = $.extend({}, this.defaultOptions, options);
      return this.each(function(index, item) {
        var $this = $(this);
        // select all but the disabled things
        var $elem = $this.find(settings.element).filter(':not(' + settings.exclude + ')');

        function handleDrop(e) {
        // this / e.target is current target element.
        if(e.stopPropagation) {
          e.stopPropagation(); // Stops some browsers from redirecting.
        }
        // Don't do anything if dropping the same column we're dragging.
        if(dragSrcEl != this) {
          // Set the source column's HTML to the HTML of the column we dropped on.
          var oldEl = { html: this.innerHTML, id: this.getAttribute('id')};
          var newEl = { html: dragSrcEl.innerHTML, id: dragSrcEl.getAttribute('id')};
          // swap all the data
          dragSrcEl.innerHTML = oldEl.html;
          dragSrcEl.setAttribute('id', oldEl.id);
          this.innerHTML = newEl.html;
          this.setAttribute('id', newEl.id);
          if(settings.dropAnimation) {
            onAnimEnd(this);
            onAnimEnd(dragSrcEl);
          }
        }
        return false;
      }

      function handleDragEnd(e) {
        $(this).removeClass('moving');
        // this/e.target is the source node.
        $elem.each(function(index, item) {
          $(this).removeClass(settings.overClass);
        });
      }
      // set the items to draggable
      $elem.filter(':not(' + settings.exclude + ')').attr('draggable', true);
      $elem.on('dragstart', handleDragStart);
      $elem.on('dragenter', handleDragEnter);
      $elem.on('dragover', handleDragOver);
      $elem.on('dragleave', handleDragLeave);
      $elem.on('drop', handleDrop);
      $elem.on('dragend', handleDragEnd);
    });
};
})(Zepto);