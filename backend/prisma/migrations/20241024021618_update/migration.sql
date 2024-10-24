-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('PACIENTE', 'MEDICO', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "FormatExam" AS ENUM ('IMAGEN', 'PDF');

-- CreateEnum
CREATE TYPE "TipoEntidad" AS ENUM ('PUBLICO', 'PRIVADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telephone" TEXT,
    "address" TEXT,
    "firstName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "lastName" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "avatarImg" TEXT,
    "rut" TEXT,
    "tipoUsuario" "TipoUsuario" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pacienteId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero_orden" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "format" "FormatExam" NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" SERIAL NOT NULL,
    "especialidad" VARCHAR(100) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "cobertura" DOUBLE PRECISION,
    "costo" DOUBLE PRECISION,
    "updated" TIMESTAMP(3) NOT NULL,
    "tipoPrestacionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prestacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoPrestacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoPrestacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "tipoEntidad" "TipoEntidad" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrestacionEntidad" (
    "entidadId" INTEGER NOT NULL,
    "prestacionId" INTEGER NOT NULL,
    "medicoId" INTEGER,
    "examId" INTEGER,
    "pacienteId" INTEGER,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrestacionEntidad_pkey" PRIMARY KEY ("entidadId","prestacionId")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "departamento" VARCHAR(100) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

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
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestacion" ADD CONSTRAINT "Prestacion_tipoPrestacionId_fkey" FOREIGN KEY ("tipoPrestacionId") REFERENCES "TipoPrestacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_prestacionId_fkey" FOREIGN KEY ("prestacionId") REFERENCES "Prestacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
