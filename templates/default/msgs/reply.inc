<form action="savemsg.ssjs" method="post">
<table class="replymsg" border="0" cellspacing="2" cellpadding="0">
<input type="hidden" name="msg_sub" value="%%sub:code%%" />
<input type="hidden" name="reply_to" value="%%number%%" />
  <tbody>
    <tr>
      <td class="replymsg">Subject: <input class="replymsg" type="text" name="subject" value="%%subject%%" /></td>
      <td class="replymsg">To: <input class="replymsg" type="text" name="to" value="%%from%%" /></td>
    </tr>
    <tr>
      <td class="replymsg" colspan="2"><textarea class="replymsg" name=body rows="20" cols="80" wrap="hard">%%body%%</textarea></td>
      </tr>
    <tr>
      <td align="center" class="replymsg" colspan="2"><input type="submit" value="Post Reply" /></td>
    </tr>
  </tbody>
</table>
</form>