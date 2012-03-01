module( "plugins.removeformat" );

/*trace 860*/
test( 'trace 860:对包含超链接的段落清除样式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p><span style="color:red">hello</span><a href="http://www.baidu.com/" style="font-size: 16pt;">baidu</a></p>' );
    range.setStart( editor.body.firstChild.firstChild.nextSibling.firstChild, 2 ).collapse( true ).select();
    editor.execCommand( 'removeformat' );
    equal( editor.getContent(), '<p>hello<a href="http://www.baidu.com/">baidu</a></p>', '对包含超链接的段落去除样式' );
} );

/*trace 800*/
test( 'trace 800:清除 超链接的颜色', function() {
    var editor = te.obj[0];
    var range = te.obj[1];

    editor.setContent( '<a href="http://www.baidu.com/">baidu</a>' );
    range.selectNode( editor.body.firstChild ).select();
    editor.execCommand( 'forecolor', 'rgb(255,0,0)' );
    var html = '<a href="http://www.baidu.com/" data_ue_src = "http://www.baidu.com/" style="color: rgb(255, 0, 0); text-decoration: underline; "><span style="color: rgb(255, 0, 0); ">baidu</span></a>';
    ua.checkHTMLSameStyle( html, editor.document, editor.body.firstChild, '查看加了颜色后超链接的样式' )
//    ok( ua.haveSameAllChildAttribs( editor.body.firstChild, p1 ), '查看加了颜色后超链接的样式' );
    editor.execCommand( 'removeformat' );
    var cl = ua.browser.ie && ua.browser.ie == 8 ? 'class=\"\"' : "";
    html = '<a href="http://www.baidu.com/" ' + cl + ' data_ue_src = "http://www.baidu.com/">baidu</a>';
    
    ua.checkHTMLSameStyle( html, editor.document, editor.body.firstChild, '查看清除样式后超链接的样式' );
} );

test( '清除颜色的区域有多个inline元素嵌套', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><em><strong>hello1</strong></em></p><p><strong><em>hello2</em></strong></p>' );
    var strs = body.getElementsByTagName( 'strong' );
    range.setStart( strs[0].firstChild, 2 ).setEnd( strs[1].firstChild.firstChild, 3 ).select();
    editor.execCommand( 'removeformat' );
    equal( ua.getChildHTML( body ), '<p><em><strong>he</strong></em>llo1</p><p>hel<strong><em>lo2</em></strong></p>' );
} );

test( '指定删除某一个style', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><span style="color:red;font-size: 18px"><em><strong>hello1</strong></em></span></p><p><strong><span style="color:red;font-size: 18px">hello2</span></strong></p>' );
    var strs = body.getElementsByTagName( 'strong' );
    range.setStart( strs[0].firstChild, 2 ).setEnd( strs[1].firstChild.firstChild, 3 ).select();
    /*只删除span的color style*/
    editor.execCommand( 'removeformat', 'span', 'color' );
    var html = '<p><span style="color:red;font-size: 18px"><em><strong>he</strong></em></span><span style="font-size: 18px"><em><strong>llo1</strong></em></span></p><p><strong><span style="font-size: 18px">hel</span></strong><strong><span style="color:red;font-size: 18px">lo2</span></strong></p>';
    ua.checkHTMLSameStyle( html, editor.document, body, '检查去除特定标签的样式的结果' );
} );

test( '指定删除的元素删除属性后是空元素', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><span style="color:blue;">hello1</span>hello2<span style="color:red;font-size: 12px"></span></p>' );
    range.setStart( body.firstChild, 0 ).collapse( 1 ).select();
    editor.execCommand( 'removeformat', 'span', 'color' );
    equal( ua.getChildHTML( body.firstChild ), 'hello1hello2' );
} );

test( '闭合方式清除样式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><span><em><strong>hello1</strong></em></span></p><p><strong><em>hello2</em></strong></p>' );
    range.setStart( body.firstChild.firstChild, 0 ).collapse( 1 ).select();
    editor.execCommand( 'removeformat' );
    equal( ua.getChildHTML( body ), '<p>hello1</p><p><strong><em>hello2</em></strong></p>' );
} );

test( '移除表格中的样式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<table><tbody><tr><td><span>表格文本1</span></td><td><em>表格文本2</em></td></tr></tbody></table>' );
    var tds = body.firstChild.getElementsByTagName( 'td' );
    range.selectNode( body.firstChild );
    editor.currentSelectedArr = [tds[0],tds[1]];
    editor.execCommand( 'removeformat' );
    equal( ua.getChildHTML( tds[0] ), '表格文本1', '第一个表格的span被清除了' );
    equal( ua.getChildHTML( tds[1] ), '表格文本2', '第二个表格的span被清除了' );
} );

