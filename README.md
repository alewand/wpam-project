# Projekt na WPAM (Wstęp do programowania aplikacji mobilnych, Politechnika Warszawska)

"Don't eat so much" - Aplikacja mobilna do śledzenia i zapisywania posiłków oraz ich wartości odżywczych

## 📋 Opis

Aplikacja pozwala użytkownikom na:

- Rejestrację i logowanie
- Skanowanie kodów kreskowych produktów
- Dodawanie i edycję posiłków
- Śledzenie dziennych wartości odżywczych (kalorie, białko, tłuszcz, węglowodany)
- Ustawianie dziennych limitów wartości odżywczych
- Zarządzanie profilem użytkownika

## 🏗️ Struktura projektu

```
wpam-project/
├── dont-eat-so-much-mobile/    # Aplikacja mobilna (React Native/Expo)
└── dont-eat-so-much-server/     # Backend API (NestJS)
```

## Wymagania

- Node.js (v18+)
- npm lub yarn
- Docker i Docker Compose (dla serwera)
- Expo CLI (dla aplikacji mobilnej)

## 📱 Funkcjonalności

### Ekrany

- **Welcome** - Ekran powitalny z opcjami logowania/rejestracji
- **Login/Register** - Logowanie i rejestracja użytkownika
- **Meal** - Lista posiłków z danego dnia z paskiem postępu wartości odżywczych
- **Search Meal** - Wyszukiwanie i dodawanie posiłków
- **Scanner** - Skanowanie kodów kreskowych produktów
- **Add Meal** - Dodawanie własnych posiłków z wartościami odżywczymi
- **Consumed Meal** - Szczegóły, edycja i usuwanie posiłków
- **Profile** - Zarządzanie profilem, limitami i ustawieniami

### Główne funkcje

- **Śledzenie wartości odżywczych** - Automatyczne obliczanie wartości na podstawie ilości produktu
- **Dzienne limity** - Ustawianie limitów kalorii, białka, tłuszczu i węglowodanów
- **Wielojęzyczność** - Obsługa polskiego i angielskiego
- **Skaner kodów kreskowych** - Szybkie dodawanie produktów
- **Historia posiłków** - Przeglądanie posiłków z różnych dni

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
