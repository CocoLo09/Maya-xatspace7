const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

const tracks = [
  {title:'La Grange', artist:'ZZ Top', src:'assets/audio/la-grange.mp3', art:'assets/covers/la-grange.webp'},
  {title:'Paranoid', artist:'Black Sabbath', src:'assets/audio/paranoid.mp3', art:'assets/covers/paranoid.webp'},
  {title:'Like a Stone', artist:'Audioslave', src:'assets/audio/like-a-stone.mp3', art:'assets/covers/like-a-stone.webp'},
  {title:'Amazonia', artist:'Gojira', src:'assets/audio/amazonia.mp3', art:'assets/covers/amazonia.webp'}
];

const scenes = Array.from({length:10}, (_,i)=>`assets/images/scene-${String(i+1).padStart(2,'0')}.webp`);
const messages = [
  'La música siempre encuentra la manera. ♡',
  'Good music, better days.',
  'Rock en el alma, estrellas en la mirada.',
  'Un universo propio donde todo suena mejor.'
];

const aboutData = [
  {
    title:'Personajes Favoritos',
    intro:'Mi elenco tiene de todo: personajes que dan miedo, héroes de ciencia ficción, clásicos animados y criaturas irresistiblemente tiernas. Este es mi pequeño multiverso personal.',
    items:[
      ['Michael Myers','🎭'],['Ellen Ripley','🚀'],['Freddy Krueger','🧤'],['Jeepers Creepers','🦇'],['Bugs Bunny','🥕'],['La Pantera Rosa','💗'],['Tazmania','🌪️'],['Silvestre','🐈'],['Hello Kitty','🎀'],['Kuromi','🖤'],['Benito Bodoque','🎩'],['Goku','🔥'],['Trunks','⚔️'],['Piccolo','💚'],['Moana','🌊'],['Masha y el Oso','🐻'],['Queso','🧀'],['Topo Gigio','🐭'],['Doris','🐠'],['Boo','👻'],['Gugu Gaga','🍼']
    ]
  },
  {
    title:'Colores Favoritos',
    intro:'Mi paleta favorita mezcla lo dulce con lo intenso: rosa, morado, negro y gris Oxford. Es la combinación que mejor representa mi estilo entre lo femenino, lo nocturno y lo rockero.',
    items:[['Rosa','💗'],['Morado','💜'],['Negro','🖤'],['Gris Oxford','🩶']]
  },
  {
    title:'Descripción Personal',
    intro:'Me considero buena onda y soy de todo o nada. Mi signo zodiacal es Escorpión. Me encantan las fresas con crema, el mango y el coco; también me late mucho el rollo de los extraterrestres. Le voy a los Pumas y a las Águilas Blancas del Politécnico —sí, soy burra 😄—. Amo a toda criatura que vive en el mundo, menos a las arañas, las serpientes y las cucarachas… ¡Ah!, y al ser humano 😜.',
    items:[
      ['Buena onda','✨'],['De todo o nada','⚡'],['Escorpión','♏'],['Fresas con crema','🍓'],['Mango','🥭'],['Coco','🥥'],['Extraterrestres','👽'],['Pumas','🐾'],['Águilas Blancas IPN','🏈'],['Amo a los animales','🐾'],['Arañas: no gracias','🕷️'],['Serpientes: paso','🐍'],['Cucarachas: jamás','🪳']
    ]
  },
  {
    title:'Mi Meta',
    intro:'Mi meta es lograr dejar este maravilloso vicio de xat. No sé cuándo ocurrirá, pero algún día pasará… o eso espero 😅.',
    items:[['Dejar xat algún día','🎯'],['Sí, algún día…','⏳'],['Mientras tanto, buena música','🎧']]
  },
  {
    title:'Pasatiempos',
    intro:'Me gusta ver películas de terror, suspenso y drama. Sobre todo, disfruto escuchar música y entrar a la salita de mi madrina Rous, EnlaDiscorg. Ahí siempre hay una canción para el momento indicado.',
    items:[['Terror','👻'],['Suspenso','🕯️'],['Drama','🎭'],['Escuchar música','🎧'],['EnlaDiscorg','📻'],['Mi madrina Rous','💗']]
  },
  {
    title:'Películas Favoritas',
    intro:'Stigmata me encanta. También disfruto Mujer bonita y, sobre todo, las películas de las sagas Alien, Depredador, Jeepers Creepers y Pesadilla en Elm Street.',
    items:[['Stigmata','✝️'],['Mujer bonita','🌹'],['Alien','👽'],['Depredador','🛸'],['Jeepers Creepers','🦇'],['Pesadilla en Elm Street','🌙']]
  },
  {
    title:'Libros Favoritos',
    intro:'Entre mis libros favoritos hay historias intensas, humanas y difíciles de olvidar. Estos cuatro tienen un lugar especial en mi biblioteca personal.',
    items:[
      ['Los renglones torcidos de Dios — Torcuato Luca de Tena','📘'],
      ['El arte de amar — Ovidio','📕'],
      ['La noche de Tlatelolco — Elena Poniatowska','📗'],
      ['Los hornos de Hitler — Olga Lengyel','📙']
    ]
  },
  {
    title:'Género Musical',
    intro:'Mi playlist no conoce fronteras: electrónica, rock, metal, música de los años 70 y 80, cumbia, pop y rock urbano. Si tiene ritmo, actitud o una guitarra que diga algo, tiene lugar en mi universo.',
    items:[['Electrónica','🎛️'],['Rock','🎸'],['Metal','🤘'],['Años 70','🪩'],['Años 80','📼'],['Cumbia','💃'],['Pop','🎤'],['Rock urbano','🌃']]
  },
  {
    title:'Amig@s',
    intro:'Me considero afortunada de tener amistades que realmente valen la pena. Entre las más cercanas están mi madrina Rous y mi madrina Gomi, Karito, mi tía Sarita, Coco Loco —“Coco-nito”—, Anthony —“Abejo”— y Pitufo —“Azulito”—. Son parte de las personas que hacen más bonito mi mundo.',
    items:[
      ['Madrina Rous','💗'],['Madrina Gomi','💜'],['Karito','🌸'],['Tía Sarita','✨'],['Coco Loco · “Coco-nito”','🥥'],['Anthony · “Abejo”','🐝'],['Pitufo · “Azulito”','💙']
    ]
  }
];

let currentTrack = 0, currentScene = 0, currentMsg = 0, sceneAuto = true, sceneCountdown = 8, sceneTimerInt, aboutIndex = 0, aboutAuto = true, aboutInt;
const audio = $('#audio');
const vinyl = $('#vinyl');
const needle = $('#needleArm');
const eq = $('#eqBars');
const cursor = $('#cursorStar');
const interior = $('#interior');
const landing = $('#landing');
const effectsToggles = $$('[data-toggle-effects]');
let effectsOn = true;
function initVinylMotion(){
  // El giro se controla por CSS con la clase .playing para mayor estabilidad.
}

function parkNeedle(){
  needle.classList.remove('is-entering');
  needle.style.transform = 'rotate(-30deg)';
}

function updateNeedlePosition(forceStart=false){
  // La base visual permanece fija; solo gira el brazo desde su pivote derecho.
  if(forceStart){
    needle.classList.add('is-entering');
  }
  if(!audio.duration || !Number.isFinite(audio.duration)){
    if(forceStart) needle.style.transform = 'rotate(-5deg)';
    return;
  }
  const progress = Math.max(0, Math.min(1, audio.currentTime / audio.duration));
  // Recorrido visible y realista: entra al disco y avanza suavemente hacia el centro.
  const angle = -5 + progress * 12;
  needle.style.transform = `rotate(${angle.toFixed(2)}deg)`;
  if(progress > .02) needle.classList.remove('is-entering');
}

function fitInteriorUI(){
  const ui = $('#interiorUi');
  if(!ui) return;
  ui.style.width = '100%';
  document.documentElement.style.setProperty('--ui-scale','1');
}

function buildEq(){
  eq.innerHTML='';
  for(let i=0;i<24;i++){
    const bar=document.createElement('span');
    bar.style.height=(18 + (i%5)*10)+'px';
    bar.style.animationDelay=`${(i*0.07).toFixed(2)}s`;
    eq.appendChild(bar);
  }
}

function setTrack(index, autoplay=false){
  currentTrack = (index + tracks.length) % tracks.length;
  const t = tracks[currentTrack];
  audio.src = t.src;
  $('#trackTitle').textContent = t.title;
  $('#trackArtist').textContent = t.artist;
  $('#landingTrack').textContent = `${t.title} · ${t.artist}`;
  $('#topTrack').textContent = `${t.title} · ${t.artist}`;
  $('#albumArt').src = t.art;
  $('#albumArt').alt = `Portada de ${t.title} por ${t.artist}`;
  $('#seek').value = 0;
  if($('#currentTime')) $('#currentTime').textContent = '0:00';
  if($('#durationTime')) $('#durationTime').textContent = '0:00';
  parkNeedle();
  if(autoplay){
    audio.play().then(()=>updatePlayState(true)).catch(()=>updatePlayState(false));
  } else {
    updatePlayState(false);
  }
}

function updatePlayState(playing){
  $('#playIcon').textContent = playing ? '❚❚' : '▶';
  vinyl.classList.toggle('playing', playing);
  eq.classList.toggle('playing', playing);
  if(playing){
    // Entrada claramente visible del brazo; la base nunca se mueve.
    needle.classList.add('is-entering');
    requestAnimationFrame(()=>requestAnimationFrame(()=>updateNeedlePosition(true)));
  } else {
    needle.classList.remove('is-entering');
  }
}

function togglePlay(){
  if(audio.paused){
    audio.play().then(()=>updatePlayState(true)).catch(()=>{});
  } else {
    audio.pause();
    updatePlayState(false);
  }
}

function formatTime(seconds){
  if(!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function updateSeek(){
  const v = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  $('#seek').value = v || 0;
  const current = $('#currentTime');
  const duration = $('#durationTime');
  if(current) current.textContent = formatTime(audio.currentTime || 0);
  if(duration) duration.textContent = formatTime(audio.duration || 0);
  if(!audio.paused) updateNeedlePosition();
}

function buildSceneDots(){
  const wrap = $('#sceneDots'); wrap.innerHTML='';
  scenes.forEach((_,i)=>{
    const b=document.createElement('button');
    b.type='button';
    b.className = i===currentScene ? 'active' : '';
    b.addEventListener('click', ()=>setScene(i));
    wrap.appendChild(b);
  })
}

function setScene(index){
  currentScene = (index + scenes.length) % scenes.length;
  $('#sceneImg').src = scenes[currentScene];
  $('#sceneLabel').textContent = `Escena ${String(currentScene+1).padStart(2,'0')}`;
  $('#sceneNumber').textContent = currentScene + 1;
  buildSceneDots();
  sceneCountdown = 8;
  $('#sceneTimer').textContent = `${sceneCountdown}s`;
}

function startSceneTimer(){
  clearInterval(sceneTimerInt);
  sceneTimerInt = setInterval(()=>{
    if(!sceneAuto || interior.classList.contains('hidden')) return;
    sceneCountdown--;
    if(sceneCountdown<=0){
      setScene(currentScene+1);
      sceneCountdown = 8;
    }
    $('#sceneTimer').textContent = `${sceneCountdown}s`;
  },1000)
}

function updateVisitCounter(){
  const key='maya_xatspace_visit_count_v666';
  const session='maya_xatspace_visit_session_v666';
  const isPreview = ['file:', 'about:'].includes(window.location.protocol) || ['localhost','127.0.0.1'].includes(window.location.hostname);
  let count = Number(localStorage.getItem(key) || '0');
  if(!isPreview && !sessionStorage.getItem(session)){
    count += 1;
    localStorage.setItem(key,String(count));
    sessionStorage.setItem(session,'1');
  }
  $('#visitNumber').textContent = count.toLocaleString('es-MX');
}

function setMessage(index){
  currentMsg=(index+messages.length)%messages.length;
  $('#messageText').textContent = messages[currentMsg];
}

function buildAboutNav(){
  const nav=$('#aboutNav'); nav.innerHTML='';
  const icons=['🎬','🎨','👤','🎯','🎧','🍿','📚','🎵','💞'];
  aboutData.forEach((item, i)=>{
    const btn=document.createElement('button');
    btn.innerHTML = `<span class="about-nav-icon">${icons[i]}</span><span>${item.title}</span>`;
    btn.className = i===aboutIndex ? 'active' : '';
    btn.addEventListener('click', ()=>{aboutIndex=i; renderAbout();});
    nav.appendChild(btn);
  });
}

function renderAbout(){
  buildAboutNav();
  const item = aboutData[aboutIndex];
  const cont = $('#aboutContent');
  cont.innerHTML = `<h3>${item.title}</h3><p>${item.intro}</p><div class="token-list">${item.items.map(([name, icon])=>`<span class="token"><span>${icon}</span><span>${name}</span></span>`).join('')}</div>`;
  $('#aboutProgress').style.width = `${((aboutIndex+1)/aboutData.length)*100}%`;
}

function startAboutAuto(){
  clearInterval(aboutInt);
  aboutInt = setInterval(()=>{
    if(!aboutAuto || $('#aboutBackdrop').classList.contains('hidden')) return;
    aboutIndex = (aboutIndex + 1) % aboutData.length;
    renderAbout();
  }, 12000);
}


function createAmbientDecor(){
  const seeders = [
    {section: 'landing', stars: '#landing .stars', floats: '#landing .floating-shapes', starCount: 42, floatCount: 20},
    {section: 'interior', stars: '#interior .stars', floats: '#interior .floating-shapes', starCount: 62, floatCount: 30}
  ];
  const glyphs = ['♫','♪','✦','✧','♡','♩','❋','✩','⋆'];

  seeders.forEach(cfg => {
    document.querySelectorAll(cfg.stars).forEach((wrap, wrapIndex) => {
      wrap.querySelectorAll('.ambient-star').forEach(n => n.remove());
      const frag = document.createDocumentFragment();
      for(let i=0;i<cfg.starCount;i++){
        const s = document.createElement('span');
        s.className = 'ambient-star' + ((i + wrapIndex) % 3 === 0 ? ' is-pink' : '');
        const isInterior = cfg.section === 'interior';
        const size = (Math.random() * (isInterior ? 4.6 : 3.8) + (isInterior ? 1.6 : 1.2)).toFixed(2) + 'px';
        s.style.setProperty('--x', `${(Math.random()*100).toFixed(2)}%`);
        s.style.setProperty('--y', `${(Math.random()*100).toFixed(2)}%`);
        s.style.setProperty('--s', size);
        s.style.setProperty('--o', (Math.random()*(isInterior ? 0.40 : 0.34) + (isInterior ? 0.58 : 0.48)).toFixed(2));
        s.style.setProperty('--dur', `${(Math.random()*5 + (isInterior ? 3.6 : 4.5)).toFixed(2)}s`);
        s.style.setProperty('--delay', `${(Math.random()*-10).toFixed(2)}s`);
        frag.appendChild(s);
      }
      wrap.appendChild(frag);
    });

    document.querySelectorAll(cfg.floats).forEach((wrap, wrapIndex) => {
      wrap.querySelectorAll('.ambient-float').forEach(n => n.remove());
      const frag = document.createDocumentFragment();
      const isInterior = cfg.section === 'interior';
      for(let i=0;i<cfg.floatCount;i++){
        const f = document.createElement('span');
        const glyph = glyphs[(i + wrapIndex) % glyphs.length];
        f.textContent = glyph;
        f.className = 'ambient-float' + (glyph.includes('♫') || glyph.includes('♪') || glyph.includes('♩') ? ' is-note' : '');

        let x;
        if(isInterior){
          if(i < Math.ceil(cfg.floatCount * 0.38)){
            x = 1 + Math.random()*16;
          }else if(i < Math.ceil(cfg.floatCount * 0.76)){
            x = 82 + Math.random()*16;
          }else{
            x = 24 + Math.random()*52;
          }
        }else{
          if(i < Math.ceil(cfg.floatCount * 0.35)){
            x = 2 + Math.random()*18;
          }else if(i < Math.ceil(cfg.floatCount * 0.7)){
            x = 80 + Math.random()*18;
          }else{
            x = 18 + Math.random()*64;
          }
        }

        const y = isInterior ? (2 + Math.random()*94) : (4 + Math.random()*90);
        const size = isInterior ? (Math.random()*34 + 20) : (Math.random()*26 + 16);
        const op = isInterior ? (Math.random()*0.22 + 0.56) : (Math.random()*0.24 + 0.42);
        const dx = isInterior ? (Math.random()*110 - 55) : (Math.random()*72 - 36);
        const dy = isInterior ? (Math.random()*-100 - 18) : (Math.random()*-58 - 12);

        f.style.setProperty('--x', `${x.toFixed(2)}%`);
        f.style.setProperty('--y', `${y.toFixed(2)}%`);
        f.style.setProperty('--size', `${size.toFixed(2)}px`);
        f.style.setProperty('--o', op.toFixed(2));
        f.style.setProperty('--dur', `${(Math.random()*(isInterior ? 6 : 8) + (isInterior ? 9 : 10)).toFixed(2)}s`);
        f.style.setProperty('--delay', `${(Math.random()*-18).toFixed(2)}s`);
        f.style.setProperty('--dx', `${dx.toFixed(2)}px`);
        f.style.setProperty('--dy', `${dy.toFixed(2)}px`);
        f.style.setProperty('--rot', `${(Math.random()*44 - 22).toFixed(2)}deg`);
        f.style.setProperty('--color', isInterior
          ? (i % 4 === 0 ? 'rgba(255,160,229,.66)' : i % 4 === 1 ? 'rgba(255,118,214,.54)' : i % 4 === 2 ? 'rgba(255,188,239,.58)' : 'rgba(255,96,204,.52)')
          : (i % 4 === 0 ? 'rgba(255,160,228,.52)' : i % 4 === 1 ? 'rgba(255,116,214,.42)' : i % 4 === 2 ? 'rgba(255,184,237,.44)' : 'rgba(255,92,203,.38)'));
        frag.appendChild(f);
      }
      wrap.appendChild(frag);
    });
  });
}

function toggleEffects(){
  effectsOn = !effectsOn;
  document.body.classList.toggle('effects-paused', !effectsOn);
  $$('[data-effects-label]').forEach(el => el.textContent = effectsOn ? 'Pausar efectos' : 'Activar efectos');
}

function initCursor(){
  document.addEventListener('mousemove', e=>{
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }, {passive:true});
}

function goInterior(){
  landing.classList.add('hidden');
  interior.classList.remove('hidden');
  fitInteriorUI();
  requestAnimationFrame(()=>{ fitInteriorUI(); interior.classList.add('reveal'); });
  if(audio.paused) audio.play().then(()=>updatePlayState(true)).catch(()=>{});
}
function goHome(){
  interior.classList.add('hidden');
  landing.classList.remove('hidden');
  interior.classList.remove('reveal');
}

$('#enterBtn').addEventListener('click', goInterior);
$('#homeBtn').addEventListener('click', goHome);
$('#playBtn').addEventListener('click', togglePlay);
$('#prevTrack').addEventListener('click', ()=>setTrack(currentTrack-1, true));
$('#nextTrack').addEventListener('click', ()=>setTrack(currentTrack+1, true));
$('#seek').addEventListener('input', e=>{ if(audio.duration){ audio.currentTime = audio.duration * (e.target.value / 100); updateNeedlePosition(); } });
$('#volume').addEventListener('input', e=>{ audio.volume = e.target.value/100; $('#volumeOut').textContent = `${e.target.value}%`; });
$('#scenePrev').addEventListener('click', ()=>setScene(currentScene-1));
$('#sceneNext').addEventListener('click', ()=>setScene(currentScene+1));
$('#sceneAuto').addEventListener('click', e=>{ sceneAuto=!sceneAuto; e.currentTarget.classList.toggle('on', sceneAuto); e.currentTarget.setAttribute('aria-pressed', String(sceneAuto)); });
$('#msgPrev').addEventListener('click', ()=>setMessage(currentMsg-1));
$('#msgNext').addEventListener('click', ()=>setMessage(currentMsg+1));
$('#openAbout').addEventListener('click', ()=>{ $('#aboutBackdrop').classList.remove('hidden'); renderAbout(); });
$('#closeAbout').addEventListener('click', ()=> $('#aboutBackdrop').classList.add('hidden'));
$('#aboutPrev').addEventListener('click', ()=>{ aboutIndex=(aboutIndex-1+aboutData.length)%aboutData.length; renderAbout(); });
$('#aboutNext').addEventListener('click', ()=>{ aboutIndex=(aboutIndex+1)%aboutData.length; renderAbout(); });
$('#aboutAuto').addEventListener('click', e=>{ aboutAuto=!aboutAuto; e.currentTarget.setAttribute('aria-pressed', String(aboutAuto)); e.currentTarget.classList.toggle('active', aboutAuto); });
effectsToggles.forEach(btn=>btn.addEventListener('click', toggleEffects));

audio.addEventListener('ended', ()=>setTrack(currentTrack+1, true));
audio.addEventListener('play', ()=>updatePlayState(true));
audio.addEventListener('pause', ()=>updatePlayState(false));
audio.addEventListener('timeupdate', updateSeek);
audio.addEventListener('loadedmetadata', updateSeek);

window.addEventListener('resize', fitInteriorUI, {passive:true});
if(window.visualViewport) window.visualViewport.addEventListener('resize', fitInteriorUI, {passive:true});
fitInteriorUI();

initVinylMotion();
parkNeedle();
buildEq();
setTrack(0, false);
setScene(0); buildSceneDots(); startSceneTimer();
setMessage(0); updateVisitCounter(); buildAboutNav(); renderAbout(); startAboutAuto(); initCursor();
audio.volume = .72;
createAmbientDecor();
