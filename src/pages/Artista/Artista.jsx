import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import ArtistaTopTracks from "./ArtistaTopTracks";
import ArtistaAlbuns from "./ArtistaAlbuns";
import ArtistaRelacionados from "./ArtistaRelacionados";

export default function Artista() {
    const params = useParams();

    const CLIENT_ID = "c59afece5f844090b1a30cc9f2d44bf2";
    const CLIENT_SECRET = "a1ca663f36d84a33a2fc243e55152b7c";

    const [artistDetail, setArtistDetail] = useState({});
    const [artistAlbums, setArtistAlbums] = useState({});
    const [activeTab, setActiveTab] = useState("populares");

    async function getToken() {
        const data = {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        };

        let qsData = [];
        for (let i in data) {
            qsData.push(`${i}=${data[i]}`);
        }
        qsData = qsData.join('&');

        try {
            const resp = await fetch('https://accounts.spotify.com/api/token', {
                method: "POST",
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                body: qsData
            });

            const token = await resp.json();
            return token.access_token;
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        async function fetchDataArtist() {
            let token = await getToken();
            let artistId = params?.id;

            if (artistId) {
                const url = `https://api.spotify.com/v1/artists/${artistId}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setArtistDetail(data);
                console.log(data);
            }
        }

        async function fetchDataAlbums() {
            let token = await getToken();
            let artistId = params?.id;

            if (artistId) {
                const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setArtistAlbums(data);
                console.log(data);
            }
        }

        fetchDataArtist();
        fetchDataAlbums();
    }, [params]);


    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Menu />

            {/* {TOPO - INFORMAÇÕE DO ARTISTA} */}
            <div className="my-8 sm:mx-12 md:mx-36">
                {Object.keys(artistDetail).length > 0 && (
                    <div
                        key={artistDetail.id}
                        className="flex flex-col sm:flex-row"
                    >
                        <div className="flex justify-center w-screen sm:w-96 sm:mr-4 sm:justify-start">
                            {artistDetail.images.length >= 2 && (
                                <img
                                    src={artistDetail.images[1].url}
                                    alt={artistDetail.name}
                                    className="object-cover w-full sm:w-72 sm:rounded-xl"
                                />
                            )}
                        </div>

                        <div className="grid grid-flow-col-dense w-full bg-opGray px-8 rounded-xl">
                            <div className="flex flex-col py-6 w-full border border-white">
                                <div className="flex flex-row gap-8 items-center mb-2">
                                    <span className="sm:text-4xl xl:text-6xl font-semibold">{artistDetail.name}</span>
                                    <span className="flex justify-center items-center bg-spotify w-12 h-12 text-3xl rounded-md p-1">{artistDetail.popularity}</span>
                                </div>
                                <span className="text-sm mb-4 text-gray">{(artistDetail.followers.total).toLocaleString()} ouvintes</span>
                                <span className="text-gray">{artistDetail.genres.join(',  ')}</span>
                                <div className="flex-grow"></div>
                                <span className="mt-4">
                                    <a href={artistDetail.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-spotify font-medium"
                                    >
                                        Abrir no Spotify
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="sm:mx-12 md:mx-36">

                {/* SUB MENU */}
                <div className="submenu flex flex-row gap-4">
                    <div
                        className={`bg-opGray flex justify-center rounded-2xl py-1 px-3 mb-4 cursor-pointer ${activeTab === "populares" ? "bg-lineGray" : ""
                            }`}
                        onClick={() => setActiveTab("populares")}
                    >
                        <h1 className="text-base">Populares</h1>
                    </div>

                    <div
                        className={`bg-opGray flex justify-center rounded-2xl py-1 px-3 mb-4 cursor-pointer ${activeTab === "albuns" ? "bg-lineGray" : ""
                            }`}
                        onClick={() => setActiveTab("albuns")}
                    >
                        <h1 className="text-base">Albuns</h1>
                    </div>

                    <div
                        className={`bg-opGray flex justify-center rounded-2xl py-1 px-3 mb-4 cursor-pointer ${activeTab === "relacionados" ? "bg-lineGray" : ""
                            }`}
                        onClick={() => setActiveTab("relacionados")}
                    >
                        <h1 className="text-base">Relacionados</h1>
                    </div>
                </div>

                {/* EXIBIÇÃO TOP TRACKS e EXIBIÇÃO DOS ALBUNS */}
                {activeTab === "populares" && <ArtistaTopTracks />}
                {activeTab === "albuns" && <ArtistaAlbuns />}
                {activeTab === "relacionados" && <ArtistaRelacionados /> }
            </div>
            <Footer />
        </div>
    );

}    