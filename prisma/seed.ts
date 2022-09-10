import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


async function main() {
    await prisma.user.upsert({
        where: { email: "alice@prisma.io" },
        update: {},
        create: {
            name: "Alice",
            email: "admin@admin",
            password: bcrypt.hashSync('12345678', 9) as string,
            avatar: "https://avatars.githubusercontent.com/u/746482?v=4",
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    });
