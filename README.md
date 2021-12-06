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
- Backend
  - Compressed
  - Added Headers for security(Helmet)
  - Protect against http param polution
  - Use cors to make API public

### How to use

---

1. Clone repo

```sh
git clone https://github.com/imsamad/ecart
git checkout dev
```

2. Install packages

```sh
cd combine
npm run bootup
```

3. Rename env files

```sh
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

- [ ] Dockerise
- [ ] Serve Image from third-party.
- [ ] Mention deploy strategies
- [ ] Define file structure
- [ ] Add PayPal payment guide
- [ ] Add Objective of app
