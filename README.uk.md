Назва проекту
H2Ometer Backend

Опис
Цей проект виступає в якості бекенду для додатка H2Ometer. Він відповідає за обробку реєстрації користувачів, даних про вживання води та оновлення профілю користувача.

Технології
Node.js
Express.js
MongoDB
Mongoose
JWT для аутентифікації
bcrypt для хешування паролів
Swagger для документації API
Cloudinary
NanoId
Вимоги до системи
Node.js (версія 14.0.0 або новіша)
MongoDB (версія 4.0 або новіша)
Встановлення та налаштування
Клонуйте репозиторій:

bash
Copy code
git clone https://github.com/Jarevych/H2Ometer_back

Встановіть залежності:
cd h2ometer-backend
npm install

Налаштуйте змінні середовища:

Створіть файл .env у корені проекту та визначте наступні змінні:
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

Запустіть додаток:
npm run dev
Документація API
Документація Swagger API доступна за адресою:

Swagger Documentation

Розробники
ЯРОСЛАВ ГРАБОВИЧ - Керівник команди BackEnd
ОЛЕКСАНДР ФЕДОРЕНКО - Розробник BackEnd
ВІТАЛІЙ НЕЖИВЕНКО - Розробник BackEnd
ЄВГЕН ЛИБІН - Розробник BackEnd