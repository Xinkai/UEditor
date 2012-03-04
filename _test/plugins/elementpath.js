module( 'plugins.elementpath' );

/*
 <li>表格
 <li>列表
 <li>文本
 <li>图片
 <li>超链接
 <li>加粗加斜
 <li>下划线，删除线
 * */

//1.2的版本中，表格的外面会自动套一个带格式的div
test( '表格', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<table><tbody><tr><td>hello1</td><td><strong>strongText</strong>hello2<span style="text-decoration: underline">spanText</span></td></tr></tbody></table>' );
        var body = editor.body;
        /*选中整个表格*/
        range.selectNode( body.firstChild ).select();
        var eles = editor.queryCommandValue( 'elementpath' );
        /*TODO 表格拖拽功能暂时被取消了，所以elementpath里先不放div*/
//        ua.checkElementPath( eles, ['body', 'div', 'table', 'tbody', 'tr', 'td'], '选中整个表格' );
        ua.checkElementPath( eles, ['body', 'table', 'tbody', 'tr', 'td'], '选中整个表格' );
        /*在单元格中单击*/
        var tds = body.getElementsByTagName( 'td' );
        range.setStart( tds[0].firstChild, 0 ).collapse( true ).select();
        /*TODO 表格拖拽功能暂时被取消了，所以elementpath里先不放div*/
//           ua.checkElementPath( eles, ['body', 'div', 'table', 'tbody', 'tr', 'td'], '在单元格中单击' );
        ua.checkElementPath( eles, ['body', 'table', 'tbody', 'tr', 'td'], '在单元格中单击' );
        /*在单元格中的加粗文本中单击*/
        ua.manualDeleteFillData( editor.body );
        range.setStart( tds[1].firstChild.firstChild, 1 ).collapse( true ).select();
        eles = editor.queryCommandValue( 'elementpath' );
        /*TODO 表格拖拽功能暂时被取消了，所以elementpath里先不放div*/
//        ua.checkElementPath( eles, ['body', 'div', 'table', 'tbody', 'tr', 'td', 'strong'], '在单元格中的加粗文本中单击' );
        ua.checkElementPath( eles, ['body', 'table', 'tbody', 'tr', 'td', 'strong'], '在单元格中的加粗文本中单击' );
        /*在单元格中的下划线文本中单击*/
        ua.manualDeleteFillData( editor.body );
        range.setStart( tds[1].lastChild.firstChild, 1 ).collapse( true ).select();
        eles = editor.queryCommandValue( 'elementpath' );
        /*TODO 表格拖拽功能暂时被取消了，所以elementpath里先不放div*/
//        ua.checkElementPath( eles, ['body', 'div', 'table', 'tbody', 'tr', 'td', 'span'], '在单元格中的下划线文本中单击' );
        ua.checkElementPath( eles, ['body', 'table', 'tbody', 'tr', 'td', 'span'], '在单元格中的下划线文本中单击' );
        /*选中有下划线的文本*/
        ua.manualDeleteFillData( editor.body );
        range.setStart( tds[1].lastChild.lastChild, 1 ).setEnd( tds[1].lastChild.lastChild, 4 ).select();
        eles = editor.queryCommandValue( 'elementpath' );
        /*TODO 表格拖拽功能暂时被取消了，所以elementpath里先不放div*/
//        ua.checkElementPath( eles, ['body', 'div', 'table', 'tbody', 'tr', 'td', 'span'], '选中有下划线的文本' );
        ua.checkElementPath( eles, ['body', 'table', 'tbody', 'tr', 'td', 'span'], '选中有下划线的文本' );
} );
//1.2的版本中，表格的外面会自动套一个带格式的div
test( 'trace 1539:列表', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<ol><li>hello1</li><li>hello2<br /><table><tbody><tr><td>hello3</td></tr></tbody></table></li></ol>' );
        var body = editor.body;
        /*选中所有列表*/
        range.selectNode( body.firstChild ).select();
        var eles = editor.queryCommandValue( 'elementpath' );
        ua.checkElementPath( eles, ['body', 'ol', 'li', 'p'], '选中整个列表' );
        /*选中列表中的表格*/
        range.selectNode( body.firstChild.getElementsByTagName( 'table' )[0] ).select();
        var eles = editor.queryCommandValue( 'elementpath' );
        if ( !ua.browser.ie )
//    ua.checkElementPath( eles, ['body','ol','li','div','table','tbody','tr','td'], '选中列表中的表格' );
        /*TODO 表格拖拽功能暂时被取消了，所以elementpath里先不放div*/
                ua.checkElementPath( eles, ['body', 'ol', 'li', 'table', 'tbody', 'tr', 'td'], '选中列表中的表格' );
//    /*选中列表中的br*/
//    range.selectNode( body.firstChild.getElementsByTagName( 'br' )[0] ).select();
//    var eles = editor.queryCommandValue( 'elementpath' );
//    ua.checkElementPath( eles, ['body','ol','li','br'], '选中列表中的br' );
} );

test( '文本和超链接', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<div><p>hello<a>a_link</a></p></div>' );
        var body = editor.body;
        /*选中文本hello*/
        range.selectNode( body.firstChild.firstChild.firstChild ).select();
        var eles = editor.queryCommandValue( 'elementpath' );
        ua.checkElementPath( eles, ['body', 'div', 'p'], '选中文本' );
        /*选中超链接*/
        range.selectNode( body.firstChild.firstChild.lastChild.firstChild ).select();
        var eles = editor.queryCommandValue( 'elementpath' );
        ua.checkElementPath( eles, ['body', 'div', 'p', 'a'], '选中文本' );
} );
//在版本1.2中，如果没有setTimeout在FF（3.6和9都是）中range会出错，其他浏览器没问题
test( '图片', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<div><p>hello<img /></p></div>' );
        var body = editor.body;
        /*选中图片*/
        stop()
        setTimeout( function () {
                range.selectNode( body.firstChild.firstChild.lastChild ).select();
                var eles = editor.queryCommandValue( 'elementpath' );
                ua.checkElementPath( eles, ['body', 'div', 'p', 'img'], '选中图片' );
                start()
        }, 100 )
} );