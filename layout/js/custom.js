$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 20, 50 ],
      slide: function( event, ui ) {
        $( "#amount1" ).text( ui.values[ 0 ]*10 + "$");
        $( "#amount1" ).css('left', ui.values[ 0 ]-7+"%");
        $( "#amount2" ).text( ui.values[ 1 ]*10 + "$");
        $( "#amount2" ).css('left', ui.values[ 1 ]-7+"%");
      }
    });
    $( "#amount1" ).text(  $( "#slider-range" ).slider( "values", 0 )*10 + "$");
    $( "#amount1" ).css('left', $( "#slider-range" ).slider( "values", 0 )-7+"%");
    $( "#amount2" ).text(  $( "#slider-range" ).slider( "values", 1 )*10 + "$");
    $( "#amount2" ).css('left', $( "#slider-range" ).slider( "values", 1 )-7+"%");
});