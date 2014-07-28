<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  
  	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="img/favicon.ico" type="image/x-icon">
	<link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
  
    <title>${fn:escapeXml(renderContext.mainResource.node.displayableName)}</title>
</head>

<body>

<div class="bodywrapper"><!--start bodywrapper-->
    <template:area path="pagecontent"/>
</div>
<!--stop bodywrapper-->

<c:if test="${renderContext.editMode}">
    <template:addResources type="css" resources="edit.css" />
</c:if>
  
<template:addResources type="css" resources="ie8.css" condition="if lte IE 8" />
  
<template:addResources type="css" resources="
                                             960.css,
                                             01web.css,
                                             jscal2.css,
                                             refin_eventcalendar.css,
                                             bootstrap.css,
                                             main.less"/>
  
<template:addResources type="javascript" resources="html5shiv.js,respond.min.js" condition="if lt IE 9" />

<template:addResources type="javascript" resources="
                                                    ep-intranet.js,
                                                    en.js,
                                                    jscal2.js,
                                                    jquery.popup.js,
                                                    jquery-1.10.1.min.js,
                                                    bootstrap.min.js,
                                                    less-1_7_0_min.js"/>
  
<template:theme/>

</body>
</html>
