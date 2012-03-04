test("PUBLICGE-831", function() {
	stop();
	expect(4);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p>你好吗</p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			var button_horizontal = te.getButtonByTitle('editor', '分隔线');
				 
			var range = new baidu.editor.dom.Range(editor.document);
			range.setStart(d.getElementsByTagName('p')[0], 3).collapse(true).select();
			$(button_horizontal).click();
			equals(d.body.childNodes.length, 3, "There are 3 nodes.");
			equals(d.body.childNodes[0].tagName.toLowerCase(), 'p', "The first node is a 'p'");
			equals(d.body.childNodes[1].tagName.toLowerCase(), 'hr', "The second node is a 'hr'");
			equals(d.body.childNodes[2].tagName.toLowerCase(), 'p', "The third node is a 'p'");
		    start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-511", function() {
	expect(4);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor',
		initialContent: '<p>你好吗</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_horizontal = te.getButtonByTitle('editor', '分隔线');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0], 3).collapse(true).select();
	$(button_horizontal).click();
	equals(d.body.childNodes.length, 3, "There are 3 nodes.");
	equals(d.body.childNodes[0].tagName.toLowerCase(), 'p', "The first node is a 'p'");
	equals(d.body.childNodes[1].tagName.toLowerCase(), 'hr', "The second node is a 'hr'");
	equals(d.body.childNodes[2].tagName.toLowerCase(), 'p', "The third node is a 'p'");
} );

test("PUBLICGE-707", function() {
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>你好</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_horizontal = te.getButtonByTitle('editor1', '分隔线');
	var button_backcolor= te.getButtonByTitle('editor1', '背景色');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	
	button_backcolor.popup.content.onpickcolor('pickcolor','#ff0000');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 2).collapse(true).select();
	
	$(button_horizontal).click();
	
	var elementpath_arr = editor.queryCommandValue('elementpath');
	var elementpath = "";
	for(var i = 0; i < elementpath_arr.length; i++){
		elementpath += elementpath_arr[i] + '_';
	}
	equals(elementpath, "body_p_span_", "The elementpath is right");
} );