module('plugins.searchreplace');


/*trace 974,先替换再撤销再全部替换，则不会替换
 * ie下会出现的bug*/
test('全部替换',function(){
	var editor = te.obj[0];
	var range = te.obj[1];
	editor.setContent('<p>欢迎回来</p>');
	range.setStart(editor.body.firstChild,0).collapse(true).select();
	editor.execCommand('searchreplace',{searchStr:'欢迎',replaceStr:'你好'});
	editor.undoManger.undo();
	editor.execCommand('searchreplace',{searchStr:'欢迎',replaceStr:'你好',all:true});
	equal(editor.getContent(),'<p>你好回来</p>');
});

/*trace 917*/
test('替换内容包含查找内容,全部替换',function(){
	var editor = te.obj[0];
	var range = te.obj[1];
    editor.setContent('<p>hello回来</p>');
    range.setStart(editor.body.firstChild,0).collapse(true).select();
   /*searchreplace文件里是一个闭包，闭包中有一个全局变量currentRange，在上一次用例执行结束后仍然会保存这个值，导致下一次用例受影响*/
    editor.execCommand('searchreplace',{searchStr:'hello',replaceStr:'hello啊',all:true});
    equal(editor.getContent(),'<p>hello啊回来</p>');
});

/*trace 973*/
test('替换内容包含查找内容',function(){
	var editor = te.obj[0];
	var range = te.obj[1];
    editor.setContent('<p>欢迎回来</p>');
    range.setStart(editor.body.firstChild,0).collapse(1).select();
    editor.execCommand('searchreplace',{searchStr:'欢迎',replaceStr:'欢迎啊'});
    equal(editor.getContent(),'<p>欢迎啊回来</p>');
    editor.undoManger.undo();
    equal(editor.getContent(),'<p>欢迎回来</p>');
});

/*trace 1286*/
test('连续2次全部替换',function(){
	var editor = te.obj[0];
	var range = te.obj[1];
    editor.setContent('<p>欢迎回来</p>');
    editor.execCommand('searchreplace',{searchStr:'欢迎',replaceStr:'欢迎啊',all:true});
    equal(editor.getContent(),'<p>欢迎啊回来</p>');
    editor.execCommand('searchreplace',{searchStr:'欢迎',replaceStr:'欢迎啊',all:true});
    equal(editor.getContent(),'<p>欢迎啊啊回来</p>');
});

test('替换内容为空',function(){
	var editor = te.obj[0];
	var range = te.obj[1];
    editor.setContent('<p>欢迎回来</p>');
    editor.execCommand('searchreplace',{searchStr:'欢迎',replaceStr:''});
    equal(editor.getContent(),'<p>回来</p>');
});

test('全部替换内容为空',function(){
	var editor = te.obj[0];
	var range = te.obj[1];
    editor.setContent('<p>欢迎回来 欢迎啊</p>');
    editor.execCommand('searchreplace',{searchStr:'欢迎',replaceStr:'',all:true});
    equal(editor.getContent(),'<p>回来&nbsp;啊</p>');
});