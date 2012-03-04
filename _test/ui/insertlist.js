test("PUBLICGE-953", function() {
	stop();
	expect(1);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<h1>hello</h1>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			var button_insertorderedlist = te.getButtonByTitle('editor', '有序列表');
			
			var range = new baidu.editor.dom.Range( editor.document );
			range.selectNode(d.getElementsByTagName('h1')[0], 0).select();
			$(button_insertorderedlist.items[0]).click();
			ok(editor.document.getElementsByTagName('ol')[0] && 
					editor.document.getElementsByTagName('ol')[0].style['listStyleType'] == 'decimal', 'The orderedlist is added to a heading');
		    start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-836", function() {
	expect(5);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>first</p><p>second</p><p>third</p><p>forth</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_insertorderedlist = te.getButtonByTitle('editor1', '有序列表');
	var button_selectall = te.getButtonByTitle('editor1', '全选');
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 0).setEnd(d.getElementsByTagName('p')[1].firstChild, 6).select();
	$(button_insertorderedlist.items[0]).click();
	$(button_selectall).click();
	$(button_insertorderedlist.items[1]).click();
	ok(d.getElementsByTagName('ol')[0].style.cssText.indexOf('lower-alpha') > -1, 'The list is a "a,b,c..." list');
	ok(d.getElementsByTagName('ol')[0].childNodes[0].tagName.toLowerCase() == 'li'
			&& d.getElementsByTagName('ol')[0].childNodes[0].firstChild.data == 'first'
			, 'The first li is right');
	ok(d.getElementsByTagName('ol')[0].childNodes[1].tagName.toLowerCase() == 'li' 
			&& d.getElementsByTagName('ol')[0].childNodes[1].firstChild.data == 'second'
			, 'The second li is right');
	ok(d.getElementsByTagName('ol')[0].childNodes[2].tagName.toLowerCase() == 'li' 
			&& d.getElementsByTagName('ol')[0].childNodes[2].firstChild.data == 'third'
			, 'The third li is right');
	ok(d.getElementsByTagName('ol')[0].childNodes[3].tagName.toLowerCase() == 'li' 
			&& d.getElementsByTagName('ol')[0].childNodes[3].firstChild.data == 'forth'
			, 'The forth li is right');
} );

test("PUBLICGE-582", function() {
	stop();
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p>new</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
		 
	var button_insertorderedlist = te.getButtonByTitle('editor2', '有序列表');
	
	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 2).collapse(true).select();
	$(editor.document.body).keyup(function(){
		editor.setContent('<p>new</p><p><br /></p>');
	});
    ua.keydown(editor.document.body, {
		keyCode : 13
	});
    setTimeout(function(){
    	ua.keyup(editor.document.body);
    	range.selectNode(d.getElementsByTagName('p')[1].firstChild).select();
    	ua.mouseup(editor.document.body);
    	
    	$(button_insertorderedlist.items[0]).click();
    	
    	equals(d.body.childNodes[0].tagName.toLowerCase(), 'p', 'The first paragragh');
    	equals(d.body.childNodes[1].tagName.toLowerCase(), 'ol', 'The ol');
    	equals(d.body.childNodes[1].childNodes[0].tagName.toLowerCase(), 'li', 'The li');
    	if(!ua.browser.ie && !ua.browser.gecko){
    		ok(d.body.childNodes[1].firstChild.childNodes[0].data 
        			&& d.body.childNodes[1].firstChild.childNodes[0].data == "​"
        				, "The placeholder");
    		equals(d.body.childNodes[1].firstChild.childNodes[1].tagName.toLowerCase(), 'br', 'The br');
    	}
    	if(ua.browser.gecko){
    		equals(d.body.childNodes[1].firstChild.childNodes[0].tagName.toLowerCase(), 'br', 'The br');
    	}
    	start();
    }, 500);
} );

test("PUBLICGE-598", function() {
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
		 
	var button_insertorderedlist = te.getButtonByTitle('editor3', '有序列表');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();
	$(button_insertorderedlist.items[0]).click();
	
	equals(d.getElementsByTagName('td')[0].firstChild.tagName.toLowerCase(), 'ol', 'The orderedlist is inserted');
	equals(d.getElementsByTagName('td')[0].firstChild.style['listStyleType'], 'decimal', 'The orderedlist is inserted');
	if(ua.browser.chrome)
		equals(d.getElementsByTagName('td')[0].firstChild.firstChild.innerHTML, '​<br>', "The <br> exsits");
} );