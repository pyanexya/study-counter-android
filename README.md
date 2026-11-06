# Study Counter

Первое учебное Android-приложение на Kotlin. Кнопка увеличивает счётчик, вторая сбрасывает его. Значение восстанавливается после поворота экрана через Bundle. После принудительной остановки приложения постоянное хранение не гарантируется.

## Запуск

Откройте проект в Android Studio. Установите JDK 17, Android SDK Platform 35 и Build-Tools 35.0.0. Дождитесь синхронизации. Выберите эмулятор или телефон с Android 7.0+ и нажмите Run.

```powershell
.\gradlew.bat assembleDebug
```

```bash
./gradlew assembleDebug
```

APK: `app/build/outputs/apk/debug/app-debug.apk`.

## Ручная проверка

1. Первый запуск показывает 0.
2. Три нажатия показывают 3.
3. После поворота остаётся 3.
4. Сброс возвращает 0.

Приложение использует стандартные Android Views. Дополнительные UI-библиотеки и интернет не требуются. Gradle 8.9, Android Gradle Plugin 8.7.3 и Kotlin 2.0.21 закреплены для совместимой учебной сборки.

## Проверка сборки

Сборка `assembleDebug` успешно выполнена 6 ноября 2026 года: [GitHub Actions](https://github.com/pyanexya/study-counter-android/actions/runs/42158680862). Debug APK доступен в артефакте `study-counter-debug`. Запуск на устройстве пока не проверен.

## Дополнительная практика

В [practice-api](practice-api) находятся Express-сервер, интерактивная форма и коллекция Postman. Newman выполнил 5 запросов и 10 проверок без ошибок: [результат CI](https://github.com/pyanexya/study-counter-android/actions/runs/42158957831).
