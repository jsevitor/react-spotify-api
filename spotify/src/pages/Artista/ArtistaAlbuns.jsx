import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ArtistaAlbuns() {
    const params = useParams();

    const CLIENT_ID = "c59afece5f844090b1a30cc9f2d44bf2";
    const CLIENT_SECRET = "a1ca663f36d84a33a2fc243e55152b7c";

    const [artistAlbums, setArtistAlbums] = useState({});

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

        fetchDataAlbums();
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

    return (

        <div className="Album p-4 bg-opGray rounded-2xl">
            {Object.keys(artistAlbums).length > 0 && (
                <div className="nomeAlbum flex flex-wrap bg-opGray rounded-2xl box-border gap-4">
                    {artistAlbums.items
                        .filter(album => album.album_group === 'album')
                        .map((album, index) => (
                            <a key={index} href={`/albums/${album.id}`} className="block">
                                <div className="bg-lineGray rounded-lg pb-2 w-48 flex-shrink-0 overflow-hidden">
                                    {album.images && album.images.length > 0 && (
                                        <img
                                            src={album.images[1].url}
                                            alt={`Capa do Álbum ${album.name}`}
                                            className="object-cover w-full h-48 mb-2"
                                        />
                                    )}
                                    <div className="flex flex-col px-2">
                                        <span className="font-medium text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            {album.name}
                                        </span>
                                        {album.total_tracks && (
                                            <div className="text-xs mt-1  text-gray flex justify-between"> 
                                                <span>{album.total_tracks} faixas</span>
                                                <span>{getYear(album.release_date)}</span>           
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                </div>
            )}
        </div>

    );
}                           