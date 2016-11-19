$( function() {
  $.fn.reverse = [].reverse;
      setTimeout(function(){
        $('.products').owlCarousel({
          margin:10,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:3
              },
              1000:{
                  items:4
              }
          }
      });
    },200);

    /*
    * Get data from XML
    */
    $.get('data/product.xml', function(d){

      // Products.html
      $(d).find('product').each(function(){

        var $product = $(this); 
        var image = $product.find("image").text();
        var name = $product.find("name").text();
        var price = $product.find("price").text();
        var cat = $product.find("category").text() + ' ';
        var size = $product.find("size").text()+ ' ';
        var brand = $product.find("brand").text();

        var html = '<div class="col-md-4 product-elements ' +cat+size+brand+ '"><a href="show-product.html"><div class="product-single">';
        html += '<img src="layout/images/' + image + '">';
        html += '<h3>' + name + '</h3>';
        html += '<span>' + price + '$</span>';
        html += '</div></a></div>';

        $('#content .single > .row').append($(html));   
      });

      // New Product
      $(d).find('product').each(function(){
          var $product = $(this); 
          var image = $product.find("image").text();
          var name = $product.find("name").text();
          var price = $product.find("price").text();

          var html = '<div class="col-md-12"><a href="show-product.html"><div class="product">';
          html += '<img src="layout/images/' + image + '">';
          html += '<h3>' + name + '</h3>';
          html += '<span>' + price + '$</span>';
          html += '</div></a></div>';
          
          $('#content .products').append($(html));   
        });

    });



    /*
    * Isotope Product.html
    */
    setTimeout(function(){  
      var $grid = $('.grid').isotope({
      itemSelector: '.product-elements'
      });

    //Category filter
    $('.tope').click(function() {
      // Fillter Selecter
      var filterValue = $( this ).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      // Remove & Add class  Div 
      $('.tope').removeClass('active');
      $( this ).addClass('active');
    });

    //Size filter
    $('.size').click(function() {
      // Fillter Selecter
      var filterValue = $( this ).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      // Remove & Add class  Div 
      $('.size').removeClass('active');
      $( this ).addClass('active');
    });

    //Size filter
    $('.brand').click(function() {
      // Fillter Selecter
      var filterValue = $( this ).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      // Remove & Add class  Div 
      $('.brand').removeClass('active');
      $( this ).addClass('active');
    });

    },200);


     // Slider-range Price Filter
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
        var $grid = $('.grid').isotope({
          itemSelector: '.product-elements',
          filter: function() {
            var number1 = ui.values[0]*10;
            var number2 = ui.values[1]*10;
            var price = $(this).find('span').text();
            return parseInt( price, 10 ) > number1 && parseInt( price, 10 ) < number2;
          }
        });
      }
    });
    $( "#amount1" ).text(  $( "#slider-range" ).slider( "values", 0 )*10 + "$");
    $( "#amount1" ).css('left', $( "#slider-range" ).slider( "values", 0 )-7+"%");
    $( "#amount2" ).text(  $( "#slider-range" ).slider( "values", 1 )*10 + "$");
    $( "#amount2" ).css('left', $( "#slider-range" ).slider( "values", 1 )-7+"%");

});