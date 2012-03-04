test("PUBLICGE-825", function() {
	stop();
	expect(1);
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
			var button_fontfamily = te.getButtonByTitle('editor', '字体');
			var button_source = te.getButtonByTitle('editor', '源代码');
				 
			var range = new baidu.editor.dom.Range(editor.document);
			range.selectNode(d.getElementsByTagName('p')[0], 0).select();
			$(button_fontfamily.items[2]).click();
			$(button_source).click();
			$(button_source).click();
			range.selectNode(d.getElementsByTagName('p')[0], 0).select();
			ua.mouseup(editor.document.body);
			setTimeout(function(){
				equals(button_fontfamily.label, '隶书', 'The lable of the fontfamily is right');
				start();
			}, 500);
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-571", function() {
	stop();
	expect(4);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor1',
				initialContent: '<p>地对地导弹</p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			var button_fontfamily = te.getButtonByTitle('editor1', '字体');
			var button_fontsize = te.getButtonByTitle('editor1', '字号');
			var button_backcolor = te.getButtonByTitle('editor1', '背景色');
				 
			var range = new baidu.editor.dom.Range(editor.document);
			range.selectNode(d.getElementsByTagName('p')[0].firstChild, 0).select();
			$(button_fontsize.items[7]).click();
			
			range.selectNode(d.getElementsByTagName('p')[0].firstChild.firstChild, 0).select();
			button_backcolor.popup.content.onpickcolor('pickcolor','#32CD32');
		
			range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 1).setEnd(d.getElementsByTagName('p')[0].firstChild.firstChild, 3).select();
			$(button_fontsize.items[2]).click();
			
			range.setStart(d.getElementsByTagName('p')[0].firstChild.childNodes[0], 0).setEnd(d.getElementsByTagName('p')[0].firstChild.childNodes[1].firstChild, 1).select();
			$(button_fontfamily.items[2]).click();
			
			equals(d.getElementsByTagName('p')[0].firstChild.childNodes[0].style['fontSize'], '24pt', 'The font-size is 24pt');
			equals(d.getElementsByTagName('p')[0].firstChild.childNodes[0].firstChild.data, '地', 'The text is "地"');
			equals(d.getElementsByTagName('p')[0].firstChild.childNodes[1].style['fontSize'], '12pt', 'The font-size is 12pt');
			equals(d.getElementsByTagName('p')[0].firstChild.childNodes[1].firstChild.firstChild.data, '对', 'The text is "对"');
			start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-579", function() {
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_fontfamily = te.getButtonByTitle('editor2', '字体');
	var flag = 0;
	
	for(var i = 0; i < button_fontfamily.items.length; i++){
		if(button_fontfamily.items[i].label == 'Symbol' || button_fontfamily.items[i].label == 'σψυβολ')
			flag = 1;
	}
	
	equals(flag, 0, "The 'Symbol' is deleted");
} );