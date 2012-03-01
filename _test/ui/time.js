test("PUBLICGE-761", function() {
	stop();
	expect(1);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			
			editor.execCommand('time');
			
			equals(d.getElementsByTagName('p')[0].firstChild.data.length, 8, "The '0' is added");
			start();
		});
	}, "edui-popup", "position", "absolute");
} );