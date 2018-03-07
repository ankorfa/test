

window.onload = function(){
  (function build() {
    $.ajax({
        url:"generate.php",
        cache: false,
        async: false,
        success: function(responce){ 
            $('#main').html(responce); //вывод ball
        }
    });  
  }());

  function update(){
    $.ajax({  
      type:"GET",
      url:"cord_now.php",
      data: {id_div: browser},
      cache: false,
      dataType: 'json',
    })
    .done(function(data){
      for (var index = 0; index < data.length; ++index) {
        //alert(data[index]['description']);
        var div = document.getElementById(data[index]['description'])
          div.style.left = data[index]['objX'];
          div.style.top = data[index]['objY'];
      }

    });
  }

  setInterval(update, 500);

  var ball = document.getElementById(browser);
  ball.style.background = 'green';

  ball.onmousedown = function(e) { // 1. отследить нажатие
    // подготовить к перемещению
    // 2. разместить на том же месте, но в абсолютных координатах
    ball.style.position = 'absolute';
    ball.style.background = 'red';
    moveAt(e);

    ball.style.zIndex = 1001; // показывать мяч над другими элементами

    // передвинуть мяч под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(e) {
      ball.style.left = e.pageX - ball.offsetWidth / 2 - 100 + 'px';
      ball.style.top = e.pageY - ball.offsetHeight / 2 - 100 + 'px';
      if (e.pageX > 1097){ball.style.left = 997+'px';};    //огрничения
      if (e.pageX < 100){ball.style.left = 0+'px';};    //огрничения
      if (e.pageY > 841){ball.style.top = 741+'px';};    //огрничения
      if (e.pageY < 100){ball.style.top = 0+'px';};    //огрничения


    }

    // 3, перемещать по экрану
    document.onmousemove = function(e) {
      moveAt(e);
    }

    // 4. отследить окончание переноса
    ball.onmouseup = function() {
      var ball_x = ball.style.left;
      var ball_y = ball.style.top;
      document.onmousemove = null;
      ball.onmouseup = null;
      ball.style.background = 'green';
      //ajax запрос для лога в БД
      $.get("insert.php",{id_div: browser, osX: ball_x, osY: ball_y, time: '444'});   
      

    }
  }
}

