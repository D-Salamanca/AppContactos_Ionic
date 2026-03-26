# Challenge 06 - Ionic App

Aplicación móvil desarrollada con Ionic + React que integra múltiples estrategias de almacenamiento y autenticación real con Firebase.

## Tecnologías

- Ionic React
- Firebase Authentication
- Firebase Firestore
- Firebase Realtime Database
- Dexie (IndexedDB)
- Capacitor Network
- TypeScript

## Funcionalidades

### Autenticación
- Login y Register con Firebase Authentication
- Rutas protegidas con ProtectedRoute
- Logout desde la pantalla principal

### Contacts (Firebase Firestore)
- Listar, crear, editar y eliminar contactos
- Datos persistidos en la nube con Firestore
- Acciones deshabilitadas sin conexión a internet

### Tasks (Firebase Realtime Database)
- Listar, crear, editar, eliminar y completar tareas
- Sincronización en tiempo real con onValue
- Acciones deshabilitadas sin conexión a internet

### Fruits (Dexie - IndexedDB)
- Listar, agregar, editar y eliminar frutas
- Almacenamiento local en el dispositivo
- newFunction: filtro de frutas por proveedor en tiempo real

### Network
- Detección de estado de red con @capacitor/network
- Badge Online/Offline en pantalla principal
- Botones y acciones de Contacts y Tasks se deshabilitan sin conexión

## Estructura del proyecto
```
src/
  firebase/
    config.ts
  hooks/
    useAuth.ts
    useCollection.ts
    useRealTime.ts
    useDexie.ts
    useNetwork.ts
  context/
    AuthContext.tsx
    ContactsContext.tsx
    TasksContext.tsx
    FruitsContext.tsx
  db/
    dexie.ts
  pages/
    LoginPage.tsx
    RegisterPage.tsx
    Home.tsx
    ContactsListPage.tsx
    CreateContactPage.tsx
    EditContactPage.tsx
    ContactDetailPage.tsx
    TasksListPage.tsx
    TaskFormPage.tsx
    TaskDetailPage.tsx
    FruitsListPage.tsx
  ProtectedRoute.tsx
  App.tsx
  main.tsx
```

## Instalación
```bash
npm install
npm run dev
```

## Variables de entorno

Configura tu propio proyecto Firebase en:
`src/firebase/config.ts`