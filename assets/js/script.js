function buscador(){
  let pokeNombre = $('#inputPokemon').val();
  console.log(pokeNombre);
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/'+pokeNombre,
    contentType: "application/json",
    dataType: 'json',
    method:'GET',
    success: function(result){
        card(result);
    }
    ,error:function(result){
      console.log(result);
      $('#imgPokemon').attr("src","./assets/img/informacion.png");
  }
})


}

function card(result){
  console.log(result);
    $('#imgPokemon').attr("src",result.sprites.front_default);
}