test("PUBLICGE-936", function() {
	stop();
	expect(2);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
		        minFrameHeight: 120
			});
		
			var div = document.body.appendChild(document.createElement('div'));
			editor.render(div);
			editor.focus();
			d = editor.document;
			var button_source = te.getButtonByTitle('editor', '源代码');
				    
			editor.setContent('<p>hello</p><p>hello</p>');
			$(button_source).click();
			equals(editor.getContent(), "<p>hello</p><p>hello</p>", "The html source code is right");
			$(button_source).click();
			$(button_source).click();
			equals(editor.getContent(), "<p>hello</p><p>hello</p>", "The html source code is right");

			te.obj.push(editor);
			te.dom.push(div);
			setTimeout(function(){
				start();
			}, 300);
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-666", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<a href="http://www.baidu.com"><span style="color: rgb(0, 204, 34)">aa</span></a><p><span style="color: rgb(0, 204, 34)">pp</span></p><span style="font-size: 24pt">ss</span>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source = te.getButtonByTitle('editor1', '源代码');
	var button_selectall = te.getButtonByTitle('editor1', '全选');
	var button_forecolor = te.getButtonByTitle('editor1', '字体颜色');
	var button_fontsize = te.getButtonByTitle('editor1', '字号');
	
	$(button_selectall).click();
	$(button_fontsize.items[4]).click();
	button_forecolor.popup.content.onpickcolor('pickcolor','#ff0000');
	
	var content = editor.getContent();
	$(button_source).click();
	equals(editor.getContent().replace(/\s/g, ""), content.replace(/\s/g, ""), "The content isn't changed");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-682", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source = te.getButtonByTitle('editor2', '源代码');
	var button_selectall = te.getButtonByTitle('editor2', '全选');
	var button_underline = te.getButtonByTitle('editor2', '下划线');
	
	$(button_selectall).click();
	$(button_underline).click();
	
	$(button_source).click();
	$(button_source).click();
	
	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), 'span', "The tag is span");
	equals(d.getElementsByTagName('p')[0].firstChild.style['textDecoration'], 'underline', "The underline exists");
	if(ua.browser['gecko'])
		equals(d.getElementsByTagName('p')[0].firstChild.childNodes[1].data, 'new', "The text is right");
	else
		equals(d.getElementsByTagName('p')[0].firstChild.childNodes[0].data, 'new', "The text is right");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-712", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source = te.getButtonByTitle('editor3', '源代码');
	
	$(button_source).click();
	
    ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 65
	});

    var flag = 0;
	var buttons = window.$EDITORUI.editor3.toolbars[0].items;
	
    for (var i = 0 ; i < buttons.length; i++){
    	if(buttons[i].getDom().className.indexOf('fullscreen') == -1 
    			&& buttons[i].getDom().className.indexOf('source') == -1 
    			    && buttons[i].getDom().className.indexOf('separator') == -1){//不是全屏和源代码
    		if(buttons[i].getDom().firstChild.className.indexOf('edui-state-disabled') == -1)
    			flag = 1;
    	}
	}
    equals(flag, 0, "The buttons are all disabled");
    
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-615", function() {
	stop();
	expect(4);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor4',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source = te.getButtonByTitle('editor4', '源代码');
	var button_blockquote = te.getButtonByTitle('editor4', '引用');
	
	$(button_blockquote).click();
	editor.execCommand('inserthtml', 'new');

	$(button_source).click();
	$(button_source).click();
	
	editor.execCommand('inserthtml', 'world');
	
	equals(d.body.firstChild.tagName.toLowerCase(), 'blockquote', 'The blockquote is set');
	equals(d.body.firstChild.firstChild.childNodes[0].data, 'world', 'The "world" is blockquote');
	if(ua.browser.gecko){
		equals(d.body.firstChild.firstChild.childNodes[2].data, 'new', 'The "new" is blockquote');
	}
	else{
		equals(d.body.firstChild.firstChild.childNodes[1].data, 'new', 'The "new" is blockquote');
	}
	ok(button_blockquote.getDom().firstChild.className.indexOf('edui-state-checked') > -1, 'The button is highliaght');
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-700", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor5',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_bold= te.getButtonByTitle('editor5', '加粗');
	var button_italic= te.getButtonByTitle('editor5', '斜体');
	var button_underline= te.getButtonByTitle('editor5', '下划线');
	var button_source= te.getButtonByTitle('editor5', '源代码');
	
	$(button_bold).click();
	$(button_italic).click();
	$(button_underline).click();
	
	editor.execCommand('inserthtml', 'first');
	
	editor.execCommand('insertvideo', {
		height: "100",
		width: "200",
		url: "http://localhost/ueditor/data/test_flash.swf",
		style: "float: left"
	});
	editor.execCommand('inserthtml', 'second');
	
	$(button_source).click();
	ok(!document.getElementById('editor5_bottombar').firstChild, "The source view");
	$(button_source).click();
	ok(document.getElementById('editor5_bottombar').firstChild, "The editor view");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-768", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor6',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source= te.getButtonByTitle('editor6', '源代码');

	editor.execCommand('insertvideo', {
		height: "100",
		width: "200",
		url: "http://localhost/ueditor/data/test_flash.swf",
		style: "float: left"
	});
	editor.execCommand('inserthtml', 'second');
	
	$(button_source).click();
	ok(!document.getElementById('editor6_bottombar').firstChild, "The source view");
	$(button_source).click();
	ok(document.getElementById('editor6_bottombar').firstChild, "The editor view");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-1002", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor7',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source = te.getButtonByTitle('editor7', '源代码');
	var button_horizontal = te.getButtonByTitle('editor7', '分隔线');

	editor.execCommand('cleardoc');
	$(button_horizontal).click();
	$(button_source).click();
	$(button_source).click();
	
	equals(d.body.childNodes[0].tagName.toLowerCase(), 'hr', "The hr");
	equals(d.body.childNodes[1].tagName.toLowerCase(), 'p', "The p");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-1064 PUBLICGE-1087", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor8',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_source= te.getButtonByTitle('editor8', '源代码');
	var button_cleardoc= te.getButtonByTitle('editor8', '清空文档');
	var button_emoticon= te.getButtonByTitle('editor8', '表情');
	
	$(button_source).click();
	
	ok(button_cleardoc.getDom().childNodes[0].className.indexOf('edui-state-disabled') > -1, 
			"The button_cleardoc button is hightlight.");
	ok(button_button_emoticon.getDom().childNodes[0].className.indexOf('edui-state-disabled') > -1, 
			"The button_cleardoc button is hightlight.");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );