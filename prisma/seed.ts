import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const email = process.env.SEED_EMAIL

  if (!email) {
    throw new Error('SEED_EMAIL environment variable is not defined')
  }

  const basePassword = process.env.SEED_PASSWORD
  if (!basePassword) {
    throw new Error('SEED_PASSWORD environment variable is not defined')
  }

  await prisma.user
    .delete({
      where: {
        email
      }
    })
    .catch(() => {
      console.log('No user to delete')
    })

  const passwords = await bcrypt.hash(basePassword, 10)

  const me = await prisma.user.create({
    data: {
      email,
      hashedPassword: {
        create: {
          hash: passwords
        }
      },
      username: 'Grayone',
      userImages: {
        create: {
          url: 'https://res.cloudinary.com/dch-photo/image/upload/v1705654705/stock/dericka_qgeqe9_3a2339.webp',
          cloudinaryPublicId: 'grayone',
          filename: 'grayone'
        }
      }
    }
  })
  console.log(`Database has been seeded. 🌱`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
