const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('TC_AUTH_004 - Registration to Onboarding FAST', async ({ page }) => {
    test.setTimeout(120000);

    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email().toLowerCase();
    const randomPassword = `Secure@${Math.floor(Math.random() * 1000)}!`;
    const orgName = faker.company.name();
    const randomWebsite = faker.internet.domainName();

    // ─── 1. REGISTRATION ─────────────────────────────────────────────────────────
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In', exact: true }).first().click();
    await page.click('text=Sign up here');

    await page.locator('input[placeholder*="Full Name"]').fill(randomName);
    await page.locator('input[placeholder*="email"]').fill(randomEmail);

    await page.getByRole('combobox').or(page.locator('.select-trigger')).first().click();
    await page.getByRole('option').first().click();

    await page.locator('input[type="password"]').first().fill(randomPassword);
    await page.locator('input[type="password"]').last().fill(randomPassword);
    await page.getByRole('checkbox').click();

    await Promise.all([
        page.waitForURL('**/onboarding**', { timeout: 30000 }),
        page.getByRole('button', { name: 'Create Account' }).click(),
    ]);

    // ─── 2. ORGANIZATION DETAILS ──────────────────────────────────────────────────
    await page.waitForLoadState('domcontentloaded');

    const pickDropdown = async (labelText) => {
        const allLabels = page.locator('label');
        const count = await allLabels.count();
        for (let i = 0; i < count; i++) {
            const txt = await allLabels.nth(i).innerText();
            if (txt.includes(labelText)) {
                const trigger = allLabels.nth(i).locator('xpath=..').locator('button, [role="combobox"]').first();
                await trigger.click();
                const opts = page.locator('[role="option"]');
                await opts.first().waitFor({ state: 'visible', timeout: 4000 });
                const n = await opts.count();
                await opts.nth(Math.floor(Math.random() * n)).click();
                console.log(`  ✓ ${labelText}`);
                return;
            }
        }
        throw new Error(`Dropdown not found: ${labelText}`);
    };

    await page.getByPlaceholder('Enter your organization name').fill(orgName);
    await pickDropdown('Industry');
    await pickDropdown('Country');
    await pickDropdown('Organization Type');

    const webInput = page.getByPlaceholder('your-company.com');
    await webInput.fill(randomWebsite);

    // ─── 3. ADDITIONAL DETAILS ───────────────────────────────────────────────────
    const accordionHeader = page
        .locator('button, [role="button"], div, h2, h3')
        .filter({ hasText: /Additional Details/i })
        .last();
    await accordionHeader.click();

    const addressInput = page.getByPlaceholder('Enter your address');
    await addressInput.waitFor({ state: 'visible', timeout: 6000 });
    await addressInput.fill(faker.location.streetAddress());

    await pickDropdown('Timezone');
    await pickDropdown('Currency');
    await pickDropdown('Estimated Team Size');

    const orgAgeInput = page.getByPlaceholder('e.g., 5');
    await orgAgeInput.waitFor({ state: 'visible', timeout: 4000 });
    await orgAgeInput.fill(String(faker.number.int({ min: 1, max: 30 })));

    // ─── 4. CREATE ORGANIZATION ───────────────────────────────────────────────────
    const createOrgBtn = page.getByRole('button', { name: /create organization/i });
    await createOrgBtn.waitFor({ state: 'visible', timeout: 6000 });
    await expect(createOrgBtn).toBeEnabled({ timeout: 6000 });
    await createOrgBtn.click({ force: true });
    console.log('✓ Create Organization clicked');

    // ─── 5. OXY AI ONBOARDING CHECKLIST ─────────────────────────────────────────
    await page.waitForSelector('text=Onboarding Checklist', { timeout: 15000 });
    console.log('✓ Checklist loaded');

    /**
     * Picks a random answer from the visible option rows.
     * The rows live between "CHOOSE YOUR ANSWER" and "Notes (Optional)" in the DOM.
     * Uses a fast direct approach: grab all p/div/span/li inside the answer
     * section that are NOT the label, NOT the notes block, and click one.
     */
    const pickAnswer = async () => {
        // Fast path: look for the answer rows directly by their position.
        // They are the ONLY bordered rows between the label and the notes textarea.
        // We use evaluate() to grab them all at once in a single DOM call — no looping.
        const clicked = await page.evaluate(() => {
            // Find "CHOOSE YOUR ANSWER" text node
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let labelNode = null;
            while (walker.nextNode()) {
                if (walker.currentNode.textContent.includes('CHOOSE YOUR ANSWER')) {
                    labelNode = walker.currentNode.parentElement;
                    break;
                }
            }
            if (!labelNode) return false;

            // Walk up to find a container that has multiple children (the answer rows)
            let container = labelNode.parentElement;
            for (let i = 0; i < 5; i++) {
                if (!container) break;
                // Collect siblings/children that look like answer rows
                const children = Array.from(container.children || []);
                const rows = children.filter(el => {
                    const txt = el.innerText?.trim() || '';
                    return (
                        txt.length > 2 &&
                        txt.length < 100 &&
                        !/CHOOSE YOUR ANSWER|Notes|Skip|Continue|Onboarding|Checklist/i.test(txt)
                    );
                });
                if (rows.length >= 2) {
                    const picked = rows[Math.floor(Math.random() * rows.length)];
                    picked.click();
                    return picked.innerText?.trim() || 'unknown';
                }
                container = container.parentElement;
            }
            return false;
        });

        if (clicked) {
            console.log(`  ✓ Answered: "${clicked}"`);
            return true;
        }

        // Fallback: Playwright locator targeting rows between label and notes
        try {
            const label = page.locator('text=CHOOSE YOUR ANSWER').first();
            await label.waitFor({ state: 'visible', timeout: 2000 });
            // Get all following siblings of the label's parent until Notes
            const rows = label.locator('xpath=../following-sibling::*[not(contains(.,"Notes"))]');
            const n = await rows.count();
            if (n > 0) {
                const picked = rows.nth(Math.floor(Math.random() * n));
                const txt = (await picked.innerText()).trim();
                await picked.click();
                console.log(`  ✓ Answered (fallback): "${txt}"`);
                return true;
            }
        } catch { /* skip */ }

        console.log('  ! Could not find answer rows');
        return false;
    };

    const getAnsweredCount = async () => {
        try {
            const txt = await page.locator('text=/\\d+\\/10 answered/').first().innerText({ timeout: 1000 });
            const m = txt.match(/(\d+)\/(\d+)/);
            return m ? { done: +m[1], total: +m[2] } : { done: 0, total: 10 };
        } catch {
            return { done: 0, total: 10 };
        }
    };

    let q = 0;

    while (q < 12) {
        q++;

        // Check if checklist is still on screen
        const onChecklist = await page.$('text=Onboarding Checklist');
        if (!onChecklist) { console.log('✓ Checklist gone — done!'); break; }

        const { done, total } = await getAnsweredCount();
        console.log(`\n→ Q${q} | ${done}/${total} answered`);
        if (done >= total && total > 0) { console.log('✓ All answered!'); break; }

        // Q1 → skip
        if (q === 1) {
            const skipBtn = page.getByRole('button', { name: /skip question/i });
            try {
                await skipBtn.waitFor({ state: 'visible', timeout: 5000 });
                await skipBtn.click();
                console.log('  ✓ Q1 skipped');
            } catch {
                // If no skip, just answer it
                await pickAnswer();
                await page.waitForTimeout(200);
                try { await page.getByRole('button', { name: /continue/i }).click(); } catch { /* ok */ }
            }
            continue;
        }

        // Answer the question
        const ok = await pickAnswer();

        if (!ok) {
            // Try skip as last resort
            try {
                await page.getByRole('button', { name: /skip question/i }).click({ timeout: 3000 });
                console.log('  ✓ Skipped (no answer found)');
            } catch { console.log('  ! Breaking — nothing to click'); break; }
            continue;
        }

        // Short wait for Continue button to enable (answer selection triggers it)
        await page.waitForTimeout(150);

        // Fill notes if visible (fast check, no waiting)
        try {
            const notes = page.getByPlaceholder(/additional details|context/i);
            if (await notes.isVisible({ timeout: 300 })) {
                await notes.fill(faker.lorem.sentence());
            }
        } catch { /* optional */ }

        // Click Continue
        try {
            const continueBtn = page.getByRole('button', { name: /continue/i });
            await continueBtn.waitFor({ state: 'visible', timeout: 4000 });
            await expect(continueBtn).toBeEnabled({ timeout: 4000 });
            await continueBtn.click();
            console.log('  ✓ Continue');
        } catch {
            try { await page.getByRole('button', { name: /continue/i }).click({ force: true }); } catch { /* ok */ }
        }

        await page.waitForTimeout(300); // minimal — just let the next question render
    }

    console.log(`\n✓ Checklist complete (${q} iterations)`);

    // ─── 6. DASHBOARD ────────────────────────────────────────────────────────────
    await page.waitForURL(/\/(dashboard|home|app|workspace)/, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded');
    console.log(`\n✅ DONE! Org: "${orgName}" | Email: ${randomEmail}`);
    await page.pause();
});