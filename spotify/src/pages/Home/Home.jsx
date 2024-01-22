// ...
import React, { useState } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";


export default function Home() {
    const CLIENT_ID = "c59afece5f844090b1a30cc9f2d44bf2";
    const CLIENT_SECRET = "a1ca663f36d84a33a2fc243e55152b7c";

    const [showResults, setShowResults] = useState(false);
    const [artist, setArtist] = useState("");  // Alteração aqui
    const [artists, setArtists] = useState([]);

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

    const fetchData = async () => {
        try {
            let token = await getToken();
            let url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                `artist:${artist}`
            )}&type=artist`;

            const resp = await fetch(url, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });

            let data = await resp.json();
            setArtists(data.artists.items);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchClick = () => {
        fetchData();
        setArtist("");
        setShowResults(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-slate-50 text-white">
            <Menu />
            <div className="container mx-auto flex-grow">
                <div className="flex justify-center">
                    <span className="text-3xl pt-9">SPOTIFY EXPLORER</span>
                </div>
                <div className="flex justify-center">
                    <span className="text-sm py-6">Explore o universo musical e busque por seus artistas favoritos</span>
                </div>
                <div className="flex flex-row justify-center py-6 mb-16">
                    <input
                        type="search"
                        name="search"
                        id="searchArtist"
                        value={artist}
                        onChange={(event) => setArtist(event.target.value)}
                        className="p-3 rounded-s-full w-96 text-black pl-6"

                    />
                    <button
                        className="rounded-e-full p-3 bg-spotify"
                        onClick={handleSearchClick}
                    >
                        buscar
                    </button>
                </div>
            </div>
            
            {showResults && (
                <div className="flex flex-wrap justify-center bg-opGray rounded-2xl mb-6 mx-32 box-border p-4 gap-4">
                    {artists.map(item => (
                        <div key={item.id} className="nomeArtista text-center bg-lineGray rounded-lg pb-2 w-48 flex-shrink-0">
                            <a href={'/artista/' + item.id} className="block">
                                {item.images.length > 0 ? (
                                    <img
                                        src={item.images[0].url}
                                        alt={item.name}
                                        className="w-full h-48 object-cover mx-auto mb-2 rounded-t-lg"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray rounded-t-lg mx-auto mb-2"></div>
                                )}
                                <span className="text-base">{item.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );

}
