test("PUBLICGE-832", function() {
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
			var button_bold = te.getButtonByTitle('editor', '加粗');
			var button_underline= te.getButtonByTitle('editor', '下划线');
				 
			var range = new baidu.editor.dom.Range(editor.document);
			range.selectNode(d.getElementsByTagName('p')[0], 0).select();
			$(button_bold).click();
			$(button_underline).click();
			range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild,1).collapse(true).select();
			ok(button_underline.getDom().childNodes[0].className.indexOf('edui-state-checked') >= -1, 
					"The underline button is checked.");
		    start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-826", function() {
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>你好吗</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_fontfamily = te.getButtonByTitle('editor1', '字体');
	var button_underline= te.getButtonByTitle('editor1', '下划线');
	var button_strikethrough = te.getButtonByTitle('editor1', '删除线');
	var button_source = te.getButtonByTitle('editor1', '源代码');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('p')[0], 0).select();
	$(button_fontfamily.items[1]).click();
	$(button_underline).click();
	$(button_source).click();
	$(button_source).click();
	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), "span", "The source code is not changed");
	ok(d.getElementsByTagName('p')[0].firstChild.style['fontFamily'].indexOf('楷体') > -1, "The font is not changed");
	equals(d.getElementsByTagName('p')[0].firstChild.style['textDecoration'], 'underline', "The underline is not changed");
} );

test("PUBLICGE-515", function() {
	expect(5);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<ul><li>first line<br/>second line</li></ul>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_underline= te.getButtonByTitle('editor2', '下划线');

	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('li')[0].firstChild).select();
	$(button_underline).click();
	range.setStart(d.getElementsByTagName('li')[0].firstChild.firstChild, 10).collapse(true).select();
	$(button_underline).click();
	
	equals(d.getElementsByTagName('li')[0].childNodes.length, "4", "There are 4 tags in li");
	equals(d.getElementsByTagName('li')[0].childNodes[1].tagName.toLowerCase(), 'span', 'There is a span as placeholder');
	equals(d.getElementsByTagName('li')[0].childNodes[1].firstChild.tagName.toLowerCase(), 'span', 'There is a span as placeholder');
	ok(d.getElementsByTagName('li')[0].childNodes[1].firstChild.firstChild.data 
			&& d.getElementsByTagName('li')[0].childNodes[1].firstChild.firstChild.data.length == 1
			, "There is a placeholder");
	equals(d.getElementsByTagName('li')[0].childNodes[1].firstChild.style['textDecoration'], 'none', "The placeholder with no underline");
} );

test("PUBLICGE-590", function() {
	expect(4);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p>你好啊你叫什么名字</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_underline= te.getButtonByTitle('editor3', '下划线');

	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 0).setEnd(d.getElementsByTagName('p')[0].firstChild, 3).select();
	$(button_underline).click();
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 1).setEnd(d.getElementsByTagName('p')[0].firstChild.nextSibling, 1).select();
	$(button_underline).click();
	
	equals(d.getElementsByTagName('p')[0].childNodes[0].style['textDecoration'], "underline", "The underline");
	equals(d.getElementsByTagName('p')[0].childNodes[0].firstChild.data, '你', 'The text is right');
	equals(d.getElementsByTagName('p')[0].childNodes[1].style['textDecoration'], "none", "No underline");
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.data, '好啊', 'The text is right');
} );

test("PUBLICGE-698", function() {
	expect(7);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor4',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_bold= te.getButtonByTitle('editor4', '加粗');
	var button_italic= te.getButtonByTitle('editor4', '斜体');
	var button_underline= te.getButtonByTitle('editor4', '下划线');
	var button_source= te.getButtonByTitle('editor4', '源代码');
	
	$(button_bold).click();
	$(button_italic).click();
	$(button_underline).click();
	
	editor.execCommand('inserthtml', 'first');
	editor.execCommand('inserthtml', '<img style="border:0px"  src="http://img.baidu.com/hi/jx2/j_0001.gif">');
	editor.execCommand('inserthtml', 'second');
	
	$(button_source).click();
	$(button_source).click();
	
	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), 'strong');
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.tagName.toLowerCase(), 'em');
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.tagName.toLowerCase(), 'span');
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.style['textDecoration'], 'underline');
	if(ua.browser.gecko){
		equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.childNodes[1].data, 'first');
		equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.childNodes[2].tagName.toLowerCase(), 'img');
		equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.childNodes[3].data, 'second');
	}
	else{
		equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.childNodes[0].data, 'first');
		equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.childNodes[1].tagName.toLowerCase(), 'img');
		equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.childNodes[2].data, 'second');
	}
} );