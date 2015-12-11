// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "customCarousel",
				defaults = {
                    /*speed: 4000*/
				
		};

		// The actual plugin constructor
		function Plugin ( element, options ) { //element = this or target element
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function () {
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like so: this.yourOtherFunction(this.element, this.settings).
				console.log("xD");
		        
		        var carousel = $(this.element);
				this.slider = carousel.find('.slider');
			    console.log(carousel);	
				
        		this.containerWidth = carousel.width();
        		this.containerHeight = carousel.height();
        		
        		this.nav = $('#slider-nav').show();
        		this.click.call(this); 
        		
        		this.totalImgs = carousel.find('img').length;
        		this.imgs = carousel.find('img');
        				
        		this.currentCenter = 0; //first img
        		this.prevCenter = null;
        				
        		this.direction = '';
        		
				},
				    setCurrent: function(direction) {
    				    var pos = this.currentCenter; //is NOT acutally 'this'.current, just the same value
        
                        pos += ( ~~(direction === 'next') || -1); //add 1 IF the dir = 'next' using ~~
                        
                        this.currentCenter = ( pos < 0 ) ? this.totalImgs - 1 : pos % this.totalImgs; // making sure that image is updated back to 0 if necessary
    
                        return pos; //for access later if you need it
				},
					transition: function (coords) {
					    var imgWidth = this.imgs[this.currentCenter].width;
					    console.log(imgWidth);
    					this.slider.animate({
                            'margin-left': coords || -(this.currentCenter * imgWidth) //2 * width = -1200 
                        });
				},
				    click: function() {
				        var self = this;
				        console.log(self.nav);
                            self.nav.find('button').on('click', function() {
                                var test = self.setCurrent( $(this).data('dir') );
                                console.log(test);
                                self.transition();
                        }); 
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );