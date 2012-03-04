
test( "PUBLICGE-856", function() {
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
		    var button_undo = te.getButtonByTitle('editor', '撤销');
		    
		    $(editor.document.body).keyup(function(){
		    	editor.setContent('<p>n</p>');
		    });
		    
		    ua.keydown(editor.document.body, {
				keyCode : 78
			});
		    setTimeout(function(){
			    ua.keyup(editor.document.body);
			    ok(button_undo.getDom().childNodes[0].className.indexOf('edui-state-disabled') == -1, 
			    		"The word is input,the undo button is hightlight.");
		    	$(button_undo).click();
		    	ok(button_undo.getDom().childNodes[0].className.indexOf('edui-state-disabled') > -1, 
		    			"The undo button is clicked and not highlight");
			    ua.keydown(editor.document.body, {
			    	keyCode : 78
			    });
			    setTimeout(function(){
				    ua.keyup(editor.document.body);
				    ok(button_undo.getDom().childNodes[0].className.indexOf('edui-state-disabled') == -1, 
				    		"The word is input,the undo button is hightlight.");			    
			    	start();
			    }, 2000);
		    }, 2000);
		});
	}, "edui-popup", "position", "absolute");
});

test( "PUBLICGE-583", function() {
	expect(3);
    var editor = new baidu.editor.ui.Editor({
        id: 'editor1',
        minFrameHeight: 120
    });

    editor.render(document.body.appendChild(document.createElement('div')));
    editor.focus();
    d = editor.document;
    var content = editor.getContent();
    
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
    editor.execCommand('inserthtml', '<img style="border:0px"  src="http://img.baidu.com/hi/jx2/j_0001.gif">');
    
	ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
	equals(editor.getContent().indexOf('img'), -1, "The img is undo");
	
	ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
	equals(editor.getContent().indexOf('table'), -1, "The table is undo");
	
	equals(editor.getContent(), content, "The content is restored");
});

test( "PUBLICGE-599", function() {
	expect(1);
    var editor = new baidu.editor.ui.Editor({
        id: 'editor2',
        minFrameHeight: 120
    });

    editor.render(document.body.appendChild(document.createElement('div')));
    editor.focus();
    d = editor.document;
    var content = editor.getContent();
    
    editor.execCommand('insertTable',{
		numRows:2,
		numCols:2
	});
    editor.execCommand('inserthtml', '<img style="border:0px"  src="http://img.baidu.com/hi/jx2/j_0001.gif">');
    editor.execCommand('link', {
    	href : 'http://www.baidu.com'
    });
    editor.execCommand('inserthtml', '<img style="border:0px"  src="http://img.baidu.com/hi/jx2/j_0001.gif">');
    
    ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
    ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
    
	equals(editor.getContent().indexOf('<a'), -1, "The link is deleted");
});

test( "PUBLICGE-617", function() {
	expect(1);
    var editor = new baidu.editor.ui.Editor({
        id: 'editor3',
        initialContent: '<p>text1</p>',
        minFrameHeight: 120
    });

    editor.render(document.body.appendChild(document.createElement('div')));
    editor.focus();
    d = editor.document;
	var button_horizontal = te.getButtonByTitle('editor3', '分隔线');
	var content = editor.getContent();

	var range = new baidu.editor.dom.Range(editor.document);
	range.setStart(d.getElementsByTagName('p')[0], 5).collapse(true).select();
	
    $(button_horizontal).click();
    editor.execCommand('inserthtml', 'text2');
    ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
    ua.keydown(editor.document.body, {
		ctrlKey : true,
	    keyCode : 90
	});
    
    equals(editor.getContent(), content, "The undo works well");
});