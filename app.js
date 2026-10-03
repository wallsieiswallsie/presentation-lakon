(() => {
  const $ = (selector) => document.querySelector(selector);
  const app = $('#presentation');
  const world = $('#world');
  const overlay = $('#overlay');
  const destinations = [
    { id:'entrance', title:'The entrance', tag:'WELCOME TO LAKON', short:'Communication belongs to both people.', camera:[1660,1110,.5], label:'THE ENTRANCE', chapter:'FROM VOCABULARY TO SITUATIONS', headline:'Everyday places.<br>Shared understanding.', copy:'Explore Indonesian Sign Language through familiar situations. One scenario. Two roles. One shared learning experience.', kicker:'WELCOME TO THE LAKON DISTRICT', tags:['5 everyday scenarios','2 perspectives'], notes:'When communication fails, who is expected to adapt? Communication is two-sided, but adaptation often falls on the Deaf customer. These five encounters are bounded examples, not a claim that every situation is covered.' },
    { id:'crossroad', title:'Communication crossroad', tag:'THE INSIGHT', short:'Vocabulary does not carry a whole encounter.', camera:[1510,1395,1.08], label:'THE CROSSROAD', chapter:'FROM WORDS TO INTERACTION', headline:'Knowing signs is not the same as handling a conversation.', copy:'A greeting is a start. A real encounter moves through choices, clarification, payment and a shared close.', kicker:'VOCABULARY ≠ INTERACTION', tags:['Hello','Order','Temperature','Taste','Payment'], notes:'We changed the unit of learning: from isolated vocabulary to a bounded scenario with a beginning, middle and end.' },
    { id:'theatre', title:'LAKON Theatre', tag:'THE PRODUCT', short:'One scenario. Two roles. One shared learning experience.', camera:[1510,1080,1.03], label:'LAKON THEATRE', chapter:'A SHARED LEARNING EXPERIENCE', headline:'From vocabulary<br>to situations.', copy:'One scenario. Two roles. One shared learning experience. Practise familiar service encounters and track progress.', kicker:'MEET LAKON', tags:['5 scenarios','2 roles','Progress tracking'], notes:'The current proof of concept is a functional web-technology demonstration. Frontline staff are the first learner group; Deaf people are intended co-learners and central stakeholders.' },
    { id:'coffee', title:'Coffee Shop', tag:'THE HERO SCENARIO', short:'Learn it. Practise it. Use it in context.', camera:[1500,665,1.16], label:'COFFEE SHOP', chapter:'THE HERO SCENARIO', headline:'Learn it.<br>Practise it.<br>Use it in context.', copy:'A barista and a Deaf customer share one familiar service moment—from greeting to order and collection.', kicker:'SCENARIO 01 · COFFEE SHOP', tags:['Learn a sign','Practise','Follow the encounter'], notes:'Use the coffee shop to show the learning loop. The scenario content is exploratory; do not imply validated learning outcomes.' },
    { id:'counter', title:'Across the Counter', tag:'THE SIGNATURE IDEA', short:'The conversation did not change. The perspective did.', camera:[1770,685,1.14], label:'ACROSS THE COUNTER', chapter:'TWO ROLES · ONE SCENARIO', headline:'The conversation<br>did not change.', copy:'The perspective did. Learners can explore both sides of the same encounter and build readiness together.', kicker:'ACROSS THE COUNTER', tags:['Deaf customer','Barista','Shared context'], notes:'Switch perspective to show two roles within one scenario. This is a learning design choice, not a claim of equal outcomes or completed Deaf user validation.' },
    { id:'lab', title:'Browser Lab', tag:'WHAT WE CAN PROVE TODAY', short:'Landmarks in the browser. Attempts compared with DTW.', camera:[2155,1000,1.05], label:'BROWSER LAB', chapter:'ON-DEVICE GESTURE FEEDBACK', headline:'What can we<br>prove today?', copy:'MediaPipe hand and pose landmarks stay in the browser. DTW compares attempts for feedback on finger shape, hand position and palm orientation. Movement and non-manual markers are not fully evaluated yet.', kicker:'BROWSER LAB · CURRENT RELEASE', tags:['Finger shape','Hand position','Palm orientation'], notes:'Movement is not yet scored as a separate parameter. Non-manual markers are not yet fully evaluated. The architecture can support an ONNX classifier later, but a trained classifier is not the basis of this release.' },
    { id:'validation', title:'Validation Gate', tag:'THE RESPONSIBLE PATH', short:'The technology is functional; the current sign content is exploratory.', camera:[1510,260,.98], label:'VALIDATION GATE', chapter:'RESPONSIBLE DEVELOPMENT', headline:'The technology is functional; the current sign content is exploratory.', copy:'Review production content with Deaf signers. Intended contributions: SDG 4 + 10; health, work and transport connect to SDGs 3, 8 and 11. LAKON does not replace human communication; it helps more people get ready for it.', kicker:'A VALIDATION GATE, NOT A FINISH LINE', tags:['69 unit tests passing','21 end-to-end passing','Accessibility: 100 on 3 pages','axe: 0 violations on audited screens'], notes:'This is the critical safe line. Do not claim national coverage, certification, production validation, verified learning effectiveness or production accuracy. Software tests show behaviour coverage; accessibility checks describe audited screens. Intended SDG contributions: SDG 4 and 10 are primary; SDG 3, 8 and 11 relate to health, work and transport scenarios. Future evaluation is needed.' }
  ];
  const evidence = {
    privacy:{ title:'Privacy evidence', tag:'DOCUMENTED NETWORK CAPTURE', short:'56 requests observed; no camera image or video data transmitted.', kicker:'PRIVACY · EVIDENCE', label:'PRIVACY EVIDENCE', chapter:'CAMERA FRAMES STAY ON DEVICE', headline:'The camera stays<br>with the learner.', copy:'A documented capture observed 56 requests and no camera image or video data transmitted. Normal application and checkpoint traffic was small.', tags:['56 requests observed','No camera images sent','No camera video sent'], notes:'This evidence supports the no-camera-media-transmission claim. It is not a claim about every possible security property.' },
    governance:{ title:'Content governance', tag:'EXPLORATORY CONTENT', short:'Deaf signers and qualified validators belong in the production review path.', kicker:'CONTENT GOVERNANCE', label:'CONTENT GOVERNANCE', chapter:'REVIEW BEFORE PRODUCTION', headline:'Build the content<br>with its community.', copy:'The current sign content is exploratory. Appropriate linguistic review by Deaf signers or qualified validators is a required production step.', tags:['Exploratory today','Linguistic review ahead','Co-created responsibly'], notes:'There is no claim that content has already been validated or certified, or that all regional variants are represented.' },
    architecture:{ title:'System architecture', tag:'CURRENT TECHNICAL APPROACH', short:'On-device landmark extraction, then DTW comparison.', kicker:'SYSTEM ARCHITECTURE', label:'SYSTEM ARCHITECTURE', chapter:'LANDMARKS → DTW', headline:'Landmarks first.<br>DTW comparison next.', copy:'MediaPipe-based hand and pose landmarks are extracted in the browser, then attempts are compared with Dynamic Time Warping for feedback on selected pose qualities.', tags:['Browser processing','DTW comparison','No trained classifier claim'], notes:'Current feedback concerns finger shape, hand position and palm orientation. Movement is not yet a separate score; non-manual markers are not yet fully evaluated. ONNX is a possible future architecture extension.' }
  };
  const scenarioLocs = {
    coffee:[1510,820,1.12], healthcare:[1930,1000,1.05], transport:[1100,1000,1.05], interview:[2050,635,1.05], emergency:[2290,850,1.05]
  };
  const scenarioInfo = {
    healthcare:{name:'Community Health Centre',camera:scenarioLocs.healthcare,image:'/assets/lakon/healthcare/panggung-dokter-lambai.png',headline:'Care starts<br>with being understood.',copy:'A bounded Puskesmas encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'},
    transport:{name:'Public Transport',camera:scenarioLocs.transport,image:'/assets/lakon/transport/panggung-petugas-lambai.png',headline:'A journey<br>shared by both.',copy:'A bounded public transport encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'},
    interview:{name:'Job Interview',camera:scenarioLocs.interview,image:'/assets/lakon/interview/panggung-pewawancara-lambai.png',headline:'Opportunity<br>needs access.',copy:'A bounded job interview encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'},
    emergency:{name:'Emergency',camera:scenarioLocs.emergency,image:'/assets/lakon/emergency/panggung-warga-lambai.png',headline:'Clarity matters<br>when time is short.',copy:'A bounded emergency encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'}
  };
  let step = 0, mode = 'story', busy = false, safe = false, reduced = false, role = 0, toastTimer, currentCamera = null, overlayTrigger = null;
  const query = new URLSearchParams(location.search);
  const sceneParam = query.get('scene');
  const initialIndex = destinations.findIndex((x) => x.id === sceneParam);
  if (initialIndex >= 0) step = initialIndex;
  safe = query.get('safeMode') === 'true';
  reduced = query.get('reducedMotion') === 'true' || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (safe) app.classList.add('safe-mode');
  if (reduced) app.classList.add('reduced-motion');
  $('#safeBanner').hidden = !safe;
  $('#safeButton').setAttribute('aria-pressed',String(safe));
  $('#motionButton').setAttribute('aria-pressed',String(reduced));

  const setCamera = (coords, immediate=false) => {
    currentCamera = coords;
    let [x,y,z] = coords;
    let anchorX=innerWidth/2, anchorY=innerHeight/2;
    // Fit the arrival composition into the space beside (or above) its introduction.
    // The same world and transform camera serve every other story waypoint.
    if (app.classList.contains('entrance-mode') && mode==='story') {
      const narrow=innerWidth<=640;
      z=narrow ? Math.min(innerWidth/1640,(innerHeight*.5-40)/1450) : Math.min(innerWidth*.59/1640,(innerHeight-164)/1450,.68);
      anchorX=innerWidth*(narrow?.5:.70);
      anchorY=narrow ? 70+(innerHeight*.5-40)/2 : innerHeight*.50;
    }
    if (immediate || reduced || safe) world.style.transitionDuration = '0ms';
    else world.style.transitionDuration = '1100ms';
    world.style.transform = `translate3d(${anchorX-x*z}px,${anchorY-y*z}px,0) scale(${z})`;
  };
  const setText = (data, index=step) => {
    app.classList.toggle('entrance-mode', data.id === 'entrance');
    app.classList.toggle('counter-mode', index === 4);
    $('#kicker').textContent = data.kicker;
    $('#stepCount').textContent = `${String(index+1).padStart(2,'0')} / 07`;
    $('#headline').innerHTML = data.headline;
    $('#copy').textContent = data.copy;
    $('#locationLabel').textContent = data.label;
    $('#chapterLabel').textContent = data.chapter;
    $('#tags').innerHTML = (data.tags || []).map((tag) => `<span>${tag}</span>`).join('');
    $('#progressFill').style.width = `${((index+1)/7)*100}%`;
    $('#nextButton').innerHTML = index === 0 ? 'Begin the journey <span>→</span>' : index === 6 ? 'Return to the beginning <span>↺</span>' : 'Continue the journey <span>→</span>';
    $('#notes').textContent = data.notes || '';
    const art = $('#sceneArt');
    const sceneCopy = $('#sceneCopy');
    const showCoffee = index === 3 || index === 4;
    if (showCoffee) { $('#sceneImage').src='/assets/lakon/coffee/panggung-barista-lambai.png'; $('#sceneCaption').textContent='A moment at the counter'; }
    art.style.visibility = showCoffee ? 'visible' : 'hidden'; art.style.opacity = showCoffee ? '1' : '0';
    sceneCopy.style.visibility = index === 4 ? 'visible' : 'hidden'; sceneCopy.style.opacity = index === 4 ? '1' : '0';
    $('#sceneTitle').innerHTML = role ? 'The barista<br>learns, too.' : 'The conversation<br>stays the same.';
    $('#sceneDescription').textContent = role ? 'A shared scenario gives frontline staff a way to practise welcoming, clarifying and responding.' : 'A Deaf customer and a barista learn from each other within one familiar service moment.';
    document.querySelectorAll('.district').forEach((d) => d.classList.toggle('active', d.dataset.location === (index === 3 || index === 4 ? 'coffee' : '')));
    $('#routeCaption').textContent = index===0 ? 'Choose a building to explore · M to view the district map' : index === 3 || index === 4 ? 'ONE SCENARIO · TWO ROLES · ONE SHARED LEARNING EXPERIENCE' : 'A bounded journey through five everyday encounters';
  };
  const go = (n, instant=false) => {
    if (n < 0 || n > destinations.length-1) return;
    step = n; const dest = destinations[step]; mode = 'story'; overlay.hidden=true; app.classList.remove('overview','map-mode');
    setText(dest); setCamera(dest.camera, instant); $('#modeLabel').textContent = 'STORY MODE';
    query.set('scene',dest.id); query.delete('mode'); history.replaceState(null,'',`${location.pathname}?${query.toString()}`);
  };
  const showToast = (message) => { const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800); };
  const goScenario = (key) => {
    const info=scenarioInfo[key];if(!info)return;
    mode='qa';overlay.hidden=true;app.classList.remove('overview','map-mode','counter-mode','entrance-mode');setCamera(info.camera);$('#modeLabel').textContent='Q&A MODE';
    $('#routeCaption').textContent='ONE SCENARIO · TWO ROLES · ONE SHARED LEARNING EXPERIENCE';
    document.querySelectorAll('.district').forEach(d=>d.classList.toggle('active',d.dataset.location===key));
    $('#nextButton').innerHTML='Return to the journey <span>↩</span>';
    $('#sceneImage').src=info.image;$('#sceneArt').style.visibility='visible';$('#sceneArt').style.opacity='1';$('#sceneCaption').textContent=info.name.toUpperCase()+' · SCENARIO DISTRICT';
    $('#sceneCopy').style.visibility='hidden';$('#sceneCopy').style.opacity='0';
    $('#kicker').textContent='SCENARIO DISTRICT · '+info.name.toUpperCase();$('#stepCount').textContent='SCENARIO';$('#headline').innerHTML=info.headline;$('#copy').textContent=info.copy;$('#tags').innerHTML='<span>Two roles</span><span>Scenario-based practice</span><span>Exploratory content</span>';$('#locationLabel').textContent=info.name.toUpperCase();$('#chapterLabel').textContent='ONE OF FIVE BOUNDED ENCOUNTERS';$('#notes').textContent='This is a bounded scenario used to show breadth and reusability. Sign content is exploratory.';query.set('scene',key);query.set('mode','qa');history.replaceState(null,'',`${location.pathname}?${query.toString()}`);showToast(info.name.toUpperCase()+' · BOUNDED SCENARIO');
  };
  const openOverlay = (type) => {
    if(overlay.hidden)overlayTrigger=document.activeElement;
    mode = type; overlay.hidden=false; $('#modeLabel').textContent=type==='qa'?'Q&A MODE':'MAP OVERVIEW';
    app.classList.toggle('overview',type==='map');
    app.classList.toggle('map-mode',type==='map');
    if(type==='qa')query.set('mode','qa');else query.delete('mode');
    history.replaceState(null,'',`${location.pathname}?${query.toString()}`);
    if(type==='map')setCamera([1600,1200,.38]);
    const grid=$('#destinationGrid');
    if(type==='qa'){
      $('#overlayKicker').textContent='Q&A · CHOOSE A TOPIC';$('#overlayTitle').textContent='Go deeper on a question';
      grid.innerHTML=`<button class="destination" data-topic="privacy"><span>PRIVACY</span><strong>Privacy evidence</strong><small>On-device camera processing</small></button><button class="destination" data-topic="governance"><span>CONTENT</span><strong>Content governance</strong><small>The path to responsible review</small></button><button class="destination" data-topic="architecture"><span>TECHNOLOGY</span><strong>System architecture</strong><small>Landmarks, DTW and scope</small></button><button class="destination" data-scene="coffee"><span>PRODUCT</span><strong>Coffee Shop</strong><small>Return to the hero scenario</small></button><button class="destination" data-scene="validation"><span>IMPACT</span><strong>Intended contribution</strong><small>SDGs and future evaluation</small></button><button class="destination" data-scene="crossroad"><span>STORY</span><strong>Back to the story</strong><small>Resume at the crossroad</small></button>`;
    }else{
      $('#overlayKicker').textContent='MAP OVERVIEW · THE CITY IS YOUR INDEX';$('#overlayTitle').textContent='Choose a destination';
      grid.innerHTML=destinations.map((d,i)=>`<button class="destination" data-step="${i}"><span>${String(i+1).padStart(2,'0')} · ${d.tag}</span><strong>${d.title}</strong><small>${d.short}</small></button>`).join('')+`<button class="destination" data-scene="healthcare"><span>SCENARIO DISTRICT</span><strong>Community health</strong><small>Puskesmas encounter</small></button><button class="destination" data-scene="transport"><span>SCENARIO DISTRICT</span><strong>Public transport</strong><small>Ticket and travel encounter</small></button><button class="destination" data-scene="interview"><span>SCENARIO DISTRICT</span><strong>Job interview</strong><small>Employment encounter</small></button><button class="destination" data-scene="emergency"><span>SCENARIO DISTRICT</span><strong>Emergency</strong><small>Time-critical encounter</small></button>`;
    }
    $('#closeOverlay').focus({preventScroll:true});
  };
  const closeOverlay = () => { go(step,true); if(overlayTrigger?.isConnected)overlayTrigger.focus({preventScroll:true}); overlayTrigger=null; };
  $('#destinationGrid').addEventListener('click',(event)=>{
    const btn=event.target.closest('button');if(!btn)return;
    if(btn.dataset.topic){const key=btn.dataset.topic;const topic=evidence[key];closeOverlay();mode='qa';query.set('mode','qa');history.replaceState(null,'',`${location.pathname}?${query.toString()}`);setText(topic,5);$('#modeLabel').textContent='Q&A MODE';setCamera(destinations[5].camera);showToast(topic.title.toUpperCase());return;}
    if(btn.dataset.step!==undefined){const n=Number(btn.dataset.step);closeOverlay();go(n);return;}
    if(btn.dataset.scene){const key=btn.dataset.scene;closeOverlay();if(scenarioInfo[key])goScenario(key);else go(destinations.findIndex(d=>d.id===key));}
  });
  const next = () => {if(mode!=='story'){closeOverlay();return;}go(step===6?0:step+1);};
  const previous = () => {if(mode!=='story'){closeOverlay();return;}go(step===0?0:step-1);};
  document.addEventListener('keydown',(e)=>{
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(e.key==='Escape'){if(!overlay.hidden)closeOverlay();else $('#notes').hidden=true;return;}
    if(!overlay.hidden && e.key==='Tab'){
      const buttons=[...overlay.querySelectorAll('button')],first=buttons[0],last=buttons[buttons.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      return;
    }
    // Space must activate a focused native control instead of also advancing the story.
    if((e.key===' '||e.key==='Enter')&&e.target.closest('button'))return;
    if(e.key===' '||e.key==='ArrowRight'){e.preventDefault();if(!busy){busy=true;next();setTimeout(()=>busy=false,(safe||reduced)?60:1150);}return;}
    if(e.key==='ArrowLeft'){if(!busy){busy=true;previous();setTimeout(()=>busy=false,(safe||reduced)?60:1150);}return;}
    if(/^[1-7]$/.test(e.key)){go(Number(e.key)-1);return;}
    const k=e.key.toLowerCase();if(k==='m')openOverlay('map');if(k==='q')openOverlay('qa');if(k==='f')toggleFullscreen();if(k==='d'){go(3);showToast('DEMO HANDOFF · COFFEE SHOP');}if(k==='s')toggleSafe();if(k==='r')toggleReduced();
  });
  function toggleSafe(){safe=!safe;app.classList.toggle('safe-mode',safe);$('#safeBanner').hidden=!safe;$('#safeButton').setAttribute('aria-pressed',String(safe));query.set('safeMode',String(safe));history.replaceState(null,'',`${location.pathname}?${query.toString()}`);showToast(safe?'SAFE MODE ON':'SAFE MODE OFF');}
  function toggleReduced(){reduced=!reduced;app.classList.toggle('reduced-motion',reduced);$('#motionButton').setAttribute('aria-pressed',String(reduced));query.set('reducedMotion',String(reduced));history.replaceState(null,'',`${location.pathname}?${query.toString()}`);showToast(reduced?'REDUCED MOTION ON':'REDUCED MOTION OFF');}
  async function toggleFullscreen(){try{if(!document.fullscreenElement)await app.requestFullscreen();else await document.exitFullscreen();}catch{showToast('FULLSCREEN IS UNAVAILABLE IN THIS BROWSER');}}
  $('#nextButton').addEventListener('click',next);$('#mapButton').addEventListener('click',()=>openOverlay('map'));$('#qaButton').addEventListener('click',()=>openOverlay('qa'));$('#safeButton').addEventListener('click',toggleSafe);$('#motionButton').addEventListener('click',toggleReduced);$('#fullButton').addEventListener('click',toggleFullscreen);$('#closeOverlay').addEventListener('click',closeOverlay);$('#notesButton').addEventListener('click',()=>$('#notes').hidden=!$('#notes').hidden);
  $('#roleButton').addEventListener('click',()=>{role=1-role;setText(destinations[step]);$('#roleButton').innerHTML=role?'Return to customer perspective <span>↔</span>':'Switch perspective <span>↔</span>';});
  $('#orientationBoard').addEventListener('click',()=>openOverlay('map'));
  document.querySelectorAll('.district').forEach(el=>el.addEventListener('click',()=>{const id=el.dataset.location;if(id==='coffee')go(3);else goScenario(id);}));
  addEventListener('resize',()=>{if(currentCamera)setCamera(currentCamera,true);});
  addEventListener('popstate',()=>{const scene=new URLSearchParams(location.search).get('scene');const idx=destinations.findIndex(d=>d.id===scene);if(idx>=0)go(idx,true);});
  const preload=['/assets/lakon/healthcare/panggung-dokter-lambai.png','/assets/lakon/transport/panggung-petugas-lambai.png','/assets/lakon/interview/panggung-pewawancara-lambai.png','/assets/lakon/emergency/panggung-warga-lambai.png'];preload.forEach(src=>{const i=new Image();i.src=src;});
  setText(destinations[step]);setCamera(destinations[step].camera,true);
  if(sceneParam && scenarioInfo[sceneParam])goScenario(sceneParam);
  if(query.get('mode')==='qa' && !scenarioInfo[sceneParam])openOverlay('qa');
})();
