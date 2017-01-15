(function ( $ ) {
    $.fn.weatherTile = function(params) {
        var tileNode = this;
        var properties = JSON.parse($(this).find('div.data-properties').html());
        var fld_weather = $(this).find('.fld_weather');
        var fld_isDay = $(this).find('.fld_isDay');
        var fld_temperature = $(this).find('.fld_temperature');

        $.getJSON("http://apidev.accuweather.com/currentconditions/v1/247928.json?language=en&apikey=hoArfRosT1215", function(a, status, c){

            fld_weather = fld_weather.text(a[0].WeatherText + "(" + a[0].WeatherIcon + ")");
            fld_isDay = fld_isDay.text(a[0].IsDayTime+"");
            fld_temperature = fld_temperature.text(a[0].Temperature.Metric.Value);

        });
    };
}( jQuery ));
