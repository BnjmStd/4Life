import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un paciente
  const paciente1 = await prisma.paciente.create({
    data: {
      usuario: {
        create: {
          email: 'paciente2@example.com',
          telephone: '987654321',
          firstName: 'María',
          lastName: 'González',
          password: 'contraseña2',
          tipoUsuario: 'PACIENTE',
          age: 18,
        },
      },
      historialMedico: {
        create: {
          descripcion: 'Alergia a la penicilina',
          // otros campos del historial médico...
        },
      },
      exams: {
        create: [
          {
            nombre: 'Examen de sangre',
            numero_orden: 1,
            contenido: 'Resultado de hemoglobina y otros parámetros.',
            format: 'PDF',
          },
        ],
      },
    },
  });

  // Crear un médico
  const medico1 = await prisma.medico.create({
    data: {
      especialidad: 'Pediatría',
      usuario: {
        create: {
          email: 'medico1@example.com',
          telephone: '456789123',
          firstName: 'Dr. Luis',
          lastName: 'Martínez',
          password: 'contraseña3',
          tipoUsuario: 'MEDICO',
          age: 19,
        },
      },
      prestaciones: {
        create: [
          {
            entidad: {
              create: {
                nombre: 'Hospital General',
                direccion: 'Calle Principal 123',
                telefono: '555555555',
                tipoEntidad: 'PUBLICO',
              },
            },
            prestacion: {
              create: {
                nombre: 'Consulta pediátrica',
                descripcion: 'Consulta general para niños',
                cobertura: 80,
                costo: 100,
                tipoPrestacion: {
                  create: {
                    nombre: 'Consulta',
                    descripcion: 'Consulta médica general',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });

  // Crear un examen
  const exam1 = await prisma.exam.create({
    data: {
      nombre: 'Radiografía de tórax',
      numero_orden: 2,
      contenido: 'Radiografía para evaluar el estado de los pulmones.',
      format: 'IMAGEN',
      paciente: {
        connect: { id: paciente1.id },
      },
    },
  });

  // Crear una entidad
  const entidad1 = await prisma.entidad.create({
    data: {
      nombre: 'Clínica de Salud',
      direccion: 'Avenida Secundaria 456',
      telefono: '777777777',
      tipoEntidad: 'PRIVADO',
      prestaciones: {
        create: [
          {
            prestacion: {
              create: {
                nombre: 'Consulta especializada',
                descripcion: 'Consulta con un especialista',
                cobertura: 90,
                costo: 150,
                tipoPrestacion: {
                  create: {
                    nombre: 'Especialidad',
                    descripcion: 'Consulta médica con un especialista',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });

  // Crear un administrador
  const administrador1 = await prisma.administrador.create({
    data: {
      departamento: 'Recursos Humanos',
      usuario: {
        create: {
          email: 'admin1@example.com',
          telephone: '321321321',
          firstName: 'Ana',
          lastName: 'López',
          password: 'contraseña4',
          tipoUsuario: 'ADMINISTRADOR',
          age: 21,
        },
      },
    },
  });

  console.log({ paciente1, medico1, exam1, entidad1, administrador1 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
