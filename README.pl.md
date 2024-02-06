Nazwa projektu
H2Ometer Backend

Opis
Ten projekt służy jako backend dla aplikacji H2Ometer. Odpowiada za obsługę rejestracji użytkowników, danych dotyczących spożycia wody i aktualizacji profilu użytkownika.

Technologie
Node.js
Express.js
MongoDB
Mongoose
JWT do uwierzytelniania
bcrypt do hashowania haseł
Swagger do dokumentowania API
Cloudinary
NanoId
Wymagania systemowe
Node.js (wersja 14.0.0 lub nowsza)
MongoDB (wersja 4.0 lub nowsza)
Instalacja i konfiguracja
Sklonuj repozytorium:

bash
Copy code
git clone https://github.com/Jarevych/H2Ometer_back

Zainstaluj zależności:
cd h2ometer-backend
npm install

Skonfiguruj zmienne środowiskowe:

Utwórz plik .env w głównym katalogu projektu i zdefiniuj następujące zmienne:
PROJECT_NAME='H2Ometer'
NODE_ENV=production
PORT=''
BASE_URL_FRONT=""
MONGO_URL=''
JWT_KEY=''
JWT_EXP=''
USER_UKRNET=''
UKRNET_PASSWORD=''
CLOUDINARY_NAME=''
CLOUDINARY_KEY=''
CLOUDINARY_SECRET=''

Uruchom aplikację:
npm run dev
Dokumentacja API
Dokumentacja Swagger API jest dostępna pod adresem:

Swagger Documentation

Deweloperzy
YAROSLAV GRABOVYCH - TeamLead BackEnd
OLEKSANDR FEDORENKO - Deweloper BackEnd
VITALII NEZHYVENKO - Deweloper BackEnd
YEVHEN LYBIN - Deweloper BackEnd