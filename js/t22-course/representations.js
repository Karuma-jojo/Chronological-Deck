const NS='http://www.w3.org/2000/svg';

function el(name,attrs={},text=''){
 const node=document.createElementNS(NS,name);
 for(const [k,v] of Object.entries(attrs)) node.setAttribute(k,String(v));
 if(text) node.textContent=text;
 return node;
}
function html(name,attrs={},text=''){
 const node=document.createElement(name);
 for(const [k,v] of Object.entries(attrs)){
  if(k==='class') node.className=v; else node.setAttribute(k,String(v));
 }
 if(text) node.textContent=text;
 return node;
}
function poly(coeffs,x){return (coeffs||[]).reduce((y,c)=>y*x+c,0);}
function value(s,x){
 switch(s.family){
  case 'line': return (s.m??1)*x+(s.b??0);
  case 'quadratic': return (s.a??1)*(x-(s.h??0))**2+(s.k??0);
  case 'abs': return (s.a??1)*Math.abs(x-(s.h??0))+(s.k??0);
  case 'sqrt': {
   const z=(s.insideA??1)*x+(s.insideB??0); if(z<0)return NaN;
   return (s.a??1)*Math.sqrt(z)+(s.k??0);
  }
  case 'polynomial': return poly(s.coefficients,x);
  case 'rational': {
   const d=poly(s.denominator,x); if(Math.abs(d)<1e-8)return NaN;
   return poly(s.numerator,x)/d;
  }
  case 'exp': return (s.A??1)*(s.base??Math.E)**(x-(s.h??0))+(s.k??0);
  case 'log': {
   const z=x-(s.h??0),base=s.base??Math.E;if(z<=0||base<=0||base===1)return NaN;
   return (s.A??1)*(Math.log(z)/Math.log(base))+(s.k??0);
  }
  case 'sin': return (s.A??1)*Math.sin((s.B??1)*(x-(s.h??0)))+(s.D??0);
  case 'cos': return (s.A??1)*Math.cos((s.B??1)*(x-(s.h??0)))+(s.D??0);
  default:return NaN;
 }
}
function nice(v){return Math.abs(v)<1e-10?'0':Number.isInteger(v)?String(v):String(Math.round(v*100)/100);}
function axisMap(min,max,a,b){return v=>a+(v-min)*(b-a)/(max-min);}
function addText(svg,x,y,text,cls='repr-label',anchor='middle'){
 svg.append(el('text',{x,y,class:cls,'text-anchor':anchor},text));
}
function plot(spec){
 const W=720,H=380,pad={l:55,r:24,t:36,b:45};
 const [xmin,xmax]=spec.xRange||[-5,5],[ymin,ymax]=spec.yRange||[-5,5];
 const X=axisMap(xmin,xmax,pad.l,W-pad.r),Y=axisMap(ymin,ymax,H-pad.b,pad.t);
 const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,class:'repr-svg',role:'img','aria-label':spec.alt||spec.title||'Mathematical graph'});
 svg.append(el('rect',{x:pad.l,y:pad.t,width:W-pad.l-pad.r,height:H-pad.t-pad.b,class:'repr-plot-bg'}));
 const xt=spec.xTick||1,yt=spec.yTick||1;
 const x0=Math.ceil(xmin/xt)*xt,y0=Math.ceil(ymin/yt)*yt;
 for(let x=x0;x<=xmax+1e-9;x+=xt){
  const px=X(x);svg.append(el('line',{x1:px,y1:pad.t,x2:px,y2:H-pad.b,class:'repr-grid'}));
  if(Math.abs(x)>1e-9||!(ymin<=0&&0<=ymax))addText(svg,px,H-pad.b+20,nice(x),'repr-tick');
 }
 for(let y=y0;y<=ymax+1e-9;y+=yt){
  const py=Y(y);svg.append(el('line',{x1:pad.l,y1:py,x2:W-pad.r,y2:py,class:'repr-grid'}));
  if(Math.abs(y)>1e-9||!(xmin<=0&&0<=xmax))addText(svg,pad.l-10,py+4,nice(y),'repr-tick','end');
 }
 const axisY=ymin<=0&&0<=ymax?Y(0):H-pad.b,axisX=xmin<=0&&0<=xmax?X(0):pad.l;
 svg.append(el('line',{x1:pad.l,y1:axisY,x2:W-pad.r,y2:axisY,class:'repr-axis'}));
 svg.append(el('line',{x1:axisX,y1:pad.t,x2:axisX,y2:H-pad.b,class:'repr-axis'}));
 if(spec.xLabel)addText(svg,W-pad.r,H-8,spec.xLabel,'repr-axis-label','end');
 if(spec.yLabel)addText(svg,pad.l+5,pad.t-12,spec.yLabel,'repr-axis-label','start');
 (spec.asymptotes||[]).forEach(a=>{
  if(a.axis==='x'&&a.value>=xmin&&a.value<=xmax)svg.append(el('line',{x1:X(a.value),y1:pad.t,x2:X(a.value),y2:H-pad.b,class:'repr-asymptote'}));
  if(a.axis==='y'&&a.value>=ymin&&a.value<=ymax)svg.append(el('line',{x1:pad.l,y1:Y(a.value),x2:W-pad.r,y2:Y(a.value),class:'repr-asymptote'}));
 });
 (spec.series||[]).forEach((s,si)=>{
  const samples=Math.max(240,s.samples||480),segments=[];let seg=[];
  for(let i=0;i<=samples;i++){
   const x=xmin+(xmax-xmin)*i/samples,y=value(s,x),valid=Number.isFinite(y)&&y>=ymin-0.15*(ymax-ymin)&&y<=ymax+0.15*(ymax-ymin);
   if(!valid){if(seg.length>1)segments.push(seg);seg=[];continue;}
   const p=[X(x),Y(y)];
   if(seg.length&&Math.abs(p[1]-seg.at(-1)[1])>H*.42){if(seg.length>1)segments.push(seg);seg=[];}
   seg.push(p);
  }
  if(seg.length>1)segments.push(seg);
  for(const pts of segments){
   const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' ');
   svg.append(el('path',{d,class:`repr-curve repr-series-${si%4}`,fill:'none'}));
  }
  (s.holes||[]).forEach(([x,y])=>svg.append(el('circle',{cx:X(x),cy:Y(y),r:5,class:`repr-hole repr-series-${si%4}`})));
  (s.points||[]).forEach(p=>{
   const [x,y,label]=p;svg.append(el('circle',{cx:X(x),cy:Y(y),r:4,class:`repr-point repr-series-${si%4}`}));
   if(label)addText(svg,X(x)+7,Y(y)-8,label,'repr-label','start');
  });
 });
 (spec.points||[]).forEach(p=>{
  const [x,y,label]=p;svg.append(el('circle',{cx:X(x),cy:Y(y),r:4.5,class:'repr-point'}));
  if(label)addText(svg,X(x)+7,Y(y)-8,label,'repr-label','start');
 });
 return svg;
}
function numberLine(spec){
 const W=720,H=150,pad=55,min=spec.min??-6,max=spec.max??6,tick=spec.tick||1,X=axisMap(min,max,pad,W-pad),y=72;
 const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,class:'repr-svg',role:'img','aria-label':spec.alt||spec.title||'Number line'});
 svg.append(el('line',{x1:pad,y1:y,x2:W-pad,y2:y,class:'repr-axis'}));
 svg.append(el('path',{d:`M ${pad} ${y} l 10 -5 l 0 10 z M ${W-pad} ${y} l -10 -5 l 0 10 z`,class:'repr-axis-fill'}));
 for(let v=Math.ceil(min/tick)*tick;v<=max+1e-9;v+=tick){
  const x=X(v);svg.append(el('line',{x1:x,y1:y-7,x2:x,y2:y+7,class:'repr-axis'}));addText(svg,x,y+25,nice(v),'repr-tick');
 }
 (spec.intervals||[]).forEach((r,i)=>{
  const a=X(Math.max(min,r.from)),b=X(Math.min(max,r.to)),yy=y-18-i*13;
  svg.append(el('line',{x1:a,y1:yy,x2:b,y2:yy,class:'repr-interval'}));
  if(r.from>min)svg.append(el('circle',{cx:X(r.from),cy:yy,r:5,class:r.closedFrom?'repr-end-closed':'repr-end-open'}));
  if(r.to<max)svg.append(el('circle',{cx:X(r.to),cy:yy,r:5,class:r.closedTo?'repr-end-closed':'repr-end-open'}));
  if(r.label)addText(svg,(a+b)/2,yy-9,r.label,'repr-label');
 });
 (spec.points||[]).forEach(p=>{const x=X(p.value);svg.append(el('circle',{cx:x,cy:y,r:5,class:'repr-point'}));if(p.label)addText(svg,x,y-13,p.label,'repr-label');});
 return svg;
}
function unitCircle(spec){
 const W=420,H=360,cx=210,cy=185,r=125,a=Number(spec.angleRad??0),x=Math.cos(a),y=Math.sin(a);
 const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,class:'repr-svg repr-circle',role:'img','aria-label':spec.alt||spec.title||'Unit circle'});
 svg.append(el('line',{x1:45,y1:cy,x2:375,y2:cy,class:'repr-axis'}));svg.append(el('line',{x1:cx,y1:25,x2:cx,y2:345,class:'repr-axis'}));
 svg.append(el('circle',{cx,cy,r,class:'repr-circle-line'}));
 svg.append(el('line',{x1:cx,y1:cy,x2:cx+r*x,y2:cy-r*y,class:'repr-radius'}));
 svg.append(el('line',{x1:cx+r*x,y1:cy,x2:cx+r*x,y2:cy-r*y,class:'repr-guide'}));
 svg.append(el('circle',{cx:cx+r*x,cy:cy-r*y,r:5,class:'repr-point'}));
 addText(svg,cx+r*x+8,cy-r*y-8,spec.pointLabel||`(${nice(x)}, ${nice(y)})`,'repr-label','start');
 addText(svg,370,cy-8,'x = cos θ','repr-axis-label','end');addText(svg,cx+8,35,'y = sin θ','repr-axis-label','start');
 if(spec.angleLabel)addText(svg,cx+46,cy-18,spec.angleLabel,'repr-label','start');
 return svg;
}
function table(spec){
 const wrap=html('div',{class:'repr-table-wrap'});
 const t=html('table',{class:'repr-table'}),cap=html('caption',{},spec.title||'');
 if(spec.title)t.append(cap);
 const thead=html('thead'),tr=html('tr');for(const h of spec.headers||[])tr.append(html('th',{},h));thead.append(tr);t.append(thead);
 const body=html('tbody');for(const row of spec.rows||[]){const rr=html('tr');for(const c of row)rr.append(html('td',{},String(c)));body.append(rr);}t.append(body);wrap.append(t);return wrap;
}
function one(spec){
 const fig=html('figure',{class:'representation'});
 if(spec.title&&spec.kind!=='table')fig.append(html('figcaption',{},spec.title));
 if(spec.kind==='plot')fig.append(plot(spec));
 else if(spec.kind==='numberLine')fig.append(numberLine(spec));
 else if(spec.kind==='unitCircle')fig.append(unitCircle(spec));
 else if(spec.kind==='table')fig.append(table(spec));
 else fig.append(html('p',{class:'small'},'Unsupported representation.'));
 if(spec.note)fig.append(html('p',{class:'repr-note'},spec.note));
 return fig;
}
export function renderRepresentations(container,specs=[]){
 container.replaceChildren();
 for(const spec of specs||[])container.append(one(spec));
 container.hidden=!(specs&&specs.length);
}
