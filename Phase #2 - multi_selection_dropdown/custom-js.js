// Load Semantic UI Multi-select dropdown
$(".bxp-styled-select select").addClass("label ui selection fluid dropdown");
$(".bxp-styled-select select").not( ".bxp-sort-by" ).attr("multiple", "");

// Build a Box page
$("#bxp-bldr-order_details").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
$("#bxp-bldr-bottom-wizard .bxp-bldr-forward").clone().addClass("predefined-btn").appendTo(".bxp-bldr-wizard-step .bxp-bldr-col-lg-4");

// Select Packaging
// $(".bxp-bldr-step[data-index=0] .bxp-bldr-item").click(function(){
//   console.log($(this).children(".bxp-bldr-required").attr("data-label"))
//   $(this).children(".bxp-bldr-qty-up").click();
// })

// Reset button function
$(".bxp-reset").click(function(){
  $(".bxp-bldr-wizard-step").removeClass("bxp-bldr-previous").removeClass("bxp-bldr-current");
  $(".bxp-bldr-wizard-step[data-index=0]").addClass("bxp-bldr-current");
  $("#bxp-bldr-order_details").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  $(".bxp-bldr-current .predefined-btn").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");

})


//  Next button function
$(".predefined-btn").click(function(){
  $("#bxp-bldr-bottom-wizard .bxp-bldr-forward").click();
  return false;
})

// Tag filter
// $(".bxp-step-content .bxp-show-tags").each(function(){
//     if ($(this).attr("data-tags").indexOf("Drinkware")>0){
//         $(this).css("display", "block");
//     }
//     else{
//         $(this).css("display", "none")
//     }
// })


//Category filter
var category_filter = '<div class="bxp-bldr-col-md-4 bxp-bldr-col-lg-3 bxp-mt-15"><div class="bxp-bldr-form-group no-mb"><div class="bxp-bldr-styled-select"><div class="bxp-styled-select"><select multiple class="label ui selection fluid dropdown bxp-bldr-form-control bxp-filter-category valid custom-select" aria-invalid="false"><option value="" selected="">Categories</option><option value="Technology">Technology</option><option value="Drinkware">Drinkware</option><option value="Travel">Travel</option><option value="Golf">Golf</option><option value="Health & Wellness">Health & Wellness</option><option value="Women">Women</option><option value="Men">Men</option></select></div></div></div></div>'
$(category_filter).appendTo($(".bxp-bldr-step[data-index=1] .bxp-step-box").next());

$(".bxp-filter-category ").change(function(){
  setTimeout(
    function() 
    {
      $(".bxp-filter-category .item.filtered").each(function(){
        console.log($(this).text());
      })
    }, 500)
})


//Core values filter
var tag_filter = '<div class="bxp-bldr-col-md-4 bxp-bldr-col-lg-3 bxp-mt-15"><div class="bxp-bldr-form-group no-mb"><div class="bxp-bldr-styled-select"><div class="bxp-styled-select"><select multiple class="label ui selection fluid dropdown bxp-bldr-form-control bxp-filter-tag valid custom-select" aria-invalid="false"><option value="" selected="">Core Values</option><option value="Certified B">Certified B</option><option value="Community Give Backs">Community Give Backs</option><option value="Custom">Custom</option><option value="Innovative">Innovative</option><option value="Local">Local</option><option value="Luxury">Luxury</option><option value="Made in USA">Made in USA</option><option value="Minority-Owned">Minority-Owned</option><option value="Sustainable">Sustainable</option><option value="Well-Known Brand">Well-Known Brand</option><option value="Women-Owned">Women-Owned</option></select></div></div></div></div>'
$(tag_filter).appendTo($(".bxp-bldr-step[data-index=1] .bxp-step-box").next());

$(".bxp-filter-tag ").change(function(){
  setTimeout(
    function() 
    {
      $(".bxp-filter-tag .item.filtered").each(function(){
        console.log($(this).text());
      })
    }, 500)
})


//Price filter
var price_filter = '<div class="bxp-bldr-col-md-4 bxp-bldr-col-lg-3 bxp-mt-15"><div class="bxp-bldr-form-group no-mb"><div class="bxp-bldr-styled-select"><div class="bxp-styled-select"><select multiple class="label ui selection fluid dropdown bxp-bldr-form-control bxp-filter-price valid custom-select" aria-invalid="false"><option value="" selected="">Price Range </option><option data-min="0" data-max="50" value="0-50">$0-$50</option><option data-min="50" data-max="100" value="50-100">$50-$100</option><option data-min="100" data-max="150" value="100-150">$100-$150</option><option data-min="150" data-max="200" value="150-200">$150-$200</option><option data-min="200" data-max="10000" value="200+">$200+</option></select></div></div></div></div>'
$(price_filter).appendTo($(".bxp-bldr-step[data-index=1] .bxp-step-box").next());


$('select option:contains("Filter by tags")').text('Core Values:');

// Select Change
$(".bxp-bldr-step .bxp-bldr-item select.bxp-bldr-form-control").change(function(){
  console.log("select change");

  // Add Total Price 
  if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").length == 0 ){
    $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
    $(".bxp-bldr-current .predefined-btn").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  }
  
})

// Next button
$("#bxp-bldr-bottom-wizard .bxp-bldr-forward").click(function(){
  setTimeout(
    function() 
    {
      // Update "previous", "current" classes 
      $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous"); 
      $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");
  
      // Clone order details
      $("#bxp-bldr-order_details").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
  
      // Add Total Price 

      if ($(".bxp-bldr-current").attr('data-index') !='2' && $(".bxp-bldr-current").attr('data-index') !='3'){
        $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
        $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
        $(".bxp-bldr-current .predefined-btn").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
      }
      
    }, 500);
    
});

// Previous button
$("#bxp-bldr-bottom-wizard .bxp-bldr-backward").click(function(){
    setTimeout(
      function() 
      {
        // Clone order details
        $("#bxp-bldr-order_details").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
      
        // Update "current", "previous" classes
        $(".bxp-bldr-step.bxp-bldr-previous").removeClass("bxp-bldr-previous").addClass("bxp-bldr-current");
        $(".bxp-bldr-current").prev().addClass("bxp-bldr-previous");
      
        // Add Total Price & Next button
        if ($(".bxp-bldr-current").attr('data-index') !='2' && $(".bxp-bldr-current").attr('data-index') !='3'){
          $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-price_total").remove();
          $("#bxp-bldr-bottom-wizard #bxp-bldr-price_total").clone().appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
          $(".bxp-bldr-current .predefined-btn").appendTo(".bxp-bldr-current .bxp-bldr-col-lg-4");
        }
      
        // if($(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").length){
        //   $(".bxp-bldr-current .bxp-bldr-col-lg-4 #bxp-bldr-order_details").remove();
        // }
      }, 500);
    
})


// Price filter
// $(".bxp-filt-sort[data-collections='286330290331'] .bxp-bldr-item select.bxp-bldr-form-control option:last-child").attr("price")
$(".bxp-filt-sort .bxp-bldr-item select.bxp-bldr-form-control").each(function(){
  var price_max = $(this).find("option:last-child").attr("price");
  $(this).parents(".bxp-filt-sort").attr("price-max", price_max);
})



$(".bxp-filter-price").change(function(){
  setTimeout(
    function() 
    {
          // Price filter variables
        var filter_min = parseFloat($(".bxp-filter-price .menu .item.active:first-child").attr("data-min")) | 0;
        var filter_max = parseFloat($(".bxp-filter-price .menu .item.active:first-child").attr("data-max")) | 500;
        
        $(".bxp-filter-price .menu .item").each(function(){
        
          if($(this).attr("data-value").split("-")[0] == "200+"){
            $(this).attr("data-min", "200");
          }
          else{
            $(this).attr("data-min", $(this).attr("data-value").split("-")[0]);
          }
          
          if ($(this).attr("data-value").split("-")[1] === undefined ){
            $(this).attr("data-max", "10000");
          }
          else {
            $(this).attr("data-max", $(this).attr("data-value").split("-")[1]);
          }
      
          console.log($(this).attr("data-min"));
          console.log($(this).attr("data-max"));
        });
        
        $(".bxp-filter-price .menu .item.active").each(function(){
            filter_min = Math.min(filter_min, parseFloat($(this).attr("data-min")));
            filter_max = Math.max(filter_max, parseFloat($(this).attr("data-max")));
        })
        
        console.log(filter_min);
        console.log(filter_max);
        if ($(".bxp-filter-price .menu .item.active").length>0){
          $(".bxp-bldr-current .bxp-filt-sort").each(function(){
            $(this).css("display", "block");
            var price_min = $(this).attr("data-price");
            var price_max = $(this).attr("price-max");
            
            if(price_max === undefined) price_max = price_min;
            
            if(parseFloat(price_min)>parseFloat(filter_max) || parseFloat(price_max) < parseFloat(filter_min)){
              $(this).css("display", "none");
            }
          });
        }
    }, 500);
});

// Filter rearrange
var target = $(".bxp-sort-by").parents(".bxp-bldr-wizard-step[data-index=1] .bxp-bldr-justify-content-center");
$(".bxp-sort-by").parents(".bxp-bldr-col-md-4.bxp-bldr-col-lg-3.bxp-mt-15").appendTo(target);

// Semantic UI Multi-select action
$('.label.ui.dropdown')
  .dropdown();

$('.ui.button').on('click', function () {
  $('.ui.dropdown')
    .dropdown('restore defaults')
})
