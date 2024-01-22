// Album.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function Album() {
    const params = useParams();

    const CLIENT_ID = "c59afece5f844090b1a30cc9f2d44bf2";
    const CLIENT_SECRET = "a1ca663f36d84a33a2fc243e55152b7c";

    const [albumDetail, setAlbumDetail] = useState({});

    async function getToken() {
        const data = {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }
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
        async function fetchDataAlbum() {
            let token = await getToken();
            let albumId = params?.id;

            if (albumId) {
                const url = `https://api.spotify.com/v1/albums/${albumId}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setAlbumDetail(data);
                console.log(data);
            }
        }

        fetchDataAlbum();
    }, [params]);

    function getYear(date) {
        if (/\d{4}-\d{2}-\d{2}/.test(date)) {
            const partesData = date.split("-");
            const ano = partesData[0];

            return parseInt(ano, 10);
        } else {
            return null;
        }
    }

    function formatDuration(durationMs) {
        const totalSeconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${minutes}:${formattedSeconds}`;
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Menu />
            <div className="my-8 sm:mx-12 md:mx-32">
                {Object.keys(albumDetail).length > 0 && (
                    <div
                        key={albumDetail.id}
                        className="flex flex-row"
                    >
                        <div className="mr-4">
                            <img src={albumDetail.images?.[1]?.url}
                                alt={`Capa do Álbum ${albumDetail.name}`}
                                className="object-cover"
                            />
                        </div>

                        <div className="grid grid-flow-col-dense w-full bg-opGray px-8 rounded-xl">
                            <div className="flex flex-col py-4 w-full">

                                <div className="flex flex-row gap-8 items-center mb-1">
                                    <span className="text-4xl font-semibold">{albumDetail.name}</span>
                                    <span className="flex justify-center items-center bg-spotify w-12 h-12 text-3xl rounded-md p-1">{albumDetail.popularity}</span>
                                </div>

                                <div className="text-sm mb-5 text-gray">
                                    <span className="text-sm mb-3 text-gray"> {albumDetail.artists?.[0]?.name}</span>
                                    <span> ({getYear(albumDetail.release_date)})</span>
                                </div>

                                <span className="text-gray text-sm mb-2 font-light">{albumDetail.total_tracks} faixas</span>
                                <span className="text-gray text-sm font-light">{albumDetail.label}</span>


                                <span className="mt-5 flex justify-between">
                                    <a href={albumDetail.external_urls.spotify}
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

            <div className="sm:mx-12 md:mx-32 bg-opGray rounded-2xl p-4 px-6">

                <div className="grid grid-cols-11 text-gray font-bold border-b border-b-lineGray ">
                    <div className="flex justify-center">#</div>
                    <div className="col-span-6">Título da Faixa</div>

                    <div className="">Duração</div>
                    <div className="col-span-3">Amostra</div>
                </div>

                {albumDetail.tracks?.items.map((track, index) => (
                    <div key={index} className="border-b border-b-lineGray py-2 grid grid-cols-11 font-light">
                        <div className="flex items-center justify-center">{track.track_number}</div>
                        <div className="flex items-center col-span-5">{track.name}</div>
                        <div className="flex items-center justify-center">{track.explicit ?
                            <span className="bg-gray text-lineGray px-1 rounded-sm text-sm"> E </span>
                            : ''}
                        </div>
                        <div className="flex items-center pl-3">{formatDuration(track.duration_ms)}</div>
                        <div className="flex items-center col-span-3">
                            {track.preview_url && (
                                <audio controls className="w-full h-8 rounded-full bg-spotify">
                                    <source src={track.preview_url} type="audio/mp3" />
                                    Seu navegador não suporta o elemento de áudio.
                                </audio>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}      
