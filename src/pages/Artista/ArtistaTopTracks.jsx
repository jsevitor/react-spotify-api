import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ArtistaTopTracks() {
    const params = useParams();

    const CLIENT_ID = "c59afece5f844090b1a30cc9f2d44bf2";
    const CLIENT_SECRET = "a1ca663f36d84a33a2fc243e55152b7c";

    const [artistTopTacks, setArtistTopTacks] = useState({});

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

        async function fetchDataTopTracks(country = "US") {
            let token = await getToken();
            let artistId = params?.id;

            if (artistId) {
                const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`;


                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setArtistTopTacks(data);
                console.log(data);
            }
        }

        fetchDataTopTracks("BR");
    }, [params]);

    function formatDuration(durationMs) {
        const totalSeconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${minutes}:${formattedSeconds}`;
    }


    return (

        <div className="p-4 bg-opGray rounded-2xl">
            {artistTopTacks.tracks && artistTopTacks.tracks.length > 0 && (
                <div className="mx-6  bg-opGray rounded-2xl">

                    {artistTopTacks.tracks.map((track, index) => (
                        <div key={index} className="py-2 grid grid-cols-12 font-light">
                            <div className="flex items-center justify-center">{index + 1}</div>
                            <div className="flex items-center justify-center">
                                {track.album && track.album.images && track.album.images.length > 0 && (
                                    <img
                                        src={track.album.images[0].url} 
                                        alt={`Capa do álbum - ${track.name}`}
                                        className="w-10 h-full rounded-md object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex items-center col-span-3">{track.name}</div>
                            <div className="flex items-center col-span-2">{track.album.name}</div>
                            <div className="flex items-center justify-center">{track.explicit ?
                                <span className="bg-gray text-lineGray px-1 rounded-sm text-sm"> E </span>
                                : ''}
                            </div>
                            <div className="flex items-center pl-3">{formatDuration(track.duration_ms)}</div>
                            <div className="flex items-center col-span-3">
                                {track.preview_url && (
                                    <audio controls className="w-full h-8 rounded-full bg-opGray cursor-pointer">
                                        <source src={track.preview_url} type="audio/mp3" />
                                        Seu navegador não suporta o elemento de áudio.
                                    </audio>
                                )}
                            </div>                            
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}                           