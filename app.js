const phone = '+436646437526';
const waPhone = '436646437526';

function smsHref(text){
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sep = isIOS ? '&' : '?';
  return `sms:${phone}${sep}body=${encodeURIComponent(text)}`;
}

function whatsappHref(text){
  // api.whatsapp.com works more reliably than wa.me on Android, iPhone and desktop/WhatsApp Web.
  return `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(text)}`;
}

function openWhatsApp(text){
  window.location.href = whatsappHref(text);
}

function buildWhatsappText(kind, mapLink){
  const locationText = mapLink || 'Bitte Standort in WhatsApp manuell teilen oder Ort/Wegweiser hier einfügen.';
  if (kind === 'lost') {
    return `Hallo Hans,

wir haben uns verlaufen und benötigen Hilfe.

Unser aktueller Standort:
${locationText}

Anzahl Personen:
_____

Vielen Dank.`;
  }
  if (kind === 'luggage') {
    return `Hallo Hans,

bitte Gepäck an folgenden Standort liefern:
${locationText}

Name:
_____
Anzahl Gepäckstücke:
_____

Vielen Dank.`;
  }
  return `Hallo Hans,

hier ist mein aktueller Standort:
${locationText}

Viele Grüße`;
}

function sendWhatsAppWithLocation(kind){
  // GPS funktioniert im Browser nur zuverlässig über HTTPS oder localhost. Beim direkten Öffnen der index.html
  // vom Handy/PC kann der Browser den Standort blockieren. Dann wird WhatsApp trotzdem mit Hinweis geöffnet.
  const fallback = buildWhatsappText(kind, null);

  if (!navigator.geolocation) {
    openWhatsApp(fallback);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(6);
      const lon = pos.coords.longitude.toFixed(6);
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      openWhatsApp(buildWhatsappText(kind, mapLink));
    },
    () => {
      openWhatsApp(fallback);
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
  );
}

function bindWhatsAppLocationButtons(){
  const pairs = [
    ['waLocation','location'], ['waLocationCard','location'], ['waLocationContact','location'],
    ['waLost','lost'], ['waLostCard','lost'],
    ['waLuggageHere','luggage'], ['waLuggageHereCard','luggage']
  ];
  pairs.forEach(([id, kind]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => sendWhatsAppWithLocation(kind));
  });
}

const form = document.getElementById('smsForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const personen = document.getElementById('personen').value;
    const checked = [...form.querySelectorAll('input[type="checkbox"]:checked')].map(i => i.value);
    const wunsch = document.getElementById('wunsch').value.trim();
    let text = `Hallo Hans und Laura,\n\nwir möchten Frühstück für ${personen} Person(en) bestellen.\n\nGewünscht: ${checked.join(', ') || 'bitte nach Absprache'}.`;
    if (wunsch) text += `\n\nZusatzwunsch/Uhrzeit: ${wunsch}`;
    text += `\n\nLiebe Grüße`;
    window.location.href = smsHref(text);
  });
}

const dinnerForm = document.getElementById('dinnerForm');
if (dinnerForm) {
  dinnerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const personen = document.getElementById('abendPersonen').value;
    const checked = [...dinnerForm.querySelectorAll('input[type="checkbox"]:checked')].map(i => i.value);
    const wunsch = document.getElementById('abendWunsch').value.trim();
    let text = `Hallo Hans und Laura,\n\nwir möchten ein regionales Abendessen bei Zuhause am Bach für ${personen} Person(en) vorbestellen.\n\nGewünscht: ${checked.join(', ') || 'bitte nach Absprache'}.`;
    if (wunsch) text += `\n\nWunsch/Uhrzeit/Besonderheiten: ${wunsch}`;
    text += `\n\nLiebe Grüße`;
    window.location.href = smsHref(text);
  });
}

const luggageForm = document.getElementById('luggageForm');
if (luggageForm) {
  luggageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const von = document.getElementById('gepaeckVon').value.trim();
    const vonAdresse = document.getElementById('gepaeckVonAdresse').value.trim();
    const nach = document.getElementById('gepaeckNach').value.trim();
    const nachAdresse = document.getElementById('gepaeckNachAdresse').value.trim();
    const zeit = document.getElementById('gepaeckZeit').value.trim();
    const anzahl = document.getElementById('gepaeckAnzahl').value;
    const name = document.getElementById('gepaeckName').value.trim();
    let text = `Hallo Hans und Laura,\n\nich möchte Gepäcktransport buchen.\n\nVon / Abholort: ${von || 'bitte eintragen'}\nAbholadresse: ${vonAdresse || 'bitte eintragen'}\n\nNach / Zielort: ${nach || 'bitte eintragen'}\nZieladresse: ${nachAdresse || 'bitte eintragen'}\n\nGewünschte Zeit: ${zeit || 'bitte eintragen'}\nAnzahl Gepäckstücke: ${anzahl}\nName/Telefon: ${name || 'bitte eintragen'}\n\nPreis laut App: 15 € pro Zimmer und Etappe.\n\nLiebe Grüße`;
    window.location.href = smsHref(text);
  });
}

bindWhatsAppLocationButtons();


// V6.1 Live-Wetter über Open-Meteo, ohne API-Key
function weatherCodeText(code){
  const map = {
    0:'Klar',1:'Überwiegend klar',2:'Teilweise bewölkt',3:'Bewölkt',
    45:'Nebel',48:'Reifnebel',51:'Leichter Nieselregen',53:'Nieselregen',55:'Starker Nieselregen',
    61:'Leichter Regen',63:'Regen',65:'Starker Regen',71:'Leichter Schnee',73:'Schnee',75:'Starker Schnee',
    80:'Leichte Schauer',81:'Schauer',82:'Starke Schauer',95:'Gewitter',96:'Gewitter mit Hagel',99:'Starkes Gewitter mit Hagel'
  };
  return map[code] || 'Wetterlage';
}

function renderWeather(data){
  const current = data.current || {};
  const daily = data.daily || {};
  const temp = current.temperature_2m;
  const wind = current.wind_speed_10m;
  const rain = current.rain ?? 0;
  const code = current.weather_code;
  const max = daily.temperature_2m_max?.[0];
  const min = daily.temperature_2m_min?.[0];
  const precip = daily.precipitation_sum?.[0];

  const status = document.getElementById('weatherStatus');
  const grid = document.getElementById('weatherGrid');
  if (!status || !grid) return;

  status.textContent = `Aktuell: ${weatherCodeText(code)}. Stand: ${current.time ? current.time.replace('T',' ') : 'jetzt'}`;
  grid.innerHTML = `
    <div class="weatheritem"><b>Temperatur</b><span>${temp ?? '–'} °C</span></div>
    <div class="weatheritem"><b>Wind</b><span>${wind ?? '–'} km/h</span></div>
    <div class="weatheritem"><b>Regen jetzt</b><span>${rain ?? '–'} mm</span></div>
    <div class="weatheritem"><b>Heute</b><span>${min ?? '–'} / ${max ?? '–'} °C</span></div>
    <div class="weatheritem"><b>Regen gesamt</b><span>${precip ?? '–'} mm</span></div>
    <div class="weatheritem"><b>Warnlogik</b><span>${(precip || 0) > 5 ? 'Regenjacke' : 'normal prüfen'}</span></div>
  `;
}

function loadWeather(){
  const status = document.getElementById('weatherStatus');
  if (status) status.textContent = 'Wetter wird geladen …';
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=48.2937&longitude=15.3960&current=temperature_2m,rain,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FVienna&forecast_days=1';
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error('Wetterdienst nicht erreichbar');
      return r.json();
    })
    .then(renderWeather)
    .catch(() => {
      const status = document.getElementById('weatherStatus');
      if (status) status.textContent = 'Live-Wetter konnte nicht geladen werden. Bitte Wetter-Link öffnen oder später neu laden.';
    });
}

const reloadWeather = document.getElementById('reloadWeather');
if (reloadWeather) reloadWeather.addEventListener('click', loadWeather);
loadWeather();



// V6.2 Browser-Selbsttest
function runSelfTest(){
  const checks = [
    ['Frühstück Express Button', !!document.getElementById('waBreakfastExpress')],
    ['Wetterbereich', !!document.getElementById('weatherLive')],
    ['Wanderassistent', document.querySelectorAll('.tourchoice').length >= 5],
    ['Radassistent', document.querySelectorAll('.bikechoice').length >= 4],
    ['Notfall/Standort Buttons', !!document.getElementById('waLocationCard')],
    ['Gepäckformular', !!document.getElementById('luggageForm')],
    ['Bewertungsbereich', !!document.getElementById('bewertung')],
    ['Windis-Kinderbereich', !!document.getElementById('kinderbereich')],
    ['Service Worker Unterstützung', 'serviceWorker' in navigator],
    ['Fetch Unterstützung für Live-Wetter', 'fetch' in window]
  ];
  const failed = checks.filter(c => !c[1]);
  const box = document.getElementById('selfTestResult');
  if (!box) return;
  box.classList.remove('ok','fail');
  box.classList.add(failed.length ? 'fail' : 'ok');
  box.textContent = failed.length
    ? 'Fehler gefunden:\n' + failed.map(f => '• ' + f[0]).join('\n')
    : 'Alles Wesentliche geladen:\n' + checks.map(c => '✓ ' + c[0]).join('\n');
}

const selfTestBtn = document.getElementById('runSelfTest');
if (selfTestBtn) selfTestBtn.addEventListener('click', runSelfTest);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
}


// V6.0 Interaktive Assistenten
const v6State = {
  breakfastType: 'Standard-Frühstück',
  breakfastTime: '08:00 Uhr',
  breakfastPeople: '2 Personen'
};

document.querySelectorAll('.choice').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    v6State[group] = btn.dataset.value;
    document.querySelectorAll(`.choice[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const breakfastBtn = document.getElementById('waBreakfastExpress');
if (breakfastBtn) {
  breakfastBtn.addEventListener('click', () => {
    const text = `Hallo Hans und Laura,

wir möchten für morgen Frühstück bestellen.

Art: ${v6State.breakfastType}
Zeit: ${v6State.breakfastTime}
Personen: ${v6State.breakfastPeople}

Besondere Wünsche:
_____

Liebe Grüße`;
    openWhatsApp(text);
  });
}

const tourTexts = {
  short: `🌿 Kleine Runde ab Zuhause am Bach

Empfehlung:
• Bach und Ort erkunden
• Donauufer / ruhige Abendrunde
• ideal nach Anreise oder bei wenig Zeit

Dauer: ca. 30–90 Minuten je nach Variante.
Mitnehmen: Handy, Licht bei Dämmerung, etwas Wasser.
Pias Kommentar: Kurz heißt nicht langweilig. Kurz heißt: rechtzeitig wieder da.`,

  medium: `🥾 Halbtageswanderung rund um Aggsbach Markt

Empfehlung:
• Richtung Maria Langegg / Jauerling-Umfeld
• Wald, Aussicht, Wachau-Gefühl
• nur bei passendem Wetter und gutem Schuhwerk

Dauer: grob 3–4 Stunden je nach Route.
Vorher prüfen: Wetter, Rückweg, Wasser.
Wichtig: Nicht blind los. Die Wachau schaut lieb aus, hat aber Höhenmeter.`,

  day: `⛰️ Welterbesteig-Etappe Aggsbach Markt → Emmersdorf

Offizielle Eckdaten:
• ca. 14,74 km
• ca. 5:00 h
• Schwierigkeit: mittel
• ca. 547 hm Aufstieg / 544 hm Abstieg
• Start: Aggsbach Markt, Marktplatz
• Ziel: Emmersdorf, Marktstraße

Vorher prüfen: Wetter, Wasser, Rückweg, Wachaubahn/Bus/Fähren.
Pias Kommentar: Wer groß geht, soll klug starten.`,

  kids: `🎒 Kinderfreundliche Entdeckerrunde

Aufgabe:
• Findet die Donau
• Findet eine Blume
• Findet einen Marillenbaum
• Findet einen schönen Stein
• Macht ein Windis-Foto

Dauer: 30–60 Minuten.
Ziel: Freude statt Gewaltmarsch.`,

  dog: `🐕 Mit Hund unterwegs

Empfehlung:
• kurze kühle Strecken
• Schatten und Wasser planen
• heißen Asphalt vermeiden
• Leine und Rücksicht selbstverständlich

Wichtig: Bei Hitze lieber Abendrunde statt Tagesmarsch.
Pia sagt: Ein Hund braucht keinen Rekord. Er braucht Wasser.`
};

document.querySelectorAll('.tourchoice')document.querySelectorAll('.tourchoice').forEach(btn => {
  btn.addEventListener('click', () => {
    const box = document.getElementById('tourResult');
    if (box) box.textContent = tourTexts[btn.dataset.tour] || 'Keine Empfehlung gefunden.';
  });
});

const bikeTexts = {
  melk: `🏛️ Richtung Melk

Gut für:
• Stift Melk
• Bahnhof Melk
• feste Donauquerung über die Brücke
• Rückfahrt/Weiterreise

Tipp: Wenn Fähren unsicher sind, ist Melk oft die solidere Planung.`,

  spitz: `🍇 Richtung Spitz

Gut für:
• Weinorte
• Donaupanorama
• Fähre Spitz–Arnsdorf
• Genussradeln

Vorher prüfen: Fährbetrieb und Rückweg.
Tipp: Fotopausen einplanen. Die Wachau drängelt nicht.`,

  duernstein: `🏰 Richtung Dürnstein

Gut für:
• Klassiker der Wachau
• Altstadt und Ruine
• starke Fotos

Vorher prüfen: Hitze, Verkehr, Rückfahrt.
Tipp: Früh losfahren. Dürnstein ist schön, aber selten menschenleer.`,

  krems: `🏙️ Richtung Krems

Gut für:
• längere Radtour
• Bahnhof
• Altstadt
• Rückreise mit Öffis

Vorher prüfen: Kondition, Windrichtung, Bahn/Bus.
Tipp: Bei Gegenwind wird aus Romantik schnell Arbeit.`
};

document.querySelectorAll('.bikechoice')document.querySelectorAll('.bikechoice').forEach(btn => {
  btn.addEventListener('click', () => {
    const box = document.getElementById('bikeResult');
    if (box) box.textContent = bikeTexts[btn.dataset.bike] || 'Kein Ziel gefunden.';
  });
});

const quiz = [
  'Frage: Wofür ist die Wachau besonders bekannt? Antwort: Marillen, Wein, Donau und schöne Wege.',
  'Frage: Wer trägt bei den Windis ein rotes Halstuch? Antwort: Pia.',
  'Frage: Was sollte man vor einer Wanderung prüfen? Antwort: Wetter, Wasser, Route und Rückweg.',
  'Frage: Welcher Fluss prägt die Wachau? Antwort: Die Donau.'
];
const quizBtn = document.getElementById('quizBtn');
if (quizBtn) {
  quizBtn.addEventListener('click', () => {
    const box = document.getElementById('quizText');
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    if (box) box.textContent = item;
  });
}



// V7.1 robuste Funktions-Fixes
function setBox(id, text){
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
document.querySelectorAll('.js-tour').forEach(btn => {
  btn.addEventListener('click', () => setBox('fixedTourResult', btn.dataset.result || 'Keine Empfehlung hinterlegt.'));
});
document.querySelectorAll('.js-bike').forEach(btn => {
  btn.addEventListener('click', () => setBox('fixedBikeResult', btn.dataset.result || 'Kein Ziel hinterlegt.'));
});
document.querySelectorAll('.js-kid').forEach(btn => {
  btn.addEventListener('click', () => setBox('fixedKidResult', btn.dataset.result || 'Keine Aufgabe hinterlegt.'));
});
const fixedWeatherAdvice = document.getElementById('fixedWeatherAdvice');
if (fixedWeatherAdvice) {
  fixedWeatherAdvice.addEventListener('click', () => {
    setBox('fixedWeatherResult',
      'Wetter-Regel für Gäste:\n\n' +
      '☀️ trocken: Welterbesteig oder Donauradweg möglich.\n' +
      '🌦️ wechselhaft: kleine Runde, Wachaubahn, Spitz oder Melk planen.\n' +
      '🌧️ Regen: Stift Melk, Kartause Aggsbach, Museum, Heuriger oder Donauschlössel Spitz.\n' +
      '⛈️ Gewitter: keine Wald-/Höhenwege, zuerst Sicherheit.'
    );
  });
}
