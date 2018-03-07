<?php

if (!isset($_SERVER['PHP_AUTH_USER'])) // пользователь неизвестен
{
    Header("WWW-Authenticate: Basic realm='Admin Center'");
    Header("HTTP/1.0 401 Unauthorized");
    echo "USER!111";
    exit();
} else // пользователь известен, неизвестен пароль
{
    // введенный пароль
    $password = $_SERVER['PHP_AUTH_PW'];
    // просмотр базы для получения реального пароля

    $link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if (mysqli_connect_errno()) {
        printf("Не удалось подключиться: %s\n", mysqli_connect_error());
        exit();
    }

    // Ищем в базе пароль соответствующий имени пользователя указанного в $_SERVER['PHP_AUTH_USER']
    $result = mysqli_query($link, "SELECT password FROM users WHERE username='{$_SERVER['PHP_AUTH_USER']}'");
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    // проверка
    if ($row == NULL)        // пользователя с таким именем нет в БД
    {
        Header("WWW-Authenticate: Basic realm='Admin Center'");
        Header("HTTP/1.0 401 Unauthorized");
        echo "USER!222";
        exit();
    } else                   // пользователь с таким именем есть в БД, проверка пароля
    {
        if ($row['password'] != $password) // $password равна $_SERVER['PHP_AUTH_PW'] это присваивание происходит в самом начале скрипта
        {
            Header("WWW-Authenticate: Basic realm='Admin Center'");
            Header("HTTP/1.0 401 Unauthorized");
            echo "USER!3333";
            exit();
        }
    }
}

echo "<p>Hello {$_SERVER['PHP_AUTH_USER']}.</p>";
echo "<p>Вы ввели пароль {$_SERVER['PHP_AUTH_PW']}.</p>";

?>