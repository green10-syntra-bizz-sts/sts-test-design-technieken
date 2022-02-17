# language: nl

Functionaliteit: Het onderwerp van de brainstorm veranderen

  Het moet voor een deelnemer mogelijk blijven om bij te dragen op het vorige onderwerp,
  maar niet meer op het onderwerp daarvoor (gesloten)

  Een facilitator kan het onderwerp van de brainstorm veranderen.
  Zodra het actueel onderwerp verandert, wordt het vorig onderwerp.
  Zodra vorig onderwerp verandert, wordt het een gesloten onderwerp.
  Zodra een gesloten onderwerp verandert, blijft het gesloten.

  Achtergrond:
    Gegeven er is een brainstormsessie beschikbaar zonder onderwerp
    En er is een persoon Hans, met een facilitator rol
    En er is een deelnemer Jeremy, met een deelnemer rol

  Scenario: De brainstorm kan starten met het eerste onderwerp - TC1
    Als Hans een onderwerp "Hoe gaan we het lokaal verfraaien?" creëert
    En Jeremy voor het onderwerp "Hoe gaan we het lokaal verfraaien?" een idee creëert "We gaan bloembakken zetten"
    En Jeremy voor het onderwerp "Hoe gaan we het lokaal verfraaien?" een idee creëert "We zorgen voor warme LED-verlichting"
    Dan zou de status van "Hoe gaan we het lokaal verfraaien?" actueel moeten zijn
    En zou voor het onderwerp "Hoe gaan we het lokaal verfraaien?" het idee "We gaan bloembakken zetten" gecreëerd moeten zijn
    En zou voor het onderwerp "Hoe gaan we het lokaal verfraaien?" het idee "We zorgen voor warme LED-verlichting" gecreëerd moeten zijn
    En is de brainstormsessie "starten met het eerste onderwerp" afgelopen

  Scenario: Het onderwerp van de brainstorm kan een eerste keer veranderen - TC2
    Gegeven Hans heeft een onderwerp "Hoe gaan we het lokaal verfraaien?" gecreëerd
    En Jeremy heeft voor het onderwerp "Hoe gaan we het lokaal verfraaien?" een idee gecreëerd "We gaan bloembakken zetten"
    Als Hans het onderwerp verandert in "Wat doen we met de muren?"
    En Jeremy voor het onderwerp "Wat doen we met de muren?" een idee creëert "Die verven we appelblauw zeegroen"
    En Jeremy voor het onderwerp "Hoe gaan we het lokaal verfraaien?" een idee creëert "We zetten geraniums"
    Dan zou de status van "Wat doen we met de muren?" actueel moeten zijn
    En zou de status van "Hoe gaan we het lokaal verfraaien?" vorig moeten zijn
    En zou voor het onderwerp "Wat doen we met de muren?" het idee "Die verven we appelblauw zeegroen" gecreëerd moeten zijn
    En zou voor het onderwerp "Hoe gaan we het lokaal verfraaien?" het idee "We zetten geraniums" gecreëerd moeten zijn
    En is de brainstormsessie "kan een eerste keer veranderen" afgelopen

  Scenario: Het onderwerp van de brainstorm kan een tweede keer veranderen - TC3
    Gegeven Hans heeft een onderwerp "Hoe gaan we het lokaal verfraaien?" gecreëerd
    En Jeremy heeft voor het onderwerp "Hoe gaan we het lokaal verfraaien?" een idee gecreëerd "We gaan bloembakken zetten"
    En Hans heeft het onderwerp veranderd in "Wat doen we met de muren?"
    En Jeremy heeft voor het onderwerp "Wat doen we met de muren?" een idee gecreëerd "Die verven we appelblauw zeegroen"
    Als Hans het onderwerp verandert in "Veranderen we de vloeren?"
    En Jeremy voor het onderwerp "Veranderen we de vloeren?" een idee creëert "De tegels vervangen"
    En Jeremy voor het onderwerp "Wat doen we met de muren?" een idee creëert "We brengen graffiti aan"
    En Jeremy voor het onderwerp "Wat doen we met de muren?" een idee creëert "Meerbepaald graffiti van Keith Haring"
    En Jeremy voor het onderwerp "Hoe gaan we het lokaal verfraaien?" een idee creëert "Bloempotten met rozen"
    Dan zou de status van "Veranderen we de vloeren?" actueel moeten zijn
    En zou de status van "Wat doen we met de muren?" vorig moeten zijn
    En zou de status van "Hoe gaan we het lokaal verfraaien?" gesloten moeten zijn
    En zou voor het onderwerp "Veranderen we de vloeren?" het idee "De tegels vervangen" gecreëerd moeten zijn
    En zou voor het onderwerp "Wat doen we met de muren?" het idee "We brengen graffiti aan" gecreëerd moeten zijn
    En zou voor het onderwerp "Wat doen we met de muren?" het idee "Meerbepaald graffiti van Keith Haring" gecreëerd moeten zijn
    En zou voor het onderwerp "Hoe gaan we het lokaal verfraaien?" het idee "Bloempotten met rozen" niet mogen gecreëerd zijn
    En is de brainstormsessie "kan een tweede keer veranderen" afgelopen

  Scenario: Het onderwerp van de brainstorm kan een derde en volgende keer veranderen - TC4 en TC5
    Gegeven Hans heeft een onderwerp "Hoe gaan we het lokaal verfraaien?" gecreëerd
    En Jeremy heeft voor het onderwerp "Hoe gaan we het lokaal verfraaien?" een idee gecreëerd "We gaan bloembakken zetten"
    En Hans heeft het onderwerp veranderd in "Wat doen we met de muren?"
    En Jeremy heeft voor het onderwerp "Wat doen we met de muren?" een idee gecreëerd "Die verven we appelblauw zeegroen"
    En Hans heeft het onderwerp veranderd in "Veranderen we de vloeren?"
    En Jeremy heeft voor het onderwerp "Veranderen we de vloeren?" een idee gecreëerd "De tegels vervangen"
    Als Hans het onderwerp verandert in "Kunnen we iets met muziek doen?"
    En Hans het onderwerp verandert in "Zijn er mogelijkheden met geuren?"
    En Jeremy volgende ideeën creëert:
      | bij_onderwerp                      | idee                           |
      | Kunnen we iets met muziek doen?    | Voortdurend achtergrondmuziek  |
      | Veranderen we de vloeren?          | Vasttappijt leggen             |
      | Wat doen we met de muren?          | Sober wit is heel speciaal     |
      | Hoe gaan we het lokaal verfraaien? | Bronzen beelden                |
    Dan zou de status van de onderwerpen als volgt moeten zijn:
      | onderwerp                          | status   |
      | Zijn er mogelijkheden met geuren?  | actueel  |
      | Kunnen we iets met muziek doen?    | vorig    |
      | Veranderen we de vloeren?          | gesloten |
      | Wat doen we met de muren?          | gesloten |
      | Hoe gaan we het lokaal verfraaien? | gesloten |
    En zouden volgende ideeën al dan niet moeten gecreëerd zijn:
      | bij_onderwerp                      | idee                           | gelukt |
      | Kunnen we iets met muziek doen?    | Voortdurend achtergrondmuziek  |   ok   |
      | Veranderen we de vloeren?          | Vasttappijt leggen             |  niet  |
      | Wat doen we met de muren?          | Sober wit is heel speciaal     |  niet  |
      | Hoe gaan we het lokaal verfraaien? | Bronzen beelden                |  niet  |
    En is de brainstormsessie "kan een derde en volgende keer veranderen" afgelopen