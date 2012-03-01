/**
 * Created by JetBrains PhpStorm.
 * User: shenlixia01
 * Date: 11-8-15
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */
module( 'plugins.cleardoc' );

test( '取得焦点后清空后查看range', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p>hello1</p><table><tr><td>hello2</td></tr></table>' );
    editor.focus();
    var body = editor.body;
    editor.execCommand( 'cleardoc' );
    range = editor.selection.getRange();
    ua.manualDeleteFillData( editor.body );
    if ( baidu.editor.browser.ie )
        equal( ua.getChildHTML( body ), '<p>&nbsp;</p>' );
    else
        equal( ua.getChildHTML( body ), '<p><br></p>', '清空文档' );
} );

test( '编辑器没有焦点，清空', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p>hello1</p><table><tr><td>hello2</td></tr></table>' );
//    editor.focus();
    var body = editor.body;
    editor.execCommand( 'cleardoc' );
    range = editor.selection.getRange();
    ua.manualDeleteFillData( editor.body );
    if ( baidu.editor.browser.ie )
        equal( ua.getChildHTML( body ), '<p>&nbsp;</p>' );
    else
        equal( ua.getChildHTML( body ), '<p><br></p>', '清空文档' );
} );