load("html_inc/msgslib.ssjs");

if(msgbase.open!=undefined && msgbase.open()==false) {
	error(msgbase.last_error);
}

template.group=msg_area.grp_list[g];

if(sub=='mail') {
	template.sub=new Object;
	template.sub.description="Personal E-Mail";
	template.sub.code="mail";
}
else {
	template.sub=msg_area.grp_list[g].sub_list[s];
}

template.hdr=msgbase.get_msg_header(false,m);
template.body=msgbase.get_msg_body(false,m,true,true);

if(template.body.indexOf('\x1b[')>=0 || template.body.indexOf('\x01')>=0)
	template.body=html_encode(body,true,false,true,true);
else  {
	template.body=word_wrap(template.body,79);
	template.body=html_encode(template.body,true,false,false,false);
}

if(template.hdr != null)  {
	template.title="Message: "+template.hdr.subject;
}
write_template("header.inc");
write_template("msgs/msg.inc");
write_template("footer.inc");
