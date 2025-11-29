# Knarka – Flashback Drogakuten-watcher

Det här projektet bevakar nya trådar i **Drogakuten** på Flashback och postar dem till en Discord-webhook.
Watchern kan köras som CLI eller helt tyst i bakgrunden.

## 1. Skapa en Discord-webhook

1. Logga in på: [https://discord.com](https://discord.com)
2. Skapa en server (eller använd en befintlig).
3. Skapa en textkanal, t.ex. `knarka`.
4. Klicka på kugghjulet bredvid kanalen (**Edit Channel**).
5. Gå till **Integrations**.
6. Klicka på **Webhooks** och välj **New Webhook**.
7. Öppna webhooken som skapades och klicka **Copy URL**.
   Den används senare i `.env`.

---

## 2. Konfigurera `.env`

I projektets rotmapp:

```bash
cp .env.example .env
```

Öppna `.env` och klistra in din webhook-URL:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxxxx
```

Det ska stå direkt efter likhetstecknet, utan mellanslag eller citattecken.

---

## 3. Installera Node.js

Ladda ner och installera från:
[https://nodejs.org/en/download](https://nodejs.org/en/download)

---

## 4. Installera projektet globalt

Gå till projektroten i terminalen:

```bash
npm install -g
```

Det gör kommandot `knarka` tillgängligt överallt på systemet.

---

## 5. Köra watchern

### Starta

```bash
knarka --nu
```

### Stoppa

```bash
knarka --inte
```

### Köra helt tyst (headless)

```bash
knarka
```

---


## Screenshot
![img1](/docs/image0.jpg)
