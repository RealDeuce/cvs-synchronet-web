<!-- $Id: leftnav.inc,v 1.1 2006/02/22 02:16:17 runemaster Exp $ -->

<!-- Begin Left Nav -->

	<div id="navcontainer">
		<div id="navigation">
		<h4>Navigation</h4>
			<ul>
                <li><a href="/nodelist.ssjs">Who's Online</a></li><<REPEAT leftnav>>@@leftnav:html@@<<END REPEAT leftnav>><li><a href="@@ftp_url@@%%ftpidx%%">File Libraries</a></li></ul>
		</div>
	</div>
	
<!-- End Left Nav -->