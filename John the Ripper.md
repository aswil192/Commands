using rockyou
```
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

specific user's hash
```
john --user=root hash.txt
```

crack a md5hash
```
echo <hash> > hash.txt && john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

for zip cracking
```
zip2john <filename>.zip > hash.txt
john hash.txt
```

for rar cracking
```
rar2john <filename>.rar > hash.txt
john hash.txt
```
