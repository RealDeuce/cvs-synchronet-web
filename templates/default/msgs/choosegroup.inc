<!-- $Id: choosegroup.inc,v 1.1 2005/03/24 15:16:17 runemaster Exp $ -->

<!-- Main Content -->  
    
    <td class="main" valign="top"><br />

<table class="grouplist" border="0" cellpadding="2" cellspacing="2">
<tr>
<th class="grouplist">Message Group</th><th class="grouplist">Subs</th>
</tr>
<<REPEAT groups>>
<tr>
    <td class="grouplist"><a class="grouplist" href="choosesubs.ssjs?msg_grp=^^groups:name^^">%%groups:description%%</a></td>
    <td class="grouplist" align="right">@@JS:msg_area.grp_list['@@groups:index@@'].sub_list.length@@</td>
</tr>
<<END REPEAT groups>>
</table>
<br />

<!-- end Main Content -->

