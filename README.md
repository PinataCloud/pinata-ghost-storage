## Pinata Ghost Storage Adapter 

This storage adapter allows you to customize your self-hosted Ghost instance to store media on [Pinata](https://pinata.cloud). Pinata is an [IPFS](https://ipfs.io) media platform. 

### How To Use 

In the directory where you're running your local instance of Ghost, run the following: 

```
mkdir -p ./content/adapters/storage
```

Change into that new directory: 

```
cd contact/adapters/storage
```

Clone this repository: 

```
git clone https://github.com/PinataCloud/pinata-ghost-storage
```

Change into the newly cloned repo: 

```
cd pinata-ghost-storage
```

Install dependencies: 

```
npm i
```

Now, you need to configure your Ghost environment. Back at the root of the directory where Ghost is running, find your `config.development.json` (or staging or production if you have multiple config files) and open it in a code editor. Add the following to the main config object: 

```json
  "storage": {
    "active": "pinata-ghost-storage",
    "pinata-ghost-storage": {
      "gatewayUrl": "https://yourgatewayurl.com", 
      "pinataKey": "Pinata API Key", 
      "pinataSecret": "Pinata API Secret"
    }
  },
```

You can get an API key and secret by signing up for Pinata and going to the API Keys page. The Gateway URL should either be a Dedicated Gateway through Pinata or a public gateway. Note: if you use a public gateway, performance will be significantly slower than when using a Dedicated Gateway. 

Save the config file, then restart your local Ghost instance to apply the changes. 