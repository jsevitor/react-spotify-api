import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ArtistaRelacionados() {
    const params = useParams();

    const CLIENT_ID = "c59afece5f844090b1a30cc9f2d44bf2";
    const CLIENT_SECRET = "a1ca663f36d84a33a2fc243e55152b7c";

    const [artistRelated, setArtistRelated] = useState({});

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
        async function fetchDataArtistRelated() {
            let token = await getToken();
            let artistId = params?.id;

            if (artistId) {
                const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;


                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setArtistRelated(data);
                console.log(data);
            }
        }

        fetchDataArtistRelated();
    }, [params]);


    return (
        <div className="ArtistaRelacionados p-4 bg-opGray rounded-2xl">
            {Object.keys(artistRelated).length > 0 && (
                <div className="relacionado mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-opGray rounded-2xl box-border">
                    {artistRelated.artists.map((relatedArtist, index) => (
                        <div key={index} className="flex flex-row  p-2 bg-lineGray rounded-md">
                            <a href={'/artista/' + relatedArtist.id} className="grid grid-cols-3 items-center gap-2 w-full">
                                <div className="flex items-center ">
                                    {relatedArtist.images.length > 0 && (
                                        <img
                                            src={relatedArtist.images[0].url}
                                            alt={relatedArtist.name}
                                            className="w-14 h-14 rounded-md object-cover"
                                        />
                                    )}
                                </div>
                                <span className="col-span-2">{relatedArtist.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );

}    