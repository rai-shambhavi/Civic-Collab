
const $=s=>document.querySelector(s),e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='prayog_mh_v1',NO=['Low','Medium','High','Critical'];
const P=['Submitted','Validated','Assigned','Accepted','Proposal Submitted','In Progress','Testing','Pilot Complete'];
const D={domains:['Agriculture & Rural Livelihoods','Water Scarcity & Management','Education & Digital Access','Healthcare & Sanitation','Environment & Waste Management','Renewable Energy','Accessibility','Urban Infrastructure & Public Services'],
districts:['Mumbai','Pune','Nagpur','Nashik','Kolhapur','Chhatrapati Sambhajinagar','Solapur','Latur','Beed','Amravati','Gadchiroli','Satara','Thane','Ahilyanagar'],
insts:['Sahyadri Institute of Technology, Pune','Vidarbha Engineering College, Nagpur','Deccan Agri University, Kolhapur','Marathwada Polytechnic, Chh. Sambhajinagar']};
const K=[
['Agriculture & Rural Livelihoods','crop farm soil pest yield mandi cotton sugarcane livelihood harvest seed fertiliser',['SDG 2','SDG 1'],['Agricultural Engineering','Agronomy','Data Science'],['Agri-tech firms','Farmer producer companies']],
['Water Scarcity & Management','water irrigation drought well borewell tanker canal drip rain dam groundwater shortage dried',['SDG 6','SDG 2'],['Civil / Water Resources Engineering','IoT & Electronics','Agronomy'],['Irrigation equipment makers','IoT sensor firms']],
['Education & Digital Access','school student teacher learning internet digital offline classroom tablet',['SDG 4','SDG 10'],['Education','Computer Science','Electronics'],['EdTech','Telecom providers']],
['Healthcare & Sanitation','health clinic hospital vaccine disease toilet sanitation phc medicine nutrition',['SDG 3','SDG 6'],['Biomedical Engineering','Public Health','Electronics'],['MedTech','Diagnostics firms']],
['Environment & Waste Management','waste garbage plastic river pollution dumping recycling sewage air',['SDG 12','SDG 11'],['Environmental Science','Chemical Engineering','Civil Engineering'],['Recycling firms','Waste-management operators']],
['Renewable Energy','solar energy electricity power wind biogas battery pump grid',['SDG 7','SDG 13'],['Electrical Engineering','Mechanical Engineering','Energy Studies'],['Solar integrators','Energy service companies']],
['Accessibility','wheelchair disability disabled accessible blind ramp footpath visually',['SDG 10','SDG 11'],['Design','Mechanical Engineering','Computer Science'],['Assistive-tech firms','Design studios']],
['Urban Infrastructure & Public Services','road traffic transport bus drainage flooding urban municipal housing streetlight',['SDG 11','SDG 9'],['Civil Engineering','Urban Planning','Computer Science'],['Infrastructure firms','GovTech startups']]];
let st;
function load(){try{const j=localStorage.getItem(KEY);if(j)return JSON.parse(j)}catch(_){}return seed()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(_){}}
const g=id=>st.cs.find(c=>c.id===id),cur=()=>g(st.cur);
const w=s=>new Set(s.toLowerCase().match(/[a-z]{4,}/g)||[]);
function ai(o){const tx=(o.title+' '+o.desc).toLowerCase();let b=null,n=0;
 K.forEach(k=>{const h=k[1].split(' ').filter(x=>tx.includes(x)).length;if(h>n){n=h;b=k}});
 const k=b||K.find(x=>x[0]===o.domain)||K[0];
 const hot=['drought','shortage','no water','disease','death','children','flood','failing','dry','dried','without'].filter(x=>tx.includes(x)).length;
 const sc=Math.min(100,(NO.indexOf(o.urgency)+1)*15+Math.min(25,Math.round(o.pop/100))+Math.min(15,hot*5));
 return{dom:k[0],n,sc,prio:sc>=70?'High':sc>=45?'Medium':'Low',sdgs:k[2],disc:k[3],ind:k[4],dups:[],
 why:`Domain "${k[0]}" matched ${n} keyword(s). Priority score ${sc}/100 = urgency level + affected population + ${hot} severity term(s). Disciplines/SDGs come from a fixed domain lookup table.`}}
function dups(c){const a=w(c.title+' '+c.desc);return st.cs.filter(x=>x.id!==c.id).map(x=>{const b=w(x.title+' '+x.desc);let i=0;a.forEach(t=>b.has(t)&&i++);let s=i/(a.size+b.size-i||1);if(x.district===c.district)s+=.15;if(x.ai.dom===c.ai.dom)s+=.1;return{id:x.id,t:x.title,s:Math.round(s*100)}}).filter(d=>d.s>=30).sort((p,q)=>q.s-p.s).slice(0,3)}
function lg(c,m){c.log.unshift({t:new Date().toLocaleString(),m,r:st.role})}
function mk(o){const a=ai(o);const c={id:`PRY-${new Date().getFullYear()}-${String(st.seq++).padStart(4,'0')}`,...o,pop:+o.pop,status:'Submitted',prio:a.prio,ai:a,team:[],prop:'',tasks:[],ms:[],tests:[],ev:o.ev||[],inst:'',rej:'',log:[]};
 c.ai.dups=dups(c);st.cs.unshift(c);lg(c,'Challenge submitted');return c}
function seed(){st={role:'citizen',view:'home',cur:null,prev:'home',seq:1,cs:[],co:[]};
 [['Borewells dried up across Niphad villages','Borewells have dried up in several Niphad villages; farmers lack irrigation water and depend on costly tanker water during shortage.',D.domains[1],'Nashik','Niphad',2,1800,'Validated'],
 ['Offline digital lessons for Gadchiroli hamlet schools','Students in remote hamlets have no internet; teachers need offline digital learning content on low-cost devices.',D.domains[2],'Gadchiroli','Bhamragad',1,600,'Assigned'],
 ['Mixed waste dumped along Panchganga ghats','Plastic and mixed garbage dumped near the river ghats causes pollution during festivals.',D.domains[4],'Kolhapur','Kolhapur city',2,4000,'Submitted'],
 ['Vaccine cold-chain fails during power cuts at a rural clinic','Rural PHC loses power for hours; vaccine storage and medicine cooling fail, affecting children.',D.domains[3],'Pune','Velhe',1,900,'Submitted'],
 ['Footpaths and bus stops not wheelchair accessible','Footpaths lack ramps and bus stops are inaccessible to wheelchair users and blind commuters.',D.domains[6],'Mumbai','Andheri',1,5000,'Validated']
 ].forEach(a=>{const c=mk({title:a[0],desc:a[1],domain:a[2],district:a[3],place:a[4],urgency:NO[a[5]],pop:a[6]});c.log=[{t:'(seed)',m:'Fictional sample challenge',r:'system'}];
  if(a[7]!=='Submitted'){c.status='Validated'}if(a[7]==='Assigned'){c.status='Assigned';c.inst=D.insts[1]}});
 return st}
function pct(c){const a=c.tasks.concat(c.ms);return a.length?Math.round(100*a.filter(x=>x.d).length/a.length):0}
function adv(c){const i=P.indexOf(c.status);if(i>=3&&i<5&&(c.tasks.concat(c.ms).some(x=>x.d)))c.status='In Progress';if(c.ms[3]&&c.ms[3].d)c.status='Pilot Complete'}
// ---- actions
function sv(){save();render()}
function val(id){const c=g(id);c.status='Validated';c.prio=$('#p_'+id).value;lg(c,`Validated by Government; priority ${c.prio}`);toast(id+' validated');sv()}
function rej(id){const r=$('#r_'+id).value.trim();if(!r)return toast('Enter a rejection reason');const c=g(id);c.status='Rejected';c.rej=r;lg(c,'Rejected: '+r);sv()}
function asg(id){const c=g(id);c.inst=$('#i_'+id).value;c.status='Assigned';lg(c,'Forwarded/assigned to '+c.inst);toast('Assigned');sv()}
function acc(id){const c=g(id);c.status='Accepted';c.tasks=['Site survey and water-source mapping','Design low-cost soil-moisture irrigation scheduler','Build working prototype','Field pilot with partner farmers'].map(t=>({t,d:false,due:''}));c.ms=['Proposal approved','Prototype built','Field test completed','Pilot report published'].map(t=>({t,d:false}));lg(c,'Accepted by '+c.inst);sv()}
function joinTeam(){const c=cur();if(c.team.some(m=>m.n==='You (student)'))return toast('Already in the team');c.team.push({n:'You (student)',r:'Student',d:$('#td').value.trim()||'-'});lg(c,'Student joined the team');sv()}
function addTeam(){const n=$('#tn').value.trim();if(!n)return toast('Enter member name');const c=cur();c.team.push({n,r:$('#tr').value,d:$('#td').value.trim()||'-'});lg(c,'Team member added: '+n);sv()}
function sendProp(){const t=$('#pr').value.trim();if(t.length<30)return toast('Proposal needs at least 30 characters');const c=cur();c.prop=t;if(P.indexOf(c.status)<4)c.status='Proposal Submitted';lg(c,'Solution proposal submitted');sv()}
function addTask(){const t=$('#tk').value.trim(),d=$('#tdue').value;if(!t)return;cur().tasks.push({t,d:false,due:d});sv()}
function tg(k,i){const c=cur(),x=c[k][i];x.d=!x.d;lg(c,(x.d?'Completed: ':'Reopened: ')+(x.t||x.n||''));adv(c);sv()}
function addTest(){const t=$('#ts').value.trim();if(!t)return toast('Describe the test');const c=cur();c.tests.push({t,r:$('#tp').value,at:new Date().toLocaleDateString()});if(P.indexOf(c.status)<7)c.status='Testing';lg(c,'Test result recorded ('+$('#tp').value+')');sv()}
function addEv(){const f=$('#ef').files[0],t=f?f.name+' (name only, not uploaded)':$('#en').value.trim();if(!t)return;cur().ev.push({n:t});lg(cur(),'Evidence added');sv()}
function offer(id){const c=g(id),o=$('#oo_'+id).value.trim();if(!o)return toast('Enter organisation name');st.co.push({id:'COL-'+String(st.co.length+1).padStart(3,'0'),ch:id,type:$('#ot_'+id).value,org:o,note:$('#on_'+id).value.trim(),status:'Pending'});lg(c,`Industry offer: ${$('#ot_'+id).value} by ${o}`);toast('Offer recorded');sv()}
function acco(i){st.co[i].status='Accepted by team';lg(g(st.co[i].ch),'Collaboration accepted: '+st.co[i].org);sv()}
function sub(){const v=i=>$('#'+i).value.trim(),er=[];
 if(v('t').length<8)er.push('Title needs at least 8 characters');if(v('de').length<30)er.push('Description needs at least 30 characters');if(!v('pl'))er.push('Village / city is required');if(!(+v('pp')>0))er.push('Affected population must be a positive number');
 $('#err').innerHTML=er.map(e).join('<br>');if(er.length)return;
 const ev=[];const f=$('#evf').files[0];if(f)ev.push({n:f.name+' (name only, not uploaded)'});if(v('evn'))ev.push({n:v('evn')});
 const c=mk({title:v('t'),desc:v('de'),domain:v('dm'),district:v('ds'),place:v('pl'),urgency:v('ur'),pop:v('pp'),ev});st.flash=`Submitted! Your challenge ID is ${c.id}`;go('detail',c.id)}
function fill(){const d=DI;$('#t').value=d.title;$('#de').value=d.desc;$('#dm').value=d.domain;$('#ds').value=d.district;$('#pl').value=d.place;$('#ur').value=d.urgency;$('#pp').value=d.pop;$('#evn').value=d.ev[0].n}
function resetAll(){localStorage.removeItem(KEY);seed();save();render();toast('Demo data restored')}
// ---- nav/render
function go(v,id){if(v==='detail')st.prev=st.view;st.view=v;if(id)st.cur=id;save();render();scrollTo(0,0)}
const NAV=[['home','Home'],['gov','Challenges'],['stu','University'],['ind','Industry'],['impact','Dashboard'],['citizen','Submit a challenge ↗']];
function nav(k){if(k==='home'||k==='impact')st.view=k;else{st.role=k;st.view=k}save();render();scrollTo(0,0)}
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display='none',2600)}
const opt=(a,s)=>a.map(x=>`<option${x===s?' selected':''}>${e(x)}</option>`).join('');
const tag=(t,c='')=>`<span class="tag ${c}">${e(t)}</span>`;
function bars(o){const m=Math.max(1,...Object.values(o));return Object.entries(o).map(([k,v])=>`<div class="br"><span>${e(k)}</span><div><i style="width:${v/m*100}%"></i></div><b>${v}</b></div>`).join('')||'<p class="m">No data yet.</p>'}
const cnt=(a,f)=>{const o={};a.forEach(x=>{const k=f(x);o[k]=(o[k]||0)+1});return o};
const pb=p=>`<div class="pb"><i style="width:${p}%"></i></div>`;
const card=c=>`<div class="card"><b><a onclick="go('detail','${c.id}')">${c.id}</a></b> ${tag(c.status,c.status==='Rejected'?'h':'')}${tag('Priority: '+c.prio,c.prio==='High'?'h':'')}<br><b>${e(c.title)}</b><br><span class="m">${e(c.place)}, ${e(c.district)} · ${e(c.domain)}</span>${c.inst?pb(pct(c)):''}</div>`;
function home(){const a=st.cs,v=a.filter(c=>P.indexOf(c.status)>=1);
 return `<section class="hero"><p class="eye">MAHARASHTRA · SOCIETAL INNOVATION EXCHANGE</p><h1>Citizens spot<br>the problem.<br><em>Campuses crack it.</em></h1><p>PRAYOG routes real community challenges from every district of Maharashtra to university labs and industry partners — turning civic complaints into funded, field-tested innovation under NEP 2020.</p><div class="row"><button class="btn a" onclick="nav('citizen')">Submit a challenge →</button><button class="btn w" onclick="nav('gov')">Explore challenges ↗</button></div><div class="hstat"><span><b>${a.length}</b> Live challenges</span><span><b>${D.insts.length}</b> Universities</span><span><b>${st.co.length}</b> Industry offers</span></div></section>
<div class="grid st">${[['Challenges',a.length],['Validated or later',v.length],['Active projects',a.filter(c=>P.indexOf(c.status)>=3).length],['Industry offers',st.co.length]].map(x=>`<div class="card"><b>${x[1]}</b>${x[0]}</div>`).join('')}</div>
<h2>Problem domains</h2>${D.domains.map(d=>tag(d)).join('')}
<h2>Choose a role (sample login)</h2><div class="grid">${[['citizen','Citizen','Report a local problem and track it.'],['gov','Government','Validate, prioritise, assign, monitor.'],['stu','Student','View assigned challenges, build teams, proposals, tests.'],['ind','Industry','Offer mentorship, funding, equipment.']].map(r=>`<div class="card"><h3>${r[1]}</h3><p class="m">${r[2]}</p><button class="btn s" onclick="nav('${r[0]}')">Enter as ${r[1]}</button></div>`).join('')}</div>`}
function citizen(){return `<h2>Submit a challenge</h2><div class="card"><div id="err" class="err"></div><div class="grid">
<label>Title<input id="t"></label><label>Domain<select id="dm">${opt(D.domains)}</select></label><label>District<select id="ds">${opt(D.districts)}</select></label><label>Village / city<input id="pl"></label><label>Urgency<select id="ur">${opt(NO,'Medium')}</select></label><label>Affected population<input id="pp" type="number" min="1"></label>
<label class="full">Description<textarea id="de" rows="3"></textarea></label><label>Evidence file<input id="evf" type="file"></label><label>Evidence note<input id="evn"></label></div>
<p class="m">Prototype: files are not uploaded; only the file name and note are saved in this browser.</p><div class="row"><button class="btn" onclick="sub()">Submit challenge</button><button class="btn ghost" onclick="fill()">Fill sample (fictional)</button></div></div>
<h2>Community challenges &amp; progress</h2><div class="row"><input id="q" placeholder="Search…" oninput="L()"><select id="fs" onchange="L()"><option value="">All statuses</option>${opt(P.concat('Rejected'))}</select><select id="fd" onchange="L()"><option value="">All domains</option>${opt(D.domains)}</select></div><div id="list" class="grid"></div>`}
function L(){const q=$('#q').value.toLowerCase(),s=$('#fs').value,d=$('#fd').value;const a=st.cs.filter(c=>(!s||c.status===s)&&(!d||c.domain===d)&&(c.title+c.desc+c.id+c.district+c.place).toLowerCase().includes(q));$('#list').innerHTML=a.map(card).join('')||'<p class="m">No challenges match.</p>'}
function govAct(c){if(c.status==='Submitted')return `<select id="p_${c.id}">${opt(['High','Medium','Low'],c.ai.prio)}</select> <input id="r_${c.id}" placeholder="Reason if rejecting"> <button class="btn s" onclick="val('${c.id}')">Validate</button> <button class="btn s ghost" onclick="rej('${c.id}')">Reject</button>`;
 if(c.status==='Validated')return `<select id="i_${c.id}">${opt(D.insts)}</select> <button class="btn s" onclick="asg('${c.id}')">Assign</button>`;
 if(c.status==='Rejected')return 'Reason: '+e(c.rej);return `${e(c.inst)}<br>${pct(c)}% complete`}
function gov(){const a=st.cs;return `<h2>Government review queue</h2><p class="m">Review, validate, reject with reason, prioritise and assign to institutions.</p><div class="tw"><table><tr><th>Challenge</th><th>AI priority (simulated)</th><th>Status</th><th>Action</th></tr>${a.map(c=>`<tr><td><a onclick="go('detail','${c.id}')">${c.id}</a><br>${e(c.title)}<br><span class="m">${e(c.district)} · ${e(c.domain)}</span>${c.ai.dups.length?`<br>${tag('⚠ similar to '+c.ai.dups.map(d=>d.id).join(', '),'s')}`:''}</td><td>${c.prio} (${c.ai.sc})</td><td>${tag(c.status)}</td><td>${govAct(c)}</td></tr>`).join('')}</table></div>
<h2>Analytics</h2><div class="grid"><div class="card"><h3>By domain</h3>${bars(cnt(a,c=>c.domain))}</div><div class="card"><h3>By district</h3>${bars(cnt(a,c=>c.district))}</div><div class="card"><h3>Institutional assignments</h3>${a.filter(c=>c.inst).map(c=>`<p>${c.id} → ${e(c.inst)}<br>${pb(pct(c))}</p>`).join('')||'<p class="m">None yet.</p>'}</div></div>`}
function stu(){const a=st.cs.filter(c=>P.indexOf(c.status)>=2);return `<h2>Student dashboard</h2><p class="m">Challenges forwarded by Government. Open a project to manage team, proposal, tasks, tests.</p><div class="grid">${a.map(c=>card(c)+(c.status==='Assigned'?'':'')).join('')||'<p class="m">No assigned challenges yet. Government must validate and assign one.</p>'}</div>`}
function ind(){const a=st.cs.filter(c=>P.indexOf(c.status)>=1);return `<h2>Industry collaboration</h2><p class="m">Validated challenges and student projects. Offer support below.</p><div class="grid">${a.map(c=>`<div class="card">${card(c).replace(/^<div class="card">|<\/div>$/g,'')}<div class="row"><select id="ot_${c.id}">${opt(['Mentorship','Funding','Equipment','Testing','Technical support','Prototyping support'])}</select><input id="oo_${c.id}" placeholder="Your organisation"><input id="on_${c.id}" placeholder="Note"><button class="btn s" onclick="offer('${c.id}')">Offer</button></div></div>`).join('')||'<p class="m">No validated challenges yet.</p>'}</div>
<h2>My collaboration requests</h2><div class="tw"><table><tr><th>ID</th><th>Challenge</th><th>Type</th><th>Organisation</th><th>Status</th></tr>${st.co.map(o=>`<tr><td>${o.id}</td><td>${o.ch}</td><td>${e(o.type)}</td><td>${e(o.org)}<br><span class="m">${e(o.note)}</span></td><td>${o.status}</td></tr>`).join('')||'<tr><td colspan=5 class="m">No requests yet.</td></tr>'}</table></div>`}
function impact(){const a=st.cs,act=a.filter(c=>P.indexOf(c.status)>=3),pil=a.filter(c=>c.tests.some(t=>t.r==='Pass')||c.status==='Pilot Complete');
 const avg=act.length?Math.round(act.reduce((s,c)=>s+pct(c),0)/act.length):0,pop=act.reduce((s,c)=>s+c.pop,0);
 return `<h2>Project &amp; impact dashboard</h2><div class="sim">⚠ SIMULATED - status is from this sample's records; population figures are submitter-reported and unverified; "illustrative reach" is a model assumption, not a measured outcome.</div>
<div class="grid st">${[['Total challenges',a.length],['Active projects',act.length],['Avg completion',avg+'%'],['Industry offers',st.co.length]].map(x=>`<div class="card"><b>${x[1]}</b>${x[0]}</div>`).join('')}</div>
<div class="grid"><div class="card"><h3>Lifecycle stage</h3>${bars(cnt(a,c=>c.status))}</div><div class="card"><h3>Domain</h3>${bars(cnt(a,c=>c.domain))}</div>
<div class="card"><h3>Estimated beneficiaries (simulated)</h3><p>Affected population in active projects: <b>${pop.toLocaleString()}</b> (reported)</p><p>Illustrative pilot reach: <b>${Math.round(pil.reduce((s,c)=>s+c.pop,0)*.1).toLocaleString()}</b><br><span class="m">Assumes a pilot reaches 10% of the affected population. Illustrative only; nobody has been verified as reached.</span></p></div></div>
<h2>Projects</h2><div class="grid">${act.map(c=>`${card(c)}`).join('')||'<p class="m">No active projects yet.</p>'}</div>`}
function detail(){const c=cur();if(!c)return '<p>Not found.</p>';const i=P.indexOf(c.status),ed=st.role==='stu',fl=st.flash;st.flash=null;
 const ws=i>=3;
 return `<button class="btn ghost s" onclick="go('${st.prev||'home'}')">← Back</button>${fl?`<div class="flash">✅ ${e(fl)}</div>`:''}
<h2>${e(c.title)}</h2><div>${tag(c.id)}${tag(c.status,c.status==='Rejected'?'h':'')}${tag('Priority: '+c.prio,c.prio==='High'?'h':'')}${tag('Sample data (fictional)','s')}</div>
<div class="pipe">${P.map((p,k)=>`<span class="${k<=i?'d':''}">${p}</span>`).join('')}</div>${c.status==='Rejected'?`<div class="err">Rejected: ${e(c.rej)}</div>`:''}
<div class="grid"><div class="card"><h3>Details</h3><p>${e(c.desc)}</p><p class="m">${e(c.place)}, ${e(c.district)} · ${e(c.domain)}<br>Urgency: ${c.urgency} · Affected: ${c.pop.toLocaleString()}</p><b>Evidence</b><ul>${c.ev.map(x=>`<li>${e(x.n)}</li>`).join('')||'<li class="m">None</li>'}</ul>${c.inst?`<p><b>Assigned to:</b> ${e(c.inst)}</p>`:''}</div>
<div class="card"><h3>AI analysis <span class="tag s">Simulated · rule-based</span></h3><p><b>Domain:</b> ${e(c.ai.dom)}${c.ai.dom!==c.domain?` <span class="m">(you chose ${e(c.domain)})</span>`:''}<br><b>Urgency score:</b> ${c.ai.sc}/100 → <b>${c.ai.prio}</b></p>${pb(c.ai.sc)}<p class="m">${e(c.ai.why)}</p><b>SDGs:</b> ${c.ai.sdgs.map(x=>tag(x)).join('')}<br><b>Disciplines:</b> ${c.ai.disc.map(x=>tag(x)).join('')}<br><b>Industry expertise:</b> ${c.ai.ind.map(x=>tag(x)).join('')}<br><b>Possible duplicates:</b> ${c.ai.dups.map(d=>`<div><a onclick="go('detail','${d.id}')">${d.id}</a> ${e(d.t)} (${d.s}% similar)</div>`).join('')||'<span class="m">None found</span>'}</div></div>
${i===2&&ed?`<button class="btn" onclick="acc('${c.id}')">Accept this challenge</button>`:''}
${ws?`<h2>Project workspace · ${pct(c)}% complete</h2>${pb(pct(c))}<div class="grid">
<div class="card"><h3>Team</h3><ul>${c.team.map(m=>`<li>${e(m.n)} - ${m.r}, ${e(m.d)}</li>`).join('')||'<li class="m">No members</li>'}</ul>${ed?`<div class="row"><input id="tn" placeholder="Name"><select id="tr"><option>Student</option><option>Faculty</option></select><input id="td" placeholder="Discipline"><button class="btn s" onclick="addTeam()">Add</button><button class="btn s ghost" onclick="joinTeam()">Join team</button></div>`:''}</div>
<div class="card"><h3>Solution proposal</h3>${c.prop?`<p>${e(c.prop)}</p>`:ed?`<textarea id="pr" rows="4" style="width:100%"></textarea><button class="btn s" onclick="sendProp()">Submit proposal</button>`:'<p class="m">Not yet submitted.</p>'}</div>
<div class="card"><h3>Tasks</h3><ul>${c.tasks.map((t,k)=>`<li><label style="flex-direction:row;font-weight:400"><input type="checkbox" ${t.d?'checked':''} ${ed?'':'disabled'} onchange="tg('tasks',${k})">${e(t.t)} ${t.due?`<span class="m">(due ${t.due})</span>`:''}</label></li>`).join('')}</ul>${ed?`<div class="row"><input id="tk" placeholder="New task"><input id="tdue" type="date"><button class="btn s" onclick="addTask()">Add</button></div>`:''}</div>
<div class="card"><h3>Milestones</h3><ul>${c.ms.map((t,k)=>`<li><label style="flex-direction:row;font-weight:400"><input type="checkbox" ${t.d?'checked':''} ${ed?'':'disabled'} onchange="tg('ms',${k})">${e(t.t)}</label></li>`).join('')}</ul></div>
<div class="card"><h3>Testing &amp; evidence</h3><ul>${c.tests.map(t=>`<li>${t.at}: ${e(t.t)} - <b>${t.r}</b></li>`).join('')||'<li class="m">No tests recorded</li>'}</ul>${ed?`<div class="row"><input id="ts" placeholder="Test description / result"><select id="tp"><option>Pass</option><option>Partial</option><option>Fail</option></select><button class="btn s" onclick="addTest()">Record test</button></div><div class="row"><input id="ef" type="file"><input id="en" placeholder="Or evidence note"><button class="btn s" onclick="addEv()">Add evidence</button></div><p class="m">Evidence is a local note/file name only (prototype).</p>`:''}</div>
<div class="card"><h3>Industry collaboration</h3><ul>${st.co.map((o,k)=>o.ch===c.id?`<li>${e(o.type)} - ${e(o.org)} (${o.status}) ${ed&&o.status==='Pending'?`<button class="btn s" onclick="acco(${k})">Accept</button>`:''}</li>`:'').join('')||'<li class="m">None</li>'}</ul></div></div>`:''}
<h2>Activity log</h2><div class="card">${c.log.map(l=>`<div class="m">${e(l.t)} · <b>${e(l.r)}</b> - ${e(l.m)}</div>`).join('')}</div>`}
const V={home,citizen,gov,stu,ind,impact,detail};
function render(){$('#nav').innerHTML=NAV.map(n=>`<button class="${n[0]===st.view||(n[0]===st.role&&!['home','impact'].includes(st.view))?'on':''}" onclick="nav('${n[0]}')">${n[1]}</button>`).join('');
 $('#app').innerHTML=(V[st.view]||home)();if(st.view==='citizen')L();
}
// ---- sample data
const DI={title:'Canal water shortfall leaves Sinnar farms without irrigation',desc:'Farmers across five villages in Sinnar tehsil report drought-like shortage: the canal has run dry, borewells have dried and tanker water is unaffordable. Drip irrigation cannot run during the rabi season.',domain:D.domains[1],district:'Nashik',place:'Sinnar tehsil villages',urgency:'Critical',pop:1500,ev:[{n:'sample_dry_canal_photo.jpg (simulated sample evidence)'}]};
st=load();if(st.role==='uni')st.role='stu';if(st.view==='uni')st.view='stu';delete st.demo;render();
