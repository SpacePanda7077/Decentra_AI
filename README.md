(https://github.com/user-attachments/files/23260708/README.md)# DeCenter AI — AI Studio for Everyone

![DeCenter AI Logo](https://github.com/DeCenter-AI/.github/assets/131058062/7fceb64d-f875-4d08-b13e-aff561aab234)

# DeCenter AI B2B API Platform

A fast, unified way for businesses to generate API keys and connect to our global network of AI models and agents.

---

## 🚀 Overview
DeCenter AI is a unified AI studio that connects users to thousands of premium AI tools through a Super Agent that intelligently matches every prompt to the most effective model — for just $0.01 per inference.**.

The platform provides developers with easy API access to an **AI network of 400+ models and agents**, powered by **Hedera’s Consensus Service (HCS)** for transparent inference tracking and **Hedera Token Service (HTS)** for seamless microtransactions in **HBAR**.

DeCenter AI bridges **AI & DePIN** — combining smart autonomous AI systems with decentralized infrastructure for trust, scalability, and accessibility.

---

## 🏗️ **Architecture**

**Core Architecture Principles**
- **Agentic:** Intelligent orchestration of AI agent results.  
- **Agnostic:** Accessible from any connected device or platform.  
- **Abstracted:** API-native for seamless integration and deployment.  

**System Flow**
```
Prompt 
 → Super Agent (Model Selection via LangChain/LangGraph)
 → Inference Lifecycle Management (ILM)
 → Hedera Consensus Service (HCS Logging)
 → Output Delivery
```

**Tech Stack**
- Frontend: React / Next.js  
- Backend: Node.js / Express / FastAPI  
- AI Layer: LangChain, LangGraph, OpenAI, Anthropic, Groq, etc.  
- Blockchain Layer: Hedera HCS + HTS for transparency and payments  
- Database: PostgreSQL / MongoDB  

---

## 🌐 **Why Hedera for DeCenter AI**

- **Transparency:** HCS ensures every AI inference is verifiable and tamper-proof.  
- **Microtransactions:** HTS enables pay-per-inference pricing in **HBAR**.  
- **Efficiency:** Hedera’s low-cost, carbon-negative network supports affordable large-scale AI operations.  
- **Trust Layer:** Hedera provides decentralized auditability for AI decision-making and logging.

---

## ⚡ **Quick Start**

### 1. Clone the Repository
```bash
git clone https://github.com/decenter-ai/decenter-ai.git
cd decenter-ai
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

---

## ⚙️ **Edit `.env`**

Create a `.env` file in the project root with the following variables:

```
# Backend Configuration
PORT=5000
MONGO_URI=
POSTGRES_URI=
JWT_SECRET=

# AI Configuration
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GROQ_API_KEY=

# Hedera Configuration
HEDERA_ACCOUNT_ID=
HEDERA_PRIVATE_KEY=
HEDERA_NETWORK=testnet
HTS_TOKEN_ID=

# Payment / Billing
INFERENCE_PRICE=0.01
```

---

## 🧠 **Repo Overview**

```
decenter-ai/
│
├── frontend/              # React / Next.js client
│   ├── components/
│   ├── pages/
│   └── styles/
│
├── backend/               # Node.js / Express API
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── utils/
│
├── ai-agent/              # LangChain + Hedera integration layer
│   ├── agent.py
│   ├── ilm_manager.py
│   └── hedera_client.py
│
└── README.md
```

---

## 💻 **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## 🧩 **Backend Setup**

```bash
cd backend
npm install
npm run dev
```

The backend runs on [http://localhost:5000](http://localhost:5000)


---

## 🚀 **Deployment**

### **Frontend Deployment**
```bash
vercel --prod
# or deploy on Netlify
```

### **Backend Deployment**
```bash
docker build -t decenter-ai-backend .
docker run -p 5000:5000 decenter-ai-backend
# or deploy via Render / Railway / AWS
```

### **Environment Setup for Production**
- Switch `HEDERA_NETWORK` to `testnet`.
- Update API keys and HTS token for live transactions.


---
## 🔑 Generating an API Key

Add the shared wallet using this Private Key to access the platform 
0x411caf28d09f8ba5893906179b2fc520c4f123f7f8f4625b79362089676b49fe

Then follow these steps to create and use your API key: 

1. **Sign in** with your wallet on https://decenter-ai-venturethon.vercel.app/ 
2. Go to the **API** page.  
3. Click **Generate API**, then enter the requested details.  
4. Click **Generate**.  
5. Your API key will be created in seconds—**copy and use it**.

---

## 🧪 Testing Inference Capabilities

To test the inferencing power of the DeCenter AI Network:

1. Go to the **Playground** page.  
2. Type in a **prompt**.  
3. Hit **Send**.  
4. Watch the AI model/agent respond in real time.
5. Monitor inferences logged on **Hedera Testnet**.

---

## 🌐 Connect With Us

Stay up-to-date with the latest developments and news from DeCenter AI:

- [🌍 Website](https://decenterai.com)  
- [🐦 Twitter](https://twitter.com/decenteraicom)  
- [📢 Telegram Announcements](https://t.me/decenteraicom)  
- [💼 LinkedIn](https://www.linkedin.com/company/decenter-ai)  
- [✉️ Email](mailto:admin@decenterai.com)

---

## 🚀 Let’s Build the Future of AI—Together

DeCenter AI is creating a **unified, human-centered AI Studio** that democratizes access to specialized tools, abstracts complexity,  
and empowers the **97% of users** who have been priced out or left behind.
![DeCenter AI - Unifying the AI experience](https://github.com/DeCenter-AI/.github/assets/131058062/c39ed1ce-14d8-4f94-8059-6d5f3a633962)
