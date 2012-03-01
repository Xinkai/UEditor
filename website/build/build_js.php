<?php

    $iscompress = false;
    if(isset($_REQUEST['iscompress'])){
        $iscompress = $_REQUEST['iscompress'];
    }
    $url = $_REQUEST['files'];

    
    ini_set('max_execution_time',0); //取消设定的30秒时间
	global $cd;
    $cd = dirname( __FILE__);
	$filearr = explode(',',$url);
	$filename = "$cd/src/simple".time().".js";
	for($i=0;$i<count($filearr);$i++){
	    mergeFile($cd."/../../_src/".$filearr[$i]);
	}
    //合并文件
	function mergeFile($file){
	    global $filename;
		$inputfile=fopen($file,"r");
		if(!$inputfile){
			echo '文件不存在';
			exit;
		}
		while (!feof($inputfile)){
			$rose=fgets($inputfile);
			$rose=preg_replace('/^\x{FEFF}/u', '', $rose);
			$james=fopen($filename,"a");
			fwrite($james,$rose);
			fclose($james);
		}
	}
	
    if($iscompress!=""){
        if (filesize($filename)!=0){
            $file = fopen($filename, "r");
            $code = fread($file,filesize($filename));

            $post_data="code=".urlencode($code);
            $url = 'http://fe.baidu.com/~g/tangram/yui.php';
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_POST,1);
            curl_setopt($ch, CURLOPT_HEADER,0);
            curl_setopt($ch, CURLOPT_URL,$url);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$post_data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
            $result = curl_exec($ch);
            $code = $result;
            Header( "Content-type:   application/octet-stream ");
            Header( "Accept-Ranges:   bytes ");
            Header( "Accept-Length:   ".filesize($filename));
            Header( "Content-Disposition:   attachment;   filename=ueditor-min.js");
            echo $code;
            unlink($filename);
            exit;
		}
    }else{
        if (filesize($filename)!=0){
            $file = fopen($filename, "r ");
            Header( "Content-type:   application/octet-stream ");
            Header( "Accept-Ranges:   bytes ");
            Header( "Accept-Length:   ".filesize($filename));
            Header( "Content-Disposition:   attachment;   filename=ueditor.js");
            echo   fread($file,filesize($filename));
            fclose($file);
		    unlink($filename);
            exit;
        }
	}



?>
