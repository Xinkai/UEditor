test("PUBLICGE-539", function() {
	stop();
	expect(4);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p><span style="color: rgb(153,31,31);background-color: rgb(89,128,13)">ddd</span><span style="color: rgb(85,0,255)"><span style="color: rgb(85,0,255);background-color: rgb(89,128,13)">dhello</span>hello</span><br /></p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
				 
			var button_backcolor = te.getButtonByTitle('editor', '背景色');
			
			var range = new baidu.editor.dom.Range(editor.document);
			range.setStart(d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild, 1).setEnd(d.getElementsByTagName('p')[0].childNodes[1].firstChild.nextSibling, 5).select();
			button_backcolor.popup.content.onpickcolor('pickcolor','#ff0000');
			
			equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'span', 'The first span');
			ok(d.getElementsByTagName('p')[0].childNodes[0].style['color'].replace(/\s/g, "") == "rgb(153,31,31)"
				|| d.getElementsByTagName('p')[0].childNodes[0].style['color'] == "#991f1f", 'The forecolor is right');
			ok(d.getElementsByTagName('p')[0].childNodes[0].style['backgroundColor'].replace(/\s/g, "") == "rgb(89,128,13)"
				|| d.getElementsByTagName('p')[0].childNodes[0].style['backgroundColor'] == "#59800d", 'The backcolor is right');
			equals(d.getElementsByTagName('p')[0].childNodes[0].firstChild.data, 'ddd', 'The text is right');

			start();
		});
	}, "edui-popup", "position", "absolute");
} );
//
//test("PUBLICGE-612", function() {
//	expect(4);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor1',
//		initialContent: '<p>你好吗</p>',
//		minFrameHeight: 120
//	});
//
//	editor.render(document.body.appendChild(document.createElement('div')));
//	editor.focus();
//	d = editor.document;
//		 
//	var button_backcolor = te.getButtonByTitle('editor1', '背景色');
//	var button_fontsize = te.getButtonByTitle('editor1', '字号');
//	
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
//	button_backcolor.popup.content.onpickcolor('pickcolor','#ff0000');
//	
//	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 1).setEnd(d.getElementsByTagName('p')[0].firstChild.firstChild, 2).select();
//	$(button_fontsize.items[7]).click();
//	
//	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), 'span', 'The first span');
//	ok(d.getElementsByTagName('p')[0].firstChild.style['backgroundColor'] == 'rgb(255, 0, 0)'
//		|| d.getElementsByTagName('p')[0].firstChild.style['backgroundColor'] == '#ff0000'
//			, 'The backgroundColor is right');
//	equals(d.getElementsByTagName('p')[0].firstChild.childNodes[1].tagName.toLowerCase(), 'span', 'The second span');
//	equals(d.getElementsByTagName('p')[0].firstChild.childNodes[1].style['fontSize'], '24pt', 'The fontSize is right');
//} );
//
//test("PUBLICGE-692", function() {
//	expect(1);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor2',
//		initialContent: '<p>你好</p>',
//        minFrameHeight: 120
//	});
//
//	editor.render(document.body.appendChild(document.createElement('div')));
//	editor.focus();
//	d = editor.document;
//	var button_backcolor= te.getButtonByTitle('editor2', '背景色');
//	var button_source= te.getButtonByTitle('editor2', '背景色');
//		 
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
//	button_backcolor.popup.content.onpickcolor('pickcolor','#ff0000');
//	button_backcolor.popup.content.onpicknocolor('picknocolor');
//	
//	$(button_source).click();
//	$(button_source).click();
//	
//	ok(editor.getContent().indexOf('color') == -1, "The color is cleared");
//} );
//
//test("PUBLICGE-616", function() {
//	expect(3);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor3',
//		initialContent: '<p>你好，你叫什么名字</p>',
//        minFrameHeight: 120
//	});
//
//	editor.render(document.body.appendChild(document.createElement('div')));
//	editor.focus();
//	d = editor.document;
//	var button_forecolor = te.getButtonByTitle('editor3', '字体颜色');
//	
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.setStart(d.getElementsByTagName('p')[0].firstChild, 0).setEnd(d.getElementsByTagName('p')[0].firstChild, 2).select();
//	button_forecolor.popup.content.onpickcolor('pickcolor','#ff0000');
//
//	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 2).collapse(true).select();
//	editor.execCommand('inserthtml', '干嘛');
//	button_forecolor.popup.content.onpicknocolor('picknocolor');
//	editor.execCommand('inserthtml', 'hello');
//	
//	equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'span', 'The span is right');
//	equals(d.getElementsByTagName('p')[0].childNodes[0].innerHTML, '你好干嘛', 'The "你好干嘛" is red');
//	if(ua.browser.gecko || ua.browser.opera)
//		equals(d.getElementsByTagName('p')[0].childNodes[1].data, 'hello', 'The "hello" isnot red');
//	else
//		equals(d.getElementsByTagName('p')[0].childNodes[2].data, 'hello', 'The "hello" isnot red');
//} );
//
//test("PUBLICGE-634", function() {
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor4',
//        minFrameHeight: 120
//	});
//
//	editor.render(document.body.appendChild(document.createElement('div')));
//	editor.focus();
//	d = editor.document;
//	var button_forecolor = te.getButtonByTitle('editor4', '字体颜色');
//
//	button_forecolor.popup.content.onpickcolor('pickcolor','#ff0000');
//
//	editor.execCommand('inserthtml', '你好');
//	
//	equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'span', 'The span is right');
//	if(ua.browser.gecko || ua.browser.opera){
//		equals(d.getElementsByTagName('p')[0].childNodes[0].childNodes[0].data, '你好', 'The "​你好" is red');
//	}
//	else{
//		equals(d.getElementsByTagName('p')[0].childNodes[0].childNodes[1].data, '你好', 'The "​你好" is red');	
//	}
//} );

test("PUBLICGE-635", function() {
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor5',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_backcolor = te.getButtonByTitle('editor5', '背景色');
	
	button_backcolor.popup.content.onpickcolor('pickcolor','#ff0000');
	editor.execCommand('inserthtml', 'new');
	
	button_backcolor.popup.content.onpicknocolor('picknocolor');
	editor.execCommand('inserthtml', 'hello');
	
	equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'span', 'The span is right');
	equals(d.getElementsByTagName('p')[0].childNodes[0].innerHTML, 'new', 'The "new" is red');
	if(ua.browser.gecko || ua.browser.opera)
		equals(d.getElementsByTagName('p')[0].childNodes[1].data, 'hello', 'The "hello" isnot red');
	else
		equals(d.getElementsByTagName('p')[0].childNodes[2].data, 'hello', 'The "hello" isnot red');
} );

test("PUBLICGE-636 PUBLICGE-1071", function() {
	expect(7);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor6',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_backcolor = te.getButtonByTitle('editor6', '背景色');
	var button_forecolor = te.getButtonByTitle('editor6', '字体颜色');
	var button_bold= te.getButtonByTitle('editor6', '加粗');
	var button_italic = te.getButtonByTitle('editor6', '斜体');
	var button_underline = te.getButtonByTitle('editor6', '下划线');
	var button_fontsize = te.getButtonByTitle('editor6', '字号');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 3).collapse(true).select();
	
	$(button_bold).click();
	$(button_italic).click();
	$(button_underline).click();
	$(button_fontsize.items[7]).click();
	button_forecolor.popup.content.onpickcolor('pickcolor','#ffff00');
	button_backcolor.popup.content.onpickcolor('pickcolor','#ff0000');
	
	button_backcolor.popup.content.onpicknocolor('picknocolor');
	editor.execCommand('inserthtml', 'hello');
	
	editor.getContent();
	equals(d.getElementsByTagName('p')[0].childNodes[1].tagName.toLowerCase(), 'strong', 'The tag is right');
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.tagName.toLowerCase(), 'em', 'The tag is right');
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild.tagName.toLowerCase(), 'span', 'The tag is right');
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild.style['textDecoration'], 'underline', 'The underline is right');
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild.style['fontSize'], '24pt', 'The fontsize is right');
	ok(d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild.style['color'] == 'rgb(255, 255, 0)'
		|| d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild.style['color'] == "#ffff00", 'The color is right');
	if(ua.browser.gecko || ua.browser.opera){
		equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild.childNodes[0].data, 'hello', 'The text is right');
	}
	else{
		equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.firstChild.childNodes[1].data, 'hello', 'The text is right');
	}
} );

test("PUBLICGE-637", function() {
	expect(5);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor7',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_backcolor = te.getButtonByTitle('editor7', '背景色');
	var button_forecolor = te.getButtonByTitle('editor7', '字体颜色');;
	var button_fontsize = te.getButtonByTitle('editor7', '字号');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 3).collapse(true).select();
	
	button_forecolor.popup.content.onpickcolor('pickcolor','#ffff00');
	button_backcolor.popup.content.onpickcolor('pickcolor','#ff0000');
	$(button_fontsize.items[7]).click();

	editor.execCommand('inserthtml', 'hello');
	
	equals(d.getElementsByTagName('p')[0].childNodes[1].tagName.toLowerCase(), 'span', 'The tag is right');
	equals(d.getElementsByTagName('p')[0].childNodes[1].style['fontSize'], '24pt', 'The fontsize is right');
	ok(d.getElementsByTagName('p')[0].childNodes[1].style['color'] == 'rgb(255, 255, 0)'
		|| d.getElementsByTagName('p')[0].childNodes[1].style['color'] == "#ffff00", 'The color is right');
	ok(d.getElementsByTagName('p')[0].childNodes[1].style['backgroundColor'] == 'rgb(255, 0, 0)'
		|| d.getElementsByTagName('p')[0].childNodes[1].style['backgroundColor'] == "#ff0000", 'The background-color is right');
	if(ua.browser.gecko || ua.browser.opera){
		equals(d.getElementsByTagName('p')[0].childNodes[1].childNodes[0].data, 'hello', 'The text is right');
	}
	else{
		equals(d.getElementsByTagName('p')[0].childNodes[1].childNodes[1].data, 'hello', 'The text is right');
	}
} );