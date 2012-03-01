module( 'plugins.catchremoteimage' );

test( '成功远程图片抓取', function () {
        UEDITOR_CONFIG.UEDITOR_HOME_URL = '../../../';
        var editor = new UE.Editor( {catcherUrl:"../../../server/submit/getRemoteImage.php", localDomain:"www.google.com"} );
        var div = document.body.appendChild( document.createElement( 'div' ) );
        editor.render( div );
        var body = editor.body;
        editor.setContent( '<p><img src="http://www.baidu.com/img/baidu_sylogo1.gif"><img src="http://img.baidu.com/hi/logo/logo_93_30.gif"></p>' );
        editor.fireEvent( "catchRemoteImage" );
        stop();
        var count = 0;
        var handler = setInterval( function () {
                count++;
                var imgs = body.getElementsByTagName( 'img' );
                var src = imgs [1].getAttribute( 'src' );
                if ( /server\/upload\/uploadimages/.test( src ) ) {
                        clearInterval( handler );
                        ok( /server\/upload\/uploadimages/.test( imgs[0].getAttribute( 'src' ) ), '图片已经被转存到本地' );
                        equal( imgs[0].getAttribute( 'src' ), imgs[0].getAttribute( 'data_ue_src' ), '查看data_ue_src' );
                        equal( imgs[1].getAttribute( 'src' ), imgs[1].getAttribute( 'data_ue_src' ), '查看data_ue_src' );
                        equal( imgs.length, 2, '2个图片' );
                        start();
                } else if ( count > 100 ) {
                        clearInterval( handler );
                        ok( false, '超时，文件获取失败' );
                        start();
                }
        }, 100 );
        te.dom.push( div );
} );

test( '失败远程图片抓取', function () {
//超时太长了，而且就是一个alert，alert出来还会影响后面跑用例，先占个坑
} );