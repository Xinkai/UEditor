test("PUBLICGE-686", function() {
	stop();
	expect(1);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p>new</p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
				 
			var button_directionalityltr= te.getButtonByTitle('editor', '从左向右输入');
			
			$(button_directionalityltr).click();
			
			equals(editor.getContent().toLowerCase(), '<p dir="ltr">new</p>', "The content is right");
			start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-656", function() {
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
		 
	var button_directionalityltr= te.getButtonByTitle('editor1', '从左向右输入');
	var button_source= te.getButtonByTitle('editor1', '源代码');
	
	$(button_directionalityltr).click();
	$(button_source).click();
	$(button_source).click();
	editor.execCommand('inserthtml', 'world');

	equals(editor.getContent(), '<p dir="ltr">worldnew</p>', 'The directionality is right')
} );
