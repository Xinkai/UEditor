test("PUBLICGE-547", function() {
	stop();
	expect(1);
	ua.loadcss('../../../themes/default/ueditor.css', function() {
		ua.loadcss(upath + 'css/DEFAULT.css', function() {
			var editor = new baidu.editor.ui.Editor({
				id: 'editor',
				initialContent: '<p><br /></p>',
		        minFrameHeight: 120
			});
		
			editor.render(document.body.appendChild(document.createElement('div')));
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
			
			range.selectNode(d.getElementsByTagName('table')[0],0).select();
			
			var href = window.location.href;
			ua.keydown(editor.document.body, {
			    keyCode : 8
			});
		    setTimeout(function(){
			    ua.keyup(editor.document.body);
			    setTimeout(function(){
				    equals(window.location.href, href, 'The back event of browser is prevented');
				    start();
			    }, 500);
		    }, 500);
		});
	}, "edui-popup", "position", "absolute");
} );