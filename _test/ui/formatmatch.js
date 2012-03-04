test("PUBLICGE-954", function() {
	stop();
	expect(3);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			var button_formatmatch = te.getButtonByTitle('editor', '格式刷');
				 
			ok(button_formatmatch.getDom().childNodes[0].className.indexOf('edui-state-checked') == -1, 
    		"The formatmatch button is not checked.");
			$(button_formatmatch).click();
			ok(button_formatmatch.getDom().childNodes[0].className.indexOf('edui-state-checked') > -1, 
    		"The formatmatch button is checked.");
			$(button_formatmatch).click();
			ok(button_formatmatch.getDom().childNodes[0].className.indexOf('edui-state-checked') == -1, 
    		"The formatmatch button is not checked.");
		    start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-969", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p><strong>hello</strong></p><p>hello</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor1', '格式刷');
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0].firstChild,1).collapse(true).select();
	$(button_formatmatch).click();
	ok(button_formatmatch.getDom().childNodes[0].className.indexOf('edui-state-checked') > -1, 
			"The formatmatch button is checked.");

    range.setStart(d.getElementsByTagName('p')[1].firstChild,0).collapse(true).select();
	range.selectNode(
            d.getElementsByTagName( 'p' )[1], 0 )
            .select();
	ua.mouseup(editor.document.body);
	setTimeout(function(){
		ok(button_formatmatch.getDom().childNodes[0].className.indexOf('edui-state-checked') == -1, 
		"The formatmatch button is not checked.");		
		equals(editor.document.getElementsByTagName('p')[1].firstChild.tagName.toLowerCase(), "strong", "The format is added");
		start();
	}, 500);
} );

test("PUBLICGE-971", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p><strong>hello</strong></p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor2', '格式刷');
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0].firstChild,1).collapse(true).select();
	$(button_formatmatch).click();

	range.selectNode(
            d.getElementsByTagName( 'p' )[0], 0 )
            .select();
	ua.mouseup(editor.document.body);
	setTimeout(function(){
		equals(editor.document.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase(), "strong", "The format is added");
		start();
	}, 500);
} );

test("PUBLICGE-973", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p><strong>first</strong></p><p><em>second</em></p><p>third</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor3', '格式刷');
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0].firstChild,1).collapse(true).select();
	$(button_formatmatch).click();

	range.selectNode(
            d.getElementsByTagName( 'p' )[2], 0 )
            .select();
	ua.mouseup(editor.document.body);
	setTimeout(function(){
		equals(editor.document.getElementsByTagName('p')[2].firstChild.tagName.toLowerCase(), "strong", "The format 'strong' is added");
		
		range.setStart(d.getElementsByTagName('p')[1].firstChild,1).collapse(true).select();
		$(button_formatmatch).click();

		range.selectNode(
	            d.getElementsByTagName( 'p' )[2], 0 )
	            .select();
		ua.mouseup(editor.document.body);
		setTimeout(function(){
			ok(editor.document.getElementsByTagName('p')[2].firstChild.tagName.toLowerCase().indexOf("em") > -1, "The format 'em' is added");
			start();
		}, 500);
	}, 500);
} );

test("PUBLICGE-956", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor4',
		initialContent: '<p><strong>hello</strong></p><p></p>',
        minFrameHeight: 120
	});
	
	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor4', '格式刷');
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[1],0).collapse(true).select();
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
	editor.document.getElementsByTagName('td')[0].innerHTML = 'hello';
	
	range.setStart(d.getElementsByTagName('p')[0].firstChild,0).collapse(true).select();
	$(button_formatmatch).click();
	range.selectNode(d.getElementsByTagName( 'table' )[0], 0 ).select();
	ua.mouseup(editor.document.body);
	setTimeout(function(){
		equals(editor.document.getElementsByTagName('td')[0].firstChild.tagName.toLowerCase(), "strong", "The format 'strong' is added");
		start();
	}, 500);
} );

test("PUBLICGE-942", function() {
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor5',
		initialContent: '<p><strong>hello</strong></p><p><a href="http://ueditor.baidu.com/">UEditor</a></p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor5', '格式刷');
	var button_undo = te.getButtonByTitle('editor5', '撤销');
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0].firstChild,1).collapse(true).select();
	$(button_formatmatch).click();

	range.setStart(d.getElementsByTagName('p')[1].firstChild.firstChild,1).collapse(true).select();
	ua.mouseup(editor.document.body);
	$(button_undo).click();
	ok(!d.getElementsByTagName('p')[1].firstChild.nextSibling, "No tag is inserted");
	ok(!d.getElementsByTagName('p')[1].firstChild.nextSibling 
			&& d.getElementsByTagName('p')[1].firstChild.innerHTML.indexOf('match') == -1,
			"The link text isn't changed");
} );

test("PUBLICGE-941", function() {
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor6',
		initialContent: '<p><span style="color: rgb(255, 0, 0); ">hi你好吗</span></p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor6', '格式刷');
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild,0).setEnd(d.getElementsByTagName('p')[0].firstChild.firstChild,2).select();
	$(button_formatmatch).click();
	
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild,4).collapse(true).select();
	ua.mouseup(editor.document.body);

	ok(d.getElementsByTagName('p')[0].firstChild.tagName.toLowerCase() == 'span' 
		&& d.getElementsByTagName('p')[0].firstChild.innerHTML == 'hi你好'
			, "The format of 'hi你好' is not changed");
	ok(d.getElementsByTagName('p')[0].firstChild.nextSibling.tagName.toLowerCase() == 'span' 
		&& d.getElementsByTagName('p')[0].firstChild.nextSibling.innerHTML == "​"
			&& d.getElementsByTagName('p')[0].firstChild.nextSibling.style['color'] == 'rgb(255, 0, 0)'
			, "The new span is created");
	ok(d.getElementsByTagName('p')[0].firstChild.nextSibling.nextSibling.tagName.toLowerCase() == 'span' 
		&& d.getElementsByTagName('p')[0].firstChild.nextSibling.nextSibling.innerHTML == '吗'
			, "The format of 'hi你好' is not changed");
} );

test("PUBLICGE-938", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor7',
		initialContent: '<p><span style="background-color: rgb(255, 255, 0); ">hello</span></p><p></p>',
        minFrameHeight: 120
	});
	
	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor7', '格式刷');
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[1],0).collapse(true).select();
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
	
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	ua.mouseup(editor.document.body);
	$(button_formatmatch).click();
	range.selectNode(d.getElementsByTagName( 'table' )[0], 0 ).select();
	ua.mouseup(editor.document.body);
	setTimeout(function(){
		ok(editor.document.body.innerHTML.indexOf('match') == -1, "No 'match' is inserted");
		start();
	}, 500);
} );

test("PUBLICGE-918", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor8',
		initialContent: '<p>你好啊</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor8', '格式刷');
	var button_underline = te.getButtonByTitle('editor8', '下划线');
	var button_fontfamily = te.getButtonByTitle('editor8', '字体');
	var label = button_fontfamily.label;
		 
	var range = new baidu.editor.dom.Range( editor.document );
	range.selectNode(d.getElementsByTagName('p')[0].firstChild,0).select();
	$(button_underline).click();
	
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild,0).setEnd(d.getElementsByTagName('p')[0].firstChild.firstChild,1).select();
	$(button_fontfamily.items[1]).click();
	
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild.nextSibling,1).setEnd(d.getElementsByTagName('p')[0].firstChild.firstChild.nextSibling,2).select();
	ua.mouseup(editor.document.body);
	setTimeout(function(){
		equals(button_fontfamily.label, label, 'The lable of the fontfamily is right');
		start();
	}, 500);
} );


test("PUBLICGE-943", function() {
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor9',
		initialContent: '<p><br/></p>',
        minFrameHeight: 120
	});
	
	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_formatmatch = te.getButtonByTitle('editor9', '格式刷');
	var button_superscript = te.getButtonByTitle('editor9', '上标');
		 
	var range = new baidu.editor.dom.Range( editor.document );
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
	editor.document.getElementsByTagName('td')[0].innerHTML = 'hello';

	range.selectNode(d.getElementsByTagName('table')[0], 0).select();
	$(button_superscript).click();
	equals(d.getElementsByTagName('td')[0].firstChild.tagName.toLowerCase(), 'sup', "The text in table becomes superscript");
	$(button_superscript).click();
	ok(!d.getElementsByTagName('td')[0].firstChild.tagName, "The text in table is not superscript");
} );
