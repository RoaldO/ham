console.debug('switch tile loading');
(function ( $ ) {

    var shade = "#556b2f";

    $.fn.switchTile = function() {
        this.css( "color", shade );
        return this;
    };

}( jQuery ));
console.debug('switch tile loaded');
