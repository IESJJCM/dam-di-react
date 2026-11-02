-- GuitarLA: let visitors add guitars from the browser.
-- Run it in the SQL Editor after schema.sql.
--
-- WARNING: these policies let ANYONE with the publishable key insert rows
-- and upload files. They are fine for a classroom project; a real shop
-- would restrict them to authenticated users (see the extension on Auth).

create policy "Anyone can add a guitar"
  on public.guitars for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can upload a guitar image"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'guitars');