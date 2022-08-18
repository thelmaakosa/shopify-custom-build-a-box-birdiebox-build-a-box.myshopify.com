// Build a Box page

  $(".bxp-bldr-step .bxp-bldr-item select.bxp-bldr-form-control").change(function(){
    console.log("select change");

    // if you have the order details already
    if($(".bxp-bldr-current #bxp-bldr-order_details").length){
      console.log("true");
        $(".bxp-bldr-current #bxp-bldr-order_details").remove();
    };

    // Clone order details 
    $("#bxp-bldr-order_details").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
    $(".bxp-bldr-current #bxp-bldr-order_details").css({"display": "block", "position":"initial", "-webkit-box-shadow":"none"});
    $(".bxp-bldr-wizard-step .bxp-step-box-list").css("display", "none");
    
    // Add Total Price 
    if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length){
      $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
    }
    $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  })

  $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").click(function(){
      // Update "previous", "current" classes 
      $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous"); 
      $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");

      // if you have the order details already
      if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").length){
        $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").remove();
      }

      // Clone order details
      $(".bxp-bldr-previous #bxp-bldr-order_details").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");

      // Add Total Price 
      if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length){
        $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
      }
      $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  });
  
  $("#bxp-bldr-bottom-wizard .bxp-bldr-backward").click(function(){
      // $(".bxp-bldr-current #bxp-bldr-order_details").clone().appendTo(".bxp-bldr-previous .bxp-bldr-col-lg-4");

      // Update "current", "previous" classes
      $(".bxp-bldr-current").removeClass("bxp-bldr-current");
      $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous").addClass("bxp-bldr-current");
      $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");

      // Add Total Price 
      if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length){
        $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
      }
      $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");

      // if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").length){
      //   $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").remove();
      // }
  })