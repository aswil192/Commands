with big.txt
```
gobuster dir -u http://$ip -w /usr/share/dirb/wordlists/big.txt -t 300 -x txt,php,html -q
```

with small.txt
```
gobuster dir -u http://$ip -w /usr/share/dirb/wordlists/small.txt -t 300 -x txt,php,html -q
```

with common.txt
```
gobuster dir -u http://$ip -w /usr/share/dirb/wordlists/common.txt -t 300 -x txt,php,html -q
```