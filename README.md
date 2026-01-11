# Projekt na WPAM (Wstęp do programowania aplikacji mobilnych, Politechnika Warszawska)

"Don't eat so much" - Aplikacja mobilna do śledzenia i zapisywania posiłków oraz ich wartości odżywczych. 

## 📋 Opis

Umożliwia użytkownikowi śledzenie w jaki dzień co spożył, ile miało to kalorii i ile danych makroskładników i sprawdzenie czy nie przekroczył ustawionych przez siebie limitów.
Zawiera w sobie skaner kodów kreskowych, który umożliwia natychmiastowe dodanie spożytego produktu. W celu pobrania tych posiłków używane jest publiczne api OpenFoodFacts, chyba że dany produkt istnieje już w bazie danych. Jeżeli posiłek nie istnieje w bazie danych ani w api to można go dodać ręcznie i później wielorazowo z niego korzystać. Możemy też korzystać z produktów dodanych przez innych użytkowników, wystarczy wpisać wybraną frazę i je wyszukać.
Aplikacja jest podłączona do serwera więc mamy mechanizm rejestracji kont i logowania oraz autorizacji JWT, aby aplikacja mogła bez przeszkód pobierać zapisane posiłki. Mamy też wszelkie operacje związane z kontem użytkownika takie jak zmiana hasła, zmiana imienia, maila, usunięcie konta, wylogowanie i wylogowanie ze wszystkich urządzeń. 
Wspierane są dwa języki angielski i polski co można zmienić w ustawieniach w profilu użytkownika.

## 📱 Funkcjonalności

### Ekrany i ich funkcje

- **Welcome** - Ekran powitalny z opcjami logowania/rejestracji

![Welcome Screen](/images/welcomeScreen.jpg)

- **Login** - Logowanie z walidacją pól w czasie rzeczywistym

![Login Screen](/images/loginScreen.jpg)

- **Register** - Rejestracja użytkownika

![Register Screen](/images/registerScreen.jpg)

- **Meal** - Lista posiłków z danego dnia z paskiem postępu wartości odżywczych

![Meal Screen](/images/mealScreen.jpg)

- **Search Meal** - Wyszukiwanie posiłków dodanych do bazy i możliwość dodania ich jako spożytych

![Search Meal Screen](/images/searchMealScreen.jpg)

- **Scanner** - Skanowanie kodów kreskowych produktów z możliwością ręcznego wprowadzenia kodu

![Scanner Screen](/images/scannerScreen.jpg)

- **Add Meal** - Dodawanie własnych posiłków z wartościami odżywczymi do bazy

![Add Meal Screen](/images/addMealScreen.jpg)

- **Consumed Meal** - Szczegóły, edycja i usuwanie posiłków

![Consumed Meal Screen](/images/addConsumedMealScreen.jpg)

- **Profile** - Zarządzanie profilem, limitami i ustawieniami, zmiana imienia, hasła, maila, języka, wylogowanie, usunięcie konta

![Profile Screen](/images/profileScreen.jpg)
![Profile Screen 2](/images/profileScreen2.jpg)
![Profile Screen 3](/images/profileScreen3.jpg)

## 🛠️ Technologie

### Mobile

- React Native (Expo)
- TypeScript
- Redux Toolkit
- React Navigation
- i18next
- Formik + Yup
- Luxon

### Backend

- NestJS
- TypeScript
- PostgreSQL
- Drizzle ORM
- JWT
- bcrypt

## 🏗️ Struktura projektu

```
wpam-project/
├── dont-eat-so-much-mobile/    # Aplikacja mobilna (React Native/Expo)
└── dont-eat-so-much-server/     # Backend API (NestJS)
```

## 📁 Struktura katalogów

### Mobile (`dont-eat-so-much-mobile/src/`)

```
src/
├── components/      # Komponenty wielokrotnego użytku
├── screens/         # Ekrany aplikacji
├── navigation/      # Konfiguracja nawigacji
├── store/          # Redux store (state management)
├── hooks/          # Custom hooks
├── utils/          # Funkcje pomocnicze
├── constants/       # Stałe aplikacji
└── locales/        # Tłumaczenia (pl, en)
```

### Server (`dont-eat-so-much-server/src/`)

```
src/
├── auth/           # Autentykacja i autoryzacja
├── user/           # Zarządzanie użytkownikami
├── meals/          # Zarządzanie posiłkami
├── consumedMeals/  # Śledzenie spożytych posiłków
├── drizzle/        # Schemat bazy danych
└── guards/         # Guards (ochrona endpointów)
```

## 🌐 API

Główne endpointy:

- `/auth/login` - Logowanie
- `/auth/register` - Rejestracja
- `/auth/logout` - Wylogowanie
- `/user/profile` - Profil użytkownika
- `/meals` - Lista posiłków
- `/consumed-meals` - Zarządzanie spożytymi posiłkami
