--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: peliculas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.peliculas (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    "año_lanzamiento" integer,
    genero character varying(100)
);


ALTER TABLE public.peliculas OWNER TO postgres;

--
-- Name: peliculas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.peliculas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.peliculas_id_seq OWNER TO postgres;

--
-- Name: peliculas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.peliculas_id_seq OWNED BY public.peliculas.id;


--
-- Name: peliculas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peliculas ALTER COLUMN id SET DEFAULT nextval('public.peliculas_id_seq'::regclass);


--
-- Data for Name: peliculas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.peliculas (id, titulo, "año_lanzamiento", genero) FROM stdin;
4	Dragon Ball Super: Broly	2021	Acción
5	Mortal Kombat: Scorpion Revenge	2020	Horror, Gore
6	Grand Theft Auto: San Andreas	2006	Pandillas
7	Grand Theft Auto: VI	2066	Violencia, Drogas
\.


--
-- Name: peliculas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.peliculas_id_seq', 7, true);


--
-- Name: peliculas peliculas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peliculas
    ADD CONSTRAINT peliculas_pkey PRIMARY KEY (id);


--
-- Name: TABLE peliculas; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT ON TABLE public.peliculas TO lau;


--
-- PostgreSQL database dump complete
--

