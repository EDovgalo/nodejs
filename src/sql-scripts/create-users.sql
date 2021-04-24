 CREATE TABLE IF NOT EXISTS public."Users"
  (
      id SERIAL,
      login character varying(50) COLLATE pg_catalog."default" NOT NULL,
      password character varying(50) COLLATE pg_catalog."default" NOT NULL,
      age integer NOT NULL,
      "isDeleted" boolean DEFAULT false,
      CONSTRAINT "Users_pkey" PRIMARY KEY (id),
      CONSTRAINT "Users_login_key" UNIQUE (login)
  )

  TABLESPACE pg_default;

do $$
begin
IF NOT EXISTS (SELECT * FROM public."Users" LIMIT 1) THEN
    INSERT INTO public."Users" (login, password, age) VALUES ( 'user1','password1', 19);
    INSERT INTO public."Users" (login, password, age) VALUES ( 'user2','password2', 22);
    INSERT INTO public."Users" (login, password, age) VALUES ( 'user3','password3', 25);
    INSERT INTO public."Users" (login, password, age) VALUES ( 'user4','password4', 26);
    INSERT INTO public."Users" (login, password, age) VALUES ( 'user5','password5', 21);
END IF;
end $$
