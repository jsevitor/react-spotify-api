// Menu.jsx

export default function Menu() {

    return (
        <div className="menu border-b border-b-lineGray py-3 px-6 flex text-lg justify-between drop-shadow-xl">
            <div className="flex gap-8 bold">
                <a href="/">home</a>
                <a href="/contato">contato</a>
            </div>
            <div className="text-md text-spotify font-light uppercase">
                spotify explorer
            </div>
        </div>
    );
}