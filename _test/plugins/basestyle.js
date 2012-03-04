module( "plugins.basestyle" );


test( 'sub--table', function () {
    var editor = te.obj[0];
    editor.setContent( '<table border="solid"><tr><td>hello1</td><td>hello2</td></tr><tr><td>hello3</td><td>hello4</td></tr></table>' );
    var range = te.obj[1];
    var body = editor.document.body;
    //1.2的版本中，table标签套了div标签，原来的var tbody = body.firstChild.firstChild；改为如下
    var tbody = editor.document.getElementsByTagName('table')[0].firstChild;
    range.selectNode( body.firstChild ).select();
    var tds = body.firstChild.getElementsByTagName( 'td' );
    var td;
    for ( var index = 0; td = tds[index++]; )
        editor.currentSelectedArr.push( td );
    editor.execCommand( 'subscript' );
    equal( ua.getChildHTML( tbody.firstChild.firstChild ), '<sub>hello1</sub>', '检查第1个单元格中文本是否是下标' );
    equal( ua.getChildHTML( tbody.firstChild.firstChild.nextSibling ), '<sub>hello2</sub>', '检查第2个单元格中文本是否是下标' );
    equal( ua.getChildHTML( tbody.lastChild.firstChild ), '<sub>hello3</sub>', '检查第3个单元格中文本是否是下标' );
    equal( ua.getChildHTML( tbody.lastChild.firstChild.nextSibling ), '<sub>hello4</sub>', '检查第4个单元格中文本是否是下标' );
    equal( editor.queryCommandState( 'superscript' ), 0, 'check sup state' );
    equal( editor.queryCommandState( 'subscript' ), 1, 'check sub state' );
    /**trace 943，为表格去上下标**/
    editor.execCommand( 'subscript' );
    equal( tbody.firstChild.firstChild.innerHTML, 'hello1', '检查第1个单元格中文本是否不是下标' );
    equal( tbody.firstChild.firstChild.nextSibling.innerHTML, 'hello2', '检查第2个单元格中文本是否不是下标' );
    equal( tbody.lastChild.firstChild.innerHTML, 'hello3', '检查第3个单元格中文本是否不是下标' );
    equal( tbody.lastChild.firstChild.nextSibling.innerHTML, 'hello4', '检查第4个单元格中文本是否你是下标' );
    equal( editor.queryCommandState( 'superscript' ), 0, 'check sup state' );
    equal( editor.queryCommandState( 'subscript' ), 0, 'check sub state' );
    /*上下标互斥*/
    editor.execCommand( 'superscript' );
    equal( ua.getChildHTML( tbody.firstChild.firstChild ), '<sup>hello1</sup>', '检查第1个单元格中文本是否是上标' );
    equal( ua.getChildHTML( tbody.firstChild.firstChild.nextSibling ), '<sup>hello2</sup>', '检查第2个单元格中文本是否是上标' );
    equal( ua.getChildHTML( tbody.lastChild.firstChild ), '<sup>hello3</sup>', '检查第3个单元格中文本是否是上标' );
    equal( ua.getChildHTML( tbody.lastChild.firstChild.nextSibling ), '<sup>hello4</sup>', '检查第4个单元格中文本是否是上标' );
    equal( editor.queryCommandState( 'superscript' ), 1, 'check sup state' );
    equal( editor.queryCommandState( 'subscript' ), 0, 'check sub state' );
} );
//如果没有setTimeout在FF（3.6和9都是）中range会出错，其他浏览器没问题
test( '闭合插入上下标', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p>你好</p>' );
    var body = editor.body;
    stop()
    setTimeout( function () {

        range.setStart( body.firstChild.firstChild, 1 ).collapse( 1 ).select( true );

        editor.execCommand( 'superscript' );
        equal( ua.getChildHTML( body.firstChild ), '你<sup></sup>好', '查看执行上标后的结果' );
        range = editor.selection.getRange();
        range.insertNode( editor.document.createTextNode( 'hello' ) );
        equal( ua.getChildHTML( body.firstChild ), '你<sup>hello</sup>好', '上标标签中插入文本' );
        start()
    }, 100 )

} );
//如果没有setTimeout在FF（3.6和9都是）中range会出错，其他浏览器没问题
test( '不闭合插入上下标', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<strong>hello1<em>hello2</em></strong><a href="http://www.baid.com/"><strong>baidu_link</strong></a>hello3' );
    var body = editor.document.body;
    stop();
    setTimeout( function () {
        range.setStart( body.firstChild.firstChild, 0 ).setEnd( body.firstChild.lastChild, 3 ).select();
        editor.execCommand( 'superscript' );
        ua.manualDeleteFillData(body);
        equal(ua.getChildHTML( body.firstChild ), '<sup><strong>hello1<em>hello2</em></strong></sup><a href="http://www.baid.com/" data_ue_src="http://www.baid.com/"><sup><strong>baidu_link</strong></sup></a><sup>hel</sup>lo3', '普通文本添加上标');
        start();
    }, 100 )
} );

/*trace 870*/
//无法模拟光标自动移到的场景，因此模拟输入文本通过插入文本节点实现的方法，在插入文本后光标仍然在原来的位置
// 我们不确定光标实际在哪
test( 'trace 870:加粗文本前面去加粗', function () {
    var editor = te.obj[0];
    var body = editor.body;
    var range = te.obj[1];
    editor.setContent( '<p><br></p>' );
    range.setStart( body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'bold' );
    range = editor.selection.getRange();
    range.insertNode( editor.document.createTextNode( 'hello' ) );
    range = editor.selection.getRange();
    equal( editor.queryCommandState( 'bold' ), 1, '加粗' );
    editor.execCommand( 'bold' );
    range = editor.selection.getRange();
    equal( editor.queryCommandState( 'bold' ), 0, '不加粗' );
    /*插入一个文本节点*/
    range.insertNode( editor.document.createTextNode( 'hello2' ) );
    ua.manualDeleteFillData( editor.body );
    /*ie下插入节点后会自动移动光标到节点后面，而其他浏览器不会*/
    if ( baidu.editor.browser.ie )
        equal( editor.getContent(), '<p><strong>hello</strong>hello2<br /></p>' );
    else
        equal( editor.getContent(), '<p>hello2<strong>hello</strong><br /></p>' )
} );

/*trace 1043*/
test( 'bold-在已加粗文本中间去除加粗', function () {
    var editor = te.obj[0];
    var body = editor.body;
    var range = te.obj[1];
    editor.setContent( '<b>hello</b>ssss' );
    range.setStart( body.firstChild.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'bold' );
    range = editor.selection.getRange();
    equal( editor.queryCommandState( 'bold' ), 0, "<strong> 被去掉" );

    /*在当前的range选区插入文本节点*/
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData( editor.body );

    equal( ua.getChildHTML( body.firstChild ), "aa<strong>hello</strong>ssss", "新文本节点没有加粗" );
} );

/*trace 958*/
test( 'bold-在已加粗文本中间去除加粗', function () {
    var editor = te.obj[0];
    var body = editor.body;
    var range = te.obj[1];
    editor.setContent( '' );
    editor.execCommand( 'bold' );
    ok( ua.getChildHTML( body ), "<stong></stong>", "editor不focus时点加粗，不会多一个空行" );
} );

/*trace 958*/
//如果没有setTimeout在FF（3.6和9都是）中range会出错，其他浏览器没问题
test( 'bold-加粗状态反射', function () {
    var editor = te.obj[0];
    var body = editor.body;
    var range = te.obj[1];
    editor.setContent( 'this is a dog' );
    stop();
    setTimeout( function () {
        range.selectNode( body.firstChild ).select();
        editor.execCommand( 'bold' );
        range.setStart( body.firstChild.firstChild.firstChild, 2 ).collapse( true ).select();
        equal( editor.queryCommandState( 'bold' ), 1, '闭合选择，加粗高亮' );
        ua.manualDeleteFillData( editor.body );

        range.setStart( body.firstChild.firstChild.firstChild, 0 ).setEnd( body.firstChild.firstChild.lastChild, 4 ).select();
        equal( editor.queryCommandState( 'bold' ), 1, '不闭合选择，加粗高亮' );
        start();
    }, 100 )
} );

/*trace 580*/
test( 'bold-连续加粗2次', function () {
    var editor = te.obj[0];
    var body = editor.body;
    var range = te.obj[1];
    editor.setContent( 'this is a dog' );
    var text = body.firstChild.firstChild;
    range.setStart( text, 0 ).setEnd( text, 3 ).select();
    /*第一次加粗*/
    editor.execCommand( 'bold' );
    equal( editor.queryCommandState( 'bold' ), 1, '加粗按钮高亮' );
    text = body.firstChild.lastChild;
    range.setStart( text, 1 ).setEnd( text, 3 ).select();
    /*不闭合选区文本*/
    equal( editor.queryCommandState( 'bold' ), 0, '不闭合选择，加粗不高亮' );
    /*第二次加粗*/
    ua.manualDeleteFillData( editor.body );
    editor.execCommand( 'bold' );
    equal( editor.queryCommandState( 'bold' ), 1, '加粗高亮' );
} );

test('测试 userAction.manualdeleteFilldata',function(){
    var editor = te.obj[0];
    var body = editor.body;
    var range = te.obj[1];
    editor.setContent('<p></p>');

//    var fillData = document.createTextNode(domUtils.fillChar);
  //  在ie 6,7下，使用appendChild时，需要body先加载，必须将上句document前加editor,否则出错
    var fillData = editor.document.createTextNode(domUtils.fillChar);
    body.appendChild(fillData) ;
    var space = ua.browser.ie?'&nbsp;':'';
    notEqual(body.innerHTML.toLowerCase(),'<p>'+space+'</p>','清除不可见字符前不相等') ;
    ua.manualDeleteFillData(body);
    equal(body.innerHTML.toLowerCase(),'<p>'+space+'</p>','清除不可见字符后相等') ;
})