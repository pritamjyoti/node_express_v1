-- CreateTable
CREATE TABLE `product_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_type` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
