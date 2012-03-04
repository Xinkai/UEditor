///import core
///commands 添加分页功能
///commandsName  PageBreak
///commandsTitle  分页
/**
 * @description 添加分页功能
 * @author zhanyi
 */
UE.plugins['pagebreak'] = function () {
    var me = this,
        notBreakTags = ['td'];
    //重写了Editor.hasContents
    var hasContentsOrg = me.hasContents;
    me.hasContents = function (tags) {
        for (var i = 0, di, divs = me.document.getElementsByTagName('div'); di = divs[i++];) {
            if (domUtils.hasClass(di, 'pagebreak')) {
                return true;
            }
        }
        return hasContentsOrg.call(me, tags);
    };
    me.commands['pagebreak'] = {
        execCommand:function () {

            var range = me.selection.getRange(),div = me.document.createElement('div');
            div.className = 'pagebreak';
            domUtils.unselectable(div);
            //table单独处理
            var node = domUtils.findParentByTagName(range.startContainer, notBreakTags, true),

                parents = [], pN;
            if (node) {
                switch (node.tagName) {
                    case 'TD':
                        pN = node.parentNode;
                        if (!pN.previousSibling) {
                            var table = domUtils.findParentByTagName(pN, 'table');
                            table.parentNode.insertBefore(div, table);
                            parents = domUtils.findParents(div, true);

                        } else {
                            pN.parentNode.insertBefore(div, pN);
                            parents = domUtils.findParents(div);

                        }
                        pN = parents[1];
                        if (div !== pN) {
                            domUtils.breakParent(div, pN);
                        }


                        domUtils.clearSelectedArr(me.currentSelectedArr);
                }

            } else {

                if (!range.collapsed) {
                    range.deleteContents();
                    var start = range.startContainer;
                    while (domUtils.isBlockElm(start) && domUtils.isEmptyNode(start)) {
                        range.setStartBefore(start).collapse(true);
                        domUtils.remove(start);
                        start = range.startContainer;
                    }

                }
                range.insertNode(div);

                var pN = div.parentNode, nextNode;
                while (!domUtils.isBody(pN)) {
                    domUtils.breakParent(div, pN);
                    nextNode = div.nextSibling;
                    if (nextNode && domUtils.isEmptyBlock(nextNode)) {
                        domUtils.remove(nextNode)
                    }
                    pN = div.parentNode;
                }

                range['setEnd' + (div.nextSibling ? 'After' : 'Before')](div).setCursor(true, true)

            }

        },
        queryCommandState:function () {
            return this.highlight ? -1 : 0;
        }
    }
};