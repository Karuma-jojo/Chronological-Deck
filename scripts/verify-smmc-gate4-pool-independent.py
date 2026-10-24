#!/usr/bin/env python3
"""Independent Python canonical byte/hash check. NO cohort draw."""
import hashlib
import json
import pathlib
import sys
EXPECTED='d404cf6b3b4810df7843881a9ffb27ea106753db9e753966ef0a6000a671ca5a'
BYTES=1739956
BASE='eeb54bb0cf25a2022e1b7e40d6e15ee2e46f82ad'
PINS={'raw':'a9cbeb55a2a829a881e228be6d6b22f667baa2c7',
      'gate3':'a968f71f567d86242d183412ef5df64aefa73c70',
      'gate4':'9dac5f6b6e21ad144d541ccea9088cd875b44163'}
def require(ok,msg):
    if not ok: raise SystemExit('INDEPENDENT POOL FAIL: '+msg)
inputs=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf8'))
raw,g3,evidence=(inputs[k] for k in ('raw','g3','evidence'))
require(len(raw)==len(g3)==len(evidence)==661,'count')
ri=[x['candidateId'] for x in raw]
gi=[x['candidateId'] for x in g3]
ei=[x['recordId'] for x in evidence]
require(len(set(ri))==661 and set(ri)==set(gi),'candidate IDs')
require(len(set(ei))==661,'evidence IDs')
rb={x['candidateId']:x for x in raw}
gb={x['candidateId']:x for x in g3}
eb={x['recordId']:x for x in evidence}
for ident,r in rb.items():
    require(all(eb[eid]['candidateId']==ident for eid in r['evidenceRecordIds']),'owned evidence')
    require(r['candidateName']==gb[ident]['candidateName'] and
            r['origin']==gb[ident]['origin'],'Gate3 identity')
rows=[{'candidateId':k,'raw':rb[k],'gate3':gb[k]} for k in sorted(rb)]
payload={'version':'G4-CAL-SAMPLER-v0.2.0','base':BASE,'pins':PINS,
         'rows':rows,'evidence':sorted(evidence,key=lambda r:r['recordId'])}
# Source keys are ASCII; non-ASCII string values remain unescaped UTF-8.
canonical=json.dumps(payload,sort_keys=True,ensure_ascii=False,separators=(',',':'))
data=('SMMC-G4-CAL-POOL-v1\n'+canonical+'\n').encode('utf8')
digest=hashlib.sha256(data).hexdigest()
require(len(data)==BYTES,'byte count '+str(len(data)))
require(digest==EXPECTED,'SHA-256 '+digest)
print('G4_CAL_INDEPENDENT_POOL_OK',json.dumps({'sha256':digest,'bytes':len(data),
 'candidates':661,'method':'independent Python serializer'}))
