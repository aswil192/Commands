for normal scan
```
nmap -sV -O -T4 --min-rate=10000 $ip
```

all ports scan
```
nmap -sV -O -T4 -p- --min-rate=10000 $ip
```

scanning a specific port
```
nmap -sC -sV -Pn -p <port> $ip
```
