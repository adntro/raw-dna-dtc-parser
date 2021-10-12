"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBuildForSnp = exports.chrposB38 = exports.chrposB37 = void 0;
const queryResult = `rsid	chrpos_37	ref_37	alt_37	chrpos_38	ref_38	alt_38
rs112427713	1:144897876	C	T	1:148986598	G	A
rs34341576	1:144901955	G	A	1:148982519	C	T
rs34169189	1:144906508	C	T	1:148977966	G	A
rs147189460	1:144913946	G	A	1:148970529	C	T
rs200286606	1:144920933	T	G	1:148963542	A	C
rs72701825	1:145093015	A	G	1:120179911	T	C
rs28689061	1:145093893	G	A	1:120179033	C	T
rs12086156	1:145383239	C	T	1:146051762	G	A
rs73004658	1:145409855	A	C	1:146025150	T	G
rs139203552	1:145422252	C	T	1:146012754	G	A
rs72701860	1:145427921	A	G	1:146007108	T	C
rs6661602	1:145428296	C	T	1:146006739	A	G
rs72701863	1:145434148	G	T	1:146000906	C	A
rs4636400	1:145444556	T	G	1:145990515	A	C
rs111540919	1:145472788	T	C	1:145962300	A	G
rs114420369	1:145481434	A	G	1:145953652	T	C
rs11580710	1:145489716	T	G	1:145945371	A	C
rs3754341	1:145515791	G	A	1:145919298	C	T
rs12082225	1:145526777	C	A	1:145908300	G	T
rs74119688	1:145530254	C	T	1:145904824	A	G
rs2274616	1:145536082	G	A	1:145898994	C	T
rs77450491	1:145543709	C	T	1:145891367	G	A
rs117723896	1:145550795	T	C	1:145884281	A	G
rs58074368	1:145554120	G	A	1:145880956	C	T
rs6424379	1:145555653	C	T	1:145879427	A	G
rs56110740	1:145556986	C	T	1:145878094	G	A
rs6670984	1:145561594	C	T	1:145873487	G	A
rs112908941	1:145579864	C	T	1:145855204	G	A
rs11587821	1:145599038	G	T	1:145836072	C	A
rs12405132	1:145644984	C	T	1:145790097	G	A
rs76215597	1:145676673	C	T	1:145758390	G	A
rs72704267	1:145717179	T	C	1:145717887	A	G
rs10910845	1:145723120	A	C	1:145711946	T	G
rs1471633	1:145723739	A	C	1:145711327	T	G
rs12129861	1:145725689	G	A	1:145709377	C	T
rs900347	1:145726727	A	G	1:145708339	C	T
rs1797052	1:145727683	C	T	1:145707383	A	G
rs73084140	1:206191088	C	A	1:206150242	G	T
rs28527399	1:206199132	A	G	1:206142198	T	C
rs28536160	1:206223383	T	C	1:206117948	A	G
rs34518453	1:206225582	G	A	1:206115749	C	T
rs28517473	1:206233134	G	A	1:206108197	C	T
rs28405931	1:206233975	T	G	1:206107356	A	C
rs28694304	1:206239993	C	A	1:206101338	G	T
rs28689766	1:206243870	G	T	1:206097461	A	C
rs28735054	1:206256359	G	A	1:206084973	C	T
rs77833004	1:206278727	C	T	1:206062644	G	A
rs28420347	1:206281191	T	C	1:206060180	A	G
rs76039482	1:206305229	C	T	1:206036139	G	A
rs74145068	1:206306450	A	C	1:206034918	T	G
rs28619955	1:206315933	A	G	1:206025435	T	C
rs58493320	1:206319815	C	T	1:206021553	G	A
rs28410805	1:206326498	A	G	1:206014870	T	C
rs11901495	2:98017804	G	A	2:97355895	C	T
rs35230930	2:98021047	G	A	2:97352652	C	T
rs9308891	2:98023948	G	A	2:97349751	C	T
rs4711122	6:26758479	C	T	6:26743406	G	A
rs139316539	6:61931053	G	T	6:61306663	C	A
rs372480975	6:61933144	G	A	6:61304572	C	T
rs4298382	6:61970201	C	T	6:61267513	G	A
rs115275918	6:61972802	T	C	6:61264912	A	G
rs76628809	6:61973244	A	G	6:61264470	T	C
rs111710694	6:61982418	G	A	6:61255296	C	T
rs74821199	6:61984440	T	C	6:61253274	A	G
rs75112246	6:62009419	A	G	6:61228295	T	C
rs75515262	6:62013241	A	G	6:61224473	T	C
rs72874188	6:62016012	C	T	6:61221702	G	A
rs11964578	6:62020137	A	G	6:61217577	T	C
rs6909483	6:62027559	T	C	6:61210155	A	G
rs184056128	6:62030031	G	A	6:61207683	C	T
rs112239543	6:62034627	C	T	6:61203087	G	A
rs116571554	6:62035578	C	A	6:61202136	G	T
rs80069288	6:62035633	C	A	6:61202081	G	T
rs115399609	6:62035644	C	T	6:61202070	G	A
rs115909786	6:62066576	T	C	6:61171138	A	G
rs115406834	6:62071003	T	C	6:61166711	A	G
rs114827120	6:62074418	G	A	6:61163296	C	T
rs117628946	6:62110461	G	A	6:61127253	C	T
rs6605503	6:157610644	A	G	6:157268989	T	C
rs647547	6:169094291	T	C	6:168693876	G	A
rs147024419	7:61546035	A	C	7:61711728	T	G
rs367758149	7:61847023	G	A	7:62250540	C	T
rs118077009	7:61851539	G	A	7:62246024	C	T
rs201660976	7:61876589	T	C	7:62220973	A	G
rs6958838	7:142122115	G	A	7:142509832	T	C
rs150716786	7:142140989	G	T	7:142490958	C	A
rs2011310	7:142152369	T	C	7:142479578	G	A
rs55641081	7:142165537	C	T	7:142466409	G	A
rs186379303	7:142166400	A	C	7:142465555	T	G
rs185854212	7:142166696	T	C	7:142465259	A	G
rs138856323	7:142166768	A	G	7:142465187	C	T
rs2011726	7:142166888	G	A	7:142465064	T	C
rs1882723	7:142177451	T	C	7:142454513	G	A
rs112027705	7:142179299	G	A	7:142452664	C	T
rs4726528	7:142195590	C	T	7:142436374	G	A
rs2040366	7:142196434	C	T	7:142435530	A	G
rs73546368	7:142199986	G	A	7:142431991	T	C
rs143211854	7:142217436	C	T	7:142414520	G	A
rs73544570	7:142218189	C	T	7:142413767	A	G
rs6961143	7:142222364	T	G	7:142409592	A	C
rs17249	7:142231625	C	A	7:142400325	G	T
rs17248	7:142231701	G	T	7:142400249	C	A
rs2734118	7:142237142	C	A	7:142394807	T	G
rs11768398	7:142239119	C	T	7:142392830	G	A
rs17304	7:142245627	A	G	7:142386323	C	T
rs361365	7:142247125	A	G	7:142384825	C	T
rs77712959	7:142257591	G	A	7:142374380	C	T
rs140831943	7:142271573	C	T	7:142360401	G	A
rs2854546	7:142272563	C	T	7:142359410	A	G
rs361489	7:142273037	C	T	7:142358936	G	A
rs2854538	7:142274465	T	C	7:142357508	G	A
rs2854536	7:142274854	G	A	7:142357119	C	T
rs17753936	8:2293622	G	A	8:2374177	C	T
rs936101	8:2295528	G	A	8:2372272	C	T
rs4876153	8:2304334	A	G	8:2363464	T	C
rs142508726	8:2307204	G	A	8:2360593	C	T
rs117776382	8:2307223	T	C	8:2360574	A	G
rs117876680	8:2314171	T	C	8:2353626	A	G
rs6989240	8:2316035	C	T	8:2351762	G	A
rs374866408	8:2318555	T	C	8:2349224	A	G
rs12056559	8:2319304	C	T	8:2348476	A	G
rs17074085	8:2319555	G	A	8:2348227	C	T
rs117796036	9:40757832	A	G	9:66935009	T	C
rs117736747	9:43517692	C	T	9:42296697	G	A
rs145749570	9:43603030	C	T	9:42211359	G	A
rs368278884	9:44164917	C	T	9:42806202	G	A
rs117749889	9:44169618	G	T	9:42801501	C	A
rs187728459	9:44169722	C	A	9:42801397	G	T
rs191466027	9:44169758	C	T	9:42801361	G	A
rs28409257	9:44245182	C	T	9:42725937	G	A
rs187023995	9:66271403	C	T	9:43047162	G	A
rs370891813	9:66298360	C	A	9:43020205	G	T
rs373488162	10:42404009	T	C	10:41836200	A	G
rs76192594	10:42408818	G	A	10:41831391	C	T
rs112228847	10:42413670	C	A	10:41826539	G	T
rs376076513	10:42418514	T	C	10:41821695	A	G
rs35646355	10:42428509	T	C	10:41811700	A	G
rs140844553	10:42428994	G	T	10:41811215	C	A
rs2335059	10:42444782	T	G	10:41795427	A	C
rs12356712	10:42454116	C	T	10:41786093	G	A
rs118100851	10:42462717	T	C	10:41777492	A	G
rs117377045	10:42471449	C	T	10:41768760	G	A
rs146236788	10:42471465	T	C	10:41768744	A	G
rs12246818	10:42478452	A	G	10:41761757	T	C
rs185142703	10:42488045	G	A	10:41752164	C	T
rs77054191	10:42490787	C	T	10:41749422	G	A
rs75876199	10:42493103	C	A	10:41747106	G	T
rs367910413	10:42499971	G	A	10:41740238	C	T
rs116855763	10:42501173	A	G	10:41739036	T	C
rs11266022	10:42503340	C	T	10:41736869	G	A
rs151329055	10:42509279	C	A	10:41730930	G	T
rs9663677	10:42511335	C	T	10:41728874	G	A
rs138228047	10:42516122	C	T	10:41724087	G	A
rs146893395	10:42520277	T	G	10:41719932	A	C
rs28500490	10:46980871	G	T	10:46568746	C	A
rs138909138	10:47098459	C	T	10:46451303	G	A
rs17456541	10:48327516	T	C	10:47411846	A	G
rs11204198	10:48335690	C	T	10:47403672	G	A
rs79120086	10:48339106	C	A	10:47400256	G	T
rs75658021	10:48342670	C	T	10:47396692	G	A
rs1902719	10:48354336	T	C	10:47385026	A	G
rs117504049	10:48357300	G	T	10:47382062	C	A
rs10736370	10:48366054	C	T	10:47373308	G	A
rs72792030	10:48372645	T	C	10:47366717	A	G
rs11204211	10:48373983	C	T	10:47365379	G	A
rs11204212	10:48374332	C	T	10:47365030	G	A
rs11204213	10:48388228	C	T	10:47351134	G	A
rs111245635	10:48389841	C	T	10:47349521	G	A
rs3758495	10:48392343	A	G	10:47347019	T	C
rs12573325	10:48398198	C	T	10:47341164	G	A
rs7100244	10:48403324	C	T	10:47336038	G	A
rs79723481	10:48403781	G	A	10:47335581	C	T
rs4922505	10:48422148	C	T	10:47317214	G	A
rs7078578	10:48427639	A	G	10:47311723	T	C
rs2607874	10:48429860	G	A	10:47309502	C	T
rs2853838	10:48431110	T	G	10:47308252	A	C
rs79047287	10:48434106	G	A	10:47305256	C	T
rs3814161	10:48440744	A	G	10:47298618	T	C
rs17537178	10:48442894	A	G	10:47296468	T	C
rs1993488	10:48445554	G	A	10:47293808	C	T
rs145118120	10:48449917	A	G	10:47289445	T	C
rs78039966	10:48450729	A	G	10:47288633	T	C
rs1902723	10:48457625	G	A	10:47281737	C	T
rs76907427	10:48461026	G	A	10:47278336	C	T
rs12414155	10:48471020	T	C	10:47268342	A	G
rs12763161	10:48471444	A	G	10:47267918	T	C
rs4922496	10:48472191	A	G	10:47267171	T	C
rs7076160	10:48473929	G	T	10:47265433	C	A
rs11204229	10:48477559	T	C	10:47261803	A	G
rs11204232	10:48482465	T	C	10:47256897	A	G
rs9421743	10:48483653	C	T	10:47255709	G	A
rs4581387	10:48488594	T	C	10:47250768	A	G
rs72794236	10:48489065	G	A	10:47250297	C	T
rs9421750	10:48501475	G	A	10:47237887	C	T
rs4598610	10:48511877	G	T	10:47227485	C	A
rs75402388	10:48513419	G	A	10:47225943	C	T
rs72796178	10:48516583	A	G	10:47222779	T	C
rs7901713	10:48516636	C	T	10:47222726	G	A
rs72796200	10:48528502	T	C	10:47210860	A	G
rs57621454	10:48529682	T	C	10:47209680	A	G
rs72798012	10:48534385	C	T	10:47204977	G	A
rs114655086	10:48537702	C	T	10:47201660	G	A
rs7073120	10:48540468	C	T	10:47198894	G	A
rs10888195	10:48541475	T	C	10:47197887	A	G
rs4922535	10:48548449	A	G	10:47190913	T	C
rs11204264	10:48548987	G	A	10:47190375	C	T
rs4922532	10:48550139	A	G	10:47189223	T	C
rs76386056	10:48554303	G	T	10:47185059	C	A
rs79503565	10:48560846	T	C	10:47178516	A	G
rs72790355	10:48567245	C	A	10:47172117	G	T
rs4256917	10:48574132	C	A	10:47165230	G	T
rs11204273	10:48574660	G	T	10:47164702	C	A
rs11204279	10:48586280	G	A	10:47153082	C	T
rs72790382	10:48591872	G	A	10:47147490	C	T
rs61843451	10:48602195	G	A	10:47137167	C	T
rs148317333	10:48605605	C	T	10:47133757	G	A
rs9422352	10:48607823	T	C	10:47131539	A	G
rs786822	10:48646137	A	G	10:47093225	T	C
rs9422357	10:48650196	A	G	10:47089166	T	C
rs9422331	10:48653495	C	T	10:47085867	G	A
rs9422360	10:48655350	T	C	10:47084012	A	G
rs61140254	10:48656710	C	T	10:47082652	G	A
rs74922941	10:51520713	T	C	10:46075109	A	G
rs12572164	10:51521832	T	G	10:46073990	A	C
rs3123078	10:51524971	C	T	10:46070851	G	A
rs10763588	10:51539762	G	T	10:46056060	C	A
rs11006346	10:51542120	C	T	10:46053702	G	A
rs4631830	10:51543344	T	C	10:46052478	A	G
rs73318166	10:51544788	C	T	10:46051034	G	A
rs61847070	10:51548455	T	C	10:46047367	A	G
rs10993994	10:51549496	T	C	10:46046326	A	G
rs41274660	10:51549533	T	G	10:46046289	A	C
rs75772076	10:51555410	T	C	10:46040412	A	G
rs2072701	10:51556449	A	G	10:46039373	T	C
rs75933669	10:51563351	G	T	10:46032471	C	A
rs10994675	10:51563993	G	A	10:46031829	C	T
rs10761581	10:51568378	T	G	10:46027444	A	C
rs10740051	10:51570152	G	A	10:46025670	C	T
rs7085433	10:51593354	G	A	10:46002468	C	T
rs72921323	11:51206077	G	A	11:54913203	C	T
rs80232023	11:51213856	T	C	11:54905424	A	G
rs74818507	11:51222799	C	T	11:54896481	G	A
rs11513091	11:51245641	G	T	11:54873639	C	A
rs143719211	11:51248937	T	C	11:54870343	A	G
rs141857191	11:51251442	C	T	11:54867838	G	A
rs11601998	11:51266005	G	T	11:54853275	C	A
rs139477495	11:51268147	G	A	11:54851133	C	T
rs79825925	11:51314744	T	C	11:54804536	A	G
rs75754870	11:51322586	G	A	11:54796694	C	T
rs77901623	11:51337386	C	A	11:54781894	G	T
rs77466934	11:51338705	G	A	11:54780575	C	T
rs117628949	11:51390879	G	A	11:54728401	C	T
rs11246539	11:51393718	T	G	11:54725562	A	C
rs1939285	11:51403303	C	T	11:54715977	G	A
rs117174386	11:51411314	C	A	11:54707966	G	T
rs12798438	11:51418315	C	A	11:54700965	G	T
rs187341941	11:51419375	C	A	11:54699905	G	T
rs112560442	11:51430422	A	G	11:54688858	T	C
rs192424769	11:51435848	C	A	11:54683432	G	T
rs117974501	11:51446991	G	A	11:54672289	C	T
rs138121772	11:51456891	A	G	11:54662389	T	C
rs75139856	11:51500792	C	A	11:54618488	G	T
rs117136151	11:51506169	A	G	11:54613111	T	C
rs11246602	11:51512090	T	C	11:54607190	A	G
rs117970168	11:51512665	T	C	11:54606615	A	G
rs4581427	11:51513852	C	T	11:54605428	G	A
rs7944067	11:51525878	G	T	11:54593402	C	A
rs138838960	11:51525891	A	G	11:54593389	T	C
rs185464281	11:51527710	C	A	11:54591570	G	T
rs72910555	11:51551402	C	T	11:54567878	G	A
rs371396824	11:51581487	G	A	11:54537793	C	T
rs76775226	12:80849279	T	C	12:80460898	A	G
rs12809610	12:80850440	A	C	12:80459737	T	G
rs4489813	12:80853265	T	C	12:80456912	A	G
rs117029569	12:80854003	A	G	12:80456174	T	C
rs28707380	15:22759530	C	A	15:23113538	G	T
rs60437105	15:22766047	C	A	15:23107021	G	T
rs8034562	15:22766739	C	A	15:23106329	G	T
rs11858222	15:22777299	T	G	15:23095769	A	C
rs56336241	15:22777815	T	G	15:23095253	A	C
rs113349525	15:22781807	C	T	15:23091261	G	A
rs118105005	15:22788922	C	T	15:23084146	G	A
rs117008634	15:22794494	T	C	15:23078574	A	G
rs113247210	15:22801026	G	A	15:23072042	C	T
rs141147864	15:22821254	C	T	15:23051814	G	A
rs192440577	15:22834164	C	T	15:23038904	G	A
rs8029154	15:22835646	G	A	15:23037422	C	T
rs118000124	15:22839023	A	G	15:23034045	T	C
rs117228714	15:22842384	G	A	15:23030684	C	T
rs118137061	15:22846932	G	A	15:23026136	C	T
rs113186155	15:22858519	G	A	15:23014549	C	T
rs116995654	15:22858763	T	C	15:23014305	A	G
rs111426813	15:22860803	C	T	15:23012265	G	A
rs2305092	15:22868668	C	T	15:23004400	G	A
rs112478374	15:22884612	C	T	15:22988456	G	A
rs11632180	15:22908279	G	A	15:22964789	C	T
rs12898301	15:22922449	G	A	15:22950619	C	T
rs11634023	15:22927167	G	A	15:22945901	C	T
rs113670727	15:22930476	G	A	15:22942592	C	T
rs117462861	15:22932388	C	A	15:22940680	G	T
rs113810963	15:22946729	A	G	15:22926339	T	C
rs118166208	15:22947430	G	A	15:22925638	C	T
rs12594495	15:22948004	A	G	15:22925064	T	C
rs36080947	15:22955211	C	T	15:22917857	G	A
rs4134803	15:22958104	A	G	15:22914964	T	C
rs2289819	15:22960938	C	T	15:22912130	G	A
rs142727980	15:22963869	A	G	15:22909199	T	C
rs7174982	15:22965658	C	T	15:22907410	G	A
rs62008564	15:22980776	C	T	15:22892292	G	A
rs117523881	15:22980815	A	G	15:22892253	T	C
rs143927273	15:22983497	G	A	15:22889571	C	T
rs8043191	15:22984844	C	A	15:22888224	G	T
rs151336917	15:22991156	G	A	15:22881912	C	T
rs149042952	15:22993121	C	T	15:22879947	G	A
rs1529794	15:22999839	G	A	15:22873229	C	T
rs3693	15:23004893	A	C	15:22868175	T	G
rs73418447	15:23007049	G	A	15:22866019	C	T
rs146746388	15:23010217	A	G	15:22862851	T	C
rs117124202	15:23011848	C	T	15:22861220	G	A
rs7168000	15:23013126	T	G	15:22859942	A	C
rs55897540	15:23017342	C	T	15:22855726	G	A
rs76957122	15:23024744	C	T	15:22848324	G	A
rs60371576	15:23031066	C	T	15:22842002	G	A
rs4778334	15:23040856	T	C	15:22832212	A	G
rs73412681	15:23043498	A	C	15:22829570	T	G
rs3812923 15:23045127	G	A	15:22827941	C	T
rs11263683	15:23052632	T	C	15:22820436	A	G
rs34681710	15:23053873	C	T	15:22819195	G	A
rs117281506	15:23059653	C	A	15:22813415	G	T
rs11636690	15:23060281	A	G	15:22812787	T	C
rs74003090	15:23060998	G	A	15:22812070	C	T
rs7168367	15:23066736	C	T	15:22806332	G	A
rs72699912	15:23067698	A	C	15:22805370	T	G
rs7174119	15:23078384	A	G	15:22794684	T	C
rs117460072	15:23081204	C	T	15:22791864	G	A
rs12903395	15:23082237	C	T	15:22790831	G	A
rs117946938	15:23083677	G	T	15:22789391	C	A
rs11263687	15:23084443	T	G	15:22788625	A	C
rs10152278	15:23086929	G	A	15:22786139	C	T
rs149860676	15:23105656	T	C	15:22767454	A	G
rs8033142	15:23140114	C	T	15:22732985	A	G
rs61465625	15:23164749	A	G	15:22708347	T	C
rs117899283	15:23165833	C	A	15:22707263	G	T
rs145797772	15:23186179	C	A	15:22686917	G	T
rs150605118	15:23217346	T	C	15:22655750	A	G
rs3883043	15:23226254	A	G	15:22646842	T	C
rs79985182	17:21545562	C	A	17:22061002	G	T
rs76666605	21:10966579	C	T	21:10545878	G	A
rs189691017	22:16486963	A	G	22:15491000	T	C
rs187463635	22:16495458	G	A	22:15482505	C	T
rs117578132	22:16595552	C	A	22:15382411	G	T
rs5905476	X:45550312	G	A	X:45689408	C	T
rs524400	X:149575352	A	G	X:150413019	C	T
rs2471786	X:151908475	C	T	X:152728527	A	G
rs57142488	X:152464882	G	A	X:153200504	C	T
rs10856250	X:152493171	G	A	X:153172231	C	T
rs1894345	X:152513783	A	G	X:153151616	C	T
rs5925344	X:152515126	C	T	X:153150273	A	G`;
const queryResultJson = queryResult
    .split('\n')
    .filter((_, i) => i > 0) // skit header
    .map(line => {
    const [rsid, chrpos_37, ref_37, alt_37, chrpos_38, ref_38, alt_38] = line.split('\t');
    return { rsid, chrpos_37, ref_37, alt_37, chrpos_38, ref_38, alt_38 };
});
exports.chrposB37 = queryResultJson
    .map(({ rsid, chrpos_37, ref_37, alt_37 }) => ({
    rsid,
    chrpos: chrpos_37,
    ref: ref_37,
    alt: alt_37,
}))
    .reduce((ac, i) => ({ ...ac, [i.chrpos]: i }), {});
exports.chrposB38 = queryResultJson
    .map(({ rsid, chrpos_38, ref_38, alt_38 }) => ({
    rsid,
    chrpos: chrpos_38,
    ref: ref_38,
    alt: alt_38,
}))
    .reduce((ac, i) => ({ ...ac, [i.chrpos]: i }), {});
function checkBuildForSnp(snp) {
    if (!snp || snp.nocall)
        return undefined;
    const chrpos = snp.chr + ':' + snp.position;
    if (exports.chrposB37[chrpos] &&
        (exports.chrposB37[chrpos].ref === snp.a1 || exports.chrposB37[chrpos].alt === snp.a1)) {
        return 'b37';
    }
    else if (exports.chrposB38[chrpos] &&
        (exports.chrposB38[chrpos].ref === snp.a1 || exports.chrposB38[chrpos].alt === snp.a1)) {
        return 'b38';
    }
    else {
        return undefined;
    }
}
exports.checkBuildForSnp = checkBuildForSnp;
//# sourceMappingURL=genome-build.js.map