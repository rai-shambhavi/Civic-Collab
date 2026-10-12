/* PRAYOG Maharashtra - extension: student ratings, lead-conflict rule, university-first nav, alerts */
(function(){
const S=id=>st.stu.find(s=>s.id===id),rv=s=>s.sum/s.cnt,rt=s=>rv(s).toFixed(1),
stars=n=>'★'.repeat(Math.round(n))+'☆'.repeat(5-Math.round(n)),
star=s=>`<span style="color:#E8A33D">${stars(rv(s))}</span> <b>${rt(s)}</b> <span class="m">(${s.cnt})</span>`;
const SN=[['Aarti Deshmukh',0,'Civil Engineering',4.8,6],['Rohan Patil',1,'Computer Science',4.5,4],['Sneha Kulkarni',0,'Environmental Science',4.2,3],['Imran Shaikh',2,'Agricultural Engineering',4.6,5],['Pooja Jadhav',3,'Electronics',3.9,2],['Omkar Gaikwad',1,'Biomedical Engineering',4.4,4]];
const _mk=mk;mk=function(o){const c=_mk(o);c.apps=[];c.lead='';c.rt=null;return c};
function init(){
 if(!st.stu){st.stu=SN.map((s,i)=>({id:'STU-'+(i+1),n:s[0],inst:D.insts[s[1]],disc:s[2],sum:s[3]*s[4],cnt:s[4]}));st.me='STU-1';
  const c=mk({title:'Solar-powered vaccine cold box for Velhe PHC',desc:'A solar-battery cold box keeps vaccines safe during long power cuts at the rural health centre; pilot completed and tested.',domain:D.domains[5],district:'Pune',place:'Velhe',urgency:'High',pop:900});
  c.status='Pilot Complete';c.inst=D.insts[0];c.lead='STU-1';c.team=[{n:'Aarti Deshmukh',r:'Student lead',d:'Civil Engineering'}];
  c.tasks=[{t:'Build prototype',d:true,due:''}];c.ms=['Proposal approved','Prototype built','Field test completed','Pilot report published'].map(t=>({t,d:true}));
  c.log=[{t:'(seed)',m:'Fictional completed sample project',r:'system'}];
  const g2=st.cs.find(x=>x.title.startsWith('Offline digital'));if(g2)g2.apps=['STU-2','STU-6']}
 st.cs.forEach(c=>{c.apps=c.apps||[];c.lead=c.lead||'';c.rt=c.rt||null});save()}
resetAll=function(){localStorage.removeItem(KEY);seed();init();render();toast('Demo data restored')};
window.setMe=v=>{st.me=v;sv()};
window.apply=id=>{const c=g(id),m=S(st.me);if(c.apps.includes(m.id))return toast('Already applied');c.apps.push(m.id);lg(c,`${m.n} applied to lead (rating ${rt(m)})`);toast('Applied');sv()};
window.pick=id=>{const c=g(id),b=c.apps.map(S).sort((x,y)=>rv(y)-rv(x)||y.cnt-x.cnt)[0];c.lead=b.id;
 if(!c.team.some(m=>m.n===b.n))c.team.unshift({n:b.n,r:'Student lead',d:b.disc});
 lg(c,c.apps.length>1?`Conflict resolved: ${b.n} preferred for highest rating (${rt(b)}) among ${c.apps.length} applicants`:`${b.n} confirmed as lead`);toast(b.n+' selected as lead');sv()};
window.rate=id=>{const c=g(id),s=S(c.lead),v=+$('#rs_'+id).value;s.sum+=v;s.cnt++;
 c.rt={v,f:$('#rf_'+id).value.trim(),by:$('#rb_'+id).value.trim()||'Citizen'};lg(c,`Citizen rated ${s.n}: ${v}/5`);toast('Rating saved');sv()};
// navigation: citizens + universities first; industry & admin secondary
NAV.length=0;NAV.push(['home','Home'],['stu','University'],['ind','Industry'],['gov','Admin'],['impact','Dashboard'],['notif','Alerts'],['citizen','Report a problem →','cta']);
nav=function(k){if(['home','impact','notif'].includes(k))st.view=k;else{st.role=k;st.view=k}save();render();scrollTo(0,0)};
render=function(){$('#nav').innerHTML=NAV.map(n=>`<button class="${n[2]||''} ${n[0]===st.view||(st.view==='detail'&&n[0]===st.role)?'on':''}" onclick="nav('${n[0]}')">${n[1]}</button>`).join('');
 $('#app').innerHTML=(V[st.view]||home)();if(st.view==='citizen')L()};
// home
const _h=home;home=function(){const top=[...st.stu].sort((a,b)=>rv(b)-rv(a)).slice(0,3);
 return _h().replace(/<h2>Choose a role[\s\S]*$/,`<h2>How it works</h2><div class="grid">${[['1 · Citizens report','Submit a problem with location, photos and urgency. AI sorts and de-duplicates it.'],['2 · Universities solve','Challenges reach the right institution; students apply, form teams and build.'],['3 · Citizens rate','After resolution, citizens rate the student lead. Higher ratings win future lead conflicts.']].map(x=>`<div class="card"><h3>${x[0]}</h3><p class="m">${x[1]}</p></div>`).join('')}</div>
<h2>Start here</h2><div class="grid"><div class="card"><h3>Citizen</h3><p class="m">Report a local problem and track it to resolution.</p><button class="btn s" onclick="nav('citizen')">Enter as Citizen</button></div><div class="card"><h3>University / Student</h3><p class="m">Pick up challenges, apply to lead, build teams and earn ratings.</p><button class="btn s" onclick="nav('stu')">Enter as Student</button></div></div>
<p class="m">Also: <a onclick="nav('ind')">Industry &amp; CSR partners</a> · <a onclick="nav('gov')">Admin / Government review</a></p>
<h2>Top-rated student innovators</h2><div class="grid">${top.map(s=>`<div class="card"><b>${e(s.n)}</b><br><span class="m">${e(s.disc)} · ${e(s.inst)}</span><br>${star(s)}</div>`).join('')}</div>`)};
V.home=home;
// university workspace
V.stu=function(){const me=S(st.me),a=st.cs.filter(c=>P.indexOf(c.status)>=2&&c.inst===me.inst);
 return `<h2>University workspace</h2><div class="card"><label>Signed in as<select onchange="setMe(this.value)">${st.stu.map(s=>`<option value="${s.id}"${s.id===st.me?' selected':''}>${e(s.n)} — ${e(s.inst)}</option>`).join('')}</select></label>
 <p><b>${e(me.n)}</b> · ${e(me.disc)}<br>${star(me)}<br><span class="m">Citizen ratings decide lead conflicts: the higher-rated student is preferred.</span></p></div>
 <h2>Challenges for your institution</h2><div class="grid">${a.map(card).join('')||'<p class="m">Nothing assigned to this institution yet. Admin must validate and assign a challenge.</p>'}</div>
 <h2>Student leaderboard</h2><div class="tw"><table><tr><th>#</th><th>Student</th><th>Institution</th><th>Rating</th></tr>${[...st.stu].sort((x,y)=>rv(y)-rv(x)).map((s,i)=>`<tr><td>${i+1}</td><td>${e(s.n)}<br><span class="m">${e(s.disc)}</span></td><td>${e(s.inst)}</td><td>${star(s)}</td></tr>`).join('')}</table></div>`};
// alerts
V.notif=function(){return `<h2>Notifications &amp; activity</h2><p class="m">Latest updates across citizens, universities, industry and admin.</p>${st.cs.map(c=>`<div class="card"><b><a onclick="go('detail','${c.id}')">${c.id}</a></b> ${e(c.title)}${c.log.slice(0,3).map(l=>`<div class="m">${e(l.t)} · <b>${e(l.r)}</b> - ${e(l.m)}</div>`).join('')}</div>`).join('')}`};
// detail: lead selection + citizen rating
const _d=detail;detail=function(){const c=cur(),h=_d();if(!c)return h;const i=P.indexOf(c.status);if(i<2||c.status==='Rejected')return h;
 const me=S(st.me),ld=c.lead?S(c.lead):null,stu=st.role==='stu';let x='<h2>Student lead &amp; rating</h2><div class="card">';
 if(ld)x+=`<p><b>Lead:</b> ${e(ld.n)} · ${star(ld)}</p>`;
 if(!ld){x+=`<b>Applicants</b><ul>${c.apps.map(S).sort((p,q)=>rv(q)-rv(p)).map(s=>`<li>${e(s.n)} · ${star(s)}</li>`).join('')||'<li class="m">None yet</li>'}</ul>`;
  if(stu&&c.inst===me.inst&&!c.apps.includes(me.id))x+=`<button class="btn s" onclick="apply('${c.id}')">Apply to lead as ${e(me.n)}</button> `;
  if(stu&&c.apps.length)x+=`<button class="btn s a" onclick="pick('${c.id}')">${c.apps.length>1?'Resolve conflict: highest rating wins':'Confirm lead'}</button>`}
 if(ld&&c.rt)x+=`<p>${'★'.repeat(c.rt.v)}${'☆'.repeat(5-c.rt.v)} by ${e(c.rt.by)}<br><span class="m">${e(c.rt.f)}</span></p>`;
 else if(ld&&i===7)x+=st.role==='citizen'?`<div class="row"><input id="rb_${c.id}" placeholder="Your name"><select id="rs_${c.id}">${[5,4,3,2,1].map(n=>`<option value="${n}">${n} ★</option>`).join('')}</select><input id="rf_${c.id}" placeholder="Feedback"><button class="btn s" onclick="rate('${c.id}')">Rate student</button></div>`:'<p class="m">Awaiting citizen rating (switch to Citizen to rate).</p>';
 else if(ld)x+='<p class="m">Citizens can rate the lead once the pilot is complete.</p>';
 return h.replace('<h2>Activity log</h2>',x+'</div><h2>Activity log</h2>')};
V.detail=detail;
init();render();
})();
