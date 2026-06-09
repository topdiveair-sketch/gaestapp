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
  short: `🌿 Pia empfiehlt: Kleine Abendrunde ab Zuhause am Bach.

Gut für: Anreise, müde Beine, Kinder, kurze Frischluft.
Vorher prüfen: Wetter und Licht.
Tipp: Donau/Bach/Ort ruhig erkunden und nicht zu spät losgehen.`,
  medium: `🥾 Pia empfiehlt: Aggsbach Markt Richtung Maria Langegg / Jauerling-Umfeld.

Gut für: 3–4 Stunden Natur, Wald und Aussicht.
Vorher prüfen: Route, Wetter, Wasser und Rückweg.
Tipp: Nicht unterschätzen – die Wachau kann in den Beinen deutlich werden.`,
  day: `⛰️ Pia empfiehlt: Welterbesteig-Etappe.

Gut für: geübte Wanderer mit Tagesplanung.
Vorher prüfen: offizielle Route, Wetter, Öffis, Fähren und genug Wasser.
Tipp: Früh starten. Die Donau wartet nicht, aber die Müdigkeit kommt sicher.`,
  kids: `🎒 Pia empfiehlt: Kurze Entdeckerrunde.

Aufgabe: Findet Donau, Blume, Stein, Marillenbaum und einen schönen Fotopunkt.
Gut für: Kinder, Familien und alle, die lieber staunen als hetzen.`,
  dog: `🐕 Pia empfiehlt: Schatten, Wasser, Pausen.

Vorher prüfen: Hitze, Asphalt, Zecken, Leinenpflicht und Trinkwasser.
Tipp: Für Hunde ist die schönste Tour nicht die längste, sondern die kühlste.`
};

document.querySelectorAll('.tourchoice').forEach(btn => {
  btn.addEventListener('click', () => {
    const box = document.getElementById('tourResult');
    if (box) box.textContent = tourTexts[btn.dataset.tour] || 'Keine Empfehlung gefunden.';
  });
});

const bikeTexts = {
  melk: `🏛️ Richtung Melk

Grob geeignet für: Kultur, Bahnhof, Stift Melk, feste Donauquerung.
Vorher prüfen: Radroute, Wetter, Verkehr und Rückfahrt.
Tipp: Ideal, wenn Fähren unsicher sind.`,
  spitz: `🍇 Richtung Spitz

Grob geeignet für: Genussradler, Weinorte, Donau und Fähre Spitz–Arnsdorf.
Vorher prüfen: Fähre und Rückfahrt.
Tipp: Sehr schöne Wachau-Stimmung, viele Fotopausen einplanen.`,
  duernstein: `🏰 Richtung Dürnstein

Grob geeignet für: Wachau-Klassiker, Altstadt, Ruine, Fotos.
Vorher prüfen: Strecke, Hitze, Betrieb der Fähren und Rückfahrt.
Tipp: Früh fahren, Dürnstein kann voll werden.`,
  krems: `🏙️ Richtung Krems

Grob geeignet für: längere Radtour, Stadt, Bahnhof, Altstadt.
Vorher prüfen: Kondition, Windrichtung und Rücktransport.
Tipp: Für Rückfahrt Öffis oder Abholung vorher klären.`
};

document.querySelectorAll('.bikechoice').forEach(btn => {
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
