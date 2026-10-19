# JobSafe AI 🛡️

An AI tool that helps young job seekers check if a job offer is a scam, and see how well their CV matches the job.

Built solo for the **NYLP AI Hackathon 2026**.

**Live demo:** https://vercel.com/job-safe/jobsafe-ai-

## Problem

Fresh graduates and students often face two problems when they look for jobs online:

1. **Fake job offers.** Scammers ask for "registration fees", push people to WhatsApp, skip interviews, and ask for CNIC or bank details. Many young people lose money or share private documents.
2. **CV rejection without feedback.** Most people don't know why their CV gets rejected or what skills the job really wants.

## Solution

JobSafe AI lets the user paste a job post (or a recruiter message) and, optionally, their CV. The AI then:

- checks the post for scam signs and gives a risk score,
- compares the CV with the job and suggests clear improvements,
- gives one final recommendation: **Apply**, **Apply with changes**, **Verify, then decide**, or **Avoid**.

## Features

- **Scam Checker:** risk score (0-100), risk level (Low / Medium / High), red flags with the exact suspicious phrases highlighted in the original text, positive signs, and 3 safety tips.
- **CV Match Coach:** match score, matching skills, missing keywords, 3-5 improvements, and one rewritten example line (only using facts from the CV).
- **Safe Job Report:** both results combined with a final recommendation, plus a "Download report" button.
- **History:** the last 10 checks are saved in the user's own browser.
- **Sample buttons:** "Try sample scam post", "Try sample real post", and "Try sample CV" so anyone can test the app quickly.
- **Error handling:** empty input, text too short, text too long, and AI failure all show clear messages.
- **Mobile friendly:** simple layout, big buttons, light and dark mode.

## Tech Stack

- **Frontend:** HTML, CSS and plain JavaScript (`index.html`)
- **Backend:** one serverless function (`api/analyze.js`, Node.js) that calls the AI
- **AI:** Google Gemini API
- **Hosting:** Vercel
- **Storage:** browser `localStorage` for history (no database, no login)

## AI Methodology and Implementation

1. The user pastes text in the browser.
2. The browser sends a task prompt to `/api/analyze`.
3. The serverless function adds the secret API key and calls the Gemini API, asking for a strict JSON answer.
4. The app checks and cleans the result (for example, scores are kept between 0 and 100) and shows it.

Prompt design:

- **Scam Checker** works as a text classifier. It returns a score, level, red flags (with exact quotes from the text), positive signs, and tips.
- **CV Match Coach** compares the CV with the job description. It returns a match score, matching and missing skills, improvements, and one rewrite.
- Both prompts tell the AI to use **only the given text** and never invent facts. If there is not enough information, the AI says so.
- The red-flag quotes are found in the original post and highlighted in the page.
- The **final recommendation is made by simple rules in the code**, not by the AI, so it is easy to explain:
  - High scam risk → **Avoid**
  - Medium scam risk → **Verify, then decide**
  - Low risk and CV match of 70% or more → **Apply**
  - Low risk and CV match below 70% → **Apply with changes**

## AI Models and API Usage

- **Model:** Google Gemini Flash (default `gemini-2.5-flash`, can be changed with the `GEMINI_MODEL` setting)
- **API:** Gemini API `generateContent` endpoint, called only from the server function
- **Output format:** JSON (`responseMimeType: application/json`), low temperature (0.2) for steady results
- The API key is stored as a Vercel environment variable. It is never in the code or in this repository.

## Setup Instructions

1. Get a free API key from https://aistudio.google.com.
2. Fork or download this repository.
3. Import the repository in Vercel (https://vercel.com).
4. Add the environment variable `GEMINI_API_KEY` with your key (see `.env.example`).
5. Click Deploy. Open the link Vercel gives you.

To run locally, install the Vercel CLI and run `vercel dev` in the project folder with the same environment variable set.

## Screenshots

<img "https://github.com/user-attachments/assets/b994b0f5-19cb-420e-8712-47d72202a078" />

<img "https://github.com/user-attachments/assets/121215a9-950d-43cd-b20c-c5f474a4751d" />

<img "https://github.com/user-attachments/assets/f4a77f6e-dcb6-4866-b4f1-011b08bcca15" />

## Team Contributions

- **FAIZAN AHMAD (solo):** idea, product design, prompt design, testing, deployment, and documentation. The code was written with the help of an AI assistant (Claude), then tested and reviewed by me.

## Limitations

- AI can miss new scam styles or flag a real job by mistake.
- It only reads the pasted text. It cannot verify that a company really exists.
- CV advice is guidance, not a hiring guarantee.
- History is saved only in the browser and is lost if browser data is cleared.
- Free API limits may slow the app if many people use it at the same time.

## Privacy

Nothing is stored on a server or in a database. Pasted text is sent to the AI only to get the analysis. History stays in the user's browser.

## Disclaimer

AI can make mistakes. This tool is guidance, not a guarantee. Always verify a company yourself and never pay money to get a job.
