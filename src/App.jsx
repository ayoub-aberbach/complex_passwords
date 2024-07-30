import { useState } from "react";
import { LuClipboardCopy } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


function App() {

    const [result, setPassword] = useState("");

    const buffer = new ArrayBuffer(64);
    const rand_numbers = new BigUint64Array(buffer, 8, 4);

    self.crypto.getRandomValues(rand_numbers);

    const symbs = import.meta.env.VITE_SYMBS;
    const numbers = import.meta.env.VITE_NUMBERS;
    const alpha_lower = import.meta.env.VITE_LOWER;
    const alpha_upper = import.meta.env.VITE_UPPER;

    let combineRand = "";

    const generate = () => {
        const rand_final = rand_numbers[Math.floor(Math.random() * 4)].toString(36);
        let mix_all =
            alpha_lower.slice(Math.floor(Math.random() * 26)).toString()
            + symbs.slice(Math.floor(Math.random() * 6)).toString()
            + alpha_upper.slice(Math.floor(Math.random() * 26)).toString()
            + numbers.slice(Math.floor(Math.random() * 10)).toString();

        for (let index = 1; index < 22; index++) {
            combineRand += mix_all[parseInt(rand_final[index % rand_final.length], 36) % mix_all.length]
        }

        setPassword(combineRand);
    }

    async function writeClipboardText() {
        try {
            if (result !== "") {
                await navigator.clipboard.writeText(result);
                toast.success('COPIED')
            } else toast.error('NOTHING TO COPY')
        } catch (error) {
            console.error(error.message);
        }
    }

    async function sharePw() { await navigator.share({ text: result }) }

    return (
        <div id="box">
            <div className="container">
                <h2>Password Generator</h2>
                <div className="result-container">
                    <input
                        readOnly
                        type="text"
                        id="result"
                        placeholder="PASSWORD"
                        onChange={e => setPassword(e.target.value)} value={result}
                    />
                    <button
                        className="copy-result"
                        onClick={writeClipboardText}
                        style={{ display: result !== "" ? "flex" : "none" }}
                    >
                        <LuClipboardCopy size={25} color="#000" />
                    </button>
                </div>
                <button
                    className="share-result"
                    onClick={sharePw}
                    hidden={result !== "" ? false : true}
                >SHARE</button>
                <button
                    type="button"
                    id="generate"
                    className="generate-btn"
                    onClick={generate}
                >GENERATE</button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                pauseOnHover={false}
                closeButton={false}
            />
        </div>
    )
}

export default App