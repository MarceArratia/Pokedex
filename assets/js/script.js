//Guardando lo que usuario busca
function buscador(){
  let pokeNombre = $('#inputPokemon').val();
  
//  console.log(pokeNombre); 
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon/'+pokeNombre.toLowerCase(),
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
//boton select por tipo
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
  $('#contenidoFondo').css('display','none');
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
          
             $('#showPokemon').append('<div><div><div class="tabla"><h4>'+result.name.toUpperCase()+'</h4><img src='+result.sprites.front_default+'></div></div></div>');
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
  $('#contenidoFondo').css('display','none');
  //console.log(result);
  let tipos='Tipos : ';
    $('#imgPokemon').attr("src",result.sprites.front_default);
   $('#nameDescription').append('<h3 class="card-title">'+result.name+'</h3>');
   result.types.forEach(element => {
    
     tipos+= '<img src="./assets/img/'+ element.type.name+'.png"/>';
   });
  
   $('#nameDescription').append(tipos);
   let contador = 0;
   let habilidad = '<table class="tablePokemon table table-striped table-dark"><th colspan="2">Habilidades</th>';
   let cantidad=result.abilities.length;
   console.log(cantidad);
   result.abilities.forEach(element => {
     if(cantidad ==2){
      if(contador == 0){
        habilidad+='<tr><td>'+ element.ability.name + '</td>';
      }
      if(contador == 1){
        habilidad+='<td>'+ element.ability.name + '</td></tr>';
      }
     }else if(cantidad == 3){
      if(contador == 0){
        habilidad+='<tr><td>'+ element.ability.name + '</td>';
      }
      if(contador == 1){
        habilidad+='<td>'+ element.ability.name + '</td></tr>';
      }if(contador == 2){
        habilidad+='<tr><td colspan="2">'+ element.ability.name + '</td></tr>';
      }
     }else if (cantidad == 4){
      if(contador == 0){
        habilidad+='<tr><td>'+ element.ability.name + '</td>';
      }
      if(contador == 1){
        habilidad+='<td>'+ element.ability.name + '</td></tr>';
      } if(contador == 2){
        habilidad+='<tr><td>'+ element.ability.name + '</td>';
      }
      if(contador == 3){
        habilidad+='<td>'+ element.ability.name + '</td></tr>';
      }
     }
     contador++;
  
   });
   habilidad+= '</table>';
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
      type: "pie",
     // toolTipContent: "<img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/\"{url}\"\" style=\"width:40px; height:20px;\"> <b>{label}</b><br>Budget: ${y}bn<br>{gdp}% of GDP",
      dataPoints:data
    }]
  });
  chart.render();
  
}