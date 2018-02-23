# WAT

Block chain for cars ledger


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

## get all chain
```bash
nodemon -w ./ -e js -x curl 'http://localhost:3008/chain' -H 'Content-Type: application/json' -d 2
```

## add to chain
```bash
nodemon -w ./ -e js -x curl 'http://localhost:3008/chain' -H 'Content-Type: application/json'  --data-binary '@src/private/approved.json' -d 2  
```

## theres also way to upload docs to chain
but i will not mention it in readme

