# CLAUDE.md — Care Almere cv-formulier

Dit document is de werkinstructie voor Claude Code bij het bewerken van het live intakeformulier voor Stichting Care Almere. Lees dit volledig voor je een taak uitvoert. Sla geen secties over.

Het doel van dit project is bewust klein en snel: kleine iteraties doen op één live HTML-bestand, zodat een aanpassing meteen zichtbaar is voor Timon en voor meekijkers (zoals Georgina). Geen build-stap, geen framework, geen overbouw. Als een taak dit principe lijkt te doorbreken, leg hem dan eerst voor.

\---

## 1\. Projectoverzicht

**Eigenaar:** Timon Kool
**Context:** Vrijwilligerswerk voor Stichting Care Almere, een Nederlandse stichting gericht op armoedebestrijding. Dit formulier hoort bij het Jobmatch-traject (jobcoaching via Missiecentrum De Wegwijzer), in samenwerking met Georgina (jobcoach).
**Doel van het formulier:** Een kandidaat vult zelf het formulier in. Bij afronden genereert de pagina één tekstblok (masterprompt + de antwoorden) dat de kandidaat met één druk op de knop naar het klembord kopieert en in een chatbot naar keuze plakt. Daar rolt een cv en een motivatiebrief uit. De pagina roept zelf geen AI aan.
**Status:** Live en in gebruik, definitieve versie. Wordt iteratief aangescherpt, mede op basis van input van Georgina en van kandidaten.

**Tech:** Eén `index.html` met inline CSS en vanille JavaScript. Geen React, geen Vite, geen build-stap, geen npm-packages. Geen externe libraries behalve eventueel Google Fonts via `<link>`.

**Hosting / deploy:** GitHub-repository gekoppeld aan timonkool.nl. **Een push naar `main` zet de wijziging direct live.** Er is geen aparte build of preview-omgeving. Behandel elke commit naar `main` dus als een publicatie.

**Live op:** `http://timonkool.nl/Care-Almere-cv-formulier/`

**Branch:** Alles direct naar `main`. Geen feature branches.

> ⚠️ Omdat `main` = live, is elke wijziging meteen zichtbaar voor wie de link heeft. Zie sectie 6 (werkwijze) voor wat dit betekent voordat je commit.

\---

## 2\. Bestandsstructuur

Houd dit minimaal. Maak geen nieuwe mappen of bestanden aan zonder expliciete goedkeuring.

```
/
├── index.html          # Het volledige formulier: opmaak (inline CSS) + logica (inline JS)
├── masterprompt.js     # De cv-masterprompt als losse constante (zie sectie 4)
├── masterprompt-motivatiebrief.js # De motivatiebrief-masterprompt als losse constante (zie sectie 4)
├── templates.js        # De zes cv-templates + kleurvarianten + beschrijvingen (laatste stap)
├── templates/previews/ # Preview-afbeeldingen per template/kleur (.webp), gerenderd uit de Word-templates
├── CLAUDE.md           # Dit document
└── README.md           # Korte uitleg van de repo
```

Het formulier is bewust één bestand. Splits `index.html` niet op in losse CSS/JS-bestanden zonder dat eerst voor te leggen; de eenvoud van één bestand is hier een feature, niet een tekortkoming.

De enige bewuste uitzondering zijn de masterprompts, die in aparte bestanden staan (`masterprompt.js` voor het cv en `masterprompt-motivatiebrief.js` voor de motivatiebrief), omdat die los van het formulier vaak veranderen. Bij afronden bouwt `index.html` één gedeeld gegevensblok van de kandidaat en plakt dat achter elke masterprompt; zo ontstaan twee te kopiëren teksten (cv en motivatiebrief). Zie sectie 4.

\---

## 3\. Wat je zelfstandig mag doen

Voer uit zonder eerst te vragen:

* Spelfouten en interpunctie corrigeren in tekst en code
* Vraagteksten, voorbeelden en hints herformuleren als daarom gevraagd wordt
* Antwoordopties (chips) toevoegen, verwijderen of hernoemen binnen een bestaande vraag
* Bugfixes: kapotte knoppen, een chip die niet aan/uit gaat, een veld dat niet meekomt in de output, opmaak die breekt op een schermgrootte
* CSS-aanpassingen die direct voortvloeien uit een gevraagde wijziging
* De volgorde van vragen binnen een bestaand blok aanpassen

## 4\. Wat je altijd eerst moet voorleggen

Leg voor met korte toelichting en wacht op goedkeuring:

* Een hele vraag toevoegen of verwijderen (raakt de lengte/drempel-afweging, zie sectie 5)
* Een vraag tussen het verplichte (Blok 1) en optionele (Blok 2) blok verplaatsen
* De masterprompt inhoudelijk wijzigen
* De structuur van het gegenereerde tekstblok wijzigen (de output die naar het klembord gaat)
* Iets toevoegen dat data opslaat of verstuurt (zie sectie 5, dit is in principe verboden)
* `index.html` opsplitsen, een framework of npm-package introduceren, of de bestandsstructuur veranderen
* Een nieuwe vraag waarbij een open invulveld verplicht is voor de doelgroep

Bij twijfel: voorleggen, niet zelf beslissen.

\---

## 5\. Harde regels (privacy, doelgroep, masterprompt)

### Privacy en data

* Het formulier slaat **niets** op en verstuurt **niets**. Geen `localStorage`, geen `sessionStorage`, geen fetch naar een server, geen analytics. Alle antwoorden bestaan alleen in het geheugen van de pagina tot de gebruiker hem sluit.
* Dit is geen technisch detail maar een kernprincipe vanwege AVG en de kwetsbare doelgroep. Voeg nooit opslag of verzending toe zonder dat expliciet voor te leggen (sectie 4).
* Zet nooit echte persoonsgegevens in de code, ook niet als voorbeeld. De voorbeeldnaam in placeholders is fictief en blijft fictief.
* De live link is onvindbaar (nergens naartoe gelinkt) maar niet beveiligd. Behandel de pagina als openbaar.

### Doelgroep (bepaalt elke ontwerpkeuze)

* Kandidaten hebben vaak afstand tot de arbeidsmarkt, beperkte digitale vaardigheid, en soms alleen een telefoon. **Mobielvriendelijk is leidend**, niet optioneel.
* Veel kandidaten onderschatten hun eigen ervaring (opgebouwd via vrijwilligerswerk, mantelzorg). Vragen blijven daarom **gedragsgericht en concreet** (concrete situaties, taken, hoe vaak, hoe lang), niet open en abstract. Herschrijf een vraag nooit naar een vage zelfbeoordeling ("wat zijn je sterke punten").
* Onderscheid twee soorten drempel: **inhoudelijke moeite** (nadenken, reflecteren) is gewenst en mag blijven; **frictiemoeite** (techniek hapert, onduidelijke vraag, te vol scherm) is een bug en moet weg. Maak inhoud niet makkelijker om frictie op te lossen; los de frictie op.
* Begeleide antwoorden (aantikbare chips, keuzes) met steeds een open "anders / vul zelf aan"-veld is de standaardvorm. Houd die combinatie aan bij nieuwe vragen.

### Masterprompt

* De masterprompt staat in `masterprompt.js` en is het onderdeel dat de kwaliteit van het eindresultaat bepaalt. Een dun formulier of een dunne prompt levert een dun cv op.
* De prompt en de antwoorden worden samengevoegd tot het tekstblok dat naar het klembord gaat. Wijzig de samenvoeg-logica niet zonder dat voor te leggen (sectie 4).
* De masterprompt is nooit zichtbaar als gewone tekst in het formulier; hij zit alleen in het gegenereerde, te kopiëren blok.

\---

## 6\. Werkwijze bij een taak

`main` is live. Werk daarom zorgvuldig maar klein. Volg deze volgorde:

1. Lees de taak volledig.
2. Bepaal of de taak onder "zelfstandig" (sectie 3) of "voorleggen" (sectie 4) valt.
3. Identificeer welk bestand geraakt wordt. Een formulier-wijziging zit in `index.html`; een prompt-wijziging in `masterprompt.js`. Raak het andere bestand niet aan tenzij nodig.
4. Controleer tegen de harde regels (sectie 5): geen opslag/verzending toegevoegd, geen persoonsgegevens in code, mobielvriendelijk intact, gedragsgerichte vraagvorm behouden.
5. Voer de wijziging uit in de bestaande stijl (sectie 7).
6. Controleer dat de gegenereerde output (het te kopiëren tekstblok) nog klopt: komt het nieuwe of gewijzigde veld er correct in terug?
7. Controleer de mobiele weergave (smal scherm).
8. Geef een beknopte samenvatting van wat je deed en waarom, en meld expliciet dat de wijziging na commit naar `main` direct live staat.

Voor grotere of onzekere wijzigingen: beschrijf eerst wat je gaat doen en wacht op akkoord, juist omdat er geen preview-omgeving tussen zit.

\---

## 7\. Visuele stijl

Het formulier volgt de huisstijl van Stichting Care Almere (niet Timons persoonlijke saliegroen-stijl). De kleuren en opmaak staan al als CSS-variabelen bovenin `index.html`. Gebruik die variabelen, hardcode geen hex-waarden in losse regels.

### Kernprincipes

* Teal/groenblauw als hoofdkleur (Care Almere-huisstijl), warm en toegankelijk.
* Rustige opmaak, afgeronde hoeken, lichte schaduwen. Geen felle kleuren, geen gradiënten, geen scherpe hoeken.
* Ruim en licht: liever meer witruimte en een extra stap dan een vol scherm. Een vol scherm is frictie voor deze doelgroep.

### Mobiel

* Mobielvriendelijk is leidend. Controleer elke wijziging op een smal scherm (< 520px).
* Knoppen en aantikbare elementen minimaal \~44–48px hoog (vingervriendelijk).
* Tekstvelden ruim genoeg om op een telefoon comfortabel in te typen.

### Voortgang en lengte

* De voortgangsindicator bovenaan blijft kloppen als je stappen toevoegt of verwijdert. Pas de stap-telling mee aan.
* Bij twijfel over lengte: een extra stap met een lichter scherm is beter dan twee vragen op één vol scherm.

### Schrijfstijl in de interface

* **Nooit de em-dash (—).** Vervang door komma, puntkomma, dubbele punt, of herschrijf de zin.
* Geen horizontale lijn (`---`) als scheiding binnen lopende tekst.
* Warm, direct, toegankelijk. Korte zinnen. De kandidaat wordt aangesproken met "je" en "jij", nooit "u".
* Geen AI-achtige openers ("Zeker!", "Absoluut!"). Geen jargon zonder uitleg.
* Voorbeelden bij vragen blijven concreet en herkenbaar voor de doelgroep (een kassa, een app, zorgen voor familie), niet abstract.

\---

## 8\. Veelgemaakte fouten om te vermijden

* Opslag of verzending toevoegen (localStorage, fetch, analytics). Verboden zonder voorleggen; botst met de privacy-kernregel.
* Een vraag naar een vage zelfbeoordeling herschrijven. Houd vragen gedragsgericht en concreet.
* Een open veld verplicht maken bij een vraag waar de doelgroep dichtklapt (bijvoorbeeld "wat anderen over je zeggen" of "waar ben je trots op"). Gebruik daar chips of laat het veld overslaanbaar.
* De voortgangsteller vergeten bij te werken na het toevoegen/verwijderen van een stap.
* Een gewijzigd veld niet terug laten komen in het gekopieerde tekstblok.
* Hex-kleuren hardcoden in plaats van de CSS-variabelen gebruiken.
* `index.html` opsplitsen of een framework introduceren omdat het "netter" zou zijn. De eenvoud is bewust.
* Vergeten dat een commit naar `main` meteen live staat.

\---

*Laatste update: juni 2026*

