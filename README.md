# eCart - E-commerce web app

### Tech stack : MENN (Mongo + Express + Next.js + Node)

---

<h4 align="center">Online Demo at </h4>
<p align="center"><b> <a href="https://ecart.vercel.app">Frontend</a> </b></p>
<p align="center"><b><a href="https://ecartback.herokuapp.com/">Backend</a> </b></p>

### Features

---

- Frontend
  - Pay with PayPal
  - SSR / SSG / ISR / Client-Side Rendering
  - Change Profile
  - Forgot/Reset Password
  - Product Search
  - Checkout page
- Backend
  - Compressed
  - Added Headers for security(Helmet)
  - Protect against http param polution
  - Use cors to make API public
  - Add a rate limit for requests
  - Compress & Cache response data

### How to use
If mongo is installed on machine
```bash
git clone https://github.com/imsamad/ecart && cd combine && npm run bootup && npm run config && npm run seed:i && npm run dev
```
<p align="center">OR</p>
What above cmds are :-
---

1. Clone repo

```bash
git clone https://github.com/imsamad/ecart
```

2. Install packages

```bash
cd combine
npm run bootup
```

3. Rename env files

```bash
npm run config
```

4. Seed Data

```
npm run seed:i
```

5. Spin up server

```

// Dev Server
npm run dev

// Production server
npm start
```

- If & Buts

```
// If Mongo not installed, then
// Open file server/config/.env & set env var

MONGO_URI=

// At frontend ,to enable PayPal service, open client/.env set
// Or can skip to browse every page

PAYPAL_CLIENT_ID=
```

## Todos

- [ ] Dockerise(DevOps-ify)
- [ ] Serve Image from third-party.
- [ ] Mention deploy strategies  
