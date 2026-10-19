# JobSafe AI 🛡️

An AI tool that helps young job seekers check if a job offer is a scam, and see how well their CV matches the job.

Built solo for the **NYLP AI Hackathon 2026**.

**Live demo:** https://claude.ai/artifact/HkrFwXAGfMoKtjfXGtKssE

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

- HTML, CSS and plain JavaScript in a single file (`jobsafe-ai.html`)
- Hosted as a published Claude artifact
- `localStorage` for history
- No backend, no database, no login

## AI / API Usage

The app uses Claude through the artifact "sample" capability. There are no API keys in the code.

| Feature | What the AI does |
|---|---|
| Scam Checker | Classifies the text and returns JSON: score, level, red flags (with exact quotes), positives, tips |
| CV Match Coach | Compares the CV with the job and returns JSON: score, matching skills, missing skills, improvements, rewrite |

How it works:

1. The app builds a clear prompt for the task and sends only the pasted text to the AI.
2. The AI is told to return strict JSON, to use only the given text, and not to invent facts.
3. The app checks and cleans the result (for example, keeps scores between 0 and 100).
4. The final recommendation is calculated by simple rules in the code, not by the AI, so it is easy to explain:
   - High scam risk → **Avoid**
   - Medium scam risk → **Verify, then decide**
   - Low risk and CV match of 70% or more → **Apply**
   - Low risk and CV match below 70% → **Apply with changes**

## Setup Instructions

**To use the app:** open the live demo link above. The first time you run a check, allow AI access when asked.

**To use the source code:**

1. Download `jobsafe-ai.html` from this repository.
2. Open it in a Claude artifact (or publish it as an artifact), because the AI feature depends on the Claude artifact runtime.
3. No API keys or environment variables are needed.

## Screenshots

_Add 3 screenshots here: (1) scam check result with highlighted red flags, (2) CV match result, (3) final recommendation._

## Limitations

- AI can miss new scam styles or flag a real job by mistake.
- It only reads the pasted text. It cannot verify that a company really exists.
- CV advice is guidance, not a hiring guarantee.
- History is saved only in the browser and is lost if the browser data is cleared.
- The AI part works only inside the Claude artifact runtime, not as a normal standalone web page.

## Privacy

Nothing is stored on a server. Pasted text is sent to the AI only for analysis. History stays in the user's browser.

## Team Contributions

- **AK (solo):** idea, product design, prompt design, testing, and documentation. The code was written with the help of an AI assistant (Claude), then tested and reviewed by AK.

## Disclaimer

AI can make mistakes. This tool is guidance, not a guarantee. Always verify a company yourself and never pay money to get a job.
