/* $Id: picktheme.ssjs,v 1.10 2006/02/01 00:10:21 runemaster Exp $ */

/* 
 * Write new theme file BEFORE loading the template lib so the
 * new theme is used here
 */

prefs_dir=system.data_dir + 'user/';

var sub='';

var sq="'";
var dq='"';
var pl='+';
prefsfile=new File(prefs_dir +format("%04d.html_prefs",user.number));
if(prefsfile.open("r+",false)) {
  ctheme=http_request.query.theme[0];
  ctheme=ctheme.replace(/"/g,dq+pl+sq+dq+sq+pl+dq);   /* "+'"'+" */
  prefsfile.iniSetValue('WebTheme', 'CurrTheme', ctheme);
  prefsfile.close();
} else {
if(prefsfile.open("w+",false)) {
  ctheme=http_request.query.theme[0];
  ctheme=ctheme.replace(/"/g,dq+pl+sq+dq+sq+pl+dq);   /* "+'"'+" */
  prefsfile.iniSetValue('WebTheme', 'CurrTheme', ctheme);
  prefsfile.close();
  }
}

load('../web/lib/template.ssjs');
template.theme=Themes[CurrTheme];

if(do_header)
	write_template("header.inc");
if(do_topnav)
	load("../web/lib/topnav_html.ssjs");
if(do_leftnav)
	load("../web/lib/leftnav_html.ssjs");
if(do_rightnav)
	write_template("rightnav.inc");
write_template("picktheme.inc");
if(do_footer)
	write_template("footer.inc");
