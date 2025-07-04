# 🔧 Configuración de ThirdWeb - Guía Paso a Paso

## 🚨 Problema Actual
Tu `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` está usando un JWT de Supabase en lugar del Client ID real de ThirdWeb.

## 📋 Instrucciones para Corregir

### **Paso 1: Ir a ThirdWeb Dashboard**
1. Ve a: https://thirdweb.com/dashboard
2. Inicia sesión o crea una cuenta

### **Paso 2: Crear/Seleccionar Proyecto**
1. Si no tienes proyecto, haz clic en "Create Project"
2. Dale un nombre como "Patrimonio Medicos"
3. Selecciona "Polygon" como red principal

### **Paso 3: Obtener Client ID**
1. En el dashboard, ve a "Settings" 
2. Busca la sección "API Keys" o "Client ID"
3. Copia el **Client ID** (no el Secret Key)
4. Debería verse algo así: `a1b2c3d4e5f6g7h8i9j0`

### **Paso 4: Actualizar .env.local**
Reemplaza esta línea en tu archivo `.env.local`:
```
# ACTUAL (INCORRECTO):
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NUEVO (CORRECTO):
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=tu_client_id_real_aqui
```

## 🔍 Verificar el Contrato SCARE

### **Paso 5: Verificar Contrato en ThirdWeb**
1. En el dashboard de ThirdWeb
2. Ve a "Contracts" o "Deploy"
3. Busca el contrato: `0x4c176571985373f4c7CD9Fe40571e162C8CA00cc`
4. Verifica que sea accesible desde tu proyecto

### **Paso 6: Confirmar Tipo de Token**
El contrato SCARE podría ser:
- ✅ **ERC-20**: Token fungible estándar
- ❓ **ERC-1155**: Token multi-tipo

En Polygonscan veo que es un token con **2 holders** y balance disponible.

## 🚀 Después de la Configuración

1. **Reinicia el servidor**: `npm run dev`
2. **Refresca la página** del dashboard
3. **Observa los logs** para ver si los errores desaparecen
4. **Verifica el balance** de tokens

## 📞 Si Sigues Teniendo Problemas

Si después de configurar el Client ID correcto sigues teniendo errores:

1. **Verifica la red**: Asegúrate de que ThirdWeb esté configurado para Polygon Mainnet
2. **Revisa permisos**: Confirma que el contrato sea público/accesible
3. **Contacta soporte**: Si es necesario, contacta soporte de ThirdWeb

---

### 📝 Notas Importantes:
- El Client ID es **público** y va en variables con `NEXT_PUBLIC_`
- El Secret Key es **privado** y NO debe tener el prefijo `NEXT_PUBLIC_`
- El contrato SCARE ya existe y tiene holders con balance 