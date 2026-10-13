-- Replace broken RealWorld CDN default with an inline SVG avatar.
ALTER TABLE "User" ALTER COLUMN "image" SET DEFAULT $avatar$data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%230f766e'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23fff'/%3E%3Cellipse cx='50' cy='82' rx='28' ry='22' fill='%23fff'/%3E%3C/svg%3E$avatar$;

UPDATE "User"
SET "image" = $avatar$data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%230f766e'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23fff'/%3E%3Cellipse cx='50' cy='82' rx='28' ry='22' fill='%23fff'/%3E%3C/svg%3E$avatar$
WHERE "image" IS NULL
   OR "image" LIKE '%api.realworld.io%'
   OR "image" LIKE '%productionready.io%';
