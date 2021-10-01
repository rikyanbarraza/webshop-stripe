Göfab Tian
------------------------------------------------------------
En webshop inspirerad på en gammal klassiker med node.JS, stripe och Bootstrap
------------------------------------------------------------

Följande krävs för att få hemsidan att fungera:
-----------------------------------------------------------
1. NodeJs ( https://nodejs.org/en/download/ )

2. Installeras via terminalen i din text editor:<br>
*express ( npm install express )<br>
*Node ( npm init )<br>
*dotenv ( npm install dotenv )<br>
*Stripe ( npm install stripe --save )<br>
*Nodemon ( npm install -g nodemon )<br>

3. Skapa en fil med namn ".env" i root mappen av projektet och lägg in din Secret key av Stripe.<br>
tex. " STRIPE_SECRET_KEY=sk_test_51**************************************************** "

4. Även redigera in din "Publishable key" som du får av Stripe.<br>
Filen du redigerar är "public/script.js" under "rad 4"<br>
tex " let stripe = Stripe('pk_test_51*************************************************') "

5. Eter allt detta har följts så startar du projektet i din text editors terminal med följande commando:<br>
"Npm start"

------------------------------------------------------------
Krav för godkänt:
1.	Ni skall bygga en simpel webshop med valfri stack.
2.	Er webbshop skall ha som minst två sidor, en där produkter listas (startsida) samt en där en kundvagn finns.
3.	Det skall gå att genomföra ett köp och få en bekräftelse av att köpet genomförts.
4.	Efter verifikation ifrån Stripe att ett köp genomförts skall ordern sparas i en JSON-fil på servern.<br>
(sparas i filen items.json)
5.	Vid verifikation att köpet är gjort skall det ej vara möjligt att en dublett av ordern sparas. i JSON-filen (kolla om ordern redan existerar i JSON-filen).

6. Adressen till hemsidan är localhost:3000
(Git & GitHub har använts.
Projektmappen innehåller en README.md fil (läs ovan för mer info).
Uppgiften lämnas in i tid!)

--------------------------------------------------------------
Bugar
-------------------------------------------------------------
* får inte ut bilder i stripe checkout
--------------------------------------------------------------
Skärmdumpar
--------------------------------------------------------------
![Screenshot 2021-09-30 21 41 40](https://user-images.githubusercontent.com/72126060/135524664-4fffa221-b88c-4224-aa08-90c81018eaef.png)
![Screenshot 2021-09-30 21 42 05](https://user-images.githubusercontent.com/72126060/135524671-c7cdd724-f47b-42c4-89db-cdda0f5af4cc.png)
![Screenshot 2021-09-30 21 42 53](https://user-images.githubusercontent.com/72126060/135524673-6f6c63f6-c158-4e34-9d2d-092afbfcb24c.png)
![Screenshot 2021-09-30 21 43 11](https://user-images.githubusercontent.com/72126060/135524675-12792ca0-81d5-4353-a36e-59c201131297.png)
![Screenshot 2021-09-30 21 44 03](https://user-images.githubusercontent.com/72126060/135524676-707bd8c3-fd7c-416d-bc60-d527b11ca54c.png)
