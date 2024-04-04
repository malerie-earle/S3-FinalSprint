PGDMP      *                |           NewfieNook-DB    16.1    16.1 -    F           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            G           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            H           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            I           1262    19325    NewfieNook-DB    DATABASE     q   CREATE DATABASE "NewfieNook-DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "NewfieNook-DB";
                malerie    false            �            1259    19359    customer    TABLE     O  CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    ph_num character varying(50) NOT NULL,
    gender character varying(50) NOT NULL,
    pay_method character varying(50) NOT NULL
);
    DROP TABLE public.customer;
       public         heap    malerie    false            �            1259    19365    customer_account    TABLE     �   CREATE TABLE public.customer_account (
    customer_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
 $   DROP TABLE public.customer_account;
       public         heap    malerie    false            �            1259    19596    customer_address    TABLE     �  CREATE TABLE public.customer_address (
    customer_id integer NOT NULL,
    street_address character varying(255) DEFAULT NULL::character varying NOT NULL,
    city character varying(255) NOT NULL,
    province character varying(50) DEFAULT NULL::character varying NOT NULL,
    postal_code character varying(10) DEFAULT NULL::character varying NOT NULL,
    country character varying(100) DEFAULT NULL::character varying NOT NULL
);
 $   DROP TABLE public.customer_address;
       public         heap    malerie    false            �            1259    19439    products    TABLE     I  CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(75) NOT NULL,
    price numeric(5,2) NOT NULL,
    category character varying(20) NOT NULL,
    description character varying(1031) NOT NULL,
    image character varying(226) NOT NULL,
    vendor character varying(30) NOT NULL
);
    DROP TABLE public.products;
       public         heap    malerie    false            �            1259    19414    vendor    TABLE     -  CREATE TABLE public.vendor (
    vendor_id integer NOT NULL,
    vendor_name character varying NOT NULL,
    website character varying NOT NULL,
    vendor_description character varying NOT NULL,
    email character varying NOT NULL,
    ph_num character varying NOT NULL,
    product_id integer[]
);
    DROP TABLE public.vendor;
       public         heap    malerie    false            �            1259    19522    vendor_account    TABLE     �   CREATE TABLE public.vendor_account (
    vendor_account_id integer NOT NULL,
    vendor_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);
 "   DROP TABLE public.vendor_account;
       public         heap    malerie    false            �            1259    19521 $   vendor_account_vendor_account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_account_vendor_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.vendor_account_vendor_account_id_seq;
       public          malerie    false    221            J           0    0 $   vendor_account_vendor_account_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.vendor_account_vendor_account_id_seq OWNED BY public.vendor_account.vendor_account_id;
          public          malerie    false    220            �            1259    19536    vendor_address    TABLE     �   CREATE TABLE public.vendor_address (
    vendor_address_id integer NOT NULL,
    vendor_id integer NOT NULL,
    street_address character varying NOT NULL,
    city character varying NOT NULL,
    province character varying NOT NULL
);
 "   DROP TABLE public.vendor_address;
       public         heap    malerie    false            �            1259    19535 $   vendor_address_vendor_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_address_vendor_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.vendor_address_vendor_address_id_seq;
       public          malerie    false    223            K           0    0 $   vendor_address_vendor_address_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.vendor_address_vendor_address_id_seq OWNED BY public.vendor_address.vendor_address_id;
          public          malerie    false    222            �            1259    19413    vendor_vendor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.vendor_vendor_id_seq;
       public          malerie    false    218            L           0    0    vendor_vendor_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.vendor_vendor_id_seq OWNED BY public.vendor.vendor_id;
          public          malerie    false    217            �           2604    19417    vendor vendor_id    DEFAULT     t   ALTER TABLE ONLY public.vendor ALTER COLUMN vendor_id SET DEFAULT nextval('public.vendor_vendor_id_seq'::regclass);
 ?   ALTER TABLE public.vendor ALTER COLUMN vendor_id DROP DEFAULT;
       public          malerie    false    218    217    218            �           2604    19525     vendor_account vendor_account_id    DEFAULT     �   ALTER TABLE ONLY public.vendor_account ALTER COLUMN vendor_account_id SET DEFAULT nextval('public.vendor_account_vendor_account_id_seq'::regclass);
 O   ALTER TABLE public.vendor_account ALTER COLUMN vendor_account_id DROP DEFAULT;
       public          malerie    false    221    220    221            �           2604    19539     vendor_address vendor_address_id    DEFAULT     �   ALTER TABLE ONLY public.vendor_address ALTER COLUMN vendor_address_id SET DEFAULT nextval('public.vendor_address_vendor_address_id_seq'::regclass);
 O   ALTER TABLE public.vendor_address ALTER COLUMN vendor_address_id DROP DEFAULT;
       public          malerie    false    222    223    223            :          0    19359    customer 
   TABLE DATA           i   COPY public.customer (customer_id, first_name, last_name, email, ph_num, gender, pay_method) FROM stdin;
    public          malerie    false    215   +9       ;          0    19365    customer_account 
   TABLE DATA           K   COPY public.customer_account (customer_id, username, password) FROM stdin;
    public          malerie    false    216   �^       C          0    19596    customer_address 
   TABLE DATA           m   COPY public.customer_address (customer_id, street_address, city, province, postal_code, country) FROM stdin;
    public          malerie    false    224   a}       >          0    19439    products 
   TABLE DATA           i   COPY public.products (product_id, product_name, price, category, description, image, vendor) FROM stdin;
    public          malerie    false    219   ��       =          0    19414    vendor 
   TABLE DATA           p   COPY public.vendor (vendor_id, vendor_name, website, vendor_description, email, ph_num, product_id) FROM stdin;
    public          malerie    false    218   �       @          0    19522    vendor_account 
   TABLE DATA           Z   COPY public.vendor_account (vendor_account_id, vendor_id, username, password) FROM stdin;
    public          malerie    false    221   ��       B          0    19536    vendor_address 
   TABLE DATA           f   COPY public.vendor_address (vendor_address_id, vendor_id, street_address, city, province) FROM stdin;
    public          malerie    false    223   ��       M           0    0 $   vendor_account_vendor_account_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.vendor_account_vendor_account_id_seq', 1, false);
          public          malerie    false    220            N           0    0 $   vendor_address_vendor_address_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.vendor_address_vendor_address_id_seq', 1, true);
          public          malerie    false    222            O           0    0    vendor_vendor_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.vendor_vendor_id_seq', 1, false);
          public          malerie    false    217            �           2606    19608 &   customer_account customer_account_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.customer_account
    ADD CONSTRAINT customer_account_pkey PRIMARY KEY (customer_id);
 P   ALTER TABLE ONLY public.customer_account DROP CONSTRAINT customer_account_pkey;
       public            malerie    false    216            �           2606    19615 &   customer_address customer_address_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (customer_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            malerie    false    224            �           2606    19364    customer customer_id 
   CONSTRAINT     q   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_id PRIMARY KEY (customer_id) INCLUDE (customer_id);
 >   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_id;
       public            malerie    false    215            �           2606    19445    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            malerie    false    219            �           2606    19529     vendor_account vendor_account_id 
   CONSTRAINT     �   ALTER TABLE ONLY public.vendor_account
    ADD CONSTRAINT vendor_account_id PRIMARY KEY (vendor_account_id) INCLUDE (vendor_account_id);
 J   ALTER TABLE ONLY public.vendor_account DROP CONSTRAINT vendor_account_id;
       public            malerie    false    221            �           2606    19543     vendor_address vendor_address_id 
   CONSTRAINT     m   ALTER TABLE ONLY public.vendor_address
    ADD CONSTRAINT vendor_address_id PRIMARY KEY (vendor_address_id);
 J   ALTER TABLE ONLY public.vendor_address DROP CONSTRAINT vendor_address_id;
       public            malerie    false    223            �           2606    19557    vendor vendor_name 
   CONSTRAINT     j   ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT vendor_name UNIQUE (vendor_name) INCLUDE (vendor_name);
 <   ALTER TABLE ONLY public.vendor DROP CONSTRAINT vendor_name;
       public            malerie    false    218            �           2606    19421    vendor vendor_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT vendor_pkey PRIMARY KEY (vendor_id);
 <   ALTER TABLE ONLY public.vendor DROP CONSTRAINT vendor_pkey;
       public            malerie    false    218            �           1259    19376    fki_customer_id    INDEX     S   CREATE INDEX fki_customer_id ON public.customer_account USING btree (customer_id);
 #   DROP INDEX public.fki_customer_id;
       public            malerie    false    216            �           1259    19563 
   fki_vendor    INDEX     A   CREATE INDEX fki_vendor ON public.products USING btree (vendor);
    DROP INDEX public.fki_vendor;
       public            malerie    false    219            �           2606    19371    customer_account customer_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_account
    ADD CONSTRAINT customer_id FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id) ON UPDATE CASCADE NOT VALID;
 F   ALTER TABLE ONLY public.customer_account DROP CONSTRAINT customer_id;
       public          malerie    false    3477    216    215            �           2606    19609    customer_address customer_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_id FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id) NOT VALID;
 F   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_id;
       public          malerie    false    3477    224    215            �           2606    19558    products vendor    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT vendor FOREIGN KEY (vendor) REFERENCES public.vendor(vendor_name) ON UPDATE CASCADE NOT VALID;
 9   ALTER TABLE ONLY public.products DROP CONSTRAINT vendor;
       public          malerie    false    219    3482    218            �           2606    19530    vendor_account vendor_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendor_account
    ADD CONSTRAINT vendor_id FOREIGN KEY (vendor_id) REFERENCES public.vendor(vendor_id) ON UPDATE CASCADE;
 B   ALTER TABLE ONLY public.vendor_account DROP CONSTRAINT vendor_id;
       public          malerie    false    3484    218    221            �           2606    19544    vendor_address vendor_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendor_address
    ADD CONSTRAINT vendor_id FOREIGN KEY (vendor_id) REFERENCES public.vendor(vendor_id) ON UPDATE CASCADE;
 B   ALTER TABLE ONLY public.vendor_address DROP CONSTRAINT vendor_id;
       public          malerie    false    223    218    3484            :      x�}|I��8���+j�u-ڇ����jW��*?����;�$2�A� Y����L�-�7B������]�V�u�a����95��/�W��7ſ���(b�(_�7E_e�-��b~�m�����Ǫ8l��wi��G_z�W�<#W旟�����|�Ƣ�|��$���k!���T�U���,��Ե���t`�Z��R)e��ۼ�LE�_�N�y��Ēڊ=��(�n��Wm1bAF��V17���q
��ξ�ٻ�x,�¨�q�SWOM��ĳ%F�(�W�f�CY��p�E͆!�ڥi�
;��&L�mbD��߻��i�ݸ��Ʋ��={]wx��t��}��|bS2�L�/2�zp/f���%���s�ۜ�,Xw�CY��[&���".���	{�u���~?�����Ui3�4�X+������l�o���EJ&�'1"��g�U"e�5	g��P����s�嬬ɻ}�a�W�gKbK'�1��>l.�?�P��|?V5��0��\��ey +~�Yjs��$;����l|�2� �k/���K[��y>��E��F_�W�s?�[��$��"������đ���8��ZqCy�f��� �y3��P�C�����W;�a��0<�<-�>T}�Z�%�k�Eڹs�ǲ��m�a)��zk&�|�5{(���ϽK���n�[_/�c-Y�o���]]��C��9�a`��E,a`��8Ǫ�DV�hkU	{����2z��[T/R岡��
ʺ褆(��魭�W�v?e��c�Y��1<�!;�c��M|6�ߋ��l߆��J?0��x�x�V8C.�4������>t����/,R����n�oh��T�s��B�̚�k��ߞƱb5f�y�E
ZK�(~��bo�z|?{W@�������y"±+#U˛���o�6�C/z�Sa�\�=*Ƴ�rQŘ��Жüo�fh�2�}_�j�Y8�4~���RS��80�^8�7U�Js�8�M�]�K*��Y���u�1{�������k��g�wZ�*-��E�X*]���_����hW�8��\AXYkC6!��nn6���*M�k�\3�}��ѥ�Gh�e�4�&2Rp�Wq�����R��4���ί�\bd��j%����Z�����*�6ݑM�E:��F��FEw�#aut=�dw�(�ʲn;�"��P5�{�!a���l�,G��b��b�W���� ��O���1�_��C�)zX�L�jE�=�#��۱��}���*^������������f���*�n>T�t�쏲�c��'7�U^�7���b.�ce�MAļ���@gv��'�ܗ/�)�X�sS�MM�m�C|ӝ�:�<��?���U�M��L�y8��u�l��q�Xg�& 1�yb6JE�-�on[�(���%\X0�%�
r�6N���i���gv<�Wn_=5]��^���%�IDtm�J�?�����V��2�\�c_�㮯0g��C�Qh82���L�O�.�]�J��0�l8FC^H�Q���������i"��u�X�����n@ȇx�i�8����2���� �
GcѱcF�tzz�+�Ol�Lr3�+���a�}�8Y�P1|gxLR��!�໡`Z�맵쳇�,�݄oe�0r�������::���Y�*�[7@4�2�<u9�T����!	(��[.D%dS(��,���E�ˡ��l�2"7b�������KD��Ǿ�=��fa����9�%�e,��%5g��z���~�ڵ_$^���xL��H�7��ޖ��MQ�]׎,���ܱ��ǖ�#�) -@��+��)'�[%<[�0�E�{w.�W�%�7d��@�׋��_z��U{����K�b�g�G�E��_�\@]�������E�����>�@���1��#4�ڧ�ph�O��|�q�g�%í51��>(�w�X�4�g�>�>�!��:D���I��(p��p��X��zd3�v��(^�z���.�ѳq\͓�;@)��ϯ����)	ر:�_C7y:+LG7����7��F�H/��p���e���U��DӐ�D�kӅ.�ՠE���9È�Y��;O�n�a
c5�{��M�ǀ�f5A�]�H��#Tc���p$B"s`��3�&8��~�Z>���@���l,��@�յ7
��XW����S��^_|�{�"7�2��� ��p�x껡��ܧ>���<��;���&��-S��Te��9�b�wa�#���e�\��UK�u��Kf�k�_��78fa���~^���d:�F�&f�[� �=��'�M���c� =�j[�M�ׂ˼��@��.?;�e�w&SCǈ��k#��"e�=��e�,��XtǙ5��Z�5Q,ӉPVo���>�!�v,��/+�c{���̮:��N��	��=�.�����=>�����W�N9�$�
�\��d)6�"�Pa��&kfQD��v�O�r�	�G<����b|j"G]Q#h�Sp����j�C	AQ�&h��ݵ�z2�5|��$�5NJ8iB���M�L7�\���ڲ�s0��&���"	�|]���%8zmm�Vmk�����\��j�n�D�ygl��*�
����nc"JK��C\<��(�k�!��$����-p���O����H`�;���(��B������1�\!�5�@�2( |_/����4T���,�,��׎�����0�чQ�n�}��^Ӗ���C�5���u�+��	[Z��F��qŠ �xn]�T,������VY�8�q8�z�)�D;W�ol�"�" ��u����(Rʷ�3�]�a���wq?�u�ٯ~V�-�A�Y�i��L�{���3|��ac��5�vjGX�}	�I)�lD��{Z1%�bb���Pl����.������Bٰ��pCn�!!�Z%C`�ԃ��Wx|�Z_���2I�@n� n9�+T6�Eu�{�t�dH�/�?����,����������D�(�o�=`M�6,e�D��MII%`%mqT� ���k��Y�i�ȴE�\�Q��0�d+��v���<T���u�c@�/j�k+�V^S�r���[R�>]$qp��X���<4�+z��5$I�6 �@����:�a5�=44�|���B�@�6&��s��]�:����,�h\SUiA��Q��]��T�U?H(�֍�)�$f��Y�;W__@	��W�|U��	�~�(��~/��\Q{^<�,C(�%���:|b�
`/P��iHY:,�8�]��SE��Nn��m�'��PE��"�/ߒ�B�Q�EL������ �>�ڗ#��,��](c��-W>/��
v+�q�W�SA�i�� ���s�b Y���	JzJ*Kn�B	���ѳwuQ�ca�+��ӲU	M��~�7�#au�a�pB�gAL���5Wn�% ������scR�e�)��䊬k��ZQ�!�J�@M6�U�&� ���8�����0�%��DQ4��&E�p5`r�X�m;�(��łUL�J%�o�n"��*#�G�G��y ��US���VJśyr��t�o#t��i�EO��B�%�He�E,��$�v?�!}�����H2Zk-�?@�|���rӻ/(�}�޼-p8�l��WQrw�	U��~��l6�%l|+VqΉ�S ����H��R�i,��af�� &�Iĭ�$�+�Q<}M�S���U��1\,�~;{ƹ$��H!��%�Q�����|˹�w��8��Ǳ�r��v�ޟ<����R)P�XoWs�񔇡�j����$�����rı"_%u��87�O|���Bf|fAZ�/��+xaJ1�	��PS�P��r�΀))3�ퟻ�sħ���	�0��!5����L㜸gF�_���SڇQ&���5� �"��[Z��"�S�*XA�|�]��=%���+�@<�!KԤ�[�-"(@�{@ x`���� ���@"�~���,��{(7|��������|��g�(J{	�?n`�`�TX|����    K8�Y������w���P>7��rځ�,��Cd��Y���iƐ��.r\�AԀ��O�gA���`ll�_$�sp��W�'��D�7� R��R� �m���E�Hrg�Q�7�8R̆��o�F~�����,�� ��rRP�`]�	�CEق�3��%;Ta�����گQ�I�x-�]��RO�p�4ǧ|t��K&\j���%p��
���<�{:�3_/.K��tR�j7oꀌ����Q�A�0��B�9�!Qs�O�6Q9�J��bY��l�yx\6�j��JD�|�KAٳӅ����z{�~�\N�X ����ג��d��'*Qd5�sTj(fpĩF�g��u�@����*�������Q��<ΓPpS��f���C\J/��0�/?���c,�;n�	Ua����;g%˳0�ށ��e��e�S t(	�~�UK�T���yG	9�����u=%�J�5D��7z8T|�sA���5�Q�c�B�n�N�s�,q�!6��L��v8��`�uN��"��������R%t�E���p8η�(,������Y�'���Ko[�q
u]k�8���zA�����Q��<����%ON�!����	bRS���,H���N�G���z#=�z�ޭ�]�(*I^\{�筵� d��	�Ja=`�3�D/�4���uM[�Ӻ$�e����6��a�U;{� ?�aT�a����Ԧ���M�V�ݗ΋PCOˑ��y�'���k�)	�&̸�Dq��*j���p�%�?��.[E���mry�B����m�P]�����~-,PO�}�^L���`2v�hP�Mٰ� M9a�Xn�&j������� _J���Xӕ`Q�%�T���4"u��7ĈvdIp�ϲ2�kՖ����)t�圵������=���:�ʺ,O}�&�(��H��o���I�� �O��*g:�p����&JC����B2!KIQI;m���\`)�E���*��_�c�wc�嚲MB�2�t�ҵ��د�#���J�Ԃ�'QASD�1�"�na�O�����,�lγ�ծ��?[���f!�m��x�`,��c��T�&����7Ӭ���L���M�)Gr�55��Q���ЅQĮ�]��	�_�0��Y-�����z��CS=���S��.k��.Od�l��쾫	u~�Z2��F�w-X�s�\0X< ���������Ρu�*7���H�b��\�����K�Q�82�� ���D�e�5_��Y���y���	��� �g��w�!!dc$�ڦ"��BTG��	Ҝ�aT�T���t�q�D�����;`�	���Ҡj�h���h�)c.��s � z��l���#�fA5�M�o�5���ڙ���X��i&��d'u:��nL�az�����M@�C����f����"�Α
Q��rt��a� �%~B/�+Oms�"���|�=�=B�[�"�2dpY�
J��)�jU�/.=�3�1a*�Wk7���<ʧ
;� a0���B���U��E�+i���ڜ����l�gAn��!^�ߺ8Br�!ou�q���e�	G\��;��YPcH��n�yS�,V������ܒ��z2�,����dN�M�9�����SޅR�iN�:}W�%d��d������X� ��*jl`�!��L�v�FY�
I���,�%��7�|�R8�f �ET_]^U��a5+�7J��&쮅�}����b�2{j��B�{�N��чX�l�Kx�a��~�I{�)�ɝ}�`y����*a����FA�(�Hٰ]Yx�r�t��.[�(� ��vn��m�A��|ʲ*�IЍE��UM����P����x0%Ȼ�]�LsXE-\1��ѿ*&J�Al�����A�}�Vc�r�������"i�}�AX;�=��¯�d��,d��e��Z}�1z���o��xn����F���a�~A�LH��mxJ�Khb�~_�(!��a���)���>�8IqW���ȸ��Z�z�B�dˀ�fI[G�E�C�=�V�7�B���iA}]�/'��Ӱ�:vG�G@�W�C�[�����M"���\3I�W��VQ'.�������8Ǒ��pNx��U��|)dlfA{G�����RUt�o�K���3mKwӊ�Z�i��7��(������n����-�-5��9?���
�-n�2�l���Q�C1onw��_��u ��VG5*�7m���)�}�H�sO��i�ŏ:B9����wL}��
UF*�,�4�r\��8u@ŉ�@��n{�t%��z�NUe���dF��Er��Lc��s�a���|��M/�t�r,@=*�%�$��t>TԆ�Z=�QW.�BaA�}�v�vu�X�-�"���_Zju��&�f�M�7����]=�p��-�aj�� �zzN����c��X�[$}����V�1[�a"A�1�B�ńZc����J�����}E��(@��_/tw�aG�E�4�qy?�f̘��x����(���g �d�0���;N	/��v�*��
��j(�l�nt�V犁6)����"
�NL1u�F�э���6Ռ8)�,#X���Y�(F�c��gTŨ�8�+��&P�gfL����{^1�.��;�L�JV�Yн�����o��A��'4e�7��3�:��"�}���ԄQ���p�F�FQH����m�=b��Ҡǫk��C���B����B`�����z���SծI�P^������ ��<�1ڐX�YЧ����)t�	�И-�%�n�5pR���,�1�����o,֞�B�?�ɭ�A���=˨��R�ed��E�_7�92k� ����{���jհ�lIͺY$}A�(�s���&q���$��v���ݙe�,��7N�I1��ؼ�$B���/-0R׷�%�h��B��V�lb�c"�ix��tQ���4���t�]}!��XK��͙@T�<\
 �K��1_E#\3�^�����
Q��4fTԏF���9��p�y_�E��K��@_�_��=�X�Ar p����������a�F�n���+�%vBJ�ͦCŶQI��r;�e��)�c�j�_N�5C���'TTk	�\��>Ɠ͂!P�Y3��x��V��������s ��>�&��k�?
$��E���U�9�=|� Z|2�a�L�����s�5�R	oo@1v�{��� ��(�:,��̤�VlJY]��ђ+@N�����&�O���.	l*���?�B��t��0�1&츐k�"� 4�Q@R���C��Mi�&;����jṠOF�[�O�oX�/�P�d1�l��nvZ�(��Y!�3B���2�����)�6�̭'��Q�� (/��� �`���q�_ׁ�G�R���#*�{�,q_v�=;d�`���C7��Lb��!�a��7�q6f�`�n8�`11߶c(�=�:���ςyti�R��X���@��p)���~A�N�48��Hb�t��]�鰔�8QU�L����q�+J��#\ {<΂��qX2��0���D�`N����W��WG]�T�Ӹ�Yn�Ӌ%�PѦ�
���cD��;{JW5�,���+"�EkY�z�Jk�E+�z�.d����F���~L��}�̴+�`i��y�����Ә�쏾i���st����4�o.���q�^��?�S�P��S6�N�]�d"���5q}�Q5���kpv�ӿxǉ�:u�7�f� ��
Cq�(�
|Z.Rk���[A����������9�9���֫���V��v�'�nDD�>�?�¡���L��zᤡƩM"cu��*�ЙV{��<���74��+��H]Rk�� H���M�B%��p�K)wZ�`�/,\�K��j�]B�+'��:;�k��خ��Jw}O>�<��5%\���H6n�k�~�mV�x���vX$s����vk	@x�M
�Z�N@]g�R��`�*ۥU��Pp���7���B�e����6�O�Z}�w)���,>�eo�����;�R �  x{-wM�D��D%�r�=��:dǐ�<��_�d��D�]0 �Ȑ�f1Ի]�k�$���h反h�r�sJ^�����b{��������Y��O�6z�LV/�~��Q$��l� TЅ�	��א��j��a�wc�(o4�	���ӝ�E�Ω�A��>���} t�uk�v���yg��}�H־��[���@4���	���Ѕ����g�vbC]d$��eu7�;j�ZS�Q�DE�yo8l��x�U��,�6�>/�Z̥���`��VЧ�P�<��e���b'�fݸ�*pU�~󴒰W��Y����#��ч<n��D$j�?\���&�Є�pM�@�;K�6߾����ڝZ�y�l8`0��]ػ/��jĩ��׵/.S�f�)Q�~��i���+�`7.�o��˰#�1O��#b#�=��.{6�,�݋
��C�k�5����JaJ�`	-���������*ڽ�]��Պ�ф�h��swWf#�;v?������2�t0�l���;���sq�� ��ʟ��:kg�V.˗"���LJi7u���{�b���)���H�e�߸�����h㺎���kJ�d�������܎��k?w�/V�_^��Y�^��Jz���<����	��c��᳠(!H�W�o���R�,؆��9�[�D���!�zH�p�i�P8m�ûvxx��卄�%��GX�a�����9]����r�rM�G��೷@�-] ��$٣����tʚI�)2b;Cf���0�G�X^΂��|�v���jH=g��?�/�cS[��`{��F ��H�ZC_�������%����t�q^�E��s�E�K_@��Z�q��/M��P��|��F;�-��gb	���b	M��:]�-j<�a����_}�q(8��nV
E��K�ʮ�W��,ؓ+�����
�$�]��5�n����C���,��용���P#Uh���o�j	��������ܢ�C[$���SM>q����Nl���a�G�  ��,���q�ђ��$��H�k��fH�.��lF��ԯw�l(<k���M`%����~8��!ȲY��o�	E��-]�(Y����W�{�}Ƙ{c���X�&�L��k�>�k%CA�W1�u(rBU��S��@ѱ�OT��ή���d��X �����Yk��AT� 7O���k�v~� 
󂃰o�@<>u���2���zb��t�����s�Db7Pj�Dș��Mޱ�LCl_�ғи��� R�mF� ������F�]>q���6Ը����j���bJ��T,�4�8.R��M9k���\*��~<Ie�r-� �\ʮ`�J4Ʃ{��t}���rKL�ڸ�&(���g��ݍ�����ۇ��46��X!/e�~���~���� Y      ;      x�-Z׎��}n�a��m�<����N�q�������������U+؃#�Q��Etk�%�V��ٳ/d�o�,4p�@�k������In��U>mr9oie�D�!ɖ)�2����W�Jk��ːb:F!�V����$��\|���I}�Ń^�i�r��"c4��(8���#���>��+Y�A�gy�`�HX�v��G��U$�H9[�f��`��'�z�=��j��!Ar����쳙�6]�N�5�<�G���	�.]tϴ?~-��k�5�sW[1��<�2MU0xdw�\�Þ��t��b8��SL�<
Ȟ+�aK������0�@gI0���"�����O����RN"�8GߵL	FD|��nyK�5�0OF�����}�y��M�Ka8�t�wKA�N�$<M�2l���|�����p]M8��~@��_�~��>ȣ����(YV�#��t���T�˺�����~a8��P��I0N��R�E-�����l�+9�t2GEV�{��{z���^�gr^�bLT�GA�k�]fdv<|�=�5Z����B�0G��[�~א6%��w�0<ӛ`�Y�uŕ��b?�F�����O�+F�Ȅ}A/(h1ez'��;�۸�Z5�:}U�<]�Ś����߿Z�,7��>�txk�㨊c!����H�n6��xsJ{�@Q1����eYWlt�ㅓر��g0�E�i]a��i�b���Z�t)���t��V�^#8����9H3�m��H���VｙSc润��˶]d����s���1���#4���:6�
�=�d�#SGV�G�I�%�#er��k!��N#	t
/�,���>Uq
���)|�L#It�Z�I5��E�9PCb��o�$_Si�H
��y�rGT�V��1o8Υ�m|�l��F��	;���Hl��R�|�{A�� ��(��$l���n���wV�#YtҬ��8p�0\�:�Z�X�����X�z/��[�Az��x0d�]��y"��nY����V��`®3&[*2M��>���_1��lSq�;�u�����-'}s����#�(�	
�'x�Z�7���jrp��ʲO��N�����)S�k��.U7�l�I*{Y�#T��o��f�hŻ�IPt�W�M�(���.�a��%��H��u=�f_Ɔ�(�GA�ga�<-�s����(yv8ɪm[0{�i�M�#�Dn�kc���:�b����.�o�A�~�/|�8t�Sv�x�Et�����eZ�X�x���������~�i��y���_?]DF m'ȸ��	��N.����^�ȥ)���q�*����W����L��î��5������1M Y�I�躠J�����t�����������coS2�1dC<�j9�	�-�9�z\&Y��~�S�v��h݁3ĐP\E��+x���()�v���|]@\�3���Y��_���/L$@�\C�6�i���)��{|�둓���[c4�D�����r�3�pƟ�� $���7�= e��:�ϳ��=3ɿ��1��(n�(fX��s���R�t'b
=9v���#�"d?�B���3�3�f~�ZֳIc@V�y����H�%*V�7��Q:O�b����Fx%��ۭ�9_��w�7�?/:�PH5T��?:�1�o��dү	���|4K�� ����&_n������W�����}3V�P]��0&:��ZI��ZR�'U��`4��7M�G�7����LjG�.wv����@u=A8���*Z�Or�������[(a����1z,��o��;�2�U߅"��(;wp�Is:?��D�z�XPD�w�;��D"F����K�^�}㩥��X�l�
��������oL�|G��ƒH�,QPM�8��%Ǵ{�&���\5�bwr�a,�l`p���>��\���a,�l�7C����D�yy�|3�ߒ�)/��	'.��&�?�
�eŕ���B!��pA�m"�p��$�r3���J�Ʀ���!�tj	:��(:����'�U�c,��@��d��]&|�JS�����%�ĸ�WK7�w�;����H�Rܰ����rM=O�!�3����A��dNϦޯ.��Ո&��E�TI��|�����ʭy�H���
!�Ä~廟X�{��bh�/,0�B�m��:2!"�Υ�6-��(�mt��Ɓ�pf	�]*¼�{);*�%�d�� � ����2�4��s�g<|��H�c�US�P�cU|�Y>����N��q��'_9�d���4��͑U���k�.��]�8]]�y���.3j���D�Qo���=��0����B���	fT�.E`6�[�1�xPwQ$�	����������1��'��"��Q�����=k2���Nt2���J�x��cBh���#�~������Èd�SPL�ZBG�?"}(�"Ո�F����};O�F�����	y?ta=����=+`ޥ�����}AW�AL83_�Ż��!7�v�A��V��\����jͣOb^͵1��s
��*���.��V��t�E*O�Z)�.U�x��)2`.���k�V�:�%����������iH:tq8dl�Hl���%מ�2�Maw.�V�vk���i��T/�V���^�H ��}4��k2כ\�۔��  x�=A��	�I<���33��/�:��@5��]���C�{MU.�����!���@S� �>��Ϲo?�6�Л�#nH��S�ێ��J_��5���^�9X上v8�ׄ���MHG!YQ�V}@����,�x�ǲ�6�
����!���� ���x�-/mh��v���ӭ��b]ߧ�9��(&xL��1
��U���=h+8� @瀳�鴨�R`";���
��a�TV�y�&��@H�6���ƭ�:�܃"h`1�5���Wd��yz�*�3``�]A�V�e��|�17w��V�ӑ7� u�  X�
n�`2�5sNw�0�1������5�5��|~E�j��|=�S����	>�:e��,;@C�[��F��
�M�W�]��v�/v`Ĵ+KqH�I%����`7���� ��#*��K�H�3�MK��K-��a�_�1@ D��]7�%	�#<�}u~J�b;�:�{�� ���`����C����j>�#O�[�k��=�"��eB�<RAƈN��6�ά�(��NFϞ jHFHA���0kX��u`�F�Y�K�<$���������*aҰ��X��'�-���Ii�M��@���):�£��3�����h��A5�%���ͧ�����,���$Z�k���-��S�'�mC��W�����::�ɸ��i�?"a(b��ʐ���(�ϫ
i�ǜ�M�ل��X#�'�0��+�&�,����Ko�\ - A"�;ä�N-&=�?W�D���q� ����x'�F~���J������2�� �+7�2�d���Ē+�Sh#2�]8�I�|�ͽ���*��it>�g@ �;�邰s�ŉ���&W�K��$�p� �Q��rgxy�4��Z��0�L����y	0�"A�o�>�FT��E���j�C���,*a�	,tE��Olr*��.ӱY�5�2^ � o]�T�U�?U�[ܩ�
�oT��yC�1��p��au��N���U��;�T&�+9�%O2�5SH�����VŁ�H>P�&+�t����X�Υ'�0>7�?!#I]�p��7��?���4�Q��%t4�w野0TƗ�~�Ya��n�/�q`0� ����������;n���ނ�p�}<����m�bݵ�)�Ȕ�C\w�9�^��	��Q}��;f�!+�*�:;=-�(���#va}2�q!�Fp^�J��/蹰g��G6��v12T�R��&��+����$@��<ش���~R�ϫ���aD�s,��V`��Q{{�A�����ٗ�B��KDh��aBD˖K��c���N�#F|ӣd�h}:�+��_�w��`�ِ ��S":��D��P��_a�Z��" Y�ǳL
X�Kz�~��Y�4�rH�t�wK������j��!�/	{�  z   *dJ)HY�_�O�Y_�=�l�!:��j������iT[}*�:�d&Ap�H�>Aϭ������F��`B�.��HR�z퀛��;ס F"ٺ��99+>�1�k"J�����d�y�!L2�%؅r�Pg���r7l��b�����#�x�&�}�>9ʝҐ3⿂)y����|�u�B�(J����R'_pW��W%�QW�K&T&]�43lg�/��u��\��-"0Ȑ��*��n��h�
�h��T��L~�� �����@kK6�rJN���m���*�	�	R���)6�l�����r�]�?I�PP]C:�N�[r�XI���<�/��<� �>�_�du�l���Β�\`�It �S.0$o
ͿMѧ�uX��%[pǻS�&t�*{˼���2��	�: �G����'�h���[Z{���[�+��Yf��-�����8�M�!��w�
�2��⾙ȯ�Y���p�&Q�V�jw
��X��r5�ʕk ��B\|��;R:�{ɗ�Ӻ���[�X�����@/C%\��Q1�������)�(�%�4Ѕ^'?e�c�]{���T]^�U��W�+u"e���ZM�n	Ё@ꀩ8�N-������(ll���/o)8�u/ L���Q�� ��5O&����'.�B>��+p��)~)�i�ث��Z�qU�f^߀�=��qY�Io���%���q}�^0�_6x%1t����M/b?&�ߪ�kK�j�0�������-֢��w��8���d�hp�����N�2�R4�G�Xp�a8���+�U�*.���&�٫oe�n3Y��l��B��g ���e�([&- �K&Z�df�L~8�9�n0)a��-7TZD�;��謯�Z�ʱ�
�R1i	��xUb��f���7�]K��`T YiG�T�p2H��I'V�9��z�b) ����!���t����3^SJi{��t� �A8x�K�6�u�1�����1� �vv��wR�#�g�[��%
	�(�Z}bE������O��R�E�X=�FJ��A.!\y0_�E�ȟs@�/!�y��5Bb$+	����g�t2_m�͟At>яVD V�YQhi.J��	��[��{�. ?F��Xcx�}��}�=�: �@e�fPi+�4���?b�݊���g(r ���� ^�6�0Y��ƥ���M׏C:0g���Z,t�5:ۡ��(��N] �`䛾'�y5iy]6*rdYg����� �B�	��fI���_Ko.��_���+��H�1�q��8�h�]�֋G�'�"��#�@B�l�t�E�%�-��b�E;���*F@�2����J{`�ٗUnō�R�5��z��A�Ɉ؝���%��εl@PcMu�8 �����|���VM��IJD"���7|MHH���F�S+v?�e2��I����U%� M�o�1fj�<�ZS��1=��I&B�E���m�Af�,�-d+׼[�~i� 4���H����ӗ��O�3�֦�h����d�W ���/GDWx��i�.��a���4�H�3d
�1+/�pߐ�$9�.�+�	���f3��,���0��u{gb䮳������2��UzH�g5;��y= ���� �B��n����g+�mƀ����� �s<�1{�z�����"��D��/���K���n���s����2�O�k�i u�'�o�`&��qDU��{}6�4�N�����2G5�|Я��b�����Ob�.9DEE]WԻl}����.��0�Ð5U�Re�v�x}��b<�M��x�k \��"<*#"��%"%~��TT����xd���Np:FBZ��}4\x�����s0�Y`���$�dd$���<R���H��<@�w��Q�}1
T�{�v�������V�~��<怄�iJ;�SV5��~����b���!*|�g�D�Ub5f���_PcHi`]�0ɜ���|j���G�d���v<)�їQ!f�9��,���ykf��D7���Y
sF�1�W�ﯿ�U(���A��;`$��*Q-��vU�� �P`H� y�W����q`y2[��C��rs�Q�|�%�0�~���q�|��m��"�c����q��.��{�O~�xc<|!4m*c�C�x��{C�ԩ�P�@`% لo#L]�Z�u2��b������o
 a�B5N�À����1��;�K���������a�,ٌ�]��K�kϧJt�2`D ��@u�{�+セ�j�<�[��[�*��#:J�	5���x趢�[����ڭƧ{l�]� ��s_#3Z;D4��Ţ
��O�X>��
*�/��ܙ+�5�L���D5��Hd�0й.D�=&@��}�w�ޕJ-Rr	?i��C��x}*:ڍ|�z�Կ��%�3���~0���è҉q�(��ѹ�����8i�e-Kf����6o�c�U�`��GZ���2���Zl6~���9>hG��Z��e�9����I�_��i�	'������ڗ�Ƈ:N
��.�~J~4 &�-�����2a�T���/G+����TW�}\�xJA"�_�7X�@��l���k��g��'NF4� &�a���9	�l{D�j+mh���x�E��,~��ؠl�n��Ė�rBN���&��� � 6.�t��mE���U%m�����X���R�u��Пᇊt̅�I�`H���~x�����U�XH�.v ���,o��r�.�;0T8�g�ΊH��l;Q))��� ��t��][	����\,Q�X�jD;l��1� ��'܄��m�Ec�N�R���?�������Ecd���`T�o�!֬��?� @p��yM6�dJ�bS�Eo�rQ� v�����ѹO��E�9�� n� ������7�ݷ��}�S �om ]�o�XY�be�7䯺�m��[���gt]3��EHF*2�$�
b���c5dͨJ<[e����\w=@Pa�9Z��GVGn��t��Nb٪d1V� ������ߧ'���|Y��$;�Ji�hH����QS��	(�5�9#�F��������/�0��G�,�ww�B�������q	o�~+���\�����"F�ꓵ��C�g�\��+��a�ߟ����ӝ��{�<�]��->��
�~����9���D��i'�:u�0�k'W�[�\���b���%fۆ	������
���'k$R�}X�����~�6���z�Q���Q�]��@l�
��!���vk]�c���}�c�5 ���^�������*��GEp{	��bC���zC����u=.��[������oS,�,�[��� ���7��hZ��Icȯ���;��osR�یs�X��Q����Y��w�w��6�ʳ���=\_;o��BN�d����PH�Eĸ�����J�i����Y}�C1��h����}`'�PS;	E�F��]�}E�EB����0![�*��ή���ɅN��C��n�]�I(��`%l���<'�H�iɾ���j'�YI�a�!sy��t�;��_r�WR��8 ;	q˗U�sk��4Vƹd���?�26D.G�`��1�x�o�.�Xu�	�Js���'�k�H-�%7L��l�+)4 ช�Yv�� ق�Buel��0�g1�$      C      x�}|�r�8��������1�?�,ɲd��Im�:�*�%�JE�h����{��b�I$XEy"�c��$�D��s2ų�+�/iE.�P좾b�����6�?�����u�m����0})������ޖ�j�ȴ���T뇶j�-��]�ݔ/�x���ˊ=�����Y���̜2{c��r]>���~֙\Y���z[Vx{[U���	�*��^>Տ�:3Vk���	)$�ƿ��_4���VSo��a��^��2;)���wu�5�Z|>vRn�u���������dW�����9�q�s�g�z��]5�C��\���m�y�׏�f�}+nYqi����S&F)v�Vۺ{aW��^o��i��|���a%z�].�Z�F9�n�v۴��=N���ʾ�jl:;��_��>����Z��`��BN�zՕ0⏒]/�->~a��<��S�wҰ�Պ��1�iV�C�]T�m�y.3#�r�<����#;h�fR��)�e�ZUk��_]���l��ʗ��z[�u�iw��w��i.��H�;#؂��-�u��Y�������;�cq�}j�ղx���q���T�M_�ܚ���>�vϾ6O��ޤXY�s�v|\g��-V����ex�lˇzSe���c����L�pX�U�m�'�l/��n�Jn�}z�6[vS�𗦅�f'������l�~�cBZv��~��zi���_M�PC�1���9>4m���������9��*Q��K����I�m����U��2�B�d�y#,ֻZu�6Ϳ+����j���J�F��q%r���ZW�w��������m�O������;x&-���m��16	X��7���N3�ǈIBd\Z�ò�ӟ�U�}�G�Ό&�[��^H,|Ӽ�Y��+ۗ��1������>:��h��I�t�˺��g�+t��@�2{���ԙ��N|����Դp0�/;h���^>gw�wc<�I-r/�f��,@y�ل�<l^��w�Bj��Q��B����!��7�y��~��P��^]eJs="�ޤ��/4�\��M�M��vӬ��ioe]��ܤ'}��sm��?#8�V�z��e�����X�2����~�m>�e����n�3�#$H��G|�@��\���_�l��r[/q\�k��Rd�"�7�}�wK��I��������Z1{^"��\xcآ]v��!���w���~�I��w_���u9���I	�����^ !��нE����b+l���ĉ F7[��]����ߙ����d����S_�c�Z��s�Þ����si
���Ӏ�x��A$.f&N	� ��8���6c��m]�W�>򄃒R�}j"��
Y�F�]TQ�=�ʧ�G=���ZF�T�D�sLy��c�^t-�kg����1�*�ibp�T�f�����Ӏ�T�Rm����Jd{�
ƻ�^^�͐����ٗ��w~�y/E�W�S��v/�'��S�n�)\�Z�pX<� ���
D���<�G���2u��碫�0;/7l2��S�n���,���FF�%���V��L��Y�o>�G�<�(}X���We��)�?���&{a�e�
���R���"�Q�PBG��Ţ������'��r�E�,�dΝ�G �_##�V;�t��ٻ.&��0�pܲo��6 Z��;���&_m rw��p4�� ���vV?�S*T�eْ��$!m��㳁��ڻHG�y,��k~�Č��$�T��@elIg8�O���VHJ����d+(�Y�? B��߅�X�B}���?�%+�M���&�+�����[���z�Vv�ո3%n���-ʀK8�罃�N����W�>���n�]��\�`%Î���z��y�x����k�yU9��$��9���p�!k�?�E#K�=(Ձ|]�S�7����e��d��)+���`�_��Z �M=�X�j��v�<���^�d����p��7M$��ι���Ϊ�Q#�l��o�73|�|^I�r���Vm��Q �}��o�jf�6�G4��0��|��@b���3�3ߛ��Q�rEn�쨛�v�l�*�����0~_'�(n?0-g��ͲJ�J�f�{~t��f�Y�$��*���F[|��G��dU�@V���L��'_c���oH�!o����P��y3���g������O��j�f�T�\0fP�iK�P!�V���GIz��_��]�h�SG#��垓oA��U�P�����;�r��>f_ˑ�U.�V��da�s�Z�̮ ����EVLV"�汞>�7��"X����#7�&T�s�=׽I#�#R�I�Z��X91��VM�j��< ~����߁B��;q?N��9e$&B�C@5�Ư �e�0ӓ�,C^��݂�$�n7#Tۉ�A��� 3;Z�/n{�>#����(�?�Dd�T��@ �eMPr����Jt#���L��'�W���ﺊE"�m���־Bש����-��ʴcG�ꅈ�ːE�W�oS+m��8ҙ)rI|��z�"��Tm ��M�Q0�d_7qMi$ֻ��F|8�Koz��̂Ӟ��aZ��|_r��	T�\7�c��ڇ�� W��?�5�k���IZ��yK�n��L	m9|Vg�Hv�b}<S�粂���0�� ��>�	ٴ�TY��(É�*s��<c|�]��V��D4�j�z�e��I�?�L���#G�\0��vV��}�&p�ks�{�ރ>�IJF�62�)%J�#y��#���r.G��#��+����){�jr|O��r+	4��\�������}3{������,�eG�V��%�͘�| �`9����s�n^��^��3�.������S95�>fGЉ�kK�R�1EJ@^g�i�Ï��+Km�NO�l$��c���MCz��,|��H�E�A xo�u_�ۭ�/��Ltݻ��{5K��2��J̾>�7�4�5Hۏ)G~tc��ZQ��\L���B�#�W`����뤸 
��K����>�H��\D~v�R�`+����ɓT�,�3TY�Pa�A-��qU=R���`&�>MzJ�΅�b������&��n]>u�j�� ��/�x�b����z�����%6��*`:s�� ?*5
����~x��A��M\�T��	$WX@fA*�x�q?8Gܼ+�^̍n��"b�-<~\n^���¯�rz� r�8.��[�v��d�+(�U���鱊q /�X�G&/Ó���B�EU�+Ӻ%�Q���|*��xj8/p�И��HK$� �G�c��U� ����g�x(Ԯ-�R��?���c�vVz������0��r;68�w7�V�Qwç	�V^��T��=+ē7����'�O{OՔ"v�F%I���T��}g@��d2IP�R�\)[m�XO�) i�J^ʃ�j�B(T���7[�&�vnҗ��Д�
��[o����9R�TDR��'K�=0~�~�E*A_�M��$*D�ׄR��=Y/X?��v�A���-�p|��)�9�Xf]웆�
���W]�_��;��k��/�B�N�w'�]��L\�\H�X��97�fW����@.'��)̝�f����	���^�+h�4�,���o��sS��Zhv^�����������bV��Bg�6TG��)��z��N%g�a��B��p�ƣ��L^�v�Ztව�^��'�T�$�|��#"ʡ�4�D��j#-����������T2�����~'�\6�+6hM��Ou���^_k���G3�=,�z;
�p�̪H�J�!����#sWhȠ��!�N2v�wP��f����A��l6]+�S=7�|�V�\K"�C-|y��j�����ǡp�/?I�VNa�@N*� 'ɂg��(��-��uk����N�{D�:���n]/��r��G���+��!Z!�t��i�	գᐚ�d�6�T��r�Qۄ�=���e�7z_� ��6�pl����K��T_�)]�u�B���"��tFߠ��h(�@RG>8<��` 5�z;5[�d�`�����8�� � �s�-���N{|��>� 
  @:r*xhY�0��Dv�L��o��G�yy�)Ȼ�;7�Ǐ��Y��'�;�x�/ӸR��2��=G�ٴ��q��l0���H�����]���	�䱉ļ����Ӧ���B�xҺK�$=j3����T8���ރ0N�	�)f��\߱�B�0uC�����g@B���8]�g!�&8�
K��I���aC����@G�ۻ�<�O1m�X����:���t�����ۜ �'�5e|�w
�qJ��L�ωW&_Ev�s�D���Q���}�qR���d�p��P���t׏}1eFڀ�"-L+Ҭ��g��S��r2D�3d�X<�oEN�ڀ*��w����$H2����Rk);붛j�N���|^\2w0�$t\�f�"�*�T�k@�#3VR��_��Av:F�a��������k&6�ό�\׀��g��tK���p�����BE;�Ė�W��hٯ���.���8�~B�HYo Gv�<�H�wV$o��V����Դ?���9�w�S�	�"�^������4��o���J�Yi��!�X���j��`BE�W3}ct�*ad?P0Lʍ��3p�~��7;aeiԌDަ�*y�o��Hi&��LH���v�2\ux�*�
h��oӁ�d��"��$��pFBprB>�9�F�H�#�G���G̟�е!�B��^Z8WY-�u�I����$��jR}�S�1}�_�������L��N��鴸`�|����9�r@:! �z�1�;}����o�}D�}YG�0�bJ�θ"�<���uy�j>��~?�8�5B�̴͡-T�6��W���~~Vo!]�����΍��Y)ԯ1�0�����{�6�՚-ڶyK~�ϙ�c�<R����p&!�:	�}��F.�=�I������4�b�T��3�z��8��<��aͳ��`�J�k��hwE�i.�@�K���l�8�4�-�X1�pGC�.�� ;�=��~0c<���q���h:=s����|�����K��]eT?}ػBj���6[�D�Dyx5h�� �X�yk��T�8�7L�&`p��Q;ꍦ�wB��]����,�)Prg�̦%Nߏ!m�L�ʎ�ᚃ�WМ3ǄJ�8�S�)�ϰ�v��9淌���!Zjz�A��~�r,T��ʡDު�kB�[���t��cs����|��P�F�:�$
������.��`�8	�#?`���@�������C���k���y>�N�Z�9��Q����̜M>.�jL.{���F�/!=Ub�+�F@�*��~�p�u}��I"T&��u��C�ũ.
��(#��3�3����ʏ��8�������NCF��[�;����)S.�.S��($5~�������;naΘ�����qi���1�b-g�C�'[�����(��JR���cD�]�9t���"�<SEOw4"�b�!���_;j�����M5��1��Kb?}E��~�<�o����12�]9@P����9g�˟�v&uށqk�N+� !� B�|�!C!�k���.5%-@{n�)�ġ�qސr�:��'�픯ܙ;&�&�2{c�!c8�����B;��T��)����a7�/��ޤ�5Լ���� ���o���X맙� f�V�Oğ��&QL�14e���>���Z�%/�H��xv�<�	�ι,� J;�	/{��c��IC��7��44��,=T�؝9���u���b��H�R�4tۏ�c����0�!,��b�������t>}����g׬�mI�Y��~R��]u�����B�3{4�g�uF�Y8������%L^>���e���
�.�&;�o-Lf��˦�1�\C�0��m�@Q{�f�������XɎ���	��A�\���ѐ"�*�#���P#��Of�=5�t�^X�fL�)�4�s����7}�`Um:��=�E�	�� �i�"V��$�Jh� ��MDx���X/���k�C�e��0i�����
��p(v\�*@o��Y�^�WH���ۜ�*���x�ymv&��~�e�и�{>�>(A�!W��p���䣔J��H����X��}"��|�y�H��KK r	��ۯ�v"���R�1S�z�/�� Ie�^t�D��QHW�ƒ�wPS��v5��VŻ0���,�n���e�xv C�qh�5�+*8�

=U�g�sbp�V�Z�xn�w�ҝ�d&@RQVka�4���y��_&a�"RM����#�"���R�UR���2DQ����������ꝍp�0N�ЙCR¸i�lR��ʫw.f
i2o�_>0��'TA/�N�xV�ų�#r��G�È��H�G�S'[����Fj���'����ٻ�{�@,w�EAP>��cg�}צ��7�`��%9*>Ԡ�*@�GÃV8�����4���X~�K�O]�|ʯ�M��_!�F���$���	T�˖x�5�md%�5]G���迦K|��}"�
$��t�c���.x�2y4����5q�4*)4C�<l�B�	�b��;�!y=<T N�J哷(*l#\(sFk����u���XQ�8ÍM׭��F�iU�량fi`A
q���pʂ���r�i�jVωAse���Nآ�������Ty��a��^�0δ9MUҞ�����4<^&�Lhvr:�oh��!�Z��QF5+���T���W4h8P]j����E�w�ԟ3:�{�����nf����a�V��JM�o7��~��1��?�.��ٳ����+q0�a�Ǿ��FIF�d����%�.��`��7�Gv��^:�ߙ:��xm�ʝ5N��E&����D�qY�D��H���>i���o;��改t����Ln�xb�v���v��h��	h�����+ ��Q�����c3�D'a��xT4^�P<�������������it[A��rn�^Aa:���~�䟳�fctFSZ���$��s��楹`�tr�x�=���]�>�K�C�p���vs��08����}F����9��]��r��p��|E��u����;Gv9��Ò�S�}AB_�K\{M�8���1+�'ϻLq�pƎwI��r�.<�<��Ϥ*�t\�F�>��c���D��T���^��tO��Y&��������-�}Ε��t����w� ݉=c�8�dz[�i�@�t�a�����CZJ�N��΅W��K?�A����� ��D�٨e� -#�Ze�&�Ho�T&K�h?�aȳ�w�A��}^����2~��d�.�:N��(���S9ۀ��G�+����0X|��g�jW�V��2�u�"c&Ry:j7��{��������)���z��|X��q�G&�dVL��x׏�#D.�v$�7��i��N_0;�`�~���4����ͤ4�ӝ:bb"�� O�w>�E��aw��X�\�ɘe��
-� }/���d���L�.���eL?RB��w.�Ej{�N�T�8([@�H�4��Y�O�e:����2s0���Q#=]�i�}E3eU��ÇW�k�����
��x��퇏8�H����x��»9y@�4��g���7��:cfAnz�@��3g��􉔘��z0�5?dbVr~:��qHJ�oj웘��zI5�����e�i��F���nb3�i�g��U�_�y�,&�r!�E����pn���P��(@��;	.C?B0���_ޘ�Ɖ5r����$nh��P�3&��T�p���v��d��^N�pauzq}�w���;�}����|���0���A*���n8_F�
�ٲ��m3X!��T�:�L�<�EAd
�ǋ��몤&��H���ZR�����^�ei��r�3�s�-�	㋱�?����ֳ_=      >      x���˒�H� �f~rQ��@��mee!�z�"R�*3�p�� ���Z�vfmc�m�m������O�f>a�9� ������ｕ�	��<���qs��)�z�]��f���y��=��(���9��eQ�:�c�i�淣�M�U�x��Rh�R�ZK�R�D���J+ER�j6y�����Ъ��Z���qJ�$ڪ���e�Ÿ��Ri��j������gm��3m�k��&�_����Y]/��c�F�*��ʓ,>���8��q5+�$�D5��M�	B7頛���~>�e1��?����^��E�E1_�|�����Y��3l3�uɗ���YC�7V�n�F������m�-y>���J�L���I8Yx+It9�躘�3�R:�SQ��nłPd����a�����AbyV�ڦ�^dq�bnچ�d����E>݋w/�e��ڻ&�f�u�|*Ҍ�F\aI���VX�D��[����}��c����0q�9f,6�����0_�C��Aȹ����"[81�Ǝa|����"��F��H�ڍ�u�-�O�1�\�Q�װ��Yd���e��ذ�)�SNo}�6ޥ���ſ��� �8�9R�ݧ�"*2x�S�����TT�"{/�����(��J�T ��2^���"Z�DB	���6�H���N!�P��)��=�2Ɔ=^�E�D��-�+�.��0t� o�F��%����S�䞳���/S!��y��(e1ז�4�iu���8�>�x�����JB��[���L�ea����%ϣ�v�V
γ��!���uwa��B�Z(^is~+$ոVGW�
�^�r�~9�|G��7�1�Y��M���-���;��/N�D�x>��B7���j��*�3��;���T-��l1s���'�UjS��L�/G�Zz�{g���s��Ҙc<�{���"���>�Ard��E�Ƙb�S�L#/Nz������A��!�����&�U�UA�}9��F�
V=b{b�r���1H{���q�G�;��.�U��A�l����Jd�j?����˨θ���#�.u:�����`�t�8J&�L ����y9r(�Xdi�M��� #@'0��	5��I�I`�V�!/����`�sЊ�@��G�*�����1*��B�	�! �s�P*P��RiWd�l��~9T�LD/wX��d�A�Z�Zw��k��6�к��H��	��"JIB����T�	�@��<�J_���T.�|�c�:0�I�ZB���Y���a��u�^)Q� �4-HD ��@㒧U�?@IH�����,��z��r�,�����N �e_\����8ծ�]:b���Z��10��ρ߀yZ���M�ۧ�A��R�+]���4������E#����������*��������W�I�mp�s��ϣ7k����z"�$�l�<Wh��]�j7 x��J歁�� ��L. j�� �g"GW������������wx�f������(�*�H�`�v:�R x
���"	&_I�vv�ԟ�l~�D�#|K�[� h�������!�%��ݺ �U��.W�f|!:Ȥu�VZ6���+�>
Zgt�<�}���3�'�Y`[���Sg�D�-N�UH�Jˁ�A����p?pq�0��|���
��ȟTG����Z��e�]�����]V�ɸ�L�%;(oD��?pR�44��H�k�q|XB�����`��[2��l��*B���s�>�o"C����߂P��߁�WU`;�{�=�2�j�a�_9WQ#d�RL�M\Z��	i(�"�-�f���4�Am9�1����U~�O�O��[iS�0�w'���C���sn��=�
D|�#�c��l���v���M��n���h�5f�Pn�N���*b���j���@x�|G����e���c�y���ؑ�cZU��vp9�O�)]4�=|�L,Wd*L�̉6�ߒ�tK�~H�����65�p>�鵐O��������9Re.P=���<P'n�)�ek�H��6�_}9p���5���o��S>�ҫyQ�~C9��P_������U,r_�x�,��g���+�����@p.*�Q����O�8*� i	��A�
����8X���¸K	��D�G�<��G��K�\P�{Z�h��#l�B�C�"Y�I���6E�¦� �J���~��8�����л,�E���g0���؋��~d�}��"�0�;�8���n`�G��^r.�����18��CLo�𐙭r_���e(�c�p%�(A�a������K�=�`��f~�9>˖|Ua|__:��&5!��y��L�����
Hу�]W��Cb�p��y�v��z'�{;�i�w ����1Z�`���EZ��}_��P�
�]
�u��`��@a�w��~��X����U�I �� � @^�,�C�`��^��8� �]v�9�x*����{#Lx����'dЂ����Ah�``[׶�y�t|$��n�%(��v��&�h�>X�.�x*���gX��&$Չ�D�{ʄF��&P�+|�R�9l8���,��_Q���g���թ�2��&�l~�5�ͥ��M�����
i�.��W�|��[F��w[���c�i7MO�q2>#d���%�d�}
,ܱ�% !��Z��>�6]���h�Ŝ��ڍ~=K�zd�i��
2J����d��f�1�"��TH] ���Y��x��/Rxgвj���mZ�ʀNFF���])��v�R�0.��<���#�\���Q�>�<�k�	K�L����\���	��)y�f)��E^5�"uF�T�� O�z	hc���_����w�Z�CD
H
1O�$��6�^%�bE^�eC�k�]�~��B� [�abN�T����L :��E��(�wB�Ld(�� ����!�(��|�����WQ��]k����W��K�76�q��4,=�<�Af��2�m��j�bZh|12]���e��^&-���he�����k���P���+ 	�[�ȶ��C�h�j�2�2Z~�UM�4Md}��������f˰ V(�^aВ�qY��l/k8+�a���v�Jb9A�Rb��@����0��C<L�7��_���ۦ���YQ��p�U�:��S�V�� ��1�q�q�<��RtJ�=���#�>�X��Dl�}H���lE&7bl2<��j�R�5�%k�����W���ۆ�Y8��;�r ^`
�Dt�<�]-j9E�����9���ΐ{�x(��!�'�w����p� ��� 1�8�:fpb�J��m��� ����%H�H��a��g_%�<�9xC ��,X[��**�!�HIUIJ��=�� ����p\B�&��5����Ŋt����<s�XBB�i�oTf�S��{IZ�;F+:��3�IX� ��$�$I�#��XQ=v�K�(=s�.B��W�O�#H>����e�G=�][�J�� �Vkum� S!^�29�}��:�c��D��l%'���{횎Հ~?٫p7�bӢP���Cv9�^wRAY'N6�׺UzR+�t�(ч���2�ߠ�����`���ڬɧ��(
 t�] �����;�9Y%O�>����j��m���20�t�� �5��Wp�&:un�H��B,zA���uՓRG'�U3A�J���N-��i{2봕;�;$uv�hZ��V��_� �;�&Ҝ��p|!)�:1	�-��I ������?�u�3c�3�S�7'~@� �j�l�:���sC�s��x�qF�+�m9$���d�"	ؠ(����9̤���\����#	�i_>�����VI��+�-�B���#�a��6Օ-!��%s�r�k��uُ���֮#kK��\�8Ke0yQ,(��7PP�Bў7	W&7���mM:%��{�	�-�z�������j0��@}W�I��M~{�I��N�t5��WI3�Е����a�ZN��T�� G_�w�K�����(/��֢3A��~��Q|�x��r]_���_�GnOɜ�<k�S{������k�PPu+��2�ĝw9ɈW����    
Yc�ѫ�׷9~���C�T����qɗQQ�;�\],���c+Ŧ���_&��
�!HZnZo���E�
�����)���Tk�/����uO��w��M`��,�����������a-gkQ|�0o�[�5�1������q�Ǡ�4:Q<����	<�i�QVb��ao�@�b�~S۟��,�7��3��@=WW���.J4h*[f!3����#��/�=�=p�;�1�^iʦ/��s�p0*�X�N�!L�Z��=7bCD�=>�1����i�*�fE#��Lժ0'jJ̤���k�}���w���!�z�^����Ҝr���b�����ߦ��vZ����u��w���|�R0��%,����9�/L{�_{~)F�%���h�W��F��~OeA��6E z�V_C	��7~��_������u���*uϑ�sS�Bvm��+�X�����U?�a5IkRvak]հ���V�gS��p��F��|6i��Pu)�i�l�R�9|�Ҡݖ"q�sɄ47�[�{�7O+RO�(2��Ve~���z�2]|��E���H[(j��o�]���7炙�˧>�/	9xcܽ:L�� �)�����LS�/�[��p���;�Lt����I�I"��Zp,4� ��'����"IKA�"^�� pE@�q��Eo3oT9H�4��n����e�R�MHܩ��~�z
Ԑ���\�~�#�W�����-���5�����.�3��D*O�`i�`��b+t�`��:Nͱ��t����{�����Рk�w���p۪Q��pS��ų���E5z����1�r�/���̻��^~��<,>�d�B�"�y��G�˂@�*ŀ��(0GOI��m&~�ވe�1]/���I�M�(0�M>�IK>O���?�X�	�A�u�#����|g��Z�G�TNA+A�;��w�X�ZWj>ʸ�5�0�iV�}���I����;�ڄ�[�� �p��N����s�``�0|L��ȅ�7��|/</�i#���퍒�Hճ�N�_�T�>��! �A ������<�_#݇�r0)6I1e���F45���8���C�:[,)��M$������7N$�s6$��^�_u�b��jр�I��{��лO,Ƕ=�Mt�7L��ѹ��b7px�8�71���|:iD�b3��6sG/��D���ᘒz�wd�o�U�����F��+b/`�"?֮,<"n=����</����XT�sԦd��Pi��;�w"���&,�.��+0I]`����O�R@��J��W�X�TEEA��I������	h�"�.��)�_[�������i!����$����*Ał�aY�Ι�t�rM�w���2q
V���b�v^3�mM{t-7�^���v��\�+�H����o7�kJ�=uר�1gʹ��jd�z���`����E���J�/�cJ	Z+iVdiک��������������o�ɬߏ���L�)�̓/���3��6������W\F;�c�iuX���(��1[[P��D�Bγ�������cz��4|cM� 0�7�aZ�7�=�A�Q�N��ʁ;�ʐ	��2b&U6LvUŜ���&���|O���������G���F��炀�y�<�-C�H��kw	��n�s@�ճ��u���ޖ�N�׀�?cTrI�G0������i �Z�P?�6G�0�,+eS�9�*V��)��:��p�c��xճGU�a���a�����.�͘��m'�t;ҍ��N���-�b����)ϼs�E�ύ6��pK"��m��tnqK�n�,�i�h���h��Buh�s#�7]�%6�S�Jt۵l�Obp���#�!���wql��ڐy�;ʟ���5����bIό�=je��H�l��Y����:��m� r���$I|���ȮX � ��d|R��̨4�^�M�=��|Z� RpZ1�q6_�W���׭�/�ϾP�0s� �]�0�I���9��| �+`���� �� ����@������� a��;�y(���59����ծE=2M|�^h��C�0��l�4�_Q�gWb�S�� Z?2�3��7�0R�Jv8w���I��v1Y�6緈��wI�^�OE�0P�����^l��{���}� ���3���l��`<�m��u|���a������;7R�)��6B�A�i�������*a+b'�D�v|�aX���̍�P8VkgvV���o��?V�ep5� _�R���~�߫�B�~��a̼㾐���t�!��W��Qkr�l���<|BMʣ>e�K��N��UW�"߭Z��DX|ns�X�s܀0�K2M��{���Y`�XG���z��;����`�`���L�c��o�����k�_��.�1�Ȟz�,��{(�
��I� `�3vu@"�庱xF�[s��x��:ۇ��2��*�7��9�a~5�@A[�ㅺiG�n\c�S�B��A��k��=|J|k�c.z|g�Ĭ�.%���hBpz�y�Fζ�nPâ��j-��#U��?�\\vc�޳0�=��h4�3/�}�"��b,fn�ֶ�������b���P ��蕝��9k5�z��l좼��XA�j��1M�̕�TS�R�)����,�]
�&�Χ�F�*zMڜ�S��g[�X�;L��3��j�����bv�~bp|c'�ݶpQ��t,_�$b��6]l��&�oo
���eU��� 	�#+��I�� �_�����#&d���������	�$�����a��9��r���~:wSTPF�۾9r�R�a�}� `�7 �;:��>^�=�*�p�_��4�����|u��Ɯ�\�[;�hڞ��W�FP�`�rz���8H�EրA�6���(n�͊/�r����i�:�Sܯ��W0-�D���%.S�e�9�5U
fe�z�h���krJ�����t*؋��u���vi�?U�c}j���8v�N� �T�_��R�D���bQ���,�@��yo�����$x�8Ў�F{�u�3����b��m�}?��r�������{�3�����E(?�%����|�U�����$�:)�[ٛ?�+���؊XeJ	�7l�Y��P���┪~%�p�$��m�.���h}�n�TD<���ս�7�%Q�n���u�A��q�S�i`pw�J�|:�.I� 6�SSXo
듍�>9�);ԉ�#U�A�d�W���S��$G���9�S�5�pPP����R⡦	��F��"g���ji"Z^��$�<AB��l��P$8(����Z��՝��w��W��0��o�����;�@fUt$_��o���(�Ba����Kj�^��Q�e��	�:H:**��M:�� ��d��#,��{�����j�	�لg���0׉���y"!@A�4�"��)h���R+:yf)V�`���������{(���:�\�W��1��-Ǭ�ri�k�vY��o�y� %9dR"#��,H�#�9�,	�ɂ��y~���a�^\��O�e;�t��S�>�L���>0kk�SY�\���4z̓�zz	҈"����8J�Ƽ�
�e�ꂺ
ʚ���)���Q���aI�#��Z�Ӭ�u��RB�S�a-`	{�a���C�v(Nh��^t�N�n���'x�+�&�y��]�1����hA���ן)�Nno��������'��Z�#���`]�h��I[���Y���� ��9&�+��v�_��[w���X`KP���`���{ �p��Mt����vz�6-�b�<0G{�`3%p#�95w��< Ͻ���w���-(|0��'0sM0!_7��;�з g����6�(V'[v(����0pB�1��rse.WV���F51#스(j��ɵ�M+@i/0x2��0��U"�HVTz��E��ɧ�- ��Q���X�="��l�x6����d���N�3|߱�������T�����n�ff�]`����I@�wg�j�R`l+�Y���S�H�0+�֚s�/|��xS��1+�k��Wy���h#�	ܵ�^M    ����;��z��|7궨���d��h��_�g��X�j����8m�c%v���h2��K�(��b��ZA]��P��x��<C�G�FSe�'�,0C瘥R�`�34	A��3N@�~Tid�X>��d��a�����Leܘ
l�j濺=F���R��?�@�	*5Ϙ
�e�
���e �v�Mk�K4&@0�����  �/���\Zt]Q�>��U��o�����p�ކ#�X(�ݠ)���=�oA��Xuz�ɀ� �����E�Ş4�KF>�,���$lг ��� �U��#c��b.����r�`ڹ2��"�H���v�9�`�6L��L첞I7�-�U4P�},��U�.M�� *Q*J!�j�/A">��0����ީZSk��)�B���Qv�ˬFH�Gxӊ6���d��E�ugV�$�l{9���{V^�N��P5L���<ȿw����3�{KO����q坩,(�\�M��i�,j�p��e]P�25���\9�n�bV/�\.O��; <mn���4]c�^}�S�S�ǥ�4�g@��=R��`���������d) ��2Q�)c���9�N���"Ts&';н���mۈNpϚ\���)0�A�`GD�Q�����:.�N?)NCY#��@���Lv��/N����A�c�E�MtK�%��R�X��^��d���$��+kr�+ e��T�WZ(�l��	�ӷ� I�ߑe��+lf��ش]��\˰��{w��=�ɼ|��������ג2:������c9�^��_b_߼�('I�3�ls��u��@�mt�� 1%�u6�4
�v�%pN����ڋĨGt�D�t�H	�}-��r�W�OtVæg��~�U�#x�Ǜ�� ��4%H�@B�t9PQ�v�S��o5\)��ەx^b�.|`����	���O/�K�uq͞?&����1aX�� n��M���	� ;F̻�3zK��8��W�{-�4Z�#_u�N4��l")���{����r�b�f���d�$p��5|��t�$���}f�a�77���������E��ㇿx���nuD�q$����/F��D��ouV4~2����liX�3�>J*&�)?H^Ӂ�!���O���Z��E�Ĵ��L� Ȗ>:�̇�E�;�D�"�����`Q��`�DcR���u��'ߎԞ��_<�_�����ˍ{y��/?��Ϟ���8"��C�A,�^��v�8�e����_�bO�6�����;��Eg��?�b[�t�J�LQ�Z��W�4�FM̀׽�|r�G���̑������I�Z����%'�	"���kJ�KS�gC���b��?U��'F��q
���+�X�=�@
�V��8u������<o����7����߸��~z���W�x��]p��n@����!�p��0K�qT"���剴�JBH=>�J��(@qt�qNGk�eX�T��3��*��L5e.���K��8��>�HS;�$䈂/卅�,5v��72�©�	�)o��A��h��UI�גz[Bu���	a[Kگ���`M��;�FȥH�Eh[������#�����o��S�����r���k��/�06ܣX���e~��ނO{��&����}�#�Z߉Z�n�#�8�|���λ�5t��K +�2���ӈJ^��Bޱ@c[G#"����؂�>V.m�ޒ���I�ī�����b,Q�� �5��d�A�dj"O�T,� �K�v`�Lsy��x�����3�Oo/�1X"��#	c���������l<~���͗��(% և����� >�_�����������O_�zm}�F4� �x�(
��n�M�z���F�
�ȏ��4����R����V�9O^{݀V>����ߞ��Ua��#eY�G�����@�o��>�.�n��բl"�NZ�xǤ��@����b�|Q�3���	�dL�N����S����
���<�F4wB3�Ðqݎ�@L�ԃċ]a�q8�E8�����}36:�}G�v��`��]��.u1d@���U$�4�\~��+����/ۀ�>�Z���&��gi"p�ޓJ�Iե�]�D�b�:�}�.5y��8Q��H~)V�j}� ������`���������s=�<�mU뙎��c[�&Ӑ���;��e�G�\��c�M%F�v����4���f<�Xa}j�m����c)��=N�g�y����1��+�@���x�0���:���=Qr´|�e�xD�^��N�]K�S#�|J���g���\���1���`���o;�mId�q,gfm������+?h�#*s���XϨ�����6Gz f[Ej�y3U8�B�vz��z^��R����,XP��z�#N�#&�l�;>���Odh~m�&�N�w�V�I(&h�p�PL~�A�	�	bSL�	NȨ&8�r�:rR,DN��=O�N'�1�8�䡦��K���	5�p�7W��J�/ ²�ʻ�,����_!�֋E�#�Y���J��9�gv�A�2�c�$=LI:��:�f,�Y��2,f��0� ���ix*E�3�Ĩ?��Sh7<ͨ�f���G4o�Ve���dE;?�C�֫q�%������� t�J�0WP�Ԑ���Y�Q�x�J�����	c��e`Y��l���5]˲m��L�q=g�O&�&�M��H�F�{�Xb����l0�s��:�a��*5pK���~F!VӖ{	��0ѭ�J2���U�~K�սD2X�і;��<�W��6���kX� vMct���]���M^@�*;C�]���Z�	`�H��z�H.�:U6��G��)��'[�%J��Om"'���<;h˯����s����5mQk�`PZè5G�D��K�#F�q<s�+r�pZ6��G�� �.�`�%�3����,E��t�L�-6�h��:TEZTm6���=�"�Ơ=&>]ħ;�@� �d�\�5	��c��PQ�iZ#�er��7�q��<,���ծ���i����'rqea�n�!Y��}e]$ k����:ҕ�@�'Q��%�1Zα]cl>Hc�2'XL��"���6�	�0���X���g�9�{JSM�a8� 50�N�v�e�q��+���S�x��w��cj�"�����#^�C�*�ap��G�*�2���uR�H��1qo�c�4cVZ�S�Ua c��.�|b��f��X�4/6��(Ee�vioTj�)np4f�yl����ʰ�v�����0��Xe�Xu�	X1��R}��@�Z�w�p�V"�� ���.��|�F�Ib��E1�{��9y����Â#j�k!߫';�L=������N|L������L&�g3�s ֲo�a������ɦI
 �����p׺=��-��F1�d �R,v���Ʊ�8vƄ�K��Z`6�A'�Ugw7��7���e��2<����| �a1þL��K\)�W��mZ����X#����hߒ �uf��p��V�o������\�K5��f�7�n��_����5���{�l�A��	°ʇQ�^���k��l�M3��ҀdW���3�rQ�E�K?*��d����}�vZ\� =��k\�C��j�]b��XR_�{8�/(�yvi4����=��.�ÅCZx����z�o�� �1�aHD��	�6=��m�
\0��S滧����Ȑ�m��cڃ�2wI��=2	`�T.��$X���I`#	��nǳ	���$��#D)�ǲvIpQ�����G�@TȂ��[�㟍���p6��d6	�_fb{�!i������f{��ӽǂ/������i�Z���*?�j�o�sqފ��c���y��aζw��2on�Ys��<���]X9-_��n�o�g�l�x��
�L�<>�gg�W�E�@�c#<�����]웓�@�q��4�x2���H�����R@6�=:��r��Z��̬M�"�՟�O/0}��%�?��[^;/q3��LT5ݰ��ܶ�����v�Ou���S��N�Fc�}���!�Dƶ�#�K�HԻ��`H�A*� ���֠~W�    �Q݃���E�jO�#� {_i��`�F7�ğ`W��J�	�����K���xmUz�4����6��z9��&ǌU�uF�fO��lc[�R>jL����w�q��f`�{F`�6e����\O��^4�a�=ѐ+�g��gٶ�٣͓ �������N$n����Լ�j�l�� nf�囀��JM�81�F�Q��2��,r���k�����s������Ap�Z`�~u7
�l�E%!�}Gr���Ԟ��;|�ɚ�:���C�d�Q���A<6}�c$����84�
�Z�mUa�-|��V�WE%��'r�ow_��˺4|ZPU�uѡZ�2a�ֿ�Y��yD� �o��ߜ�~��f2qmC�U����ջ�Qo���Ӓ��pWEHA�����^��,x��R�=�O�]"SK�j�>&e���6���wt���R�7���J�����b����Ƴ�ª#���� �]�3���h����^c3�Wc���v�9����\�[��u��'����z�[��ɾ�7w�6b4�nQ�w����󪷗���w/=C�Q��c�#~w�4\����Ř�2���8�a8]�����0y�{�,ǃ�����*�^_mO�|B��!��~����S��XF:PJ��Av@�I��.!6^�O�o�;�m<CU��b>�ر(��(���"&s�A;��q5d��>}U��T=A{%�l\�c�[�����x;r�iI�J�:w�酨��7٧!�͆;Ƀ�o�����j-ܕ��yv��נX�&֗@�lb:�������.(������ʀ9��A�x��L59���2�U,��22��1��aq��ַ�H&v�୍:�b�w�ͷM�1�;�E-�N�����p�����0t�V������:���t��9��K�`t���J�h��g)���2���3$�ެ��zM:�BU`��\�e���:�=�ӂ������D�h4���5�[FӗgX��1]�'�}�H3����J ���b���'�Wtw)�A�����⟘���~�տ쭿��w~�/|��'�[���T���`Z��ȡ���NG�&�5@�X�JyЧ���f��x��&�8��w�)��W�m�
�[G�������:,ZᛗoZ���1V���+�-��݆(lK�Kݤ��s��gg�c^_�m9�J��e�s�
�2������z�o�Ni��5ýBLӷ{혞wXDX�O����N�u����l�`� V�J��f���i�Q�穝�E�r��Xv-{���}9���U0�a��$w-�/?Z�u����hZfMX�`�X��X�`�̱��ٮ�l]+������3�m{����gTE�qJ�'њ;�k�K^Q�^ZB��b!�i�P�Q8��ߚ�:\�6��ޕ�i�'ȪzT�3D�IY�{2c�0:lZ� 6�u��C��4�Yp?hE��Eʖ�=c������H�=@��+$[�Q0���lzF�;�G�Uv�3�:�nK�������aӹ��mNw�+�'X7��$�H4S��x6��G-͟ho��~���,z�37:�n����.l��mX�0�ϲ�0eY>i)���ڧ������9��8���s��f��H+�D5	���#��y�<��o&����,!���g��4+��'��v�B|�5a/�7����?�[e��[��(��Ȑ��U�-$�����<cl�f���b���6��}˵�AE���E�/�4��Ot�{gB��91���n�M��{���<��`�-qw$�57c�$b0�,���`���(7��²�$5'K������N�S�m��=;��烟ck-b�T��̫kg�[�n'=�>z��۝�w���	����7�a�߾��2��m�����W�6na&`"� |ہ������g/o��CSՅ�l�� %,j��[�~��,���k����>�E�fL���g�T�|����s��
���Q�?o(�+�����.���7\o��\�7���'�7��w,���`0��]d"���lB��6���s��X��xE��
�SF�We KU��� 6,A��LGK����.h�Gů��u��NL&��l�C�?̥��]g8��#&�n
����T�yK|.��<���.��ɺ�qh�b���c"d����%��3�1Ɔ�S~Mǎ����`Z���R�;�����V�ޭ�gUU�Xt!�>��U=\�V��H����ӎ��I��j��#V0�U���N���&0ᰨ�N`Yl��(mA�uײ���q�u�~��K�L�pC!�4��=İ1��9���	j1�|�B��©3��L�2�����L������oԵ���#w(qWh�F�_�p�C��6����}hb�:�L,ǳm�����G����=�^_��pJ���x{B�v��V9^����~kc�����PXc�AO����\Gt�A�� ��/P:��p�ݡ15/��6V�	�+5��mX�-8�מ��\���ۊz�� ?�����Z��	{!�!B��3Q.8��Z��Ķ/�;��9zى�q�|c�Jn�����C�����������E��9 ��ur66=����)�K���3bꆯ��� �b�kڪ�}pR���X/C�3�ܢ�e6�
��=Y�+Ѿ&!�[����M�Fj������n@_z���FK8�5��.�Z#5��Mҭ{��T%��:����7�tD7�ݣ=�]��l���N) ���E܀�ѓk��N>׈eE����?F��m�(ٿ?�tD³�O��*s'�o��	<���^[�<�3�x�o��'[R��`6C�� ��֡�5�Gq�M�r]Y�������aQv�^<�8�tf��ng�~f�g���&�مϞ�I`lq�eC�������ǩ���HU+|�>e�Y`:���nۗ�~�z������eڶq��ês�:m�ui�o*Tt�5�y�+^�{�N�����zu�̮0�XzNK���Cv�`���� 4Ttt��zZ���~L�>b�gm�ă��x#�]o��~V>Ѯ#���������as�/�{H��i��J��j81��V
zTW'>:�f%���o����=��!O�uj�\��3p����ʶ�T �>(�-�ٞ�豟�\]C��$�+,�Egm��f �gP0���O/�_���'M��x�7�2�@�]��C�C��2�=�-zq��C���}S�r�e�e���@;LM����ky�t��@K�mX�m',p7ĦP�)s��3FO����Z�jfO��$�z@g�!�38tk��4��{E)w��]��Ex�F98~E~d�e��gsϳt7��/"΍���8b�zw �������gW G�`A/���#V�����^��jǺ[yvĪZ�������t�Yr?+��0?�g�Cf�b��nLDȬ8��� k�t���50M�>��Pl!ذ�
�}�Y��4K#�H��B{V�P�5��~�D_=��c��AV���8��f��O��#�Xf��1^J�7>��z >��U�������st�X��a��/�4�����fm�Ҷm`��V|/'�^����G"��ŗU�s��)^m������ר�ʬ��x�LwΘ��"���e�[�i�}������p\�G��H�G�8���]gl!(�,�#~G�Sv*2xX��}}�hE{5=�Z�V��û��3i��9�\T���x6�'Ѓ0d��G�Ɩ�k1��5$���]��X��5Z�����K#C�3@f��vG�a��j?��u2zT�z������^��%`xD�~#��8������M�cS�N���;BɲkL����|�l�F���&*�봦�3�̷��Ca��p�vRvߐǥI�g�y�ն��ۦ���<dh��:�zs[�G.�����Ul(![žԋ���.���x����8̴<c ��#*Qz/�t�3,��Q_����D��ޚ�.�n�������#�`�n��$x�'��@?�g"�� ,�`i�x�*]�$����/ t  
�`3��3G�g ~}C?chLxϞz����wމ_!�\�CA]/��f�v	2�k *(ـ���S�W#ӽ���,_��7Ih���M��<�j�ܾ�z��w[U���æmǮ�=J[��� quӉ�m%���xK��l8��MjQR��x�"�O3�M����e�� �{��ݮ��nA�	�����	Yn������	�A�b�+�{�����I�l�k�L3�FR��R4A'���!E�5��d7���-M�q6u{�Yo�v�"	�c�rp�IoQ�ձ(����e�-͌�g�v�{�o��5q^��x8���0L�	x�6^��Q'��D��G!��3	��Ճ�������S��A�o�D��_�R�e���+λݾ@��=�9�f�� ����c�8�X��\�
<���5Ih��r`Xf��W�DW��P�(�1~��uI�ߢ�l���&��$����<o�c�,�w��{Յi��N������M�C㩺P�����v�;&9���ٝP��Dh���4����EY T5���b��"5tg8k9K���p86R/RA=�3Z�x���i��絾B��Y���0u$��]��}��������ݘC�e��޷@צ�/ �oz�}��!6��k6�|���s<T� ������,���t���l�ojE��hQɰ4��Χ_G���Q@i6���l�B��.�,�Y!Qy/��A7؃A'Ġ��44�&�����H��3��mu�$��1��|%I�%�{p�H�]��m�:�����`,�,�ʴ6Ha36$
(��i��'�^��s���{�hB�e�~<����ɞ����@�Q��al��W(<�rKc�����-M�ff��A�zh[!�C������:gȵ�1�k:0в�,�)(��G4�]��X՝>���u�4�qз�8I.��J_-��"߉�@?��F"Q́��(J�0��a�5^���0m��ڙ(���bnD	�#ʼ߫_m��z�UC\�N~8 X�Kl�I̩�b�(��k�7�Cx�ȋ����ۂ���1�IE�π˷��"l�c��^M���:�A.R?��b�ԕx�]8�װq;�����ވ2�Qw�g����d���[��A�c(�(O�2_��r��$$��	$�q4�������xB��4o'$�خ9����u�N�8@o���x�?+����m��O1<��$����@��ؑͽ�S%w���SQ%L����Mņ����	�m�۳X`CLm���
>{�&�r�;���ރ�͹��+������YZ��#�`�%I����Z'd�(��ٖm�/N�� �*)���&��3�Z���c���l����Q��Q�,��I�=/�ƵG�pҮ8��P,L�>�|l��1=�@��	���}�'[(�0��@1e&iP�:��f+�n��g����r����:��&B��6��ި�����V�6j�9��27Ū"��Ϫ���T�
W�%�BE��l�Y���4�D�Ma��zf/S���T���
�ޜ}K��/�`;�8�aIUtQb��5��Oe%R�8�$U�����y�Nx(e�3������fR�mg5�l��M,q{�PL�?.��cQ�VS���ۡ��I t_`*o��#׍�h���-�os���?,!� f4V�k���k�:�ou}i�t}R�Ǵ�V���y��|����v�F��#^�����."Pm�`� Yj�6x�1�q\;��a�=U[����cv�,�\9�yDf=Ǳ.c��d��(\���A��X���-5�dUSŷj�v���y|-d���ܱk���u=䃃F�9���{��榯�A�~�F^���@��۾oN��/��}���; �      =   �  x��W�r�H<S_ѷ��(�(�1������G�gc/{i�- �i ����f|iLy����$�]]TfeW�ꟓ��z뺽����ڬ�q�?�y���6}�)��S�;]��[3��������Vou�+�{U;W�N�S�@l�w�\���������[۫����v���6�h]o<bu_������qب�s�$Gn� g��øQuM�r��j7�U+����z]9O����������V�΃`���:��W��B�(��R�(��8 f�8"���8#Ή

�'�0�0�0�0�0�0���(��)Bʈ�������������b�8�'�'�g���0%!%%x�������������.\}������(�Q��`z�3�ò�љa8-nP�7/�\�l]�[���c�=^��(�u��cc:�q>b����#���Q���Gڃ�����Wj�]5�#��}�N�L�֍>�e)�,\#ոΨʔ���7��ɟ�(�%b��2:U�� ���鍚z��M-Xi����(/2g��U�w����q�}Pi��8V�ӌҜ��2�,�,�,�,�l�(�RAy@9SRB�U V�����T>��1$cd�$DJFNFRFVFZF^΄��CjFnFrFvFz��9�r��˅���W �@\��q�
��+W����Y�zV���+]+�=
Ǚn��a�_����c�.ԓ^�zYXz�8�{��|�¹��,�[XQ�R�-$�N��}�yQK��yD�D�̇�[Y޻a���|�4a��:N�4��}T��g�N�x!=���2� t���k�_&��V������Q��_iW �:Ɋu��RZ<��s������ٖ��m�*�����{dj���q��l�-2�����7^4���k���O^q|.�3T}�=�"����J'>��=�"
r�h������[�J���i��:~;ܐ�y����M ��1˃����D�am�����y<W����D���z�x�����@?�[�8^E��,pL��� M���;����[�+�����m�����o���������S_��s��m��ݺ�N)[ա���-������x��4�t۹�~�e_��������@�3�>�����=��3U�	�.��ǋcCި���uV�:.�h�����B{!�P^o�Ow��Nr�q4y��W������"Uâ�f���u��,G�z[��s�2�].����_���h#�����'@�m�\��� 
�(j�ԣT�r�uOҍzb�<J7�}���J\9#��<w�s���ϯ�_���\|ڨ�/mi�P�k.ݘe�$O�Q�J�)d=�e�HYyL6��Hv��qx�pZoN�3�7�}sJ��lQ�A�%���jNz%�#&{���Z�ehOC��u�Q�����%pb�j[���b���6�s���%�:�Hń�/���s�[����b^��׌
�O��IV�yQք<�~~��U��%��9�L�v�����@� ]O��ԧ�Y�آ����5&��q�֜�=f��_U�<��3,�9�`0��C 9�0̫��Ĉ�+&^L̘�1�1��P��`���a���a���a�Όa�8_�8�3�=c�3�Ac84�Ecx4�Ic�4�� "F���V���f���v�����q���gc�6�kc�6N������������      @   �   x��oK�@ �׿���M=�� IG��h�A.=7�S�S�����<�
*����]BX���^����y��j/Fh�EGSʹ
��g��O��t��EC:�P���4�|�b���{.~6�v*<�g�骔��aoC��qs���'2���$Iҗ�`t��B����y���0;T L�	���^[w>�mI���Y`IiZW&L�*�Ecu�_~@��`C^&	i;�֖�3	��zVP� ���UP�      B      x������ � �     