/*
  templates.js — Care Almere cv-formulier
  ------------------------------------------------------------------
  De zes cv-templates die de deelnemer in stap 7 kan kiezen. Staat los
  van index.html omdat dit los van het formulier verandert (zie CLAUDE.md).

  Per template:
    id          - korte sleutel (komt terug in de bestandsnamen van de previews)
    naam        - weergavenaam in het formulier
    omschrijving- uitgebreide, concrete beschrijving die in de prompt belandt,
                  zodat de AI het template dicht kan benaderen in Word
    kleuren[]   - de kleurvarianten uit de originele template-zips:
                    id   sleutel (= deel van de bestandsnaam)
                    naam Nederlandse label op de swatch
                    hex  accentkleur (uit de docx/preview gehaald) voor de swatch
                    img  preview-afbeelding van het template in die kleur

  De previews zijn gerenderd uit de originele Word-templates en staan in
  templates/previews/<id>-<kleur>.webp. Wil je een template of kleur
  toevoegen/wijzigen: pas hier de data aan en zet de bijbehorende preview erbij.

  De beschrijvingen zijn kleur-neutraal: de gekozen accentkleur wordt apart
  in de prompt meegegeven (zie buildPreview / opmaakBlok in index.html).
*/
const TEMPLATES = [
  {
    id:'stylish-modern',
    naam:'Modern',
    omschrijving:
`Indeling: één A4, witte achtergrond, normale marges. Bovenaan een gekleurde balk over de volledige breedte (ongeveer de bovenste 18% van de pagina). Daaronder twee kolommen: links breed (ongeveer 62%) en rechts smal (ongeveer 30%), met witruimte ertussen.
Kop (in de gekleurde balk): de naam in WITTE hoofdletters, groot, met ruime letterafstand, schreefloos. Daaronder de functietitel, ook wit, kleiner, in hoofdletters met ruime letterafstand. Alles links uitgelijnd met wat ruimte vanaf de linkerrand.
Sectiekoppen: in HOOFDLETTERS, donkergrijs en vet, met links een klein afgerond vierkant icoontje in de accentkleur met een wit pictogram erin.
Linkerkolom: begint met een profieltekst (kop bijvoorbeeld "Profiel") als lopende alinea van een paar regels. Daaronder "Werkervaring": per functie de functietitel vet en donker, op de regel eronder "Werkgever, Plaats | Periode" in kleinere grijze tekst, daarna een bullet-lijst met ronde opsommingstekens.
Rechterkolom: "Contact" (per onderdeel een vet label zoals Telefoon en E-mail, met de waarde op de regel eronder), "Opleiding" (school vet, opleiding cursief eronder) en "Vaardigheden" (een eenvoudige lijst, één per regel, met ruime regelafstand).
Lettertype: strak en modern schreefloos (Inter, Lexend of Poppins). Accentkleur alleen in de bovenbalk en de icoontjes; alle overige tekst donkergrijs of zwart. Sober, zakelijk en rustig.`,
    kleuren:[
      {id:'blue',   naam:'Blauw',  hex:'#799BCD', img:'templates/previews/stylish-modern-blue.webp'},
      {id:'green',  naam:'Groen',  hex:'#A6B784', img:'templates/previews/stylish-modern-green.webp'},
      {id:'orange', naam:'Oranje', hex:'#E19162', img:'templates/previews/stylish-modern-orange.webp'},
      {id:'violet', naam:'Violet', hex:'#908BB9', img:'templates/previews/stylish-modern-violet.webp'},
      {id:'yellow', naam:'Geel',   hex:'#DEAB52', img:'templates/previews/stylish-modern-yellow.webp'},
      {id:'black',  naam:'Zwart',  hex:'#606060', img:'templates/previews/stylish-modern-black.webp'}
    ]
  },
  {
    id:'westminster',
    naam:'Klassiek',
    omschrijving:
`Indeling: één A4, wit, klassiek en symmetrisch.
Kop: volledig gecentreerd. Bovenaan een dunne horizontale lijn over de breedte; daaronder de naam groot en gecentreerd in een elegant schreef-lettertype in HOOFDLETTERS; daaronder de functietitel gecentreerd in de accentkleur; en dan opnieuw een dunne horizontale lijn.
Daaronder twee kolommen, gescheiden door een dunne verticale lijn in het midden. Bovenste rij: links de sectiekop "Contact" met de contactgegevens, elk met een klein rond icoontje ervoor; rechts de kop "Profiel" met een korte alinea.
Daaronder: links de brede kolom "Werkervaring", per functie de functietitel in de accentkleur en vet, daaronder "Werkgever, Plaats | Periode" cursief, dan bullets. Rechts "Opleiding" (school vet, details eronder) en "Vaardigheden": per vaardigheid de naam met daaronder een balk van ongeveer tien kleine rechthoekjes die tot het niveau gevuld zijn in de accentkleur en voor de rest lichtgrijs (een niveau-meter).
Sectiekoppen: groot, in de accentkleur, in een elegant (schreef) lettertype. Lopende tekst schreefloos (Open Sans). Accentkleur in de koppen, de functietitels, de twee horizontale lijnen en de vaardigheidsbalkjes. Verzorgd, klassiek en evenwichtig.`,
    kleuren:[
      {id:'blue',   naam:'Blauw',  hex:'#35598F', img:'templates/previews/westminster-blue.webp'},
      {id:'green',  naam:'Groen',  hex:'#6B7C48', img:'templates/previews/westminster-green.webp'},
      {id:'orange', naam:'Oranje', hex:'#C16025', img:'templates/previews/westminster-orange.webp'},
      {id:'violet', naam:'Violet', hex:'#625B97', img:'templates/previews/westminster-violet.webp'},
      {id:'yellow', naam:'Geel',   hex:'#A47520', img:'templates/previews/westminster-yellow.webp'},
      {id:'black',  naam:'Zwart',  hex:'#272828', img:'templates/previews/westminster-black.webp'}
    ]
  },
  {
    id:'venture',
    naam:'Strak',
    omschrijving:
`Indeling: één A4, wit, met heel veel witruimte; minimalistisch en goed leesbaar (ook ATS-vriendelijk).
Bovenaan: één gecentreerde regel met de contactgegevens in de accentkleur, klein, gescheiden door bolletjes (bijvoorbeeld telefoon • e-mail • linkedin • plaats).
Daaronder twee kolommen. Linkerkolom smal (ongeveer 33%): de naam groot en vet (mag over twee regels), daaronder de functietitel in grijze hoofdletters. Daarna de secties "Profiel", "Opleiding", "Certificaten" en "Vaardigheden"; elke sectiekop in de accentkleur en in hoofdletters. Vaardigheden als nette losse regels (eventueel licht onderstreept) in de accentkleur; certificaten als bullets.
Rechterkolom breed (ongeveer 60%): de sectiekop "Werkervaring" in de accentkleur; daaronder de functies als een verticale tijdlijn, dus een dunne verticale lijn met bij elke functie een klein rond icoontje (in de accentkleur). Per functie: de functietitel vet, daaronder "Werkgever, Plaats, Periode" in grijs, dan kleine bullets.
Subtiel detail: een klein gekleurd hoekvlak linksonder in de accentkleur.
Lettertype: strak geometrisch schreefloos (DM Sans, Inter). Accentkleur spaarzaam gebruiken: de contactregel, de koppen, de tijdlijn-icoontjes, de vaardigheden en het hoekvlak. Rustig, modern en heel goed leesbaar.`,
    kleuren:[
      {id:'blue',   naam:'Blauw',  hex:'#619DF9', img:'templates/previews/venture-blue.webp'},
      {id:'green',  naam:'Groen',  hex:'#419581', img:'templates/previews/venture-green.webp'},
      {id:'purple', naam:'Paars',  hex:'#83619B', img:'templates/previews/venture-purple.webp'},
      {id:'red',    naam:'Rood',   hex:'#993939', img:'templates/previews/venture-red.webp'},
      {id:'yellow', naam:'Geel',   hex:'#C98D3F', img:'templates/previews/venture-yellow.webp'},
      {id:'black',  naam:'Zwart',  hex:'#484866', img:'templates/previews/venture-black.webp'}
    ]
  },
  {
    id:'photo',
    naam:'Met foto',
    omschrijving:
`Indeling: één A4, wit.
Kop: links de naam groot in de accentkleur in een sierlijk schreef-lettertype (Cormorant), daaronder de functietitel in grijs; rechtsboven een ronde foto met een rand in de accentkleur. Onder de naam een contactregel met kleine accentkleurige icoontjes (telefoon, plaats, e-mail, website), verdeeld over twee kolommen.
Daaronder twee kolommen. Linkerkolom breed (ongeveer 62%) met een heel lichte achtergrond in de accentkleur (zachte tint): de sectiekop "Werkervaring" in de accentkleur en in hoofdletters; de functies als een tijdlijn met links een klein omkaderd datumblokje (bijvoorbeeld "mei 2019 / heden"), daarnaast de functietitel in de accentkleur en vet, de werkgever in grijs, dan bullets. Rechterkolom smal (ongeveer 34%, wit): "Profiel" (accentkop) met een alinea, "Opleiding" (datum, opleiding vet, school) en "Vaardigheden" als rijen: de naam met daarnaast een rij van ongeveer tien bolletjes die tot het niveau gevuld zijn in de accentkleur en voor de rest lichtgrijs.
Lettertype: Cormorant SC voor de naam en koppen (schreef, hoofdletters) met Source Sans of Inter voor de lopende tekst. Accentkleur in de naam, de koppen, de fotorand, de lichte linkerkolom, de datumblokjes en de vaardigheidsbolletjes. Vriendelijk, modern en met foto.`,
    kleuren:[
      {id:'blue',    naam:'Blauw',   hex:'#03396C', img:'templates/previews/photo-blue.webp'},
      {id:'teal',    naam:'Teal',    hex:'#217C7C', img:'templates/previews/photo-teal.webp'},
      {id:'magenta', naam:'Magenta', hex:'#B23D8F', img:'templates/previews/photo-magenta.webp'},
      {id:'orange',  naam:'Oranje',  hex:'#FF7E26', img:'templates/previews/photo-orange.webp'},
      {id:'yellow',  naam:'Geel',    hex:'#D77F00', img:'templates/previews/photo-yellow.webp'},
      {id:'black',   naam:'Zwart',   hex:'#262626', img:'templates/previews/photo-black.webp'}
    ]
  },
  {
    id:'fashionable',
    naam:'Trendy',
    omschrijving:
`Indeling: één A4, wit, met een smalle linkerzijbalk (ongeveer 30%) en een brede hoofdkolom rechts.
Linkerzijbalk: bovenaan een rechthoekige (staande) foto over de volle balkbreedte, direct daaronder een gevuld blok in de accentkleur. Daaronder de contactgegevens met ronde accentkleurige icoontjes; dan "Opleiding", "Vaardigheden" en "Extra vaardigheden", met zwarte vette koppen in hoofdletters en bullet-lijsten.
Hoofdkolom rechts: de naam groot, met de VOORNAAM in de accentkleur en de ACHTERNAAM in zwart; daaronder de functietitel klein en vet; dan een profieltekst. Daarna "Werkervaring": per functie een gevuld afgerond label (een "pill") in de accentkleur met de functietitel in wit erin, met de periode rechts uitgelijnd in grijs op dezelfde hoogte; daaronder werkgever en plaats in grijs, dan bullets. Subtiele warme achtergrondtint rechtsonder.
Lettertype: een eigentijds display-lettertype (Arima) voor de naam, Raleway of Poppins voor de tekst. Accentkleur in de voornaam, het blok onder de foto, de icoontjes en de functietitel-labels. Trendy en eigentijds.`,
    kleuren:[
      {id:'blue',    naam:'Blauw',   hex:'#03396C', img:'templates/previews/fashionable-blue.webp'},
      {id:'green',   naam:'Groen',   hex:'#287878', img:'templates/previews/fashionable-green.webp'},
      {id:'magenta', naam:'Magenta', hex:'#B23D8F', img:'templates/previews/fashionable-magenta.webp'},
      {id:'orange',  naam:'Oranje',  hex:'#FF7E26', img:'templates/previews/fashionable-orange.webp'},
      {id:'yellow',  naam:'Geel',    hex:'#F3BC4C', img:'templates/previews/fashionable-yellow.webp'},
      {id:'black',   naam:'Zwart',   hex:'#3F3F3F', img:'templates/previews/fashionable-black.webp'}
    ]
  },
  {
    id:'colorful',
    naam:'Opvallend',
    omschrijving:
`Indeling: één A4. Een opvallende, volledig gevulde linkerzijbalk in de accentkleur (donker) over de hele hoogte (ongeveer 36% breed), met witte tekst; rechts een witte hoofdkolom.
Linkerzijbalk: bovenaan de naam groot in wit in een schreef-lettertype (mag over twee regels), daaronder de functietitel in lichte tekst. Daarna de secties met verticaal (90 graden gedraaide) labels in kleine donkere "tabs" tegen de linkerrand: "Contact", "Profiel", "Opleiding" en "Vaardigheden". Naast elke tab de bijbehorende inhoud in witte tekst (contactgegevens, profielalinea, opleiding, vaardigheden als bullets).
Hoofdkolom rechts: tegen de linkerrand van deze kolom een verticaal gedraaid label "Werkervaring" (donkere tab), daarnaast de functies: de functietitel vet en donker, "Werkgever, Plaats | Periode" in grijs, dan bullets. Rechtsboven, overlappend met de zijbalk, een zeshoekige (hexagon) foto.
Lettertype: een schreef-lettertype (Bitter) voor de naam, schreefloos (Inter, Lexend) voor de tekst. De accentkleur vult de hele zijbalk en de gedraaide tabs, en omlijst de hexagon-foto. Design-gericht, zelfverzekerd en opvallend.`,
    kleuren:[
      {id:'blue',     naam:'Blauw',    hex:'#252A41', img:'templates/previews/colorful-blue.webp'},
      {id:'burgundy', naam:'Bordeaux', hex:'#5C010E', img:'templates/previews/colorful-burgundy.webp'},
      {id:'green',    naam:'Groen',    hex:'#286450', img:'templates/previews/colorful-green.webp'},
      {id:'orange',   naam:'Oranje',   hex:'#D45C0A', img:'templates/previews/colorful-orange.webp'},
      {id:'violet',   naam:'Violet',   hex:'#2F0C49', img:'templates/previews/colorful-violet.webp'},
      {id:'black',    naam:'Zwart',    hex:'#3F3F3F', img:'templates/previews/colorful-black.webp'}
    ]
  }
];
