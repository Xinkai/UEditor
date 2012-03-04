test("PUBLICGE-523", function() {
	stop();
	expect(2);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p>ff</p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
				 
			var button_subscript= te.getButtonByTitle('editor', '下标');
			
			var range = new baidu.editor.dom.Range(editor.document);
			range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
			$(button_subscript).click();
			range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 1).collapse(true).select();
			$(button_subscript).click();
			
			equals(d.getElementsByTagName('p')[0].childNodes.length, 3, "There is a placeholder");
			ok(d.getElementsByTagName('p')[0].childNodes[1].data 
					&& d.getElementsByTagName('p')[0].childNodes[1].data.length == 1
					, "There is a placeholder");
			start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-541", function() {
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
		 
	var button_subscript= te.getButtonByTitle('editor1', '下标');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 3).collapse(true).select();
	$(button_subscript).click();
	
	editor.setContent('<p>new<sub>b</sub></p>');
	range.setStart(d.getElementsByTagName('p')[0].childNodes[1].firstChild, 1).collapse(true).select();
	$(button_subscript).click();
	equals(editor.getContent(), '<p>new<sub>b</sub></p>');
} );

test("PUBLICGE-542", function() {
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
		 
	var button_subscript= te.getButtonByTitle('editor2', '下标');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 3).collapse(true).select();
	$(button_subscript).click();
	
	editor.setContent('<p>new<sub>b</sub></p>');
	range.setStart(d.getElementsByTagName('p')[0].childNodes[1].firstChild, 1).collapse(true).select();
	$(button_subscript).click();
	ok(button_subscript.getDom().childNodes[0].className.indexOf('edui-state-checked') == -1, 
		"The subscript button is not hightlight.");
} );

test("PUBLICGE-520", function() {
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
		 
	var button_subscript= te.getButtonByTitle('editor3', '下标');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 3).collapse(true).select();
	
	$(button_subscript).click();
	editor.execCommand('inserthtml', '1');
	
	$(button_subscript).click();
	editor.execCommand('inserthtml', '2');
	
	equals(editor.getContent(), '<p>new<sub>1</sub>2</p>', 'The content is right');
} );