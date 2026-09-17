# 🎨 SAFI APP 

![Safi Banner](./assets/banner.png)  
<!-- Replace with your actual banner image path -->

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)  
![Made with Love](https://img.shields.io/badge/made%20with-love-red.svg)  

---

## 🌍 Overview  

**Safi** is a **social + blockchain-powered creative hub** where artists and fans connect.  
Creators can upload art, music, or videos, engage with audiences, and optionally mint **ownership certificates** (NFTs) on **Hedera** to prove authenticity and earn **royalties on resales**.  

Unlike traditional marketplaces, Safi focuses on **community, culture, and protection of creativity**.  

---

## ✨ Features  

- 👥 **Social Layer**: Feeds, likes, comments, and follows.  
- 🎶 **Content Uploads**: Photos, audio, and video support.  
- 💰 **Tips & Support**: Fans can tip creators both off-chain and on-chain (HBAR).  
- 🖼️ **Ownership Certificates**: Mint NFTs on Hedera for proof of authenticity.  
- 🔗 **Provenance**: Immutable ownership history powered by Hedera Mirror Node.  
- 🔒 **Authentication**: Email/Google login, with wallet connect for Web3 actions.  

---

## ⚙️ Tech Stack  

- **Frontend** → Next.js, TailwindCSS, Three.js (for landing animations).  
- **Backend** → Node.js (Express), MongoDB, IPFS.  
- **Blockchain** → Hedera Hashgraph (Token Service + Mirror Node).  
- **Auth** → JWT + Google OAuth.  

---

## 📂 Project Structure  

```

safi/
│── frontend/      # Next.js + Tailwind frontend
│── backend/       # Express + MongoDB + Hedera integration
│── assets/        # Images, logos, and banner
│── README.md      # Project documentation

````

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js v18+  
- MongoDB (local or Atlas)  
- Hedera Testnet account & operator keys  
- Pinata/Helia (IPFS for file uploads)  

### Setup  

```bash
# Clone the repo
git clone https://github.com/bahatijacklee/safi.git
cd safi

# Install dependencies for frontend and backend
cd frontend
npm install
cd ../backend
npm install 
````

---

## 🔑 Environment Variables

Create a `.env` file in `safi/` with:

```bash
SUPERBASE_URL=your_SuperBase_connection_string
JWT_SECRET=your_jwt_secret
HEDERA_OPERATOR_ID=0.0.xxxxx
HEDERA_OPERATOR_KEY=302e...
IPFS_API_KEY=your_pinata_key
```

---

## 🧩 Roadmap

* [x] MVP: Upload + Social features
* [x] Basic NFT Minting on Hedera Testnet
* [ ] Provenance Explorer integration
* [ ] Advanced royalties dashboard
* [ ] Mobile-first PWA

---

## 👨‍💻 Team

Currently led by **Bahati Jacklee** ([@jacklee](https://twitter.com/bahati_jacklee)).
I’m now looking for a **backend developer** to join the journey — if you’re passionate about **Web3, social apps, and empowering creators**, let’s collaborate!

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Support

If you like this project, give it a ⭐ on GitHub and share it with other creators!


