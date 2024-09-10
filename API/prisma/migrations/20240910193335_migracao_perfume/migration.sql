/*
  Warnings:

  - You are about to drop the `carros` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE `perfumes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `ano` SMALLINT NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `destaque` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `marcaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `perfumes` ADD CONSTRAINT `perfumes_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
