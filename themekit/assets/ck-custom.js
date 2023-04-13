// var app_server_config = {'app_server_path': 'https://ckapps.codingkloud.com/birdie-box/'};
// var shopName = Shopify.shop;

jQuery(document).ready(function(){

    /* ----------------------------------------------------- */
    /* disable past dates in cart popup on cart page*/
    /* ----------------------------------------------------- */
     var today = new Date().toISOString().split('T')[0];
     $('#delivery-date').attr('min', today);
  
    /* ----------------------------------------------------- */
    /* check cart attributes are saved on cart page*/
    /* ----------------------------------------------------- */
    jQuery.getJSON('/cart.js', function (cart) { 
      
      console.log(cart)
      if(cart.attributes.hasOwnProperty('delivery_date') && cart.attributes.hasOwnProperty('order_assistant')){
        jQuery('select[name="order_assistant"]').val(cart.attributes.order_assistant);
        jQuery('input[name="delivery_date"]').val(cart.attributes.delivery_date);
        
      }else{
        jQuery.magnificPopup.open({
            items: {
                src: '#birdieBox-popup',
            },
            type: 'inline',
            closeOnBgClick: false,
        }); 
      }
    })
      

    /* ----------------------------------------------------- */
    /* submit popup form on cart page*/
    /* ----------------------------------------------------- */
    jQuery(document).on('submit', 'form#birdieBox-application', function(e){
        e.preventDefault();
        
        var formInputs = jQuery(this).find(':input');  // Find all the inputs in the form
        var formData = {};  // Create an object to store the form data
        // var formData = {"shopName": shopName};
        // Loop through the form inputs and store their values in the formData object
        formInputs.each(function() {
          formData[this.name] = jQuery(this).val();
        });
        birdieBoxSubmitCartPopupForm(formData);     
    });

    
    /* ----------------------------------------------------- */
    /* edit birdiebox application on cart page*/
    /* ----------------------------------------------------- */
    jQuery(document).on('click', '.birdieBox-edit-application', function(e){
      jQuery.magnificPopup.open({
            items: {
                src: '#birdieBox-popup',
            },
            type: 'inline'
        });
    })

  // jQuery(document).on('click', 'cart-remove-button', function(){
  //    console.log('empty cart')
  //     setTimeout(function() {
            
  //        window.location.href = "/cart";
  //       }, 1000)
       
  
  // })
  
});

/* ----------------------------------------------------- */
/* Submit birdieBox cart popup form */
/* ----------------------------------------------------- */
function birdieBoxSubmitCartPopupForm(formData) {
    if((formData.order_assistant != '') && (formData.delivery_date != '')){
      jQuery.ajax({
        type: 'POST',
        url: '/cart/update.js',
        data: {
          attributes: {
            order_assistant: formData.order_assistant,
            delivery_date: formData.delivery_date
          }
        },
        dataType: 'json',
        beforeSend: function () {
            jQuery('#ck-loader').addClass('active');
        },
        success: function (res) {
          // window.location.href = "/cart";
          jQuery('.birdieBox-footer span').text('submitted...')
          console.log(res)
          setTimeout(function() {
                // jQuery.magnificPopup.close();
             window.location.href = "/cart";
            }, 1000);
          
        },
        complete: function (data) {
            jQuery('#ck-loader').removeClass('active');
        },
        error: function (res) {
          console.log(res)
          alert(res.responseJSON.message + ' : ' + res.responseJSON.description);
        }
      });
    }else alert('You need to fill all fields.');

}

/* ----------------------------------------------------- */
/* Common Ajax Proccess Start Function */
/* ----------------------------------------------------- */
// function ajaxProcess(formData, urlEndpoint) {
  
//     return jQuery.ajax({
//         type: "POST",
//         url: app_server_config.app_server_path + "index.php/" + urlEndpoint,
//         data: {data: JSON.stringify(formData)},
//         dataType: "json",
//         beforeSend: function () {
//             jQuery('#ck-loader').addClass('active');
//         },
//         success: function (res) {
//             console.log(res);
//         },
//         complete: function (data) {
//             jQuery('#ck-loader').removeClass('active');
//         }
//     });

// }

