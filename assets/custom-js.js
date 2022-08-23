// Build a Box page
$("#bxp-bldr-order_details").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");

var price_filter = '<div class="bxp-bldr-col-md-4 bxp-bldr-col-lg-3 bxp-mt-15"><div class="bxp-bldr-form-group no-mb"><div class="bxp-bldr-styled-select"><div class="bxp-styled-select"><select class="bxp-bldr-form-control bxp-filter-price valid" aria-invalid="false"><option value="" selected="">Price Range </option><option data-min="0" data-max="50" value="0-50">$0-$50</option><option data-min="50" data-max="100" value="50-100">$50-$100</option><option data-min="100" data-max="150" value="100-150">$100-$150</option><option data-min="150" data-max="200" value="150-200">$150-$200</option><option data-min="200" data-max="10000" value="200+">$200+</option></select></div></div></div></div>'
$(price_filter).appendTo($(".bxp-bldr-step[data-index=1] .bxp-step-box").next())

$('select option:contains("Filter by tags")').text('Core Values:');

// Select Change
$(".bxp-bldr-step .bxp-bldr-item select.bxp-bldr-form-control").change(function(){
  console.log("select change");

  // Add Total Price 
  if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length == 0){
    $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
    $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  }
  
})

// Next button
$("#bxp-bldr-bottom-wizard .bxp-bldr-forward").click(function(){

    // Update "previous", "current" classes 
    $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous"); 
    $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");

    // Clone order details
    $("#bxp-bldr-order_details").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");

    // Add Total Price 
    $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
    $(".bxp-bldr-current .bxp-bldr-col-lg-4 .bxp-bldr-forward").remove();
    $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
    $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
});

// Previous button
$("#bxp-bldr-bottom-wizard .bxp-bldr-backward").click(function(){

    // Clone order details
    $("#bxp-bldr-order_details").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  
    // Update "current", "previous" classes
    $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous").addClass("bxp-bldr-current");
    $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");
  
    // Add Total Price & Next button
    $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
    $(".bxp-bldr-current .bxp-bldr-col-lg-4 .bxp-bldr-forward").remove();
    $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
    $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  
    // if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").length){
    //   $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").remove();
    // }
})


// Price filter
// $(".bxp-filt-sort[data-collections='286330290331'] .bxp-bldr-item select.bxp-bldr-form-control option:last-child").attr("price")
$(".bxp-filt-sort .bxp-bldr-item select.bxp-bldr-form-control").each(function(){
  var price_max = $(this).find("option:last-child").attr("price");
  $(this).parents(".bxp-filt-sort").attr("price-max", price_max);
})

$(".bxp-filter-price").change(function(){
  var filter_min = $(".bxp-filter-price").find(":selected").attr("data-min");
  var filter_max = $(".bxp-filter-price").find(":selected").attr("data-max");
  console.log(filter_min, filter_max);
  $(".bxp-bldr-current .bxp-filt-sort").each(function(){
    $(this).css("display", "block");
    var price_min = $(this).attr("data-price");
    var price_max = $(this).attr("price-max");
    if(price_max === undefined) price_max = price_min;
    
    if(parseFloat(price_min)>parseFloat(filter_max) || parseFloat(price_max) < parseFloat(filter_min)){
      console.log(price_min, price_max);
      $(this).css("display", "none");
    }
  })
})

//  Next button function
$(".bxp-bldr-step .bxp-bldr-forward").click(function(){
  $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").click();
})