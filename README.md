
# Vliegtuigreservaties
## Project Frameworks & AVFSW
Demets Jelle & Raevens Robbe

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
[geschatte tijd] (werkelijke tijd)
#### 18 okt:
  - [x]  Database structuur is klaar (Jelle) [5u] (3u) 
  - [x]  Design is klaar (Robbe) [6u] (8u)

#### 25 okt:
  - [x]  Opzetten api + Homepage api endpoints (Jelle) [10u] (14.5u)
  - [x]  Opzetten svelte + Homepage (general layout) (Robbe) [2u] (6u)

#### 01 nov:
  - [x]  Login / registratie / logout (Jelle) [10u] (13.50u)

### 07 nov:
  - [x]  Edit account (Jelle) [8u] (8.35u)
  - [x]  Homepage (components) (Robbe) [15u] (25u)

### 15 nov:
  - [x]  Select flight date pagina (Robbe) [10u] (22u)
  - [x]  API endpoints tickets (Jelle en Robbe) [2u] (2u)
  - [x]  Bevestig vlucht pagina (Robbe) [5u] (7u)

### 22 nov:
  - [x]  Pick your seats pagina (Jelle) [48u] (52.5u)
  - [x]  Overzicht vluchten pagina (Robbe) [4u] (6u)
  - [x]  Ticket pagina (Robbe) [2u] (8u)

### 29 nov:
  - [x]  Reviews (Robbe) [4u] (7u)
  - [x]  GraphQL (backend ok frontend nog niet) (Robbe) [2u] (6u)

### 06 dec:
  - [x]  Admin overview Flights (Robbe) [6u] (8u)
  - [x]  Admin add flight (Robbe) [2u] (1.5u)
  - [X]  Admin edit flight (Jelle) [3u] (2.5u)
  - [x]  GraphQL (frontend popular destination cards) (Robbe) [9u] (8u)

### 13 dec:
  - [x]  Testing (Robbe) [4u] (20u)
  - [x]  Fixes & bugs zoeken (Robbe) [10u] (6u)
  - [x]  Swagger (Jelle) [4] (7)

### 21 dec:
  - [x]  Multilanguage (Jelle) [10] (20)
  - [x]  PWA (Robbe) [6u] (3u)
  - [x]  Fixes (Jelle & Robbe) [10u] (8u)
  - [x]  Deployment (Jelle) [10] (13)
  - [x]  Documentatie (Jelle & Robbe) [2u] (1.5u)

Totale werktijd: 311.5 uur

---

## Checklist backend
Backend API
- [X]  NodeJS Express API die via docker gehost wordt op kubernetes

Database
- [X]  SQL
- [X]  Realitme

Auth
- [X]  Firebase
- [X]  Minimaal 2 rollen
- [X]  admin is voorzien

Kwetsbaarheid
- [X]  CORS
- [X]  Extra beveiliging tegen Cross Site Forgery, Cross Site Scripting

API Docs
- [X]  Backend documenteerd zichzelf (GraphQL en Swagger)

> Swagger kan je vinden op: localhost:port/api-docs/
- [X]  Statuscodes bij foutcondities worden gedocumenteerd

Framework
- [X]  Kies een goede manier om je project te structureren
- [X]  Via een seeder wordt de database bij opstarten van de applicatie automatisch aangemaakt

Microservices
- [X]  Gebruik logische microservices in Docker / Kubernetes
- [X]  Eén service maakt gebruik van gRPC of GraphQL.

FoutControle
- [X]  Crashen van de applicatie wordt verhinderd door het gebruik van een try/catch
- [X]  Foutboodschappen worden altijd via een JSON aan de front bezorgd.

Source controle
- [X]  Source controle gebeurt via GitHub door regelmatig te pushen

Staging / Deployment
- [X]  De applicatie draait volledig in Docker. 

> Applicatie draait in Docker, graphql en admin authentication werkt niet

- [ ]  Container wordt automatisch via GitHub Actions gebuild en gepushed naar een Image 

Registry (DockerHub / Harbor) (met versiebeheer van de Container tags)
- [X]  Image beschikbaar op DockerHub / Harbor 

>https://hub.docker.com/repository/docker/robberaevens/vliegtuigreservaties-backend

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
