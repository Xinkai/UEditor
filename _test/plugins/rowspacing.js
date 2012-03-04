module( 'plugins.rowspacing' );

/*trace 1029*/
test( '设置行距后查看状态反射', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p>hello1</p><p>hello2</p>' );
        range.setStart( editor.body.firstChild, 0 ).setEnd( editor.body.lastChild, 1 ).select();
        editor.execCommand( 'rowspacing', 15 );
//    range.selectNode( editor.body ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
        /*光标闭合时查看状态反射*/
        range.setStart( editor.body.firstChild.firstChild, 1 ).collapse( true ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
} );

/*trace 1035*/
test( '非闭合清除行距等样式，查看状态反射', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p>hello1</a></p><p>hello2</p>' );
        range.setStart( editor.body.firstChild, 0 ).setEnd( editor.body.lastChild, 1 ).select();
        editor.execCommand( 'rowspacing', 20 );
        equal( editor.queryCommandValue( 'rowspacing' ), 20, '行距为2.0' );

} );

test( '闭合清除行距等样式，查看状态反射', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p>hello1</a></p><p>hello2</p>' );
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'rowspacing', 20 );
        equal( editor.queryCommandValue( 'rowspacing' ), 20, '行距为2.0' );
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'removeformat' );
        //1.2后改
        equal( editor.queryCommandValue( 'rowspacing' ), 5, '闭合清除格式后，行距为5' );
} );

/*trace 1026*/
test( '设置行距后设置字体颜色', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p>hello1<a href="">hello</a>hello2</p>' );
        range.setStart( editor.body.firstChild, 0 ).setEnd( editor.body.lastChild, 1 ).select();
        editor.execCommand( 'rowspacing', 15 );
        editor.execCommand( 'forecolor', 'rgb(255,0,0)' );
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
        /*闭合的方式去查看行距的状态反射*/
        range.setStart( editor.body.firstChild.firstChild, 1 ).collapse( true ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
} );

test( '设置行距后设置加粗等多种样式', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p>hello1</p><p>hello2</p>' );
        range.setStart( editor.body.firstChild, 0 ).setEnd( editor.body.lastChild, 1 ).select();
        editor.execCommand( 'rowspacing', 15 );
        editor.execCommand( 'bold' );
        editor.execCommand( 'underline' );
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
} );

test( '非闭合去除加粗等样式', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p>hello1</p><p>hello2</p>' );
        range.setStart( editor.body.firstChild, 0 ).setEnd( editor.body.lastChild, 1 ).select();
        editor.execCommand( 'rowspacing', 15 );
        editor.execCommand( 'bold' );
        editor.execCommand( 'underline' );
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
        editor.execCommand( 'removeformat' );
        //1.2后改
        equal( editor.queryCommandValue( 'rowspacing' ), 5, '去除样式后查看行距' );
} );

test( '闭合去除样式', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p>hello1</p><p>hello2</p>' );
        range.setStart( editor.body.firstChild, 0 ).setEnd( editor.body.lastChild, 1 ).select();
        editor.execCommand( 'rowspacing', 15 );
        editor.execCommand( 'bold' );
        editor.execCommand( 'underline' );
        /*采用闭合的方式查询行距，
         介个好像用手选不太能选的出来，总是会选到<strong><span>里面去*/
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
        /*闭合方式鼠标放在第二个p中*/
        range.setStart( editor.body.lastChild, 0 ).collapse( true ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
        editor.execCommand( 'removeformat' );
        //1.2后改
        equal( editor.queryCommandValue( 'rowspacing' ), 5, '去除样式后查看行距' );
        /*第一行的样式应当仍然在*/
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '查看行距' );
} );

test( '表格中设置行距', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<table><tbody><tr><td>hello1</td><td>hello2</td></tr><tr><td></td><td></td></tr></tbody></table>' );
        var tds = editor.body.firstChild.getElementsByTagName( 'td' );
        /*选中表格中的文本设置行距*/
        range.selectNode( tds[0].firstChild ).select();
        editor.execCommand( 'rowspacing', 20 );
        equal( editor.queryCommandValue( 'rowspacing' ), 20, '设置表格中文本行距为2' );
        /*采用闭合的方式查询行距*/
        range.setStart( tds[0].firstChild.firstChild, 1 ).collapse( true ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 20, '设置表格中文本行距为2' );

        /*闭合在表格中的文本设置行距*/
        range.setStart( tds[1].firstChild, 1 ).collapse( true ).select();
        editor.execCommand( 'rowspacing', 15 );
        /*选中整个单元格查询行距*/
        range.selectNode( tds[1] ).select();
        equal( editor.queryCommandValue( 'rowspacing' ), 15, '设置表格中文本行距为1.5' );
        /*闭合在空白单元格中设置行距*/
        range.setStart( tds[2], 0 ).collapse( true ).select();
        editor.execCommand( 'rowspacing', 25 );
        equal( editor.queryCommandValue( 'rowspacing' ), 25, '设置表格中文本行距为2.5' );
} );


test( '跨多个单元格设置行距', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<table><tbody><tr><td>hello1</td><td>hello2<img /></td></tr><tr><td><div>hello3</div></td><td><p>hello4</p></td></tr></tbody></table>' );
        var tds = editor.body.firstChild.getElementsByTagName( 'td' );
        var p = editor.body.getElementsByTagName( 'p' );
        range.selectNode( editor.body.firstChild ).select();
        editor.execCommand( 'rowspacing', 15 );
        for ( var index = 0; index < tds.length; index++ ) {
                range.selectNode( tds[index] ).select();
                equal( editor.queryCommandValue( 'rowspacing' ), 15, '设置表格中文本行距为1.5' );
                /*会自动在非block元素外面套p*/
                //1.2版本，加在p上
                equal( p[index].style['marginTop'], '15px', '行距属性都是加在第一个孩子节点上' );

        }

} );

/*trace 1052*/
test( '对插入的代码设置多倍行距', function () {
        var editor = te.obj[0];
        var range = te.obj[1];
        editor.setContent( '<p></p>' );
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        var stylecode = "var tds = editor.body.firstChild.getElementsByTagName( 'td' );\n range.selectNode( editor.body.firstChild ).select();";
        editor.execCommand( 'inserthtml', "<pre style='background-color: #F8F8F8;border: 1px solid #CCCCCC;padding:10px 10px'>" + stylecode + "</pre>" );
        equal( editor.body.firstChild.tagName.toLowerCase(), 'pre', '第一个孩子节点为pre' );
        range.selectNode( editor.body.firstChild ).select();
        editor.execCommand( 'rowspacing', 20 );
        var pre = editor.body.firstChild;
        equal( pre.tagName.toLowerCase(), 'pre', '不允许将p换成pre' );

        equal( pre.style['borderWidth'], '1px', '宽度' );
        ok( pre.style['borderColor'].toUpperCase() == '#CCCCCC' || pre.style['borderColor'] == 'rgb(204, 204, 204)', '颜色' );
} );


test( '在合并单元格中设置多倍行距', function () {
        var editor = new baidu.editor.Editor();
        var div = document.body.appendChild( document.createElement( 'div' ) );
        te.dom.push( div );
        editor.render( div );
        editor.setContent( '<p></p>' );
        var range = new baidu.editor.dom.Range( editor.document );
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:3, numRows:3} );
        stop();
        /*insertHTML有一个200ms的超时函数*/
        setTimeout( function () {
                ua.manualDeleteFillData( editor.body );
                var trs = editor.body.getElementsByTagName( 'tr' );
                range.setStart( trs[0].firstChild, 0 ).setEnd( trs[1].firstChild, 0 ).select();
                editor.currentSelectedArr = [trs[0].firstChild, trs[1].firstChild];
                editor.execCommand( 'mergecells' );
                /*合并单元格后设置这个单元格多倍行距*/
                ua.manualDeleteFillData( editor.body );
                range.setStart( trs[0].firstChild, 0 ).collapse( true ).select();
                editor.execCommand( 'rowspacing', 20 );
                ua.manualDeleteFillData( editor.body );
                equal( trs[0].firstChild.firstChild.tagName.toLowerCase(), 'p', 'td下面创建了一个p' );
                equal( trs[0].firstChild.firstChild.style['marginTop'], '20px', 'p设置了2倍行距' );
                trs = editor.body.firstChild.getElementsByTagName( 'tr' );
                equal( trs.length, 3, '3行' );
                var tbodyChild = editor.body.getElementsByTagName( 'tbody' )[0].childNodes;
                for ( var index = 0; index < tbodyChild.length; index++ ) {
                        equal( tbodyChild[index].tagName.toLowerCase(), 'tr', 'tbody下面都是tr' );
                }
                start();
        }, 300 );

} );

/*trace 1079*/
test( '合并单元格后设置多个单元格多倍行距', function () {
        var editor = new baidu.editor.Editor( {'plugins':['table']} );
        var div = document.body.appendChild( document.createElement( 'div' ) );
        te.dom.push( div );
        editor.render( div );
        editor.setContent( '<p></p>' );
        var range = new baidu.editor.dom.Range( editor.document );
        range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
        editor.execCommand( 'inserttable', {numCols:3, numRows:3} );
        stop();
        setTimeout( function () {
                ua.manualDeleteFillData( editor.body );
                var trs = editor.body.firstChild.getElementsByTagName( 'tr' );
                /*合并第一列前2个单元格*/
                range.setStart( trs[0].firstChild, 0 ).setEnd( trs[1].firstChild, 0 ).select();
                editor.currentSelectedArr = [trs[0].firstChild, trs[1].firstChild];
                editor.execCommand( 'mergecells' );
                /*设置多倍行距*/
                range.setStart( trs[0].firstChild, 0 ).setEnd( trs[2].firstChild, 0 ).select();
                editor.currentSelectedArr = [trs[0].firstChild, trs[1].firstChild, trs[2].firstChild];
                editor.execCommand( 'rowspacing', 20 );
                trs = editor.body.firstChild.getElementsByTagName( 'tr' );
                equal( trs.length, 3, '3行' );
                var tbodyChild = editor.body.getElementsByTagName( 'tbody' )[0].childNodes;
                for ( var index = 0; index < tbodyChild.length; index++ ) {
                        equal( tbodyChild[index].tagName.toLowerCase(), 'tr', 'tbody下面都是tr' );
                }
                start();
        }, 300 );
} );
