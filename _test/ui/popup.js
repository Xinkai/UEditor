test('test',function(){

});


//test( "PUBLICGE-607 PUBLICGE-696", function() {
//    stop();
//    expect( 5 );
//    ua.loadcss( '../../../themes/default/ueditor.css', function() {
//        ua.loadcss( upath + 'css/DEFAULT.css', function() {
//            var editor = new baidu.editor.ui.Editor( {
//                id: 'editor',
//                initialContent: '<p>aa<a href="http://www.baidu.com" target="_self">UEditor</a>aa</p>',
//                minFrameHeight: 120
//            } );
//            var div_new = document.createElement( 'div' );
//            document.body.appendChild( div_new );
//            editor.render( div_new );
//            editor.focus();
//            var d = editor.document;
//
//            var range = new baidu.editor.dom.Range( editor.document );
//            range.setStart( d.getElementsByTagName( 'a' )[0].firstChild, 2 ).collapse( true ).select();
//            ua.mouseup( d.getElementsByTagName( 'a' )[0] );
//            setTimeout( function() {
//                var popup = te.getElementByClassNameAndEditorid( 'editor', 'edui-bubble', 'popup' );
//                var content = document.getElementById( popup.id + '_content' );
//
//                equals( content.firstChild.childNodes[1].tagName.toLowerCase(), 'a', 'The link exists' );
//                equals( content.firstChild.childNodes[3].tagName.toLowerCase(), 'span', 'The span exists' );
//                equals( content.firstChild.childNodes[3].innerHTML, '修改', 'The 修改 exists' );
//                equals( content.firstChild.childNodes[5].tagName.toLowerCase(), 'span', 'The span exists' );
//                equals( content.firstChild.childNodes[5].innerHTML.replace( /\s/g, "" ), "清除", 'The 清除 exists' );
//
//
//                baidu.editor.ui.uiUtils.unsetGlobal( 'editor' );
//                document.body.removeChild( div_new );
//                var pp = content.parentNode.parentNode;
//                pp.parentNode.removeChild( pp );
//                setTimeout(function(){
//            		start();
//            	}, 300);
//            }, 300 );
//        } );
//    }, "edui-popup", "position", "absolute" );
//} );

//test( "PUBLICGE-1063", function() {
//    stop();
//    expect( 5 );
//    var editor = new baidu.editor.Editor( {  id: 'editor1',initialContent: '<a href="http://ueditor.baidu.com/">UEditor</a>'} );
//    var div = document.createElement( 'div' );
//    document.body.appendChild( div );
//    editor.render( div );
//
//debugger;
//    editor.focus();
//    var d = editor.document;
//    var popup = te.getElementByClassNameAndEditorid( 'editor1', 'edui-bubble', 'popup' );
//    var content = document.getElementById( popup.id + '_content' );
//
//    equals( content.firstChild.childNodes[1].tagName.toLowerCase(), 'a', 'The link exists' );
//    equals( content.firstChild.childNodes[3].tagName.toLowerCase(), 'span', 'The span exists' );
//    equals( content.firstChild.childNodes[3].innerHTML, '修改', 'The 修改 exists' );
//    equals( content.firstChild.childNodes[5].tagName.toLowerCase(), 'span', 'The span exists' );
//    equals( content.firstChild.childNodes[5].innerHTML.replace( /\s/g, "" ), "清除", 'The 清除 exists' );
//    baidu.editor.ui.uiUtils.unsetGlobal( 'editor1' );
//    var pp = content.parentNode.parentNode;
//    pp.parentNode.removeChild( pp );
//
//    document.body.removeChild( div );
//    setTimeout( function() {
//        start();
//    }, 300 );
//} );

//test( "PUBLICGE-699", function() {
//    stop();
//    expect( 1 );
//    var editor = new baidu.editor.ui.Editor( {
//        id: 'editor2',
//        initialContent: '<p>aa<a href="http://www.google.com" target="_self">UEditor</a>aa</p>',
//        minFrameHeight: 120
//    } );
//
//    var div_new = document.createElement( 'div' );
//    editor.render( document.body.appendChild( div_new ) );
//    editor.focus();
//    var d = editor.document;
//
//    var range = new baidu.editor.dom.Range( editor.document );
//    range.setStart( d.getElementsByTagName( 'a' )[0].firstChild, 2 ).collapse( true ).select();
//    ua.mouseup( d.getElementsByTagName( 'a' )[0] );
//    setTimeout( function() {
//        var popup = te.getElementByClassNameAndEditorid( 'editor2', 'edui-bubble', 'popup' );
//        var content = document.getElementById( popup.id + '_content' );
//        ok( content.innerHTML.indexOf( '跳转' ) == -1, 'The "跳转" is deleted' );
//        baidu.editor.ui.uiUtils.unsetGlobal( 'editor2' );
//        var pp = content.parentNode.parentNode;
//        pp.parentNode.removeChild( pp );
//        document.body.removeChild( div_new );
//        setTimeout(function(){
//    		start();
//    	}, 300);
//    }, 300 );
//} );
//
//
//test( "PUBLICGE-811", function() {
//	stop();
//	expect(1);
//    var editor = new baidu.editor.ui.Editor({
//        id: 'editor3',
//        initialContent: '<p><a href="http://www.baidu.com/">Baidu</a></p>',
//        minFrameHeight: 120
//    });
//
//    var div_new = document.createElement( 'div' );
//    editor.render( document.body.appendChild( div_new ) );
//    editor.focus();
//    d = editor.document;
//    var content = editor.getContent();
//
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.setStart(d.getElementsByTagName('p')[0], 1).collapse(true).select();
//	ua.mouseup(d.body);
//
//	editor.execCommand('inserthtml', '<img style="border:0px"  src="http://img.baidu.com/hi/jx2/j_0001.gif">');
//
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//	ua.mouseup(d.getElementsByTagName('img')[0]);
//
//	setTimeout(function(){
//		var popup = te.getElementByClassNameAndEditorid('editor3', 'edui-bubble', 'popup');
//		var nobr = TT.dom.query('nobr', popup.getDom());
//		equals(nobr.length, 1, "Only 1 popup");
//
//		var content = document.getElementById( popup.id + '_content' );
//		baidu.editor.ui.uiUtils.unsetGlobal( 'editor3' );
//        var pp = content.parentNode.parentNode;
//        pp.parentNode.removeChild( pp );
//        document.body.removeChild( div_new );
//        setTimeout(function(){
//    		start();
//    	}, 300);
//	}, 300);
//});
//
//test("PUBLICGE-830", function() {
//	stop();
//	expect(1);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor4',
//		minFrameHeight: 120
//	});
//
//	var div_new = document.createElement( 'div' );
//    editor.render( document.body.appendChild( div_new ) );
//	editor.focus();
//	d = editor.document;
//
//	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 title=MM style="float: left" />');
//
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//
//	editor.execCommand('link', {
//		href : "http://www.baidu.com"
//	});
//
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//	ua.mouseup(d.getElementsByTagName('img')[0]);
//
//	setTimeout(function(){
//		var popup = te.getElementByClassNameAndEditorid('editor3', 'edui-bubble', 'popup');
//		var nobr = TT.dom.query('nobr', popup.getDom());
//		equals(nobr.length, 2, "2 popups");
//
//		var content = document.getElementById( popup.id + '_content' );
//		baidu.editor.ui.uiUtils.unsetGlobal( 'editor4' );
//        var pp = content.parentNode.parentNode;
//        pp.parentNode.removeChild( pp );
//        document.body.removeChild( div_new );
//        setTimeout(function(){
//    		start();
//    	}, 300);
//	}, 300);
//} );
//
//test("PUBLICGE-704", function() {
//	stop();
//	expect(1);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor5',
//        minFrameHeight: 120
//	});
//
//	var div_new = document.createElement( 'div' );
//    editor.render( document.body.appendChild( div_new ) );
//	editor.focus();
//	d = editor.document;
//
//	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 style="float: left" />');
//
//	var range = new baidu.editor.dom.Range( editor.document );
//	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
//	var img = editor.selection.getRange().getClosedNode();
//	ua.mouseup(d.getElementsByTagName('img')[0]);
//
//	setTimeout(function(){
//		var popup = te.getElementByClassNameAndEditorid('editor5', 'edui-bubble', 'popup');
//		var nobr = TT.dom.query('nobr', popup.getDom());
//		var right = TT.dom.query('span:contains(右浮动)', nobr[0])[0];
//		$(right).click();
//		equals(img.style['cssFloat'] == 'right' || img.style['styleFloat'] == 'right', "The float changed");
//
//		var content = document.getElementById( popup.id + '_content' );
//		baidu.editor.ui.uiUtils.unsetGlobal( 'editor5' );
//        var pp = content.parentNode.parentNode;
//        pp.parentNode.removeChild( pp );
//        document.body.removeChild( div_new );
//        setTimeout(function(){
//    		start();
//    	}, 300);
//	}, 300);
//} );