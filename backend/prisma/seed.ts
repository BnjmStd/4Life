import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  const user1 = await prisma.usuario.create({
    data: {
      email: 'paciente1@example.com',
      telephone: '123456789',
      firstName: 'Juan',
      lastName: 'Pérez',
      password: 'contraseña1',
      tipoUsuario: 'PACIENTE',
      paciente: {
        create: {
          historialMedico: 'Sin antecedentes médicos relevantes',
        },
      },
    },
  });

  const user2 = await prisma.usuario.create({
    data: {
      email: 'medico1@example.com',
      telephone: '987654321',
      firstName: 'Ana',
      lastName: 'Gómez',
      password: 'contraseña2',
      tipoUsuario: 'MEDICO',
      medico: {
        create: {
          especialidad: 'Cardiología',
        },
      },
    },
  });

  const user3 = await prisma.usuario.create({
    data: {
      email: 'admin@example.com',
      telephone: '555555555',
      firstName: 'Carlos',
      lastName: 'Fernández',
      password: 'contraseña3',
      tipoUsuario: 'ADMINISTRADOR',
      administrador: {
        create: {
          departamento: 'Recursos Humanos',
        },
      },
    },
  });

  console.log({ user1, user2, user3 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
