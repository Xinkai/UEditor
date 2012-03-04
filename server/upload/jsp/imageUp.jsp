<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.util.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.fileupload.FileItemIterator" %>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory" %>
<%@ page import="java.io.BufferedInputStream" %>
<%@ page import="java.io.BufferedOutputStream" %>
<%@ page import="java.io.File"%>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.util.regex.Matcher" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.Date" %>



<%

//保存文件路径
String filePath = "uploadimages";
String realPath = request.getRealPath("\\") + filePath;
//判断路径是否存在，不存在则创建
File dir = new File(realPath);
if(!dir.isDirectory())
    dir.mkdir();

if(ServletFileUpload.isMultipartContent(request)){

    DiskFileItemFactory dff = new DiskFileItemFactory();
    dff.setRepository(dir);
    dff.setSizeThreshold(1024000);
    ServletFileUpload sfu = new ServletFileUpload(dff);
    FileItemIterator fii = sfu.getItemIterator(request);
    String title = "";   //图片标题
    String url = "";    //图片地址
    String fileName = "";
	String state="SUCCESS";
    while(fii.hasNext()){
        FileItemStream fis = fii.next();

        try{
            if(!fis.isFormField() && fis.getName().length()>0){
                fileName = fis.getName();
				Pattern reg=Pattern.compile("[.]jpg|png|jpeg|gif$");
				Matcher matcher=reg.matcher(fileName);
				if(!matcher.find()) {
					state = "文件类型不允许！";
					break;
				}
				
                url = realPath+"\\"+new Date().getTime()+fileName.substring(fileName.lastIndexOf("."),fileName.length());

                BufferedInputStream in = new BufferedInputStream(fis.openStream());//获得文件输入流
                FileOutputStream a = new FileOutputStream(new File(url));
                BufferedOutputStream output = new BufferedOutputStream(a);
                Streams.copy(in, output, true);//开始把文件写到你指定的上传文件夹
            }else{
                String fname = fis.getFieldName();

                if(fname.indexOf("pictitle")!=-1){
                    BufferedInputStream in = new BufferedInputStream(fis.openStream());
                    byte c [] = new byte[10];
                    int n = 0;
                    while((n=in.read(c))!=-1){
                        title = new String(c,0,n);
                        break;
                    }
                }
            }

        }catch(Exception e){
            e.printStackTrace();
        }
    }
	title = title.replace("&", "&amp;").replace("'", "&qpos;").replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;");
    response.getWriter().print("{'url':'"+filePath+"/"+fileName+"','title':'"+title+"','state':'"+state+"'}");

}
%>
