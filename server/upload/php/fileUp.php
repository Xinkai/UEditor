<?php
/**
 * Created by JetBrains PhpStorm.
 * User: taoqili
 * Date: 12-2-8
 * Time: 下午1:20
 * To change this template use File | Settings | File Templates.
 */
//上传配置
$config = array(
    "uploadPath" => "../uploadfiles/" , //保存路径
    "fileType" => array( ".rar" , ".doc" , ".docx" , ".zip" , ".pdf" , ".txt" , ".swf", ".wmv" ) , //文件允许格式
    "fileSize" => 100 //文件大小限制，单位MB
);

//文件上传状态,当成功时返回SUCCESS，其余值将直接返回对应字符窜
$state = "SUCCESS";
$fileName = "";
$path = $config[ 'uploadPath' ];
if ( !file_exists( $path ) ) {
    mkdir( "$path" , 0777 );
}
$clientFile = $_FILES[ "Filedata" ]; //"Filedata是swfupload默认的文件域"
//格式验证
$current_type = strtolower( strrchr( $clientFile[ "name" ] , '.' ) );
if ( !in_array( $current_type , $config[ 'fileType' ] ) ) {
    $state = "不支持的文件类型！";
}
//大小验证
$file_size = 1024 * 1024 * $config[ 'fileSize' ];
if ( $clientFile[ "size" ] > $file_size ) {
    $state = "文件大小超出限制！";
}
//保存文件
if ( $state == "SUCCESS" ) {
    $tmp_file = $clientFile[ "name" ];
    $fileName = $path . rand( 1 , 10000 ) . time() . strrchr( $tmp_file , '.' );
    $result = move_uploaded_file( $clientFile[ "tmp_name" ] , $fileName );
    if ( !$result ) {
        $state = "文件保存失败！";
    }
}
//向浏览器返回数据json数据
$fileName = str_replace( '../' , '' , $fileName );
echo "{'state':'" . $state . "','url':'" . $fileName . "','fileType':'" . $current_type . "'}";
?>

