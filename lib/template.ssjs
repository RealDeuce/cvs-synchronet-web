/*****************************************************************************/
/* SSJS templating library													 */
/* %%name%% is replaced with the HTML encoded value of template.name		 */
/* ^^name^^ is replaced with the URI encoded value of template.name			 */
/* @@name@@ is replaced with the value if template.name						 */
/* 																			 */
/* @@name:sname@@ is replaced with the value of template.name.sname			 */
/* (^^ and %% are also supported)											 */
/* 																			 */
/* @@JS:js_expression@@ is replaced with the return value of js_expression 	 */
/* (^^ and %% are also supported)											 */
/* 																			 */
/* <<REPEAT name>>															 */
/* ... @@name:sname@@ ...													 */
/* <<END REPEAT name>>														 */
/* 																			 */
/* Iterates over the array/object template.name and replaces name:sname with */
/* the value of template.name.sname.										 */
/* (^^ and %% are also supported)											 */
/*																			 */
/*****************************************************************************/

/* $Id: template.ssjs,v 1.5 2004/11/23 00:17:16 deuce Exp $ */

template=new Object;

function write_template(filename)  {
	var inc=new File(system.text_dir+"html_templates"+'/'+filename);
	if(!inc.open("r",true,1024)) {
		horrible_error("Cannot open template file "+system.text_dir+"html_templates"+'/'+filename+"!");
	}
	var file='';
	while(! inc.eof)  {
		file=file += inc.read(1024);
	}
	inc.close();
	file=file.replace(/<<REPEAT (.*?)>>([\x00-\xff]*?)<<END REPEAT \1>>/g,
		function(matched, objname, bit, offset, s) {
			var ret='';
			for(obj in template[objname]) {
				ret += parse_regular_bit(bit, objname, template[objname][obj]);
			}
			return(ret);
		});
	file=parse_regular_bit(file, "", template);
	write(file);
}

function parse_regular_bit(bit, objname, obj) {
if(bit.match(/\)JS:/)) {
	write("<PLAINTEXT>1:"+bit);
}
	if(objname=="JS")
		return(bit);
	bit=bit.replace(new RegExp('([%^@])\\1'+objname+':([^^%@\r\n]*?)\\1\\1',"g"),
		function (matched, start, exp, offset, s) {
			var res=matched;
			if(obj[exp]!=undefined)
				res=escape_match(start, obj[exp]);
			return(res);
		});
	if(objname=='') {
		bit=bit.replace(/([%^@])\1([^^%@\r\n]*?)\:([^:%^@\r\n]*?)\1\1/g,
			function (matched, start, objname, prop, offset, s) {
				var res=matched;
				if(template[objname]!=undefined)
					res=escape_match(start, template[objname][prop]);
				return(res);
			});
		bit=bit.replace(/([%^@])\1([^:^%@\r\n]*?)\1\1/g,
			function (matched, start, exp, offset, s) {
				var res=escape_match(start, template[exp]);
				return(res);
			});
		bit=bit.replace(/([%^@])\1JS:([\x00-\xff]*?)\1\1/g,
			function (matched, start, exp, offset, s) {
				var res=escape_match(start, eval(exp));
				return(res);
			});
		bit=bit.replace(/([%^@])\1(.*?)\1\1/g,'');
	}
	return bit;
}

function escape_match(start, exp, end)  {
	if(exp==undefined)
		exp='';
	if(start=="%")
		exp=html_encode(exp,false,false,false,false);
	if(start=="^")
		exp=encodeURIComponent(exp);
	return(exp);
}

function error(message)  {
	template.title="Error";
	template.err=message;
	write_template("header.inc");
	write_template("error.inc");
	write_template("footer.inc");
	exit();
}

function horrible_error(message) {
	write("<HTML><HEAD><TITLE>ERROR</TITLE></HEAD><BODY><p>"+message+"</p></BODY></HTML>");
}
