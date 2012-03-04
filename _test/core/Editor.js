module( "core.Editor" );

test( "render-- element", function() {
    var editor = new baidu.editor.Editor( {'UEDITOR_HOME_URL':'../../../'} );
    var div = document.body.appendChild( document.createElement( 'div' ) );
    equal( div.innerHTML, "", "before render" );
    editor.render( div );
    equal( div.firstChild.tagName.toLocaleLowerCase(), 'iframe', 'check iframe' );
    ok( /baidu_editor_/.test( div.firstChild.id ), 'check iframe id' );
    te.dom.push( div );
} );

test( "render-- elementid", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div.id );
    equal( div.firstChild.tagName.toLocaleLowerCase(), 'iframe', 'check iframe' );
    ok( /baidu_editor_/.test( div.firstChild.id ), 'check iframe id' );
} );

test( "render-- options", function() {
    var options = {'initialContent':'<span class="span">xxx</span><div>xxx<p></p></div>','UEDITOR_HOME_URL':'../../../',autoClearinitialContent:false};
    var editor = new baidu.editor.Editor( options );
    var div = document.body.appendChild( document.createElement( 'div' ) );
    editor.render( div );
    /*会自动用p标签包围*/
    var space = baidu.editor.browser.ie ? '&nbsp;' : '';
    equal( ua.getChildHTML( editor.body ), '<p><span class="span">xxx</span></p><div>xxx<p>'+space+'</p></div>', 'check initialContent' );
    te.dom.push( div );
} );

test( 'destroy', function() {
    var editor = new baidu.editor.Editor( {'plugins':['autoheight','autofloat']} );
    var div = document.body.appendChild( document.createElement( 'div' ) );
    div.id = 'ed';
    editor.render( div );
    editor.destroy();
    ok( !document.getElementById( 'ed' ), '容器被删掉了' );
} );

//test( "setup--ready event", function() {
//    expect( 1 );
//    var editor = te.obj[1];
//    editor.addListener( 'ready', function() {
//        ok( true, 'load ready' );
//    } );
//    var div = te.dom[0];
//    editor.render( div );
//    var doc = editor.iframe.contentDocument.documentElement;
//    //todo
//} );


//TODO 现在在过滤机制里面去除无用的标签
//test( "getContent--去除无用的空标签", function() {
//    var editor = te.obj[1];
//    var div = te.dom[0];
//    editor.render( div );
//    editor.focus();
//    var innerHTML = '<span><span></span><strong>xx</strong><em>em</em><em></em><u></u></span><div>xxxx</div>';
//    editor.setContent( innerHTML );
//    equal( editor.getContent(), '<span><strong>xx</strong><em>em</em></span><div>xxxx</div>', "clear useless tags" );
//} );
/*ie自动把左边的空格去掉，所以就不测这个了*/
//test( "getContent--空格不会被去掉", function() {
//    var editor = te.obj[1];
//    var div = te.dom[0];
//    editor.render( div );
//    editor.focus();
//    var innerHTML = '你好  ';
//    editor.setContent( innerHTML );
//    equal( editor.getContent().toLowerCase(), '<p>你好  </p>', "删除不可见字符" );
//} );

test( "setContent", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.focus();
    expect( 2 );
    editor.addListener( "beforesetcontent", function() {
        ok( true, "beforesetcontent" );
    } );
    editor.addListener( "aftersetcontent", function() {
        ok( true, "aftersetcontent" );
    } );
    var html = '<span><span></span><strong>xx</strong><em>em</em><em></em><u></u></span><div>xxxx</div>';
    editor.setContent( html );
    var div_new = document.createElement( 'div' );
    div_new.innerHTML = '<p><span><span></span><strong>xx</strong><em>em</em><em></em><span style="text-decoration: underline"></span></span></p><div>xxxx</div>';
    var div2 = document.createElement( 'div' );
    div2.innerHTML = editor.body.innerHTML;
    ua.haveSameAllChildAttribs( div2, div_new, 'check contents' );
//    equal( ua.getChildHTML( editor.body ), '', "setContent xxxx" );
} );


//test( "focus", function() {
//
//    var editor = te.obj[1];
//    expect( 1 );
//    /*设置onfocus事件,必须同步处理，否则在ie下onfocus会在用例执行结束后才会触发*/
//    stop();
//    editor.window.onfocus = function() {
//        ok( true, 'onfocus event dispatched' );
//        start();
//    };
//    editor.focus();
//} );

test( "initPlugins", function() {
//TODO 考虑放在plugins里测
} );

test( "_initEvents,_proxyDomEvent--click", function() {
    var editor = te.obj[1];
    editor.focus();
    expect( 1 );
    stop();
    editor.addListener( 'click', function() {
        ok( true, 'click event dispatched' );
        start();
    } );
    ua.click( editor.document );
} );

test( "_initEvents,_proxyDomEvent--focus", function() {
    var editor = te.obj[1];
    stop();
    expect( 1 );
    editor.addListener( 'focus', function() {
        ok( true, 'focus event dispatched' );
        start();
    } );
    editor.focus();
} );

/*测试拖拽问题*/
test( "_initEvents--drag event", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    //TODO 从老版本迁移过来，RD说可以先不管
} );


//TODO
//test( "_selectionChange--测试event是否被触发", function() {
//    var editor = te.obj[1];
//    var div = te.dom[0];
//    editor.render( div );
//    editor.focus();
//    expect( 2 );
//    stop();
//    editor.addListener( 'beforeselectionchange', function() {
//        ok( true, 'before selection change' );
//    } );
//    editor.addListener( 'selectionchange', function() {
//        ok( true, 'selection changed' );
//    } );
//
//    ua.mousedown( editor.document, {clientX:0,clientY:0} );
//    setTimeout( function() {
//        ua.mouseup( editor.document, {clientX:0,clientY:0} );
//    }, 50 );
//
//    /*_selectionChange有一定的延时才会触发，所以需要等一会*/
//    setTimeout( function() {
//        start();
//    }, 200 );
//
//} );

test( "_selectionChange--fillData", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.focus();
    //TODO fillData干嘛用的
} );

/*按钮高亮、正常和灰色*/
test( "queryCommandState", function() {
    var editor = te.obj[1];
    editor.focus();
    editor.setContent( "<p><b>xxx</b>xxx</p>" );
    var p = editor.document.getElementsByTagName( 'p' )[0];
    var r = new baidu.editor.dom.Range( editor.document );
    r.setStart( p.firstChild, 0 ).setEnd( p.firstChild, 1 ).select();
    equal( editor.queryCommandState( 'bold' ), 1, '加粗状态为1' );
    r.setStart( p, 1 ).setEnd( p, 2 ).select();
    equal( editor.queryCommandState( 'bold' ), 0, '加粗状态为0' );
} );

test( "queryCommandValue", function() {
    var editor = te.obj[1];
    editor.focus();
    editor.setContent( '<p style="text-align:left">xxx</p>' );
    var range = new baidu.editor.dom.Range( editor.document );
    var p = editor.document.getElementsByTagName( "p" )[0];
    range.selectNode( p ).select();
    equal( editor.queryCommandValue( 'justify' ), 'left', 'text align is left' );
} );


test( "execCommand", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.focus();
    editor.setContent( "<span>xx</span><p>xxx</p>" );
    var doc = editor.document;
    var range = new baidu.editor.dom.Range( doc );
    var p = doc.getElementsByTagName('p')[1];
    range.setStart( p, 0 ).setEnd( p, 1 ).select();
    editor.execCommand( 'justify', 'right' );
    equal( $( p ).css( 'text-align' ), 'right', 'execCommand align' );
    /*给span加style不会重复添加span*/
    range.selectNode( p ).select();
    editor.execCommand( "forecolor", "red" );
    /*span发生了变化，需要重新获取*/
    span = doc.getElementsByTagName( 'span' )[0];
    equal( span.style['color'], 'red', 'check execCommand color' );
    var div_new = document.createElement( 'div' );
    div_new.innerHTML = '<p><span style="color: red; ">xx</span></p><p style="text-align: right; ">xxx</p>';

    var div1 = document.createElement( 'div' );
    div1.innerHTML = editor.body.innerHTML;
    ok( ua.haveSameAllChildAttribs( div_new, div1 ), 'check style' );
} );


test( "hasContents", function() {
    var editor = te.obj[1];
    editor.focus();
    editor.setContent( '' );
    ok( !editor.hasContents(), "have't content" );
    editor.setContent( "xxx" );
    ok( editor.hasContents(), "has contents" );
} );


test( "hasContents--只有空格", function() {
    var editor = te.obj[1];
    editor.focus();
    editor.setContent( '    ' );
    ok( !editor.hasContents(), "空格被过滤" );
    editor.setContent( "<p> \t\n      </p>" );
    ok( !editor.hasContents(), "空格被过滤" );
} );

/*参数是对原有认为是空的标签的一个扩展，即原来的dtd认为br为空，加上这个参数可以认为br存在时body也不是空*/
test( "hasContents--有参数", function() {
    var editor = te.obj[1];
    editor.focus();
    editor.setContent( '<p><img src="" alt="">你好<ol><li>ddd</li></ol></p>' );
    ok( editor.hasContents( ['ol','li','table'] ), "有ol和li" );
    ok( editor.hasContents( ['td','li','table'] ), "有li" );
    editor.setContent( '<p><br></p>' );
    ok( !editor.hasContents( [''] ), "为空" );
    ok( editor.hasContents( ['br'] ), "不为空" );
} );


//test( 'getContentTxt--文本前后中间有空格', function() {
//    var editor = te.obj[1];
//    editor.focus();
//    editor.setContent( '你 好\t\n' );
//    equal( editor.getContentTxt(), '你 好\t\n' )
//    equal( editor.getContentTxt().length, 3, '3个字符，空格不会被过滤' )
//} );

test( 'getContentTxt--文本前后的空格用&nbsp;表示', function() {
    var editor = te.obj[1];
    editor.focus();
    editor.setContent( '&nbsp;&nbsp;你 好&nbsp;&nbsp;' );
//    equal( editor.getContentTxt(), '  你 好 \t\n ' );
    equal( editor.getContentTxt().length, 7, '7个字符，空格不被过滤' );
} );

test( '多实例，一个采用默认配置文件，一个采用自定义配置', function() {
    var editor1 = te.obj[1];
    var editor2 = new baidu.editor.Editor( {'initialContent':'hello Ueditor','enterTag':'br','UEDITOR_HOME_URL':'../../../','autoClearinitialContent':true} );
    var div2 = document.body.appendChild( document.createElement( 'div' ) );
    editor2.render( div2 );

    equal( editor2.getContent(), '<p id=\"initContent\">hello&nbsp;Ueditor</p>', '初始内容为自定制的' );
    equal( editor2.options.enterTag, 'br', 'enterTag is br' );
    var html = UEDITOR_CONFIG.initialContent;
    ua.checkHTMLSameStyle( html, editor1.document, editor1.body.firstChild, '内容和editor_config一致' );
    equal( editor2.options.enterTag, 'br', 'enterTag is br' );
    te.dom.push( div2 );
} );

test( '2个实例采用2个配置文件', function() {
    var head = document.getElementsByTagName( 'head' )[0];
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = '../../editor_config.js';
    head.appendChild( script );
    stop();
    expect( 6 );
    /*动态加载js需要时间，用这个editor_config.js覆盖默认的配置文件*/
    setTimeout( function() {
        var editor1 = new baidu.editor.Editor( {'UEDITOR_HOME_URL':'../../../'} );
        var editor2 = new baidu.editor.Editor( UEDITOR_CONFIG2 );
        var div1 = document.body.appendChild( document.createElement( 'div' ) );
        var div2 = document.body.appendChild( document.createElement( 'div' ) );
        editor2.render( div2 );
        editor1.render( div1 );
        equal( div2.style.height, '400px', '自定义div高度为400px' );
        equal( div1.style.height, '320px', '自定义div高度为320px' );
        var html = UEDITOR_CONFIG2.initialContent;
        ua.checkHTMLSameStyle( html, editor2.document, editor2.body.firstChild, '初始内容为自定制的' );

        equal( editor2.options.enterTag, 'br', 'enterTag is br' );
        html = UEDITOR_CONFIG.initialContent;
        ua.checkHTMLSameStyle( html, editor1.document, editor1.body.firstChild, '内容和editor_config一致' );
        equal( editor1.options.enterTag, 'p', 'enterTag is p' );
        te.dom.push( div1 );
        te.dom.push( div2 );
        start();
    }, 500 );
} );

