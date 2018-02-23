# WAT

Blockchain for cars ledger


# install
```bash
npm i
```

# run
```bash
nodemon -w ./ -e js -x node src/index.js
```

# test
```
npm test
```

```bash
nodemon -w ./ -e js -x curl 'http://localhost:3008/chain' -H 'Content-Type: application/json'  --data-binary '@src/private/approved.json' -d 2  
```
