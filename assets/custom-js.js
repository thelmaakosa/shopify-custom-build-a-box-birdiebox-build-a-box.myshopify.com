// Build a Box page

var price_filter = '<div class="bxp-bldr-col-md-4 bxp-bldr-col-lg-3 bxp-mt-15"><div class="bxp-bldr-form-group no-mb"><div class="bxp-bldr-styled-select"><div class="bxp-styled-select"><select class="bxp-bldr-form-control bxp-filter-tags valid" aria-invalid="false"><option value="" selected="">Price Range </option><option value="0-50">$0-$50</option><option value="51-100">$51-$100</option><option value="101-150">$101-$150</option><option value="151-200">$151-$200</option><option value="200+">$200+</option></select></div></div></div></div>'
$(price_filter).appendTo($(".bxp-bldr-step[data-index=1] .bxp-step-box").next())

$('select option:contains("Filter by tags")').text('Core Values:');

$(".bxp-bldr-step .bxp-bldr-item select.bxp-bldr-form-control").change(function(){
  console.log("select change");

  // Clone order details
  if($(".bxp-bldr-current #bxp-bldr-order_details").length == 0){
    $("#bxp-bldr-order_details").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  };

  // Add Total Price 
  if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length){
    $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
    $(".bxp-bldr-current .bxp-bldr-forward").remove();
  }
  $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
})


$("#bxp-bldr-bottom-wizard .bxp-bldr-forward").click(function(){

    // Update "previous", "current" classes 
    $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous"); 
    $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");

    // Clone order details
    if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").length == 0){
      $(".bxp-bldr-previous #bxp-bldr-order_details").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
      
    }

    // Add Total Price 
    if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length){
      $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
      $(".bxp-bldr-current .bxp-bldr-forward").remove();
    }
    $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
    $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  
});

$("#bxp-bldr-bottom-wizard .bxp-bldr-backward").click(function(){

    // Clone order details
    // $(".bxp-bldr-current #bxp-bldr-order_details").clone().appendTo(".bxp-bldr-previous .bxp-bldr-col-lg-4");
    // $(".bxp-bldr-current #bxp-bldr-order_details").remove();
  
    // Update "current", "previous" classes
    $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous").addClass("bxp-bldr-current");
    $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");
  
    // Add Total Price 
    if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length){
      $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
      $(".bxp-bldr-current .bxp-bldr-forward").remove();
    }
    $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
    $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  
    // if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").length){
    //   $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").remove();
    // }
})

// Add Next button
$(".bxp-bldr-step .bxp-bldr-forward").click(function(){
  $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").click();
})

