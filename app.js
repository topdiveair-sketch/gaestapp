const phone = '+436646437526';
function smsHref(text){
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sep = isIOS ? '&' : '?';
  return `sms:${phone}${sep}body=${encodeURIComponent(text)}`;
}

function whatsappHref(text){
  return `https://wa.me/${phone.replace('+','')}?text=${encodeURIComponent(text)}`;
}

function sendWhatsAppWithLocation(kind){
  const fallbackMap = 'bitte Standort am Handy teilen oder Ort hier einfügen';
  function buildText(mapLink){
    if (kind === 'lost') {
      return `Hallo Hans,

wir haben uns verlaufen und benötigen Hilfe.

Unser aktueller Standort:
${mapLink}

Anzahl Personen:
_____

Vielen Dank.`;
    }
    if (kind === 'luggage') {
      return `Hallo Hans,

bitte Gepäck an folgenden Standort liefern:
${mapLink}

Name:
_____
Anzahl Gepäckstücke:
_____

Vielen Dank.`;
    }
    return `Hallo Hans,

hier ist mein aktueller Standort:
${mapLink}

Viele Grüße`;
  }
  const openWa = (mapLink) => { window.location.href = whatsappHref(buildText(mapLink)); };
  if (!navigator.geolocation) {
    openWa(fallbackMap);
    return;
  }
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude.toFixed(6);
    const lon = pos.coords.longitude.toFixed(6);
    openWa(`https://maps.google.com/?q=${lat},${lon}`);
  }, () => {
    openWa(fallbackMap);
  }, {enableHighAccuracy:true, timeout:10000, maximumAge:60000});
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
