// Get Post
/*
* Create By Franky
* +6283183586629
*/
$('.btn-shorten').on('click', function(){

  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    }else{
          alert("Enter Valid Link");
        }
    success: function(data){
        
        if(data.success){
          $('#link').show();
          $('#shorturl').val(data.shortUrl);
          shortUrl=data.shortUrl;
          $("#showonlink").show(); 
          
    }
  });});

$('.btn-custom').on('click', function(){
  console.log("click");
  console.log($('#shorturl').val());
  $.ajax({
    url: '/api/custom',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#shorturl').val(), custom: $('#custom').val()},
    success: function(data){
      if(data.success){
      console.log(data);
      $('#shorturl').val(data.shortUrl);}
      else{
        alert('Please try again with other custom name!')
      }
    }
  });

});

$('#shorturl').on('click',function(){
  $(this).focus();
  $(this).select();
  document.execCommand('copy');
  $(".copied").text("Copied to clipboard").show().fadeOut(1200);
})
