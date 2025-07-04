# Patrimonio Médico - Tokenización Blockchain

Plataforma de tokenización de patrimonio para médicos asociados usando blockchain Polygon.

## Características

- 🔐 Autenticación personalizada con cédula y código médico
- 💰 Creación automática de billeteras EVM (Polygon)
- 🪙 Visualización de tokens ERC-1155
- 📱 Diseño responsivo y moderno
- ⚡ Built with Next.js 14, TypeScript, y Tailwind CSS

## Stack Tecnológico

- **Frontend**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Blockchain**: ThirdWeb SDK para Polygon Mainnet
- **Base de Datos**: Supabase
- **Autenticación**: JWT con sesiones personalizadas

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.local` y configura las siguientes variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_supabase

# ThirdWeb Configuration
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=tu_client_id_thirdweb
THIRDWEB_SECRET_KEY=tu_secret_key_thirdweb

# Contract Configuration
CONTRACT_ADDRESS=direccion_del_contrato_erc1155

# JWT Secret
JWT_SECRET=tu_clave_secreta_jwt_muy_segura
```

### 3. Configurar Base de Datos Supabase

Ejecuta los siguientes scripts SQL en tu proyecto Supabase:

```sql
-- Tabla medicos
CREATE TABLE medicos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo VARCHAR NOT NULL UNIQUE,
  cedula VARCHAR NOT NULL UNIQUE,
  nombre VARCHAR NOT NULL,
  wallet_address VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla auth_sessions
CREATE TABLE auth_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  medico_id UUID REFERENCES medicos(id) ON DELETE CASCADE,
  session_token VARCHAR NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_medicos_cedula_codigo ON medicos(cedula, codigo);
CREATE INDEX idx_auth_sessions_token ON auth_sessions(session_token);
CREATE INDEX idx_auth_sessions_expires ON auth_sessions(expires_at);
```

### 4. Datos de ejemplo

```sql
-- Insertar médico de ejemplo
INSERT INTO medicos (codigo, cedula, nombre) VALUES 
('02012107', '79454772', 'PABLO FELIPE ACEBEDO CUELLAR');
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Uso

### Para Médicos

1. **Login**: Ingresa tu cédula y código médico
2. **Primera vez**: Se creará automáticamente una billetera EVM
3. **Dashboard**: Visualiza tu información y balance de tokens
4. **Tokens**: Los tokens se asignan automáticamente por el administrador

### Credenciales de ejemplo

- **Cédula**: 79454772
- **Código**: 02012107

## Estructura del Proyecto

```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   └── me/route.ts
│   ├── wallet/
│   │   └── create/route.ts
│   └── tokens/
│       └── balance/route.ts
├── dashboard/
│   ├── page.tsx
│   └── loading.tsx
├── login/
│   └── page.tsx
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── LoadingSpinner.tsx
├── Header.tsx
├── Footer.tsx
├── WalletInfo.tsx
└── TokenBalance.tsx

lib/
├── supabase.ts
├── thirdweb.ts
├── auth.ts
└── utils.ts

types/
└── index.ts
```

## Configuración de Blockchain

### ThirdWeb Setup

1. Crea una cuenta en [ThirdWeb](https://thirdweb.com)
2. Obtén tu Client ID y Secret Key
3. Despliega un contrato ERC-1155 en Polygon Mainnet
4. Configura las variables de entorno

### Polygon Mainnet

- Red: Polygon (MATIC)
- Chain ID: 137
- RPC: Automático via ThirdWeb

## Seguridad

- ✅ Autenticación con JWT
- ✅ Sesiones con expiración
- ✅ Validación de entrada
- ✅ Rate limiting (recomendado)
- ✅ HTTPS en producción
- ✅ Variables de entorno seguras

## Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y confidencial.

## Soporte

Para soporte técnico, contacta al equipo de desarrollo. # sylicon-medicos
