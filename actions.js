//document.write("Hello world");

//var CONFIG = require('web.config');
var moviekey = config.api_key;
var img_path = config.image_addrs;
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var responseArr = JSON.parse(this.responseText);
        create_moviediv(responseArr);
    }
};
xmlhttp.open("GET", moviekey, true);
xmlhttp.send();


//--------------------------creating each movie div block----------------------------------
function create_moviediv(arr) {

    
    
  
    for(i in arr.results) {
      
      
        //---------------convert numeric rating to graphical star rating------------------
        var rating_convert_basefive = Math.floor(arr.results[i].vote_average/2);
        var starrate_arr = [];
        for(var k=1;k<=rating_convert_basefive;k++){
            starrate_arr.push("<span class='fa fa-star checked'></span>");
        }
        for(var l=1;l<=(5-rating_convert_basefive);l++){
            starrate_arr.push("<span class='fa fa-star'></span>");
        }
        var starrate_joined_arr = starrate_arr.join('');
        //--------------------------------------------------------------------------------

       

	    var movie_div_block = document.createElement("div");
	    movie_div_block.id=arr.results[i].id;
	    movie_div_block.setAttribute("class","movie_block");


        //---------------Each movie content to attach------------------------------------------------------------------
        var content = "<br><img class='movie_img' src="+img_path+arr.results[i].poster_path+">"+
                      "<br><label>MOVIE: "             +arr.results[i].title+             "</label>"+
                      "<br><label>RELEASE DATE: "      +arr.results[i].release_date+      "</label>"+
                      "<br><label>RATING: "            +starrate_joined_arr+              "</label>"+
                      "<div class='desc_complete_block'>"+
                      "<P class='desc_txt'><b>DESCRIPTION:</b> "     +arr.results[i].overview+       ""+
                      "<a href='#/' class='moreless_button' onclick='read_less(parentNode,parentNode.nextSibling)'>Read Less</a></P>"+
                      "<a href='#/' class='moreless_button' onclick='read_more(previousSibling,this)'>Read More</a> </div>";
        //--------------------------------------------------------------------------------------------------------------


	    movie_div_block.innerHTML=content;
	    document.getElementsByTagName('body')[0].appendChild(movie_div_block);
    }

}

//---------read more less button for text-----------------
function read_more(descript,read_more_button){
   
    read_more_button.style.visibility="hidden";
    descript.style.overflow="visible";
}
function read_less(descript,read_more_button){

    read_more_button.style.visibility="visible";
    descript.style.overflow="hidden";
}
//--------------------------------------------------------



