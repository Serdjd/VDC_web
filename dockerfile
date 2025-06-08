# Usar una imagen oficial de Node.js como base
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json package-lock.json ./ 

# Instalar dependencias con una instalación limpia
RUN npm ci

# Copiar el resto de la aplicación
COPY . .

# Asegurar permisos de ejecución para Next.js
RUN chmod +x node_modules/.bin/next

# Construir la aplicación
RUN node node_modules/next/dist/bin/next build

# ---- Producción ----
FROM node:18-alpine AS runner

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios del builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Definir la variable de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto de Next.js
EXPOSE 3030

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]