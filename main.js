   var apikey = 'dc6zaTOxFJmzC';

    $(document).ready(function() {
    

      function encodeQueryData(data)
      {
         var ret = [];
         for (var d in data)
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
         return ret.join("&");
      }

      function httpGetAsync(theUrl, callback)
      {
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() { 
              if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                  callback(xmlHttp.responseText);
          }
          xmlHttp.open("GET", theUrl, true); // true for asynchronous 
          xmlHttp.send(null);
      }


      /*
      * The following functions are what do the work for retrieving and displaying gifs
      * that we search for.
      */
    function getGif(query) {
        query = query.replace(' ', '+');
        var params = { 'api_key': apikey, 'q': query};
        params = encodeQueryData(params);

          httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {
              
                var gifs = JSON.parse(data);
                var target = $('#image')
                for(var x=0; x<gifs.data.length-16; x++){
                var showgif = gifs.data[x].images.fixed_width.url;
                $("#image"+(x+1)).html("<img src='" + showgif + "'>");
        };


      })
      }

      function getStickers(query) {
        query = query.replace(' ', '+');
        var params = { 'api_key': apikey, 'q': query};
        params = encodeQueryData(params);

          httpGetAsync('http://api.giphy.com/v1/stickers/search?' + params, function(data) {
              
                var stickers = JSON.parse(data);
                for(var x=0; x<stickers.data.length-16; x++){
                var showsticker = stickers.data[x].images.fixed_width.url;
                $("#image"+(x+1)).html("<img src='" + showsticker + "'>"); 
        };


      })
      }

        function getTrendingGif() {
        var params = { 'api_key': apikey};

          httpGetAsync('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC', function(data) {
    
                var gifs = JSON.parse(data);
                var target = $('#image');
                for(var x=0; x<gifs.data.length-16; x++){
                var showgif = gifs.data[x].images.fixed_width.url;
                $("#image"+(x+1)).html("<img src='" + showgif + "'>");
       };
      })
      }

                 
      $("#submitButton").on("click", function() {
          var query = $("#inputQuery").val()
          if(query==""){
                 $("p").html("OOPS! Enter some text");
             }
          else{
            $("p").html("TAADDAAAA!!");
            $(".grid-container").css("display","grid")
            getGif(query);  
          }

      });

      $("#sticker").on("click", function() {
        var query = $("#inputQuery").val()
        if(query==""){
               $("p").html("OOPS! Enter some text");
           }
        else{
          $("p").html("TAADDAAAA!!");
          $(".grid-container").css("display","grid")
          getStickers(query);  
        }

    });
          $("#clearButton").on("click", function() {
        location.reload();
      });
        
    $("#trending").on("click", function() {
        $("p").html("Trending GIFs!!");
        $(".grid-container").css("display","grid")
        getTrendingGif();   
      });


    })
