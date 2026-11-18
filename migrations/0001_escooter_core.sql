CREATE TABLE IF NOT EXISTS profiles (id TEXT PRIMARY KEY, phone TEXT NOT NULL UNIQUE, name TEXT NOT NULL DEFAULT '', role TEXT NOT NULL DEFAULT '', zone TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS vehicles (id TEXT PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, usage TEXT NOT NULL, price_label TEXT NOT NULL, price_per_day INTEGER NOT NULL, caution INTEGER NOT NULL, free TEXT NOT NULL DEFAULT '', autonomy TEXT NOT NULL DEFAULT '', image TEXT NOT NULL DEFAULT '', helmet INTEGER NOT NULL DEFAULT 0, solar INTEGER NOT NULL DEFAULT 0, pickup_zone TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS zones (id TEXT PRIMARY KEY, num TEXT NOT NULL, name TEXT NOT NULL, detail TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, ref TEXT NOT NULL, phone TEXT NOT NULL, vehicle_id TEXT NOT NULL, vehicle_name TEXT NOT NULL, creneau TEXT NOT NULL, zone TEXT NOT NULL, duration TEXT NOT NULL, days INTEGER NOT NULL, total INTEGER NOT NULL, caution INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'reservee', created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS reports (id TEXT PRIMARY KEY, phone TEXT NOT NULL, kind TEXT NOT NULL, title TEXT NOT NULL, detail TEXT NOT NULL DEFAULT '', ref TEXT NOT NULL, created_at TEXT NOT NULL);
INSERT OR IGNORE INTO vehicles (id, name, type, usage, price_label, price_per_day, caution, free, autonomy, image, helmet, solar, pickup_zone) VALUES
('cargo','E-Rider Cargo','moto','Pour transporter','15 000 F CFA / jour',15000,25000,'Casque + top-case inclus','Jusqu''à 90 km','https://files.monstarx.app/0svp0dutvg/public/design/moto-cargo-05-217a2679.svg',1,1,'Zone Almadies · 5 motos'),
('city','E-City','moto','Pour tes trajets','8 000 F CFA / jour',8000,15000,'Casque inclus','Jusqu''à 70 km','https://files.monstarx.app/0svp0dutvg/public/design/moto-city-05-e84921ab.svg',1,1,'Zone Plateau · 4 motos'),
('scoot','E-Scoot','trottinette','Pour les courts trajets','100 F CFA + 30 F CFA / min',3500,0,'Sans permis','Jusqu''à 25 km','https://files.monstarx.app/0svp0dutvg/public/design/trottinette-05-c23ba9fe.svg',0,1,'Zone Sacré-Cœur · 6 trottinettes');
INSERT OR IGNORE INTO zones (id, num, name, detail) VALUES
('z1','Zone 1','Almadies','Recharge solaire · gardiennage'),
('z2','Zone 2','Plateau','Recharge solaire · casques sur place'),
('z3','Zone 3','Corniche','Recharge solaire · vue mer'),
('z4','Zone 4','Sacré-Cœur','Recharge solaire · accès rapide');
