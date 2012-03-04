test("PUBLICGE-648", function() {
	stop();
	expect(2);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p>newText</p>',
		        minFrameHeight: 120
			});
		
			var div = document.body.appendChild(document.createElement('div'));
			editor.render(div);
			editor.focus();
			d = editor.document;
				 
			var button_paragraph= te.getButtonByTitle('editor', '格式');
			
			var range = new baidu.editor.dom.Range(editor.document);
			range.setStart(d.getElementsByTagName('p')[0].firstChild,2).collapse(true).select();
			$(button_paragraph.items[2]).click();
			
			equals(d.body.firstChild.tagName.toLowerCase(), "h2");
			equals(d.body.firstChild.innerHTML, "ne​wText", "ne​wText");
			
			te.obj.push(editor);
			te.dom.push(div);
			setTimeout(function(){
				start();
			}, 300);
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-649", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_paragraph= te.getButtonByTitle('editor1', '格式');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild,2).collapse(true).select();
	$(button_paragraph.items[2]).click();
	
	equals(editor.getContent().toLowerCase(), '<h2>new</h2>');
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-651", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_paragraph= te.getButtonByTitle('editor2', '格式');

	$(button_paragraph.items[2]).click();
	editor.execCommand('inserthtml', 'world');
	
	equals(editor.getContent(), '<h2>worldnew</h2>', 'The paragragh format is right');
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-1070", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_paragraph= te.getButtonByTitle('editor3', '格式');

	$(button_paragraph.items[1]).click();
	
	ok(editor.getContent() == '<h1><br /></h1>' || editor.getContent() == '<h1></h1>', 'The paragragh format is right');
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );