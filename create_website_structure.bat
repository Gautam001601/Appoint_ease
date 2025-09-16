@echo off
echo Creating folders...
mkdir .bolt dist\assets server\database src\components src\contexts src\pages src\services
echo Creating files...
type nul >.bolt\config.json
type nul >.bolt\prompt
type nul >dist\assets\index-DybjYBNFO.css
type nul >dist\assets\index-orhqxITA.js
type nul >dist\index.html
type nul >server\database\schema.sql
type nul >server\index.js
type nul >server\setup-database.js
type nul >src\components\Footer.tsx
type nul >src\components\Header.tsx
type nul >src\contexts\AuthContext.tsx
type nul >src\pages\AboutPage.tsx
type nul >src\pages\ContactPage.tsx
type nul >src\pages\DashboardPage.tsx
type nul >src\pages\DiagnosticPage.tsx
type nul >src\pages\DoctorAppointmentsPage.tsx
type nul >src\pages\HomePage.tsx
type nul >src\pages\HomeVisitPage.tsx
type nul >src\pages\LoginPage.tsx
type nul >src\pages\PharmacyPage.tsx
type nul >src\pages\PricingPage.tsx
type nul >src\pages\RegisterPage.tsx
type nul >src\pages\ServicesPage.tsx
type nul >src\services\api.ts
type nul >src\App.tsx
type nul >src\index.css
type nul >src\main.tsx
type nul >.env
type nul >.gitignore
type nul >README.md
type nul >eslint.config.js
type nul >index.html
type nul >package-lock.json
type nul >package.json
type nul >postcss.config.js
type nul >tailwind.config.js
type nul >todo.md
type nul >tsconfig.app.json
type nul >tsconfig.json
type nul >tsconfig.node.json
type nul >vite.config.ts
echo.
echo Done! The folders and files have been created.
pause