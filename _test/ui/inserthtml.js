test("PUBLICGE-563", function() {
	stop();
	expect(1);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p>new1</p><p>new2<br /></p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			
			var range = new baidu.editor.dom.Range( editor.document );
			range.setStart(d.getElementsByTagName('p')[0].firstChild,1).setEnd(d.getElementsByTagName('p')[1].firstChild,2).select();
			
			editor.execCommand('inserthtml', '<img style="border:0px"  src="http://img.baidu.com/hi/jx2/j_0001.gif">');

			equals(d.getElementsByTagName('p').length, '1', "There is 1 paragragh in total");	
			start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-608", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
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
	
	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 title=MM />');
	
	setTimeout(function(){
		equals(d.getElementsByTagName('img')[0].title, 'MM', 'The title is right');
		start();
	}, 500);
} );

test("PUBLICGE-610", function() {
	stop();
	expect(3);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	
	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 />');
	
	setTimeout(function(){
		var range = new baidu.editor.dom.Range(editor.document);
		range.selectNode(d.getElementsByTagName('img')[0], 0).select();
		editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/129600b260F-4U40.jpg width=150 height=150 />');

		setTimeout(function(){
			equals(d.getElementsByTagName('img')[0].src, 'http://localhost/ueditor/data/129600b260F-4U40.jpg', 'The src is right');
			equals(d.getElementsByTagName('img')[0].height, '150', 'The height is right');
			equals(d.getElementsByTagName('img')[0].width, '150', 'The width is right');
			start();
		}, 500);
	}, 500);
} );

test("PUBLICGE-545", function() {
	stop();
	expect(1);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	
	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 />');
	
	setTimeout(function(){
		var range = new baidu.editor.dom.Range(editor.document);
		range.selectNode(d.getElementsByTagName('img')[0], 0).select();
		editor.execCommand('link', {
			href : 'http://www.baidu.com'
		});
		
		range.selectNode(d.getElementsByTagName('img')[0], 0).select();
		ok(editor.queryCommandValue('link').href == 'http://www.baidu.com/'
			|| editor.queryCommandValue('link').href == 'http://www.baidu.com', "The url is queryed");
		start();
	}, 500);
} );

test("PUBLICGE-784", function() {
	stop();
	expect(4);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor4',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	
	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 title=MM style="float: left" />');
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	var img = editor.selection.getRange().getClosedNode();

	equals(img.src, 'http://localhost/ueditor/data/11053122527522.jpg', 'The url is right');
    equals(img.width, '100', 'The height is right');
    equals(img.height, '100', 'The height is right');
    ok(img.style.cssFloat == 'left' || img.style.styleFloat == 'left', 'The float style is right');
    start();
} );