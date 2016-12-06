console.debug('debugger tile loading');
(function ( $ ) {

    var shade = "#556b2f";

    $.fn.debuggerTile = function() {
        this.css( "color", shade );
        return this;
    };

}( jQuery ));
console.debug('debugger tile loaded');
