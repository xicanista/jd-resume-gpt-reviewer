# ✨ GPT-Powered Resume Critique Tool (Google Apps Script)

A tool that uses OpenAI’s GPT API to deliver fast, personalized resume critiques from inside Google Drive.

It’s perfect for:
- Job seekers tailoring resumes for their targeted role
- Career coaches and bootcamps supporting job seekers
- Anyone who wants smarter, faster, more personalized resume feedback

---

## 🔧 How It Works

1. ✅ You store your **resume** in a Google Doc  
2. ✅ You collect **job descriptions** in another Google Doc, each prefixed with `## Job Title`  
3. ✅ You run the `batchCritiqueResume` script from a **menu inside the job descriptions doc**  
4. ✅ A **Google Sheet tab** (`Resume Critiques`) is populated with feedback for each job, including:
   - Alignment
   - Qualification
   - Resume Strengths
   - Areas for Improvement
   - Suggested Changes

---

## 🧠 What It Uses

- Google Apps Script (Docs + Sheets APIs)
- OpenAI GPT-3.5 via [Chat Completions API](https://platform.openai.com/docs/guides/gpt)
- Your own OpenAI API Key (not included)

---

## 🚀 Quick Start

### 1. Copy the Project

- Open [this Google Doc template](https://docs.google.com/document/d/1FYn4B9vErIE98xI7cpe8aqIO438KdYW0noXY4CbTyoc/edit?tab=t.0) — this is your **Jobs Doc**
- Name the copy whatever you'd like (title does not affect the script)
- Open it, then go to **Extensions > Apps Script**

---

### 2. Paste the Code

- Replace the contents with the script from [`Code.gs`](./Code.gs)
- Be sure to include `parseCritiqueSections`, `callChatGPT`, and `onOpen()` at the end

---

### 3. Set Your Script Properties

In Apps Script:
- Go to **Project Settings**
- Scroll to **Script Properties**
- Add a new entry:
  - Key: `OPENAI_API_KEY`
  - Value: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

💡 You must have credits in your OpenAI account.  
Learn more: [OpenAI Billing & Usage](https://platform.openai.com/settings/organization/billing/overview)

In testing, each job description cost less than 1 cent to evaluate.

---

### 4. Set Up the Google Sheet

[👉 Make a copy of this Sheet template](https://docs.google.com/spreadsheets/d/1FJwBGVWt_3Fu8wbWBR0Na6en9RlqrIqkWjnI_Mvvbx4/edit?usp=sharing)

- The `Resume Critiques` tab will be created automatically on first run
- From the Sheet, go to **File > Share > Copy link**
- Extract the Sheet ID from the URL and paste it into your script:

```javascript
const SHEET_ID = 'your-sheet-id-here';
```

---

### 5. Set Up Your Google Docs

* **Resume Doc**: Store your resume in a separate Google Doc — plain text preferred
* **Jobs Doc**: Use the doc from Step 1. Each job description should be prefixed with `## Job Title`
* Follow the format in the template to avoid parsing issues

Add the IDs to your script:

```javascript
const RESUME_DOC_ID = 'your-resume-doc-id';
const JOBS_DOC_ID = 'your-jobs-doc-id';
```

You can find the ID in the URL:
`https://docs.google.com/document/d/your-id-here/edit`

---

### 6. Run the Script from the Menu

After pasting the script and saving:

1. Refresh your Jobs Doc

2. You will see a new menu in the toolbar:

   Resume Tools
   └── Run Batch Critique

4. Click "Run Batch Critique" — Google will prompt you to authorize the script the first time

5. Once authorized, the script will run and populate your output in the `Resume Critiques` tab of your Google Sheet

You do not need to open the Apps Script editor again after setup.

---

## License

MIT License

---

## Contribute

Feel free to suggest improvements:

* Export options (PDF or Markdown)
* Numeric fit scores
* Slack/email integrations

Open a pull request or start a discussion.

---
