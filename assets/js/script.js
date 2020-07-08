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

function selectTipo(){
  $.ajax({
    url: 'https://pokeapi.co/api/v2/type/',
    contentType: "application/json",
    dataType: 'json',
    method:'GET',
    success: function(result){
      $.each(result.results,function( name, url ){
        $("#selectPokemon").append('<option value='+url.url+'>'+url.name+'</option>');
      
      })
       
    }
    ,error:function(result){
      console.log(result.results.name);
     
  }
  })
}

function visualPokemon(){
  $('#showPokemon').append('');
  let selectTipo= $('#selectPokemon option:selected').val();
  $.ajax({
    url: selectTipo,
    contentType: "application/json",
    dataType: 'json',
    method:'GET',
    success: function(result){
      let table = '<table class="tablePokemon table table-striped table-dark"><th>Nombre</th><th>Descripción</th>';
    $.each(result.pokemon,function( name, url ){
  console.log(url.pokemon.name);
  table+='<tr><td>'+url.pokemon.name+'</td><td><a href='+url.pokemon.url+'>Descripción</a></td></tr>'
      
      })
      table+='</table>';
      $('#showPokemon').append(table);
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