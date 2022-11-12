-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2022 a las 15:21:24
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `to-do`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaResolucion` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `prioridad` varchar(20) NOT NULL,
  `fechaLimite` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  `listaId` int(11) NOT NULL,
  `duenioId` int(11) NOT NULL,
  `receptorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id`, `titulo`, `fechaCreacion`, `fechaResolucion`, `descripcion`, `prioridad`, `fechaLimite`, `estado`, `listaId`, `duenioId`, `receptorId`) VALUES
(38, 'lavar los platos', '2022-11-08', '0000-00-00', 'lavarlos a las 15hs', 'baja', '2022-12-09', 'sin resolver', 26, 43, 43),
(39, 'barrer la casa', '2022-11-08', '0000-00-00', 'tengo que barrer o me pegan', 'alta', '2022-12-01', 'sin resolver', 26, 43, 43),
(40, 'darle de comer a las mascotas', '2022-11-08', '0000-00-00', 'se le da comida o f', 'alta', '2022-12-09', 'sin resolver', 26, 43, 43),
(41, 'lavar la ropa', '2022-11-08', '0000-00-00', 'ropa sucia', 'media', '2022-12-08', 'sin resolver', 26, 46, 43),
(42, 'ir al trabajo el 11/11', '2022-11-08', '0000-00-00', 'o me despiden y no como', 'alta', '2022-12-08', 'sin resolver', 27, 46, 43),
(43, 'no pelearme con mi jefe', '2022-11-08', '0000-00-00', 'o  me despiden y no como x2', 'alta', '2022-12-07', 'sin resolver', 27, 46, 43),
(44, 'consultas BD', '2022-11-08', '0000-00-00', 'hacer consultas a la base de datos de *-_+*+-+*-_', 'media', '2022-12-08', 'sin resolver', 28, 46, 44),
(45, 'hacer un lindo fontend', '2022-11-08', '0000-00-00', 'algo imposible', 'alta', '2022-12-09', 'sin resolver', 28, 48, 44),
(46, 'rutear como se debe', '2022-11-08', '2022-11-08', 'feos nombres de rutas', 'media', '2022-12-08', 'resuelta', 28, 48, 44),
(47, 'una tarea sin lista', '2022-11-08', '0000-00-00', 'soy una tarea solitaria :/', 'alta', '2022-12-10', 'sin resolver', 0, 48, 44),
(48, 'respirar aire puro', '2022-11-08', '0000-00-00', 'relax', 'media', '2022-12-08', 'sin resolver', 30, 45, 45),
(49, 'salir a correr', '2022-11-08', '0000-00-00', 'cuando no haya sol, asi no me da un golpe de calor y me muero', 'alta', '2022-12-08', 'sin resolver', 30, 48, 45),
(51, 'subir videos de clases', '2022-11-08', '0000-00-00', 'no hay descripcion', 'media', '2022-12-10', 'sin resolver', 31, 45, 46),
(124, 'limpiar el sotano', '2022-11-10', '0000-00-00', 'esta la llorona, hay que tener cuidado', 'alta', '2022-12-09', 'sin resolver', 0, 45, 45),
(125, 'picar piedra', '2022-11-10', '2022-11-10', 'como en minecraft', 'baja', '2022-12-08', 'sin resolver', 0, 45, 44),
(130, 'administrar cosas', '2022-11-10', '2022-11-10', 'cosas', 'baja', '2022-12-08', 'resolviendo', 0, 45, 44),
(145, 'rendir ingenieria', '2022-11-11', '0000-00-00', 'sueet', 'media', '2022-12-09', 'sin resolver', 0, 45, 44);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaitems`
--

CREATE TABLE `listaitems` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaResolucion` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `userId` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `listaitems`
--

INSERT INTO `listaitems` (`id`, `titulo`, `fechaCreacion`, `fechaResolucion`, `estado`, `categoria`, `userId`) VALUES
(26, 'CASA', '2022-11-08', '0000-00-00', 'sin resolver', 'casaa', '43'),
(27, 'TRABAJO', '2022-11-08', '0000-00-00', 'sin resolver', 'trabajo', '43'),
(28, 'TO-DO', '2022-11-08', '0000-00-00', 'sin resolver', 'proyecto', '44'),
(29, 'una lista sin tareas', '2022-11-08', '0000-00-00', 'sin resolver', 'lista solitaria ', '44'),
(30, 'Mi cuerpo', '2022-11-08', '0000-00-00', 'sin resolver', 'fit', '45'),
(31, 'LABORATORIO 2', '2022-11-08', '0000-00-00', 'sin resolver', 'ulp', '46'),
(32, 'OTRA LISTA', '2022-11-08', '0000-00-00', 'sin resolver', 'de todo un poco', '46'),
(33, 'lista sin valor', '2022-11-10', '0000-00-00', 'sin resolver', 'sin valor', '45'),
(34, 'sin valor x2', '2022-11-10', '0000-00-00', 'sin resolver', 'sin valor', '45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `githubId` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `password` varchar(200) NOT NULL,
  `sessionId` varchar(100) NOT NULL,
  `cargo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `githubId`, `nombre`, `mail`, `password`, `sessionId`, `cargo`) VALUES
(43, 0, 'Juan Carlos Albornoz', 'juan@gmail.com', '$2b$10$aAcxLIktrX6o2iaUWT9D1er9R4GMANG7bp802gwdEjv/JB1PHve1q', 'bjV6ArOucUM_k0VQnxrG7e2DOf9G7QtT', 'normal'),
(44, 0, 'Admin 1', 'admin1@gmail.com', '$2b$10$sI2bbMpuaLUlhX43cdSjWuDMu2QBVuvTpOqN9FQJ9RCp9YMyQMQ3S', '_HUjV4aBlv2R-4zqfS0bTo2URRnIT9fc', 'admin'),
(45, 0, 'Ana Lisa Melcorazon', 'ana@gmail.com', '$2b$10$FBbFFNLyBhEW4hg4I3FUSubtlq9sDFM1vpJX5x2eh2ZaCoWPEkcNS', 'mEwChjByV1DHlvFTUxE-2a_YD3qcSbHl', 'normal'),
(46, 0, 'Fernando Saez', 'fernando@gmail.com', '$2b$10$B.lyao3o6eIwZV2.fspDb.NXEaIN9SHCcKEKXdi6l1DCMlO/HJWjq', 'hcUnrP069z1HMdEKNgiWMiR9rbIPmwdL', 'admin'),
(47, 0, 'Mariano ', 'mariano@gmail.com', '$2b$10$AP3aeLX3VKuhZYljZbQbnu6WmzTxL5dCzBvlcl3ahPUy6BbX/TP1.', '', 'admin'),
(48, 0, 'Un Random', 'unrandom@gmail.com', '$2b$10$HDY4hT3pWiVrudi7yazXceCwbd7OYkwPKHzCkuxDW/BM5unKJ/vsS', '', 'normal'),
(49, 0, 'Laura ', 'Laura@gmail.com', '$2b$10$DE5pQKMIJnZll2vKHyQc/urRwuP5c5nroJCubf1re.i5wc7W3dcTm', 'zWR5gYmMbMKgBrUm-fjZ-8W2Rxksp_fN', 'normal'),
(50, 101840863, '', '', '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `listaitems`
--
ALTER TABLE `listaitems`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT de la tabla `listaitems`
--
ALTER TABLE `listaitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
