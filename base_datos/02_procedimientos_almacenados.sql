USE AlmacenDB;
GO

CREATE OR ALTER PROCEDURE dbo.sp_Usuario_ObtenerPorCorreo
    @Correo VARCHAR(150)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdUsuario, Nombre, Correo, ContrasenaHash, Activo
    FROM dbo.Usuarios
    WHERE Correo = @Correo;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_Usuario_Crear
    @Nombre VARCHAR(120),
    @Correo VARCHAR(150),
    @ContrasenaHash VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Usuarios (Nombre, Correo, ContrasenaHash)
    VALUES (@Nombre, @Correo, @ContrasenaHash);

    SELECT IdUsuario, Nombre, Correo, Activo, FechaCreacion
    FROM dbo.Usuarios
    WHERE IdUsuario = SCOPE_IDENTITY();
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_Producto_Listar
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdProducto, Codigo, Nombre, Descripcion, Cantidad, Precio, FechaCreacion, FechaActualizacion
    FROM dbo.Productos
    ORDER BY IdProducto DESC;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_Producto_ObtenerPorId
    @IdProducto INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdProducto, Codigo, Nombre, Descripcion, Cantidad, Precio, FechaCreacion, FechaActualizacion
    FROM dbo.Productos
    WHERE IdProducto = @IdProducto;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_Producto_Crear
    @Codigo VARCHAR(30),
    @Nombre VARCHAR(120),
    @Descripcion VARCHAR(250) = NULL,
    @Cantidad INT,
    @Precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Productos (Codigo, Nombre, Descripcion, Cantidad, Precio)
    VALUES (@Codigo, @Nombre, NULLIF(@Descripcion, ''), @Cantidad, @Precio);

    DECLARE @IdProducto INT = SCOPE_IDENTITY();
    EXEC dbo.sp_Producto_ObtenerPorId @IdProducto = @IdProducto;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_Producto_Actualizar
    @IdProducto INT,
    @Codigo VARCHAR(30),
    @Nombre VARCHAR(120),
    @Descripcion VARCHAR(250) = NULL,
    @Cantidad INT,
    @Precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Productos
    SET Codigo = @Codigo,
        Nombre = @Nombre,
        Descripcion = NULLIF(@Descripcion, ''),
        Cantidad = @Cantidad,
        Precio = @Precio,
        FechaActualizacion = SYSDATETIME()
    WHERE IdProducto = @IdProducto;

    IF @@ROWCOUNT = 0
        RETURN;

    EXEC dbo.sp_Producto_ObtenerPorId @IdProducto = @IdProducto;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_Producto_Eliminar
    @IdProducto INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.Productos
    OUTPUT DELETED.IdProducto
    WHERE IdProducto = @IdProducto;
END;
GO
