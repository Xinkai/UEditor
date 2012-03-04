test("PUBLICGE-767", function() {
	stop();
	expect(1);
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
				 
			editor.execCommand('searchreplace', {
				searchStr : 'f', 
				replaceStr : 'F',
				all : true,
				casesensitive : false,
				dir : 1
			});
			equals(d.getElementsByTagName('p')[0].innerHTML, 'FF', 'The ff is replaced');

			te.obj.push(editor);
			te.dom.push(div);
			setTimeout(function(){
				start();
			}, 300);
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-585", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor1',
		initialContent: '<p>你好，你在干嘛</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
		 
	var search_location = editor.execCommand('searchreplace', {
		searchStr : '在干嘛'
	});
	var replace_num = editor.execCommand('searchreplace', {
		searchStr : '在干嘛', 
		replaceStr : '你好',
		all : false,
		casesensitive : false,
		dir : 1
	});

	equals(search_location, true, 'The string is find');
	equals(replace_num, 1, 'The string is replaced');
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-624", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor2',
		initialContent: '<p>额们得到极大降低地价带宽可达扩大起哦额</p><p>三十岁你们看打开额打开它你们打交道较多额</p><p>你它它她快点额快点快点三菱蓝瑟等等额</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[2],18).collapse(true).select();

	var replace_num = editor.execCommand('searchreplace', {
		searchStr : '额', 
		replaceStr : '我',
		all : true,
		casesensitive : false,
		dir : 0
	});

	equals(replace_num, 6, "6 '额' are replaced");
	ok(editor.getContent().indexOf('额') == -1, "The '额' are all replaced");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-1027", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor3',
		initialContent: '<p>你好</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();

	var replace_num = editor.execCommand('searchreplace', {
		searchStr : '你', 
		replaceStr : '我',
		all : true,
		casesensitive : false
	});
	
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	editor.execCommand('inserthtml', 'hello');
	
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	
	replace_num = editor.execCommand('searchreplace', {
		searchStr : 'h', 
		replaceStr : 'a',
		all : true,
		casesensitive : false
	});

	equals(replace_num, 1, "1 'h' is replaced");
	equals(d.getElementsByTagName('p')[0].innerHTML, '​aello我好', "The '额' are all replaced");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

test("PUBLICGE-1028", function() {
	stop();
	expect(2);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor4',
		initialContent: '<p>你好</p>',
        minFrameHeight: 120
	});

	var div = document.body.appendChild(document.createElement('div'));
	editor.render(div);
	editor.focus();
	d = editor.document;
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();

	var replace_num = editor.execCommand('searchreplace', {
		searchStr : '你', 
		replaceStr : '我',
		all : true,
		casesensitive : false
	});
	
	range.setStart(d.getElementsByTagName('p')[0],0).collapse(true).select();
	
	replace_num = editor.execCommand('searchreplace', {
		searchStr : '我', 
		replaceStr : '你',
		all : true,
		casesensitive : false
	});

	equals(replace_num, 1, "1 '我' is replaced");
	equals(d.getElementsByTagName('p')[0].innerHTML, "​你好", "The '我' are all replaced");
	
	te.obj.push(editor);
	te.dom.push(div);
	setTimeout(function(){
		start();
	}, 300);
} );

