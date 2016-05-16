/**
 * Triggerlink v1.0
 * A jQuery plugin
 *
 * Created by Melvin Jansen
 * contact@madetocreate.nl
 */

!(function($, document, window, undefined) {

    /**
     * Plugin name
     * @var string
     */
    var _pluginName = 'triggerLink';

    /**
     * Constructor triggerLink_plugin
     *
     * Aliased as 'tl'
     *
     * @param jQuery Element Wrapping container div
     * @return triggerLink_plugin
     */
    var tl = triggerLink_plugin = function ($element, options) {

        // scope it
        var self = this;

        // store element
        self.$element = $element;

        // create triggerlink
        self.createTriggerLink();
    };

    /**
     * Toggle class on label
     *
     * @return void
     * @access public
     */
    tl.prototype.createTriggerLink = function() {

        // scope it
        var self = this;

        // on element hover, create timeout
        self.$element.hover(function() {

        	// get the title and description to fill triggerbox
			triggerTitle = $(this).data('title');
			triggerContent = $(this).data('content');

			// set timeout and show / hide triggerbox
			triggerTimeout = setTimeout(function() {
				self.showTriggerbox(triggerTitle, triggerContent);
			}, 600);

		}, self.hideTriggerbox);
    };

    /**
     * show the triggerbox
     *
     * @return void
     * @access public
     */
    tl.prototype.showTriggerbox = function(triggerTitle, triggerContent) {

        // scope it
        var self = this;

        // var triggerbox
        var triggerbox = $("<div class='triggerbox'><b>"+triggerTitle+"</b><p>"+triggerContent+"</p></div>");

        // append the triggerbox to hovered link
        triggerbox.appendTo(self.$element);
    };

    /**
     * hide the triggerbox
     *
     * @return void
     * @access public
     */
    tl.prototype.hideTriggerbox = function() {

        // scope it
        var self = this;

        // clear the timeout
        clearTimeout(triggerTimeout);

        // remove the actual triggerbox
 	    $(".triggerbox").fadeOut().remove();
    };

    /**
     * triggerLink plugin
     *
     * @return jQuery objects
     */
    $.fn.triggerLink = function(options) {

        // put args in array
        var args = Array.prototype.slice.call(arguments, 1);

        // initialize the items
        return this.each(function() {

            // store the element the plugin is set on
            var $element = $(this);

            // guard if plugin was already initted
            var instance = $element.data('plugin_'+ _pluginName);

            // if plugin was not innited
            if(!instance) {

                // init plugin on element and set guard data on element
                $element.data('plugin_'+ _pluginName, new triggerLink_plugin($element, options));
            } else {

                // if instance already created call method from plugin
                if(typeof options === 'string') {
                    instance[options].apply(instance, args);
                }
            }
        });
    };


})(jQuery, document, window);
