-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 15-11-2021 a las 16:52:32
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `node-shop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `razon_social_cliente` varchar(60) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `telefono` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `razon_social_cliente`, `direccion`, `telefono`) VALUES
(1, 'Marito Kids', 'Huertas 831', '3426356345'),
(2, 'Mateo Morales', 'Los termos 1528', '13562314'),
(3, 'Tomasito Traini', 'Paraná 863', '3412822237');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `producto` varchar(600) NOT NULL,
  `stock` varchar(600) NOT NULL,
  `precio` varchar(600) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `portada_prod` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `producto`, `stock`, `precio`, `id_proveedor`, `portada_prod`) VALUES
(2, 'Chombas verdes', '57001', '14 BTC', 4, 'chomba_verde.jpg'),
(3, 'Chombas negras', '594', '14 BTC', 2, '545abd7b-e142-460a-ab8f-0edb0a492462.png'),
(9, 'Chombas violeta', '4000', '800 BTC', 4, 'D_NQ_NP_834881-MLA31022882596_062019-O.jpg'),
(10, 'Chombas grises', '4000', '25 AR$', 1, '22660c6f-0a93-4009-a2f0-08437ad0a548.jpg'),
(11, 'Chombas rojas', '123', '35000 U$D', 5, 'ede27b9c-b4f6-4f53-9495-f8a1b624f8ad.png'),
(12, 'Jeans', '4000', '3000    €', 5, 'd6e8a673-146c-408d-9c8a-04cfa31fe3a9.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `razon_social_proveedor` varchar(600) NOT NULL,
  `direccion` varchar(600) NOT NULL,
  `telefono` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `razon_social_proveedor`, `direccion`, `telefono`) VALUES
(1, 'Puma', 'Reconquista 345', '011564632462'),
(2, 'Nike', 'Las vegas 1100', '011545132462'),
(4, 'Adidas', 'Italia 314', '01156466662'),
(5, 'Lacoste', 'Mendoza 314', '01156466662');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` varchar(60) NOT NULL,
  `nombreus` varchar(60) NOT NULL,
  `apellidous` varchar(60) NOT NULL,
  `contrasena` varchar(600) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `permiso` varchar(60) NOT NULL,
  `foto_perfil` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombreus`, `apellidous`, `contrasena`, `correo`, `permiso`, `foto_perfil`) VALUES
('admin', 'Tomás', 'Traini', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 'tomas.traini@institutozonaoeste.edu.ar', 'admin', '3d70f2ed-ee70-4969-bc0a-a48a73e3d582.png'),
('ale76', 'Alejandra', 'García', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 'ma_lejandra30@gmail.com', 'user', 'flor logo 1.jpg'),
('frank', 'Franco', 'Perezlindo', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 'franco.perezlindo@institutozonaoeste.edu.ar', 'user', 'default.png'),
('lostordos', 'Dr Jones', 'Mario', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'mario@hotmail.com', 'user', 'default.png'),
('martu', 'martu', 'cordoba', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 'martu1685@gmail.com', 'user', 'default.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
