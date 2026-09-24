import ledger from "../course/smmc/ledger.mjs";
import { SMMC_PRIMARY_DOMAINS } from "../course/smmc/schema.mjs";
function expect(c,m){if(!c)throw new Error(m);}
const ids=Object.keys(SMMC_PRIMARY_DOMAINS);
const allExpected={S1:22,S2:17,S3:14,S4:12,S5:14,S6:9};
const eastExpected={S1:17,S2:16,S3:12,S4:10,S5:11,S6:6};
const counts=rows=>Object.fromEntries(ids.map(id=>[id,rows.filter(x=>x.primaryDomain===id).length]));
expect(ledger.length===88,"Expected 88 problems.");
const east=ledger.filter(x=>x.eastRelevant);expect(east.length===72,"Expected 72 East problems.");
expect(JSON.stringify(counts(ledger))===JSON.stringify(allExpected),"All-domain counts drifted: "+JSON.stringify(counts(ledger)));
expect(JSON.stringify(counts(east))===JSON.stringify(eastExpected),"East-domain counts drifted: "+JSON.stringify(counts(east)));
const moved={"SMMC-2017-A3":"S4","SMMC-2020-B2":"S2","SMMC-2020-B3":"S5","SMMC-2023-A2":"S2","SMMC-2023-C3":"S1","SMMC-2024-A3":"S4","SMMC-2024-C3":"S4","SMMC-2025-C1":"S5"};
for(const [id,d] of Object.entries(moved))expect(ledger.find(x=>x.id===id)?.primaryDomain===d,id+" reconciliation drifted");
const retained={"SMMC-2022-B1":"S3","SMMC-2023-A4":"S3","SMMC-2024-B2":"S3","SMMC-2025-C4":"S3"};
for(const [id,d] of Object.entries(retained))expect(ledger.find(x=>x.id===id)?.primaryDomain===d,id+" retained label drifted");
console.log("PASS SMMC primary-domain reconciliation: all=22/17/14/12/14/9; East=17/16/12/10/11/6; eight reviewed moves and Analysis sentinels pinned.");
