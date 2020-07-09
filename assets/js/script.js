function buscador(){
  let pokeNombre = $('#inputPokemon').val();
  
//  console.log(pokeNombre);
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/'+pokeNombre,
    contentType: "application/json",
    dataType: 'json',
    method:'GET',
    success: function(result){
        card(result);
    }
    ,error:function(result){
      $('#cardShow').css('display','none');
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
  $('#showPokemon').empty();
  $('#showPokemon').css('display','block');
  $('#cardShow').css('display','none');
  let selectTipo= $('#selectPokemon option:selected').val();
  let pokemon=[];
  var promise = $.ajax({
    url : selectTipo,
    method:'GET', 
    success : function(result) {
      $.each(result.pokemon,function( name, url ){
        pokemon.push(url.pokemon.url);
      })
      },
    error : function(xhr,errmsg,err) {
      console.log(xhr.status + ": " + xhr.responseText);
    }
  });

  promise.then(function(){
      pokemon.forEach(element => {
        //console.log(element)
       $.ajax({
          url : element,
          method:'GET', 
          success : function(result) {
            //console.log(result);
             $('#showPokemon').append('<div class="card"><div class="card-body"><h3>'+result.name+'</h3><img src='+result.sprites.front_default+'></div></div>');
          }
          ,error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
          }
        });
      });
  //
 
  
});



}

function card(result){
  $('#nameDescription').empty();
  $('#cardShow').css('display','block');
  $('#showPokemon').css('display','none');
  //console.log(result);
  let tipos = '<p class="card-text">types : ';
    $('#imgPokemon').attr("src",result.sprites.front_default);
   $('#nameDescription').append('<h5 class="card-title">'+result.name+'</h5>');
   result.types.forEach(element => {
    
     tipos+= '-'+ element.type.name+' ';
   });
   tipos+= '</p>'
   $('#nameDescription').append(tipos);
   let habilidad = 'Habilidades: <ul class="list-group list-group-flush">';
   result.abilities.forEach(element => {
     habilidad+=' <li class="list-group-item">'+element.ability.name+'</li>'
   });
   habilidad+= '</ul>';
   $('#nameDescription').append(habilidad);
   //Grafico
   let data= [];
   result.stats.forEach(element => {
     data.push({label:element.stat.name,y:element.base_stat});
     //console.log(element.base_state);
   });
   console.log(data);
   var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Estadísticas"
    },
    axisX: {
      interval: 1
    },
    axisY: {
      title: "States",
      scaleBreaks: {
        type: "wavy",
        customBreaks: [{
          startValue: 10,
          endValue: 110
          },
          {
            startValue: 30,
            endValue: 150
          }
      ]}
    },
    data: [{
      type: "bar",
     // toolTipContent: "<img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/\"{url}\"\" style=\"width:40px; height:20px;\"> <b>{label}</b><br>Budget: ${y}bn<br>{gdp}% of GDP",
      dataPoints:data
    }]
  });
  chart.render();
  
}