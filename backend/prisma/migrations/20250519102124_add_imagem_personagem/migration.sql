-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `raca` VARCHAR(191) NOT NULL,
    `classe` VARCHAR(191) NOT NULL,
    `corPele` VARCHAR(191) NOT NULL,
    `corCabelo` VARCHAR(191) NOT NULL,
    `cabelo` VARCHAR(191) NOT NULL,
    `corOlhos` VARCHAR(191) NOT NULL,
    `forca` INTEGER NOT NULL,
    `destreza` INTEGER NOT NULL,
    `inteligencia` INTEGER NOT NULL,
    `fortitude` INTEGER NOT NULL,
    `carisma` INTEGER NOT NULL,
    `historia` VARCHAR(191) NULL,
    `imagemUrl` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Personagem` ADD CONSTRAINT `Personagem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
