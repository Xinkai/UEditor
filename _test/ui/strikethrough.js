test("PUBLICGE-952", function() {
	stop();
	expect(2);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<a href="http://ueditor.baidu.com/">UEditor</a>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			var button_strikethrough = te.getButtonByTitle('editor', '删除线');
		
			var range = new baidu.editor.dom.Range( editor.document );
			range.selectNode(
                    d.getElementsByTagName( 'a' )[0], 0 )
                    .select();
			$(button_strikethrough).click();
			equals(editor.document.getElementsByTagName('a')[0].style['textDecoration'], "underline", "The link has underline");
			ok(editor.document.getElementsByTagName('a')[0].firstChild.style['textDecoration'], "line-through", "The link has strikethrough");
		    start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-946", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>hello</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_strikethrough = te.getButtonByTitle('editor1', '删除线');

	var range = new baidu.editor.dom.Range( editor.document );
	range.selectNode(
            d.getElementsByTagName( 'p' )[0], 0 )
            .select();
	$(button_strikethrough).click();
	
	range.setStart(d.getElementsByTagName('span')[0].firstChild,5).collapse(true).select();
	var button_bold = te.getButtonByTitle('editor1', '加粗');

    editor.setContent('<p><span style="text-decoration: line-through; ">hello<strong>n</strong></span></p>');
	range.selectNode(d.getElementsByTagName('span')[0].firstChild.nextSibling).select();
	ua.mouseup(editor.document.body);
	setTimeout(function(){
		ok(button_strikethrough.getDom().childNodes[0].className.indexOf('edui-state-checked') > -1, 
		"The formatmatch button is not highlight.");	
		ok(button_bold.getDom().childNodes[0].className.indexOf('edui-state-checked') > -1, 
		"The bold button is not highlight.");
		start();
	}, 500);
} );

test("PUBLICGE-814", function() {
	expect(8);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p>北京海淀区上地</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	var button_strikethrough = te.getButtonByTitle('editor2', '删除线');
	var button_underline = te.getButtonByTitle('editor2', '下划线');
	var button_fontsize = te.getButtonByTitle('editor2', '字号');

	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0].firstChild,5).setEnd(d.getElementsByTagName('p')[0].firstChild,7).select();
	$(button_fontsize.items[7]).click();
	range.setStart(d.getElementsByTagName('p')[0].firstChild,2).setEnd(d.getElementsByTagName('p')[0].firstChild.nextSibling.firstChild,2).select();
	$(button_strikethrough).click();
	$(button_underline).click();
	
	equals(d.getElementsByTagName('p')[0].childNodes.length, 3, "The are 3 tags in 'p'");
	
	equals(d.getElementsByTagName('p')[0].childNodes[1].tagName.toLowerCase(), 'span', "The second tag is 'span'");
	equals(d.getElementsByTagName('p')[0].childNodes[1].style['textDecoration'], 'underline', "The second tag has underline");
	equals(d.getElementsByTagName('p')[0].childNodes[1].innerHTML, '海淀区', "The innerHTML of the second tag is '海淀区'");
	
	equals(d.getElementsByTagName('p')[0].childNodes[2].tagName.toLowerCase(), 'span', "The third tag is 'span'");
	equals(d.getElementsByTagName('p')[0].childNodes[2].style['textDecoration'], 'underline', "The third tag has underline");
	equals(d.getElementsByTagName('p')[0].childNodes[2].style['fontSize'], '24pt', "The third tag has 24pt");
	equals(d.getElementsByTagName('p')[0].childNodes[2].innerHTML, '上地', "The innerHTML of the third tag is '上地'");
} );

test("PUBLICGE-803", function() {
	expect(16);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p>北京大兴开发区金苑路24号</p>',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	
	var button_strikethrough = te.getButtonByTitle('editor3', '删除线');
	var button_fontfamily = te.getButtonByTitle('editor3', '字体');
	var button_bold = te.getButtonByTitle('editor3', '加粗');

	var range = new baidu.editor.dom.Range( editor.document );
	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
	$(button_bold).click();
	
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild,2).setEnd(d.getElementsByTagName('p')[0].firstChild.firstChild,4).select();
	$(button_fontfamily.items[2]).click();
	$(button_strikethrough).click();
	
	range.setStart(d.getElementsByTagName('p')[0].firstChild.firstChild,0).setEnd(d.getElementsByTagName('p')[0].firstChild.nextSibling.nextSibling.firstChild,3).select();
	$(button_strikethrough).click();

	equals(d.getElementsByTagName('p')[0].childNodes.length, 4, "The are 3 tags in 'p'");
	
	equals(d.getElementsByTagName('p')[0].childNodes[0].tagName.toLowerCase(), 'strong', "The first tag is 'strong'");
	equals(d.getElementsByTagName('p')[0].childNodes[0].firstChild.tagName.toLowerCase(), 'span', "The first tag in 'strong' is 'span'");
	equals(d.getElementsByTagName('p')[0].childNodes[0].firstChild.style['textDecoration'], 'line-through', "The first tag has line-through");
	equals(d.getElementsByTagName('p')[0].childNodes[0].firstChild.innerHTML, '北京', "The innerHTML of the first tag is '北京'");
	
	equals(d.getElementsByTagName('p')[0].childNodes[1].tagName.toLowerCase(), 'strong', "The second tag is 'strong'");
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.tagName.toLowerCase(), 'span', "The second tag in 'strong' is 'span'");
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.style['textDecoration'], 'line-through', "The second tag has line-through");
	ok(d.getElementsByTagName('p')[0].childNodes[1].firstChild.style['fontFamily'].indexOf('隶书') > -1, "The second tag has '隶书'");
	equals(d.getElementsByTagName('p')[0].childNodes[1].firstChild.innerHTML, '大兴', "The innerHTML of the second tag is '大兴'");
	
	equals(d.getElementsByTagName('p')[0].childNodes[2].tagName.toLowerCase(), 'strong', "The third tag is 'strong'");
	equals(d.getElementsByTagName('p')[0].childNodes[2].firstChild.tagName.toLowerCase(), 'span', "The third tag in 'strong' is 'span'");
	equals(d.getElementsByTagName('p')[0].childNodes[2].firstChild.style['textDecoration'], 'line-through', "The third tag has line-through");
	equals(d.getElementsByTagName('p')[0].childNodes[2].firstChild.innerHTML, '开发区', "The innerHTML of the third tag is '开发区'");
	
	equals(d.getElementsByTagName('p')[0].childNodes[3].tagName.toLowerCase(), 'strong', "The forth tag is 'strong'");
	equals(d.getElementsByTagName('p')[0].childNodes[3].innerHTML, '金苑路24号', "The innerHTML of the forth tag is '金苑路24号'");
	
} );