# Farcaster MiniApp Extension for SE-2

This extension provides basic functionality to start a Farcaster MiniApp development with [Scaffold-ETH 2](https://scaffoldeth.io)

## Requirements

According to [MiniApp SDK documentation](https://miniapps.farcaster.xyz/docs/getting-started):

Node.js 22.11.0 or higher (LTS version recommended)
- Check your version: ```node --version```
- Download from [nodejs.org](https://nodejs.org)


## Installation

1. Create a new project with MiniApp extension:

```typescript
npx create-eth@latest -e NikolaiL/miniapp
```

and 


2. Copy packages/nextjs/.env.example to packages/nextjs/.env


3. cd to your mini app dir and:


- Run a local network in the first terminal:
```typescript
yarn chain
```

- On a second terminal, deploy the test contract:
```typescript
yarn deploy
```

- On a third terminal, start your NextJS app:
```typescript
yarn start
```

- On a forth terminal, start your ponder devs server:
```typescript
yarn ponder:dev
```

 - On a fifth terminal, start ngrok (or other) externally available tunnel:

```typescript
ngrok http http://localhost:3000 --url https://yoursubdomian.ngrok.dev
```

4. Update NEXT_PUBLIC_URL in packages/nextjs/.env for your domain

5. Go to https://farcaster.xyz/~/developers/mini-apps/preview , enter your app domain and click "Open URL as Mini App"


Your miniapp should load and show your Farcaster Wallet.

![MiniApp Screenshot](images/MiniAppScreenshot.png)


Renders as MiniApp in Farcaster Preview:

<img width="385" height="330" alt="Screenshot 2025-10-18 at 19 44 56" src="https://github.com/user-attachments/assets/3d67091b-7f90-4a0f-a98e-c2a749118856" />


Base App preview:

<img width="372" height="307" alt="Screenshot 2025-10-18 at 19 44 43" src="https://github.com/user-attachments/assets/1e8110fd-1238-4849-816d-4dc45c8fd502" />

And as a cast:

<img width="502" height="448" alt="Screenshot 2025-10-18 at 19 43 49" src="https://github.com/user-attachments/assets/5bc979b9-6efd-42d9-bf1f-71637577f768" />


## TODO

- [x] added ponder 0.14.1  
- [ ] add live query example
- [ ] add MiniApp Demo Page with all available functions
- [x] add readme section about ponder
- [ ] add manifest accountAssociation values generation


## Acknowledgments

Ponder integration is based on the original Ponder extension by [@damianmarti](https://github.com/damianmarti) and [@technophile-04](https://github.com/technophile-04), see [scaffold-eth/create-eth-extensions/tree/ponder](https://github.com/scaffold-eth/create-eth-extensions/tree/ponder).
