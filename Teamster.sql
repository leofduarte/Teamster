-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 03-Jul-2024 às 19:06
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `Teamster`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `activities`
--

CREATE TABLE `activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `plan_activity_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `activities` varchar(1000) NOT NULL,
  `schedule` varchar(1000) NOT NULL,
  `planner_tasks` varchar(1000) NOT NULL,
  `participant_tasks` varchar(1000) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `activities`
--

INSERT INTO `activities` (`id`, `plan_activity_id`, `name`, `description`, `activities`, `schedule`, `planner_tasks`, `participant_tasks`, `created_at`, `updated_at`) VALUES
(18, 43, 'Atividade de Teambuilding - Caça ao Tesouro em Aveiro', 'A atividade consiste numa emocionante Caça ao Tesouro com o objetivo de promover a cooperação, comunicação e trabalho em equipa entre os participantes. Durante a atividade, os participantes terão de decifrar enigmas, completar desafios e superar obstáculos, unindo esforços para alcançar um objetivo comum. A atividade decorrerá ao ar livre, explorando os pontos turísticos e históricos de Aveiro, proporcionando uma experiência divertida e enriquecedora para todos os envolvidos. O ponto de encontro será na Praça do Peixe em Aveiro, com uma duração estimada de 2 horas.', '1. Ponto de encontro na Praça do Peixe\n2. Divisão dos participantes em equipas\n3. Distribuição de mapas e pistas\n4. Início da Caça ao Tesouro com enigmas a decifrar e desafios a superar\n5. Conclusão da atividade com a descoberta do tesouro\n6. Momento de convívio e partilha de experiências', '\"23:00:00 - Chegada e divisão dos participantes\\n23:15:00 - Início da Caça ao Tesouro\\n00:45:00 - Descoberta do tesouro e convívio\\n02:00:00 - Fim da atividade\"', '1. Alugar espaço para a atividade (por exemplo, na zona da Praça do Peixe) - Preço médio de 30€\n2. Elaborar enigmas e desafios para a Caça ao Tesouro\n3. Preparar mapas e pistas para as equipas\n4. Providenciar pequenas lembranças ou prémios simbólicos para os participantes\n5. Garantir a presença de um coordenador para orientar a atividade', '1. Levar roupa e calçado confortável para caminhar\n2. Levar telemóvel para tirar fotografias e comunicar com a equipa\n3. Trazer água ou snacks para manter-se hidratado durante a atividade\n4. Avisar antecipadamente sobre eventuais restrições alimentares ou físicas para garantir a inclusão de todos os participantes', '2024-07-03 10:39:22', '2024-07-03 10:39:22'),
(19, 44, 'Aveiro Adventure Challenge', 'O \'Aveiro Adventure Challenge\' é uma atividade de team building que combina desafios físicos e mentais para promover a cooperação, comunicação e diversão entre os participantes. Os participantes serão desafiados a completar uma série de tarefas num ambiente ao ar livre, onde terão de trabalhar em conjunto para superar obstáculos e alcançar os objetivos. O ponto de encontro será no Parque Infante Dom Pedro, em Aveiro, com uma duração total de 2 horas.', '1. Check-in e divisão das equipas: Os participantes serão recebidos e divididos em equipas. \n2. Circuitos de aventura: Cada equipa terá que ultrapassar diferentes obstáculos, como escalada, tiro ao alvo e jogos de estratégia. \n3. Caça ao tesouro: As equipas terão que decifrar pistas e completar desafios para encontrar o tesouro escondido. \n4. Desafio final: Um desafio surpresa onde todas as equipas terão que colaborar para alcançar o objetivo final. \nA alimentação durante a atividade será composta por snacks saudáveis e água, tendo em conta as restrições alimentares dos participantes.', '{\"23:00\":\"Check-in e divisão das equipas\",\"23:15\":\"Circuitos de aventura\",\"23:45\":\"Caça ao tesouro\",\"00:15\":\"Desafio final\"}', '1. Aluguer do espaço no Parque Infante Dom Pedro, Aveiro, através do site da Câmara Municipal de Aveiro (https://www.cm-aveiro.pt/), com um custo médio de 300€. \n2. Preparação dos materiais necessários para os circuitos de aventura e caça ao tesouro, como cordas, equipamento de escalada, pistas e prémios. \n3. Compra de snacks saudáveis e água, tendo em conta possíveis restrições alimentares dos participantes. Os ingredientes e preços médios podem ser consultados em supermercados locais. \n4. Definição dos pontos de partida e término de cada atividade no Parque.', 'Os participantes devem trazer roupa confortável e calçado adequado para atividades ao ar livre. \nCaso existam participantes com restrições alimentares específicas, devem informar com antecedência para se providenciar opções adequadas. \nÉ importante garantir que todos os participantes estejam fisicamente aptos para participar nas atividades propostas.', '2024-07-03 13:05:35', '2024-07-03 13:05:35');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('activities', 'O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:3:{i:0;O:19:\"App\\Models\\Activity\":30:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"activities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:6:{s:4:\"name\";s:42:\"Exploração Cultural e Criativa em Aveiro\";s:11:\"description\";s:393:\"Esta atividade de team building foi desenhada para promover a cooperação e a criatividade entre os membros da equipe. Ao focar em passatempos como desenho, escultura e música, o evento proporcionará a todos uma tarde descontraída e inspiradora, explorando a rica cultura de Aveiro. O ponto de encontro será no Museu de Aveiro, às 14:00, e a atividade terá duração máxima de 3 horas.\";s:10:\"activities\";s:458:\"A tarde começará com uma breve visita guiada ao Museu de Aveiro, focando nas exposições de arte e escultura (14:00-14:45). Seguir-se-á uma workshop de desenho ao ar livre nos jardins do museu, com todos os materiais fornecidos e um artista local para orientar (15:00-16:00). Finalizaremos com uma sessão de música ao vivo no parque próximo, onde os participantes podem relaxar, apreciar a música e até participar se assim o desejarem (16:15-17:00).\";s:8:\"schedule\";s:116:\"14:00 - Visita guiada ao Museu de Aveiro; 15:00 - Workshop de desenho; 16:15 - Sessão de música ao vivo no parque.\";s:13:\"planner_tasks\";s:361:\"Reservar visita guiada no Museu de Aveiro (www.museudeaveiro.pt, custo aproximado de 70€ para grupo); Comprar materiais de desenho (papel, lápis, borrachas) em Loja de Artes Aveiro (www.lojadeartesaveiro.pt, custo estimado de 50€); Contactar músicos locais para sessão de música no parque (custo estimado de 200€). Organizar transporte se necessário.\";s:17:\"participant_tasks\";s:345:\"Os participantes deverão levar roupas confortáveis e uma capa, caso haja previsão de chuva. Recomenda-se que tragam também uma garrafinha de água e um chapéu para proteção solar. Todas as informações adicionais, incluindo detalhes para participantes com restrições específicas, serão enviadas por e-mail uma semana antes do evento.\";}s:11:\"\0*\0original\";a:6:{s:4:\"name\";s:42:\"Exploração Cultural e Criativa em Aveiro\";s:11:\"description\";s:393:\"Esta atividade de team building foi desenhada para promover a cooperação e a criatividade entre os membros da equipe. Ao focar em passatempos como desenho, escultura e música, o evento proporcionará a todos uma tarde descontraída e inspiradora, explorando a rica cultura de Aveiro. O ponto de encontro será no Museu de Aveiro, às 14:00, e a atividade terá duração máxima de 3 horas.\";s:10:\"activities\";s:458:\"A tarde começará com uma breve visita guiada ao Museu de Aveiro, focando nas exposições de arte e escultura (14:00-14:45). Seguir-se-á uma workshop de desenho ao ar livre nos jardins do museu, com todos os materiais fornecidos e um artista local para orientar (15:00-16:00). Finalizaremos com uma sessão de música ao vivo no parque próximo, onde os participantes podem relaxar, apreciar a música e até participar se assim o desejarem (16:15-17:00).\";s:8:\"schedule\";s:116:\"14:00 - Visita guiada ao Museu de Aveiro; 15:00 - Workshop de desenho; 16:15 - Sessão de música ao vivo no parque.\";s:13:\"planner_tasks\";s:361:\"Reservar visita guiada no Museu de Aveiro (www.museudeaveiro.pt, custo aproximado de 70€ para grupo); Comprar materiais de desenho (papel, lápis, borrachas) em Loja de Artes Aveiro (www.lojadeartesaveiro.pt, custo estimado de 50€); Contactar músicos locais para sessão de música no parque (custo estimado de 200€). Organizar transporte se necessário.\";s:17:\"participant_tasks\";s:345:\"Os participantes deverão levar roupas confortáveis e uma capa, caso haja previsão de chuva. Recomenda-se que tragam também uma garrafinha de água e um chapéu para proteção solar. Todas as informações adicionais, incluindo detalhes para participantes com restrições específicas, serão enviadas por e-mail uma semana antes do evento.\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:7:{i:0;s:16:\"plan_activity_id\";i:1;s:4:\"name\";i:2;s:11:\"description\";i:3;s:10:\"activities\";i:4;s:8:\"schedule\";i:5;s:13:\"planner_tasks\";i:6;s:17:\"participant_tasks\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:1;O:19:\"App\\Models\\Activity\":30:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"activities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:6:{s:4:\"name\";s:48:\"Dia de Team Building no Porto: Culinária e Arte\";s:11:\"description\";s:563:\"Esta atividade de team building foi planeada para melhorar as relações interpessoais e proporcionar descontração e diversão através de workshops de culinária e sessões de arte. Tendo em conta os interesses comuns do grupo, como culinária e desenho, propomos uma integração de sabores e criatividade. O ponto de encontro será no centro do Porto, no Palácio das Artes – Fábrica de Talentos, e a atividade terá uma duração de 6 horas. Cumprindo as restrições alimentares de todos os participantes, garantimos inclusão total durante as sessões.\";s:10:\"activities\";s:634:\"1. Workshop de Culinária (09h00 - 12h00): Sob a orientação de um chef profissional, os participantes aprenderão a preparar pratos sem lactose e sem frutos secos. O menu incluirá entradas, pratos principais e sobremesas adaptados. 2. Pausa para degustação (12h00 - 13h00): Os participantes degustarão os pratos que prepararam, num ambiente informal onde poderão interagir e partilhar experiências. 3. Workshop de Desenho e Pintura (13h00 - 16h00): Conduzido por um artista local, este workshop permitirá aos participantes expressarem sua criatividade através de várias técnicas de desenho e pintura. Materiais incluídos.\";s:8:\"schedule\";s:152:\"09h00: Início do Workshop de Culinária, 12h00: Pausa para degustação, 13h00: Início do Workshop de Desenho e Pintura, 16h00: Conclusão e feedbacks\";s:13:\"planner_tasks\";s:540:\"1. Reservar o espaço no Palácio das Artes - Fábrica de Talentos (40€/hora, reservas através de [Fábrica de Talentos](http://fábricadetalentos.pt)). 2. Contratar um chef de cozinha (200€) e um artista local (150€) para os workshops. 3. Comprar ingredientes para o workshop de culinária, evitando lactose e frutos secos (compras no Mercado do Bolhão, aproximadamente 200€). 4. Adquirir materiais de arte (lápis, papel, tintas) no Porto Art Supplies (50€). 5. Preparar lista de instruções e receitas para os participantes.\";s:17:\"participant_tasks\";s:335:\"1. Confirmar presença até uma semana antes do evento. 2. Usar vestuário confortável e adequado para atividades de culinária e arte. 3. Informar o organizador sobre qualquer restrição alimentícia adicional. 4. Preparar-se para um dia de aprendizagem e criatividade, trazendo boa disposição e abertura para novas experiências.\";}s:11:\"\0*\0original\";a:6:{s:4:\"name\";s:48:\"Dia de Team Building no Porto: Culinária e Arte\";s:11:\"description\";s:563:\"Esta atividade de team building foi planeada para melhorar as relações interpessoais e proporcionar descontração e diversão através de workshops de culinária e sessões de arte. Tendo em conta os interesses comuns do grupo, como culinária e desenho, propomos uma integração de sabores e criatividade. O ponto de encontro será no centro do Porto, no Palácio das Artes – Fábrica de Talentos, e a atividade terá uma duração de 6 horas. Cumprindo as restrições alimentares de todos os participantes, garantimos inclusão total durante as sessões.\";s:10:\"activities\";s:634:\"1. Workshop de Culinária (09h00 - 12h00): Sob a orientação de um chef profissional, os participantes aprenderão a preparar pratos sem lactose e sem frutos secos. O menu incluirá entradas, pratos principais e sobremesas adaptados. 2. Pausa para degustação (12h00 - 13h00): Os participantes degustarão os pratos que prepararam, num ambiente informal onde poderão interagir e partilhar experiências. 3. Workshop de Desenho e Pintura (13h00 - 16h00): Conduzido por um artista local, este workshop permitirá aos participantes expressarem sua criatividade através de várias técnicas de desenho e pintura. Materiais incluídos.\";s:8:\"schedule\";s:152:\"09h00: Início do Workshop de Culinária, 12h00: Pausa para degustação, 13h00: Início do Workshop de Desenho e Pintura, 16h00: Conclusão e feedbacks\";s:13:\"planner_tasks\";s:540:\"1. Reservar o espaço no Palácio das Artes - Fábrica de Talentos (40€/hora, reservas através de [Fábrica de Talentos](http://fábricadetalentos.pt)). 2. Contratar um chef de cozinha (200€) e um artista local (150€) para os workshops. 3. Comprar ingredientes para o workshop de culinária, evitando lactose e frutos secos (compras no Mercado do Bolhão, aproximadamente 200€). 4. Adquirir materiais de arte (lápis, papel, tintas) no Porto Art Supplies (50€). 5. Preparar lista de instruções e receitas para os participantes.\";s:17:\"participant_tasks\";s:335:\"1. Confirmar presença até uma semana antes do evento. 2. Usar vestuário confortável e adequado para atividades de culinária e arte. 3. Informar o organizador sobre qualquer restrição alimentícia adicional. 4. Preparar-se para um dia de aprendizagem e criatividade, trazendo boa disposição e abertura para novas experiências.\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:7:{i:0;s:16:\"plan_activity_id\";i:1;s:4:\"name\";i:2;s:11:\"description\";i:3;s:10:\"activities\";i:4;s:8:\"schedule\";i:5;s:13:\"planner_tasks\";i:6;s:17:\"participant_tasks\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:2;O:19:\"App\\Models\\Activity\":30:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:10:\"activities\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:6:{s:4:\"name\";s:36:\"Dia Culinário e Artístico no Porto\";s:11:\"description\";s:431:\"Esta atividade foi pensada para promover a cooperação e a criatividade entre colegas, centrando-se na culinária e na arte, duas paixões comuns observadas no grupo. O objetivo é melhorar as relações interpessoais através de atividades relaxantes e divertidas que estimulam a comunicação e a colaboração. A atividade terá lugar na zona ribeirinha do Porto, com início no Jardim do Morro, e a duração será de 6 horas.\";s:10:\"activities\";s:626:\"1. Oficina de Culinária (10:00-12:00) - Os participantes serão divididos em grupos e terão que preparar pratos sem lactose e sem frutos secos, sob a orientação de um chef local. 2. Pausa para degustação (12:00-13:00) - Os pratos preparados serão degustados por todos, promovendo um momento de confraternização. 3. Workshop de Arte (13:00-15:00) - Seguir-se-á uma sessão de pintura ao ar livre, onde cada participante criará uma obra de arte baseada em temas do Porto. 4. Exposição e Discussão (15:00-16:00) - As obras de arte serão expostas e haverá uma discussão construtiva sobre as diferentes criações.\";s:8:\"schedule\";s:155:\"10:00: Oficina de Culinária, 12:00: Pausa para degustação, 13:00: Workshop de Arte, 15:00: Exposição e Feedback das Obras de Arte, 16:00: Encerramento\";s:13:\"planner_tasks\";s:433:\"Reservar chef para workshop de culinária - contato através do site [https://aulasdecocinha.pt](https://aulasdecocinha.pt), custo aproximado de 150€. Comprar ingredientes para a oficina de culinária - comprar em mercados locais como o Mercado do Bolhão, gastando cerca de 100€. Reservar instrutor de arte e materiais necessários para o workshop de pintura - contatar o Espaço Arte no Porto, com um custo aproximado de 80€.\";s:17:\"participant_tasks\";s:365:\"Levar roupas confortáveis e adequadas para atividades ao ar livre e uma garrafa de água. Informar-se sobre ingredientes alternativos sem lactose e sem frutos secos, disponíveis em supermercados locais como Pingo Doce ou Continente. Para aqueles com restrições, é recomendado informar os organizadores previamente para que possam ajustar as receitas de acordo.\";}s:11:\"\0*\0original\";a:6:{s:4:\"name\";s:36:\"Dia Culinário e Artístico no Porto\";s:11:\"description\";s:431:\"Esta atividade foi pensada para promover a cooperação e a criatividade entre colegas, centrando-se na culinária e na arte, duas paixões comuns observadas no grupo. O objetivo é melhorar as relações interpessoais através de atividades relaxantes e divertidas que estimulam a comunicação e a colaboração. A atividade terá lugar na zona ribeirinha do Porto, com início no Jardim do Morro, e a duração será de 6 horas.\";s:10:\"activities\";s:626:\"1. Oficina de Culinária (10:00-12:00) - Os participantes serão divididos em grupos e terão que preparar pratos sem lactose e sem frutos secos, sob a orientação de um chef local. 2. Pausa para degustação (12:00-13:00) - Os pratos preparados serão degustados por todos, promovendo um momento de confraternização. 3. Workshop de Arte (13:00-15:00) - Seguir-se-á uma sessão de pintura ao ar livre, onde cada participante criará uma obra de arte baseada em temas do Porto. 4. Exposição e Discussão (15:00-16:00) - As obras de arte serão expostas e haverá uma discussão construtiva sobre as diferentes criações.\";s:8:\"schedule\";s:155:\"10:00: Oficina de Culinária, 12:00: Pausa para degustação, 13:00: Workshop de Arte, 15:00: Exposição e Feedback das Obras de Arte, 16:00: Encerramento\";s:13:\"planner_tasks\";s:433:\"Reservar chef para workshop de culinária - contato através do site [https://aulasdecocinha.pt](https://aulasdecocinha.pt), custo aproximado de 150€. Comprar ingredientes para a oficina de culinária - comprar em mercados locais como o Mercado do Bolhão, gastando cerca de 100€. Reservar instrutor de arte e materiais necessários para o workshop de pintura - contatar o Espaço Arte no Porto, com um custo aproximado de 80€.\";s:17:\"participant_tasks\";s:365:\"Levar roupas confortáveis e adequadas para atividades ao ar livre e uma garrafa de água. Informar-se sobre ingredientes alternativos sem lactose e sem frutos secos, disponíveis em supermercados locais como Pingo Doce ou Continente. Para aqueles com restrições, é recomendado informar os organizadores previamente para que possam ajustar as receitas de acordo.\";}s:10:\"\0*\0changes\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:7:{i:0;s:16:\"plan_activity_id\";i:1;s:4:\"name\";i:2;s:11:\"description\";i:3;s:10:\"activities\";i:4;s:8:\"schedule\";i:5;s:13:\"planner_tasks\";i:6;s:17:\"participant_tasks\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 1719933246);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `departments`
--

CREATE TABLE `departments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `departments`
--

INSERT INTO `departments` (`id`, `created_at`, `updated_at`, `name`, `address`, `phone_number`, `email`) VALUES
(7, NULL, NULL, 'Departamento Comercial', NULL, NULL, NULL),
(8, NULL, NULL, 'Departamento Marketing', NULL, NULL, NULL),
(11, NULL, NULL, 'teste', NULL, NULL, NULL),
(12, NULL, NULL, 'Departamento Comunicação', NULL, NULL, NULL),
(13, '2024-06-29 15:57:09', '2024-06-29 15:57:09', 'Novo 1', NULL, NULL, NULL),
(14, '2024-06-29 15:59:01', '2024-06-29 15:59:01', 'novo 2', NULL, NULL, NULL),
(15, '2024-06-30 13:53:25', '2024-06-30 13:53:25', '123', NULL, NULL, NULL),
(16, '2024-06-30 14:40:38', '2024-06-30 14:40:38', 'Departamento Teste', NULL, NULL, NULL),
(17, '2024-07-02 09:50:04', '2024-07-02 09:50:04', 'teste12324236', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `department_user`
--

CREATE TABLE `department_user` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `department_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `department_user`
--

INSERT INTO `department_user` (`user_id`, `department_id`) VALUES
(1, 7),
(1, 8),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(2, 11);

-- --------------------------------------------------------

--
-- Estrutura da tabela `entity_type`
--

CREATE TABLE `entity_type` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `entity_type`
--

INSERT INTO `entity_type` (`id`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Company', NULL, NULL),
(2, 'Individual', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `invitations`
--

CREATE TABLE `invitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `team_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(32) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `invitations`
--

INSERT INTO `invitations` (`id`, `email`, `team_id`, `token`, `created_at`, `updated_at`) VALUES
(145, 'teste@mail.com', 121, 'cS6BtgB0DWWDDmGiIaqFu8nInn2Tk9t0', '2024-06-27 13:10:54', '2024-06-27 13:10:54'),
(146, 'jlfduarte.3@gmail.com', 121, '0wR9N2mrhHCDy0pp5w9MOCLhJRAGExmi', '2024-06-27 13:10:55', '2024-06-27 13:10:55'),
(147, 'teste10@mail.com', 121, '1mOfQm0SrMIliE75aaNzYq80V1C5tai2', '2024-06-27 13:10:56', '2024-06-27 13:10:56'),
(148, 'teste11@mail.com', 121, 'qvs830aUeAHQ3h1oSZ6HgrvrfEdWMcjg', '2024-06-27 13:10:56', '2024-06-27 13:10:56'),
(149, 'teste12@mail.com', 121, 'boqSYgpKEkRHG89yzQ8xeqrIXX5kH3g6', '2024-06-27 13:10:57', '2024-06-27 13:10:57'),
(150, 'teste12@mail.com', 121, 'cYZqLSFUBCf7n4al8UpB54pY4cpWlImI', '2024-06-27 13:10:57', '2024-06-27 13:10:57'),
(151, 'teste13@mail.com', 121, '2Nysr8ktPTWgiMVtE0g4d7kYtylven0t', '2024-06-27 13:10:58', '2024-06-27 13:10:58'),
(204, 'leofduarte.3@gmail.com', 121, 'nSERciKfPgi62IEB1PasTC9zbs43famH', '2024-07-02 09:49:49', '2024-07-02 09:49:49'),
(205, 'pavlo@lol.pt', 121, 'haOhVVoeHAVLah3CGab2t4hZpwQj4jiz', '2024-07-02 12:57:45', '2024-07-02 12:57:45'),
(206, 'ruben@uaas.pt', 121, 'BQEHQkG9etx0wv2BNWyv5KPj5VREJGlW', '2024-07-02 12:57:48', '2024-07-02 12:57:48'),
(207, 'leandroduarte@ua.pt', 121, '54Qjm0GoN2pPzyV0DfvNeCrgRf3IfyrH', '2024-07-02 12:58:36', '2024-07-02 12:58:36'),
(208, 'leandroduarte@ua.pt', 129, 'v84vqg5xZQsScxNrNTzeFZcbDHYmwJ3P', '2024-07-02 20:38:15', '2024-07-02 20:38:15'),
(209, 'jlfduarte.3@gmail.com', 129, 'fKL0F0ar0CSAiw6trl8YBiE8Qlw9G1pu', '2024-07-02 20:38:17', '2024-07-02 20:38:17'),
(210, 'leonardpeartree@gmail.com', 129, 'ADZxQ5xC9c7wOI2GSo6ivmI26Nk137pC', '2024-07-02 20:38:18', '2024-07-02 20:38:18'),
(211, 'jlfduarte.3@gmail.com', 130, 'lNma6MQ6ZGVrzlKllVakXzDMVe3QiBmG', '2024-07-03 13:04:06', '2024-07-03 13:04:06'),
(212, 'mariarodriguesmonteiro@ua.pt', 130, 'Y56jfWvDwESCMyI8GnkmEl5thmf6823b', '2024-07-03 13:04:09', '2024-07-03 13:04:09'),
(213, 'leonardpeartree@gmail.com', 130, '6AjdWpc3hTbsa9B82cd50oEimMihQ0b2', '2024-07-03 13:04:11', '2024-07-03 13:04:11'),
(214, 'leandroduarte@ua.pt', 130, '0KlIQkCU9OBdL7FhC143e12v5QnF0Z0I', '2024-07-03 13:04:50', '2024-07-03 13:04:50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `placeholder` varchar(255) DEFAULT NULL,
  `tooltip` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `licences`
--

CREATE TABLE `licences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_05_22_224935_drop_jobs_and_failed_jobs_tables', 1),
(5, '2024_05_23_145601_create_items_table', 1),
(6, '2024_05_24_180021_add_timestamps_to_items_table', 1),
(7, '2024_06_01_143003_create_personal_access_tokens_table', 1),
(8, '2024_06_02_225327_create_participants_table', 1),
(9, '2024_06_03_221033_create_teams_table', 1),
(10, '2024_06_04_214256_create_companies_table', 1),
(11, '2024_06_04_214458_create_departments_table', 1),
(12, '2024_06_04_215900_create_licences_table', 1),
(13, '2024_06_05_151653_add_foreign_keys_to_participants_table', 1),
(14, '2024_06_05_152846_remove_created_by_and_updated_by_from_participants_table', 1),
(15, '2024_06_05_152954_remove_created_by_and_updated_by_from_items_table', 1),
(16, '2024_06_05_154005_alter_departments_table', 1),
(17, '2024_06_05_172843_drop_companies_table', 1),
(18, '2024_06_05_174410_create_user_types_table', 1),
(19, '2024_06_05_174415_add_ref_user_types_to_users_table', 1),
(20, '2024_06_07_114809_create_questionnaires_table', 1),
(21, '2024_06_07_114809_create_questions_table', 1),
(22, '2024_06_07_114809_create_responses_table', 1),
(23, '2024_06_07_155143_rename_user_types_to_entity_type', 1),
(24, '2024_06_07_155333_rename_ref_user_types_on_users_table', 1),
(25, '2024_06_07_160901_create_user_roles_table', 1),
(26, '2024_06_07_162321_add_role_id_and_created_by_to_users_table', 1),
(27, '2024_06_07_162345_add_role_id_to_participants_table', 1),
(35, '2024_06_07_162908_remove_created_by_from_users_table', 2),
(36, '2024_06_07_163611_add_foreign_key_to_role_id_in_participants_table', 2),
(37, '2024_06_07_171426_create_statuses_table', 2),
(38, '2024_06_07_171447_add_foreign_key_to_status_id_in_participants_table', 2),
(39, '2024_06_07_172122_remove_role_id_from_participants_table', 2),
(40, '2024_06_07_174043_remove_last_login_from_participants_table', 2),
(41, '2024_06_07_221754_add_foreign_key_to_responses_table', 3),
(42, '2024_06_07_222929_add_foreign_key_to_responses_table', 4),
(55, '2024_06_08_225410_allow_null_for_name_in_participants_table', 7),
(56, '2024_06_08_235308_create_user_teams_table', 7),
(57, '2024_06_09_134112_drop_user_teams_table', 7),
(59, '2024_06_09_141321_remove_user_id_from_teams_table', 8),
(60, '2024_06_09_141515_add_user_id_to_teams_table', 9),
(62, '2024_06_10_015018_create_team_questionnaire_table', 10),
(63, '2024_06_13_143055_create_invitations_table', 11),
(65, '2024_06_13_164451_create_participant_team_table', 12),
(66, '2024_06_13_171036_remove_ref_team_id_and_status_id_from_participants_table', 13),
(76, '2024_06_13_173523_add_default_value_to_status_id_in_participant_team_table', 14),
(77, '2024_06_19_135539_create_participant_auth_table', 14),
(82, '2024_06_21_134039_add_department_id_to_teams_table', 15),
(83, '2024_06_21_140111_create_department_user_table', 15),
(84, '2024_06_21_142008_remove_user_id_from_teams_table2', 16),
(85, '2024_06_22_164850_add_unique_constraint_to_participant_team_table', 17),
(86, '2024_06_23_155805_add_is_mandatory_to_questions_table', 18),
(88, '2024_06_23_211540_add_user_id_to_questionnaires_table', 19),
(91, '2024_06_19_191800_create_plan_activities_table', 20),
(92, '2024_06_19_204848_create_activities_table', 20),
(93, '2024_06_23_145841_create_partners_table', 20),
(94, '2024_06_25_143716_add_restrictions_passions_hobbies_to_participants_table', 20),
(95, '2024_06_26_133901_add_location_to_partners', 20),
(96, '2024_07_01_172915_add_quest_to_participants_table', 21);

-- --------------------------------------------------------

--
-- Estrutura da tabela `participants`
--

CREATE TABLE `participants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `restrictions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`restrictions`)),
  `passions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`passions`)),
  `hobbies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`hobbies`)),
  `quest` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `participants`
--

INSERT INTO `participants` (`id`, `email`, `name`, `phone`, `created_at`, `updated_at`, `restrictions`, `passions`, `hobbies`, `quest`) VALUES
(347, 'leandroduarte1@ua.pt', 'leandro', '912345678', NULL, NULL, NULL, NULL, NULL, 0),
(348, 'teste@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(349, 'leandroduarte2@ua.pt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(350, 'leonardpeartree@gmail.com', NULL, NULL, '2024-06-26 17:19:29', '2024-06-26 17:19:29', NULL, NULL, NULL, 0),
(351, 'jlfduarte.3@gmail.com', NULL, NULL, '2024-06-26 17:22:29', '2024-06-26 17:22:29', NULL, NULL, NULL, 0),
(352, 'naoexiste@ua.pt', NULL, NULL, '2024-06-26 17:23:05', '2024-06-26 17:23:05', NULL, NULL, NULL, 0),
(363, 'teste1@ua.pt', NULL, NULL, '2024-06-26 17:56:22', '2024-06-26 17:56:22', NULL, NULL, NULL, 0),
(364, 'qwiodhqoiw@ua.pt', NULL, NULL, '2024-06-26 18:03:18', '2024-06-26 18:03:18', NULL, NULL, NULL, 0),
(365, 'leandroduarte3@ua.pt', NULL, NULL, '2024-06-26 18:25:19', '2024-06-26 18:25:19', NULL, NULL, NULL, 0),
(366, 'leofduarte.3@gmail.com', NULL, NULL, '2024-06-26 18:25:31', '2024-06-26 18:25:31', NULL, NULL, NULL, 0),
(367, 'teste2000@ua.pt', NULL, NULL, '2024-06-27 00:12:06', '2024-06-27 00:12:06', NULL, NULL, NULL, 0),
(368, 'teste3@mail.com', NULL, NULL, '2024-06-27 13:10:53', '2024-06-27 13:10:53', NULL, NULL, NULL, 0),
(369, 'test5@gmail.com', NULL, NULL, '2024-06-27 13:10:53', '2024-06-27 13:10:53', NULL, NULL, NULL, 0),
(370, 'teste@mail.com', NULL, NULL, '2024-06-27 13:10:53', '2024-06-27 13:10:53', NULL, NULL, NULL, 0),
(371, 'teste10@mail.com', NULL, NULL, '2024-06-27 13:10:53', '2024-06-27 13:10:53', NULL, NULL, NULL, 0),
(372, 'teste11@mail.com', NULL, NULL, '2024-06-27 13:10:53', '2024-06-27 13:10:53', NULL, NULL, NULL, 0),
(373, 'teste12@mail.com', NULL, NULL, '2024-06-27 13:10:53', '2024-06-27 13:10:53', NULL, NULL, NULL, 0),
(374, 'teste13@mail.com', NULL, NULL, '2024-06-27 13:10:53', '2024-06-27 13:10:53', NULL, NULL, NULL, 0),
(375, 'moses33@example.net', 'Eusebio Walsh V', '(283) 809-4185', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"lactose\\\"]\"', '\"[\\\"coding\\\",\\\"reading\\\",\\\"traveling\\\"]\"', '\"[\\\"painting\\\",\\\"gaming\\\",\\\"dancing\\\"]\"', 0),
(376, 'ktoy@example.com', 'Casimer Baumbach II', '520-816-3830', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"nuts\\\"]\"', '\"[\\\"traveling\\\"]\"', '\"[\\\"gaming\\\"]\"', 0),
(377, 'hoeger.cathrine@example.com', 'Andreane Brown', '(540) 343-3124', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"lactose\\\"]\"', '\"[\\\"traveling\\\",\\\"music\\\",\\\"reading\\\"]\"', '\"[\\\"cooking\\\",\\\"dancing\\\",\\\"hiking\\\"]\"', 0),
(378, 'noemie.conn@example.net', 'Chelsea Herman', '+12724914012', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"none\\\",\\\"lactose\\\"]\"', '\"[\\\"music\\\",\\\"reading\\\"]\"', '\"[\\\"hiking\\\",\\\"gaming\\\"]\"', 0),
(379, 'itzel10@example.net', 'Prof. Jacinto Greenfelder', '619.394.6870', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"nuts\\\",\\\"lactose\\\"]\"', '\"[\\\"reading\\\",\\\"sports\\\"]\"', '\"[\\\"dancing\\\",\\\"hiking\\\",\\\"gaming\\\"]\"', 0),
(380, 'greichert@example.com', 'Eloisa Gislason I', '1-858-840-2372', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"none\\\"]\"', '\"[\\\"music\\\"]\"', '\"[\\\"dancing\\\",\\\"cooking\\\"]\"', 0),
(381, 'keebler.elouise@example.com', 'leandro duarte', '(936) 784-5376', '2024-06-27 14:01:01', '2024-07-03 12:22:37', '[\"Sente-se muito confort\\u00e1vel com atividade fisica e desporto\",\"Restri\\u00e7\\u00f5es alimentares: kiwi\",\"Gosto de nadar onde tenho p\\u00e9\",\"Sente-se confort\\u00e1vel com atividade ao ar livre\",\"Condi\\u00e7\\u00f5es de sa\\u00fade: N\\u00e3o\"]', '[\"cinema\",\"entretenimento\",\"tecnologia\",\"sossego\",\"tranquilidade\",\"ambiente familiar\",\"self-improvement\",\"amizades\",\"relaxar\"]', '[\"ver filmes\",\"ouvir m\\u00fasica\",\"reflex\\u00e3o\",\"medita\\u00e7\\u00e3o\",\"convivio\",\"exercicios fisicos\"]', 1),
(382, 'beffertz@example.com', 'Jordi Dicki', '+1-930-233-6962', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"nuts\\\",\\\"gluten\\\"]\"', '\"[\\\"reading\\\",\\\"coding\\\",\\\"traveling\\\"]\"', '\"[\\\"cooking\\\"]\"', 0),
(383, 'npagac@example.net', 'Mr. Kian Kub PhD', '+13524914375', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"none\\\"]\"', '\"[\\\"coding\\\",\\\"traveling\\\",\\\"music\\\"]\"', '\"[\\\"painting\\\"]\"', 0),
(384, 'block.zachary@example.net', 'Nathanial Nader', '+1.820.794.5960', '2024-06-27 14:01:01', '2024-06-27 14:01:01', '\"[\\\"lactose\\\",\\\"nuts\\\",\\\"gluten\\\"]\"', '\"[\\\"traveling\\\",\\\"reading\\\"]\"', '\"[\\\"hiking\\\",\\\"painting\\\"]\"', 0),
(385, 'leandroduarte4@ua.pt', NULL, NULL, '2024-06-28 11:19:08', '2024-06-28 11:19:08', NULL, NULL, NULL, 0),
(386, 'leofduarte.3@gmail.com', NULL, NULL, '2024-06-28 11:25:41', '2024-06-28 11:25:41', NULL, NULL, NULL, 0),
(387, 'mariarodriguesmonteiro@ua.pt', NULL, NULL, '2024-06-28 11:25:41', '2024-06-28 11:25:41', NULL, NULL, NULL, 0),
(388, 'leandro1@ua.pt', NULL, NULL, '2024-06-28 11:25:41', '2024-06-28 11:25:41', NULL, NULL, NULL, 0),
(389, 'leandro2@ua.pt', NULL, NULL, '2024-06-28 11:25:41', '2024-06-28 11:25:41', NULL, NULL, NULL, 0),
(390, 'leandro3@ua.pt', NULL, NULL, '2024-06-28 11:25:41', '2024-06-28 11:25:41', NULL, NULL, NULL, 0),
(391, 'leandro4@ua.pt', NULL, NULL, '2024-06-28 11:25:41', '2024-06-28 11:25:41', NULL, NULL, NULL, 0),
(392, 'leandro5@ua.pt', NULL, NULL, '2024-06-28 11:25:41', '2024-06-28 11:25:41', NULL, NULL, NULL, 0),
(393, 'teste@gmail.com', NULL, NULL, '2024-06-28 11:26:07', '2024-06-28 11:26:07', NULL, NULL, NULL, 0),
(394, 'leonardpeartree@gmail.com', NULL, NULL, '2024-06-28 11:26:07', '2024-06-28 11:26:07', NULL, NULL, NULL, 0),
(395, 'test5@gmail.com', NULL, NULL, '2024-06-28 11:26:07', '2024-06-28 11:26:07', NULL, NULL, NULL, 0),
(396, 'leandroduarte5@ua.pt', NULL, NULL, '2024-06-28 20:51:27', '2024-06-28 20:51:27', NULL, NULL, NULL, 0),
(397, 'leandroduarte6@ua.pt', NULL, NULL, '2024-06-28 20:54:50', '2024-06-28 20:54:50', NULL, NULL, NULL, 0),
(398, 'leandroduarte7@ua.pt', NULL, NULL, '2024-06-28 21:06:03', '2024-06-28 21:06:03', NULL, NULL, NULL, 0),
(399, 'leandroduarte8@ua.pt', NULL, NULL, '2024-06-28 21:19:07', '2024-06-28 21:19:07', NULL, NULL, NULL, 0),
(400, 'leandroduarte@ua.pt', 'José Leandro Freitas Duarte', NULL, '2024-06-28 21:26:03', '2024-07-03 13:02:43', '[\"Sente-se indiferente com atividade fisica e desporto\",\"Restri\\u00e7\\u00f5es alimentares: as\",\"Gosto de nadar e sinto-me confort\\u00e1vel em \\u00e1guas profundas\",\"Sente-se muito confort\\u00e1vel com atividade ao ar livre\",\"Condi\\u00e7\\u00f5es de sa\\u00fade: as\"]', '[\"desporto\",\"natureza\",\"aventura\"]', '[\"explorar trilhas\",\"praticar desportos\"]', 1),
(401, 'rubenduarte@ua.pt', NULL, NULL, '2024-06-28 21:32:38', '2024-06-28 21:32:38', NULL, NULL, NULL, 0),
(402, 'alrmelro@gmail.com', NULL, NULL, '2024-06-28 22:00:35', '2024-06-28 22:00:35', NULL, NULL, NULL, 0),
(403, 'etsaiosdl@gmail.com', NULL, NULL, '2024-06-28 22:05:45', '2024-06-28 22:05:45', NULL, NULL, NULL, 0),
(404, 'aaaa344rff4@gmail.com', NULL, NULL, '2024-06-28 22:07:40', '2024-06-28 22:07:40', NULL, NULL, NULL, 0),
(405, '123@gmail.com', NULL, NULL, '2024-06-29 12:11:32', '2024-06-29 12:11:32', NULL, NULL, NULL, 0),
(406, 'teste4@mail.com', NULL, NULL, '2024-06-29 12:22:56', '2024-06-29 12:22:56', NULL, NULL, NULL, 0),
(407, 'teste8@mail.com', NULL, NULL, '2024-06-29 12:23:24', '2024-06-29 12:23:24', NULL, NULL, NULL, 0),
(408, 'rubenduarte123@ua.pt', NULL, NULL, '2024-06-29 14:39:03', '2024-06-29 14:39:03', NULL, NULL, NULL, 0),
(409, 'teste12@gmail.com', NULL, NULL, '2024-06-29 14:50:14', '2024-06-29 14:50:14', NULL, NULL, NULL, 0),
(410, 'teste111@mail.com', NULL, NULL, '2024-06-29 14:50:37', '2024-06-29 14:50:37', NULL, NULL, NULL, 0),
(411, 'teste1540@mail.com', NULL, NULL, '2024-06-29 14:52:28', '2024-06-29 14:52:28', NULL, NULL, NULL, 0),
(412, 'leofduarte@gmail.com', NULL, NULL, '2024-06-29 14:54:59', '2024-06-29 14:54:59', NULL, NULL, NULL, 0),
(413, 'anon@mail.com', NULL, NULL, '2024-06-29 14:57:28', '2024-06-29 14:57:28', NULL, NULL, NULL, 0),
(414, 'teste12345@gmail.com', NULL, NULL, '2024-06-29 15:11:48', '2024-06-29 15:11:48', NULL, NULL, NULL, 0),
(415, 'leandro@ua.pt', NULL, NULL, '2024-06-29 15:12:26', '2024-06-29 15:12:26', NULL, NULL, NULL, 0),
(416, 'jlfduarte@gmail.com', NULL, NULL, '2024-06-29 15:13:00', '2024-06-29 15:13:00', NULL, NULL, NULL, 0),
(417, 'teste112@mail.com', NULL, NULL, '2024-06-29 15:14:35', '2024-06-29 15:14:35', NULL, NULL, NULL, 0),
(418, '123456@gmail.com', NULL, NULL, '2024-06-29 15:15:08', '2024-06-29 15:15:08', NULL, NULL, NULL, 0),
(419, 'qer789@example.com', NULL, NULL, '2024-06-29 15:16:29', '2024-06-29 15:16:29', NULL, NULL, NULL, 0),
(420, 'teste124@mail.com', NULL, NULL, '2024-06-29 15:17:27', '2024-06-29 15:17:27', NULL, NULL, NULL, 0),
(421, '2345678@gmail.com', NULL, NULL, '2024-06-29 15:20:36', '2024-06-29 15:20:36', NULL, NULL, NULL, 0),
(422, 'ppp@ua.pt', NULL, NULL, '2024-06-29 15:23:19', '2024-06-29 15:23:19', NULL, NULL, NULL, 0),
(423, 'pavlo@lol.pt', NULL, NULL, '2024-07-02 12:57:45', '2024-07-02 12:57:45', NULL, NULL, NULL, 0),
(424, 'ruben@uaas.pt', NULL, NULL, '2024-07-02 12:57:45', '2024-07-02 12:57:45', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `participant_auth`
--

CREATE TABLE `participant_auth` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `participant_auth`
--

INSERT INTO `participant_auth` (`id`, `email`, `code`, `created_at`, `updated_at`) VALUES
(17, 'leandroduarte@ua.pt', 111111, '2024-07-03 10:12:07', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `participant_team`
--

CREATE TABLE `participant_team` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `participant_id` bigint(20) UNSIGNED NOT NULL,
  `team_id` bigint(20) UNSIGNED NOT NULL,
  `status_id` bigint(20) UNSIGNED NOT NULL DEFAULT 3,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `participant_team`
--

INSERT INTO `participant_team` (`id`, `participant_id`, `team_id`, `status_id`, `created_at`, `updated_at`) VALUES
(214, 347, 121, 1, NULL, NULL),
(216, 350, 121, 3, NULL, NULL),
(217, 351, 121, 3, NULL, NULL),
(234, 368, 121, 3, NULL, NULL),
(236, 370, 121, 3, NULL, NULL),
(237, 371, 121, 3, NULL, NULL),
(238, 372, 121, 3, NULL, NULL),
(239, 373, 121, 3, NULL, NULL),
(240, 374, 121, 3, NULL, NULL),
(307, 366, 121, 3, NULL, NULL),
(308, 400, 121, 1, '2024-07-02 13:47:43', NULL),
(309, 423, 121, 3, NULL, NULL),
(310, 424, 121, 3, NULL, NULL),
(311, 400, 129, 3, NULL, NULL),
(312, 351, 129, 3, NULL, NULL),
(313, 350, 129, 3, NULL, NULL),
(314, 351, 130, 3, NULL, NULL),
(315, 387, 130, 3, NULL, NULL),
(316, 350, 130, 3, NULL, NULL),
(317, 400, 130, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `partners`
--

CREATE TABLE `partners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `partners`
--

INSERT INTO `partners` (`id`, `name`, `url`, `description`, `created_at`, `updated_at`, `location`) VALUES
(1, 'Doce aveiro - aveiro', 'https://www.facebook.com/DoceAveiro/?locale=pt_PT', 'Doce aveiro - pastelaria com 20% de desconto para grupos', '2024-06-27 13:45:59', '2024-06-27 13:46:17', 'Aveiro'),
(2, 'parceiro 1', 'https://www.facebook.com/DoceAveiro/?locale=pt_PT', 'desconto 10% em comida', '2024-06-28 10:15:48', '2024-06-28 10:15:48', 'Aveiro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `plan_activities`
--

CREATE TABLE `plan_activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `team_id` bigint(20) UNSIGNED DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `objectives` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`objectives`)),
  `observations` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `plan_activities`
--

INSERT INTO `plan_activities` (`id`, `name`, `duration`, `date`, `location`, `team_id`, `price`, `objectives`, `observations`, `created_at`, `updated_at`) VALUES
(43, 'Jogar Futebol', '2 horas', '2024-07-25', 'Aveiro', 121, '50', '[\"melhorar as rela\\u00e7\\u00f5es interpessoais\",\"descontrair e divertir\"]', NULL, '2024-07-03 10:38:35', '2024-07-03 10:38:35'),
(44, 'Jogar Futebol', '2 horas', '2024-07-05', 'Aveiro', 130, '1820', '[\"melhorar as rela\\u00e7\\u00f5es interpessoais\",\"descontrair e divertir\"]', NULL, '2024-07-03 13:05:26', '2024-07-03 13:05:26');

-- --------------------------------------------------------

--
-- Estrutura da tabela `questionnaires`
--

CREATE TABLE `questionnaires` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `questionnaires`
--

INSERT INTO `questionnaires` (`id`, `title`, `description`, `created_at`, `updated_at`, `user_id`) VALUES
(1, 'Feedback', 'Perguntas de Feedback Obrigatórias', NULL, NULL, NULL),
(94, 'Bem-Estar e Restrições', 'Questionário de Interesses - Bem-Estar e Restrições', NULL, NULL, NULL),
(95, 'Áreas de Interesse', 'Questionário de Interesses- Áreas de Interesse', NULL, NULL, NULL),
(96, 'O que te Motiva', 'Questionário de Interesses - Mais sobre o que te Motiva', NULL, NULL, NULL),
(97, 'teste', 'teste', '2024-06-30 15:56:27', '2024-06-30 15:56:27', 1),
(100, 'simao', 'simao quest', '2024-07-02 21:37:01', '2024-07-02 21:37:01', 1),
(101, 'Novo', 'novo', '2024-07-02 21:44:33', '2024-07-02 21:44:33', 1),
(108, 'Novo Questionário', NULL, '2024-07-02 22:13:32', '2024-07-02 22:13:32', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `questionnaire_id` bigint(20) UNSIGNED DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `placeholder` varchar(255) DEFAULT NULL,
  `tooltip` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_mandatory` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `questions`
--

INSERT INTO `questions` (`id`, `questionnaire_id`, `description`, `label`, `options`, `placeholder`, `tooltip`, `type`, `value`, `created_at`, `updated_at`, `is_mandatory`) VALUES
(1, 1, NULL, 'ques 1', '[null]', NULL, NULL, 'text', NULL, '2024-07-02 21:38:05', '2024-07-02 21:55:53', 1),
(2, 1, NULL, 'quest 1', '[null]', NULL, NULL, 'checkbox', NULL, '2024-07-02 21:38:05', '2024-07-02 21:55:53', 1),
(3, 1, NULL, 'quest 1', '[{\"id\":\"option-1\",\"label\":\"1\"},{\"id\":\"option-2\",\"label\":\"2\"},{\"id\":\"option-3\",\"label\":\"3\"},{\"id\":\"option-4\",\"label\":\"4\"}]', NULL, NULL, 'radio', NULL, '2024-07-02 21:38:05', '2024-07-02 21:55:53', 1),
(769, 94, NULL, 'Como te sentes em relação a atividades físicas e desporto?', '[{\"id\":\"option-1\",\"label\":\"Nada Confort\\u00e1vel\"},{\"id\":\"option-2\",\"label\":\"Pouco Confort\\u00e1vel\"},{\"id\":\"option-3\",\"label\":\"Confort\\u00e1vel\"},{\"id\":\"option-4\",\"label\":\"Muito confort\\u00e1vel\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:01:47', '2024-06-30 16:01:47', 0),
(770, 94, NULL, 'Tens alguma restrição alimentar ou alergia de que precisamos estar cientes? Se sim, por favor, especifica.', '[null]', 'ex. Intolerante à Lactose', NULL, 'text', NULL, '2024-06-30 16:01:47', '2024-06-30 16:01:47', 0),
(771, 94, NULL, 'Gostas de nadar? Se sim, sentes-te confortável em águas mais profundas?', '[{\"id\":\"option-1\",\"label\":\"N\\u00e3o gosto de nadar\"},{\"id\":\"option-2\",\"label\":\"Gosto de nadar onde tenho p\\u00e9\"},{\"id\":\"option-3\",\"label\":\"Gosto de nadar e sinto-me confort\\u00e1vel\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:01:47', '2024-06-30 16:01:47', 0),
(772, 94, NULL, 'Qual é o teu nível de conforto em atividades ao ar livre (caminhadas, acampamentos, etc.)?', '[{\"id\":\"option-1\",\"label\":\"Nada Confort\\u00e1vel\"},{\"id\":\"option-2\",\"label\":\"Pouco Confort\\u00e1vel\"},{\"id\":\"option-3\",\"label\":\"Confort\\u00e1vel\"},{\"id\":\"option-4\",\"label\":\"Muito confort\\u00e1vel\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:01:47', '2024-06-30 16:01:47', 0),
(773, 94, NULL, 'Tens alguma condição de saúde ou lesão permanente que possa afetar a tua participação em alguma atividade?', '[null]', 'ex. Dor Lombar', NULL, 'text', NULL, '2024-06-30 16:01:47', '2024-06-30 16:01:47', 0),
(780, 95, NULL, 'Quando tens tempo livre, o que preferes fazer?', '[{\"id\":\"option-1\",\"label\":\"Ler um livro\"},{\"id\":\"option-2\",\"label\":\"Assistir a um filme ou s\\u00e9rie\"},{\"id\":\"option-3\",\"label\":\"Sair com amigos ou conviver\"},{\"id\":\"option-4\",\"label\":\"Fazer uma caminhada, ir dar uma corrida para relaxar\"},{\"id\":\"option-5\",\"label\":\"Outros\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:32:02', '2024-06-30 16:32:02', 0),
(781, 95, NULL, 'Se tivesses oportunidade, que atividade gostarias de experimentar ou aprofundar?', '[{\"id\":\"option-1\",\"label\":\"Participar em aulas de pintura, escultura ou outra express\\u00e3o art\\u00edstica\"},{\"id\":\"option-2\",\"label\":\"Aprender a tocar um instrumento musical\"},{\"id\":\"option-3\",\"label\":\"Envolvimento em grupos de discuss\\u00e3o sobre temas de interesse\"},{\"id\":\"option-4\",\"label\":\"Experimentar um novo desporto ou atividade f\\u00edsica\"},{\"id\":\"option-5\",\"label\":\"Outros\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:32:02', '2024-06-30 16:32:02', 0),
(782, 95, NULL, 'Imagina um dia inteiramente teu como gostarias de o passar?', '[{\"id\":\"option-1\",\"label\":\"A absorver arte numa galeria ou a participar em workshops criativos\"},{\"id\":\"option-2\",\"label\":\"A ver um filme no conforto da tua casa\"},{\"id\":\"option-3\",\"label\":\"A desfrutar de um animado almo\\u00e7o ou jantar na companhia de amigos\"},{\"id\":\"option-4\",\"label\":\"A explorar trilhas na natureza ou a praticar desportos ao ar livre\"},{\"id\":\"option-5\",\"label\":\"Outros\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:32:02', '2024-06-30 16:32:02', 0),
(783, 96, NULL, 'O que te fascina mais no teu ambiente profissional?', '[{\"id\":\"option-1\",\"label\":\"Alcan\\u00e7ar metas concretas e ver resultados palp\\u00e1veis\"},{\"id\":\"option-2\",\"label\":\"Explorar novos conhecimentos e desafiar a mente\"},{\"id\":\"option-3\",\"label\":\"Cooperar com colegas e desenvolver projetos em equipa\"},{\"id\":\"option-4\",\"label\":\"Expressar a tua criatividade e contribuir com ideias \\u00fanicas\"},{\"id\":\"option-5\",\"label\":\"Outros\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:42:14', '2024-06-30 16:42:14', 0),
(784, 96, NULL, 'Se pudesses viajar para um lugar específico, qual seria o destino dos teus sonhos?', '[{\"id\":\"option-1\",\"label\":\"Uma cidade hist\\u00f3rica enraizada em cultura e tradi\\u00e7\\u00e3o\"},{\"id\":\"option-2\",\"label\":\"Uma praia paradis\\u00edaca com paisagens deslumbrantes e atmosfera relaxante\"},{\"id\":\"option-3\",\"label\":\"Um destino ex\\u00f3tico e pouco explorado, repleto de aventuras e descobertas\"},{\"id\":\"option-4\",\"label\":\"Um local conhecido pela sua efervesc\\u00eancia art\\u00edstica e cen\\u00e1rio cultural vibrante\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:42:14', '2024-06-30 16:42:14', 0),
(785, 96, NULL, 'O que te fascina mais no teu ambiente profissional?', '[{\"id\":\"option-1\",\"label\":\"Alcan\\u00e7ar metas concretas e ver resultados palp\\u00e1veis\"},{\"id\":\"option-2\",\"label\":\"Explorar novos conhecimentos e desafiar a mente\"},{\"id\":\"option-3\",\"label\":\"Cooperar com colegas e desenvolver projetos em equipa\"},{\"id\":\"option-4\",\"label\":\"Expressar a tua criatividade e contribuir com ideias \\u00fanicas\"},{\"id\":\"option-5\",\"label\":\"Outros\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:42:20', '2024-06-30 16:42:20', 0),
(786, 96, NULL, 'Se pudesses viajar para um lugar específico, qual seria o destino dos teus sonhos?', '[{\"id\":\"option-1\",\"label\":\"Uma cidade hist\\u00f3rica enraizada em cultura e tradi\\u00e7\\u00e3o\"},{\"id\":\"option-2\",\"label\":\"Uma praia paradis\\u00edaca com paisagens deslumbrantes e atmosfera relaxante\"},{\"id\":\"option-3\",\"label\":\"Um destino ex\\u00f3tico e pouco explorado, repleto de aventuras e descobertas\"},{\"id\":\"option-4\",\"label\":\"Um local conhecido pela sua efervesc\\u00eancia art\\u00edstica e cen\\u00e1rio cultural vibrante\"},{\"id\":\"option-5\",\"label\":\"Outros\"}]', NULL, NULL, 'radio', NULL, '2024-06-30 16:42:20', '2024-06-30 16:42:20', 0),
(821, 108, NULL, 'ques 1', '[\"[null]\"]', NULL, NULL, 'text', NULL, '2024-07-02 22:13:32', '2024-07-02 22:13:32', 1),
(822, 108, NULL, 'quest 1', '[\"[null]\"]', NULL, NULL, 'checkbox', NULL, '2024-07-02 22:13:32', '2024-07-02 22:13:32', 1),
(823, 108, NULL, 'quest 1', '[{\"id\":\"option-1\",\"label\":\"1\"},{\"id\":\"option-2\",\"label\":\"2\"},{\"id\":\"option-3\",\"label\":\"3\"},{\"id\":\"option-4\",\"label\":\"4\"}]', NULL, NULL, 'radio', NULL, '2024-07-02 22:13:32', '2024-07-02 22:13:32', 1),
(824, 108, NULL, 'Nova Pergunta', NULL, NULL, NULL, 'text', NULL, '2024-07-02 22:17:24', '2024-07-02 22:29:10', 0),
(825, 108, NULL, 'Pergunta de Checkbox', NULL, NULL, NULL, 'checkbox', NULL, '2024-07-02 22:17:24', '2024-07-02 22:29:10', 0),
(828, 108, NULL, 'Terceira questão', NULL, NULL, NULL, 'text', NULL, '2024-07-02 22:21:04', '2024-07-02 22:29:10', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `responses`
--

CREATE TABLE `responses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `participant_id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `response` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('cDMdBfEuPwAB7mhNCPFI8AxZs4a98a2MSiHMkgm9', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiZGJoT2JWNjJOYmhoWWVqTUtOSkFNYTE3VE8yNUVXSzlkTGNHR0FUMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjMxOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZGFzaGJvYXJkIjt9czo1OToibG9naW5fcGFydGljaXBhbnRzXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDAwO3M6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1720023721),
('mRniE9pmDa6dtRh4T5QMZM92SSjFh78Vjxe6cGbi', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiQXpPRWpZaXFXRmZNUWhhT2ZiRTVTdFNkbjRVdkFLTGFYWjk1bkwycCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozODoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3RlYW1zLzEyMT9wYWdlPTIiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjU5OiJsb2dpbl9wYXJ0aWNpcGFudHNfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo0MDA7fQ==', 1719928721);

-- --------------------------------------------------------

--
-- Estrutura da tabela `statuses`
--

CREATE TABLE `statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `statuses`
--

INSERT INTO `statuses` (`id`, `status_name`, `created_at`, `updated_at`) VALUES
(1, 'Active', NULL, NULL),
(2, 'Inactive', NULL, NULL),
(3, 'Pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `teams`
--

CREATE TABLE `teams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `teams`
--

INSERT INTO `teams` (`id`, `department_id`, `name`, `created_at`, `updated_at`) VALUES
(121, 12, 'Equipa de Comunicação', NULL, NULL),
(129, 12, 'teste', '2024-07-02 20:38:15', '2024-07-02 20:38:15'),
(130, 7, 'José Leandro Freitas Duarte', '2024-07-03 13:04:06', '2024-07-03 13:04:06');

-- --------------------------------------------------------

--
-- Estrutura da tabela `team_questionnaire`
--

CREATE TABLE `team_questionnaire` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `team_id` bigint(20) UNSIGNED NOT NULL,
  `questionnaire_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `team_questionnaire`
--

INSERT INTO `team_questionnaire` (`id`, `team_id`, `questionnaire_id`, `created_at`, `updated_at`) VALUES
(32, 121, 97, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `ref_entity_type` bigint(20) UNSIGNED DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `ref_entity_type`, `role_id`) VALUES
(1, 'leandro.', 'leandroduarte@ua.pt', '2024-06-04 00:43:10', '$2y$12$3aovvpJNpDR.Yp9cUEn4CuMDR0Aa4Z9oFj2SWsyM33h9yjlXUp.xe', 'nkkjp5T3PLdvBbUFxGEdYLKJtNohA5HdHJywmGvODjylMv34sjrT3hAQ1UFm', '2024-06-07 18:59:26', '2024-06-07 18:59:26', 2, 1),
(2, 'teste', 'teste@gmail.com', NULL, '$2y$12$fdNinMjEYrnpd74D6KH5W.lRC8WWmUf.qt6.U7c0ckLLCF8qJk/JS', NULL, '2024-06-21 20:44:19', '2024-06-21 20:44:19', NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `user_roles`
--

INSERT INTO `user_roles` (`id`, `role_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', NULL, NULL),
(2, 'Manager', NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `activities_plan_activity_id_unique` (`plan_activity_id`);

--
-- Índices para tabela `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Índices para tabela `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Índices para tabela `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `department_user`
--
ALTER TABLE `department_user`
  ADD UNIQUE KEY `department_user_user_id_department_id_unique` (`user_id`,`department_id`),
  ADD KEY `department_user_department_id_foreign` (`department_id`);

--
-- Índices para tabela `entity_type`
--
ALTER TABLE `entity_type`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Índices para tabela `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invitations_token_unique` (`token`),
  ADD KEY `invitations_team_id_foreign` (`team_id`);

--
-- Índices para tabela `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Índices para tabela `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `licences`
--
ALTER TABLE `licences`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `participant_auth`
--
ALTER TABLE `participant_auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `participant_auth_email_unique` (`email`);

--
-- Índices para tabela `participant_team`
--
ALTER TABLE `participant_team`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `participant_team_participant_id_team_id_unique` (`participant_id`,`team_id`),
  ADD KEY `participant_team_participant_id_foreign` (`participant_id`),
  ADD KEY `participant_team_team_id_foreign` (`team_id`),
  ADD KEY `participant_team_status_id_foreign` (`status_id`);

--
-- Índices para tabela `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Índices para tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Índices para tabela `plan_activities`
--
ALTER TABLE `plan_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_activities_team_id_foreign` (`team_id`);

--
-- Índices para tabela `questionnaires`
--
ALTER TABLE `questionnaires`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_questionnaire_id_foreign` (`questionnaire_id`);

--
-- Índices para tabela `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `responses_participant_id_question_id_unique` (`participant_id`,`question_id`),
  ADD KEY `responses_question_id_foreign_unique` (`question_id`);

--
-- Índices para tabela `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Índices para tabela `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teams_department_id_foreign` (`department_id`);

--
-- Índices para tabela `team_questionnaire`
--
ALTER TABLE `team_questionnaire`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_questionnaire_team_id_questionnaire_id_unique` (`team_id`,`questionnaire_id`),
  ADD KEY `team_questionnaire_questionnaire_id_foreign` (`questionnaire_id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_ref_entity_type_foreign` (`ref_entity_type`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- Índices para tabela `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `activities`
--
ALTER TABLE `activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `entity_type`
--
ALTER TABLE `entity_type`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT de tabela `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `licences`
--
ALTER TABLE `licences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de tabela `participants`
--
ALTER TABLE `participants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=425;

--
-- AUTO_INCREMENT de tabela `participant_auth`
--
ALTER TABLE `participant_auth`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `participant_team`
--
ALTER TABLE `participant_team`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=318;

--
-- AUTO_INCREMENT de tabela `partners`
--
ALTER TABLE `partners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `plan_activities`
--
ALTER TABLE `plan_activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `questionnaires`
--
ALTER TABLE `questionnaires`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT de tabela `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=830;

--
-- AUTO_INCREMENT de tabela `responses`
--
ALTER TABLE `responses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de tabela `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `teams`
--
ALTER TABLE `teams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT de tabela `team_questionnaire`
--
ALTER TABLE `team_questionnaire`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_plan_activity_id_foreign` FOREIGN KEY (`plan_activity_id`) REFERENCES `plan_activities` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `department_user`
--
ALTER TABLE `department_user`
  ADD CONSTRAINT `department_user_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `department_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `invitations_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `participant_team`
--
ALTER TABLE `participant_team`
  ADD CONSTRAINT `participant_team_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `participant_team_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `participant_team_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `plan_activities`
--
ALTER TABLE `plan_activities`
  ADD CONSTRAINT `plan_activities_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `questionnaires`
--
ALTER TABLE `questionnaires`
  ADD CONSTRAINT `questionnaires_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_questionnaire_id_foreign` FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaires` (`id`);

--
-- Limitadores para a tabela `responses`
--
ALTER TABLE `responses`
  ADD CONSTRAINT `responses_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`),
  ADD CONSTRAINT `responses_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `responses_question_id_foreign_unique` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `unique_foreign_key_name` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `team_questionnaire`
--
ALTER TABLE `team_questionnaire`
  ADD CONSTRAINT `team_questionnaire_questionnaire_id_foreign` FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaires` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `team_questionnaire_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ref_entity_type_foreign` FOREIGN KEY (`ref_entity_type`) REFERENCES `entity_type` (`id`),
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
