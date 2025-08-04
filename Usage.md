
---

## 2️⃣ `USAGE.md` – **“How to Use the Application”**

- Explains all UI options, login, AI key configuration, page object generation, and links back to setup guide.

---

### **USAGE.md (in root):**

```markdown
# Using the GenAI Page Object Generator

> For setup and launch instructions, see [README.md](README.md).

---

## 🏠 **Logging In**

- On opening the app, you'll see a login screen.
- **Default credentials:**  
  - Username: `admin`  
  - Password: `admin`  
- You can change these later in settings.

---

## 🗂️ **Dashboard Options**

After login, you’ll see five options:
1. **Page Object via DOM:** Paste raw HTML/DOM to generate a page object.
2. **Page Object for Static Web App:** Enter a URL (no login required).
3. **Page Object for Live App:** Enter a URL and (eventually) authenticate for dynamic sites.
4. **Page Object for Android App:** *(Coming soon, disabled)*
5. **Page Object for iOS App:** *(Coming soon, disabled)*

---

## 🤖 **AI Settings**

- Click the **user icon** (top right) → **AI Settings**.
- Enter your **API keys** for OpenAI (ChatGPT), Perplexity, and Claude, or leave blank to use free/public access (if available).
  - [OpenAI API key](https://platform.openai.com/api-keys)
  - [Perplexity API key](https://platform.perplexity.ai/account/api)
  - [Claude API key](https://console.anthropic.com/settings/keys)
- Keys are stored securely in your browser only.

---

## 📝 **Generating Page Objects**

- Choose any option on the dashboard and follow on-screen prompts.
- Fill in all required fields (framework, language, type, etc.).
- Paste DOM or enter URL as needed.
- Click “Generate Page Object” to get your code.
- View, edit, download, or copy the generated class on the results page.

---

## 🔗 **Go Back to Setup Instructions**

If you need to reinstall or troubleshoot setup, see [README.md](README.md).

---

**Happy Automating!**
