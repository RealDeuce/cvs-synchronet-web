// Basic FormMail script, emulates Matt's FormMail.pl Script

// $Id: formmail.ssjs,v 1.6 2005/03/12 13:11:00 rswindell Exp $

load("sbbsdefs.js");

// List of supported 'hidden' field (not included in body text)
var hidden_fields = {
	recipient:1,
	redirect:1,
	subject:1
};

http_reply.fast = true;

var redir = http_request.query.redirect;
if(!redir)
	redir = http_request.header.referer;

function results(level, text)
{
	log(level,text);
	writeln("<html>");
	writeln("<head>");
	writeln("<title>Sending e-mail</title>");
	writeln("</head>");

	writeln("<body>");
	writeln("<center>");
	if(level<=LOG_WARNING)
		writeln("!ERROR: ".bold());
	writeln(text);
	writeln("<p>");
	writeln(("Click here to return to " + String(redir).italics()).link(redir));
	writeln("</body>");
	writeln("</html>");
	exit();
}

var msgbase=new MsgBase("mail");
if(!msgbase.open())
	results(LOG_ERR,format("%s opening mail base", msgbase.error));

var hdr = { from: 'FormMail',
			to: 'Sysop',
			subject: 'WWW Form Submission' };

// Use form-specified recipient
if(http_request.query.recipient)	hdr.to				=http_request.query.recipient;

// Use form-specified message subject
if(http_request.query.subject)		hdr.subject			=http_request.query.subject;

// Use form-specified email address
if(http_request.query.email) {		hdr.from_net_addr	=http_request.query.email;
									hdr.from			=http_request.query.email; }

// Use form-specified real name
if(http_request.query.realname)		hdr.from			=http_request.query.realname;

hdr.to_net_type=netaddr_type(hdr.to);
if(hdr.to_net_type!=NET_NONE)
	hdr.to_net_addr=hdr.to;
else {
	var usrnum=system.matchuser(hdr.to);
	if(usrnum==0)
		results(LOG_ERR,"bad local username specified: " + hdr.to);
	hdr.to_ext=usrnum;
}

var i;
var body="Form fields follow:\r\n\r\n";
for(i in http_request.query) {
	if(hidden_fields[i])
		continue;
	if(http_request.query[i].length)
		body += format("%-10s = %s\r\n", i, http_request.query[i]);
}
	
if(!msgbase.save_msg(hdr,client,body))
	results(LOG_ERR,format("%s saving message", msgbase.error));

results(LOG_INFO,"E-mail sent to " + String(hdr.to).italics().bold() + " successfully.");