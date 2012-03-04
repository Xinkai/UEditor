test("PUBLICGE-668", function() {
	stop();
	expect(1);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {	
			var content = '';
			for(var i = 0; i < 20; i ++)
				content += '<p>1</p>';
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent : content,
		        minFrameHeight: 120
			});
		
			var div = document.body.appendChild(document.createElement('div'));
			editor.render(div);
			editor.focus();
			d = editor.document;
			var button_fullscreen = te.getButtonByTitle('editor', '全屏');
//			editor.setContent(content);
			
			$(button_fullscreen).click();
			
			editor.window.scrollTo(100,100);
			ok(Math.max(editor.document.documentElement.scrollTop, editor.document.body.scrollTop) > 0, "The scrollbar exists");
			
			te.obj.push(editor);
			te.dom.push(div);
			setTimeout(function(){
				start();
			}, 300);
		});
	}, "edui-popup", "position", "absolute");
} );