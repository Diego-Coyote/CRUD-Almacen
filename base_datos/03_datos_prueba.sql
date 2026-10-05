USE AlmacenDB;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Productos WHERE Codigo = 'PRD-001')
BEGIN
    INSERT INTO dbo.Productos (Codigo, Nombre, Descripcion, Cantidad, Precio)
    VALUES
    ('PRD-001', 'Caja plástica mediana', 'Caja para almacenamiento general', 25, 45.50),
    ('PRD-002', 'Cinta de embalaje', 'Rollo transparente de 48 mm', 60, 12.75),
    ('PRD-003', 'Marcador permanente', 'Marcador negro para etiquetado', 40, 8.50);
END
GO
