test('test',function(){

});

//test("PUBLICGE-796", function() {
//	stop();
//	expect(2);
//	ua.loadcss('../../../themes/default/ueditor.css', function() {
//		ua.loadcss(upath + 'css/DEFAULT.css', function() {
//			var editor = new baidu.editor.ui.Editor({
//				id: 'editor',
//				minFrameHeight: 120
//			});
//
//			var div = document.body.appendChild(document.createElement('div'));
//			editor.render(div);
//			editor.focus();
//			d = editor.document;
//
//			editor.execCommand('inserthtml', '<img width="520"height="340" src="http://api.map.baidu.com/staticimage?center=116.404,39.915&zoom=10&width=520&height=340&markers=116.404,39.915" style="undefined"/>');
//			var range = new baidu.editor.dom.Range(editor.document);
//			range.selectNode(d.getElementsByTagName('img')[0]).select();
//			ua.mouseup(d.getElementsByTagName('img')[0]);0
//			setTimeout(function(){
//				var popup = te.getElementByClassNameAndEditorid('editor', 'edui-bubble', 'popup');
//				var content = document.getElementById(popup.id + '_content');
//				$(TT.dom.query('span', content)[4]).click();
//				if(ua.browser.ie){
//					var dialog = [];
//					var dialogs = TT.dom.query('div[class*=edui-for-map][class*=edui-dialog]');
//					for(var i = 0; i < dialogs.length; i++){
//						if($(dialogs[i]).css('display') != 'none'){
//							dialog.push(dialogs[i]);
//						}
//					}
//				}
//				else
//					var dialog = TT.dom.query('div[class*=edui-for-map][class*=edui-dialog]:not([style*=none])');
//				equals(dialog.length, 1,  "The dialog display");
//				te.getElementObjById(dialog[0].id).close();
//				equals(dialog[0].style.display, 'none', "The dialog disappears");
//
//				te.obj.push(editor);
//				te.dom.push(div);
//				setTimeout(function(){
//					start();
//				}, 300);
//			}, 300);
//		});
//	}, "edui-popup", "position", "absolute");
//} );
//
//test("PUBLICGE-807", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor1',
//		initialContent: '<p>aa<a href="http://ueditor.baidu.com" target="_self">UEditor</a>aa</p>',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.setStart(d.getElementsByTagName('a')[0].firstChild,2).collapse(true).select();
//	ua.mouseup(d.getElementsByTagName('a')[0]);
//
//	setTimeout(function(){
//		var popup = te.getElementByClassNameAndEditorid('editor1', 'edui-bubble', 'popup');
//		var content = document.getElementById(popup.id + '_content');
//		$(TT.dom.query('span', content)[0]).click();
//		if(ua.browser.ie){
//			var dialog = [];
//			var dialogs = TT.dom.query('div[class*=edui-for-link][class*=edui-dialog]');
//			for(var i = 0; i < dialogs.length; i++){
//				if($(dialogs[i]).css('display') != 'none'){
//					dialog.push(dialogs[i]);
//				}
//			}
//		}
//		else
//			var dialog = TT.dom.query('div[class*=edui-for-link][class*=edui-dialog]:not([style*=none])');
//		equals(dialog.length, 1, "The dialog display");
//		te.getElementObjById(dialog[0].id).close();
//		equals(dialog[0].style.display, 'none', "The dialog disappears");
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 300);
//} );
//
//test("PUBLICGE-797", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor2',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//
//	editor.execCommand('inserthtml', '<img width="520"height="340" src="http://api.map.baidu.com/staticimage?center=116.404,39.915&zoom=10&width=520&height=340&markers=116.404,39.915" style="undefined"/>');
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//
//	var button_insertimg = te.getButtonByTitle('editor2', '图片');
//	$(button_insertimg).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//	equals(dialog.length, 1, "The dialog display");
//	setTimeout(function(){
//		te.getElementObjById(dialog[0].id).onok();
//		equals(dialog[0].style.display, 'none', "The dialog disapears");
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-817", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor3',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_insertimg = te.getButtonByTitle('editor3', '图片');
//
//	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 title=MM style="float: left" />');
//
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//	$(button_insertimg).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0]);
//		var select = TT.dom.query('#float', iframe[0].contentWindow.document)[0];
//		equals(select.value, 'float: left', "The '左对齐'");
//		te.getElementObjById(dialog[0].id).close();
//		equals(dialog[0].style.display, 'none', "The dialog disappears");
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-849", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor4',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_video = te.getButtonByTitle('editor4', '视频');
//
//	editor.execCommand('insertvideo', {
//		height: "100",
//		width: "200",
//		url: "http://localhost/ueditor/data/test_flash.swf",
//		style: "float: left"
//	});
//
//	var range = new baidu.editor.dom.Range( editor.document );
//	range.selectNode(d.getElementsByTagName('p')[0].firstChild).select();
//	var img = editor.selection.getRange().getClosedNode();
//	ua.mouseup(d.getElementsByTagName('img')[0]);
//
//	$(button_video).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-video][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-video][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0]);
//		var select = TT.dom.query('#float', iframe[0].contentWindow.document)[0];
//		equals(select.value, 'float: left', "The '左对齐'");
//		te.getElementObjById(dialog[0].id).close();
//		equals(dialog[0].style.display, 'none', "The dialog disappears");
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//
//test("PUBLICGE-602", function() {
//	stop();
//	expect(1);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor5',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_emoticon = te.getButtonByTitle('editor5', '图片');
//
//	$(button_emoticon).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0]);
//		var select = TT.dom.query('#float', iframe[0].contentWindow.document)[0];
//
//		ok(select, 'The select exists');
//		te.getElementObjById(dialog[0].id).close();
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-642", function() {
//	stop();
//	expect(4);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor6',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_table = te.getButtonByTitle('editor6', '表格');
//
//	button_table.onbuttonclick();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-inserttable][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-inserttable][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0]);
//		var rowCount = TT.dom.query('#rowCount', iframe[0].contentWindow.document)[0];
//		var colCount = TT.dom.query('#colCount', iframe[0].contentWindow.document)[0];
//		var tableWidth = TT.dom.query('#tableWidth', iframe[0].contentWindow.document)[0];
//		var tableHeight = TT.dom.query('#tableHeight', iframe[0].contentWindow.document)[0];
//		var cellborder = TT.dom.query('#cellborder', iframe[0].contentWindow.document)[0];
//		var cellspacing = TT.dom.query('#cellspacing', iframe[0].contentWindow.document)[0];
//		var cellpadding = TT.dom.query('#cellpadding', iframe[0].contentWindow.document)[0];
//		var border = TT.dom.query('#border', iframe[0].contentWindow.document)[0];
//
//		rowCount.value = 2;
//		colCount.value = 2;
//		tableWidth.value = 100;
//		tableHeight.value = 100;
//		cellborder.value = 4;
//		cellspacing.value = 3;
//		cellpadding.value = 2;
//		border.value = 5;
//
//		te.getElementObjById(dialog[0].id).onok();
//
//		equals(d.getElementsByTagName('table')[0].cellPadding, 2, "The cellpadding is right");
//		equals(d.getElementsByTagName('table')[0].cellSpacing, 3, "The cellsspacing is right");
//		ok(d.getElementsByTagName('table')[0].style['border'].indexOf('5px solid') > -1, "The border is right");
//		ok(d.getElementsByTagName('td')[0].style['border'].indexOf('4px solid') > -1, "The cellborder is right");
//
//		te.getElementObjById(dialog[0].id).close();
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-733", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor7',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_emoticon = te.getButtonByTitle('editor7', '图片');
//
//	$(button_emoticon).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0])[0];
//		var url = TT.dom.query('#url', iframe.contentWindow.document)[0];
//		var imgWidth = TT.dom.query('#imgWidth', iframe.contentWindow.document)[0];
//		var imgHeight = TT.dom.query('#imgHeight', iframe.contentWindow.document)[0];
//
//		url.value = 'http://localhost/ueditor/data/11053122527522.jpg';
//		iframe.contentWindow.clearLocal();
//		iframe.contentWindow.createImg();
//
//		var preImg = TT.dom.query('#thumb', iframe.contentWindow.document)[0].firstChild;
//		var width = Math.floor(preImg.width/2);
//		var height = Math.floor(preImg.height/2);
//		imgWidth.value = width;
//		imgHeight.value = height;
//		te.getElementObjById(dialog[0].id).onok();
//
//		equals(d.getElementsByTagName('img')[0].width, width);
//		equals(d.getElementsByTagName('img')[0].height, height);
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-706", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor8',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_emoticon = te.getButtonByTitle('editor8', '图片');
//
//	$(button_emoticon).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0])[0];
//		var url = TT.dom.query('#url', iframe.contentWindow.document)[0];
//		var imgWidth = TT.dom.query('#imgWidth', iframe.contentWindow.document)[0];
//		var imgHeight = TT.dom.query('#imgHeight', iframe.contentWindow.document)[0];
//
//		url.value = 'http://localhost/ueditor/data/11053122527522.jpg';
//		imgWidth.value = 10;
//		imgHeight.value = 10;
//
//		te.getElementObjById(dialog[0].id).onok();
//
//		equals(d.getElementsByTagName('img')[0].width, 10);
//		equals(d.getElementsByTagName('img')[0].height, 10);
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-1015", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor9',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_emoticon = te.getButtonByTitle('editor9', '图片');
//
//	$(button_emoticon).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0])[0];
//		var url = TT.dom.query('#url', iframe.contentWindow.document)[0];
//		var imgWidth = TT.dom.query('#imgWidth', iframe.contentWindow.document)[0];
//		var imgHeight = TT.dom.query('#imgHeight', iframe.contentWindow.document)[0];
//
//		url.value = 'http://localhost/ueditor/data/11053122527522.jpg';
//		iframe.contentWindow.clearLocal();
//		iframe.contentWindow.createImg();
//
//		setTimeout(function(){
//			te.getElementObjById(dialog[0].id).onok();
//
//			equals(d.getElementsByTagName('img')[0].width, 612);
//			equals(d.getElementsByTagName('img')[0].height, 701);
//
//			te.obj.push(editor);
//			te.dom.push(div);
//			setTimeout(function(){
//				start();
//			}, 300);
//		}, 100);
//	}, 500);
//} );
//
//test("PUBLICGE-776", function() {
//	stop();
//	expect(2);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor10',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_video = te.getButtonByTitle('editor10', '视频');
//
//	$(button_video).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-video][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-video][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0])[0];
//		var select = TT.dom.query('#float', iframe.contentWindow.document)[0];
//
//		ok(iframe.contentWindow.document.body.innerHTML.indexOf('对齐方式') > -1, 'The "对齐方式" exists');
//		ok(select, 'The select exists');
//		te.getElementObjById(dialog[0].id).close();
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-786", function() {
//	stop();
//	expect(3);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor11',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_emoticon = te.getButtonByTitle('editor11', '图片');
//
//	$(button_emoticon).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0])[0];
//		var url = TT.dom.query('#url', iframe.contentWindow.document)[0];
//		var imgWidth = TT.dom.query('#imgWidth', iframe.contentWindow.document)[0];
//		var imgHeight = TT.dom.query('#imgHeight', iframe.contentWindow.document)[0];
//
//		imgWidth.value = 10;
//		imgHeight.value = 10;
//
//		url.value = 'http://localhost/ueditor/data';
//		iframe.contentWindow.clearLocal();
//		iframe.contentWindow.createImg();
//
//		equals(imgWidth.value, 10);
//		equals(imgHeight.value, 10);
//		equals(url.value, 'http://localhost/ueditor/data');
//
//		te.getElementObjById(dialog[0].id).close();
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );
//
//test("PUBLICGE-794", function() {
//	stop();
//	expect(1);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor12',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_insertimg = te.getButtonByTitle('editor12', '图片');
//
//	editor.execCommand('inserthtml', '<img  src=http://localhost/ueditor/data/11053122527522.jpg width=100 height=100 title=MM style="float: left" />');
//
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//	$(button_insertimg).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-image][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0])[0];
//		var url = TT.dom.query('#url', iframe.contentWindow.document)[0];
//
//		url.value = "http://localhost/ueditor/data/129600b260F-4U40.jpg";
//		iframe.contentWindow.clearLocal();
//		iframe.contentWindow.createImg();
//
//		setTimeout(function(){
//			te.getElementObjById(dialog[0].id).onok();
//
//			equals(d.getElementsByTagName('img')[0].src, "http://localhost/ueditor/data/129600b260F-4U40.jpg");
//
//			te.obj.push(editor);
//			te.dom.push(div);
//			setTimeout(function(){
//				start();
//			}, 300);
//		}, 100);
//	}, 500);
//} );
//
//test("PUBLICGE-839", function() {
//	stop();
//	expect(1);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor13',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_baidumap = te.getButtonByTitle('editor13', 'Baidu地图');
//
//	editor.execCommand('inserthtml', '<img width="520"height="340" src="http://api.map.baidu.com/staticimage?center=116.404,39.915&zoom=10&width=520&height=340&markers=116.404,39.915" style="float: left"/>');
//
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//	ua.mouseup(d.getElementsByTagName('img')[0]);
//
//    $(button_baidumap).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-map][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-map][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0])[0];
//		var address = TT.dom.query('#address', iframe.contentWindow.document)[0];
//		address.value = '北京海淀区';
//		iframe.contentWindow.doSearch();
//
//		setTimeout(function(){
//			te.getElementObjById(dialog[0].id).onok();
//			te.getElementObjById(dialog[0].id).close();
//
//			ok(d.getElementsByTagName('img')[0].style['cssFloat'] == 'left'
//				|| d.getElementsByTagName('img')[0].style['styleFloat'] == 'left', "The float style remains");
//			te.obj.push(editor);
//			te.dom.push(div);
//			setTimeout(function(){
//				start();
//			}, 300);
//		}, 500);
//	}, 500);
//} );
//
//test("PUBLICGE-817", function() {
//	stop();
//	expect(1);
//	var editor = new baidu.editor.ui.Editor({
//		id: 'editor14',
//		minFrameHeight: 120
//	});
//
//	var div = document.body.appendChild(document.createElement('div'));
//	editor.render(div);
//	editor.focus();
//	d = editor.document;
//	var button_video = te.getButtonByTitle('editor14', '视频');
//
//	editor.execCommand('insertvideo', {
//		height: "100",
//		width: "200",
//		url: "http://localhost/ueditor/data/test_flash.swf"
//	});
//
//	var range = new baidu.editor.dom.Range(editor.document);
//	range.selectNode(d.getElementsByTagName('img')[0]).select();
//
//	$(button_video).click();
//
//	if(ua.browser.ie){
//		var dialog = [];
//		var dialogs = TT.dom.query('div[class*=edui-for-video][class*=edui-dialog]');
//		for(var i = 0; i < dialogs.length; i++){
//			if($(dialogs[i]).css('display') != 'none'){
//				dialog.push(dialogs[i]);
//			}
//		}
//	}
//	else
//		var dialog = TT.dom.query('div[class*=edui-for-video][class*=edui-dialog]:not([style*=none])');
//
//	setTimeout(function(){
//		var iframe = TT.dom.query('iframe',dialog[0]);
//		var select = TT.dom.query('#float', iframe[0].contentWindow.document)[0];
//		equals(select.value, '', "The '默认'");
//
//		te.getElementObjById(dialog[0].id).close();
//
//		te.obj.push(editor);
//		te.dom.push(div);
//		setTimeout(function(){
//			start();
//		}, 300);
//	}, 500);
//} );