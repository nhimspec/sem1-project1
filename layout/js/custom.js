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
        var sales = $product.find("sales").text();
        var cat = $product.find("category").text() + ' ';
        var size = $product.find("size").text()+ ' ';
        var brand = $product.find("brand").text();
        var description = $product.find("description").text();

        var html = '<div class="col-md-4 product-elements ' +cat+size+brand+ '"><a class="tap"><div class="product-single">';
        html += '<img src="layout/images/products/' + image + '">';
        html += '<h3>' + name + '</h3>';
        html += '<span>' + price + '$</span>';
        if ( sales != '' ){
          html += '<span class="sales" style="margin-left:30px;">' + sales + '</span>';
        }
        html += '<input type="hidden" value="'+ description +'">';
        html += '</div></a></div>';

        $('#content .single > .row').append($(html));   
      });

      // New Product
      $(d).find('product').each(function(){
          var $product = $(this); 
          var image = $product.find("image").text();
          var name = $product.find("name").text();
          var price = $product.find("price").text();
          var sales = $product.find("sales").text();
          var description = $product.find("description").text();

          var html = '<div class="col-md-12"><a class="tap"><div class="product">';
          html += '<img src="layout/images/products/' + image + '">';
          html += '<h3>' + name + '</h3>';
          html += '<span>' + price + '$</span>';
          if ( sales != '' ){
            html += '<span class="sales" style="margin-left:30px;">' + sales + '</span>';
          }
          html += '<input type="hidden" value="'+ description +'">';
          html += '</div></a></div>';
          
          $('#content .products').append($(html));   
        });

      // Best Product
      var i=0;
      $(d).find('product').each(function(){
          i++;
          if ( i <= 3) {
            var $product = $(this); 
            var image = $product.find("image").text();
            var name = $product.find("name").text();
            var price = $product.find("price").text();
            var sales = $product.find("sales").text();
            var description = $product.find("description").text();

            var html = '<div class="col-sm-4 item"><a class="tap"><div class="product-sale clearfix">';
            html += '<img src="layout/images/products/' + image + '">';
            html += '<div class="extra-product-sales">';
            html += '<h3>' + name + '</h3>';
            html += '<span>' + price + '$</span>';
            if ( sales != '' ){
              html += '<span class="sales" style="margin-left:30px;">' + sales + '</span>';
            }
            html += '<input type="hidden" value="'+ description +'">';
            html += '</div></div></a></div>';

            $('.best-sales .products-sales').append($(html));   
          }
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
        $( "#amount1" ).text( ui.values[ 0 ]*2 + "$");
        $( "#amount1" ).css('left', ui.values[ 0 ]-7+"%");
        $( "#amount2" ).text( ui.values[ 1 ]*2 + "$");
        $( "#amount2" ).css('left', ui.values[ 1 ]-7+"%");
        var $grid = $('.grid').isotope({
          itemSelector: '.product-elements',
          filter: function() {
            var number1 = ui.values[0]*2;
            var number2 = ui.values[1]*2;
            var price = $(this).find('span').text();
            return parseInt( price, 10 ) > number1 && parseInt( price, 10 ) < number2;
          }
        });
      }
    });
    $( "#amount1" ).text(  $( "#slider-range" ).slider( "values", 0 )*2 + "$");
    $( "#amount1" ).css('left', $( "#slider-range" ).slider( "values", 0 )-7+"%");
    $( "#amount2" ).text(  $( "#slider-range" ).slider( "values", 1 )*2 + "$");
    $( "#amount2" ).css('left', $( "#slider-range" ).slider( "values", 1 )-7+"%");


    /*
    * Modal show product
    */
    $('body').on('click','a.tap', function() {
          var img = $(this).find('img').attr('src');
          var name = $(this).find('h3').text();
          var price = $(this).find('span').first().text();
          var description = $(this).find('input').val();

          $('.imagepreview').attr('src', img);
          $('.modal h4').text(name);
          $('.modal p').text(price);
          $('.modal h5').text(description);
          $('#imagemodal').modal('show');  
    });
});