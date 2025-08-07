[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BhMy8Rjk)

# 📦 Marktplaats Simulatie

## 🚀 Overzicht

Dit is een webapplicatie die een eenvoudige economie simuleert met grondstoffen (zoals hout, ijzer en graan).  
Het systeem gebruikt een echte MongoDB database om data persistent op te slaan. Via een REST API kunnen gebruikers grondstoffen kopen en verkopen.  
Er is een markt-simulatie die prijzen aanpast op basis van vraag en aanbod.

## 🎯 Functionaliteiten

- Ophalen van grondstoffen met prijs, voorraad en vraag
- Kopen en verkopen van grondstoffen via API endpoints
- Simulatie van marktprijs gebaseerd op vraag en aanbod
- Real-time voorraad- en prijsaanpassingen
- Volledig getest met Jest en Supertest

## 📦 Tech Stack

- Node.js & Express (backend API)
- MongoDB + Mongoose (database & ORM)
- React (frontend interface)
- Jest & Supertest (automated tests)
- dotenv (omgevingsvariabelen)

## 🛠️ Installatie & Setup

### 📁 Dependencies installeren

```bash
npm install
```

### ⚙️ .env bestand maken

Maak een `.env` bestand in de root met:

```ini
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### 🌱 Database initialiseren

Run de seeder om de beginvoorraad in te laden:

```bash
node seed/seedResources.js
```

### 🖥️ Server starten

Voor development (met nodemon):

```bash
npm run dev
```

Of voor productie:

```bash
npm start
```

### 💻 Frontend starten

Ga naar de frontend map en start React:

```bash
cd frontend
npm install
npm start
```

## ⚙️ API Endpoints

| Methode | Endpoint        | Beschrijving                          |
|---------|-----------------|---------------------------------------|
| GET     | `/api/resources`| Haal alle grondstoffen op             |
| POST    | `/api/buy`      | Koop een grondstof (body: name, amount) |
| POST    | `/api/sell`     | Verkoop een grondstof (body: name, amount) |
| POST    | `/api/simulate` | Voer een markt simulatie uit         |

## 🧩 Architectuur & Code structuur

```bash
/controllers
 marketController.js      # API logica (kopen, verkopen, ophalen resources)
/tests
  marketController.test.js      # Test controller
/database
connectMongo.js             # connectie met database
/models
  Resource.js              # Mongoose model grondstof
/routes
  marketRoutes.js          # API routes
/services
  simulationService.js     # Markt simulatie logica
/tools
  initResources.js         # Seeder script
/app.js                    # Server entrypoint
/frontend                  # React frontend code
```

## 📜 Code voorbeelden

### Voorbeeld: `buyResource` functie

```js
const buyResource = async (req, res) => {
  const { name, amount } = req.body;
  if (!name || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Ongeldige input' });
  }
  try {
    const resource = await Resource.findOne({ name });
    if (!resource) {
      return res.status(404).json({ message: 'Grondstof niet gevonden' });
    }
    if (resource.supply < amount) {
      return res.status(400).json({ message: 'Niet genoeg voorraad' });
    }
    resource.supply -= amount;
    resource.demand += amount;
    resource.price += Math.ceil(amount * 0.1);
    await resource.save();
    res.json({ message: `Je hebt ${amount} ${name} gekocht`, resource });
  } catch (err) {
    res.status(500).json({ message: 'Fout bij kopen', error: err.message });
  }
};
```

## ✅ Testing

De API wordt volledig getest met Jest en Supertest.

Run tests met:

```bash
npm test
```

Je ziet dan alle testresultaten, zoals:

```bash
PASS  controllers/tests/marketController.test.js
Tests:       5 passed, 5 total
```

## 📚 Development workflow

- Gebruik feature branches voor nieuwe functionaliteiten
- Volg SOLID principes en schrijf duidelijke, onderhoudbare code
- Commit regelmatig met duidelijke commit messages
- Schrijf tests voor backend functies
- Gebruik `develop` branch voor integratie en testing
- Merge naar `main` als stabiel en gereed voor productie

## 🎨 UI Styling

- Basic maar cleane CSS styling
- Aangename achtergrond met subtle gradient voor sfeer
- Responsieve tabel met actieknoppen voor kopen/verkopen

## 📖 Changelog

| Versie | Datum       | Wijziging                                               |
|--------|-------------|----------------------------------------------------------|
| 1.0.0  | 2025-08-07  | Eerste werkende versie met API, frontend, simulatie en tests |

## 📜 Licentie

MIT License © 2025 Rowan Biets

Zie `LICENSE` bestand voor details.

## 🤝 Code of Conduct

Wees respectvol en professioneel in bijdragen en communicatie.

## 🖼️ Visuals

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/0e1395f2-e8cd-47f8-b683-4985c56232d5" />



---

Bedankt voor het gebruiken van dit project! 🎉  
Heb je vragen? Open een issue of stuur een bericht.

