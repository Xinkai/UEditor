/**
 * Created by JetBrains PhpStorm.
 * User: taoqili
 * Date: 12-1-30
 * Time: 下午12:50
 * To change this template use File | Settings | File Templates.
 */
var wordImage = {};
//(function(){
var g = baidu.g,
	flashObj;
wordImage.init = function(opt, callbacks) {
	showLocalPath("localPath");
	//createCopyButton("clipboard","localPath");
	createFlashUploader(opt, callbacks);
	addUploadListener();
	addOkListener();
}

function addOkListener() {
	dialog.onok = function() {
		if (!imageUrls.length) return;
		var images = editor.document.getElementsByTagName("img");
		for (var i = 0,img; img = images[i++];) {
			var src = img.getAttribute("word_img");
			if (!src) continue;
			for (var j = 0,url; url = imageUrls[j++];) {
				if (src.indexOf(url.title) != -1) {
					img.src = editor.options.imagePath + url.url;
					img.setAttribute("data_ue_src", editor.options.imagePath + url.url);  //同时修改"data_ue_src"属性
					parent.baidu.editor.dom.domUtils.removeAttributes(img, ["word_img","style","width","height"]);
					editor.fireEvent("selectionchange");
					break;
				}
			}
		}
	}
}

/**
 * 绑定开始上传事件
 */
function addUploadListener() {
	g("upload").onclick = function () {
		flashObj.upload();
		this.style.display = "none";
	};
}

function showLocalPath(id) {
	var path = editor._localImages[0],
		separater = parent.UE.browser.ie ? "\\" : "/";

	path = path.substring(0, path.lastIndexOf(separater));
	g(id).value = path;
}


function createFlashUploader(opt, callbacks) {
	var option = {
		createOptions:{
			id:'flash',
			url:opt.flashUrl,
			width:opt.width,
			height:opt.height,
			errorMessage:'Flash插件初始化失败，请更新您的FlashPlayer版本之后重试！',
			wmode:'window',
			ver:'10.0.0',
			vars:opt,
			container:opt.container
		}
	};
	option = extendProperty(callbacks, option);
	flashObj = new baidu.flash.imageUploader(option);
}

function extendProperty(fromObj, toObj) {
	for (var i in fromObj) {
		if (!toObj[i]) {
			toObj[i] = fromObj[i];
		}
	}
	return toObj;
}

//})();

function getPasteData(id) {
	baidu.g("msg").innerHTML = "　图片地址已复制成功！</br>";
	setTimeout(function() {
		baidu.g("msg").innerHTML = "";
	}, 5000);
	return baidu.g(id).value;
}

function createCopyButton(id, dataFrom) {
	baidu.swf.create({
			id:"copyFlash",
			url:"fClipboard_ueditor.swf",
			width:"58",
			height:"25",
			errorMessage:"",
			bgColor:"#CBCBCB",
			wmode:"transparent",
			ver:"10.0.0",
			vars:{
				tid:dataFrom
			}
		}, id
	);

	var clipboard = baidu.swf.getMovie("copyFlash");
	var clipinterval = setInterval(function() {
		if (clipboard && clipboard.flashInit) {
			clearInterval(clipinterval);
			clipboard.setHandCursor(true);
			clipboard.setContentFuncName("getPasteData");
			//clipboard.setMEFuncName("mouseEventHandler");
		}

	}, 500);
}
createCopyButton("clipboard", "localPath");