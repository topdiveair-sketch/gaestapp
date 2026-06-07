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
