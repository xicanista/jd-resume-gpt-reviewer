# ✨ GPT-Powered Resume Critique Tool (Google Apps Script)

This tool lets job seekers automatically critique their resume against one or more job descriptions using OpenAI’s GPT API — all from within Google Docs and Sheets.

It’s perfect for:
- Job seekers tailoring resumes for AI, tech, or startup roles
- Career coaches and bootcamps supporting job seekers
- Anyone who wants smarter, faster, more personalized resume feedback

---

## 🔧 How It Works

1. ✅ You store your **resume** in a Google Doc  
2. ✅ You collect **job descriptions** in another Google Doc, each prefixed with `## Job Title`  
3. ✅ You run the `batchCritiqueResume` script in Google Apps Script  
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

- Open [this Google Sheet template](https://docs.google.com/document/d/1FYn4B9vErIE98xI7cpe8aqIO438KdYW0noXY4CbTyoc/edit?tab=t.0). Name the copy of the document whatever you'd like. It will not impact the script.
- In your copy of the document. Go to **Extensions > Apps Script**

### 2. Paste the Code

- Replace existing code with the contents of [`Code.gs`](./Code.gs)
- Be sure to include the `parseCritiqueSections` and `callChatGPT` functions too

### 3. Set Your Script Properties

In Apps Script:
- Go to **Project Settings**
- Scroll to **Script Properties**
- Add:
  - Key: `OPENAI_API_KEY`
  - Value: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
 
You will need to purchase credits if you don't already have any. You may also want to set usage limits to avoid unexpected costs. [See OpenAI Platforms Billing and Usage](https://platform.openai.com/settings/organization/billing/overview). For perspective, in testing this script I was charged less than 1 cent per request (equivalent to one job description). 

### 4. Set Up the Google Sheet

[Make a copy of this template](https://docs.google.com/spreadsheets/d/1FJwBGVWt_3Fu8wbWBR0Na6en9RlqrIqkWjnI_Mvvbx4/edit?gid=0#gid=0)
- The `Resume Critiques` tab will be created automatically on first run. No need to pre-create it.
- Go to **File > Share > Copy link**, then grab the Sheet ID from the URL
- Paste that Sheet ID into this line in the script:
- 
### 5. Set Up Your Google Docs

- **Resume Doc**: Store your resume in a Google Doc. Plain text is suggested to help avoid parsing issues. 
- **Jobs Doc**: Paste in job descriptions in the file you created in step 1 above. Follow the format described in the template.
- **Google sheet**: Be sure 
  
Update the script’s constants at the top:

```javascript
const RESUME_DOC_ID = 'your-resume-doc-id';
const JOBS_DOC_ID = 'your-jobs-doc-id';
const SHEET_ID = 'your-sheet-id';

You can find the id between the "d/" and "/edit" of the document urls. For example, the id is highlighted here: https://docs.google.com/document/d/**1AZn4B9vErIE98xI7mn78aqIO438KdYW0noXY4CbTyoc**/edit?tab=t.0 (Just an example. Not a real doc.)
