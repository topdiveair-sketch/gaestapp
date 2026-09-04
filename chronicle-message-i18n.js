(function(){
"use strict";

const M={
  de:{intro:"Keine Bewertungen und keine Sterne: Hier zählen Ihre persönlichen Geschichten, Erlebnisse unterwegs und besonderen Momente mit den Wilden Wachauer Windis.",title:"Willkommen in der Windi-Chronik",body:"Hier sammeln wir bewusst keine Bewertungen und keine Sterne. Uns sind Ihre persönlichen Geschichten und Erlebnisse viel wichtiger: die Geschichten, die Sie von Ihrem Weg mitbringen, besondere Entdeckungen unterwegs und schöne Momente bei uns mit den Wilden Wachauer Windis. Erzählen Sie uns, was Ihnen besonders gefallen hat – damit Ihre Wachau-Erinnerung lebendig bleibt.",admin:"Sicheren Anmeldelink per E-Mail senden",empty:"Noch keine veröffentlichten Beiträge."},
  en:{intro:"No ratings and no stars: what matters here are your personal stories, experiences along the way and special moments with the Wild Wachau Windis.",title:"Welcome to the Windi Chronicle",body:"We deliberately do not collect ratings or stars here. Your personal stories and experiences matter much more to us: stories you bring back from your journey, special discoveries along the way and happy moments with the Wild Wachau Windis. Tell us what you especially enjoyed – so your Wachau memory stays alive.",admin:"Send secure sign-in link by email",empty:"No published stories yet."},
  cz:{intro:"Žádná hodnocení ani hvězdičky: důležité jsou vaše osobní příběhy, zážitky z cesty a výjimečné chvíle s Wilden Wachauer Windis.",title:"Vítejte ve Windi kronice",body:"Záměrně zde nesbíráme hodnocení ani hvězdičky. Mnohem důležitější jsou pro nás vaše osobní příběhy a zážitky: co si přinášíte z cesty, co jste objevili a jaké krásné chvíle jste prožili s Wilden Wachauer Windis. Napište nám, co se vám obzvlášť líbilo – ať vaše vzpomínka na Wachau zůstane živá.",admin:"Odeslat bezpečný přihlašovací odkaz e-mailem",empty:"Zatím nejsou zveřejněny žádné příspěvky."},
  sk:{intro:"Žiadne hodnotenia ani hviezdičky: dôležité sú vaše osobné príbehy, zážitky z cesty a výnimočné chvíle s Wilden Wachauer Windis.",title:"Vitajte vo Windi kronike",body:"Zámerne tu nezbierame hodnotenia ani hviezdičky. Oveľa dôležitejšie sú pre nás vaše osobné príbehy a zážitky: čo si prinášate z cesty, čo ste objavili a aké pekné chvíle ste zažili s Wilden Wachauer Windis. Napíšte nám, čo sa vám páčilo najviac – aby vaša spomienka na Wachau zostala živá.",admin:"Odoslať bezpečný prihlasovací odkaz e-mailom",empty:"Zatiaľ nie sú zverejnené žiadne príspevky."},
  hu:{intro:"Nincsenek értékelések és csillagok: itt az Ön személyes történetei, útközbeni élményei és a Wilden Wachauer Windikkel átélt különleges pillanatai számítanak.",title:"Üdvözöljük a Windi-krónikában",body:"Itt tudatosan nem gyűjtünk értékeléseket vagy csillagokat. Sokkal fontosabbak számunkra az Ön személyes történetei és élményei: amit az útról magával hoz, különleges felfedezései és a Wilden Wachauer Windikkel átélt szép pillanatok. Mesélje el, mi tetszett különösen – hogy wachaui emléke sokáig éljen.",admin:"Biztonságos bejelentkezési link küldése e-mailben",empty:"Még nincsenek közzétett bejegyzések."},
  es:{intro:"Sin valoraciones ni estrellas: aquí importan sus historias personales, sus experiencias durante el camino y sus momentos especiales con los Wilden Wachauer Windis.",title:"Bienvenido a la Crónica Windi",body:"Aquí no recopilamos deliberadamente valoraciones ni estrellas. Sus historias y experiencias personales son mucho más importantes para nosotros: lo que trae de su viaje, los descubrimientos especiales y los bonitos momentos con los Wilden Wachauer Windis. Cuéntenos qué le gustó especialmente, para mantener vivo su recuerdo de Wachau.",admin:"Enviar enlace seguro de acceso por correo",empty:"Todavía no hay historias publicadas."},
  fr:{intro:"Pas d’évaluations ni d’étoiles : ici comptent vos histoires personnelles, vos expériences en chemin et vos moments particuliers avec les Wilden Wachauer Windis.",title:"Bienvenue dans la Chronique Windi",body:"Nous ne recueillons volontairement ni évaluations ni étoiles. Vos histoires et expériences personnelles comptent bien davantage : ce que vous rapportez de votre chemin, vos découvertes et les beaux moments vécus avec les Wilden Wachauer Windis. Racontez-nous ce qui vous a particulièrement plu, afin que votre souvenir de la Wachau reste vivant.",admin:"Envoyer un lien de connexion sécurisé par e-mail",empty:"Aucune histoire publiée pour le moment."}
};

const D={
  de:["📖 Zum Lesen ausklappen","veröffentlichte Beiträge"],
  en:["📖 Open to read","published stories"],
  cz:["📖 Rozbalit a číst","zveřejněných příspěvků"],
  sk:["📖 Rozbaliť a čítať","zverejnených príspevkov"],
  hu:["📖 Megnyitás olvasáshoz","közzétett bejegyzés"],
  es:["📖 Abrir para leer","historias publicadas"],
  fr:["📖 Ouvrir pour lire","histoires publiées"]
};

const LOCALE={de:"de-AT",en:"en-GB",cz:"cs-CZ",sk:"sk-SK",hu:"hu-HU",es:"es-ES",fr:"fr-FR"};
const OG_LOCALE={de:"de_AT",en:"en_GB",cz:"cs_CZ",sk:"sk_SK",hu:"hu_HU",es:"es_ES",fr:"fr_FR"};

const META={
  en:{title:"Zuhause am Bach – Home of Die Wilden Wachauer Windis",description:"Stay where stories are born at Zuhause am Bach in the Wachau: personal accommodation for families, hikers and cyclists, with direct booking."},
  cz:{title:"Zuhause am Bach – domov Die Wilden Wachauer Windis",description:"Ubytujte se tam, kde vznikají příběhy: Zuhause am Bach ve Wachau pro rodiny, pěší turisty a cyklisty, s možností přímé rezervace."},
  sk:{title:"Zuhause am Bach – domov Die Wilden Wachauer Windis",description:"Ubytujte sa tam, kde vznikajú príbehy: Zuhause am Bach vo Wachau pre rodiny, turistov a cyklistov, s možnosťou priamej rezervácie."},
  hu:{title:"Zuhause am Bach – a Die Wilden Wachauer Windis otthona",description:"Szálljon meg ott, ahol történetek születnek: Zuhause am Bach a Wachauban családoknak, túrázóknak és kerékpárosoknak, közvetlen foglalással."},
  es:{title:"Zuhause am Bach – hogar de Die Wilden Wachauer Windis",description:"Alójese donde nacen historias: Zuhause am Bach en Wachau para familias, senderistas y ciclistas, con reserva directa."},
  fr:{title:"Zuhause am Bach – la maison de Die Wilden Wachauer Windis",description:"Séjournez là où naissent les histoires : Zuhause am Bach dans la Wachau pour familles, randonneurs et cyclistes, avec réservation directe."}
};

const STATIC={
  en:{
    "Zuhause der Wilden Wachauer Windis":"Home of Die Wilden Wachauer Windis",
    "Übernachten, wo Geschichten entstehen":"Stay where stories are born",
    "Ein persönlicher Rückzugsort für Familien, Wanderer und Radfahrer – und das echte Zuhause von Fidel, Gloria und Pia.":"A personal retreat for families, hikers and cyclists – and the real home of Fidel, Gloria and Pia.",
    "Jetzt direkt buchen":"Book direct now",
    "Windis-Bücher entdecken":"Discover the Windis books",
    "Wenige Gäste":"Few guests",
    "Persönliche Gastgeber":"Personal hosts",
    "Besonderer Ort":"A special place",
    "🧭 Wachau-Route planen":"🧭 Plan a Wachau route",
    "📖 Windi-Chronik":"📖 Windi Chronicle",
    "🐾 Die Wachau erleben – mit den Windis":"🐾 Experience the Wachau with the Windis",
    "Hier verbindet sich die Kinderbuchwelt mit einem echten Ort: Fidel begleitet Wanderer, Gloria zeigt die genussvolle Wachau und Pia macht den Aufenthalt für Kinder zum Abenteuer. Die Windi-Chronik wird zur persönlichen Erinnerung für unsere Hausgäste.":"Here the children’s-book world meets a real place: Fidel accompanies hikers, Gloria shows the culinary side of the Wachau, and Pia turns the stay into an adventure for children. The Windi Chronicle becomes a personal keepsake for our house guests.",
    "Unsere Wanderung über den Welterbesteig":"Our hike on the World Heritage Trail",
    "Heute sind wir von Maria Laach nach Aggsbach Markt gewandert …":"Today we hiked from Maria Laach to Aggsbach Markt …",
    "Vorname oder Familie":"First name or family",
    "Erlaubt sind JPG, PNG und WebP mit höchstens 8 MB pro Foto.":"JPG, PNG and WebP are allowed, up to 8 MB per photo.",
    "Mit dem Absenden bestätigen Sie, dass Text und Bilder von Ihnen stammen und nach Prüfung veröffentlicht werden dürfen.":"By submitting, you confirm that the text and images are yours and may be published after review.",
    "Geschützter Bereich":"Protected area",
    "Neue Beiträge":"New submissions",
    "Abmelden":"Sign out",
    "🚶 Welterbesteig":"🚶 World Heritage Trail",
    "🚴 Donauradweg":"🚴 Danube Cycle Path",
    "🍷 Heuriger":"🍷 Wine tavern",
    "🌄 Ausflug":"🌄 Excursion",
    "🍑 Marillen":"🍑 Apricots",
    "😊 Sonstiges":"😊 Other",
    "Willkommen im kostenlosen Gäste-WLAN":"Welcome to the free guest Wi-Fi",
    "Verbindung wird geprüft …":"Checking connection …",
    "Bitte kurz warten.":"Please wait a moment.",
    "Netzwerk":"Network",
    "Offenes Gäste-WLAN · kein Passwort erforderlich":"Open guest Wi-Fi · no password required",
    "Sie sind im Gäste-WLAN eingebucht":"You are connected to the guest Wi-Fi",
    "Willkommen bei Zuhause am Bach. Wetter, Wanderwelt, Radwelt und Service stehen bereit.":"Welcome to Zuhause am Bach. Weather, hiking, cycling and guest services are ready.",
    "Internetverbindung aktiv":"Internet connection active",
    "Noch keine Internetverbindung":"No internet connection yet",
    "Bitte WLAN am Handy öffnen und mit ‚Zuhause am Bach‘ verbinden. Kein Passwort erforderlich.":"Open Wi-Fi on your phone and connect to ‘Zuhause am Bach’. No password is required.",
    "Hinweis: Aus Datenschutzgründen kann ein Browser den genauen WLAN-Namen meistens nicht auslesen. Die App zeigt daher den Online-Status und eine freiwillige WLAN-Bestätigung an.":"Note: for privacy reasons, browsers usually cannot read the exact Wi-Fi network name. The app therefore shows online status and an optional Wi-Fi confirmation.",
    "🐾 Empfehlung der Wilden Wachauer Windis":"🐾 Recommendation from Die Wilden Wachauer Windis",
    "🥾 Wanderer & 🚴 Radfahrer: heute möglichst früh starten, viel Wasser mitnehmen und Mittagshitze meiden.":"🥾 Hikers & 🚴 cyclists: start as early as possible today, take plenty of water and avoid the midday heat.",
    "🥾 Wanderer & 🚴 Radfahrer: Regenjacke einpacken und Tour flexibel planen.":"🥾 Hikers & 🚴 cyclists: pack a rain jacket and keep the route flexible.",
    "🥾 Wanderer & 🚴 Radfahrer: gute Bedingungen – Wetter am Morgen nochmals prüfen.":"🥾 Hikers & 🚴 cyclists: good conditions – check the weather again in the morning.",
    "Wetter konnte nicht geladen werden.":"Weather could not be loaded.",
    "Internetverbindung prüfen.":"Check the internet connection.",
    "Stempel sammeln":"Collect stamp",
    "Stempel entfernen":"Remove stamp",
    "Hauptstation":"Main stop",
    "Wachau-Challenge wirklich zurücksetzen?":"Really reset the Wachau Challenge?",
    "Name eintragen":"Enter name",
    "Name übernehmen":"Use name",
    "Zurück zum Quiz":"Back to the quiz",
    "Zurück zur Challenge":"Back to the challenge",
    "Quiz, Schatzsuche, Geschichten und kleine Wachau-Abenteuer mit Pia":"Quiz, treasure hunt, stories and small Wachau adventures with Pia",
    "Frühstück per WhatsApp":"Breakfast via WhatsApp",
    "Jausenplatte per WhatsApp":"Snack platter via WhatsApp",
    "Gepäcktransport per WhatsApp":"Luggage transport via WhatsApp",
    "Kontakt":"Contact",
    "Windis-Webseite":"Windis website"
  },
  cz:{
    "Zuhause der Wilden Wachauer Windis":"Domov Die Wilden Wachauer Windis",
    "Übernachten, wo Geschichten entstehen":"Ubytujte se tam, kde vznikají příběhy",
    "Ein persönlicher Rückzugsort für Familien, Wanderer und Radfahrer – und das echte Zuhause von Fidel, Gloria und Pia.":"Osobní místo k odpočinku pro rodiny, pěší turisty a cyklisty – a skutečný domov Fidela, Glorie a Pii.",
    "Jetzt direkt buchen":"Rezervovat přímo",
    "Windis-Bücher entdecken":"Objevit knihy Windis",
    "Wenige Gäste":"Málo hostů",
    "Persönliche Gastgeber":"Osobní přístup hostitelů",
    "Besonderer Ort":"Výjimečné místo",
    "🧭 Wachau-Route planen":"🧭 Naplánovat trasu ve Wachau",
    "📖 Windi-Chronik":"📖 Windi kronika",
    "🐾 Die Wachau erleben – mit den Windis":"🐾 Zažijte Wachau s Windis",
    "Hier verbindet sich die Kinderbuchwelt mit einem echten Ort: Fidel begleitet Wanderer, Gloria zeigt die genussvolle Wachau und Pia macht den Aufenthalt für Kinder zum Abenteuer. Die Windi-Chronik wird zur persönlichen Erinnerung für unsere Hausgäste.":"Zde se svět dětských knih propojuje se skutečným místem: Fidel provází turisty, Gloria ukazuje gurmánskou stránku Wachau a Pia mění pobyt dětí v dobrodružství. Windi kronika se stává osobní vzpomínkou pro naše hosty.",
    "Unsere Wanderung über den Welterbesteig":"Naše túra po Welterbesteigu",
    "Heute sind wir von Maria Laach nach Aggsbach Markt gewandert …":"Dnes jsme šli z Maria Laach do Aggsbach Markt …",
    "Vorname oder Familie":"Křestní jméno nebo rodina",
    "Erlaubt sind JPG, PNG und WebP mit höchstens 8 MB pro Foto.":"Povoleny jsou JPG, PNG a WebP, maximálně 8 MB na fotografii.",
    "Mit dem Absenden bestätigen Sie, dass Text und Bilder von Ihnen stammen und nach Prüfung veröffentlicht werden dürfen.":"Odesláním potvrzujete, že text a obrázky jsou vaše a po kontrole mohou být zveřejněny.",
    "Geschützter Bereich":"Chráněná oblast",
    "Neue Beiträge":"Nové příspěvky",
    "Abmelden":"Odhlásit se",
    "🚶 Welterbesteig":"🚶 Welterbesteig",
    "🚴 Donauradweg":"🚴 Dunajská cyklostezka",
    "🍷 Heuriger":"🍷 Vinný šenk",
    "🌄 Ausflug":"🌄 Výlet",
    "🍑 Marillen":"🍑 Meruňky",
    "😊 Sonstiges":"😊 Ostatní",
    "Willkommen im kostenlosen Gäste-WLAN":"Vítejte v bezplatné Wi-Fi pro hosty",
    "Verbindung wird geprüft …":"Kontroluje se připojení …",
    "Bitte kurz warten.":"Chvíli prosím počkejte.",
    "Netzwerk":"Síť",
    "Offenes Gäste-WLAN · kein Passwort erforderlich":"Otevřená Wi-Fi pro hosty · bez hesla",
    "Sie sind im Gäste-WLAN eingebucht":"Jste připojeni k Wi-Fi pro hosty",
    "Willkommen bei Zuhause am Bach. Wetter, Wanderwelt, Radwelt und Service stehen bereit.":"Vítejte v Zuhause am Bach. Počasí, turistika, cyklistika a služby jsou připraveny.",
    "Internetverbindung aktiv":"Internetové připojení je aktivní",
    "Noch keine Internetverbindung":"Zatím bez internetového připojení",
    "Bitte WLAN am Handy öffnen und mit ‚Zuhause am Bach‘ verbinden. Kein Passwort erforderlich.":"Otevřete Wi-Fi v telefonu a připojte se k síti „Zuhause am Bach“. Heslo není potřeba.",
    "Hinweis: Aus Datenschutzgründen kann ein Browser den genauen WLAN-Namen meistens nicht auslesen. Die App zeigt daher den Online-Status und eine freiwillige WLAN-Bestätigung an.":"Poznámka: z důvodu ochrany soukromí prohlížeč obvykle nemůže zjistit přesný název Wi-Fi. Aplikace proto zobrazuje stav online a volitelné potvrzení připojení.",
    "🐾 Empfehlung der Wilden Wachauer Windis":"🐾 Doporučení Die Wilden Wachauer Windis",
    "🥾 Wanderer & 🚴 Radfahrer: heute möglichst früh starten, viel Wasser mitnehmen und Mittagshitze meiden.":"🥾 Turisté & 🚴 cyklisté: dnes vyrazte co nejdříve, vezměte dostatek vody a vyhněte se polednímu horku.",
    "🥾 Wanderer & 🚴 Radfahrer: Regenjacke einpacken und Tour flexibel planen.":"🥾 Turisté & 🚴 cyklisté: vezměte pláštěnku a plánujte trasu flexibilně.",
    "🥾 Wanderer & 🚴 Radfahrer: gute Bedingungen – Wetter am Morgen nochmals prüfen.":"🥾 Turisté & 🚴 cyklisté: dobré podmínky – ráno ještě jednou zkontrolujte počasí.",
    "Wetter konnte nicht geladen werden.":"Počasí se nepodařilo načíst.",
    "Internetverbindung prüfen.":"Zkontrolujte připojení k internetu.",
    "Stempel sammeln":"Získat razítko",
    "Stempel entfernen":"Odebrat razítko",
    "Hauptstation":"Hlavní zastávka",
    "Wachau-Challenge wirklich zurücksetzen?":"Opravdu resetovat výzvu Wachau?",
    "Name eintragen":"Zadejte jméno",
    "Name übernehmen":"Použít jméno",
    "Zurück zum Quiz":"Zpět ke kvízu",
    "Zurück zur Challenge":"Zpět k výzvě",
    "Quiz, Schatzsuche, Geschichten und kleine Wachau-Abenteuer mit Pia":"Kvíz, hledání pokladu, příběhy a malá dobrodružství ve Wachau s Piou",
    "Frühstück per WhatsApp":"Snídaně přes WhatsApp",
    "Jausenplatte per WhatsApp":"Studená mísa přes WhatsApp",
    "Gepäcktransport per WhatsApp":"Přeprava zavazadel přes WhatsApp",
    "Kontakt":"Kontakt",
    "Windis-Webseite":"Web Windis"
  },
  sk:{
    "Zuhause der Wilden Wachauer Windis":"Domov Die Wilden Wachauer Windis",
    "Übernachten, wo Geschichten entstehen":"Ubytujte sa tam, kde vznikajú príbehy",
    "Ein persönlicher Rückzugsort für Familien, Wanderer und Radfahrer – und das echte Zuhause von Fidel, Gloria und Pia.":"Osobné miesto na oddych pre rodiny, turistov a cyklistov – a skutočný domov Fidela, Glorie a Pii.",
    "Jetzt direkt buchen":"Rezervovať priamo",
    "Windis-Bücher entdecken":"Objaviť knihy Windis",
    "Wenige Gäste":"Málo hostí",
    "Persönliche Gastgeber":"Osobní hostitelia",
    "Besonderer Ort":"Výnimočné miesto",
    "🧭 Wachau-Route planen":"🧭 Naplánovať trasu vo Wachau",
    "📖 Windi-Chronik":"📖 Windi kronika",
    "🐾 Die Wachau erleben – mit den Windis":"🐾 Zažite Wachau s Windis",
    "Hier verbindet sich die Kinderbuchwelt mit einem echten Ort: Fidel begleitet Wanderer, Gloria zeigt die genussvolle Wachau und Pia macht den Aufenthalt für Kinder zum Abenteuer. Die Windi-Chronik wird zur persönlichen Erinnerung für unsere Hausgäste.":"Tu sa svet detských kníh spája so skutočným miestom: Fidel sprevádza turistov, Gloria ukazuje gurmánsku stránku Wachau a Pia mení pobyt detí na dobrodružstvo. Windi kronika sa stáva osobnou spomienkou pre našich hostí.",
    "Unsere Wanderung über den Welterbesteig":"Naša túra po Welterbesteigu",
    "Heute sind wir von Maria Laach nach Aggsbach Markt gewandert …":"Dnes sme išli z Maria Laach do Aggsbach Markt …",
    "Vorname oder Familie":"Krstné meno alebo rodina",
    "Erlaubt sind JPG, PNG und WebP mit höchstens 8 MB pro Foto.":"Povolené sú JPG, PNG a WebP, maximálne 8 MB na fotografiu.",
    "Mit dem Absenden bestätigen Sie, dass Text und Bilder von Ihnen stammen und nach Prüfung veröffentlicht werden dürfen.":"Odoslaním potvrdzujete, že text a obrázky sú vaše a po kontrole môžu byť zverejnené.",
    "Geschützter Bereich":"Chránená oblasť",
    "Neue Beiträge":"Nové príspevky",
    "Abmelden":"Odhlásiť sa",
    "🚶 Welterbesteig":"🚶 Welterbesteig",
    "🚴 Donauradweg":"🚴 Dunajská cyklotrasa",
    "🍷 Heuriger":"🍷 Vínny šenk",
    "🌄 Ausflug":"🌄 Výlet",
    "🍑 Marillen":"🍑 Marhule",
    "😊 Sonstiges":"😊 Ostatné",
    "Willkommen im kostenlosen Gäste-WLAN":"Vitajte v bezplatnej Wi-Fi pre hostí",
    "Verbindung wird geprüft …":"Kontroluje sa pripojenie …",
    "Bitte kurz warten.":"Chvíľu prosím počkajte.",
    "Netzwerk":"Sieť",
    "Offenes Gäste-WLAN · kein Passwort erforderlich":"Otvorená Wi-Fi pre hostí · bez hesla",
    "Sie sind im Gäste-WLAN eingebucht":"Ste pripojení k Wi-Fi pre hostí",
    "Willkommen bei Zuhause am Bach. Wetter, Wanderwelt, Radwelt und Service stehen bereit.":"Vitajte v Zuhause am Bach. Počasie, turistika, cyklistika a služby sú pripravené.",
    "Internetverbindung aktiv":"Internetové pripojenie je aktívne",
    "Noch keine Internetverbindung":"Zatiaľ bez internetového pripojenia",
    "Bitte WLAN am Handy öffnen und mit ‚Zuhause am Bach‘ verbinden. Kein Passwort erforderlich.":"Otvorte Wi-Fi v telefóne a pripojte sa k sieti „Zuhause am Bach“. Heslo nie je potrebné.",
    "Hinweis: Aus Datenschutzgründen kann ein Browser den genauen WLAN-Namen meistens nicht auslesen. Die App zeigt daher den Online-Status und eine freiwillige WLAN-Bestätigung an.":"Poznámka: z dôvodu ochrany súkromia prehliadač zvyčajne nedokáže zistiť presný názov Wi-Fi. Aplikácia preto zobrazuje stav online a voliteľné potvrdenie pripojenia.",
    "🐾 Empfehlung der Wilden Wachauer Windis":"🐾 Odporúčanie Die Wilden Wachauer Windis",
    "🥾 Wanderer & 🚴 Radfahrer: heute möglichst früh starten, viel Wasser mitnehmen und Mittagshitze meiden.":"🥾 Turisti & 🚴 cyklisti: dnes vyrazte čo najskôr, vezmite dostatok vody a vyhnite sa poludňajšej horúčave.",
    "🥾 Wanderer & 🚴 Radfahrer: Regenjacke einpacken und Tour flexibel planen.":"🥾 Turisti & 🚴 cyklisti: vezmite si pršiplášť a plánujte trasu flexibilne.",
    "🥾 Wanderer & 🚴 Radfahrer: gute Bedingungen – Wetter am Morgen nochmals prüfen.":"🥾 Turisti & 🚴 cyklisti: dobré podmienky – ráno ešte raz skontrolujte počasie.",
    "Wetter konnte nicht geladen werden.":"Počasie sa nepodarilo načítať.",
    "Internetverbindung prüfen.":"Skontrolujte internetové pripojenie.",
    "Stempel sammeln":"Získať pečiatku",
    "Stempel entfernen":"Odobrať pečiatku",
    "Hauptstation":"Hlavná zastávka",
    "Wachau-Challenge wirklich zurücksetzen?":"Naozaj resetovať výzvu Wachau?",
    "Name eintragen":"Zadajte meno",
    "Name übernehmen":"Použiť meno",
    "Zurück zum Quiz":"Späť ku kvízu",
    "Zurück zur Challenge":"Späť k výzve",
    "Quiz, Schatzsuche, Geschichten und kleine Wachau-Abenteuer mit Pia":"Kvíz, hľadanie pokladu, príbehy a malé dobrodružstvá vo Wachau s Piou",
    "Frühstück per WhatsApp":"Raňajky cez WhatsApp",
    "Jausenplatte per WhatsApp":"Studená misa cez WhatsApp",
    "Gepäcktransport per WhatsApp":"Preprava batožiny cez WhatsApp",
    "Kontakt":"Kontakt",
    "Windis-Webseite":"Web Windis"
  },
  hu:{
    "Zuhause der Wilden Wachauer Windis":"A Die Wilden Wachauer Windis otthona",
    "Übernachten, wo Geschichten entstehen":"Szálljon meg ott, ahol történetek születnek",
    "Ein persönlicher Rückzugsort für Familien, Wanderer und Radfahrer – und das echte Zuhause von Fidel, Gloria und Pia.":"Személyes pihenőhely családoknak, túrázóknak és kerékpárosoknak – és Fidel, Gloria és Pia valódi otthona.",
    "Jetzt direkt buchen":"Közvetlen foglalás",
    "Windis-Bücher entdecken":"A Windis-könyvek felfedezése",
    "Wenige Gäste":"Kevés vendég",
    "Persönliche Gastgeber":"Személyes házigazdák",
    "Besonderer Ort":"Különleges hely",
    "🧭 Wachau-Route planen":"🧭 Wachaui útvonal tervezése",
    "📖 Windi-Chronik":"📖 Windi-krónika",
    "🐾 Die Wachau erleben – mit den Windis":"🐾 Fedezze fel a Wachaut a Windikkel",
    "Hier verbindet sich die Kinderbuchwelt mit einem echten Ort: Fidel begleitet Wanderer, Gloria zeigt die genussvolle Wachau und Pia macht den Aufenthalt für Kinder zum Abenteuer. Die Windi-Chronik wird zur persönlichen Erinnerung für unsere Hausgäste.":"Itt a gyerekkönyvek világa valódi hellyel találkozik: Fidel a túrázókat kíséri, Gloria a Wachau gasztronómiai oldalát mutatja meg, Pia pedig kalanddá teszi a gyerekek tartózkodását. A Windi-krónika személyes emlékké válik vendégeink számára.",
    "Unsere Wanderung über den Welterbesteig":"Túránk a Welterbesteigen",
    "Heute sind wir von Maria Laach nach Aggsbach Markt gewandert …":"Ma Maria Laachból Aggsbach Marktba túráztunk …",
    "Vorname oder Familie":"Keresztnév vagy család",
    "Erlaubt sind JPG, PNG und WebP mit höchstens 8 MB pro Foto.":"JPG, PNG és WebP engedélyezett, képenként legfeljebb 8 MB méretben.",
    "Mit dem Absenden bestätigen Sie, dass Text und Bilder von Ihnen stammen und nach Prüfung veröffentlicht werden dürfen.":"A beküldéssel megerősíti, hogy a szöveg és a képek Öntől származnak, és ellenőrzés után közzétehetők.",
    "Geschützter Bereich":"Védett terület",
    "Neue Beiträge":"Új bejegyzések",
    "Abmelden":"Kijelentkezés",
    "🚶 Welterbesteig":"🚶 Welterbesteig",
    "🚴 Donauradweg":"🚴 Duna menti kerékpárút",
    "🍷 Heuriger":"🍷 Borozó",
    "🌄 Ausflug":"🌄 Kirándulás",
    "🍑 Marillen":"🍑 Sárgabarack",
    "😊 Sonstiges":"😊 Egyéb",
    "Willkommen im kostenlosen Gäste-WLAN":"Üdvözöljük az ingyenes vendég Wi-Fi-n",
    "Verbindung wird geprüft …":"Kapcsolat ellenőrzése …",
    "Bitte kurz warten.":"Kérjük, várjon egy pillanatot.",
    "Netzwerk":"Hálózat",
    "Offenes Gäste-WLAN · kein Passwort erforderlich":"Nyílt vendég Wi-Fi · jelszó nem szükséges",
    "Sie sind im Gäste-WLAN eingebucht":"Csatlakozott a vendég Wi-Fi-hez",
    "Willkommen bei Zuhause am Bach. Wetter, Wanderwelt, Radwelt und Service stehen bereit.":"Üdvözöljük a Zuhause am Bach szálláson. Az időjárás, túrázás, kerékpározás és vendégszolgáltatások elérhetők.",
    "Internetverbindung aktiv":"Internetkapcsolat aktív",
    "Noch keine Internetverbindung":"Még nincs internetkapcsolat",
    "Bitte WLAN am Handy öffnen und mit ‚Zuhause am Bach‘ verbinden. Kein Passwort erforderlich.":"Nyissa meg telefonján a Wi-Fi-t, és csatlakozzon a „Zuhause am Bach” hálózathoz. Jelszó nem szükséges.",
    "Hinweis: Aus Datenschutzgründen kann ein Browser den genauen WLAN-Namen meistens nicht auslesen. Die App zeigt daher den Online-Status und eine freiwillige WLAN-Bestätigung an.":"Megjegyzés: adatvédelmi okokból a böngészők általában nem tudják kiolvasni a Wi-Fi pontos nevét. Az alkalmazás ezért az online állapotot és egy opcionális Wi-Fi-visszaigazolást mutat.",
    "🐾 Empfehlung der Wilden Wachauer Windis":"🐾 A Die Wilden Wachauer Windis ajánlása",
    "🥾 Wanderer & 🚴 Radfahrer: heute möglichst früh starten, viel Wasser mitnehmen und Mittagshitze meiden.":"🥾 Túrázók & 🚴 kerékpárosok: ma induljanak minél korábban, vigyenek sok vizet, és kerüljék a déli hőséget.",
    "🥾 Wanderer & 🚴 Radfahrer: Regenjacke einpacken und Tour flexibel planen.":"🥾 Túrázók & 🚴 kerékpárosok: vigyenek esőkabátot, és rugalmasan tervezzék az útvonalat.",
    "🥾 Wanderer & 🚴 Radfahrer: gute Bedingungen – Wetter am Morgen nochmals prüfen.":"🥾 Túrázók & 🚴 kerékpárosok: jók a körülmények – reggel ellenőrizzék újra az időjárást.",
    "Wetter konnte nicht geladen werden.":"Az időjárás nem tölthető be.",
    "Internetverbindung prüfen.":"Ellenőrizze az internetkapcsolatot.",
    "Stempel sammeln":"Pecsét gyűjtése",
    "Stempel entfernen":"Pecsét eltávolítása",
    "Hauptstation":"Fő állomás",
    "Wachau-Challenge wirklich zurücksetzen?":"Biztosan visszaállítja a Wachau-kihívást?",
    "Name eintragen":"Név megadása",
    "Name übernehmen":"Név használata",
    "Zurück zum Quiz":"Vissza a kvízhez",
    "Zurück zur Challenge":"Vissza a kihíváshoz",
    "Quiz, Schatzsuche, Geschichten und kleine Wachau-Abenteuer mit Pia":"Kvíz, kincskeresés, történetek és kis wachaui kalandok Piával",
    "Frühstück per WhatsApp":"Reggeli WhatsAppon",
    "Jausenplatte per WhatsApp":"Hidegtál WhatsAppon",
    "Gepäcktransport per WhatsApp":"Poggyászszállítás WhatsAppon",
    "Kontakt":"Kapcsolat",
    "Windis-Webseite":"Windis weboldal"
  },
  es:{
    "Zuhause der Wilden Wachauer Windis":"Hogar de Die Wilden Wachauer Windis",
    "Übernachten, wo Geschichten entstehen":"Alójese donde nacen historias",
    "Ein persönlicher Rückzugsort für Familien, Wanderer und Radfahrer – und das echte Zuhause von Fidel, Gloria und Pia.":"Un refugio personal para familias, senderistas y ciclistas, y el verdadero hogar de Fidel, Gloria y Pia.",
    "Jetzt direkt buchen":"Reservar directamente",
    "Windis-Bücher entdecken":"Descubrir los libros de los Windis",
    "Wenige Gäste":"Pocos huéspedes",
    "Persönliche Gastgeber":"Anfitriones cercanos",
    "Besonderer Ort":"Un lugar especial",
    "🧭 Wachau-Route planen":"🧭 Planificar una ruta por Wachau",
    "📖 Windi-Chronik":"📖 Crónica Windi",
    "🐾 Die Wachau erleben – mit den Windis":"🐾 Descubrir Wachau con los Windis",
    "Hier verbindet sich die Kinderbuchwelt mit einem echten Ort: Fidel begleitet Wanderer, Gloria zeigt die genussvolle Wachau und Pia macht den Aufenthalt für Kinder zum Abenteuer. Die Windi-Chronik wird zur persönlichen Erinnerung für unsere Hausgäste.":"Aquí el mundo de los libros infantiles se une a un lugar real: Fidel acompaña a los senderistas, Gloria muestra el lado gastronómico de Wachau y Pia convierte la estancia de los niños en una aventura. La Crónica Windi se convierte en un recuerdo personal para nuestros huéspedes.",
    "Unsere Wanderung über den Welterbesteig":"Nuestra caminata por el Welterbesteig",
    "Heute sind wir von Maria Laach nach Aggsbach Markt gewandert …":"Hoy caminamos de Maria Laach a Aggsbach Markt …",
    "Vorname oder Familie":"Nombre o familia",
    "Erlaubt sind JPG, PNG und WebP mit höchstens 8 MB pro Foto.":"Se permiten JPG, PNG y WebP, con un máximo de 8 MB por foto.",
    "Mit dem Absenden bestätigen Sie, dass Text und Bilder von Ihnen stammen und nach Prüfung veröffentlicht werden dürfen.":"Al enviar, confirma que el texto y las imágenes son suyos y que pueden publicarse tras su revisión.",
    "Geschützter Bereich":"Área protegida",
    "Neue Beiträge":"Nuevas contribuciones",
    "Abmelden":"Cerrar sesión",
    "🚶 Welterbesteig":"🚶 Welterbesteig",
    "🚴 Donauradweg":"🚴 Ruta ciclista del Danubio",
    "🍷 Heuriger":"🍷 Taberna de vino",
    "🌄 Ausflug":"🌄 Excursión",
    "🍑 Marillen":"🍑 Albaricoques",
    "😊 Sonstiges":"😊 Otros",
    "Willkommen im kostenlosen Gäste-WLAN":"Bienvenido al Wi-Fi gratuito para huéspedes",
    "Verbindung wird geprüft …":"Comprobando la conexión …",
    "Bitte kurz warten.":"Espere un momento, por favor.",
    "Netzwerk":"Red",
    "Offenes Gäste-WLAN · kein Passwort erforderlich":"Wi-Fi abierto para huéspedes · sin contraseña",
    "Sie sind im Gäste-WLAN eingebucht":"Está conectado al Wi-Fi para huéspedes",
    "Willkommen bei Zuhause am Bach. Wetter, Wanderwelt, Radwelt und Service stehen bereit.":"Bienvenido a Zuhause am Bach. El tiempo, el senderismo, el ciclismo y los servicios para huéspedes están disponibles.",
    "Internetverbindung aktiv":"Conexión a Internet activa",
    "Noch keine Internetverbindung":"Aún no hay conexión a Internet",
    "Bitte WLAN am Handy öffnen und mit ‚Zuhause am Bach‘ verbinden. Kein Passwort erforderlich.":"Abra el Wi-Fi en su teléfono y conéctese a «Zuhause am Bach». No se necesita contraseña.",
    "Hinweis: Aus Datenschutzgründen kann ein Browser den genauen WLAN-Namen meistens nicht auslesen. Die App zeigt daher den Online-Status und eine freiwillige WLAN-Bestätigung an.":"Nota: por privacidad, los navegadores normalmente no pueden leer el nombre exacto de la red Wi-Fi. Por eso la app muestra el estado en línea y una confirmación opcional de Wi-Fi.",
    "🐾 Empfehlung der Wilden Wachauer Windis":"🐾 Recomendación de Die Wilden Wachauer Windis",
    "🥾 Wanderer & 🚴 Radfahrer: heute möglichst früh starten, viel Wasser mitnehmen und Mittagshitze meiden.":"🥾 Senderistas y 🚴 ciclistas: salgan lo antes posible hoy, lleven mucha agua y eviten el calor del mediodía.",
    "🥾 Wanderer & 🚴 Radfahrer: Regenjacke einpacken und Tour flexibel planen.":"🥾 Senderistas y 🚴 ciclistas: lleven un impermeable y planifiquen la ruta con flexibilidad.",
    "🥾 Wanderer & 🚴 Radfahrer: gute Bedingungen – Wetter am Morgen nochmals prüfen.":"🥾 Senderistas y 🚴 ciclistas: buenas condiciones; vuelvan a consultar el tiempo por la mañana.",
    "Wetter konnte nicht geladen werden.":"No se pudo cargar el tiempo.",
    "Internetverbindung prüfen.":"Compruebe la conexión a Internet.",
    "Stempel sammeln":"Conseguir sello",
    "Stempel entfernen":"Quitar sello",
    "Hauptstation":"Parada principal",
    "Wachau-Challenge wirklich zurücksetzen?":"¿Seguro que quiere reiniciar el reto de Wachau?",
    "Name eintragen":"Introducir nombre",
    "Name übernehmen":"Usar nombre",
    "Zurück zum Quiz":"Volver al cuestionario",
    "Zurück zur Challenge":"Volver al reto",
    "Quiz, Schatzsuche, Geschichten und kleine Wachau-Abenteuer mit Pia":"Cuestionario, búsqueda del tesoro, historias y pequeñas aventuras en Wachau con Pia",
    "Frühstück per WhatsApp":"Desayuno por WhatsApp",
    "Jausenplatte per WhatsApp":"Tabla de aperitivos por WhatsApp",
    "Gepäcktransport per WhatsApp":"Transporte de equipaje por WhatsApp",
    "Kontakt":"Contacto",
    "Windis-Webseite":"Web de los Windis"
  },
  fr:{
    "Zuhause der Wilden Wachauer Windis":"La maison de Die Wilden Wachauer Windis",
    "Übernachten, wo Geschichten entstehen":"Séjournez là où naissent les histoires",
    "Ein persönlicher Rückzugsort für Familien, Wanderer und Radfahrer – und das echte Zuhause von Fidel, Gloria und Pia.":"Un refuge personnel pour les familles, les randonneurs et les cyclistes – et la vraie maison de Fidel, Gloria et Pia.",
    "Jetzt direkt buchen":"Réserver en direct",
    "Windis-Bücher entdecken":"Découvrir les livres des Windis",
    "Wenige Gäste":"Peu d’hôtes",
    "Persönliche Gastgeber":"Des hôtes présents",
    "Besonderer Ort":"Un lieu particulier",
    "🧭 Wachau-Route planen":"🧭 Planifier un itinéraire dans la Wachau",
    "📖 Windi-Chronik":"📖 Chronique Windi",
    "🐾 Die Wachau erleben – mit den Windis":"🐾 Découvrir la Wachau avec les Windis",
    "Hier verbindet sich die Kinderbuchwelt mit einem echten Ort: Fidel begleitet Wanderer, Gloria zeigt die genussvolle Wachau und Pia macht den Aufenthalt für Kinder zum Abenteuer. Die Windi-Chronik wird zur persönlichen Erinnerung für unsere Hausgäste.":"Ici, l’univers des livres pour enfants rencontre un lieu réel : Fidel accompagne les randonneurs, Gloria révèle le côté gourmand de la Wachau et Pia transforme le séjour des enfants en aventure. La Chronique Windi devient un souvenir personnel pour nos hôtes.",
    "Unsere Wanderung über den Welterbesteig":"Notre randonnée sur le Welterbesteig",
    "Heute sind wir von Maria Laach nach Aggsbach Markt gewandert …":"Aujourd’hui, nous avons marché de Maria Laach à Aggsbach Markt …",
    "Vorname oder Familie":"Prénom ou famille",
    "Erlaubt sind JPG, PNG und WebP mit höchstens 8 MB pro Foto.":"Les formats JPG, PNG et WebP sont autorisés, avec un maximum de 8 Mo par photo.",
    "Mit dem Absenden bestätigen Sie, dass Text und Bilder von Ihnen stammen und nach Prüfung veröffentlicht werden dürfen.":"En envoyant, vous confirmez que le texte et les images sont les vôtres et qu’ils peuvent être publiés après vérification.",
    "Geschützter Bereich":"Espace protégé",
    "Neue Beiträge":"Nouvelles contributions",
    "Abmelden":"Se déconnecter",
    "🚶 Welterbesteig":"🚶 Welterbesteig",
    "🚴 Donauradweg":"🚴 Véloroute du Danube",
    "🍷 Heuriger":"🍷 Taverne viticole",
    "🌄 Ausflug":"🌄 Excursion",
    "🍑 Marillen":"🍑 Abricots",
    "😊 Sonstiges":"😊 Autre",
    "Willkommen im kostenlosen Gäste-WLAN":"Bienvenue sur le Wi-Fi gratuit pour les hôtes",
    "Verbindung wird geprüft …":"Vérification de la connexion …",
    "Bitte kurz warten.":"Veuillez patienter un instant.",
    "Netzwerk":"Réseau",
    "Offenes Gäste-WLAN · kein Passwort erforderlich":"Wi-Fi ouvert pour les hôtes · aucun mot de passe requis",
    "Sie sind im Gäste-WLAN eingebucht":"Vous êtes connecté au Wi-Fi des hôtes",
    "Willkommen bei Zuhause am Bach. Wetter, Wanderwelt, Radwelt und Service stehen bereit.":"Bienvenue à Zuhause am Bach. Météo, randonnée, vélo et services aux hôtes sont disponibles.",
    "Internetverbindung aktiv":"Connexion Internet active",
    "Noch keine Internetverbindung":"Pas encore de connexion Internet",
    "Bitte WLAN am Handy öffnen und mit ‚Zuhause am Bach‘ verbinden. Kein Passwort erforderlich.":"Ouvrez le Wi-Fi sur votre téléphone et connectez-vous à « Zuhause am Bach ». Aucun mot de passe n’est requis.",
    "Hinweis: Aus Datenschutzgründen kann ein Browser den genauen WLAN-Namen meistens nicht auslesen. Die App zeigt daher den Online-Status und eine freiwillige WLAN-Bestätigung an.":"Remarque : pour des raisons de confidentialité, les navigateurs ne peuvent généralement pas lire le nom exact du réseau Wi-Fi. L’application affiche donc l’état en ligne et une confirmation Wi-Fi facultative.",
    "🐾 Empfehlung der Wilden Wachauer Windis":"🐾 Recommandation de Die Wilden Wachauer Windis",
    "🥾 Wanderer & 🚴 Radfahrer: heute möglichst früh starten, viel Wasser mitnehmen und Mittagshitze meiden.":"🥾 Randonneurs et 🚴 cyclistes : partez le plus tôt possible aujourd’hui, emportez beaucoup d’eau et évitez la chaleur de midi.",
    "🥾 Wanderer & 🚴 Radfahrer: Regenjacke einpacken und Tour flexibel planen.":"🥾 Randonneurs et 🚴 cyclistes : emportez une veste de pluie et gardez un itinéraire flexible.",
    "🥾 Wanderer & 🚴 Radfahrer: gute Bedingungen – Wetter am Morgen nochmals prüfen.":"🥾 Randonneurs et 🚴 cyclistes : bonnes conditions – vérifiez encore la météo le matin.",
    "Wetter konnte nicht geladen werden.":"Impossible de charger la météo.",
    "Internetverbindung prüfen.":"Vérifiez la connexion Internet.",
    "Stempel sammeln":"Obtenir un tampon",
    "Stempel entfernen":"Retirer le tampon",
    "Hauptstation":"Étape principale",
    "Wachau-Challenge wirklich zurücksetzen?":"Voulez-vous vraiment réinitialiser le défi Wachau ?",
    "Name eintragen":"Saisir le nom",
    "Name übernehmen":"Utiliser le nom",
    "Zurück zum Quiz":"Retour au quiz",
    "Zurück zur Challenge":"Retour au défi",
    "Quiz, Schatzsuche, Geschichten und kleine Wachau-Abenteuer mit Pia":"Quiz, chasse au trésor, histoires et petites aventures dans la Wachau avec Pia",
    "Frühstück per WhatsApp":"Petit-déjeuner via WhatsApp",
    "Jausenplatte per WhatsApp":"Plateau froid via WhatsApp",
    "Gepäcktransport per WhatsApp":"Transport des bagages via WhatsApp",
    "Kontakt":"Contact",
    "Windis-Webseite":"Site des Windis"
  }
};

const UI={
  en:{updated:"Updated",forecast:"14-day forecast",showers:"Showers",correct:"correct",points:"points",googleFor:"Google AI mode for",certificatePoints:(n)=>`for ${n} Wachau points collected at Zuhause am Bach.`,reset:"Really reset the Wachau Challenge?",chart:["Daily high °C","Low °C","Shower probability %","Temperature °C","Showers %"],weather:{"Sonnig":"Sunny","Klar":"Clear","Teilweise bewölkt":"Partly cloudy","Bewölkt":"Cloudy","Nebel":"Fog","Niesel":"Drizzle","Leichter Regen":"Light rain","Regen":"Rain","Starker Regen":"Heavy rain","Schnee":"Snow","Schauer":"Showers","Starke Schauer":"Heavy showers","Gewitter":"Thunderstorm","Gute Outdoor-Chance":"Good chance for outdoor activities","Regenjacke einplanen":"Bring a rain jacket","Schlechtwetterprogramm":"Bad-weather plan"}},
  cz:{updated:"Aktualizováno",forecast:"14denní předpověď",showers:"Srážky",correct:"správně",points:"bodů",googleFor:"Režim Google AI pro",certificatePoints:(n)=>`za ${n} bodů Wachau získaných v Zuhause am Bach.`,reset:"Opravdu resetovat výzvu Wachau?",chart:["Nejvyšší denní teplota °C","Nejnižší teplota °C","Pravděpodobnost srážek %","Teplota °C","Srážky %"],weather:{"Sonnig":"Slunečno","Klar":"Jasno","Teilweise bewölkt":"Polojasno","Bewölkt":"Zataženo","Nebel":"Mlha","Niesel":"Mrholení","Leichter Regen":"Slabý déšť","Regen":"Déšť","Starker Regen":"Silný déšť","Schnee":"Sněžení","Schauer":"Přeháňky","Starke Schauer":"Silné přeháňky","Gewitter":"Bouřka","Gute Outdoor-Chance":"Dobré podmínky pro pobyt venku","Regenjacke einplanen":"Vezměte si pláštěnku","Schlechtwetterprogramm":"Program pro špatné počasí"}},
  sk:{updated:"Aktualizované",forecast:"14-dňová predpoveď",showers:"Zrážky",correct:"správne",points:"bodov",googleFor:"Režim Google AI pre",certificatePoints:(n)=>`za ${n} bodov Wachau získaných v Zuhause am Bach.`,reset:"Naozaj resetovať výzvu Wachau?",chart:["Najvyššia denná teplota °C","Najnižšia teplota °C","Pravdepodobnosť zrážok %","Teplota °C","Zrážky %"],weather:{"Sonnig":"Slnečno","Klar":"Jasno","Teilweise bewölkt":"Polooblačno","Bewölkt":"Oblačno","Nebel":"Hmla","Niesel":"Mrholenie","Leichter Regen":"Slabý dážď","Regen":"Dážď","Starker Regen":"Silný dážď","Schnee":"Sneh","Schauer":"Prehánky","Starke Schauer":"Silné prehánky","Gewitter":"Búrka","Gute Outdoor-Chance":"Dobré podmienky na pobyt vonku","Regenjacke einplanen":"Vezmite si pršiplášť","Schlechtwetterprogramm":"Program do zlého počasia"}},
  hu:{updated:"Frissítve",forecast:"14 napos előrejelzés",showers:"Csapadék",correct:"helyes",points:"pont",googleFor:"Google AI mód erre a napra:",certificatePoints:(n)=>`${n} Wachau-pont összegyűjtéséért a Zuhause am Bach szálláson.`,reset:"Biztosan visszaállítja a Wachau-kihívást?",chart:["Napi maximum °C","Minimum °C","Csapadék valószínűsége %","Hőmérséklet °C","Csapadék %"],weather:{"Sonnig":"Napos","Klar":"Derült","Teilweise bewölkt":"Részben felhős","Bewölkt":"Felhős","Nebel":"Köd","Niesel":"Szitálás","Leichter Regen":"Gyenge eső","Regen":"Eső","Starker Regen":"Erős eső","Schnee":"Hó","Schauer":"Zápor","Starke Schauer":"Erős zápor","Gewitter":"Zivatar","Gute Outdoor-Chance":"Jó esély szabadtéri programra","Regenjacke einplanen":"Esőkabát ajánlott","Schlechtwetterprogramm":"Rossz időre való program"}},
  es:{updated:"Actualizado",forecast:"Previsión de 14 días",showers:"Chubascos",correct:"correctas",points:"puntos",googleFor:"Modo IA de Google para",certificatePoints:(n)=>`por ${n} puntos de Wachau conseguidos en Zuhause am Bach.`,reset:"¿Seguro que quiere reiniciar el reto de Wachau?",chart:["Máxima diaria °C","Mínima °C","Probabilidad de chubascos %","Temperatura °C","Chubascos %"],weather:{"Sonnig":"Soleado","Klar":"Despejado","Teilweise bewölkt":"Parcialmente nublado","Bewölkt":"Nublado","Nebel":"Niebla","Niesel":"Llovizna","Leichter Regen":"Lluvia ligera","Regen":"Lluvia","Starker Regen":"Lluvia intensa","Schnee":"Nieve","Schauer":"Chubascos","Starke Schauer":"Chubascos intensos","Gewitter":"Tormenta","Gute Outdoor-Chance":"Buenas condiciones para actividades al aire libre","Regenjacke einplanen":"Lleve impermeable","Schlechtwetterprogramm":"Plan para mal tiempo"}},
  fr:{updated:"Mis à jour",forecast:"Prévisions sur 14 jours",showers:"Averses",correct:"bonnes réponses",points:"points",googleFor:"Mode IA Google pour",certificatePoints:(n)=>`pour ${n} points Wachau obtenus à Zuhause am Bach.`,reset:"Voulez-vous vraiment réinitialiser le défi Wachau ?",chart:["Maximum journalier °C","Minimum °C","Probabilité d’averses %","Température °C","Averses %"],weather:{"Sonnig":"Ensoleillé","Klar":"Dégagé","Teilweise bewölkt":"Partiellement nuageux","Bewölkt":"Nuageux","Nebel":"Brouillard","Niesel":"Bruine","Leichter Regen":"Pluie faible","Regen":"Pluie","Starker Regen":"Forte pluie","Schnee":"Neige","Schauer":"Averses","Starke Schauer":"Fortes averses","Gewitter":"Orage","Gute Outdoor-Chance":"Bonnes conditions pour les activités de plein air","Regenjacke einplanen":"Prévoir une veste de pluie","Schlechtwetterprogramm":"Programme par mauvais temps"}}
};

const MESSAGE={
  en:{hello:"Hello! 😊",arrivalIntro:"We would like to send our arrival information.",arrival:"Arrival",arrivalMode:"Arrival type",breakfastTime:"Breakfast time",luggage:"Luggage transport",snack:"Snack platter",guests:"Guests",requests:"Special requests",thanks:"Thank you!",snackIntro:"We would like to pre-order a snack platter.",price:"Total price",bookingIntro:"We would like to enquire directly with Zuhause am Bach.",departure:"Departure",room:"Preferred room",breakfast:"Breakfast",message:"Message",recommend:"I stayed at Zuhause am Bach in Aggsbach Markt – ideal for hikers on the World Heritage Trail and cyclists on the Danube Cycle Path. Welcome to the pack of Die Wilden Wachauer Windis:",recommendSubject:"Tip: Zuhause am Bach in the Wachau",serviceBreakfast:"Hello Zuhause am Bach, I would like to request breakfast.",serviceSnack:"Hello Zuhause am Bach, I would like to request a snack platter.",serviceLuggage:"Hello Zuhause am Bach, I would like to request luggage transport.",heurigen:(date)=>`Which wine taverns are open on ${date} on the north bank of the Wachau within 15 km of Aggsbach Markt? Show only venues that are actually open, with opening hours and sources.`},
  cz:{hello:"Dobrý den! 😊",arrivalIntro:"Rádi bychom poslali informace o našem příjezdu.",arrival:"Příjezd",arrivalMode:"Způsob příjezdu",breakfastTime:"Čas snídaně",luggage:"Přeprava zavazadel",snack:"Studená mísa",guests:"Osoby",requests:"Zvláštní přání",thanks:"Děkujeme!",snackIntro:"Rádi bychom si předobjednali studenou mísu.",price:"Celková cena",bookingIntro:"Rádi bychom se přímo informovali u Zuhause am Bach.",departure:"Odjezd",room:"Preferovaný pokoj",breakfast:"Snídaně",message:"Zpráva",recommend:"Bydleli jsme v Zuhause am Bach v Aggsbach Markt – ideální pro turisty na Welterbesteigu a cyklisty na Dunajské cyklostezce. Vítejte ve smečce Die Wilden Wachauer Windis:",recommendSubject:"Tip: Zuhause am Bach ve Wachau",serviceBreakfast:"Dobrý den Zuhause am Bach, rádi bychom si objednali snídani.",serviceSnack:"Dobrý den Zuhause am Bach, rádi bychom si objednali studenou mísu.",serviceLuggage:"Dobrý den Zuhause am Bach, rádi bychom požádali o přepravu zavazadel.",heurigen:(date)=>`Které vinné šenky jsou ${date} otevřené na severním břehu Wachau do 15 km od Aggsbach Markt? Zobrazte pouze skutečně otevřené podniky, včetně otevírací doby a zdrojů.`},
  sk:{hello:"Dobrý deň! 😊",arrivalIntro:"Radi by sme poslali informácie o našom príchode.",arrival:"Príchod",arrivalMode:"Spôsob príchodu",breakfastTime:"Čas raňajok",luggage:"Preprava batožiny",snack:"Studená misa",guests:"Osoby",requests:"Osobitné želania",thanks:"Ďakujeme!",snackIntro:"Radi by sme si predobjednali studenú misu.",price:"Celková cena",bookingIntro:"Radi by sme sa priamo informovali v Zuhause am Bach.",departure:"Odchod",room:"Preferovaná izba",breakfast:"Raňajky",message:"Správa",recommend:"Bývali sme v Zuhause am Bach v Aggsbach Markt – ideálne pre turistov na Welterbesteigu a cyklistov na Dunajskej cyklotrase. Vitajte vo svorke Die Wilden Wachauer Windis:",recommendSubject:"Tip: Zuhause am Bach vo Wachau",serviceBreakfast:"Dobrý deň Zuhause am Bach, radi by sme si objednali raňajky.",serviceSnack:"Dobrý deň Zuhause am Bach, radi by sme si objednali studenú misu.",serviceLuggage:"Dobrý deň Zuhause am Bach, radi by sme požiadali o prepravu batožiny.",heurigen:(date)=>`Ktoré vínne šenky sú ${date} otvorené na severnom brehu Wachau do 15 km od Aggsbach Markt? Zobrazte iba skutočne otvorené podniky vrátane otváracích hodín a zdrojov.`},
  hu:{hello:"Üdvözöljük! 😊",arrivalIntro:"Szeretnénk elküldeni érkezési adatainkat.",arrival:"Érkezés",arrivalMode:"Érkezés módja",breakfastTime:"Reggeli időpontja",luggage:"Poggyászszállítás",snack:"Hidegtál",guests:"Személyek",requests:"Különleges kérések",thanks:"Köszönjük!",snackIntro:"Szeretnénk előrendelni egy hidegtálat.",price:"Teljes ár",bookingIntro:"Szeretnénk közvetlenül érdeklődni a Zuhause am Bach szállásnál.",departure:"Távozás",room:"Kívánt szoba",breakfast:"Reggeli",message:"Üzenet",recommend:"A Zuhause am Bach szálláson jártunk Aggsbach Marktban – ideális a Welterbesteig túrázóinak és a Duna menti kerékpárút kerékpárosainak. Üdvözöljük a Die Wilden Wachauer Windis falkájában:",recommendSubject:"Tipp: Zuhause am Bach a Wachauban",serviceBreakfast:"Üdvözöljük Zuhause am Bach, reggelit szeretnénk kérni.",serviceSnack:"Üdvözöljük Zuhause am Bach, hidegtálat szeretnénk kérni.",serviceLuggage:"Üdvözöljük Zuhause am Bach, poggyászszállítást szeretnénk kérni.",heurigen:(date)=>`Mely borozók vannak nyitva ${date} a Wachau északi partján, Aggsbach Markt 15 km-es körzetében? Csak ténylegesen nyitva tartó helyeket mutasson, nyitvatartással és forrásokkal.`},
  es:{hello:"¡Hola! 😊",arrivalIntro:"Queremos enviar la información de nuestra llegada.",arrival:"Llegada",arrivalMode:"Modo de llegada",breakfastTime:"Hora del desayuno",luggage:"Transporte de equipaje",snack:"Tabla de aperitivos",guests:"Personas",requests:"Peticiones especiales",thanks:"¡Gracias!",snackIntro:"Queremos reservar una tabla de aperitivos.",price:"Precio total",bookingIntro:"Queremos consultar directamente con Zuhause am Bach.",departure:"Salida",room:"Habitación preferida",breakfast:"Desayuno",message:"Mensaje",recommend:"Nos alojamos en Zuhause am Bach, en Aggsbach Markt: ideal para senderistas del Welterbesteig y ciclistas de la ruta del Danubio. Bienvenidos a la manada de Die Wilden Wachauer Windis:",recommendSubject:"Consejo: Zuhause am Bach en Wachau",serviceBreakfast:"Hola Zuhause am Bach, queremos solicitar desayuno.",serviceSnack:"Hola Zuhause am Bach, queremos solicitar una tabla de aperitivos.",serviceLuggage:"Hola Zuhause am Bach, queremos solicitar transporte de equipaje.",heurigen:(date)=>`¿Qué tabernas de vino están abiertas ${date} en la orilla norte de Wachau, a menos de 15 km de Aggsbach Markt? Muestre solo locales realmente abiertos, con horarios y fuentes.`},
  fr:{hello:"Bonjour ! 😊",arrivalIntro:"Nous souhaitons transmettre nos informations d’arrivée.",arrival:"Arrivée",arrivalMode:"Mode d’arrivée",breakfastTime:"Heure du petit-déjeuner",luggage:"Transport des bagages",snack:"Plateau froid",guests:"Personnes",requests:"Demandes particulières",thanks:"Merci !",snackIntro:"Nous souhaitons précommander un plateau froid.",price:"Prix total",bookingIntro:"Nous souhaitons contacter directement Zuhause am Bach.",departure:"Départ",room:"Chambre souhaitée",breakfast:"Petit-déjeuner",message:"Message",recommend:"Nous avons séjourné à Zuhause am Bach à Aggsbach Markt – idéal pour les randonneurs du Welterbesteig et les cyclistes de la véloroute du Danube. Bienvenue dans la meute de Die Wilden Wachauer Windis :",recommendSubject:"Conseil : Zuhause am Bach dans la Wachau",serviceBreakfast:"Bonjour Zuhause am Bach, nous souhaitons demander le petit-déjeuner.",serviceSnack:"Bonjour Zuhause am Bach, nous souhaitons demander un plateau froid.",serviceLuggage:"Bonjour Zuhause am Bach, nous souhaitons demander le transport des bagages.",heurigen:(date)=>`Quels établissements viticoles sont ouverts ${date} sur la rive nord de la Wachau, dans un rayon de 15 km d’Aggsbach Markt ? N’affichez que les établissements réellement ouverts, avec horaires et sources.`}
};

function normalizeLang(lang){
  const v=String(lang||"de").toLowerCase().split("-")[0];
  if(v==="cs")return "cz";
  return ["de","en","cz","sk","hu","es","fr"].includes(v)?v:"de";
}

let activeLang=normalizeLang(localStorage.getItem("zabLang")||(navigator.language||"de"));
let translating=false;
let pageObserver=null;

function clean(s){return String(s||"").replace(/\s+/g," ").trim()}
function dateFromInput(){
  const v=document.getElementById("heurigenDate")?.value;
  return v?new Date(v+"T12:00:00"):new Date();
}
function formatDate(date,lang,weekday=false){
  const options=weekday?{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"}:{day:"2-digit",month:"2-digit",year:"numeric"};
  return new Intl.DateTimeFormat(LOCALE[lang]||LOCALE.de,options).format(date);
}
function parseGermanNumericDate(text){
  const m=String(text).match(/(\d{2})\.(\d{2})\.(\d{4})/);
  return m?new Date(Number(m[3]),Number(m[2])-1,Number(m[1]),12,0,0):null;
}

function translateDynamic(raw,lang){
  if(lang==="de"||!UI[lang])return raw;
  const t=clean(raw), ui=UI[lang];
  let m;
  if(t.match(/^Aktualisiert am .+ · 14-Tage-Prognose$/)){
    return `${ui.updated} ${formatDate(new Date(),lang,true)} · ${ui.forecast}`;
  }
  if((m=t.match(/^(-?\d+)–(-?\d+) °C · Schauer (\d+)%$/))){
    return `${m[1]}–${m[2]} °C · ${ui.showers} ${m[3]}%`;
  }
  if((m=t.match(/^(\d+) von (\d+) richtig$/))){
    return `${m[1]} / ${m[2]} ${ui.correct}`;
  }
  if((m=t.match(/^(\d+) \/ 100 Punkte$/))){
    return `${m[1]} / 100 ${ui.points}`;
  }
  if((m=t.match(/^(\d+) Punkte$/))){
    return `${m[1]} ${ui.points}`;
  }
  if((m=t.match(/^für (\d+) gesammelte Wachau-Punkte bei Zuhause am Bach\.$/))){
    return ui.certificatePoints(m[1]);
  }
  if(t.startsWith("🍷 Google-KI-Modus für ")){
    return `🍷 ${ui.googleFor} ${formatDate(dateFromInput(),lang,true)}`;
  }
  if((m=t.match(/^Aggsbach Markt, (\d{2}\.\d{2}\.\d{4})$/))){
    const d=parseGermanNumericDate(m[1]);
    return d?`Aggsbach Markt, ${formatDate(d,lang,false)}`:raw;
  }
  let out=raw;
  Object.entries(ui.weather).forEach(([de,tr])=>{out=out.replaceAll(de,tr)});
  return out;
}

function translateString(raw,lang){
  if(lang==="de")return raw;
  const key=clean(raw); if(!key)return raw;
  const exact=STATIC[lang]?.[key];
  if(exact){
    const lead=String(raw).match(/^\s*/)?.[0]||"";
    const tail=String(raw).match(/\s*$/)?.[0]||"";
    return lead+exact+tail;
  }
  return translateDynamic(raw,lang);
}

function translateElement(root,lang){
  if(lang==="de"||!root)return;
  translating=true;
  try{
    if(root.nodeType===Node.TEXT_NODE){
      const v=translateString(root.nodeValue,lang); if(v!==root.nodeValue)root.nodeValue=v;
      return;
    }
    if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
    const tag=root.tagName;
    if(tag&&["SCRIPT","STYLE","NOSCRIPT"].includes(tag))return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; let n;
    while((n=walker.nextNode())) if(!["SCRIPT","STYLE","NOSCRIPT"].includes(n.parentElement?.tagName))nodes.push(n);
    nodes.forEach(node=>{const v=translateString(node.nodeValue,lang);if(v!==node.nodeValue)node.nodeValue=v});
    const scope=root.querySelectorAll?root:document;
    scope.querySelectorAll?.("[placeholder],[title],[aria-label],[alt]").forEach(el=>{
      ["placeholder","title","aria-label","alt"].forEach(a=>{
        if(el.hasAttribute(a)){
          const before=el.getAttribute(a), after=translateString(before,lang); if(after!==before)el.setAttribute(a,after);
        }
      });
    });
  } finally {translating=false;}
}

function applyMessage(lang){
  const m=M[lang]||M.de,d=D[lang]||D.de,root=document.getElementById("chronik");
  if(!root)return;
  const intro=root.querySelector(":scope > p"),entry=root.querySelector("#chronik-willkommen"),admin=root.querySelector("#adminLoginForm button"),status=root.querySelector("#chronicleStatus");
  if(intro)intro.textContent=m.intro;
  if(entry){const h=entry.querySelector("h3"),p=entry.querySelector("p");if(h)h.textContent=m.title;if(p)p.textContent=m.body}
  if(admin)admin.textContent=m.admin||M.de.admin;
  root.querySelectorAll(".chronicle-read-more").forEach(x=>x.textContent=d[0]);
  if(status){const count=status.textContent.match(/^\d+/)?.[0];if(count)status.textContent=`${count} ${d[1]}`;else if(/Noch keine veröffentlichte|No published stor|Zatím nejsou|Zatiaľ nie|Még nincsenek|Todavía no|Aucune histoire/.test(status.textContent))status.textContent=m.empty||M.de.empty}
}

function localizeMeta(lang){
  if(lang==="de"||!META[lang])return;
  const meta=META[lang];
  document.title=meta.title;
  const desc=document.querySelector('meta[name="description"]'); if(desc)desc.content=meta.description;
  const ogLocale=document.querySelector('meta[property="og:locale"]'); if(ogLocale)ogLocale.content=OG_LOCALE[lang];
  const ogTitle=document.querySelector('meta[property="og:title"]'); if(ogTitle)ogTitle.content=meta.title;
  const ogDesc=document.querySelector('meta[property="og:description"]'); if(ogDesc)ogDesc.content=meta.description;
}

function localizeWeatherChart(lang){
  if(lang==="de"||!window.zabWeatherChart||!UI[lang])return;
  const c=window.zabWeatherChart, labels=UI[lang].chart;
  if(c.data?.datasets?.[0])c.data.datasets[0].label=labels[0];
  if(c.data?.datasets?.[1])c.data.datasets[1].label=labels[1];
  if(c.data?.datasets?.[2])c.data.datasets[2].label=labels[2];
  if(c.options?.scales?.y?.title)c.options.scales.y.title.text=labels[3];
  if(c.options?.scales?.y1?.title)c.options.scales.y1.title.text=labels[4];
  try{c.update("none")}catch(e){try{c.update()}catch(_){} }
}

function value(id){return document.getElementById(id)?.value||"_____"}
function localizedArrivalMessage(lang){
  if(lang==="de"||!MESSAGE[lang])return null;
  const m=MESSAGE[lang];
  return `${m.hello}\n${m.arrivalIntro}\n\n🕒 ${m.arrival}: ${value("arrivalTime")}\n🧭 ${m.arrivalMode}: ${value("arrivalMode")}\n🥐 ${m.breakfastTime}: ${value("breakfastTime")}\n🧳 ${m.luggage}: ${value("luggageTransport")}\n🥨 ${m.snack}: ${value("snackBoard")}\n👥 ${m.guests}: ${value("guestCount")}\n📝 ${m.requests}: ${value("specialRequests")}\n\n${m.thanks}`;
}
function localizedBookingMessage(lang){
  if(lang==="de"||!MESSAGE[lang])return null;
  const m=MESSAGE[lang];
  return `${m.hello}\n${m.bookingIntro}\n\n📅 ${m.arrival}: ${value("bookingArrival")}\n📅 ${m.departure}: ${value("bookingDeparture")}\n👥 ${m.guests}: ${value("bookingGuests")}\n🛏️ ${m.room}: ${value("bookingRoom")}\n🥐 ${m.breakfast}: ${value("bookingBreakfast")}\n📝 ${m.message}: ${value("bookingMessage")}\n\n${m.thanks}`;
}
function localizedSnackMessage(lang){
  if(lang==="de"||!MESSAGE[lang])return null;
  const m=MESSAGE[lang];
  return `${m.hello}\n${m.snackIntro}\n\n🥨 ${m.snack}: 2\n💶 ${m.price}: 29,80 €\n🕒 ${m.arrival}: _____\n👥 ${m.guests}: _____\n🧀 ${m.requests}: _____\n\n${m.thanks}`;
}

function refreshActionLinks(lang){
  if(lang==="de"||!MESSAGE[lang])return;
  const m=MESSAGE[lang];
  const arrivalMessage=localizedArrivalMessage(lang);
  const wa=document.getElementById("arrivalWhatsApp"), sms=document.getElementById("arrivalSms");
  if(wa&&arrivalMessage)wa.href="https://wa.me/436646437526?text="+encodeURIComponent(arrivalMessage);
  if(sms&&arrivalMessage)sms.href="sms:+436646437526?body="+encodeURIComponent(arrivalMessage);
  const booking=document.getElementById("bookingWhatsApp"), bookingMessage=localizedBookingMessage(lang);
  if(booking&&bookingMessage)booking.href="https://wa.me/436646437526?text="+encodeURIComponent(bookingMessage);
  const snack=document.getElementById("snackWhatsApp"), snackMessage=localizedSnackMessage(lang);
  if(snack&&snackMessage)snack.href="https://wa.me/436646437526?text="+encodeURIComponent(snackMessage);
  const url="https://topdiveair-sketch.github.io/Gaeste/";
  const recommend=`${m.recommend} ${url}`;
  const recommendWa=document.getElementById("whatsappRecommend"); if(recommendWa)recommendWa.href="https://wa.me/?text="+encodeURIComponent(recommend);
  const recommendMail=document.getElementById("mailRecommend"); if(recommendMail)recommendMail.href="mailto:?subject="+encodeURIComponent(m.recommendSubject)+"&body="+encodeURIComponent(recommend);
  const service=[m.serviceBreakfast,m.serviceSnack,m.serviceLuggage];
  document.querySelectorAll('#service a[href*="wa.me/436646437526?text="]').forEach((a,i)=>{if(service[i])a.href="https://wa.me/436646437526?text="+encodeURIComponent(service[i])});
}

function installFunctionPatches(){
  const originalArrival=window.buildArrivalMessage;
  if(typeof originalArrival==="function")window.buildArrivalMessage=function(){return localizedArrivalMessage(activeLang)||originalArrival()};
  const originalBooking=window.buildBookingMessage;
  if(typeof originalBooking==="function")window.buildBookingMessage=function(){return localizedBookingMessage(activeLang)||originalBooking()};
  const originalDateLabel=window.dateLabel;
  if(typeof originalDateLabel==="function")window.dateLabel=function(){return activeLang==="de"?originalDateLabel():formatDate(dateFromInput(),activeLang,true)};
  const originalAiUrl=window.aiUrl;
  if(typeof originalAiUrl==="function")window.aiUrl=function(){
    if(activeLang==="de"||!MESSAGE[activeLang])return originalAiUrl();
    const q=MESSAGE[activeLang].heurigen(formatDate(dateFromInput(),activeLang,true));
    return "https://www.google.com/search?udm=50&q="+encodeURIComponent(q);
  };
  const originalReset=window.resetChallenge;
  if(typeof originalReset==="function")window.resetChallenge=function(){
    if(activeLang==="de")return originalReset();
    const nativeConfirm=window.confirm;
    window.confirm=function(){return nativeConfirm(UI[activeLang]?.reset||STATIC[activeLang]?.["Wachau-Challenge wirklich zurücksetzen?"]||"Reset?")};
    try{return originalReset()}finally{window.confirm=nativeConfirm}
  };
}

function applyAll(lang){
  activeLang=normalizeLang(lang);
  if(activeLang==="de")return;
  applyMessage(activeLang);
  translateElement(document.body,activeLang);
  localizeMeta(activeLang);
  refreshActionLinks(activeLang);
  localizeWeatherChart(activeLang);
  [80,300,1000,2200].forEach(ms=>setTimeout(()=>{if(activeLang!=="de"){translateElement(document.body,activeLang);refreshActionLinks(activeLang);localizeWeatherChart(activeLang)}},ms));
}

function startObserver(){
  if(pageObserver)pageObserver.disconnect();
  pageObserver=new MutationObserver(list=>{
    if(translating||activeLang==="de")return;
    list.forEach(m=>{
      if(m.type==="characterData")translateElement(m.target,activeLang);
      m.addedNodes?.forEach(n=>translateElement(n,activeLang));
    });
    refreshActionLinks(activeLang);
    localizeWeatherChart(activeLang);
  });
  if(document.body)pageObserver.observe(document.body,{childList:true,subtree:true,characterData:true});
}

const timer=setInterval(()=>{
  if(typeof window.setLang!=="function")return;
  clearInterval(timer);
  installFunctionPatches();
  const previous=window.setLang;
  window.setLang=function(lang){
    activeLang=normalizeLang(lang);
    previous(lang);
    if(activeLang!=="de")setTimeout(()=>applyAll(activeLang),30);
  };
  startObserver();
  const saved=normalizeLang(localStorage.getItem("zabLang")||(navigator.language||"de"));
  activeLang=saved;
  setTimeout(()=>applyAll(saved),90);
},5);

document.addEventListener("DOMContentLoaded",()=>{
  startObserver();
  setTimeout(()=>applyAll(activeLang),120);
  document.querySelectorAll(".language-bar button[data-lang]").forEach(button=>button.addEventListener("click",()=>setTimeout(()=>applyAll(normalizeLang(button.dataset.lang)),100)));
});
})();
