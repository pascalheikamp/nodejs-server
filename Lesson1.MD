Voorbereiding Theorieles
• Zoek uit welke http methods er zijn, en waarvoor je ze gebruikt bij RESTful
Webservices.
• Wat betekent de term idempotency?
• Wat betekent LTS

run scripts
package.json
"scripts": {
"nodemon"
}
voor de productie server of development server
webserver een programma wat een request stuurt naar de applicatie

Request safe idenpotent
Get      x     x
Head     x     x
Put            x 
patch          x
delete
post
options x      x

REST client
Headers
Content-type: application/json
de body geef je aan wat wat je wilt veranderen als je een put request gebruikt.

resources zijn notitie met title, description
lijst van notities

mongo db is een no sql database
praten met database doe je met mongoose

Cross origin: data overwisselen tussen backend applicatie en frontend
pre flight: browser stuurt een options om te kijken of een bepaalde request mogelijk is
access-control-allow-origin
Hoe zorg ik dat andere browser er niet bij kunnen

hash code verandert telkens als de paramters voor inloggen aangepast worden. De server gebruikt alleen het wachtwoord.
*allow origin : iedereen kan er bij komen maar ze moeten wel inloggen

application account krijgt gegevens van een derde partij zoals facebook, github, google etc
server provider kan via http gevoelig informatie lekken
https moet er een certificaat aangevraagd worden.
public key encryption 
private key

promise .then is een callback functie.


Een seeder maken in het project. 

een seed functie maken wat gebruik gaat maken van een post

