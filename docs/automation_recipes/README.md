# Activepieces Automation Recipes

These recipes help you build "DevOps Jobs" in your Activepieces instance.

## 1. Daily Server Health Check
**Goal:** Scan system resources and have your local AI summarize issues.

### Steps:
1. **Trigger:** Schedule (Every Day at 02:00).
2. **Action:** "Code" piece.
   - **Language:** Node.js
   - **Code:** Copy from `health_check.js`.
3. **Action:** "OpenAI" (Custom LLM).
   - **Connection:** Custom Ollama connection (http://172.17.0.1:11434/v1).
   - **Prompt:** 
     ```
     You are a senior DevOps bot. Analyze these metrics: {{step_2.metrics}}. 
     If memory usage is > 90% or disk is full, suggest a remediation bash script.
     ```
4. **Action:** "Email" or "Slack" to notify yourself.

---

## 2. Log Anomaly Detector
**Goal:** Alert you if any server logs contain critical errors.

### Steps:
1. **Trigger:** Webhook or SSH command (to get log output).
2. **Action:** "Code" piece.
   - **Code:** Copy from `log_analyzer.js`.
3. **Action:** "Ask AI" (Custom LLM).
   - **Prompt:**
     ```
     These errors were found in the logs: {{step_2.samples}}.
     Explain the root cause and suggest a fix.
     ```
4. **Action:** "Human in the Loop" (Wait for your approval before fixing).
