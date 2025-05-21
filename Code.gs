const RESUME_DOC_ID = 'REPLACE_WITH_YOUR_RESUME_DOC_ID';
const JOBS_DOC_ID = 'REPLACE_WITH_YOUR_JOBS_DOC_ID';
const SHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID';

function batchCritiqueResume() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!apiKey) throw new Error("API key not found. Please add it to script properties.");

  const resumeText = DocumentApp.openById(RESUME_DOC_ID).getBody().getText();
  const jobsDocText = DocumentApp.openById(JOBS_DOC_ID).getBody().getText();

  const sheet = SpreadsheetApp.openById(SHEET_ID);
  let tab = sheet.getSheetByName("Resume Critiques");
  if (!tab) {
    tab = sheet.insertSheet("Resume Critiques");
    tab.appendRow(["Date", "Job Title", "Resume Strengths", "Areas for Improvement", "Suggested Changes"]);
  }

  const jobBlocks = jobsDocText.split("##").slice(1); // skip any intro content

  const candidateGoals = `

CANDIDATE GOALS:
- ADD_CRITERIA_1
- ADD_CRITERIA_2
- ...
- ADD_CRITERIA_N
`;

  jobBlocks.forEach((block, index) => {
    try {
      const titleMatch = block.match(/^(.*?)\n/);
      const jobTitle = titleMatch ? titleMatch[1].trim() : `Job ${index + 1}`;
      const jobDescription = block.replace(titleMatch[0], "").trim();

      const prompt = `
You are an expert job search coach evaluating job fit for a TITLE_YOU_ARE_SEEKING. You are also an expert resume reviewer. A candidate is considering the the jobs below. Based on the resume, job description, and candidate goals, provide guidance and a critique in the following format:

**Alignment**
- Bullet 1
- Bullet 2

**Qualification**
- Bullet 1
- Bullet 2

**Resume Strengths:**
- Bullet 1
- Bullet 2

**Areas for Improvement:**
- Bullet 1
- Bullet 2

**Suggested Changes or Rewrites (optional):**
- Bullet 1
- Bullet 2

=====================
${candidateGoals}

RESUME:
${resumeText}

=====================
JOB DESCRIPTION:
${jobDescription}
`;

      const evaluation = callChatGPT(prompt, apiKey);
      const parsed = parseCritiqueSections(evaluation);

      tab.appendRow([
        new Date(),
        jobTitle,
        parsed.strengths,
        parsed.areas,
        parsed.suggestions
      ]);
    } catch (error) {
      Logger.log(`❌ Error processing job #${index + 1}: ${error.message}`);
      tab.appendRow([
        new Date(),
        `Error in job #${index + 1}`,
        "N/A",
        "N/A",
        `❌ ${error.message}`
      ]);
    }
  });
}

function callChatGPT(prompt, apiKey) {
  const url = "https://api.openai.com/v1/chat/completions";
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());

  if (!json || !json.choices || !json.choices[0] || !json.choices[0].message) {
    Logger.log("GPT API returned unexpected response:");
    Logger.log(JSON.stringify(json, null, 2));
    return "❌ GPT error: Invalid or incomplete response";
  }

  return json.choices[0].message.content.trim();
}

function parseCritiqueSections(text) {
  const alignmentMatch = text.match(/\*\*Alignment\*\*([\s\S]*?)\*\*Qualification\*\*/i);
  const qualificationMatch = text.match(/\*\*Qualification\*\*([\s\S]*?)\*\*Resume Strengths:\*\*/i);
  const strengthsMatch = text.match(/\*\*Resume Strengths:\*\*([\s\S]*?)\*\*Areas for Improvement:\*\*/i);
  const areasMatch = text.match(/\*\*Areas for Improvement:\*\*([\s\S]*?)\*\*Suggested Changes or Rewrites(?: \(optional\))?:\*\*/i);
  const suggestionsMatch = text.match(/\*\*Suggested Changes or Rewrites(?: \(optional\))?:\*\*([\s\S]*)/i);

  return {
    alignment: alignmentMatch ? alignmentMatch[1].trim() : "Could not parse alignment.",
    qualification: qualificationMatch ? qualificationMatch[1].trim() : "Could not parse qualification.",
    strengths: strengthsMatch ? strengthsMatch[1].trim() : "Could not parse strengths.",
    areas: areasMatch ? areasMatch[1].trim() : "Could not parse areas for improvement.",
    suggestions: suggestionsMatch ? suggestionsMatch[1].trim() : "No suggestions provided."
  };
}

function onOpen() {
  const ui = DocumentApp.getUi();
  ui.createMenu('🧠 Resume Tools')
    .addItem('Run Batch Critique', 'batchCritiqueResume')
    .addToUi();
}


