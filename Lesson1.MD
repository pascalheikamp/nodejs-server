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

Een seeder maken in het project. 

een seed functie maken wat gebruik gaat maken van een post

