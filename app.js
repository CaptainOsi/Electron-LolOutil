//should use own API
var api = "ce9fcdac-61f1-4e43-9c66-3443796785ce"

//get free and disabled champs
function getChamps() {
  region = 'NA';
  var disabledCount = 0;
  $.ajax({
    url: "https://euw.api.pvp.net/api/lol/euw/v1.2/champion?api_key=ce9fcdac-61f1-4e43-9c66-3443796785ce",
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $(".disabledContainer").empty();
      for (var i = 0; i < data.champions.length; i++) {
        var champ = data.champions[i];
        if (champ.active == false) {
          displayDisabled(champ.id);
          disabledCount++;
        }
        if (champ.freeToPlay == true) {
          displayFree(champ.id);
        }

      }
      if (disabledCount == 0) {
        $(".disabledContainer").append("<h1>Aucun champion désactivé</h1>");
      }

      if (disabledCount > 0) {
        $(".disabledContainer").prepend("<h1>" + disabledCount + " Champions désactivés</h1>");
      }

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("error getting champions from region: " + region);
    }
  });

}

//from champ id, updated disabledContainer with champion image
function displayDisabled(id) {
  region = 'NA';
  $.ajax({
    url: "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/" + id + "api_key=ce9fcdac-61f1-4e43-9c66-3443796785ce",
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $(".disabledContainer").append("<h1>" + data.name + "</h1><img src='http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/" + data.key + ".png'>")
    }
  })
}

//from champ id, update free to play champs
function displayFree(id) {
  region = 'NA';
  $.ajax({
    url: "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/" + id + "?api_key=ce9fcdac-61f1-4e43-9c66-3443796785ce",
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $(".freeContainer").append("<h1>" + data.name + "</h1><img src='http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/" + data.key + ".png'>")
    }
  })
}


//page load
var $ = jQuery;
$(document).ready(function() {
  getChamps();
  document.getElementById("id_test").focus();
  $(".output").hide();

});