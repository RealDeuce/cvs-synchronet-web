/* List of HTML theme packs installed */

Themes=new Object;
var CurrTheme="Default";

load(system.text_dir+'html_templates/html_themes.ssjs');

/* Read in current users selected theme if it exists */
if(file_exists(system.data_dir+'user/'+format("%04d.html_theme",user.number)))
	load(system.data_dir+'user/'+format("%04d.html_theme",user.number));

if(Themes[CurrTheme] == undefined || Themes[CurrTheme].dir == undefined)
	CurrTheme="Default";
