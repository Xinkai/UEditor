test("PUBLICGE-879", function() {
	stop();
	expect(2);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p><a href="http://ueditor.baidu.com/">UEditor</a><a href="http://www.baidu.com" target="_self">Baidu</a></p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			var button_unlink = te.getButtonByTitle('editor', '祛除链接');
			var button_selectall= te.getButtonByTitle('editor', '全选');
				 
			$(button_selectall).click();
			ok(button_unlink.getDom().childNodes[0].className.indexOf('edui-state-disabled') == -1, 
    		"The unlink button is enabled.");
			$(button_unlink).click();
			ok(editor.getContent().indexOf('<a') == -1, 'The links are deleted');
		    start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-859", function() {
	expect(2);
	var initialContent = '<p>你好<a href="http://www.baidu.com/" target="_self">啊</a></p>';
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: initialContent,
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_source= te.getButtonByTitle('editor1', '源代码');
		 
	$(button_source).click();
	equals(editor.getContent(), initialContent, "The source code is not changed");
	$(button_source).click();
	equals(editor.getContent(), initialContent, "The source code is not changed");
} );

test("PUBLICGE-827", function() {
	expect(5);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p><a href="http://www.baidu.com" target="_self">hello</a>world</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_bold= te.getButtonByTitle('editor2', '加粗');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild,2).setEnd(d.getElementsByTagName('p')[0].firstChild.nextSibling,1).select();
	$(button_bold).click();
	equals(d.getElementsByTagName('a').length, 1, "There is only 1 a tag");
	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), 'a', "The link exists");
	equals(d.getElementsByTagName('p')[0].firstChild.childNodes[0].data, 'he', "The link contains 'he'");
	equals(d.getElementsByTagName('p')[0].firstChild.childNodes[1].tagName.toLowerCase(), 'strong', "The 'strong' tag is created");
	equals(d.getElementsByTagName('p')[0].firstChild.childNodes[1].innerHTML, 'llo', "The 'llo' exists in the a and strong tag");
} );

test("PUBLICGE-800", function() {
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p><a href="http://www.baidu.com" target="_self">hello</a></p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_forecolor= te.getButtonByTitle('editor3', '字体颜色');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	button_forecolor.popup.content.onpickcolor('pickcolor','#ff0000');
	button_forecolor.popup.content.onpicknocolor('picknocolor');
	ok(editor.getContent().indexOf('color') == -1, "The color is cleared");
} );

test("PUBLICGE-799", function() {
	expect(5);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor4',
		initialContent: '<p><a href="http://www.baidu.com" target="_self">hello</a></p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_bold= te.getButtonByTitle('editor4', '加粗');
	var button_forecolor= te.getButtonByTitle('editor4', '字体颜色');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	$(button_bold).click();
	button_forecolor.popup.content.onpickcolor('pickcolor','#ff0000');
	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), 'a', 'The a tag exists');
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.tagName.toLowerCase(), 'strong', 'The strong tag exists');
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.tagName.toLowerCase(), 'span', 'The span tag exists');
	ok(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.style['color'] == 'rgb(255, 0, 0)'
		|| d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.style['color'] == '#ff0000', 'The color is set');
	equals(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild.innerHTML, 'hello', "The innerHTML is right");
} );

test("PUBLICGE-792", function() {
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor5',
		initialContent: '<p><a href="http://www.baidu.com" target="_self">www.baidu.com</a></p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_unlink= te.getButtonByTitle('editor5', '祛除链接');
	var button_fontsize= te.getButtonByTitle('editor5', '字号');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	$(button_fontsize.items[7]).click();
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild.firstChild, 5).collapse(true).select();
	$(button_unlink).click();
	ok(editor.getContent().indexOf('<a ') == -1, "The link is deleted");
	equals(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), 'span', 'The span tag exists');
	equals(d.getElementsByTagName('p')[0].firstChild.style['fontSize'], '24pt', 'The font-size is 24pt');
} );

test("PUBLICGE-779", function() {
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor6',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	editor.execCommand('insertTable',{
		cellpadding:0,
		cellspacing:0,
		width:100,
		height:100,
		cellborder:1,
		border:1,
		numRows:2,
		numCols:2
	});
	editor.document.getElementsByTagName('td')[1].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[2].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[3].innerHTML = 'hello';
		 
	range.selectNode(d.getElementsByTagName('table')[0].firstChild).select();
	editor.execCommand('link', {href : 'http://www.baidu.com'});
	range.selectNode(d.getElementsByTagName('table')[0].firstChild).select();
	editor.execCommand('link', {href : 'http://www.sina.com'});
	
	equals(d.getElementsByTagName('td')[0].firstChild.tagName.toLowerCase(), 'a', 'There is tag "a" in the first td');
	equals(d.getElementsByTagName('td')[0].firstChild.href, 'http://www.sina.com', 'The href is right');
	equals(d.getElementsByTagName('td')[0].firstChild.innerHTML, 'http://www.sina.com', 'The text is right');
} );

test("PUBLICGE-531", function() {
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor7',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_forecolor= te.getButtonByTitle('editor7', '字体颜色');
		 
	var range = new baidu.editor.dom.Range(editor.document);
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	editor.execCommand('link', {href : 'http://www.baidu.com'});
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	button_forecolor.popup.content.onpickcolor('pickcolor','#ff0000');

	ok(d.getElementsByTagName('a')[0].style['color'] == 'rgb(255, 0, 0)'
		|| d.getElementsByTagName('a')[0].style['color'] == '#ff0000', 'The color of the link is set');
	ok(d.getElementsByTagName('a')[0].firstChild.style['color'] == 'rgb(255, 0, 0)'
		|| d.getElementsByTagName('a')[0].firstChild.style['color'] == '#ff0000', 'The color of the link is set');
} );

test( "PUBLICGE-600", function() {
	expect(2);
    var editor = new baidu.editor.ui.Editor({
        id: 'editor8',
        minFrameHeight: 120
    });

    editor.render(document.body.appendChild(document.createElement('div')));
    editor.focus();
    d = editor.document;
    var content = editor.getContent();
    
    editor.execCommand('link', {
    	href : 'http://www.baidu.com'
    });
    editor.execCommand('inserthtml', '<img style="border:0px"  src="http://img.baidu.com/hi/jx2/j_0001.gif">');
   
    equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'a', "The img is not in the link");
    if(ua.browser.gecko || ua.browser.opera)
    	equals(d.getElementsByTagName('p')[0].childNodes[1].tagName.toLowerCase(), 'img', "The img is not in the link");
    else
    	equals(d.getElementsByTagName('p')[0].childNodes[2].tagName.toLowerCase(), 'img', "The img is not in the link");
});

test( "PUBLICGE-534", function() {
	expect(4);
    var editor = new baidu.editor.ui.Editor({
        id: 'editor8',
        minFrameHeight: 120
    });

    editor.render(document.body.appendChild(document.createElement('div')));
    editor.focus();
    d = editor.document;
    var content = editor.getContent();
    
    editor.execCommand('link', {
    	href : 'http://www.baidu.com'
    });
    editor.execCommand('inserthtml', '&nbsp;');
    editor.execCommand('inserthtml', 'hello');
   
    equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'a', "The link is right");
    equals(d.getElementsByTagName('p')[0].childNodes[0].innerHTML, 'http://www.baidu.com', "The textof the link is right");
    if(ua.browser.gecko){
        equals(d.getElementsByTagName('p')[0].childNodes[1].data.length, 1, 'The " " is not in link');
        equals(d.getElementsByTagName('p')[0].childNodes[2].data, "hello", 'The "hello" is not in link');
    }
    else{
        equals(d.getElementsByTagName('p')[0].childNodes[2].data.length, 1, 'The " " is not in link');
        equals(d.getElementsByTagName('p')[0].childNodes[3].data, "hello", 'The "hello" is not in link');	
    }
});
