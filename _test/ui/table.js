test("PUBLICGE-879", function() {
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
			var button_insertparagraphbeforetable = te.getButtonByTitle('editor', '表格前插行');
			
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
			
			range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();
			$(button_insertparagraphbeforetable).click();
			range.selectNode(d.getElementsByTagName( 'table' )[0], 0 ).select();
			ua.mouseup(editor.document.body);
			
			ok(d.body.firstChild.tagName.toLowerCase() == 'p', 'There is an empty line');
			if(ua.browser.ie)
				ok(d.body.firstChild.innerHTML == "​", 'There is an empty line');
			else
				equals(d.body.firstChild.firstChild.nextSibling.tagName.toLowerCase(), 'br', 'There is an empty line');
			te.obj.push(editor);
			te.dom.push(div);
			setTimeout(function(){
				start();
			}, 300);
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-778", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_insertparagraphbeforetable = te.getButtonByTitle('editor1', '表格前插行');
	
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
	
	range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();
	$(button_insertparagraphbeforetable).click();
	
	ok(d.body.firstChild.tagName.toLowerCase() == 'p', 'There is an empty line');
	if(ua.browser.ie)
		ok(d.body.firstChild.innerHTML == "​", 'There is an empty line');
	else
		equals(d.body.firstChild.firstChild.nextSibling.tagName.toLowerCase(), 'br', 'There is an empty line');
    ok(d.body.firstChild.nextSibling.tagName.toLowerCase() == 'table', 'The table under the empty line');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-517", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
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
	ok(d.body.childNodes[0].tagName.toLowerCase() == 'table', 'There is an table');
	ok(d.body.childNodes[1].tagName.toLowerCase() == 'p', 'There is an empty line');
	if(ua.browser.ie)
		equals(d.body.childNodes[1].innerHTML, "", 'There is an empty line');
	else
		if(ua.browser.gecko || ua.browser.opera)
			equals(d.body.childNodes[1].firstChild.data.length, 1, 'There is an empty line');
		else
			equals(d.body.childNodes[1].firstChild.tagName.toLowerCase(), 'br', 'There is an empty line');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-565", function() {
	stop();
	(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
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
	ok(d.body.childNodes[0].tagName.toLowerCase() == 'table', 'The first tag is an table');
	ok(d.body.childNodes[1].tagName.toLowerCase() == 'p', 'There second tag is an empty line');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-593", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor5',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor5', '合并多个单元格');
	
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

	ua.mousedown(d.getElementsByTagName('td')[0]);
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();
	ua.mouseup(d.getElementsByTagName('td')[0]);

	ok(button_mergecells.getDom().childNodes[0].className.indexOf('edui-state-disabled') > -1
			, "The button_mergecells button is disabled");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-594", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor6',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor6', '合并多个单元格');
	var button_deletecol = te.getButtonByTitle('editor6', '删除列');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	
	$(button_mergecells).click();
	$(button_deletecol).click();
	
	ok(editor.getContent().indexOf('table') == -1, "The table is deleted");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-595", function() {
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
	var button_mergecells = te.getButtonByTitle('editor7', '合并多个单元格');
	
	editor.execCommand('insertTable',{
		numRows:3,
		numCols:3
	});
	
	editor.document.getElementsByTagName('td')[0].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[1].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[3].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[4].innerHTML = 'hello';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[4],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[4]
	});
	ua.mouseup(d.getElementsByTagName('td')[4]);
	
	$(button_mergecells).click();
	ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
	
	$(button_mergecells).click();
	equals(d.getElementsByTagName('td')[0].rowSpan, 2, "The cells are merged");
	equals(d.getElementsByTagName('td')[0].colSpan, 2, "The cells are merged");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );


test("PUBLICGE-597", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor8',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor8', '合并多个单元格');
	var button_splittocells = te.getButtonByTitle('editor8', '完全拆分单元格');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[2],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[2]
	});
	ua.mouseup(d.getElementsByTagName('td')[2]);
	
	$(button_mergecells).click();
	$(button_splittocells).click();
	
	ok(button_mergecells.getDom().childNodes[0].className.indexOf('edui-state-disabled') > -1
	, "The button_mergecells button is disabled");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-603", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor9',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[4],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[4]
	});
	ua.mouseup(d.getElementsByTagName('td')[4]);
	
	editor.execCommand('inserthtml', '<img  src=http://www.feizl.com/upload2007/2011_05/11053122527522.jpg width=100 height=100 />');
	
	equals(d.getElementsByTagName('tbody')[0].childNodes.length, 4, '4 trs');
	equals(d.getElementsByTagName('tr')[0].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('td')[0].firstChild.tagName.toLowerCase(), 'img', 'The image is inserted to the first td');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-622", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor10',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor10', '合并多个单元格');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[15],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[15]
	});
	ua.mouseup(d.getElementsByTagName('td')[15]);
	$(button_mergecells).click();
	
	ua.keydown(editor.document.body, {
		ctrlKey : true,
		keyCode : 90
	});
	 
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[15],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[15]
	});
	ua.mouseup(d.getElementsByTagName('td')[15]);
	$(button_mergecells).click();
	
	equals(d.getElementsByTagName('td')[0].rowSpan, 4, "The cells are merged");
	equals(d.getElementsByTagName('td')[0].colSpan, 4, "The cells are merged");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-623", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor11',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor11', '合并多个单元格');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	editor.document.getElementsByTagName('td')[0].innerHTML = '你好好xx';
	editor.document.getElementsByTagName('td')[3].innerHTML = '谢谢你yy';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	$(button_mergecells).click();
	equals(d.getElementsByTagName('td')[0].innerHTML.toLowerCase(), "​你好好xx<br>谢谢你yy", 'The text is right');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-628", function() {
	stop();
	expect(7);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor12',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor12', '合并多个单元格');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	editor.document.getElementsByTagName('td')[0].innerHTML = '你好';
	editor.document.getElementsByTagName('td')[1].innerHTML = '谢谢';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[1],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[1]
	});
	ua.mouseup(d.getElementsByTagName('td')[1]);
	$(button_mergecells).click();
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[5],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[5]
	});
	ua.mouseup(d.getElementsByTagName('td')[5]);
	$(button_mergecells).click();

	equals(d.getElementsByTagName('tbody')[0].childNodes.length, 4, '4 trs');
	equals(d.getElementsByTagName('tr')[0].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[1].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[2].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[3].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('td')[0].colSpan, 2, 'colSpan is right');
	equals(d.getElementsByTagName('td')[0].rowSpan, 2, 'rowSpan is right');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-632", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor13',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor13', '合并多个单元格');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	editor.document.getElementsByTagName('td')[0].innerHTML = '的';
	editor.document.getElementsByTagName('td')[1].innerHTML = '的';
	editor.document.getElementsByTagName('td')[4].innerHTML = '的';
	editor.document.getElementsByTagName('td')[5].innerHTML = '的';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[5],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[5]
	});
	ua.mouseup(d.getElementsByTagName('td')[5]);
	$(button_mergecells).click();
	
	 ua.keydown(editor.document.body, {
		 ctrlKey : true,
	     keyCode : 90
	 });
	
	 ua.mousedown(d.getElementsByTagName('td')[0]);
	 ua.mouseover(d.getElementsByTagName('td')[5],{
		 fromElement : d.getElementsByTagName('td')[0],
		 toElement : d.getElementsByTagName('td')[5]
	 });
	 ua.mouseup(d.getElementsByTagName('td')[5]);
	 $(button_mergecells).click();
	 
	 equals(d.getElementsByTagName('td')[0].innerHTML.toLowerCase(), "​的<br>的<br>的<br>的", "4  的s");
		te.obj.push(editor);
		te.dom.push(div);
		setTimeout(function(){
			start();
		}, 300);
} );

test("PUBLICGE-644", function() {
	stop();
	expect(8);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor14',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_justifycenter = te.getButtonByTitle('editor14', '居中对齐');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	editor.document.getElementsByTagName('td')[0].innerHTML = '的';
	editor.document.getElementsByTagName('td')[1].innerHTML = '的';
	editor.document.getElementsByTagName('td')[2].innerHTML = '的';
	editor.document.getElementsByTagName('td')[3].innerHTML = '的';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	$(button_justifycenter).click();
	 
	equals(d.getElementsByTagName('tbody')[0].childNodes.length, 4, '4 trs');
	equals(d.getElementsByTagName('tr')[0].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[1].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[2].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[3].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('td')[0].style['width'], '125px', 'The width is right');
	equals(d.getElementsByTagName('td')[0].style['height'], '20px', 'The height is right');
	equals(d.getElementsByTagName('td')[0].style['textAlign'], 'center', 'The textAlign is right');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-652", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor15',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_bold = te.getButtonByTitle('editor15', '加粗');
	var button_italic= te.getButtonByTitle('editor15', '斜体');
	var button_underline = te.getButtonByTitle('editor15', '下划线');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	editor.document.getElementsByTagName('td')[0].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[1].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[2].innerHTML = 'hello';
	editor.document.getElementsByTagName('td')[3].innerHTML = 'hello';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	
	$(button_bold).click();
	$(button_italic).click();
	$(button_underline).click();
	
	$(button_bold).click();
	$(button_italic).click();
	$(button_underline).click();
	
	ok(editor.getContent().toLowerCase().indexOf('strong') == -1, "No bold");
	ok(editor.getContent().toLowerCase().indexOf('em') == -1, "No italic");
	ok(editor.getContent().toLowerCase().indexOf('underline') == -1, "No underline");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-677", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor16',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source = te.getButtonByTitle('editor16', '源代码');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	var content = editor.getContent();
	
	$(button_source).click();
	$(button_source).click();
	
	equals(editor.getContent(), content);
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-679", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor17',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor17', '合并多个单元格');
	var button_removeformat = te.getButtonByTitle('editor17', '清除格式');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[1],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[1]
	});
	ua.mouseup(d.getElementsByTagName('td')[1]);
	
	$(button_mergecells).click();
	
	var content = editor.getContent();
	$(button_removeformat).click();
	
	equals(editor.getContent(), content);
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-685", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor18',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor18', '合并多个单元格');
	var button_deleterow = te.getButtonByTitle('editor18', '删除行');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	
	$(button_mergecells).click();
	
	ua.mousedown(d.getElementsByTagName('td')[4]);
	ua.mouseover(d.getElementsByTagName('td')[12],{
		fromElement : d.getElementsByTagName('td')[4],
		toElement : d.getElementsByTagName('td')[12]
	});
	ua.mouseup(d.getElementsByTagName('td')[12]);
	
	$(button_deleterow).click();
	
	var content = editor.getContent(); 
	
	ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
	
	$(button_deleterow).click();
	
	equals(editor.getContent(), content, "The row is deleted");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-687", function() {
	stop();
	expect(8);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor19',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_justifycenter = te.getButtonByTitle('editor19', '居中对齐');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	editor.document.getElementsByTagName('td')[0].innerHTML = '的';
	editor.document.getElementsByTagName('td')[1].innerHTML = '的';
	editor.document.getElementsByTagName('td')[2].innerHTML = '的';
	editor.document.getElementsByTagName('td')[3].innerHTML = '的';
	editor.document.getElementsByTagName('td')[4].innerHTML = '的';
	editor.document.getElementsByTagName('td')[5].innerHTML = '的';
	editor.document.getElementsByTagName('td')[6].innerHTML = '的';
	editor.document.getElementsByTagName('td')[7].innerHTML = '的';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[7],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[7]
	});
	ua.mouseup(d.getElementsByTagName('td')[7]);
	$(button_justifycenter).click();
	 
	equals(d.getElementsByTagName('tbody')[0].childNodes.length, 4, '4 trs');
	equals(d.getElementsByTagName('tr')[0].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[1].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[2].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('tr')[3].childNodes.length, 4, '4 tds');
	equals(d.getElementsByTagName('td')[0].style['width'], '125px', 'The width is right');
	equals(d.getElementsByTagName('td')[0].style['height'], '20px', 'The height is right');
	equals(d.getElementsByTagName('td')[0].style['textAlign'], 'center', 'The textAlign is right');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-708", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor20',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergedown = te.getButtonByTitle('editor20', '下合并单元格');
	var button_deletecol = te.getButtonByTitle('editor20', '删除列');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();

	$(button_mergedown).click();
	$(button_deletecol).click();
	
	ok(button_mergedown.getDom().childNodes[0].className.indexOf('edui-state-disabled') == -1
			, "The mergedown button is highlight.");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-716", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor21',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_deleterow = te.getButtonByTitle('editor21', '删除行');
	
	editor.execCommand('insertTable',{
		numRows:3,
		numCols:3
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[5],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[5]
	});
	ua.mouseup(d.getElementsByTagName('td')[5]);
	
	$(button_deleterow).click();
	
	equals(d.getElementsByTagName('tbody')[0].childNodes.length, 1, '1 tr');
	equals(d.getElementsByTagName('tr')[0].childNodes.length, 3, '3 tds');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-804", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor22',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	editor.execCommand('insertTable',{
		border:2,
		numRows:2,
		numCols:2
	});
	ok(d.getElementsByTagName('table')[0].style['border'].indexOf('2px solid') > -1, "The border is set");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-834", function() {
	stop();
	var editor = new baidu.editor.ui.Editor({
		id: 'editor23',
		initialContent: '<p>hello</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.selectNode(d.getElementsByTagName('p')[0].firstChild,0).select();
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});

	equals(d.body.childNodes[0].tagName.toLowerCase(), 'table', "The table");
	equals(d.body.childNodes[1].tagName.toLowerCase(), 'p', "The p");
	if(!ua.browser['ie'])
		equals(d.body.childNodes[1].firstChild.tagName.toLowerCase(), 'br', 'table', "The br");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-864", function() {
	stop();
	expect(7);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor24',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergecells = te.getButtonByTitle('editor24', '合并多个单元格');
	var button_insertcol = te.getButtonByTitle('editor24', '前插入列');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[1]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[1],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	
	$(button_mergecells).click();
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();
	
	$(button_insertcol).click();
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[4],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[4]
	});
	ua.mouseup(d.getElementsByTagName('td')[4]);
	
	$(button_mergecells).click();
	
	equals(d.getElementsByTagName('tbody')[0].childNodes.length, 4, '4 trs');
	equals(d.getElementsByTagName('tr')[0].childNodes.length, 5, '5 tds');
	equals(d.getElementsByTagName('tr')[1].childNodes.length, 5, '5 tds');
	equals(d.getElementsByTagName('tr')[2].childNodes.length, 5, '5 tds');
	equals(d.getElementsByTagName('tr')[3].childNodes.length, 5, '5 tds');
	equals(d.getElementsByTagName('td')[0].colSpan, 5, 'colspan:');
	equals(d.getElementsByTagName('td')[0].rowSpan, 1, 'rowspan:');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-866", function() {
	stop();
	expect(4);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor22',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	editor.execCommand('insertTable',{
		cellpadding:2,
		cellspacing:3,
		width:100,
		height:100,
		cellborder:4,
		border:5,
		numRows:2,
		numCols:2
	});
	
	equals(d.getElementsByTagName('table')[0].cellPadding, 2, "The cellpadding is right");
	equals(d.getElementsByTagName('table')[0].cellSpacing, 3, "The cellsspacing is right");
	ok(d.getElementsByTagName('table')[0].style['border'].indexOf('5px solid') > -1, "The border is right");
	ok(d.getElementsByTagName('td')[0].style['border'].indexOf('4px solid') > -1, "The cellborder is right");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-591", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor23',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[10],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[10]
	});
	ua.mouseup(d.getElementsByTagName('td')[10]);
	
	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=50 height=50 />');
	
	equals(editor.selection.getRange().startContainer.firstChild.tagName.toLowerCase(), 'img', "The range is changed");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-613", function() {
	stop();
	expect(4);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor24',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	ok(Math.abs(parseInt($(d.getElementsByTagName('table')[0]).css('height')) - 100) < 5, 'The height is set');
	ok(Math.abs(parseInt($(d.getElementsByTagName('table')[0]).css('width')) - 500) < 5, 'The width is set');
	ok(Math.abs(parseInt($(d.getElementsByTagName('td')[0]).css('height')) - 20) < 5, 'The height is set');
	ok(Math.abs(parseInt($(d.getElementsByTagName('td')[0]).css('width')) - 125) < 5, 'The width is set');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-620", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor25',
		initialContent: '<p></p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;

	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	if(ua.browser.opera)
		var i = 2;
	else 
		var i = 1;
	ok(d.body.childNodes[i].tagName.toLowerCase() == 'p', 'There is an empty line');
	if(ua.browser.ie || ua.browser.opera)
		equals(d.body.childNodes[i].innerHTML, "", 'There is an empty line');
	else
		equals(d.body.childNodes[i].firstChild.tagName.toLowerCase(), 'br', 'There is an empty line');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-621", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor26',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;

	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	equals(d.getElementsByTagName('table')[0].style['marginBottom'], '10px', 'The margin is set');
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-705", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor27',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_source= te.getButtonByTitle('editor27', '源代码');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();
	
	editor.execCommand('insertvideo', {
		height: "100",
		width: "200",
		url: "http://localhost/ueditor/data/test_flash.swf",
		style: "float: left"
	});
	editor.execCommand('inserthtml', 'second');
	
	$(button_source).click();
	ok(!document.getElementById('editor27_bottombar').firstChild, "The source view");
	$(button_source).click();
	ok(document.getElementById('editor27_bottombar').firstChild, "The editor view");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-735", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor28',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_mergedown = te.getButtonByTitle('editor28', '下合并单元格');
	var button_deletecol = te.getButtonByTitle('editor28', '删除列');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[0],0).collapse(true).select();

	$(button_mergedown).click();
	$(button_deletecol).click();
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[11],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[11]
	});
	ua.mouseup(d.getElementsByTagName('td')[11]);
	
	editor.execCommand('link', {
    	href : 'http://www.baidu.com'
    });
	
	var replace_num = editor.execCommand('searchreplace', {
    	searchStr : 'http://www.baidu.com',
    	replaceStr : "1",
    	all : true,
		casesensitive : false
    });
	
	equals(replace_num, 12, "All the tds are selected");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-813", function() {
	stop();
	expect(4);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor29',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	var button_insertrow = te.getButtonByTitle('editor29', '前插入行');
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	editor.document.getElementsByTagName('td')[0].innerHTML = '1';
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.selectNode(d.getElementsByTagName('td')[0]).select();
	if(ua.browser.ie)
		equals(range.startContainer.innerText, '1', "The current range is right");
	else
		equals(range.startContainer.textContent, '1', "The current range is right");
	equals(range.collapsed, false, "The current range is right");
	
	$(button_insertrow).click();
	editor.document.getElementsByTagName('td')[0].innerHTML = '2';
	var range = editor.selection.getRange();
	if(ua.browser.ie)
		equals(range.startContainer.data, '2', "The current range is right");
	else
		equals(range.startContainer.textContent, '2', "The current range is right");
	equals(range.collapsed, true, "The current range is right");
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});

test("PUBLICGE-1017", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor30',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	editor.execCommand('insertTable',{
		numRows:2,
		numCols:2
	});
	editor.document.getElementsByTagName('td')[1].innerHTML = '1';
	editor.document.getElementsByTagName('td')[2].innerHTML = '1';
	
	ua.mousedown(d.getElementsByTagName('td')[0]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[0],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	
	editor.execCommand('link',{
		href : 'http://www.baidu.com'
	});
	
	equals(editor.getContent().match(/\<a/gi).length, 4, "All the tds are linked");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});


test("PUBLICGE-1032", function() {
	stop();
	expect(18);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor31',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	editor.execCommand('insertTable',{
		numRows:2,
		numCols:2
	});
	
	ua.mousedown(d.getElementsByTagName('td')[1]);
	ua.mouseover(d.getElementsByTagName('td')[3],{
		fromElement : d.getElementsByTagName('td')[1],
		toElement : d.getElementsByTagName('td')[3]
	});
	ua.mouseup(d.getElementsByTagName('td')[3]);
	
	var button_mergecells = te.getButtonByTitle('editor31', '合并多个单元格');
	var button_insertrow = te.getButtonByTitle('editor31', '前插入行');
	
	$(button_mergecells).click();
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[2],0).collapse(true).select();
	
	$(button_insertrow).click();
	
	equals(d.getElementsByTagName('tbody')[0].childNodes.length, 3, '2 trs');
	equals(d.getElementsByTagName('tr')[0].childNodes.length, 2, '2 tds');
	equals(d.getElementsByTagName('tr')[0].childNodes[0].colSpan, 1, '1 colSpan');
	equals(d.getElementsByTagName('tr')[0].childNodes[0].rowSpan, 1, '1 rowSpan');
	equals(d.getElementsByTagName('tr')[0].childNodes[1].colSpan, 1, '1 colSpan');
	equals(d.getElementsByTagName('tr')[0].childNodes[1].rowSpan, 3, '3 rowSpan');
	equals(d.getElementsByTagName('tr')[1].childNodes.length, 2, '2 tds');
	equals(d.getElementsByTagName('tr')[1].childNodes[0].colSpan, 1, '1 colSpan');
	equals(d.getElementsByTagName('tr')[1].childNodes[0].rowSpan, 1, '1 rowSpan');
	equals(d.getElementsByTagName('tr')[1].childNodes[1].colSpan, 1, '1 colSpan');
	equals(d.getElementsByTagName('tr')[1].childNodes[1].rowSpan, 1, '1 rowSpan');
	equals(d.getElementsByTagName('tr')[1].childNodes[1].style.display, 'none', 'dispaly:none');
	equals(d.getElementsByTagName('tr')[2].childNodes.length, 2, '2 tds');
	equals(d.getElementsByTagName('tr')[2].childNodes[0].colSpan, 1, '1 colSpan');
	equals(d.getElementsByTagName('tr')[2].childNodes[0].rowSpan, 1, '1 rowSpan');
	equals(d.getElementsByTagName('tr')[2].childNodes[1].colSpan, 1, '1 colSpan');
	equals(d.getElementsByTagName('tr')[2].childNodes[1].rowSpan, 1, '1 rowSpan');
	equals(d.getElementsByTagName('tr')[2].childNodes[1].style.display, 'none', 'dispaly:none');

	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
});