import React, { useState } from 'react';

import Menu from "../../components/Menu";
import Footer from '../../components/Footer';

export default function Contato() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione aqui a lógica para enviar o formulário (por exemplo, fazer uma solicitação para um servidor ou exibir uma mensagem de sucesso).
        // Por enquanto, apenas marcamos como enviado para este exemplo.
        setEnviado(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-slate-50 text-white">
            <Menu />
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-2xl mb-6">Entre em Contato</h1>
                {enviado ? (
                    <p className="text-spotify">Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="w-96 flex flex-col justify-center">
                        <div className="mb-4">
                            <label htmlFor="nome" className="block text-gray">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                required
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mensagem" className="block text-gray">Mensagem:</label>
                            <textarea
                                id="mensagem"
                                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                rows="4"
                                required
                                value={mensagem}
                                onChange={(e) => setMensagem(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-spotify text-white p-2  rounded"
                        >
                            Enviar Mensagem
                        </button>
                    </form>
                )}
                
            </div>
            <Footer />
        </div>
    );
};

