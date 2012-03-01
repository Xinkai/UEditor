module( "plugins.justify" );


test( '闭合在段落中设置对齐方式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><em>hello1</em></p>' );
    range.setStart( body.firstChild.firstChild.firstChild, 3 ).collapse( true ).select();
    editor.execCommand( 'justify', 'center' );
    equal( body.firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐' );
} );


test( '不闭合在段落中设置对齐方式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><em>hello1</em></p><p><span style="color:red">hello2</span>hello3</p>' );
    range.selectNode( body.firstChild.firstChild.firstChild ).select();
    editor.execCommand( 'justify', 'center' );
    equal( body.firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐' );

    range.setStart( body.firstChild, 0 ).setEnd( body.lastChild, 1 ).select();
    editor.execCommand( 'justify', 'right' );
    equal( body.firstChild.style['textAlign'], 'right', 'p对齐方式为居中对齐' );
    equal( body.lastChild.style['textAlign'], 'right', 'p对齐方式为居中对齐' );

    range.setStart( body.firstChild.firstChild.firstChild, 3 ).collapse( true ).select();
    editor.execCommand( 'justify', 'center' );
    equal( body.firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐' );
} );


test( '表格中设置对齐方式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<table><tbody><tr><td></td><td><p>hello</p></td></tr></tbody></table>' );
    var tds = editor.body.getElementsByTagName( 'td' );
    range.setStart( tds[0], 0 ).collapse( true ).select();
    editor.execCommand( 'justify', 'right' );

    equal( editor.queryCommandValue( 'justify' ), 'right', 'queryCommandValue is right' );
    equal( tds[0].style['textAlign'], 'right', 'td对齐方式为右对齐' );

    /*不闭合设置对齐方式*/
    editor.currentSelectedArr = [tds[1].firstChild];
    range.selectNode( tds[1] ).select();
    editor.execCommand( 'justify', 'center' );
    equal( tds[1].firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐' );
} );


test( '对齐方式-参数为json', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<table><tbody><tr><td></td><td><p>hello</p></td></tr></tbody></table>' );
    var tds = editor.body.getElementsByTagName( 'td' );
    range.setStart( tds[1].firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'justify', 'right' );
    equal( tds[1].firstChild.style['textAlign'], 'right', 'p对齐方式为右对齐' );
    equal( editor.queryCommandValue( 'justify' ), 'right', 'querycommand value' );
} );


test( 'startContainer是body', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p><em>tell</em></p>' );
    range.setStart( editor.body, 0 ).collapse( true ).select();
    editor.execCommand( 'justify', 'right' );

    equal( editor.queryCommandValue( 'justify' ), 'right', 'startContainer 是body' );
    equal( editor.queryCommandValue( 'justify' ), 'right', 'querycommand value' );
    /*json格式的参数*/
    range.setStart( editor.body, 0 ).collapse( true ).select();
    editor.execCommand( 'justify', {'text-align':'left'} );
    equal( editor.queryCommandValue( 'justify' ), 'left', 'startContainer 是body--json格式的参数' );
} );

test( '连续2次设置对齐方式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p ><em>tell</em></p>' );
    range.setStart( editor.body.firstChild.firstChild, 0 ).collapse( 1 ).select();
    editor.execCommand( 'justify', 'right' );
    equal( editor.queryCommandValue( 'justify' ), 'right', 'querycommand value' );
    range.setStart( editor.body.firstChild.firstChild, 0 ).collapse( 1 ).select();
    editor.execCommand( 'justify', 'center' );
    equal( editor.queryCommandValue( 'justify' ), 'center', 'querycommand value' );
} );
