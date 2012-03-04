test("PUBLICGE-512", function() {
	stop();
	expect(2);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p>ff</p>',
		        minFrameHeight: 120
			});
		
			var div = document.body.appendChild(document.createElement('div'));
			editor.render(div);
			editor.focus();
			d = editor.document;
				 
			var button_bold= te.getButtonByTitle('editor', '加粗');
			
			var range = new baidu.editor.dom.Range(editor.document);
			range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
			$(button_bold).click();
			range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 1).collapse(true).select();
			$(button_bold).click();
			
			equals(d.getElementsByTagName('p')[0].childNodes.length, 3, "There is a placeholder");
			ok(d.getElementsByTagName('p')[0].childNodes[1].data 
					&& d.getElementsByTagName('p')[0].childNodes[1].data.length == 1
					, "There is a placeholder");
			
			te.obj.push(editor);
			te.dom.push(div);
			setTimeout(function(){
				start();
			}, 300);
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-573", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>你好</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_bold= te.getButtonByTitle('editor1', '加粗');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	$(button_bold).click();
	
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 2).collapse(true).select();
	$(editor.document.body).keyup(function(){
		editor.setContent('<p><strong>你好</strong></p><p><strong><br /></strong></p>');
	});
    ua.keydown(editor.document.body, {
		keyCode : 13
	});
    setTimeout(function(){
    	ua.keyup(editor.document.body);
    	range.selectNode(d.getElementsByTagName('p')[1].firstChild).select();
    	ua.mouseup(editor.document.body);
    	
    	ok(button_bold.getDom().childNodes[0].className.indexOf('edui-state-checked') > -1
    			, "The bold button is highlight");

    	te.obj.push(editor);
    	te.dom.push(div);
    	setTimeout(function(){
    		start();
    	}, 300);
    }, 500);
} );

test("PUBLICGE-577", function() {
	stop();
	expect(6);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: 'outter<table><tr><td>text</td></tr></table>outter',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_bold= te.getButtonByTitle('editor2', '加粗');
	var button_selectall= te.getButtonByTitle('editor2', '全选');
	
	$(button_selectall).click();
	$(button_bold).click();
	
	equals(d.body.childNodes[0].firstChild.tagName.toLowerCase(), 'strong', 'The text is strong');
	equals(d.body.childNodes[0].firstChild.firstChild.data, 'outter', 'The text is right');
	equals(d.getElementsByTagName('td')[0].firstChild.tagName.toLowerCase(), 'strong', 'The text in table is strong');
	equals(d.getElementsByTagName('td')[0].firstChild.firstChild.data, 'text', 'The text in table is right');
	equals(d.body.childNodes[2].firstChild.tagName.toLowerCase(), 'strong', 'The text is strong');
	equals(d.body.childNodes[2].firstChild.firstChild.data, 'outter', 'The text is right');
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-674", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p>newText</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_bold= te.getButtonByTitle('editor3', '加粗');
	var button_selectall= te.getButtonByTitle('editor3', '全选');
	
	$(button_selectall).click();
	$(button_bold).click();
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 0).collapse(true).select();
	ok(button_bold.getDom().childNodes[0].className.indexOf('edui-state-checked') > -1, 
	"The bold button is checked.");
	
	$(button_bold).click();

	ok(button_bold.getDom().childNodes[0].className.indexOf('edui-state-checked') == -1, 
	"The bold button is not checked.");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-673", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor4',
		initialContent: '<p>newText</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_bold= te.getButtonByTitle('editor4', '加粗');
	var button_selectall= te.getButtonByTitle('editor4', '全选');
	
	$(button_selectall).click();
	$(button_bold).click();
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild, 3).collapse(true).select();
	
	$(button_bold).click();
	editor.execCommand('inserthtml', 'hello');
	if(ua.browser.gecko){
		equals(d.getElementsByTagName('p')[0].childNodes[1].data, "hello", 'The "hello" is not strong');
	}
	else{
		equals(d.getElementsByTagName('p')[0].childNodes[2].data, "hello", 'The "hello" is not strong');
	}
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-741", function() {
	stop();
	expect(4);
	var initialContent = '<p><span style="WIDOWS: 2; TEXT-TRANSFORM: none; TEXT-INDENT: 0px; BORDER-COLLAPSE: separate; FONT: medium Simsun; WHITE-SPACE: normal; ORPHANS: 2; LETTER-SPACING: normal; COLOR: rgb(0,0,0); WORD-SPACING: 0px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; -webkit-text-decorations-in-effect: none; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px" class="Apple-style-span"><span style="LINE-HEIGHT: 18px; FONT-FAMILY: Arial, Helvetica, sans-serif; COLOR: rgb(102,102,102); FONT-SIZE: 12px" class="Apple-style-span"><span style="font-size:16px;;;">1.在编辑器粘贴来自外部的文本，该文本有若干段，如：<br />hi，你好吗？你叫什么名字？你在干嘛啊 </span></span></span></p>';
	var editor = new baidu.editor.ui.Editor({
		id: 'editor5',
		initialContent: initialContent,
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_bold= te.getButtonByTitle('editor5', '加粗');
	var button_italic= te.getButtonByTitle('editor5', '斜体');
	var button_underline= te.getButtonByTitle('editor5', '下划线');
	var button_selectall= te.getButtonByTitle('editor5', '全选');
	
	$(button_selectall).click();
	$(button_bold).click();
	$(button_italic).click();
	$(button_underline).click();
	
	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), 'em', "The italic");
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.tagName.toLowerCase(), 'strong', "The strong");
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[0].style['textDecoration'], 'underline', "The underline");
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[2].style['textDecoration'], 'underline', "The underline");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-870", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor6',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var button_bold= te.getButtonByTitle('editor6', '加粗');
	
	$(button_bold).click();
	editor.execCommand('inserthtml', 'hello');
	$(button_bold).click();
	editor.execCommand('inserthtml', 'world');
	
	equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'strong', "The strong");
	if(ua.browser.gecko)
		equals(d.getElementsByTagName('p')[0].childNodes[1].data, 'world', "The text");
	else
		equals(d.getElementsByTagName('p')[0].childNodes[2].data, 'world', "The text");
	ok(button_bold.getDom().childNodes[0].className.indexOf('edui-state-checked') == -1, "The bold button is not checked.");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );