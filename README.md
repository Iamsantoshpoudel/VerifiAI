<h1 style="display: flex; justify-content: center; align-items: center">VerifyAI</h1>

VerifiAi is a powerful web application designed to detect AI-generated content in just a few seconds. Whether it's AI-written text or AI-generated images, VerifiAi leverages advanced models to analyze and identify synthetic content with high precision.

<h3>
Project Stricture
</h3>

```
app/
├── (pages)/
│   ├── about/
│   │   └── page.tsx
│   ├── chat/
│   │   └── page.tsx
│   ├── detect/
│   │   └── page.tsx
│   └── detecti/
│       └── page.tsx
│
├── api/
│   ├── chat/
│   │   └── route.ts
│   ├── detect/
│   │   └── route.ts
│   └── detecti/
│       └── route.ts
│
├── favicon.ico
├── globals.css
├── layout.tsx
├── not-found.tsx
└── page.tsx

```

<h3>
🔍 Features
</h3>
⚡ Fast Detection: Analyze content within seconds.

🖼️ Image Verification: Detect AI-generated images with exceptional accuracy.

📝 Text Analysis: (Optional – include if applicable) Identify AI-generated text content.

📊 User-Friendly Interface: Simple, responsive, and intuitive design.

🛠️ Tech Stack
Frontend: React / Next.js / Tailwind CSS /

AI Detection: Hugging Face API / Custom Model /Openrouter model / google costom search

🚀 Live Demo <br>
https://santosh2.com.np/

###

<h3> 
⚙️ Setup Instructions
</h3>

```bash
git clone https://github.com/Iamsantoshpoudel/PS.git
```

```bash
Copy-Item -Path "local.env" -Destination ".env"
```

```bash
npm install

npm run dev

```

<h3>You can also run in Docker </h3>

```bash
docker build -t verifiai .
```

```bash
docker run -p 3001:3001 verifiai
```

<h3>
🔌 Chat API Endpoint
</h3>

```
POST https://santosh.com.np/api/chat
```

<h3>
📝 API Request and Response Demo
</h3>

```
<body>
  <h2>Chat API Demo</h2>

  <label for="message">Your Message:</label><br>
  <textarea id="message" rows="4" cols="50" placeholder="type your massage">
  </textarea><br><br>

  <button onclick="sendMessage()">Send Message</button>

  <h3>Response:</h3>
  <pre id="response"></pre>

  <script>
    async function sendMessage() {
      const message = document.getElementById('message').value.trim();


      const apiKey = Contact me for api | you get in free of cost ;

      const responseBox = document.getElementById('response');
      responseBox.textContent = 'Loading...';

      try {
        const res = await fetch('https://santosh2.com.np/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
          },
          body: JSON.stringify({
            messages: [
              { role: 'user', content: message }
            ]
          })
        });

        const data = await res.json();
        responseBox.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        responseBox.textContent = 'Error: ' + err.message;
      }
    }
  </script>
</body>
```

<h3>
Why Use VerifiAI ?
</h3>

1.Detects whether content is AI-generated or authentic text and images.

2.Integrates advanced image recognition for verifying visual content.

3.Offers a custom search feature to fact-check information using multiple AI models.

4.Helps combat misinformation by verifying the truthfulness of data quickly.

5.Supports educators, publishers, and users in maintaining content credibility.

6.Provides an easy-to-use tool for making informed decisions on digital content authenticity.

<h3 align ="center">
🎉 Thank You for Checking Out the Project!
If you enjoy this project, feel free to ⭐️ it and share it with others!
</h3>
