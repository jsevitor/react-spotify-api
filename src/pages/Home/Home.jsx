import React, { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronLeft } from 'react-feather';
import anime from 'animejs';
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
export default function Home() {
    const CLIENT_ID = "c59afece5f844090b1a30cc9f2d44bf2";
    const CLIENT_SECRET = "a1ca663f36d84a33a2fc243e55152b7c";

    const [showResults, setShowResults] = useState(false);
    const [artist, setArtist] = useState("");
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const animateTitle = () => {
            var textWrapper = document.querySelector('.ml6 .letters');
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            anime.timeline({ loop: false, complete: showTitle })
                .add({
                    targets: '.ml6 .letter',
                    translateY: ["1.1em", 0],
                    translateZ: 0,
                    duration: 750,
                    delay: (el, i) => 50 * i
                });
        };

        const showTitle = () => {
            var titleElement = document.querySelector('.ml6');
            titleElement.style.opacity = '1';
        };

        animateTitle();
    }, []);

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

    const fetchData = async (url) => {
        try {
            setLoading(true);
            let token = await getToken();
            const resp = await fetch(url, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            let data = await resp.json();
            setArtists(data.artists.items);
            setNextPage(data.artists.next);
            setPrevPage(data.artists.previous);

            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    const handleSearchClick = () => {
        setShowResults(false);
        fetchData(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`artist:${artist}`)}&type=artist`);
        setArtist("");
        setTimeout(() => {
            setShowResults(true);
        }, 700);
    };

    const handleNextClick = () => {
        if (nextPage) {
            setShowResults(false);
            setLoading(true);
            setCurrentPage((prevPage) => prevPage + 1);
            fetchData(nextPage);
            setTimeout(() => {
                setShowResults(true);
            }, 300);
        }
    };


    const handlePrevClick = () => {
        if (prevPage) {
            setShowResults(false);
            setLoading(true);
            setCurrentPage((prevPage) => prevPage - 1);
            fetchData(prevPage);
            setTimeout(() => {
                setShowResults(true);
            }, 300);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-slate-50 text-white">
            <Menu />
            <div className="container mx-auto flex-grow">
                <div className="ml6 flex justify-center">
                    <span className="text-wrapper">
                        <span className="letters pt-20">SPOTIFY EXPLORER</span>
                    </span>
                </div>
                <div className="flex justify-center">
                    <span className="subTituloHome pb-6">Explore o universo musical e busque por seus artistas favoritos</span>
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
                        className="rounded-e-full py-3 px-5 bg-spotify"
                        onClick={handleSearchClick}
                    >
                        <Search />
                    </button>
                </div>

                {/* CARREGAMENTO */}
                <div className="spinner" style={{ display: loading ? "block" : "none" }}>
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>

            {/* EXIBE RESULTADO DA BUSCA */}
            {showResults && (
                // <div className="nomeArtista flex flex-wrap justify-center bg-opGray rounded-2xl mb-6 mx-44 box-border p-4 gap-4"> /*}
                <div className="nomeArtista mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-opGray rounded-2xl mb-6 p-4">
                    {artists.map(item => (
                        <div key={item.id} className="text-center bg-lineGray rounded-lg pb-2 w-48 flex-shrink-0">
                            <a href={'/artista/' + item.id} className="block">
                                {item.images.length > 0 ? (
                                    <img
                                        src={item.images[0].url}
                                        alt={item.name}
                                        className="w-full h-48 object-cover mx-auto mb-2 rounded-t-lg"
                                    />
                                ) : (
                                    <img
                                        src="https://sun9-6.userapi.com/impg/RaXltn7bx5SPpoKyGdWyEpbbG5Qor3ve6SZDEw/ePQ2yrtXFe8.jpg?size=600x600&quality=96&proxy=1&sign=a23fc60917c9c040d4e8f6e4af659edf&type=album"
                                        alt={item.name}
                                        className="w-full h-48 object-cover mx-auto mb-2 rounded-t-lg"
                                    />


                                )}
                                <span className="text-base">{item.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {/* Botões Next e Previous */}
            {showResults && (
                <div className="maisArtistas flex justify-center mx-44 box-border mt-4 items-center">
                    <button onClick={handlePrevClick} disabled={!prevPage} className="bg-opGray  rounded-full w-32 px-2 py-2 bg-gray-800 hover:bg-spotify flex flex-row gap-2" style={{ opacity: prevPage ? 1 : 0.5 }}>
                        <ChevronLeft />
                        <span className="">Previous</span>
                    </button>
                    <span className="w-10 h-10 mx-10 flex justify-center items-center rounded-lg bg-opGray text-lg">{currentPage}</span>
                    <button onClick={handleNextClick} disabled={!nextPage} className="bg-opGray rounded-full w-32 pr-2 pl-6 py-2 bg-gray-800 hover:bg-spotify flex flex-row justify-between gap-2" style={{ opacity: nextPage ? 1 : 0.5 }}>
                        <span className="">Next</span>
                        <ChevronRight />
                    </button>
                </div>
            )}

            <Footer />
        </div>
    );
}
