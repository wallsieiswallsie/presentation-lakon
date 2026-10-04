(() => {
  const $ = (selector) => document.querySelector(selector);
  const app = $('#presentation');
  const world = $('#world');
  const overlay = $('#overlay');
  const stage = $('#stage');
  const A = '/assets/lakon';

  // Which member face (wajah-1..4, see Panggung-Lakon/PANDUAN.md) plays which role. Change freely.
  const CAST = { barista:1, 'teman-tuli':2, dokter:3, petugas:4, pewawancara:3, warga:1, perawat:4 };
  const CREDITS = {
    kopi:['Coffee shop','Pratechno · CC BY-SA 4.0'],
    puskesmas:['Community health centre','SATELIT BM9 · CC BY-SA 4.0'],
    stasiun:['Train station','Gunawan Kartapranata · CC BY-SA 4.0'],
    darurat:['Emergency','Scarzmouche · CC BY-SA 4.0'],
    wawancara:['Job interview','U.S. Army / Pfc. D. Keay · Public domain'],
    'juru-bahasa-isyarat':['Deaf-led linguistic review','Badak Ironman · CC BY 4.0'],
    'tim-tuli':['Deaf people: co-learners & linguistic authority','U.S. Embassy Jakarta · Public domain'],
    'hand-landmarks':['21 hand landmarks','Google MediaPipe · Apache 2.0'],
    'belajar-isyarat':['Learning sign language with an app','USAID Indonesia · Public domain'],
    'sdg10-inklusi':['Indonesian Deaf athletes','U.S. Embassy Jakarta · Public domain'],
    'sdg3-kesehatan':['Community health service','Refki Assadiky · CC BY-SA 4.0'],
    'sdg8-kerja':['Inclusive employment','Arie Basuki · CC BY-SA 4.0'],
    'sdg11-transportasi':['Accessible transit, Juanda','Irvan Cahyo N · CC BY-SA 4.0']
  };
  // In the presentation board most roles are played by face 4; Teman Tuli keeps its own face so two-role scenes show two people.
  const STAGE_FACE = 4;
  const tokohSrc = (role, pose, face=CAST[role]) => `${A}/tokoh/wajah-${face}/${role}-${pose}.webp`;

  // Stage pieces. x/y/w are percentages of the stage box; b = the beat at which the piece enters.
  const t = (role, pose, o) => ({ k:'tokoh', role, pose, ...o });
  const p = (name, o) => ({ k:'prop', name, ...o });
  const f = (name, o) => ({ k:'foto', name, ...o });
  const h = (html, o) => ({ k:'html', html, ...o });
  // SDG cards follow the proposal's Table 5: goal, target and the contribution it names.
  const sdg = (n, target, goal, text, photo) => `<div class="sdg-card"><img class="sdg-photo" src="${A}/foto/${photo}.jpg" alt="${CREDITS[photo][0]}"><div class="sdg-body"><img class="sdg-icon" src="${A}/sdg/sdg-${n}.jpg" alt="SDG ${Number(n)}"><div><b>Target ${target}</b><strong>${goal}</strong><span>${text}</span></div></div><small>${CREDITS[photo][1]}</small></div>`;
  const stat = (num, label, extra='') => `<div class="stat">${extra}<b>${num}</b><span>${label}</span></div>`;

  const destinations = [
    { id:'opening', title:'Opening', tag:'THE QUESTION', camera:[1660,1110,.5], label:'THE ENTRANCE', chapter:'OPENING',
      kicker:'GOOD MORNING, JUDGES', headline:'Everyday places.<br>Shared understanding.',
      copy:'A coffee shop. A health centre. A train station. You know what you need, and the person in front of you wants to help, but the two of you do not share a language.',
      tags:['Coffee shop','Health centre','Train station'],
      beats:[{}, { headline:'Who is expected<br>to adapt?', copy:'In many Deaf service interactions, the burden of adaptation still falls on the Deaf customer. We believe the service side should be prepared too.', tags:['Two-sided communication','One-sided adaptation'] }],
      stage:[],
      notes:'“Good morning, judges. Imagine walking into a coffee shop, a health centre, or a train station. You know exactly what you need, and the person in front of you wants to help—but the two of you cannot communicate in the same language. In many Deaf service interactions, the burden of adaptation still falls on the Deaf customer. We believe the service side should be prepared too.”' },
    { id:'gap', title:'Learning gap', tag:'THE LEARNING GAP', camera:[1580,1300,1.0], label:'PLAZA LAKON', chapter:'THE LEARNING GAP',
      kicker:'THE LEARNING GAP', headline:'Knowing signs is not the same as handling a conversation.',
      copy:'A worker may know “payment” or “ticket”, but still not know what comes next, how to respond, or how to recover when communication fails.',
      tags:['What comes next?','How to respond?','How to recover?'],
      stage:[ p('kartu-kata',{x:26,y:0,w:48}), t('barista','netral',{x:0,y:40,w:46}), t('teman-tuli','isyarat',{x:54,y:40,w:46,flip:1}),
        p('bingung',{x:0,y:25,w:30,b:1,rot:-4}), p('putus',{x:34,y:58,w:32,b:1}), p('tanya',{x:72,y:20,w:18,b:1,rot:6}) ],
      notes:'“Knowing isolated signs is not the same as handling a conversation. A worker may know ‘payment’ or ‘ticket’, but still not know what comes next, how to respond, or how to recover when communication fails.”' },
    { id:'insight', title:'Core insight', tag:'THE INSIGHT', camera:[1400,1090,1.1], label:'LAKON THEATRE', chapter:'CORE INSIGHT',
      kicker:'CORE INSIGHT', headline:'We changed the<br>unit of learning.',
      copy:'Not “how do we teach more vocabulary?” Lakon begins with a situation: understand it, practise it, respond to it, and complete it.',
      tags:['Situation','Understand','Practise','Respond','Complete'],
      stage:[ p('cara-lama',{x:12,y:2,w:76}),
        p('situation',{x:4,y:17,w:40,b:1}), p('understand',{x:54,y:27,w:40,b:1}), p('practice',{x:4,y:39,w:40,b:1}), p('respond',{x:54,y:49,w:40,b:1}), p('complete',{x:22,y:62,w:56,b:1}),
        t('teman-tuli','lambai',{x:-2,y:62,w:30,b:1}), t('barista','lambai',{x:72,y:62,w:30,b:1,flip:1}) ],
      notes:'“So instead of asking how to teach more vocabulary, we changed the unit of learning. Lakon begins with a situation: understand it, practise it, respond to it, and complete it.”' },
    { id:'users', title:'Primary users', tag:'WHO LEARNS FIRST', camera:[1080,930,1.05], label:'PUBLIC TRANSPORT', chapter:'PRIMARY USERS',
      kicker:'PRIMARY USERS', headline:'Frontline workers first.<br>Deaf users at the centre.',
      copy:'Service workers repeatedly handle short, structured encounters. Deaf users remain central as co-learners, stakeholders, and the linguistic authority behind validated production content.',
      tags:['Frontline service workers','Deaf co-learners','Linguistic authority'],
      stage:[ t('petugas','lambai',{x:-2,y:42,w:32,face:1}), t('perawat','netral',{x:24,y:42,w:32,face:3}), t('barista','tunjuk',{x:10,y:54,w:34}),
        p('jembatan',{x:42,y:80,w:24,b:1}), f('tim-tuli',{x:44,y:2,w:54,rot:3,b:1}), t('teman-tuli','lambai',{x:62,y:44,w:38,b:1,flip:1}) ],
      notes:'“We begin with frontline service workers because they repeatedly handle short, structured encounters. Deaf users remain central as co-learners, stakeholders, and ultimately the linguistic authority behind validated production content.”' },
    { id:'loop', title:'Learning loop', tag:'COFFEE SHOP', camera:[1510,700,1.15], label:'COFFEE SHOP', chapter:'LEARNING LOOP',
      kicker:'LEARNING LOOP · COFFEE SHOP', headline:'Learn it.<br>Practise it.<br>Use it in context.',
      copy:'In the coffee-shop scenario, learners study only the signs needed for the encounter, practise them, and then use or interpret them within the complete interaction.',
      tags:['Only the signs needed','Practise','Complete interaction'],
      stage:[ t('barista','sajikan',{x:28,y:40,w:46}), p('loop-1',{x:0,y:2,w:30}), p('loop-2',{x:35,y:0,w:30}),
        p('loop-3',{x:70,y:2,w:30,b:1}), p('loop-4',{x:70,y:38,w:30,b:1}), p('loop-5',{x:68,y:72,w:32,b:2}), p('loop-6',{x:0,y:72,w:30,b:2}) ],
      notes:'“In the coffee-shop scenario, learners study only the signs needed for the encounter, practise them, and then use or interpret them within the complete interaction.”' },
    { id:'innovation', title:'Signature innovation', tag:'ONE SCENARIO · TWO ROLES', camera:[1640,720,1.2], label:'ACROSS THE COUNTER', chapter:'SIGNATURE INNOVATION',
      kicker:'SIGNATURE INNOVATION', headline:'The conversation does not change. The perspective does.',
      copy:'The Deaf-side learner practises producing the sign. The service-worker side practises understanding and responding, on the same scenario graph.',
      tags:['Deaf role: produce','Service role: interpret & respond','Same graph'],
      stage:[ p('peran-tuli',{x:0,y:4,w:46}), t('teman-tuli','isyarat',{x:-2,y:40,w:42}),
        p('peran-pekerja',{x:54,y:4,w:46,b:1}), t('barista','tunjuk',{x:60,y:40,w:42,b:1,flip:1}),
        p('graf',{x:38,y:34,w:24,b:2}), p('label-graf',{x:30,y:86,w:40,b:2}) ],
      notes:'“And the same scenario works from two sides. The Deaf-side learner practises producing the sign. The service-worker side practises understanding and responding. The conversation does not change. The perspective does.”' },
    { id:'scope', title:'Scenario scope', tag:'FIVE ENCOUNTERS', camera:[1640,760,.62], label:'THE DISTRICT', chapter:'SCENARIO SCOPE',
      kicker:'SCENARIO ECOSYSTEM', headline:'Five bounded<br>encounters.',
      copy:'Coffee shop, community healthcare, transport, job interview and emergency. Rather than asking you to imagine it, let us show you.',
      tags:['Coffee shop','Healthcare','Transport','Job interview','Emergency'],
      stage:[ f('kopi',{x:0,y:2,w:38,rot:-4}), f('puskesmas',{x:34,y:0,w:34,rot:3}), f('stasiun',{x:65,y:6,w:35,rot:-2}),
        f('wawancara',{x:8,y:42,w:38,rot:2}), f('darurat',{x:50,y:44,w:40,rot:-3}), p('live-demo',{x:32,y:88,w:36,b:1}) ],
      districts:['coffee','healthcare','transport','interview','emergency'],
      notes:'“We apply this model to five bounded encounters: coffee shop, community healthcare, transport, job interview, and emergency. Rather than asking you to imagine it, let us show you.”' },
    { id:'demo', title:'Live demo', tag:'BOTH SIDES', camera:[1500,640,1.3], label:'COFFEE SHOP', chapter:'LIVE DEMO',
      kicker:'LIVE DEMO', headline:'Live demo:<br>the service-worker side.', copy:'The coffee-shop encounter, from behind the counter.', tags:['Service-worker role'],
      beats:[{}, { headline:'But this is still<br>only one side.', copy:'Now the same encounter is running from the opposite role on my teammate’s device.', tags:['Service-worker role','Deaf role'] },
        { headline:'One interaction,<br>understood from both sides.', copy:'Not two separate courses. That is the central idea of Lakon.', tags:['Same scenario graph'] },
        { headline:'Learn. Practise. Rehearse.<br>Recover. Progress.', copy:'The complete loop, including repair when communication breaks down.', tags:['Conversation','Repair','Progress'] }],
      stage:[ t('barista','lambai',{x:-2,y:40,w:42}), p('laptop',{x:26,y:60,w:26}),
        t('teman-tuli','isyarat',{x:60,y:40,w:42,b:1,flip:1}), p('laptop',{x:50,y:60,w:26,b:1,flip:1}),
        p('graf',{x:40,y:8,w:20,b:2}), p('label-graf',{x:30,y:2,w:40,b:2}),
        h('<div class="chips"><span>Learn</span><i>→</i><span>Practise</span><i>→</i><span>Rehearse</span><i>→</i><span>Recover</span><i>→</i><span>Progress</span></div>',{x:0,y:90,w:100,b:3}) ],
      notes:'Demonstrate the service-worker side. Then: “But this is still only one side.” Bring in teammate: “Now the same encounter is running from the opposite role on my teammate’s device.” Teammate gestures: “And that is the central idea of Lakon: not two separate courses, but one interaction understood from both sides.” Conversation/repair/progress: “The complete loop is learn, practise, rehearse, recover, and progress.”' },
    { id:'privacy', title:'Privacy by architecture', tag:'ON-DEVICE', camera:[2290,1240,1.05], label:'BROWSER LAB', chapter:'PRIVACY BY ARCHITECTURE',
      kicker:'PRIVACY BY ARCHITECTURE', headline:'Camera video stays<br>on the device.',
      copy:'Browser-side landmark processing and DTW-based comparison produce corrective feedback. The recognition pipeline does not require camera video to be uploaded; the server handles the application, content, accounts and progress.',
      tags:['MediaPipe landmarks','DTW comparison','Corrective feedback'],
      stage:[ h('<div class="device-frame"><span>ON THE LEARNER’S DEVICE · IN THE BROWSER</span></div>',{x:0,y:0,w:100,hh:52}),
        p('webcam',{x:2,y:12,w:22}), f('hand-landmarks',{x:25,y:4,w:30,rot:-2,plain:1}), p('dtw',{x:55,y:12,w:22}), p('feedback',{x:77,y:12,w:22}),
        p('server',{x:6,y:60,w:26,b:1}), p('tanpa-video',{x:66,y:60,w:26,b:1}), p('cap-no-video',{x:30,y:66,w:38,b:1,rot:-4}) ],
      notes:'“What you just saw uses browser-side landmark processing and DTW-based comparison to produce corrective feedback. Lakon’s recognition pipeline does not require camera video to be uploaded to our server; the server handles the application, content, accounts and progress.”' },
    { id:'evidence', title:'Evidence', tag:'WHAT WE CAN PROVE TODAY', camera:[2180,1130,.9], label:'BROWSER LAB', chapter:'EVIDENCE',
      kicker:'WHAT WE CAN PROVE TODAY', headline:'Functional, tested,<br>honest about scope.',
      copy:'A functional five-scenario, two-role prototype, with passing tests, accessibility audits and a network capture. These prove technical behaviour, not learning effectiveness.',
      tags:['Technical behaviour','Not learning effectiveness'],
      stage:[ h(stat('5 × 2','scenarios × roles, functional'),{x:0,y:0,w:49}), h(stat('69','unit tests passing'),{x:51,y:0,w:49}),
        h(stat('21','end-to-end tests passing'),{x:0,y:25,w:49}), h(stat('100','Lighthouse accessibility · audited pages',`<img src="${A}/props/lighthouse.svg" alt="">`),{x:51,y:25,w:49}),
        h(stat('0','image or video payload observed in the network capture'),{x:0,y:50,w:100}),
        h('<div class="footnote">These prove <b>technical behaviour</b> — not learning effectiveness.</div>',{x:0,y:80,w:100,b:1}) ],
      notes:'“Today we can demonstrate a functional five-scenario, two-role prototype, 69 passing unit tests, 21 passing end-to-end tests, Lighthouse accessibility scores of 100 on the audited pages, and a network capture with no image or video payload observed. These prove technical behaviour—not learning effectiveness.”' },
    { id:'maturity', title:'Maturity map', tag:'TODAY → NEXT', camera:[1510,260,.98], label:'VALIDATION GATE', chapter:'MATURITY MAP',
      kicker:'MATURITY MAP', headline:'Functional technology.<br>Exploratory content.',
      copy:'Production readiness requires Deaf-led linguistic review, institutional usability pilots, verification calibration, and later learning-effect evaluation.',
      tags:['Deaf-led review','Institutional pilots','Calibration','Learning-effect evaluation'],
      stage:[ p('tunas',{x:4,y:0,w:26}), p('daftar-today',{x:0,y:30,w:40}), p('papan-arah',{x:41,y:14,w:20}),
        p('pohon',{x:70,y:0,w:26,b:1}), p('daftar-next',{x:60,y:30,w:40,b:1}), f('juru-bahasa-isyarat',{x:4,y:58,w:44,rot:-2,b:1}) ],
      notes:'“The technology is functional; the current sign content is exploratory. Production readiness requires Deaf-led linguistic review, institutional usability pilots, verification calibration, and later learning-effect evaluation.”' },
    { id:'impact', title:'Impact', tag:'SDG 4 · SDG 10', camera:[1900,640,.8], label:'THE DISTRICT', chapter:'IMPACT',
      kicker:'CAPABILITY → OUTCOME', headline:'From one worker to<br>institutional capability.',
      copy:'Primarily supporting SDG 4 and SDG 10, with healthcare, employment and transport extending the pathway toward SDGs 3, 8 and 11.',
      tags:['SDG 4','SDG 10','Pathway: SDG 3 · 8 · 11'],
      beats:[{}, { kicker:'PRIMARY ALIGNMENT', headline:'SDG 4 and SDG 10.', copy:'Accessible, scenario-based sign language learning, and a share of the adaptation burden moved to prepared service providers.' },
        { kicker:'SCENARIO PATHWAY', headline:'Health, work, transport:<br>SDGs 3, 8 and 11.', copy:'The contributions to SDGs 3, 8 and 11 follow from the settings the scenarios cover.' }],
      stage:[ p('c-practice',{x:4,y:0,w:22}), p('panah',{x:27,y:6,w:9}), p('c-capability',{x:39,y:0,w:22}), p('panah',{x:62,y:6,w:9}), p('c-outcome',{x:74,y:0,w:22}),
        h(sdg('04','4.5','Quality Education','Equal access to education and training: accessible, scenario-based BISINDO learning outside formal special education.','belajar-isyarat'),{x:0,y:27,w:48.5,b:1,e:2,rot:-1}),
        h(sdg('10','10.2','Reduced Inequalities','Inclusion of all: preparing service providers, rather than placing responsibility only on Deaf people.','sdg10-inklusi'),{x:51.5,y:27,w:48.5,b:1,e:2,rot:1}),
        h(sdg('03','3.8','Good Health & Well-being','Health-centre and emergency scenarios, where miscommunication has clinical consequences.','sdg3-kesehatan'),{x:0,y:27,w:32,b:2,cls:'small'}),
        h(sdg('08','8.5','Decent Work','Job-interview scenario and frontline staff practice for more inclusive work interactions.','sdg8-kerja'),{x:34,y:27,w:32,b:2,cls:'small'}),
        h(sdg('11','11.2','Sustainable Cities','Transport scenario: more accessible, independent journeys.','sdg11-transportasi'),{x:68,y:27,w:32,b:2,cls:'small'}),
        h(`<div class="sdg-strip"><span>Primary</span>${['04','10'].map((n)=>`<img src="${A}/sdg/sdg-${n}.jpg" alt="SDG ${Number(n)}">`).join('')}<span>Pathway</span>${['03','08','11'].map((n)=>`<img src="${A}/sdg/sdg-${n}.jpg" alt="SDG ${Number(n)}">`).join('')}<em>Lakon proposal, Table 5 · UN SDG targets</em></div>`,{x:0,y:86,w:100,b:1}) ],
      notes:'“The goal is to move from one worker practising one encounter to repeatable institutional capability. That primarily supports SDG 4 and SDG 10, with healthcare, employment and transport extending the pathway toward SDGs 3, 8 and 11.”' },
    { id:'closing', title:'Closing', tag:'ONE SCENARIO. TWO ROLES.', camera:[1545,1680,.9], label:'THE GATE', chapter:'CLOSING',
      kicker:'CLOSING', headline:'When communication fails,<br>who is expected to adapt?',
      copy:'Accessibility should not begin only after communication has already broken down.', tags:[],
      beats:[{}, { headline:'Prepare both sides<br>before the interaction.', copy:'Lakon lets both sides rehearse the same encounter before it happens.', tags:['Service worker','Deaf learner'] },
        { headline:'One scenario. Two roles.<br>One shared learning experience.', copy:'Thank you.', tags:[] }],
      stage:[ p('tanya',{x:40,y:4,w:20}), p('lampu-sorot',{x:25,y:0,w:50,b:1,cls:'glow'}), t('barista','lambai',{x:6,y:34,w:46,b:1}), t('teman-tuli','lambai',{x:48,y:34,w:46,b:1,flip:1}),
        p('jembatan',{x:28,y:76,w:44,b:1}), p('halo',{x:62,y:16,w:30,b:2,rot:4}) ],
      notes:'“We began with one question: when communication fails, who is expected to adapt? Lakon proposes that accessibility should not begin only after communication has already broken down. We can prepare both sides before the interaction happens. One scenario. Two roles. One shared learning experience. Thank you.”' }
  ];
  const TOTAL = destinations.length;
  const idx = (id) => destinations.findIndex((d) => d.id === id);
  const evidence = {
    privacy:{ from:'privacy', kicker:'PRIVACY · EVIDENCE', label:'PRIVACY EVIDENCE', chapter:'CAMERA FRAMES STAY ON DEVICE', headline:'The camera stays<br>with the learner.', copy:'A documented capture observed 56 requests and no camera image or video data transmitted. Normal application and checkpoint traffic was small.', tags:['56 requests observed','No camera images sent','No camera video sent'], notes:'This evidence supports the no-camera-media-transmission claim. It is not a claim about every possible security property.' },
    governance:{ from:'maturity', kicker:'CONTENT GOVERNANCE', label:'CONTENT GOVERNANCE', chapter:'REVIEW BEFORE PRODUCTION', headline:'Build the content<br>with its community.', copy:'The current sign content is exploratory. Appropriate linguistic review by Deaf signers or qualified validators is a required production step.', tags:['Exploratory today','Linguistic review ahead','Co-created responsibly'], notes:'There is no claim that content has already been validated or certified, or that all regional variants are represented.' },
    architecture:{ from:'privacy', kicker:'SYSTEM ARCHITECTURE', label:'SYSTEM ARCHITECTURE', chapter:'LANDMARKS → DTW', headline:'Landmarks first.<br>DTW comparison next.', copy:'MediaPipe-based hand and pose landmarks are extracted in the browser, then attempts are compared with Dynamic Time Warping for feedback on selected pose qualities.', tags:['Browser processing','DTW comparison','No trained classifier claim'], notes:'Current feedback concerns finger shape, hand position and palm orientation. Movement is not yet a separate score; non-manual markers are not yet fully evaluated. ONNX is a possible future architecture extension.' }
  };
  const scenarioInfo = {
    healthcare:{name:'Community Health Centre',camera:[1940,900,1.05],photo:'puskesmas',cast:[t('dokter','periksa',{x:0,y:40,w:46}),t('teman-tuli','tunjuk',{x:54,y:40,w:46,flip:1})],headline:'Care starts<br>with being understood.',copy:'A bounded Puskesmas encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'},
    transport:{name:'Public Transport',camera:[1100,920,1.05],photo:'stasiun',cast:[t('petugas','tunjuk',{x:0,y:40,w:46}),t('teman-tuli','netral',{x:54,y:40,w:46,flip:1})],headline:'A journey<br>shared by both.',copy:'A bounded public transport encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'},
    interview:{name:'Job Interview',camera:[2060,560,1.05],photo:'wawancara',cast:[t('pewawancara','catat',{x:0,y:40,w:46}),t('teman-tuli','isyarat',{x:54,y:40,w:46,flip:1})],headline:'Opportunity<br>needs access.',copy:'A bounded job interview encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'},
    emergency:{name:'Emergency',camera:[2290,760,1.05],photo:'darurat',cast:[t('warga','telepon',{x:0,y:40,w:46}),t('teman-tuli','tunjuk',{x:54,y:40,w:46,flip:1})],headline:'Clarity matters<br>when time is short.',copy:'A bounded emergency encounter in the LAKON proof of concept. The scenario illustrates a reusable learning format.'}
  };

  // Open world: members walk the district in their service roles.
  const worldCast = [
    ['barista','lambai',1660,610,150], ['dokter','netral',1740,860,150], ['petugas','lambai',880,860,150],
    ['pewawancara','lambai',1830,420,150], ['warga','telepon',2430,650,150], ['teman-tuli','lambai',1610,1290,130],
    ['perawat','lambai',2080,1030,130], ['teman-tuli','isyarat',1335,1385,130]
  ];
  world.insertAdjacentHTML('beforeend', worldCast.map(([role,pose,x,y,size]) =>
    `<img class="citizen" src="${tokohSrc(role,pose)}" alt="" style="left:${x}px;top:${y}px;width:${size}px">`).join('') +
    [['kopi',1150,360,-5],['puskesmas',2130,920,4],['stasiun',880,600,-3]].map(([name,x,y,r]) =>
    `<figure class="world-photo" style="left:${x}px;top:${y}px;--r:${r}deg"><img src="${A}/foto/${name}.jpg" alt=""><figcaption>${CREDITS[name][0]}</figcaption></figure>`).join(''));

  let travelTimers = [], travelling = false;
  let step = 0, beat = 0, mode = 'story', busy = false, safe = false, reduced = false, toastTimer, currentCamera = null, overlayTrigger = null;
  const query = new URLSearchParams(location.search);
  const sceneParam = query.get('scene');
  if (idx(sceneParam) >= 0) step = idx(sceneParam);
  safe = query.get('safeMode') === 'true';
  reduced = query.get('reducedMotion') === 'true' || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (safe) app.classList.add('safe-mode');
  if (reduced) app.classList.add('reduced-motion');
  $('#safeBanner').hidden = !safe;
  $('#safeButton').setAttribute('aria-pressed',String(safe));
  $('#motionButton').setAttribute('aria-pressed',String(reduced));

  const setCamera = (coords, immediate=false, ms=1100, fit=true) => {
    if (fit) currentCamera = coords;
    let [x,y,z] = coords;
    let anchorX=innerWidth/2, anchorY=innerHeight/2;
    // Fit the arrival composition into the space beside (or above) its introduction.
    // The same world and transform camera serve every other story waypoint.
    if (fit && app.classList.contains('entrance-mode') && mode==='story') {
      const narrow=innerWidth<=640;
      z=narrow ? Math.min(innerWidth/1640,(innerHeight*.5-40)/1450) : Math.min(innerWidth*.59/1640,(innerHeight-164)/1450,.68);
      anchorX=innerWidth*(narrow?.5:.70);
      anchorY=narrow ? 70+(innerHeight*.5-40)/2 : innerHeight*.50;
    }
    if (immediate || reduced || safe) world.style.transitionDuration = '0ms';
    else world.style.transitionDuration = `${ms}ms`;
    world.style.transform = `translate3d(${anchorX-x*z}px,${anchorY-y*z}px,0) scale(${z})`;
  };

  const pieceHTML = (q) => {
    const style = `left:${q.x}%;top:${q.y}%;width:${q.w}%;${q.hh?`height:${q.hh}%;`:''}--r:${q.rot||0}deg;--flip:${q.flip?-1:1}`;
    const cls = `piece piece-${q.k} ${q.cls||''}`;
    if (q.k==='tokoh') return `<img class="${cls}" style="${style}" src="${tokohSrc(q.role,q.pose,q.face || (q.role==='teman-tuli' ? CAST[q.role] : STAGE_FACE))}" alt="">`;
    if (q.k==='prop') return `<img class="${cls}" style="${style}" src="${A}/props/${q.name}.${q.name==='lighthouse'?'svg':'png'}" alt="">`;
    if (q.k==='foto') { const [cap,credit]=CREDITS[q.name]; const ext=q.name==='hand-landmarks'?'png':'jpg';
      return `<figure class="${cls}${q.plain?' plain':''}" style="${style}"><img src="${A}/foto/${q.name}.${ext}" alt="${cap}"><figcaption>${cap}<small>${credit}</small></figcaption></figure>`; }
    return `<div class="${cls}" style="${style}">${q.html}</div>`;
  };
  // Builds a fresh stage; the previous one fades out while the new pieces drop in one by one.
  const buildStage = (pieces, shown=0) => {
    stage.querySelectorAll('.stage-set').forEach((old) => { old.classList.add('leaving'); setTimeout(() => old.remove(), 400); });
    const set = document.createElement('div');
    set.className = 'stage-set';
    set.innerHTML = pieces.map(pieceHTML).join('');
    [...set.children].forEach((el,i) => { el.dataset.beat = pieces[i].b || 0; el.dataset.exit = pieces[i].e ?? 99; });
    stage.append(set);
    requestAnimationFrame(() => requestAnimationFrame(() => revealBeat(set, shown)));
  };
  const revealBeat = (set, b) => {
    let n = 0;
    [...set.children].forEach((el) => {
      const on = Number(el.dataset.beat) <= b && b < Number(el.dataset.exit);
      if (on && !el.classList.contains('on')) el.style.transitionDelay = `${(n++)*110}ms`;
      el.classList.toggle('on', on);
    });
  };
  const maxBeat = (d) => Math.max((d.beats?.length||1)-1, ...d.stage.map((q) => q.b||0));

  const setText = (data, index=step, b=0) => {
    const view = {...data, ...(data.beats?.[b]||{})};
    app.classList.toggle('entrance-mode', data.id === 'opening');
    app.classList.toggle('opening-photos', data.id === 'opening' && b >= 1);
    $('#kicker').textContent = view.kicker;
    const beats = maxBeat(data);
    $('#stepCount').textContent = `${String(index+1).padStart(2,'0')} / ${TOTAL}` + (beats ? `  ${'●'.repeat(b+1)}${'○'.repeat(beats-b)}` : '');
    $('#headline').innerHTML = view.headline;
    $('#copy').textContent = view.copy;
    $('#locationLabel').textContent = data.label;
    $('#chapterLabel').textContent = data.chapter;
    $('#tags').innerHTML = (view.tags || []).map((tag) => `<span>${tag}</span>`).join('');
    $('#progressFill').style.width = `${((index+1)/TOTAL)*100}%`;
    const last = index === TOTAL-1 && b === beats;
    $('#nextButton').innerHTML = index === 0 && b === 0 ? 'Begin the journey <span>→</span>' : last ? 'Return to the beginning <span>↺</span>' : 'Continue <span>→</span>';
    $('#notes').textContent = view.notes || '';
    const active = data.districts || ({loop:['coffee'],innovation:['coffee'],demo:['coffee'],users:['transport']})[data.id] || [];
    document.querySelectorAll('.district').forEach((d) => d.classList.toggle('active', active.includes(d.dataset.location)));
    $('#routeCaption').textContent = index===0 ? 'Choose a building to explore · M to view the district map' : 'ONE SCENARIO · TWO ROLES · ONE SHARED LEARNING EXPERIENCE';
  };
  // Changing scene: panels close, the camera flies across the town, then the panels open at the destination.
  const go = (n, instant=false, b=0) => {
    if (n < 0 || n > TOTAL-1) return;
    const travel = !instant && !reduced && !safe && n !== step && currentCamera;
    const from = currentCamera;
    step = n; beat = b; const dest = destinations[step]; mode = 'story'; overlay.hidden=true;
    app.classList.remove('overview','map-mode','card-off','stage-off'); syncPanels();
    travelTimers.forEach(clearTimeout); travelTimers = [];
    $('#modeLabel').textContent = 'STORY MODE';
    query.set('scene',dest.id); query.delete('mode'); history.replaceState(null,'',`${location.pathname}?${query.toString()}`);
    const arrive = () => { travelling = false; app.classList.remove('travelling'); setText(dest, step, beat); buildStage(dest.stage, beat); };
    if (!travel) { arrive(); setCamera(dest.camera, instant); return; }
    travelling = true; app.classList.add('travelling'); app.classList.remove('opening-photos');
    app.classList.toggle('entrance-mode', dest.id === 'opening');
    const [fx,fy,fz] = from, [tx,ty,tz] = dest.camera;
    if (Math.hypot(tx-fx, ty-fy) < 450) { setCamera(dest.camera, false, 1000); travelTimers.push(setTimeout(arrive, 1000)); return; }
    setCamera([(fx+tx)/2, (fy+ty)/2, Math.min(fz,tz)*.62], false, 700, false);
    travelTimers.push(setTimeout(() => setCamera(dest.camera, false, 900), 700), setTimeout(arrive, 1600));
  };
  // Pressing on during a flight skips straight to the arrival.
  const land = () => { travelTimers.forEach(clearTimeout); travelTimers = []; setCamera(destinations[step].camera, true); travelling = false; app.classList.remove('travelling'); setText(destinations[step], step, beat); buildStage(destinations[step].stage, beat); };
  const syncPanels = () => {
    const card = app.classList.contains('card-off'), st = app.classList.contains('stage-off');
    app.classList.toggle('world-clear', card && st);
    $('#panelsButton').setAttribute('aria-pressed', String(card || st));
  };
  const togglePanels = (which) => {
    if (which) app.classList.add(`${which}-off`);
    else { const anyOff = app.classList.contains('card-off') || app.classList.contains('stage-off'); app.classList.toggle('card-off', !anyOff); app.classList.toggle('stage-off', !anyOff); }
    syncPanels();
  };
  const setBeat = (b) => {
    beat = b; app.classList.remove('stage-off'); syncPanels(); setText(destinations[step], step, beat);
    const set = stage.querySelector('.stage-set:not(.leaving)'); if (set) revealBeat(set, beat);
  };
  const showToast = (message) => { const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800); };
  const goScenario = (key) => {
    const info=scenarioInfo[key];if(!info)return;
    mode='qa';overlay.hidden=true;app.classList.remove('overview','map-mode','entrance-mode','opening-photos');setCamera(info.camera);$('#modeLabel').textContent='Q&A MODE';
    $('#routeCaption').textContent='ONE SCENARIO · TWO ROLES · ONE SHARED LEARNING EXPERIENCE';
    document.querySelectorAll('.district').forEach(d=>d.classList.toggle('active',d.dataset.location===key));
    $('#nextButton').innerHTML='Return to the journey <span>↩</span>';
    buildStage([f(info.photo,{x:20,y:0,w:60,rot:-2}), ...info.cast.map((c)=>({...c,y:50,w:40,x:c.x?60:0}))]);
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
      grid.innerHTML=`<button class="destination" data-topic="privacy"><span>PRIVACY</span><strong>Privacy evidence</strong><small>On-device camera processing</small></button><button class="destination" data-topic="governance"><span>CONTENT</span><strong>Content governance</strong><small>The path to responsible review</small></button><button class="destination" data-topic="architecture"><span>TECHNOLOGY</span><strong>System architecture</strong><small>Landmarks, DTW and scope</small></button><button class="destination" data-scene="loop"><span>PRODUCT</span><strong>Coffee Shop</strong><small>Return to the hero scenario</small></button><button class="destination" data-scene="impact"><span>IMPACT</span><strong>Intended contribution</strong><small>SDGs and future evaluation</small></button><button class="destination" data-scene="gap"><span>STORY</span><strong>Back to the story</strong><small>Resume at the learning gap</small></button>`;
    }else{
      $('#overlayKicker').textContent='MAP OVERVIEW · THE CITY IS YOUR INDEX';$('#overlayTitle').textContent='Choose a destination';
      grid.innerHTML=destinations.map((d,i)=>`<button class="destination" data-step="${i}"><span>${String(i+1).padStart(2,'0')} · ${d.tag}</span><strong>${d.title}</strong><small>${d.chapter}</small></button>`).join('')+`<button class="destination" data-scene="healthcare"><span>SCENARIO DISTRICT</span><strong>Community health</strong><small>Puskesmas encounter</small></button><button class="destination" data-scene="transport"><span>SCENARIO DISTRICT</span><strong>Public transport</strong><small>Ticket and travel encounter</small></button><button class="destination" data-scene="interview"><span>SCENARIO DISTRICT</span><strong>Job interview</strong><small>Employment encounter</small></button><button class="destination" data-scene="emergency"><span>SCENARIO DISTRICT</span><strong>Emergency</strong><small>Time-critical encounter</small></button>`;
    }
    $('#closeOverlay').focus({preventScroll:true});
  };
  const closeOverlay = () => { go(step,true,beat); if(overlayTrigger?.isConnected)overlayTrigger.focus({preventScroll:true}); overlayTrigger=null; };
  $('#destinationGrid').addEventListener('click',(event)=>{
    const btn=event.target.closest('button');if(!btn)return;
    if(btn.dataset.topic){const topic=evidence[btn.dataset.topic];const from=destinations[idx(topic.from)];closeOverlay();mode='qa';query.set('mode','qa');history.replaceState(null,'',`${location.pathname}?${query.toString()}`);setText({...from,...topic,beats:null},idx(topic.from));buildStage(from.stage,9);$('#stepCount').textContent='Q&A';$('#modeLabel').textContent='Q&A MODE';setCamera(from.camera);showToast(topic.label);return;}
    if(btn.dataset.step!==undefined){const n=Number(btn.dataset.step);closeOverlay();go(n);return;}
    if(btn.dataset.scene){const key=btn.dataset.scene;closeOverlay();if(scenarioInfo[key])goScenario(key);else go(idx(key));}
  });
  const next = () => {if(mode!=='story'){closeOverlay();return;}if(travelling){land();return;}if(beat<maxBeat(destinations[step]))setBeat(beat+1);else go(step===TOTAL-1?0:step+1);};
  const previous = () => {if(mode!=='story'){closeOverlay();return;}if(travelling){land();return;}if(beat>0)setBeat(beat-1);else go(step===0?0:step-1);};
  document.addEventListener('keydown',(e)=>{
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(!deck.hidden){if(e.key==='Escape'||e.key.toLowerCase()==='c')closeDeck();return;}
    if(e.key==='Escape'){if(!overlay.hidden)closeOverlay();else $('#notes').hidden=true;return;}
    if(!overlay.hidden && e.key==='Tab'){
      const buttons=[...overlay.querySelectorAll('button')],first=buttons[0],last=buttons[buttons.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      return;
    }
    // Space must activate a focused native control instead of also advancing the story.
    if((e.key===' '||e.key==='Enter')&&e.target.closest('button'))return;
    // Presentation clickers send PageDown/PageUp.
    if(e.key===' '||e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();if(!busy){busy=true;next();setTimeout(()=>busy=false,(safe||reduced)?60:450);}return;}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();if(!busy){busy=true;previous();setTimeout(()=>busy=false,(safe||reduced)?60:450);}return;}
    if(/^[1-9]$/.test(e.key)){go(Number(e.key)-1);return;}
    const k=e.key.toLowerCase();if(k==='c')openDeck();if(k==='h')togglePanels();if(k==='m')openOverlay('map');if(k==='q')openOverlay('qa');if(k==='f')toggleFullscreen();if(k==='d'){go(idx('demo'));showToast('DEMO HANDOFF · COFFEE SHOP');}if(k==='s')toggleSafe();if(k==='r')toggleReduced();
  });
  function toggleSafe(){safe=!safe;app.classList.toggle('safe-mode',safe);$('#safeBanner').hidden=!safe;$('#safeButton').setAttribute('aria-pressed',String(safe));query.set('safeMode',String(safe));history.replaceState(null,'',`${location.pathname}?${query.toString()}`);showToast(safe?'SAFE MODE ON':'SAFE MODE OFF');}
  function toggleReduced(){reduced=!reduced;app.classList.toggle('reduced-motion',reduced);$('#motionButton').setAttribute('aria-pressed',String(reduced));query.set('reducedMotion',String(reduced));history.replaceState(null,'',`${location.pathname}?${query.toString()}`);showToast(reduced?'REDUCED MOTION ON':'REDUCED MOTION OFF');}
  async function toggleFullscreen(){try{if(!document.fullscreenElement)await app.requestFullscreen();else await document.exitFullscreen();}catch{showToast('FULLSCREEN IS UNAVAILABLE IN THIS BROWSER');}}
  // Canva deck: full-screen over everything; loaded on first open so the town works offline.
  const deck = $('#deck'), deckFrame = $('#deckFrame');
  const openDeck = () => { if (!deckFrame.src) deckFrame.src = 'https://www.canva.com/design/DAHW9ClivJk/MQ1_4SrmwHZtF3yXESItxA/view?embed'; deck.hidden = false; $('#deckButton').setAttribute('aria-pressed','true'); deckFrame.focus(); };
  const closeDeck = () => { deck.hidden = true; $('#deckButton').setAttribute('aria-pressed','false'); $('#deckButton').focus({preventScroll:true}); };
  $('#deckButton').addEventListener('click', openDeck); $('#deckClose').addEventListener('click', closeDeck);
  $('#panelsButton').addEventListener('click', () => togglePanels());
  document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => togglePanels(b.dataset.close)));
  $('#nextButton').addEventListener('click',next);$('#mapButton').addEventListener('click',()=>openOverlay('map'));$('#qaButton').addEventListener('click',()=>openOverlay('qa'));$('#safeButton').addEventListener('click',toggleSafe);$('#motionButton').addEventListener('click',toggleReduced);$('#fullButton').addEventListener('click',toggleFullscreen);$('#closeOverlay').addEventListener('click',closeOverlay);$('#notesButton').addEventListener('click',()=>$('#notes').hidden=!$('#notes').hidden);
  $('#orientationBoard').addEventListener('click',()=>openOverlay('map'));
  document.querySelectorAll('.district').forEach(el=>el.addEventListener('click',()=>{const id=el.dataset.location;if(id==='coffee')go(idx('loop'));else goScenario(id);}));
  addEventListener('resize',()=>{if(currentCamera)setCamera(currentCamera,true);});
  addEventListener('popstate',()=>{const i=idx(new URLSearchParams(location.search).get('scene'));if(i>=0)go(i,true);});
  // Warm the cache so pieces never pop in half-loaded mid-talk.
  destinations.flatMap((d)=>d.stage).forEach((q)=>{const m=pieceHTML(q).match(/src="([^"]+)"/);if(m){const i=new Image();i.src=m[1];}});
  go(step,true);
  if(sceneParam && scenarioInfo[sceneParam])goScenario(sceneParam);
  if(query.get('mode')==='qa' && !scenarioInfo[sceneParam])openOverlay('qa');
})();
