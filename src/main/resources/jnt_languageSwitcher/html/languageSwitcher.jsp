<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="ui" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>

<c:set var="linkKind" value="${currentNode.properties.typeOfDisplay.string}"/>
<c:set var="flag" value="${linkKind eq 'flag'}"/>
<ui:initLangBarAttributes activeLanguagesOnly="${renderContext.liveMode}"/>

<ul class=lang>
  <c:forEach items="${requestScope.languageCodes}" var="language">
    <ui:displayLanguageSwitchLink languageCode="${language}" display="false" urlVar="switchUrl"
                                  var="renderedLanguage"
                                  linkKind="${currentNode.properties.typeOfDisplay.string}"/>
    <c:if test="${flag}">
      <c:set var="renderedLanguage">
        <span class='flag ${functions:getLanguageFlagCSSClass(functions:toLocale(language))}'></span>
      </c:set>
    </c:if>
    
    <c:choose>
      <c:when test="${language eq currentResource.locale}">
        <li class="active"><span>${renderedLanguage}</span></li>
      </c:when>
      <c:otherwise>
        <li><a title="<fmt:message key='switchTo'/>"
               href="<c:url context='/' value='${switchUrl}'/>">${renderedLanguage}</a>
        </li>
      </c:otherwise>
    </c:choose>
  </c:forEach>
</ul>

