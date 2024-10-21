-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('PACIENTE', 'MEDICO', 'ADMINISTRADOR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telephone" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "tipoUsuario" "TipoUsuario" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "historialMedico" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" SERIAL NOT NULL,
    "especialidad" VARCHAR(100) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "departamento" VARCHAR(100) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_usuarioId_key" ON "Paciente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_usuarioId_key" ON "Medico"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_usuarioId_key" ON "Administrador"("usuarioId");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
