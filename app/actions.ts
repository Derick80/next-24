'use server'
import prisma from '@/lib/prisma'

export async function getUser() {
  return await prisma.user.findUnique({
    where: {
      id: 'aa722ede-8cee-412d-8fcf-aba86bdfa36f'
    },
    include: {
      userImages: true,
      posts: true,
      hashedPassword: false
    }
  })
}
