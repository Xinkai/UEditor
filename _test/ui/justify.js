test("PUBLICGE-558", function() {
	stop();
	expect(2);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			
			var button_justifycenter = te.getButtonByTitle('editor', '居中对齐');
			
			$(button_justifycenter).click();
			
			equals(d.getElementsByTagName('p')[0].style['textAlign'], 'center', "The justify format is set");
			ok(d.getElementsByTagName('p')[0].childNodes[0].data 
					&& d.getElementsByTagName('p')[0].childNodes[0].data.length == 1
					, "There is a placeholder");
			start();
		});
	}, "edui-popup", "position", "absolute");
} );