INSERT INTO customers (name, email, status)
VALUES
('Ana Lopez', 'ana@mail.com', 'ACTIVE'),
('Juan Perez', 'juan@mail.com', 'INACTIVE'),
('Maria Gomez', 'maria@mail.com', 'ACTIVE')
ON CONFLICT (email) DO NOTHING;