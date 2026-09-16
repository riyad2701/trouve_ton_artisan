-- Script de création de la base de données pour "Trouve ton artisan"
-- Base de données : `trouve_ton_artisan`
CREATE DATABASE IF NOT EXISTS `trouve_ton_artisan` DEFAULT CHARACTER SET
utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `trouve_ton_artisan`;
-- --------------------------------------------------------
--
-- Structure de la table `category`
--
DROP TABLE IF EXISTS `artisan`;
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(100) NOT NULL,
`slug` VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--
-- Contenu de la table `category`
--
INSERT INTO `category` (`id`, `name`, `slug`) VALUES
(1, 'Alimentation', 'alimentation'),
(2, 'Bâtiment', 'batiment'),
(3, 'Fabrication', 'fabrication'),
(4, 'Services', 'services');
-- --------------------------------------------------------
--
-- Structure de la table `artisan`
--
CREATE TABLE `artisan` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(150) NOT NULL,
`job` VARCHAR(150) NOT NULL,
`note` DECIMAL(2,1) NOT NULL DEFAULT 4.0,

`city` VARCHAR(100) NOT NULL,
`about` TEXT,
`email` VARCHAR(150),
`phone` VARCHAR(20),
`website` VARCHAR(255),
`top_artisan` TINYINT(1) DEFAULT 0,
`category_id` INT,
FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--
-- Contenu de la table `artisan`
--
INSERT INTO `artisan` (`id`, `name`, `job`, `note`, `city`, `about`, `email`, `phone`, `website`,
`top_artisan`, `category_id`) VALUES
(1, 'L''Écuyer Couture', 'Couturier', 4.5, 'Annecy', 'Artisan spécialisé en retouches, création sur
mesure et confections personnalisées.', 'contact@lecuyer-couture.fr', '0450123456',
'https://lecuyer-couture.fr', 1, 3),
(2, 'Boulangerie Artisanale Le Pain Doré', 'Boulanger', 4.8, 'Lyon', 'Pains au levain naturel et
viennoiseries pure beurre faites maison.', 'lepaindore@gmail.com', '0478123456', NULL, 1, 1),
(3, 'Menuiserie Dubois', 'Menuisier', 4.7, 'Chambéry', 'Fabrication de meubles sur mesure,
terrasses en bois et agencement intérieur.', 'dubois.menuiserie@outlok.fr', '0479123456', NULL,
0, 2),
(4, 'Garage Auto Service', 'Mécanicien', 4.2, 'Grenoble', 'Réparation, révision toutes marques et
entretien de véhicules.', 'autoservice@gmail.com', '0476123456', NULL, 0, 4);
-- --------------------------------------------------------
--
-- Structure de la table `contact_messages`
--
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`artisan_id` INT NOT NULL,
`sender_name` VARCHAR(100) NOT NULL,
`sender_email` VARCHAR(150) NOT NULL,
`subject` VARCHAR(200) NOT NULL,
`message` TEXT NOT NULL,
`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (`artisan_id`) REFERENCES `artisan`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;