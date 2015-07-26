<?php

include_once __DIR__ . '\..\libs\goDB\goDB.php';

$db = new goDB('localhost', 'root', null);

$_get = isset($_GET['get']) ? $_GET['get'] : 'grid';
$a = array();

switch ($_get) {
    case 'grid': // Get Grid Users
        $pattern = 'SELECT * 
                    FROM grid.users u
                    INNER JOIN grid.education e ON u.education = e.id
                    INNER JOIN grid.index i ON u.id = i.user_id
                    INNER JOIN grid.citys c ON i.city_id = c.id';
        $result  = $db->query($pattern, null, 'assoc');
        foreach ($result as $v) {
            array_push($a, array(
                    'user' => $v['lastname'].' '.$v['firstname'].' '.$v['middlename'], 
                    'city' => $v['city'], 
                    'education' => $v['description'].' ('.$v['code'].')'
                )
            );
        }
        break;
    case 'education': // Get education list
        $pattern = 'SELECT * FROM grid.education';
        $result  = $db->query($pattern, null, 'assoc');
        foreach ($result as $v) {
            array_push($a,  array(
                   'name' => $v['description'].' ('.$v['code'].')'
                )
            );
        }
        break;
    case 'users': // Get users list
        $pattern = 'SELECT * FROM grid.users ORDER BY lastname, firstname, middlename';
        $result  = $db->query($pattern, null, 'assoc');
        foreach ($result as $v) {
            array_push($a,  array(
                   'name' => $v['lastname'].' '.$v['firstname'].' '.$v['middlename']
                )
            );
        }
        break;
    case 'citys': // Get citys list
        $pattern = 'SELECT * FROM grid.citys ORDER BY city';
        $result  = $db->query($pattern, null, 'assoc');
        foreach ($result as $v) {
            array_push($a,  array(
                   'city' => $v['city'],
                )
            );
        }
        break;

}

$callback = $_REQUEST['callback'];
print $callback.'('.json_encode($a).')';
exit();






