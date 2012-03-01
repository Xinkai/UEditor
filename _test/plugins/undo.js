module( "plugins.undo" );


/*trace 856*/
test( 'trace 856 输入文本后撤销按钮不亮', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );

        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        ua.keydown( editor.body );
        range.insertNode( editor.document.createTextNode( 'hello' ) );
        ua.keyup( editor.body );

        equal( editor.queryCommandState( 'undo' ), 0, '模拟输入文本后撤销按钮应当高亮' );
} );
/*trace 583,1726*/
test( 'trace 583,1726 插入表格、表情,撤销', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );

        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:2, numRows:2} );
        editor.execCommand( 'insertimage', {src:'http://img.baidu.com/hi/jx2/j_0001.gif', width:50, height:50} );

        editor.execCommand( 'Undo' );
        editor.execCommand( 'Undo' );
        ua.manualDeleteFillData( editor.body );
        var space = ua.browser.ie ? '&nbsp;' : '';
        equal( editor.getContent().toLowerCase(), '<p>' + space + '</p>', '插入表格、表情,撤销' );
} );
///*trace 584*/
//test('trace 584 撤销回车之前的文本', function() {
//    var editor = te.obj[0];
//    var range = te.obj[1];
//    var body = editor.body;
//    editor.setContent( '<p>hello</p>' );
//    range.setStart(editor.body.firstChild, 0).collapse(true).select();
//    ua.keydown(body);
//   ua.manualDeleteFillData( editor.body );
//    //输入回车，再输入文本
//    setTimeout(function() {
//        range.setStart(body.firstChild, 1).collapse(true).select();
//        editor.focus();
//        setTimeout(function() {
//            te.presskey("enter", "");
//            editor.focus();
//            setTimeout(function() {
//               ua.manualDeleteFillData( editor.body );
//                //var br = ua.browser.ie?'&nbsp;':'<br>';
//                equal(body.getElementsByTagName('p').length,2);
//                range.setStart(body.childNodes[1], 0).collapse(true).select();
//                setTimeout(function() {
//                    range.insertNode(editor.document.createTextNode('hello'));
//
//                    for (var i = 0; i < 20; i++)
//                        ua.keydown(body, {keyCode:30});
//                    editor.execCommand('Undo');
//                    equal(editor.getContent().toLowerCase(), '<p>hello</p>', '撤销回车');
//                    start();
//
//                }, 20);
//            }, 20);
//        }, 20);
//
//
//    });
//    stop();
//});
/*trace 595*/
test( 'trace 595 撤销合并单元格后再合并单元格', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:3, numRows:3} );
        var tds = editor.body.firstChild.getElementsByTagName( 'td' );
        for ( var i = 0; i < 5; i++ ) {
                tds[i].innerHTML = 'hello';
        }
        //合并单元格
        range.setStart( tds[0], 0 ).setEnd( tds[4], 1 ).select();
        editor.currentSelectedArr = [tds[0], tds[1], tds[3], tds[4]];
        editor.execCommand( 'mergecells' );
        ua.manualDeleteFillData( editor.body );
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        ok( tds[0].getAttribute( 'colspan' ) == 2 && tds[0].getAttribute( 'rowSpan' ) == 2 && $( tds[1] ).css( 'display' ) == 'none' && $( tds[3] ).css( 'display' ) == 'none' && $( tds[4] ).css( 'display' ) == 'none', '多个单元格合并成一个' );

        equal( tds[0].innerHTML.toLowerCase(), 'hello<br>hello<br>hello<br>hello', '内容复制正确' );
        //撤销合并单元格的操作
        editor.execCommand( 'Undo' );
        ua.manualDeleteFillData( editor.body );
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        //tds[1].attr( 'display' )在IE里是block,在chrome里是table-cell
        ok( $( tds[0] ).attr( 'colspan' ) == 1 && $( tds[0] ).attr( 'rowspan' ) == 1 && $( tds[1] ).css( 'display' ) != 'none' && $( tds[3] ).css( 'display' ) != 'none' && $( tds[4] ).css( 'display' ) != 'none', '撤销后，单元格回复成多个' );
        ok( tds[0].innerHTML.toLowerCase() == 'hello' && tds[1].innerHTML.toLowerCase() == 'hello' && tds[3].innerHTML.toLowerCase() == 'hello' && tds[4].innerHTML.toLowerCase() == 'hello', '内容复制正确' );
        //再次合并单元格
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        range.setStart( tds[0], 0 ).setEnd( tds[4], 1 ).select();
        editor.currentSelectedArr = [tds[0], tds[1], tds[3], tds[4]];
        editor.execCommand( 'mergecells' );
        ua.manualDeleteFillData( editor.body );
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        ok( tds[0].getAttribute( 'colspan' ) == 2 && tds[0].getAttribute( 'rowSpan' ) == 2 && $( tds[1] ).css( 'display' ) == 'none' && $( tds[3] ).css( 'display' ) == 'none' && $( tds[4] ).css( 'display' ) == 'none', '再次合并，多个单元格合并成一个' );

        equal( tds[0].innerHTML.toLowerCase(), 'hello<br>hello<br>hello<br>hello', '内容复制正确' );
} );
/*trace 599*/
test( 'trace 599 插入表格、表情、超链接、表情,撤销2次', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );
        range.setStart( editor.body, 0 ).collapse( true ).select();
        //插入表格
        editor.execCommand( 'inserttable', {numCols:2, numRows:2} );
        //插入表情
        range.setStart( editor.body.lastChild, 0 ).collapse( true ).select();
        editor.execCommand( 'insertimage', {src:'http://img.baidu.com/hi/jx2/j_0001.gif', width:50, height:50} );
        //插入超链接
        range.setStartAfter( editor.body.lastChild ).collapse( true ).select();
        editor.execCommand( 'link', {href:'http://www.baidu.com/'} );
        //插入表情
        range.setStartAfter( editor.body.lastChild ).collapse( true ).select();
        editor.execCommand( 'insertimage', {src:'http://img.baidu.com/hi/jx2/j_0001.gif', width:50, height:50} );

        editor.execCommand( 'Undo' );
        editor.execCommand( 'Undo' );
        ua.manualDeleteFillData( editor.body );
        equal( editor.body.childNodes.length, 2, '撤销2次后只剩表格、表情' );
        var tag = editor.body.childNodes[0].firstChild.tagName.toLowerCase();
        ok( tag == 'table' || tag == 'tbody', '表格' );
        equal( editor.body.childNodes[1].firstChild.tagName.toLowerCase(), 'img', '表情' );
} );
/*trace 617*/
test( 'trace 617 插入文本、分割线、文本,撤销2次，撤销掉分割线', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );

        //输入文本
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        ua.keydown( editor.body );
        range.insertNode( editor.document.createTextNode( 'hello' ) );
        ua.keyup( editor.body );
        //输入分割符
        range.setStartAfter( editor.body.lastChild ).collapse( true ).select();
        editor.execCommand( 'Horizontal' );
        //输入文本
        range.setStartAfter( editor.body.lastChild ).collapse( true ).select();
        ua.keydown( editor.body );
        range.insertNode( editor.document.createTextNode( 'hello' ) );
        ua.keyup( editor.body );

        editor.execCommand( 'Undo' );
        editor.execCommand( 'Undo' );
        equal( editor.body.getElementsByTagName( 'hr' ).length, 0, '分割线已删除' );

} );
/*trace 632*/
test( 'trace 632 合并单元格后撤销再合并单元格不会丢字', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:4, numRows:4} );
        var tds = editor.body.firstChild.getElementsByTagName( 'td' );
        for ( var i = 0; i < 6; i++ ) {
                tds[i].innerHTML = 'hello';
        }
        //合并单元格
        range.setStart( tds[0], 0 ).setEnd( tds[5], 1 ).select();
        editor.currentSelectedArr = [tds[0], tds[1], tds[4], tds[5]];
        editor.execCommand( 'mergecells' );
        ua.manualDeleteFillData( editor.body );
        tds = editor.body.firstChild.getElementsByTagName( 'td' );

        equal( tds[0].innerHTML.toLowerCase(), 'hello<br>hello<br>hello<br>hello', '合并单元格,内容复制正确' );
        //撤销合并单元格的操作
        editor.execCommand( 'Undo' );
        //再次合并单元格
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        range.setStart( tds[0], 0 ).setEnd( tds[5], 1 ).select();
        editor.currentSelectedArr = [tds[0], tds[1], tds[4], tds[5]];
        editor.execCommand( 'mergecells' );
        ua.manualDeleteFillData( editor.body );
        tds = editor.body.firstChild.getElementsByTagName( 'td' );

        equal( tds[0].innerHTML.toLowerCase(), 'hello<br>hello<br>hello<br>hello', '撤销后再次合并单元格,内容复制正确' );
} );
/*trace 675  这个trace用例中的操作已经设为非法*/
/*trace 685*/
test( 'trace 685 合并单元格后,删除行,再撤销,再删除行', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );
        //插入4*4的一个表格
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:4, numRows:4} );
        var tds = editor.body.firstChild.getElementsByTagName( 'td' );
        //选择第一行的4格单元格，合并
        range.setStart( tds[0], 0 ).setEnd( tds[3], 1 ).select();
        editor.currentSelectedArr = [tds[0], tds[1], tds[2], tds[3]];
        editor.execCommand( 'mergecells' );
        ok( tds[0].getAttribute( 'colspan' ) == 4 && tds[0].getAttribute( 'rowSpan' ) == 1, '第一行的4个单元格合并成一个' );
        //选择第2，3，4行的第1个单元格，合并
        range.setStart( tds[4], 0 ).setEnd( tds[12], 1 ).select();
        editor.currentSelectedArr = [tds[4], tds[8], tds[12]];
        editor.execCommand( 'mergecells' );
        ok( tds[4].getAttribute( 'colspan' ) == 1 && tds[4].getAttribute( 'rowSpan' ) == 3, '第2，3，4行的第一个单元格合并成一个' );
        //单击第二步合并的单元格，点击删除行
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        range.setStart( tds[4], 0 ).collapse( true ).select();
        editor.execCommand( 'deleterow' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' ).length, 1, '点击删除行，表格只剩一行' );
        //撤销
        editor.execCommand( 'Undo' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' ).length, 4, '撤销后，表格恢复成4行' );
        //再次点击删除行
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        range.setStart( tds[4], 0 ).collapse( true ).select();
        editor.execCommand( 'deleterow' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' ).length, 1, '撤销后，再点击删除行，表格只剩一行' );

} );
/*trace 711 这个要中文输入法再模拟键盘输入，貌似不能写？？？*/
/*trace 718*/
test( 'trace 718 合并单元格后,删除列,再撤销,再删除列', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );
        //插入4*4的一个表格
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:4, numRows:4} );
        var tds = editor.body.firstChild.getElementsByTagName( 'td' );
        //选择中间的4格单元格，合并
        range.setStart( tds[5], 0 ).setEnd( tds[10], 1 ).select();
        editor.currentSelectedArr = [tds[5], tds[6], tds[9], tds[10]];
        editor.execCommand( 'mergecells' );
        ok( tds[5].getAttribute( 'colspan' ) == 2 && tds[5].getAttribute( 'rowSpan' ) == 2, '对一个4*4的表格，选择中间的4格单元格，合并成一个' );
        //光标定位在合并后的大单元格中，点击删除列按钮
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        range.setStart( tds[5], 0 ).collapse( true ).select();
        editor.execCommand( 'deletecol' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' )[1].childNodes.length, 2, '点击删除列，表格只剩两列' );
        //撤销
        editor.execCommand( 'Undo' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' )[1].childNodes.length, 4, '撤销后，表格恢复成4列' );
        //再次点击删除列按钮
        tds = editor.body.firstChild.getElementsByTagName( 'td' );
        range.setStart( tds[5], 0 ).collapse( true ).select();
        editor.execCommand( 'deletecol' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' )[1].childNodes.length, 2, '再次点击删除列，表格只剩两列' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' ).length, 4, '表格依然有4行' );
} );
/*trace 722 需要中文输入法*/
/*trace 743*/
test( 'trace 743 合并单元格后,删除列,再撤销', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );
        //插入4*4的一个表格
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:4, numRows:4} );
        var tds = editor.body.firstChild.getElementsByTagName( 'td' );
        //第一行的4格单元格，合并
        range.setStart( tds[0], 0 ).setEnd( tds[3], 1 ).select();
        editor.currentSelectedArr = [tds[0], tds[1], tds[2], tds[3]];
        editor.execCommand( 'mergecells' );
        tds = editor.body.firstChild.getElementsByTagName( 'td' );

        ok( tds[0].getAttribute( 'colspan' ) == 4 && tds[0].getAttribute( 'rowSpan' ) == 1 && $( tds[1] ).css( 'display' ) == 'none' && $( tds[2] ).css( 'display' ) == 'none' && $( tds[3] ).css( 'display' ) == 'none', '对一个4*4的表格，选择第一行的4格单元格，合并成一个' );
        //点击删除列按钮
        editor.execCommand( 'deletecol' );
        equal( editor.body.firstChild.getElementsByTagName( 'table' ).length, 0, '点击删除列，表格被删除' );
        //撤销
        editor.execCommand( 'Undo' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' )[0].childNodes.length, 4, '撤销后，表格恢复成4列' );
        equal( editor.body.firstChild.getElementsByTagName( 'tr' ).length, 4, '表格依然有4行' );
} );
/*trace 808 需要观察光标延迟，这个问题已经被标为不修*/

/*trace 855 这个用例描述有问题，而且可以跟trace 584合成一个*/
/*trace 873*/
test( 'trace 873 光标不在编辑器中时替换一个文本后按撤销', function () {
        var editor = te.obj[0];
        editor.execCommand( 'searchreplace', {searchStr:'欢迎', replaceStr:'welcom'} );
        equal( editor.body.firstChild.firstChild.innerHTML, 'welcom使用ueditor', '查找替换' );
        editor.execCommand( 'Undo' );
        ua.manualDeleteFillData( editor.body );
        equal( editor.body.firstChild.firstChild.innerHTML, '欢迎使用ueditor', '撤销' );
} );
/*trace 942*/
test( 'trace 942 用格式刷后撤销', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p><strong>hello</strong></p><p><a href="http://www.baidu.com/">hello</a></p>' );

        range.setStart( editor.body.firstChild.firstChild.firstChild, 2 ).setEnd( editor.body.firstChild.firstChild.firstChild, 4 ).select();
        editor.addListener( 'mouseup', function () {
                ua.manualDeleteFillData( editor.body );
                //从浏览器复制了不可见的空文本
                equal( editor.body.lastChild.firstChild.innerHTML.toLowerCase(), 'h<strong></strong>ello' );

        } );
        // debugger
        editor.execCommand( 'formatmatch' );
        range.setStart( editor.body.lastChild.firstChild.firstChild, 1 ).collapse( true ).select();
        ua.mouseup( editor.body );
        stop();
        setTimeout( function () {
                start();
        }, 500 );
} );
/*trace 960 这个bug标记不修*/
/*trace 1000*/
//test('trace 1000 回车后撤销按钮高亮', function() {
//    var editor = te.obj[0];
//    var range = te.obj[1];
//    editor.setContent('<p>欢迎使用<a href="http://www.baidu.com">ueditor</a></p>');
//    range.setStart(editor.body.firstChild.firstChild, 2).collapse(true).select();
//    editor.focus();
//    setTimeout(function() {
//        //必须调用这个keydown，撤销按钮才能高亮
//        ua.keydown(editor.body);
//        te.presskey("enter", "");
//        ua.keyup(editor.body);
//        editor.focus();
//        setTimeout(function() {
//            equal(editor.queryCommandState('undo'), 0, '回车后撤销按钮高亮');
//            start();
//        }, 20);
//    }, 20);
//    stop();
//});
/*trace 1068 */
test( 'trace 1068 默认样式的图片刷左浮动图片，撤销，左浮动图片刷默认样式的图片', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        var body = editor.body;
        editor.setContent( '<p><br></p>' );
        range.setStart( body.firstChild, 0 ).collapse( 1 ).select();
        editor.execCommand( 'insertimage', {src:'http://img.baidu.com/hi/jx2/j_0001.gif', width:50, height:51} );
        range.selectNode( editor.body.getElementsByTagName( 'img' )[0] ).select();
        editor.execCommand( 'imagefloat', 'none' );
        range.setStart( body.firstChild, 0 ).collapse( 1 ).select();
        editor.execCommand( 'insertimage', {src:'http://img.baidu.com/hi/jx2/j_0001.gif', width:50, height:51} );
        range.selectNode( editor.body.getElementsByTagName( 'img' )[0] ).select();
        editor.execCommand( 'imagefloat', 'left' );
        // equal(ua.getFloatStyle(body.getElementsByTagName( 'img' )[0]), "left", '左浮动' );
        //  equal(ua.getFloatStyle(body.getElementsByTagName( 'img' )[1]), "none", '默认' );
        range.selectNode( body.getElementsByTagName( 'img' )[1] ).select();
        editor.addListener( 'mouseup', function () {
                equal( editor.queryCommandState( 'formatmatch' ), 0, '刷后状态为0' );

        } );
        editor.execCommand( 'formatmatch' );
        range.selectNode( body.getElementsByTagName( 'img' )[0] ).select();
        ua.mouseup( editor.body );
        stop();
        setTimeout( function () {
                equal( ua.getFloatStyle( body.getElementsByTagName( 'img' )[0] ), "none", '默认刷左浮动' );
                editor.execCommand( 'Undo' );
                equal( ua.getFloatStyle( body.getElementsByTagName( 'img' )[0] ), "left", '撤销后，左浮动还原' );
                range.selectNode( body.getElementsByTagName( 'img' )[0] ).select();
                editor.execCommand( 'formatmatch' );
                range.selectNode( body.getElementsByTagName( 'img' )[1] ).select();
                ua.mouseup( editor.body );
                setTimeout( function () {
                        equal( ua.getFloatStyle( body.getElementsByTagName( 'img' )[1] ), 'left', '左浮动刷默认' );
                        start();
                }, 500 );
        }, 500 );

} );
/*trace 1182 如描述设成2行的列表，在第二行结尾两次回车不会分成两个列表，如果是3行的列表就可以了*/
//回车问题
//test('trace 1182 列表后回车再回车,撤销再回车', function() {
//    var editor = te.obj[0];
//    var range = te.obj[1];
//    var body = editor.body;
//    editor.setContent('<p>hello1</p><p>hello2</p><p>hello3</p>');
//    range.setStart(body.firstChild, 0).setEnd(body.lastChild, 1).select();
//    editor.execCommand('insertorderedlist');
//    ok(editor.body.getElementsByTagName('ol').length == 1 && editor.body.getElementsByTagName('ol')[0].childNodes.length == 3, '插入3行的有序列表');
//    range.setStart(editor.body.firstChild.childNodes[1], 1).collapse(true).select();
//    editor.focus();
//    setTimeout(function() {
//        ua.keydown(editor.body);
//        te.presskey("enter", "");
//        ua.keyup(editor.body);
//        editor.focus();
////        setTimeout(function() {
////            range.setStart(editor.body.firstChild.childNodes[2], 1).collapse(true).select();
////            editor.focus();
//        setTimeout(function() {
//            ua.keydown(editor.body);
//            te.presskey("enter", "");
//            ua.keyup(editor.body);
//            editor.focus();
//            setTimeout(function() {
//               ok(editor.body.getElementsByTagName('ol').length == 2 && editor.body.getElementsByTagName('ol')[0].childNodes.length == 2 && editor.body.getElementsByTagName('ol')[1].childNodes.length == 1, '2次回车后,列表分为前后两个');
//                editor.execCommand('Undo');
//                editor.focus();
//                setTimeout(function() {
//                    ua.keydown(editor.body);
//                    te.presskey("enter", "");
//                    ua.keyup(editor.body);
//                    editor.focus();
//                    setTimeout(function() {
//                        ok(editor.body.getElementsByTagName('ol').length == 2 && editor.body.getElementsByTagName('ol')[0].childNodes.length == 2 && editor.body.getElementsByTagName('ol')[1].childNodes.length == 1, '撤销再回车，跟上一步结果相同');
//                        start();
////
//                    }, 20);
//                }, 20);
//            }, 20);
//        }, 100);
//    }, 20);
//    stop();
//});
///*trace 1278 可以结合在trace 1182的用例中*/
//test('trace 1278 列表后回车再回车，撤销', function() {
//    var editor = te.obj[0];
//    var range = te.obj[1];
//    var body = editor.body;
//    editor.setContent('<p>hello1</p><p>hello2</p>');
//    range.setStart(body.firstChild, 0).setEnd(body.lastChild, 1).select();
//    editor.execCommand('insertorderedlist');
//    ok(editor.body.getElementsByTagName('ol').length == 1 && editor.body.getElementsByTagName('ol')[0].childNodes.length == 2, '插入2行的有序列表');
//    range.setStart(editor.body.firstChild.childNodes[1], 1).collapse(true).select();
//    editor.focus();
//    setTimeout(function() {
//        ua.keydown(editor.body);
//        te.presskey("enter", "");
//        ua.keyup(editor.body);
//        editor.focus();
//        setTimeout(function() {
//            ok(editor.body.getElementsByTagName('ol').length == 1 && editor.body.getElementsByTagName('ol')[0].childNodes.length == 3, '1次回车后,列表多1行');
//            ua.keydown(editor.body);
//            te.presskey("enter", "");
//            ua.keyup(editor.body);
//            editor.focus();
//            setTimeout(function() {
//                editor.execCommand('Undo');
//                ok(editor.body.getElementsByTagName('ol').length == 1 && editor.body.getElementsByTagName('ol')[0].childNodes.length == 3, '回车再撤销，与上一步结果相同');
//                start();
//            }, 20);
//        }, 20);
//    }, 20);
//    stop();
//});
/*trace 1381 只针对chrome和trace 上记载的步骤有差别*/
//回车问题
//test('trace 1381 输入http://www.baidu.com后回车，自动添加超链接，改变文本内容，超链接地址不变', function() {
//    if(ua.browser.chrome){
//        var editor = te.obj[0];
//        var range = te.obj[1];
//        editor.setContent('<p>http://www.baidu.com</p>');
//        range.setStart(editor.body.firstChild, 1).collapse(true).select();
//        editor.focus();
//        setTimeout(function() {
//            te.presskey("enter", "");
//            editor.focus();
//
//            setTimeout(function() {
//                ua.keydown(editor.body);
//                editor.execCommand('Undo');
//               ua.manualDeleteFillData( editor.body );
//                range.setStart(editor.body.childNodes[0].childNodes[0].childNodes[0], 20).collapse(true).select();
//                editor.focus();
//                setTimeout(function() {
//                    te.presskey("back", "");
//                    setTimeout(function() {
//                        te.presskey("back", "");
//                        editor.focus();
//                        setTimeout(function() {
//                            ok( $(editor.body.childNodes[0].childNodes[0]).attr( 'href' ).indexOf( 'http://www.baidu.com' ) != -1, '检查a的href' );
//                            start();
//                        }, 20);
//                    }, 20);
//                }, 20);
//
//            }, 20);
//
//        }, 20);
//        stop();
//    }
//    else{
//        equal(ua.browser.chrome,0,'此用例只针对chrome');
//    }
//});

//test(
//		'undo',
//		function() {
//			var editor = new baidu.editor.Editor({
//				enterkey : 'br',
//				initialContent : 'test'
//			});
//			editor.render(te.dom[0]);
//			var domUtils = baidu.editor.dom.domUtils, dtd = baidu.editor.dom.dtd, range = new baidu.editor.dom.Range(
//					editor.document);
//			editor.setContent('<b>xxxx</b><p>xxxx</p>');
//			range.selectNodeContents(editor.document.body).select();
//			editor.execCommand('bold');
//			editor.execCommand('Undo');
//			equals(getHTML(editor.document.body), '<b>xxxx</b><p>xxxx</p>');
//			editor.execCommand('redo');
//			equals(getHTML(editor.document.body), 'xxxx<p>xxxx</p>');
//			ok(!editor.hasRedo);
//
//			editor.execCommand('Undo');
//			editor.execCommand('Undo');
//			equals(getHTML(editor.document.body), 'test');
//		});