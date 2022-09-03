import { prisma } from "../config/prisma.config";

export async function createUser(name: string, email: string) {
  const newUser = await prisma.user
    .create({
      data: {
        name,
        email,
      },
    })
    .catch((err) => {
      return err;
    });
  return newUser.name;
}
