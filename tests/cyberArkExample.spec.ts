import {expect, test} from "@playwright/test";
import {CyberArkCredential} from "playwright-qe-core/dist/cyber-ark/cyberArkCredential";
 import {CyberArkSafes} from "playwright-qe-core/dist/cyber-ark/cyberArkSafes";

test.describe("Retrieve cyberark credentials", () => {
    test("Cyberark token retrieval", async ({ request }) => {
        const cyberArkCredential = new CyberArkCredential(CyberArkSafes.QA, "DomainServiceAccount-STORMWIND.LOCAL-svc-qesql-qa")
        const token = await cyberArkCredential.retrieveAuthToken({ request });
        expect(token != null);
        const username = await cyberArkCredential.getUsername({ request });
        expect(username != null);
        const password = await cyberArkCredential.getPassword({ request });
        expect(password != null);
    });
});