module( 'plugins.table' );

/*trace992，合并单元格后多了一个td*/
test( '合并单元格', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:2,numRows:2} );
    ua.manualDeleteFillData( editor.body );
    var tds = editor.body.getElementsByTagName( 'td' );
    range.setStart( tds[0], 0 ).collapse( true ).select();
    editor.execCommand( 'mergeright' );
    range.setStart( tds[2], 0 ).collapse( true ).select();
    editor.execCommand( 'mergeright' );

    tds = editor.body.getElementsByTagName( 'td' );

    equal( tds.length, 4, '4个单元格' );
    equal( tds[0].getAttribute( 'colspan' ), 2, '第一行的单元格colspan为2' );
    equal( $( tds[1] ).css( 'display' ), 'none', '第一行第二个单元格隐藏了' );
    equal( tds[2].getAttribute( 'colspan' ), 2, '第二行的单元格colspan为2' );
    ua.manualDeleteFillData( editor.body );
    setTimeout(function() {
        editor.execCommand('source');

        start();


    });
    stop();
    tds = editor.body.getElementsByTagName( 'td' );
    equal( tds.length, 4, '4个单元格' );
    equal( tds[0].getAttribute( 'colspan' ), 2, '切换到源码后第一个的单元格colspan为2' );
    equal( tds[2].getAttribute( 'colspan' ), 2, '切换到源码后第二行第一个的单元格colspan为2' );
} );

/*trace 750，1308*/

test( 'trace1308：前插入行的样式和原先不同', function() {
    var editor = te.obj[0];
    var range = te.obj[1];

/*不能设置content为空，这样插入表格会有问题
     * 可以尝试手动地在主demo中清空body所有内容后插入表格，ie下面插入表格的菜单是灰的，光标也没有办法定位到表格外面*/

    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:2,numRows:2} );
    ua.manualDeleteFillData( editor.body );
    range.setStartAfter( editor.body.firstChild ).collapse( true ).select();
    //cellborder:2,不支持了
    editor.execCommand( 'inserttable', {border:2,numCols:2,numRows:2} );
    var table2 = editor.body.getElementsByTagName( 'table' )[1];
    range.setStart( table2.getElementsByTagName( 'td' )[0], 0 ).collapse( true ).select();
    editor.execCommand( 'insertrow' );
    var tds = table2.getElementsByTagName( 'td' );
    
/*firefox下用jquery的方式去不到border-width*/

    for(var index = 0;index<tds.length;index++)

/*边框宽度加到table上了*/
equal(table2.getAttribute('border'),'2','表格边框为2px');
//    equal( $( tds[index] ).css( 'border-width' ) || tds[index].style.borderWidth, '2px', '表格边框为2px' );
//    for ( var index = 0; index < tds.length; index++ ) {
//        equal( $( tds[index ] ).css( 'border-width' ) || tds[index].style.borderWidth, '2px', '查看第' + (index + 1) + '个单元格的边框' )
//    }
} );
/*trace 749*/

test( '拆分为列后2列都有文本', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:2,numRows:2} );
    ua.manualDeleteFillData( editor.body );
    var tds = editor.body.getElementsByTagName( 'td' );
    tds[1].innerHTML = 'hello';
    range.setStart( tds[0], 0 ).collapse( true ).select();
    editor.execCommand( 'mergeright' );
    var tr = editor.body.getElementsByTagName( 'tr' )[0];
    equal( $( tr.firstChild ).attr( 'colspan' ), '2', '跨度2列' );
    editor.execCommand( 'splittocols' );
    ua.manualDeleteFillData( editor.body );
    tds = editor.body.getElementsByTagName( 'td' );
    //1.2版本，合并拆分之后hello前多了空的占位符
    ok( tds[0].innerHTML == 'hello' || tds[0].innerHTML == "​hello", '第一个单元格中有内容' );
    ok( tds[1].innerHTML == '' || tds[1].innerHTML == '<br>', '第二个单元格中有内容' );
} );


/*trace 743*/

test( '合并单元格后删除列再撤销', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:4,numRows:4} );
    ua.manualDeleteFillData( editor.body );
    var trs = editor.body.getElementsByTagName( 'tr' );
    range.selectNode( trs[0] ).select();

/*range是假选，必须得显式地在数组currentSelectedArr里设置*/

//ie中不允许用Array.prototype.slice.call将NodeList转化为数组    editor.currentSelectedArr = Array.prototype.slice.call( trs[0].children, 0 );
    for ( var index = 0; index < trs[0].childNodes.length; index++ )
        editor.currentSelectedArr.push( trs[0].childNodes[index] );
    editor.execCommand( 'mergecells' );

    range.setStart( trs[0].firstChild, 0 ).collapse( true ).select();
    editor.currentSelectedArr = [trs[0].firstChild];
    editor.execCommand( 'deleterow' );
    trs = editor.body.getElementsByTagName( 'tr' );
    equal( trs.length, 3, '删除后只剩3个tr' );
    editor.undoManger.undo();
    trs = editor.body.getElementsByTagName( 'tr' );
    equal( trs.length, 4, '撤销后有4个tr' );
    equal( $( trs[0].firstChild ).attr( 'colspan' ), 4, '第一行的第一个单元格colspan为4' );
} );


/*trace 726*/

test( '选中合并过的单元格和普通单元格，查看完全拆分单元格菜单是否高亮', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:4,numRows:4} );
    ua.manualDeleteFillData( editor.body );
    var trs = editor.body.getElementsByTagName( 'tr' );
    range.selectNode( trs[0] ).select();

/*range是假选，必须得显式地在数组currentSelectedArr里设置*/

    for ( var index = 0; index < trs[0].childNodes.length; index++ )
        editor.currentSelectedArr.push( trs[0].childNodes[index] );
    editor.execCommand( 'mergecells' );
    equal( editor.queryCommandState( 'splittocells' ), 0, '应当可以拆分单元格' );
    range.selectNode( trs[0].parentNode ).select();

/*选中所有的tr*/

    for ( index = 0; index < trs[0].childNodes.length; index++ )
        editor.currentSelectedArr.push( trs[index] );
    editor.queryCommandState( 'splittocells' )
    equal( editor.queryCommandState( 'splittocells' ), -1, '应当不可以拆分单元格' );
} );


/*trace 718*/

test( '2次撤销删除列', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:4,numRows:4} );
    ua.manualDeleteFillData( editor.body );
    var trs = editor.body.getElementsByTagName( 'tr' );
    range.setStart( trs[0].firstChild.nextSibling, 0 ).setEnd( trs[1].lastChild.previousSibling, 0 ).select();
    editor.currentSelectedArr = [trs[0].childNodes[1],trs[0].childNodes[2],trs[1].childNodes[1],trs[1].childNodes[2]];
    editor.execCommand( 'mergecells' );
    equal( $( trs[0].childNodes[1] ).attr( 'rowspan' ), 2, 'rowspan 为2' );
    equal( $( trs[0].childNodes[1] ).attr( 'colspan' ), 2, 'colspan 为2' );
    editor.execCommand( 'deletecol' );
    equal( trs[0].childNodes.length, 2, '2个td' );
    editor.undoManger.undo();
    trs = editor.body.getElementsByTagName( 'tr' );
    equal( trs[0].childNodes.length, 4, '4个td' );
    equal( $( trs[0].childNodes[1] ).attr( 'rowspan' ), 2, 'rowspan 为2' );
    equal( $( trs[0].childNodes[1] ).attr( 'colspan' ), 2, 'colspan 为2' );
    editor.execCommand( 'deletecol' );
    equal( trs[0].childNodes.length, 2, '2个td' );
    equal( $( trs[0].childNodes[1] ).attr( 'rowspan' ), 1, 'rowspan 为1' );
    ok( $( trs[0].childNodes[1] ).attr( 'colspan' ) == undefined || $( trs[0].childNodes[1] ).attr( 'colspan' ) == 1, 'colspan为1或者undefined' )
} );


/*trace 713*/

test( '合并最后一列单元格后再前插入列', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:3,numRows:3} );

    var trs = editor.body.getElementsByTagName( 'tr' );
    range.setStart( trs[0].children[2], 0 ).setEnd( trs[2].children[2], 0 ).select();
    editor.currentSelectedArr = [trs[0].children[2],trs[1].children[2],trs[2].children[2]];

/*合并最后一列的单元格*/

    editor.execCommand( 'mergecells' );
    equal( $( trs[0].childNodes[2] ).attr( 'rowspan' ), 3, '跨3行' );

/*前插入列*/

    editor.execCommand( 'insertcol' );
    trs = editor.body.getElementsByTagName( 'tr' );
    equal( trs[0].childNodes.length, 4, '4列' );
    equal( $( trs[0].childNodes[3] ).attr( 'rowspan' ), 3, '跨3行' );
} );

/*trace 1098 */

test( 'trace 1098:多次合并单元格偶切换到源码再切回来', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:2,numRows:3} );
    var trs = editor.body.getElementsByTagName( 'tr' );
//TODO  bug一直未修复
    editor.currentSelectedArr = [trs[0].children[0],trs[1].children[0],trs[2].children[0]];
//    editor.execCommand( 'mergecells' );
//
//    editor.currentSelectedArr = [trs[0].children[1],trs[1].children[1]];
//    editor.execCommand( 'mergecells' );
//    editor.execCommand( 'source' );
//    editor.execCommand( 'source' );
//    stop();
//    setTimeout( function() {
        trs = editor.body.getElementsByTagName( 'tr' );

/*bug中切换源码后只剩2个tr了*/

//        equal( trs.length, 3, '3个tr' );
//        equal( trs[0].childNodes[0].rowspan, 3, '第一个单元格rowspan 3' );
//        equal( trs[0].childNodes[1].rowspan, 2, '第二个单元格rowspan 3' );
//        for ( var index = 0; index < trs.length; index++ ) {
//            equal( trs[index].childNodes.length, 3, '3个td' );
//        }
//        start();
//    }, 50 );


} );
/*trace 1307*/

test( 'trace 1307:adjustTable--多次合并单元格切换到源码再切回来--选中单元格浏览器会假死', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p></p>' );
    range.setStart( editor.body.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'inserttable', {numCols:4,numRows:4} );
    var trs = editor.body.getElementsByTagName( 'tr' );

    editor.currentSelectedArr = [trs[1].children[0],trs[1].children[1],trs[2].children[0],trs[2].children[1],trs[3].children[0],trs[3].children[1]];
    editor.execCommand( 'mergecells' );
//TODO 注释不过的用例
//    editor.currentSelectedArr = [trs[0].children[2],trs[1].children[2],trs[2].children[2]];
//    editor.execCommand( 'mergecells' );
//
//    editor.execCommand( 'source' );
//    editor.execCommand( 'source' );
//    trs = editor.body.getElementsByTagName( 'tr' );
//    */
/*adjustTable的问题，切换到源码再切换回来后td插入到tr中的位置错了
//     * 1197行，直接在tr后面append不显示（display=none）的td，而实际上应当将这个td放在倒数第二个位置*/

//    equal( $( trs[1].childNodes[1] ).attr( 'rootRowIndex' ), 1, '（1,1）行索引' );
//    equal( $( trs[1].childNodes[1] ).attr( 'rootCellIndex' ), 0, '（1,1）列索引' );
//
////    equal( $( trs[1].childNodes[2] ).attr( 'rootRowIndex' ), 0, '（1,2）行索引' );
////    equal( $( trs[1].childNodes[2] ).attr( 'rootCellIndex' ), 2, '（1,2）列索引' );
//
//    equal( $( trs[2].childNodes[2] ).attr( 'rootRowIndex' ), 0, '（2,2）行索引' );
//    equal( $( trs[2].childNodes[2] ).attr( 'rootCellIndex' ), 2, '（2,2）列索引' );
//
//    equal( $( trs[2].childNodes[0] ).attr( 'rootRowIndex' ), 1, '（2,0）行索引' );
//    equal( $( trs[2].childNodes[0] ).attr( 'rootCellIndex' ), 0, '（2,0）列索引' );
//
//    equal( trs[1].childNodes[0].rowspan, 3, '第二行第一个单元格rowspan 3' );
//    equal( trs[1].childNodes[0].colspan, 2, '第二行第一个单元格colspan 2' );
//    equal( trs[0].childNodes[2].rowspan, 3, '第一行第三个单元格rowspan 3' );
//    equal( trs.length, 4, '4个tr' );
//    for ( var index = 0; index < trs.length; index++ ) {
//        equal( trs[index].childNodes.length, 4, '4个td' );
//    }

} );
