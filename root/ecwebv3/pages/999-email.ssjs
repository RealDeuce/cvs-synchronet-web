//HIDDEN
// Private email page for ecwebv3
// echicken -at- bbs.electronicchicken.com

load('webInit.ssjs');
load("../web/lib/forum.ssjs");

if(user.alias != webIni.WebGuest) {

	print("<span class='title'>Email</span><br /><br />");
	print("<div class='border box msg'>");
	print(format(	"<a class='ulLink' onclick='addPost(\"http://%s:%s/%s/forum-async.ssjs\", \"%s\", \"%s\", \"%s\", \"%s\")'>Compose a new email</a>",
					system.inet_addr, webIni.HTTPPort, webIni.appendURL, "mail", user.alias, user.name, ""
		)
	);
	print("<div id='sub-mail-newMsgBox'></div>");
	print("</div>");
	print("<div id='sub-mail' style='display:none;'></div>");
	print("<div id='sub-mail-info' class='border box msg' style='display:none;'></div>");
	print("<script type='text/javascript'>");
	print("loadThreads('http://" + system.inet_addr + ":" + webIni.HTTPPort + "/forum-async.ssjs', 'mail', " + ((http_request.query.hasOwnProperty('thread'))?false:true) + ");");
	if(http_request.query.hasOwnProperty('thread'))
		print("loadThread('http://" + system.inet_addr + ":" + webIni.HTTPPort + "/forum-async.ssjs', 'mail', '" + http_request.query.thread + "', " + false + ");");
	print("</script>");

}