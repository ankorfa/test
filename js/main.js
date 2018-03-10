$(function () {
    (function build() {
        $.ajax({
            url: "generate.php",
            cache: false,
            async: false
        })
            .done(function (responce) {
                $('#main').html(responce); //вывод ball
            });
    }());

    function update() {
        $.ajax({
            type: "GET",
            url: "cord_now.php",
            data: {id_div: browser},
            cache: false,
            dataType: "json",
        })
            .done(function (data) {
                for (var index = 0; index < data.length; ++index) {
                    //alert(data[index]['description']);
                    var div = $("#"+data[index]['description'])
                        div.css("left" , data[index]['objX']);
                        div.css("top" , data[index]['objY']);
                }

            });
    }
    setInterval(update, 5000);

    ball = $("#"+browser);
    ball.css("background","green");

    ball.mousedown(function (e) {
        // 1. отследить нажатие
        // подготовить к перемещению
        // 2. разместить на том же месте, но в абсолютных координатах
        ball.css("position" , "absolute");
        ball.css("background" , "red");
        moveAt(e);
        ball.css("zIndex" , "1001"); // показывать мяч над другими элементами
        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(e) {
            ball.css("left" , e.pageX - ball.width() / 2 - 100 + "px");
            ball.css("top" , e.pageY - ball.height() / 2 - 100 + "px");
            if (e.pageX > 1097) {
                ball.css("left" , 997 + "px");
            };    //огрничения
            if (e.pageX < 100) {
                ball.css("left" , 0 + "px");
            };    //огрничения
            if (e.pageY > 841) {
                ball.css("top" , 741 + "px");
            };    //огрничения
            if (e.pageY < 100) {
                ball.css("top" , 0 + "px");
            };    //огрничения


        }

        // 3, перемещать по экрану
        $("*").mousemove(function (e) {
            moveAt(e);
        });

        // 4. отследить окончание переноса
        ball.mouseup(function () {
            var ball_x = ball.css("left");
            var ball_y = ball.css("top");
            // $("*").mousemove = false;
            $("*").unbind('mousemove');
            ball.unbind("mouseup");
            ball.css("background" , "green");
            //ajax запрос для лога в БД
            $.get("insert.php", {id_div: browser, osX: ball_x, osY: ball_y});

        });
    });
})
