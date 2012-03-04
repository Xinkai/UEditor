test("PUBLICGE-587", function() {
	stop();
	expect(4);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
		        minFrameHeight: 120
			});
		
			var div = document.body.appendChild(document.createElement('div'));
			editor.render(div);
			editor.focus();
			d = editor.document;
			
			editor.execCommand('insertvideo', {
				height: "100",
				width: "200",
				url: "http://localhost/ueditor/data/test_flash.swf",
				style: "float: left"
			});
			
			var range = new baidu.editor.dom.Range( editor.document );
			range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
			var img = editor.selection.getRange().getClosedNode();

			equals(img.getAttribute("_url"), 'http://localhost/ueditor/data/test_flash.swf', 'The url is right');
            equals(img.width, '200', 'The height is right');
            equals(img.height, '100', 'The height is right');
            ok(img.style.cssFloat == 'left' || img.style.styleFloat == 'left', 'The float style is right');

            te.obj.push(editor);
			te.dom.push(div);
			setTimeout(function(){
				start();
			}, 300);
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-787", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	editor.execCommand('insertvideo', {
		height: "100",
		width: "200",
		url: "http://localhost/ueditor/data/test_flash.swf",
		style: "float: left"
	});

	ok(window.frames[0].document.getElementsByTagName('img')[0].style.border.indexOf('1px solid') > -1);
	
    te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );