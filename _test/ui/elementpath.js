test("PUBLICGE-589", function() {
	stop();
	expect(1);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
			editor.focus();
			d = editor.document;
			
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
			var range = new baidu.editor.dom.Range( editor.document );
			range.selectNode(d.getElementsByTagName( 'table' )[0], 0).select();
			
			var elementpath_arr = editor.queryCommandValue('elementpath');
			var elementpath = "";
			for(var i = 0; i < elementpath_arr.length; i++){
				elementpath += elementpath_arr[i] + '_';
			}
			if(ua.browser.ie)
				equals(elementpath, "body_table_tbody_tr_td_", "The elementpath is right");
			else
				equals(elementpath, "body_table_tbody_tr_td_br_", "The elementpath is right");
			start();
		});
	}, "edui-popup", "position", "absolute");
} );

test("PUBLICGE-691", function() {
	stop();
	expect(5);
	var editor = new baidu.editor.ui.Editor({
		id: 'editor20',
        minFrameHeight: 120
	});

	editor.render(document.body.appendChild(document.createElement('div')));
	editor.focus();
	d = editor.document;
	
	editor.execCommand('insertTable',{
		numRows:4,
		numCols:4
	});
	
	var range = new baidu.editor.dom.Range( editor.document );
	range.setStart(d.getElementsByTagName('td')[1],0).collapse(true).select();
	ua.mouseup(d.getElementsByTagName('td')[1]);
	
	var content = editor.getContent();
	setTimeout(function(){
		editor.execCommand('elementpath', 4);
		equals(d.getElementsByTagName('tbody')[0].childNodes.length, 4, '4 trs');
		equals(d.getElementsByTagName('tr')[0].childNodes.length, 4, '4 tds');
		equals(d.getElementsByTagName('tr')[1].childNodes.length, 4, '4 tds');
		equals(d.getElementsByTagName('tr')[2].childNodes.length, 4, '4 tds');
		equals(d.getElementsByTagName('tr')[3].childNodes.length, 4, '4 tds');
		start();
	}, 500);
} );