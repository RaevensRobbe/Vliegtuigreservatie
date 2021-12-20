
# Vliegtuigreservaties
Project Frameworks & AVFSW

## Beschrijving:

- Je kan als klant vluchten boeken die je daarna in een overzicht kan raadplegen
- Als je een vlucht boekt, kan je meerdere zetels boeken
- Per vlucht krijg je een overzicht van welke zetels geboekt zijn en welke nog vrij zijn
- De prijs per vlucht hangt af van de afstand en tijd van het jaar
- Na de vlucht kan je een beoordeling invullen.
- Als vluchtmaatschappij kan je extra vluchten inlassen als er te veel vraag is.
## Testing
#### Admin
- docent@howest.be
- P@ssw0rd

#### User
- user@howest.be
- P@ssw0rd

## Grootste behaalde succes
- Select seat pagina
- Select flight date pagina

## Grootste moeilijkheid
- Testing => Integration test is gelukt maar unit tests niet (errors modules niet kunnen inladen)
- Multilanguage en authenticatie werkend krijgen in docker (niet gelukt)

## Milestones & verdeling
#### 18 okt:
  - [x]  Database structuur is klaar / basic api endpoints (Jelle)
  - [x]  Design is klaar (Robbe)

#### 25 okt:
  - [x]  Homepage api endpoints (Jelle)
  - [x]  Homepage (general layout) (Robbe)

#### 01 nov:
  - [x]  Login / registratie / logout (Jelle)

### 07 nov:
  - [x]  Edit account (Jelle)
  - [x]  Homepage (components) (Robbe)

### 15 nov:
  - [x]  Select flight date pagina (Robbe)
  - [x]  API endpoints tickets (Jelle en Robbe)
  - [x]  Bevestig vlucht pagina (Robbe)

### 22 nov:
  - [x]  Pick your seats pagina (Jelle)
  - [x]  Overzicht vluchten pagina (Robbe)
  - [x]  Ticket pagina (Robbe)

### 29 nov:
  - [x]  API endpoints tickets (Jelle)
  - [x]  Reviews (Robbe)
  - [x]  GraphQL (backend ok frontend nog niet) (Robbe)

### 06 dec:
  - [x]  Admin overview Flights (Robbe)
  - [x]  Admin add flight (Robbe)
  - [X]  Admin edit flight (Jelle)
  - [x]  GraphQL (frontend popular destination cards) (Robbe)

### 13 dec:
  - [x]  Testing (Robbe)
  - [x]  Fixes & bugs zoeken (Robbe)
  - [x]  Swagger (Jelle)

### 21 dec:
  - [x]  Multilanguage (Jelle)
  - [x]  PWA (Robbe)
  - [x]  Fixes (Jelle & Robbe)
  - [x]  Deployment (Jelle)
  - [x]  Documentatie (Jelle & Robbe)
---

## Checklist backend
Backend API
- [ ]  NodeJS Express API die via docker gehost wordt op kubernetes

Database
- [ ]  SQL
- [ ]  Realitme

Auth
- [ ]  Firebase
- [ ]  Minimaal 2 rollen
- [ ]  admin is voorzien

Kwetsbaarheid
- [ ]  CORS
- [ ]  Extra beveiliging tegen Cross Site Forgery, Cross Site Scripting

API Docs
- [ ]  Backend documenteerd zichzelf (GraphQL en Swagger)
- [ ]  Statuscodes bij foutcondities worden gedocumenteerd

Framework
- [ ]  Kies een goede manier om je project te structureren
- [ ]  Via een seeder wordt de database bij opstarten van de applicatie automatisch aangemaakt

Microservices
- [ ]  Gebruik logische microservices in Docker / Kubernetes
- [ ]  Eén service maakt gebruik van gRPC of GraphQL.

FoutControle
- [ ]  Crashen van de applicatie wordt verhinderd door het gebruik van een try/catch
- [ ]  Foutboodschappen worden altijd via een JSON aan de front bezorgd.

Source controle
- [ ]  Source controle gebeurt via GitHub door regelmatig te pushen

Staging / Deployment
- [ ]  De applicatie draait volledig in Docker. 
- [ ]  Container wordt automatisch via GitHub Actions gebuild en gepushed naar een Image 

Registry (DockerHub / Harbor) (met versiebeheer van de Container tags)
- [ ]  Image beschikbaar op DockerHub / Harbor 

### Checklist frontend
Framework
- [X]  Met een JS-framework gemaakt, met TypeScript. (svelte)

Testing
- [ ]  Minstens één unit test. 
- [X]  Minstens één integratie test.

Styling
- [X]  Je werkt met SCSS met een solide achterliggende structuur of tailwindCSS. Je voorziet ghosts, skeletons / loading states. Je voorziet input-validatie en error meldingen. 

PWA
- [X]  De web app kan fullscreen launchen en heeft een correcte PWA-setup

Multi-language
- [X]  De applicatie meertalig maken kan zeker een meerwaarde zijn. 

Error Logging
- [ ]  Het is een meerwaarde om fouten te loggen. 

Development setup
- [X]  Gebruik van codeclimate.com voor code testing en reviews is een meerwaarde. Gebruik de npm-packages op een correcte manier. Geen onnodige npm-packages, correcte flags. 
> https://codeclimate.com/github/RaevensRobbe/Vliegtuigreservatie (Kan geen svelte files lezen)

Staging / Deployment
- [X]  De applicatie draait volledig in Docker. Werken met gitflow is aangeraden
> Applicatie draait in docker maar Multilanguage en admin routes werken niet in docker.

Build optimisation
- [X]  Gebruik vite voor een betere JS-files delivery
> vite, homepage afbeelding is in webp formaat

Eigen inbrengen
- Svelte
- Integration test in CI (failed omdat hij niet aan de backend kan)
- Transities
