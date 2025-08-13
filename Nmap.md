for normal scan
```
nmap -sV -O -T4 --min-rate=10000 $ip
```

all ports scan
```
nmap -sV -O -T4 -p- --min-rate=10000 $ip
```

