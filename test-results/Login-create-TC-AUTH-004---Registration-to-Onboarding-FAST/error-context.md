# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login\create.spec.js >> TC_AUTH_004 - Registration to Onboarding FAST
- Location: tests\Login\create.spec.js:4:1

# Error details

```
TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('text=Onboarding Checklist') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e13]:
        - generic [ref=e14]:
          - img "Oxmaint AI Portal Logo" [ref=e17]
          - heading "Organization Setup" [level=1] [ref=e19]
          - paragraph [ref=e21]: Complete your organization setup to access the full CMMS platform
        - generic [ref=e23]:
          - generic [ref=e24]:
            - heading "Organization Details" [level=3] [ref=e25]
            - paragraph [ref=e26]: Tell us about your organization to customize your experience
          - generic [ref=e28]:
            - button "Organization Information" [ref=e30] [cursor=pointer]:
              - generic [ref=e31]:
                - img [ref=e32]
                - generic [ref=e35]: Organization Information
              - img [ref=e36]
            - generic [ref=e38]:
              - button "2 Additional Details" [ref=e39] [cursor=pointer]:
                - generic [ref=e40]:
                  - generic [ref=e41]: "2"
                  - generic [ref=e42]: Additional Details
                - img [ref=e43]
              - generic [ref=e46]:
                - generic [ref=e47]:
                  - img [ref=e48]
                  - paragraph [ref=e50]:
                    - text: These details help us personalize your onboarding experience. You can always update them later in
                    - generic [ref=e51]:
                      - img [ref=e52]
                      - text: Organization Settings
                    - text: .
                - generic [ref=e55]:
                  - generic [ref=e56]:
                    - text: Address
                    - generic [ref=e57]:
                      - img [ref=e58]
                      - text: Optional
                    - textbox "Address" [ref=e60]:
                      - /placeholder: Enter your address
                      - text: 6465 Cronin Shoal
                  - generic [ref=e62]:
                    - text: Timezone
                    - generic [ref=e63]:
                      - img [ref=e64]
                      - text: Optional
                    - combobox [ref=e66] [cursor=pointer]:
                      - generic: Araguaina
                      - img
                    - combobox [ref=e67] [cursor=pointer]
                  - generic [ref=e69]:
                    - text: Currency
                    - generic [ref=e70]:
                      - img [ref=e71]
                      - text: Optional
                    - combobox [ref=e73] [cursor=pointer]:
                      - generic: TZS - Tanzanian Shilling
                      - img
                    - combobox [ref=e74] [cursor=pointer]
                  - generic [ref=e75]:
                    - text: Estimated Team Size
                    - generic [ref=e76]:
                      - img [ref=e77]
                      - text: Optional
                    - combobox [ref=e79] [cursor=pointer]:
                      - generic: 1000+
                      - img
                    - combobox [ref=e80] [cursor=pointer]
                  - generic [ref=e81]:
                    - text: Organization Age (Years)
                    - generic [ref=e82]:
                      - img [ref=e83]
                      - text: Optional
                    - spinbutton "Organization Age (Years)" [ref=e85]: "24"
            - generic [ref=e87]:
              - button "Back" [ref=e88] [cursor=pointer]
              - generic [ref=e89]:
                - button "Creating..." [disabled]:
                  - generic:
                    - img
                    - text: Creating...
      - contentinfo [ref=e90]:
        - generic [ref=e92]:
          - paragraph [ref=e93]: © 2026 Oxmaint AI. All rights reserved.
          - paragraph [ref=e94]: Professional CMMS Solutions
    - generic [ref=e101]:
      - generic [ref=e103]:
        - generic [ref=e104]:
          - img [ref=e106]
          - generic [ref=e116]:
            - heading "Setting Up Your Workspace" [level=3] [ref=e117]
            - paragraph [ref=e118]: Configuring Greenfelder Inc for Manufacturing Plant operations
        - button "Cancel" [ref=e119] [cursor=pointer]
      - generic [ref=e120]:
        - generic [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]: Progress
            - generic [ref=e124]: 0 of 3 completed
          - progressbar [ref=e125]
        - generic [ref=e127]:
          - img [ref=e129]
          - generic [ref=e131]:
            - paragraph [ref=e132]: Processing...
            - paragraph [ref=e133]: Analyzing your organization details and industry requirements
        - generic [ref=e134]:
          - heading "Setup Steps" [level=4] [ref=e135]
          - generic [ref=e136]:
            - generic [ref=e137]:
              - img [ref=e140]
              - generic [ref=e142]:
                - heading "Gathering Organization Information" [level=5] [ref=e144]
                - paragraph [ref=e145]: Analyzing your organization details and industry requirements
              - img [ref=e148]
            - generic [ref=e152]:
              - generic [ref=e153]: "2"
              - generic [ref=e154]:
                - heading "Generate Assets" [level=5] [ref=e156]
                - paragraph [ref=e157]: Creating industry-specific assets and equipment database
              - img [ref=e160]
            - generic [ref=e163]:
              - generic [ref=e164]: "3"
              - generic [ref=e165]:
                - heading "Synapse AI Analyzing the data" [level=5] [ref=e167]
                - paragraph [ref=e168]: AI agent learning your setup and preparing intelligent insights
              - img [ref=e171]
        - generic [ref=e182]:
          - generic [ref=e183]:
            - img [ref=e184]
            - generic [ref=e188]: "Organization:"
            - generic [ref=e189]: Greenfelder Inc
          - generic [ref=e190]:
            - img [ref=e191]
            - generic [ref=e194]: "Industry:"
            - generic [ref=e195]: Manufacturing Plant
          - generic [ref=e196]:
            - img [ref=e197]
            - generic [ref=e199]: "Security:"
            - generic [ref=e200]: Enterprise Grade
          - generic [ref=e201]:
            - img [ref=e202]
            - generic [ref=e205]: "ETA:"
            - generic [ref=e206]: ~1-2 minutes
    - region "Notifications alt+T"
  - alert [ref=e207]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const { faker } = require('@faker-js/faker');
  3   | 
  4   | test('TC_AUTH_004 - Registration to Onboarding FAST', async ({ page }) => {
  5   |     test.setTimeout(120000);
  6   | 
  7   |     const randomName = faker.person.fullName();
  8   |     const randomEmail = faker.internet.email().toLowerCase();
  9   |     const randomPassword = `Secure@${Math.floor(Math.random() * 1000)}!`;
  10  |     const orgName = faker.company.name();
  11  |     const randomWebsite = faker.internet.domainName();
  12  | 
  13  |     // ─── 1. REGISTRATION ─────────────────────────────────────────────────────────
  14  |     await page.goto('/');
  15  |     await page.getByRole('button', { name: 'Sign In', exact: true }).first().click();
  16  |     await page.click('text=Sign up here');
  17  | 
  18  |     await page.locator('input[placeholder*="Full Name"]').fill(randomName);
  19  |     await page.locator('input[placeholder*="email"]').fill(randomEmail);
  20  | 
  21  |     await page.getByRole('combobox').or(page.locator('.select-trigger')).first().click();
  22  |     await page.getByRole('option').first().click();
  23  | 
  24  |     await page.locator('input[type="password"]').first().fill(randomPassword);
  25  |     await page.locator('input[type="password"]').last().fill(randomPassword);
  26  |     await page.getByRole('checkbox').click();
  27  | 
  28  |     await Promise.all([
  29  |         page.waitForURL('**/onboarding**', { timeout: 30000 }),
  30  |         page.getByRole('button', { name: 'Create Account' }).click(),
  31  |     ]);
  32  | 
  33  |     // ─── 2. ORGANIZATION DETAILS ──────────────────────────────────────────────────
  34  |     await page.waitForLoadState('domcontentloaded');
  35  | 
  36  |     const pickDropdown = async (labelText) => {
  37  |         const allLabels = page.locator('label');
  38  |         const count = await allLabels.count();
  39  |         for (let i = 0; i < count; i++) {
  40  |             const txt = await allLabels.nth(i).innerText();
  41  |             if (txt.includes(labelText)) {
  42  |                 const trigger = allLabels.nth(i).locator('xpath=..').locator('button, [role="combobox"]').first();
  43  |                 await trigger.click();
  44  |                 const opts = page.locator('[role="option"]');
  45  |                 await opts.first().waitFor({ state: 'visible', timeout: 4000 });
  46  |                 const n = await opts.count();
  47  |                 await opts.nth(Math.floor(Math.random() * n)).click();
  48  |                 console.log(`  ✓ ${labelText}`);
  49  |                 return;
  50  |             }
  51  |         }
  52  |         throw new Error(`Dropdown not found: ${labelText}`);
  53  |     };
  54  | 
  55  |     await page.getByPlaceholder('Enter your organization name').fill(orgName);
  56  |     await pickDropdown('Industry');
  57  |     await pickDropdown('Country');
  58  |     await pickDropdown('Organization Type');
  59  | 
  60  |     const webInput = page.getByPlaceholder('your-company.com');
  61  |     await webInput.fill(randomWebsite);
  62  | 
  63  |     // ─── 3. ADDITIONAL DETAILS ───────────────────────────────────────────────────
  64  |     const accordionHeader = page
  65  |         .locator('button, [role="button"], div, h2, h3')
  66  |         .filter({ hasText: /Additional Details/i })
  67  |         .last();
  68  |     await accordionHeader.click();
  69  | 
  70  |     const addressInput = page.getByPlaceholder('Enter your address');
  71  |     await addressInput.waitFor({ state: 'visible', timeout: 6000 });
  72  |     await addressInput.fill(faker.location.streetAddress());
  73  | 
  74  |     await pickDropdown('Timezone');
  75  |     await pickDropdown('Currency');
  76  |     await pickDropdown('Estimated Team Size');
  77  | 
  78  |     const orgAgeInput = page.getByPlaceholder('e.g., 5');
  79  |     await orgAgeInput.waitFor({ state: 'visible', timeout: 4000 });
  80  |     await orgAgeInput.fill(String(faker.number.int({ min: 1, max: 30 })));
  81  | 
  82  |     // ─── 4. CREATE ORGANIZATION ───────────────────────────────────────────────────
  83  |     const createOrgBtn = page.getByRole('button', { name: /create organization/i });
  84  |     await createOrgBtn.waitFor({ state: 'visible', timeout: 6000 });
  85  |     await expect(createOrgBtn).toBeEnabled({ timeout: 6000 });
  86  |     await createOrgBtn.click({ force: true });
  87  |     console.log('✓ Create Organization clicked');
  88  | 
  89  |     // ─── 5. OXY AI ONBOARDING CHECKLIST ─────────────────────────────────────────
> 90  |     await page.waitForSelector('text=Onboarding Checklist', { timeout: 15000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
  91  |     console.log('✓ Checklist loaded');
  92  | 
  93  |     /**
  94  |      * Picks a random answer from the visible option rows.
  95  |      * The rows live between "CHOOSE YOUR ANSWER" and "Notes (Optional)" in the DOM.
  96  |      * Uses a fast direct approach: grab all p/div/span/li inside the answer
  97  |      * section that are NOT the label, NOT the notes block, and click one.
  98  |      */
  99  |     const pickAnswer = async () => {
  100 |         // Fast path: look for the answer rows directly by their position.
  101 |         // They are the ONLY bordered rows between the label and the notes textarea.
  102 |         // We use evaluate() to grab them all at once in a single DOM call — no looping.
  103 |         const clicked = await page.evaluate(() => {
  104 |             // Find "CHOOSE YOUR ANSWER" text node
  105 |             const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  106 |             let labelNode = null;
  107 |             while (walker.nextNode()) {
  108 |                 if (walker.currentNode.textContent.includes('CHOOSE YOUR ANSWER')) {
  109 |                     labelNode = walker.currentNode.parentElement;
  110 |                     break;
  111 |                 }
  112 |             }
  113 |             if (!labelNode) return false;
  114 | 
  115 |             // Walk up to find a container that has multiple children (the answer rows)
  116 |             let container = labelNode.parentElement;
  117 |             for (let i = 0; i < 5; i++) {
  118 |                 if (!container) break;
  119 |                 // Collect siblings/children that look like answer rows
  120 |                 const children = Array.from(container.children || []);
  121 |                 const rows = children.filter(el => {
  122 |                     const txt = el.innerText?.trim() || '';
  123 |                     return (
  124 |                         txt.length > 2 &&
  125 |                         txt.length < 100 &&
  126 |                         !/CHOOSE YOUR ANSWER|Notes|Skip|Continue|Onboarding|Checklist/i.test(txt)
  127 |                     );
  128 |                 });
  129 |                 if (rows.length >= 2) {
  130 |                     const picked = rows[Math.floor(Math.random() * rows.length)];
  131 |                     picked.click();
  132 |                     return picked.innerText?.trim() || 'unknown';
  133 |                 }
  134 |                 container = container.parentElement;
  135 |             }
  136 |             return false;
  137 |         });
  138 | 
  139 |         if (clicked) {
  140 |             console.log(`  ✓ Answered: "${clicked}"`);
  141 |             return true;
  142 |         }
  143 | 
  144 |         // Fallback: Playwright locator targeting rows between label and notes
  145 |         try {
  146 |             const label = page.locator('text=CHOOSE YOUR ANSWER').first();
  147 |             await label.waitFor({ state: 'visible', timeout: 2000 });
  148 |             // Get all following siblings of the label's parent until Notes
  149 |             const rows = label.locator('xpath=../following-sibling::*[not(contains(.,"Notes"))]');
  150 |             const n = await rows.count();
  151 |             if (n > 0) {
  152 |                 const picked = rows.nth(Math.floor(Math.random() * n));
  153 |                 const txt = (await picked.innerText()).trim();
  154 |                 await picked.click();
  155 |                 console.log(`  ✓ Answered (fallback): "${txt}"`);
  156 |                 return true;
  157 |             }
  158 |         } catch { /* skip */ }
  159 | 
  160 |         console.log('  ! Could not find answer rows');
  161 |         return false;
  162 |     };
  163 | 
  164 |     const getAnsweredCount = async () => {
  165 |         try {
  166 |             const txt = await page.locator('text=/\\d+\\/10 answered/').first().innerText({ timeout: 1000 });
  167 |             const m = txt.match(/(\d+)\/(\d+)/);
  168 |             return m ? { done: +m[1], total: +m[2] } : { done: 0, total: 10 };
  169 |         } catch {
  170 |             return { done: 0, total: 10 };
  171 |         }
  172 |     };
  173 | 
  174 |     let q = 0;
  175 | 
  176 |     while (q < 12) {
  177 |         q++;
  178 | 
  179 |         // Check if checklist is still on screen
  180 |         const onChecklist = await page.$('text=Onboarding Checklist');
  181 |         if (!onChecklist) { console.log('✓ Checklist gone — done!'); break; }
  182 | 
  183 |         const { done, total } = await getAnsweredCount();
  184 |         console.log(`\n→ Q${q} | ${done}/${total} answered`);
  185 |         if (done >= total && total > 0) { console.log('✓ All answered!'); break; }
  186 | 
  187 |         // Q1 → skip
  188 |         if (q === 1) {
  189 |             const skipBtn = page.getByRole('button', { name: /skip question/i });
  190 |             try {
```