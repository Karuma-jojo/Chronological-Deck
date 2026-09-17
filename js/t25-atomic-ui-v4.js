const {
  T25_ATOMIC_AUDIT_VERSION,
  T25_ATOMIC_CARDS,
  T25_ATOMIC_BY_ORDER,
  T25_MSTAT_ROUTE,
} = await import(`./data/t25-atomic-arcs.js?v=${Date.now()}`);

const panel = document.getElementById("t25Panel");
const unitSelect = document.getElementById("t25Unit");
const contract = document.getElementById("t25Contract");
const unitLabel = unitSelect?.closest("label");
const heading = document.getElementById("t25UnitHeading");
const terminalSelect = document.getElementById("terminalSelect");
const planSelect = document.getElementById("t25Plan");
const routeGraph = document.getElementById("routeGraph");
const routeSearch = document.getElementById("routeSearch");
const routeFilter = document.getElementById("routeFilter");
const legend = document.querySelector("#routeTab .legend");
const detailTitle = document.getElementById("detailTitle");
const detailSummary = document.getElementById("detailSummary");
const detailTags = document.getElementById("detailTags");
const detailKV = document.getElementById("detailKV");
const nodeControls = document.getElementById("nodeControls");
if (!panel || !unitSelect || !contract || !unitLabel || !routeGraph) throw new Error("T25 audited atomic UI requires the T25 panel, unit selector, contract container and route graph.");

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#39;","'":"&#39;"}[c]));
const routeNo = value => String(value).padStart(3,"0");
const authoredByOrder = T25_ATOMIC_BY_ORDER;
const SELECT_KEY = "chrono_t25_mstat_v4_selected_v1";
const SVG_NS = "http://www.w3.org/2000/svg";
const LAMBDA_COMPILER_URL = "./prompts/%CE%BB-Compiler-T25-Sealed-Spire-Mission-CANONICAL.md";
const LAMBDA_EXTRACTOR_URL = "./prompts/%CE%BB-ARC-Extractor-T25-CANONICAL.md";
const originalLegend = legend?.innerHTML || "";
const PHASES = Object.freeze({
  1:"Language & elementary tools",
  2:"Finite probability & basic statistics",
  3:"Matrices & calculus",
  4:"Distribution & conditioning toolkit",
  5:"Sampling laws & limits",
  6:"Estimation & testing",
  7:"Regression, sampling & designs",
});

function isMstatAtomicMap(){return terminalSelect?.value === "T25" && (!planSelect || planSelect.value === "mstat");}
function readSelectedOrder(){try{const value=Number(localStorage.getItem(SELECT_KEY));if(Number.isInteger(value)&&value>=1&&value<=T25_MSTAT_ROUTE.length)return value;}catch{}return T25_ATOMIC_CARDS[0]?.routeOrder||1;}
function saveSelectedOrder(){try{localStorage.setItem(SELECT_KEY,String(selectedOrder));}catch{}}
function parentDisplay(parentId){const option=[...unitSelect.options].find(o=>o.value===parentId);return option?.textContent?.trim()||parentId;}
function syncParent(spec){if(!spec||unitSelect.value===spec.parentId)return;const option=[...unitSelect.options].find(o=>o.value===spec.parentId);if(!option)return;unitSelect.value=spec.parentId;unitSelect.dispatchEvent(new Event("change",{bubbles:true}));}
function lines(label,values,prefix="- "){return[label,...(values||[]).map((item,i)=>prefix==="number"?`${i+1}. ${item}`:`${prefix}${item}`),""];}
function titleLines(title,max=25){const words=String(title).split(/\s+/);const out=[];let line="";for(const word of words){const next=line?`${line} ${word}`:word;if(next.length<=max||!line)line=next;else{out.push(line);line=word;}}if(line)out.push(line);if(out.length<=2)return out;return[out[0],`${out.slice(1).join(" ").slice(0,max-1)}…`];}

function atomicCardText(card){
  const spec=T25_MSTAT_ROUTE[card.routeOrder-1];
  return [
    "T25 M.STAT AUDITED ATOMIC SESSION CARD",
    `Audit: ${T25_ATOMIC_AUDIT_VERSION}`,
    `Global session: ${routeNo(card.routeOrder)} / ${T25_MSTAT_ROUTE.length}`,
    `Session code: ${card.syllabusCode}`,
    `Target: ${spec.targetCode} · ${spec.targetTitle}`,
    `Parent context only: ${card.parentId}`,
    `Atomic ID: ${card.id}`,
    `Evidence policy: ${card.evidencePolicy||spec.evidencePolicy||"standard"}`,
    "","BOUNDED SESSION",card.title,"","TARGET SCOPE",spec.exactScope,"",
    "FOCUS",card.focus,"","PURPOSE",card.purpose,"","CENTRAL CAPABILITY",card.centralCapability,"","PRINCIPAL OBSTACLE",card.principalObstacle,"",
    ...lines("ENTRY PREREQUISITES",card.entryPrerequisites),...lines("REQUIRED OWNERSHIP",card.requiredOwnership,"number"),
    "APPLICATION SCOPE",card.applicationScope,"","TRANSFER SCOPE",card.transferScope,"",
    ...lines("IN SCOPE",card.inScope),...lines("OUT OF SCOPE / DO NOT STEAL",card.outOfScope),
    "SESSION EXIT CONDITION",card.exitCondition,"","TARGET EXIT CHECK (later, after all target steps)",spec.targetExitCheck,"",
    "NEXT SESSION BOUNDARY",card.nextArcBoundary,"",
    "COMPILER BOUNDARY","Compile this one bounded session step, not the whole target or parent ARC. Established prior evidence may satisfy prerequisites; do not silently erase historical clearance.","",
    "ROUTE BOUNDARY",`The canonical learner chronology is the audited ${T25_MSTAT_ROUTE.length}-session route. Parent ARC numbers are context IDs, not study order.`
  ].join("\n");
}

function ensureStyles(){
  if(document.getElementById("t25AtomicMapStylesV4"))return;
  const style=document.createElement("style");style.id="t25AtomicMapStylesV4";style.textContent=`
    #routeGraph .t25-v4-node rect{rx:8;ry:8;stroke-width:1.1}
    #routeGraph .t25-v4-node.authored rect{fill:color-mix(in srgb,var(--green) 8%,var(--panel2));stroke:color-mix(in srgb,var(--green) 52%,var(--border))}
    #routeGraph .t25-v4-node.planned rect{fill:color-mix(in srgb,var(--panel2) 90%,transparent);stroke:var(--border)}
    #routeGraph .t25-v4-node.planned{opacity:.65} #routeGraph .t25-v4-node.selected rect{stroke:var(--accent)!important;stroke-width:2.2}
    #routeGraph .t25-v4-node.searchdim{opacity:.12} #routeGraph .t25-v4-code{font-size:9.2px;fill:var(--text);font-weight:760}
    #routeGraph .t25-v4-title{font-size:8.2px;fill:var(--text);font-weight:610} #routeGraph .t25-v4-meta{font-size:7px;fill:var(--muted)}
    #routeGraph .t25-v4-phase{font-size:9px;fill:var(--muted);font-weight:750;text-anchor:middle} #routeGraph .t25-v4-heading{font-size:15px;fill:var(--text);font-weight:820}
    #routeGraph .t25-v4-sub{font-size:9px;fill:var(--muted)} #detailKV .t25-v4-actions{grid-column:1/-1;display:flex;gap:7px;flex-wrap:wrap;margin-top:4px}
    #detailKV .t25-v4-actions button{border:1px solid var(--border);background:var(--panel2);color:var(--text);border-radius:7px;padding:5px 8px;cursor:pointer}
  `;document.head.appendChild(style);
}

const layer=document.createElement("div");layer.id="t25AtomicLayer";unitLabel.insertAdjacentElement("beforebegin",layer);
if(heading)heading.textContent="Choose one audited M.Stat session";
for(const node of unitLabel.childNodes){if(node.nodeType===Node.TEXT_NODE&&node.textContent.trim()){node.textContent="Parent grouping (secondary context)";break;}}
let selectedOrder=readSelectedOrder();

function routeOption(spec){const authored=authoredByOrder.has(spec.routeOrder);return `<option value="${spec.routeOrder}">${authored?"✓":"·"} ${routeNo(spec.routeOrder)} · ${esc(spec.syllabusCode)} · ${esc(spec.title)}${authored?"":" [planned]"}</option>`;}

function renderAtomicDetail(){
  if(!isMstatAtomicMap()||!detailTitle||!detailSummary||!detailTags||!detailKV)return;
  const spec=T25_MSTAT_ROUTE[selectedOrder-1];if(!spec)return;const card=authoredByOrder.get(selectedOrder)||null;
  detailTitle.textContent=`${routeNo(spec.routeOrder)} · ${spec.syllabusCode} · ${spec.title}`;
  detailSummary.textContent=card?card.centralCapability:`Planned audited session inside ${spec.targetCode} · ${spec.targetTitle}. No generic learning card has been generated.`;
  detailTags.innerHTML="";for(const [text,cls] of [[card?"authored":"planned",card?"existing":"term"],[spec.targetCode,"term"],[spec.parentId,"term"],[`Phase ${spec.phase}`,"term"]]){const span=document.createElement("span");span.className=`tag ${cls}`;span.textContent=text;detailTags.appendChild(span);}nodeControls?.classList.add("hidden");
  detailKV.innerHTML=card?`
    <div>Session</div><div>${routeNo(spec.routeOrder)} / ${T25_MSTAT_ROUTE.length}</div><div>Target</div><div>${esc(spec.targetCode)} · ${esc(spec.targetTitle)}</div>
    <div>Status</div><div>AUTHORED · ready for λ compilation</div><div>Evidence policy</div><div>${esc(card.evidencePolicy||spec.evidencePolicy||"standard")}</div>
    <div>Parent context</div><div>${esc(parentDisplay(spec.parentId))}</div><div>Focus</div><div>${esc(card.focus)}</div><div>Exit condition</div><div>${esc(card.exitCondition)}</div>
    <div class="t25-v4-actions"><button type="button" id="t25AtomicDetailOpen">Open full session card</button><button type="button" id="t25AtomicDetailCopy">Copy session card</button></div>`:`
    <div>Session</div><div>${routeNo(spec.routeOrder)} / ${T25_MSTAT_ROUTE.length}</div><div>Target</div><div>${esc(spec.targetCode)} · ${esc(spec.targetTitle)}</div>
    <div>Status</div><div>PLANNED · audited route only</div><div>Phase</div><div>${esc(PHASES[spec.phase])}</div><div>Parent context</div><div>${esc(parentDisplay(spec.parentId))}</div>
    <div>Exact target scope</div><div>${esc(spec.exactScope)}</div><div>Target exit</div><div>${esc(spec.targetExitCheck)}</div>
    <div class="t25-v4-actions"><button type="button" id="t25AtomicDetailOpen">Show session below</button></div>`;
  document.getElementById("t25AtomicDetailOpen")?.addEventListener("click",()=>layer.scrollIntoView({behavior:"smooth",block:"start"}));
  document.getElementById("t25AtomicDetailCopy")?.addEventListener("click",async()=>{if(card)try{await navigator.clipboard.writeText(atomicCardText(card));}catch{layer.scrollIntoView({behavior:"smooth",block:"start"});}});
}

function setMapChrome(active){if(routeFilter){routeFilter.disabled=active;routeFilter.title=active?"Parent-node filters do not apply to the audited session map.":"";}for(const id of["highlightCore","highlightPrereqs","clearHighlight"]){const b=document.getElementById(id);if(b)b.disabled=active;}if(legend)legend.innerHTML=active?`<span><i style="background:var(--green)"></i>authored session</span><span><i style="background:var(--muted)"></i>planned audited step</span><span><i style="background:var(--accent)"></i>selected</span>`:originalLegend;}

function renderAtomicMap(){
  if(!isMstatAtomicMap()){setMapChrome(false);return;}setMapChrome(true);ensureStyles();[...routeGraph.querySelectorAll(".render")].forEach(el=>el.remove());
  const phases=Object.keys(PHASES).map(Number);const columns=phases.length,nodeW=178,nodeH=52,gapX=12,gapY=6,left=16,top=98,width=left+columns*(nodeW+gapX)+8;
  const phaseRoutes=new Map(phases.map(p=>[p,T25_MSTAT_ROUTE.filter(r=>r.phase===p)]));const rows=Math.max(...[...phaseRoutes.values()].map(r=>r.length));const height=top+rows*(nodeH+gapY)+36;
  const search=(routeSearch?.value||"").toLowerCase().trim();routeGraph.setAttribute("viewBox",`0 0 ${width} ${height}`);routeGraph.style.minWidth=`${width}px`;routeGraph.style.height=`${height}px`;
  const h=document.createElementNS(SVG_NS,"text");h.setAttribute("x","16");h.setAttribute("y","24");h.setAttribute("class","t25-v4-heading render");h.textContent="M.Stat audited route · click any bounded session";routeGraph.appendChild(h);
  const sub=document.createElementNS(SVG_NS,"text");sub.setAttribute("x","16");sub.setAttribute("y","43");sub.setAttribute("class","t25-v4-sub render");sub.textContent=`${T25_ATOMIC_CARDS.length}/${T25_MSTAT_ROUTE.length} individually authored · 80 targets · parent ARC IDs are context only`;routeGraph.appendChild(sub);
  phases.forEach((phase,ci)=>{const x=left+ci*(nodeW+gapX);const list=phaseRoutes.get(phase);const label=document.createElementNS(SVG_NS,"text");label.setAttribute("x",String(x+nodeW/2));label.setAttribute("y","69");label.setAttribute("class","t25-v4-phase render");label.textContent=`P${phase} · ${routeNo(list[0].routeOrder)}–${routeNo(list.at(-1).routeOrder)}`;routeGraph.appendChild(label);const label2=document.createElementNS(SVG_NS,"text");label2.setAttribute("x",String(x+nodeW/2));label2.setAttribute("y","82");label2.setAttribute("class","t25-v4-phase render");label2.textContent=PHASES[phase].length>27?`${PHASES[phase].slice(0,26)}…`:PHASES[phase];routeGraph.appendChild(label2);
    list.forEach((spec,ri)=>{const y=top+ri*(nodeH+gapY),authored=authoredByOrder.has(spec.routeOrder),haystack=`${routeNo(spec.routeOrder)} ${spec.syllabusCode} ${spec.targetCode} ${spec.targetTitle} ${spec.title} ${spec.parentId} ${PHASES[spec.phase]}`.toLowerCase();const group=document.createElementNS(SVG_NS,"g");group.setAttribute("class",`node render t25-v4-node ${authored?"authored":"planned"}${selectedOrder===spec.routeOrder?" selected":""}${search&&!haystack.includes(search)?" searchdim":""}`);group.setAttribute("transform",`translate(${x},${y})`);group.dataset.atomicOrder=String(spec.routeOrder);group.style.cursor="pointer";group.setAttribute("tabindex","0");group.setAttribute("role","button");group.setAttribute("aria-label",`${routeNo(spec.routeOrder)} ${spec.syllabusCode}: ${spec.title}; ${authored?"authored":"planned"}`);
      const rect=document.createElementNS(SVG_NS,"rect");rect.setAttribute("width",String(nodeW));rect.setAttribute("height",String(nodeH));group.appendChild(rect);const code=document.createElementNS(SVG_NS,"text");code.setAttribute("x","7");code.setAttribute("y","13");code.setAttribute("class","t25-v4-code");code.textContent=`${routeNo(spec.routeOrder)} · ${spec.syllabusCode}`;group.appendChild(code);const dot=document.createElementNS(SVG_NS,"circle");dot.setAttribute("cx",String(nodeW-9));dot.setAttribute("cy","9");dot.setAttribute("r","3.5");dot.setAttribute("fill",authored?"var(--green)":"var(--muted)");group.appendChild(dot);titleLines(spec.title).forEach((line,i)=>{const text=document.createElementNS(SVG_NS,"text");text.setAttribute("x","7");text.setAttribute("y",String(27+i*9));text.setAttribute("class","t25-v4-title");text.textContent=line;group.appendChild(text);});const meta=document.createElementNS(SVG_NS,"text");meta.setAttribute("x","7");meta.setAttribute("y","48");meta.setAttribute("class","t25-v4-meta");meta.textContent=`${spec.targetCode} · ${spec.parentId} · ${authored?"AUTHORED":"PLANNED"}`;group.appendChild(meta);const choose=()=>chooseOrder(spec.routeOrder,{sync:true});group.addEventListener("click",choose);group.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choose();}});routeGraph.appendChild(group);});});
  renderAtomicDetail();
}

function renderCardBody({sync=false}={}){
  const spec=T25_MSTAT_ROUTE[selectedOrder-1];if(!spec)return;const card=authoredByOrder.get(selectedOrder)||null;if(sync)syncParent(spec);layer.dataset.selectedAtomicId=card?.id||"";layer.dataset.selectedParentId=spec.parentId;layer.dataset.selectedOrder=String(spec.routeOrder);
  const routeSelect=document.getElementById("t25AtomicRouteSelect");if(routeSelect)routeSelect.value=String(selectedOrder);const legacy=document.getElementById("t25AtomicSelect");if(legacy)legacy.value=card?.id||"";
  const summary=document.getElementById("t25AtomicSummary");if(summary)summary.textContent=`${routeNo(spec.routeOrder)} / ${T25_MSTAT_ROUTE.length} · ${spec.syllabusCode} · ${spec.targetCode} · ${spec.title}`;
  const context=document.getElementById("t25AtomicParentContext");if(context)context.textContent=`Target: ${spec.targetTitle}. Secondary parent context: ${parentDisplay(spec.parentId)}. Parent numbering does not control chronology.`;
  const text=document.getElementById("t25AtomicCardText");if(text)text.value=card?atomicCardText(card):`AUDITED SESSION ${routeNo(spec.routeOrder)} / ${T25_MSTAT_ROUTE.length}\n${spec.syllabusCode} · ${spec.title}\nTarget: ${spec.targetCode} · ${spec.targetTitle}\n\nExact target scope:\n${spec.exactScope}\n\nTarget exit check:\n${spec.targetExitCheck}\n\nThis route position is audited but its full atomic session contract has not yet been individually authored. Do not compile a generic placeholder.`;
  const copy=document.getElementById("t25AtomicCopy");if(copy)copy.disabled=!card;const status=document.getElementById("t25AtomicStatus");if(status)status.textContent=card?`AUTHORED · ready for λ compilation · ${card.evidencePolicy||spec.evidencePolicy||"standard"}.`:`PLANNED · audited route position; no generic card generated.`;
  const prev=document.getElementById("t25AtomicPrev"),next=document.getElementById("t25AtomicNext");if(prev)prev.disabled=selectedOrder<=1;if(next)next.disabled=selectedOrder>=T25_MSTAT_ROUTE.length;renderAtomicMap();renderAtomicDetail();document.dispatchEvent(new CustomEvent("chrono:t25-atomic-selected",{detail:card?{id:card.id,parentId:card.parentId,routeOrder:card.routeOrder,syllabusCode:card.syllabusCode,targetCode:card.targetCode}:null}));
}
function chooseOrder(order,{sync=true}={}){const numeric=Number(order);if(!Number.isInteger(numeric)||numeric<1||numeric>T25_MSTAT_ROUTE.length)return;selectedOrder=numeric;saveSelectedOrder();renderCardBody({sync});}

function render(){
  const authored=T25_ATOMIC_CARDS.length,nextSpec=T25_MSTAT_ROUTE.find(spec=>!authoredByOrder.has(spec.routeOrder))||null,nextText=nextSpec?`Next unauthored: ${routeNo(nextSpec.routeOrder)} · ${nextSpec.syllabusCode} · ${nextSpec.title}.`:`All ${T25_MSTAT_ROUTE.length} audited sessions are authored.`;
  layer.innerHTML=`<select id="t25AtomicSelect" hidden><option value=""></option>${T25_ATOMIC_CARDS.map(c=>`<option value="${esc(c.id)}">${esc(c.id)}</option>`).join("")}</select>
    <details class="t25-atomic-box" open><summary><strong>M.Stat audited v4 · 001→${T25_MSTAT_ROUTE.length} bounded sessions</strong> · ${esc(T25_ATOMIC_AUDIT_VERSION)}</summary>
    <p class="t25-muted"><strong>Primary navigation:</strong> use the big T25 map or the global session number. The 80 target headings group related sessions; ARC801 etc. are secondary context only.</p>
    <p class="t25-muted"><strong>Authoring progress:</strong> ${authored} / ${T25_MSTAT_ROUTE.length} session cards individually authored. ${esc(nextText)}</p>
    <label>Audited session position<select id="t25AtomicRouteSelect">${T25_MSTAT_ROUTE.map(routeOption).join("")}</select></label>
    <div class="t25-actions"><button type="button" id="t25AtomicPrev">← Previous</button><button type="button" id="t25AtomicNext">Next →</button></div>
    <p id="t25AtomicSummary" class="t25-eyebrow"></p><p id="t25AtomicStatus" class="t25-muted"></p><p id="t25AtomicParentContext" class="t25-muted"></p>
    <label>Copy-ready atomic session card<textarea id="t25AtomicCardText" rows="30" readonly></textarea></label>
    <div class="t25-actions"><a id="t25CourseLink" href="./t25-course.html?session=${selectedOrder}">Open course problems &amp; study record</a><button type="button" id="t25AtomicCopy">Copy authored session card</button><a href="${LAMBDA_COMPILER_URL}" target="_blank" rel="noopener noreferrer">Open λ Compiler</a><a href="${LAMBDA_EXTRACTOR_URL}" target="_blank" rel="noopener noreferrer">Open λ ARC Extractor</a></div>
    <p class="t25-muted"><strong>Workflow:</strong> audited map → one bounded session → λ Compiler → frozen ω SPIRE runtime → study → λ ARC Extractor. Historical clearance is not silently rewritten by this curriculum reset.</p></details>`;
  document.getElementById("t25AtomicRouteSelect").addEventListener("change",e=>chooseOrder(e.target.value));document.getElementById("t25AtomicPrev").addEventListener("click",()=>chooseOrder(selectedOrder-1));document.getElementById("t25AtomicNext").addEventListener("click",()=>chooseOrder(selectedOrder+1));document.getElementById("t25AtomicSelect").addEventListener("change",e=>{const card=T25_ATOMIC_CARDS.find(c=>c.id===e.target.value);if(card)chooseOrder(card.routeOrder);});document.getElementById("t25AtomicCopy").addEventListener("click",async()=>{const card=authoredByOrder.get(selectedOrder),text=document.getElementById("t25AtomicCardText"),status=document.getElementById("t25Status");if(!card){if(status)status.textContent=`Session ${routeNo(selectedOrder)} is planned but not authored; no placeholder copied.`;return;}try{await navigator.clipboard.writeText(text.value);if(status)status.textContent=`${card.id} copied. Compile only this bounded session.`;}catch{text.focus();text.select();if(status)status.textContent="Clipboard unavailable. The authored session card is selected; copy it manually.";}});renderCardBody({sync:true});
}

unitSelect.addEventListener("change",()=>{const context=document.getElementById("t25AtomicParentContext"),spec=T25_MSTAT_ROUTE[selectedOrder-1];if(context&&spec)context.textContent=`Target: ${spec.targetTitle}. Secondary parent context: ${parentDisplay(spec.parentId)}. Parent numbering does not control chronology.`;});
document.addEventListener("chrono:route-rendered",e=>{if(e.detail?.terminal==="T25")queueMicrotask(renderAtomicMap);else setMapChrome(false);});
document.addEventListener("chrono:t25-plan-changed",()=>queueMicrotask(()=>{renderCardBody({sync:true});renderAtomicMap();}));
render();queueMicrotask(renderAtomicMap);
