<p class="navigation"><a class="navigation" href="http://^^JS:system.inet_addr^^/">Home</a> : <a class="navigation" href="/members/">Members</a> : User List</p>
<table class="userlist" cellpadding="2" cellspacing="2">
<tr>
    <th class="userlist"><a class="userlist" href="userlist.ssjs?sort=alias">Alias</a></th>
    <th class="userlist"><a class="userlist" href="userlist.ssjs?sort=location">Location</a></th>
    <th class="userlist"><a class="userlist" href="userlist.ssjs?sort=connection">Connection</a></th>
    <th class="userlist"><a class="userlist" href="userlist.ssjs?sort=laston">Last On</a></th>
</tr>
<<REPEAT users>>
<tr>
  <td class="userlist">@@users:alias@@</td>
  <td class="userlist">@@users:location@@</td>
  <td class="userlist">@@users:connection@@</td>
  <td class="userlist">@@users:logon@@</td>
</tr>
<<END REPEAT users>>
</table>
