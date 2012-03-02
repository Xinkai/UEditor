module( 'plugins.source' );

/*trace 986*/
test( '切换源码，视频地址被添加了网站前缀', function () {
        if ( !ua.browser.ie ) {
                var editor = te.obj[0];

                var range = te.obj[1];
                editor.setContent( '<p><br></p>' );
                range.setStart( editor.body.firstChild, 0 ).collapse( 1 ).select();
                /*涉及到video的一些特殊处理，因此直接设置编辑器的html不是很可行，所以这里用了video这个插件*/
                editor.execCommand( 'insertvideo', {url:'www.baidu.com'} );
                setTimeout( function () {
                        editor.execCommand( 'source' );
                        range.setStart( editor.body.firstChild, 0 ).collapse( 1 ).select();
                        setTimeout( function () {
                                editor.execCommand( 'source' );
                                start();
                        }, 100 );
//
                }, 100 );
                stop();
                var reg = new RegExp( /\*src="www.baidu.com"\*/ );
                var str = 'src="www.baidu.com"';
                var img = editor.document.getElementsByTagName( 'img' )[0];
                equal( $( img ).attr( '_url' ), 'www.baidu.com', '检查超链接前是否添加了网站的路径' );
        }
        else
                ok( true, 'ie里加了视频节点embed,在节点embed后加bookmark会出错' );
} );

//trace 852

test( '切换源码，源码中多处空行', function () {
        var editor = te.obj[0];
        editor.setContent( '<p>hello<a href="http://www.baidu.com/">baidu</a></p>' );
        setTimeout( function () {
                editor.execCommand( 'source' );
                setTimeout( function () {
                        editor.execCommand( 'source' );
                        start();
                }, 100 );

        }, 100 );
        stop();

        //    var html = '<p>\nhello<a href="http://www.baidu.com/">\n\tbaidu\n</a>\n</p>';
        //无奈的验证，有不可见字符
        //多余不可见字符的的bug已经修改了，现在用例字符串长度：53
        var html = editor.getContent();
        equal( html, '<p>hello<a href="http://www.baidu.com/">baidu</a></p>' );
        //
        // ok(html.length>=58&&html.length<=60,'切换源码不会多空行');
} );
/*trace 710*/
test( '设置源码内容没有p标签，切换源码后会自动添加', function () {
        var editor = te.obj[0];
        editor.setContent( '<strong><em>helloworld你好啊</em></strong>大家好，<strong><i>你在干嘛呢</i></strong><em><strong>。谢谢，不用谢</strong></em>~~%199<p>hello</p>' );

        setTimeout( function () {
                editor.execCommand( 'source' );
                setTimeout( function () {
                        editor.execCommand( 'source' );
                        setTimeout( function () {
                                editor.execCommand( 'source' );
                                start();
                        }, 100 );

                }, 100 );
        }, 100 );
        stop();
        equal( editor.getContent(), '<p><strong><em>helloworld你好啊</em></strong>大家好，<strong><em>你在干嘛呢</em></strong><em><strong>。谢谢，不用谢</strong></em>~~%199</p><p>hello</p>' );
} );

test( '切换源码去掉空的span', function () {
        var editor = te.obj[0];
        editor.setContent( '<p>切换源码<span>去掉空的span</span></p>' );
        setTimeout( function () {
                editor.execCommand( 'source' );
                setTimeout( function () {
                        editor.execCommand( 'source' );
                        start();
                }, 100 );

        }, 100 );
        stop();

        equal( editor.getContent(), '<p>切换源码去掉空的span</p>' );
} );
//1。2版本后不做删去空的a标签的操作
// test('切换源码去掉没有子节点的内联元素',function(){
//    var editor = te.obj[0];
//    editor.setContent('<p>切换源码,去掉空的内联元素a<a href="www.baidu.com"></a></p>');
//    setTimeout(function() {
//            editor.execCommand('source');
//            setTimeout(function() {
//                editor.execCommand('source');
//                start();
//            },100);
//        },100);
//     stop();
//
//    equal(editor.getContent(),'<p>切换源码,去掉空的内联元素a</p>');
// });
test( 'b,i标签，切换源码后自动转换成strong和em', function () {
        var editor = te.obj[0];
        editor.setContent( '<p><b>加粗的内容</b><i>斜体的内容<b>加粗且斜体</b></i></p>' );
        setTimeout( function () {
                editor.execCommand( 'source' );
                setTimeout( function () {
                        editor.execCommand( 'source' );
                        start();
                }, 100 );

        }, 100 );
        stop();
        equal( editor.getContent(), '<p><strong>加粗的内容</strong><em>斜体的内容<strong>加粗且斜体</strong></em></p>' );
} );

test( 'trace 1734 range的更新/特殊符号的转换', function () {
        var editor = te.obj[0];
        editor.setContent( '<p>"<></p>' );
        setTimeout( function () {
                editor.execCommand( 'source' );
                setTimeout( function () {
                        editor.execCommand( 'source' );
                        equal( editor.getContent(), '<p>&quot;&lt;&gt;</p>' );
                        editor.setContent( "<p>'</p>" );

//                var range = te.obj[1];
//                range.setStart(editor.body.firstChild,0).collapse(1).select();
                        setTimeout( function () {
                                var label = ua.browser.gecko ? 'html' : 'body';
                                equal( editor.selection.getRange().startContainer.parentNode.parentNode.tagName.toLowerCase(), label, 'range的更新' );
                                editor.execCommand( 'source' );
                                setTimeout( function () {
                                        editor.execCommand( 'source' );
                                        equal( editor.getContent(), '<p>&#39;</p>' );
                                        start();
                                }, 100 );
                        }, 100 );
                }, 100 );
        }, 100 );
        stop();
} );

test( '默认插入的占位符', function () {
        var editor = te.obj[0];
        editor.setContent( '' );
        if ( ua.browser.ie ) {
                equal( editor.getContent(), '<p>&nbsp;</p>' );
        }
        /*trace 1234 */
        else if ( !ua.browser.gecko ) {
                equal( editor.getContent(), '<p><br /></p>' );
        }
} );

test( '插入分页符,源码中显示：_baidu_page_break_tag_', function () {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        var editor = te.obj[0];
        editor.render( div );
        var range = new baidu.editor.dom.Range( editor.document );
        var body = editor.body;
        //  debugger
        editor.setContent( '<p><br></p>' );
        range.setStart( body.firstChild, 0 ).collapse( 1 ).select();
        editor.execCommand( 'pagebreak' );
        ua.manualDeleteFillData( editor.body );
        var pagebreak = body.getElementsByTagName( 'div' )[0];

        if ( typeof pagebreak.attributes['class'] == "undefined" ) {
                equal( pagebreak.getAttribute( 'class' ), 'pagebreak', 'pagebreak' );
        }
        else {//适用于ie6,7
                equal( pagebreak.attributes['class'].nodeValue, 'pagebreak', 'pagebreak' );
        }
        var br = baidu.editor.browser.ie ? '&nbsp;' : '<br>';
        equal( editor.getContent(), '<p>' +br + '</p>_baidu_page_break_tag_<p>'+br+'</p>' );
        document.body.removeChild( div );
} );

test( '插入代码,源码中对应的标签是pre', function () {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        var editor = te.obj[0];
        editor.render( div );
        var range = new baidu.editor.dom.Range( editor.document );
        var body = editor.body;
        editor.setContent( '<p><br></p>' );
        range.setStart( body.firstChild, 0 ).collapse( 1 ).select();
        //     debugger
        editor.execCommand( 'highlightcode', '<a href="http://net.tutsplus.com" class="logo">Nettuts+</a>', 'html' );
        ua.manualDeleteFillData( editor.body );
        var td_gutter = body.getElementsByTagName( 'td' )[0];
        var td_code = body.getElementsByTagName( 'td' )[1];
        equal( body.getElementsByTagName( 'td' ).length, 2, '显示代码的table分两列' );


        if ( typeof td_gutter.attributes['class'] == "undefined" ) {
                equal( td_gutter.getAttribute( 'class' ), 'gutter', '第一列class=gutter' );
                equal( td_code.getAttribute( 'class' ), 'code', '第一列class=code' );
        }
        else {//适用于ie6,7
                equal( td_gutter.attributes['class'].nodeValue, 'gutter', '第一列class=gutter' );
                equal( td_code.attributes['class'].nodeValue, 'code', '第一列class=code' );
        }
        equal( editor.getContent().substring( 0, 116 ), '<pre class=\"brush:html;toolbar:false;\">&lt;a href=\"http://net.tutsplus.com\" class=\"logo\"&gt;Nettuts+&lt;/a&gt;</pre>' );


        te.dom.push( div );
} );

test( '不以http://开头的超链接绝对路径网址', function () {
        var editor = te.obj[0];
        editor.setContent( '<p><a href="www.baidu.com">绝对路径网址</a></p>' );
        setTimeout( function () {
                editor.execCommand( 'source' );
                setTimeout( function () {
                        editor.execCommand( 'source' );
                        start();
                }, 100 );

        }, 100 );
        stop();
        equal( editor.getContent(), '<p><a href="www.baidu.com">绝对路径网址</a></p>' );
} );
