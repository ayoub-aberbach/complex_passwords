import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { LuClipboardCopy } from "react-icons/lu";
import { sharePw, writeClipboardText } from "./utils/funcs";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


function App() {

    const [result, setPassword] = useState("");

    const buffer = new ArrayBuffer(64);
    const rand_numbers = new BigUint64Array(buffer, 8, 4);

    self.crypto.getRandomValues(rand_numbers);

    const symbs = "#¥@_%&$?";
    const numbers = "9735640281";
    const alpha_lower = "abcdefghijklmnopqrstuvwxyz";
    const alpha_upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let combineRand = "";

    const generate = () => {
        const rand_final = rand_numbers[Math.floor(Math.random() * 4)].toString(36);
        let mix_all =
            alpha_lower.slice(Math.floor(Math.random() * 26)).toString()
            + symbs.slice(Math.floor(Math.random() * 8)).toString()
            + numbers.slice(Math.floor(Math.random() * 10)).toString()
            + alpha_upper.slice(Math.floor(Math.random() * 26)).toString();

        for (let index = 0; index < 24; index++) {
            combineRand += mix_all[parseInt(rand_final[index % rand_final.length], 36) % mix_all.length]
        }

        setPassword(combineRand);
    }

    return (
        <>
            <div id="box">
                <div className="container">
                    <div className="result-container">
                        <input
                            readOnly
                            type="text"
                            id="result"
                            placeholder="PASSWORD" value={result}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button
                            title="copy"
                            className="copy-result"
                            onClick={() => writeClipboardText(result)}
                            style={{ display: result !== "" ? "flex" : "none" }}
                        >
                            <LuClipboardCopy size={25} color="#000" />
                        </button>
                    </div>
                    <button
                        className="share-result"
                        onClick={() => sharePw(result)}
                        hidden={result !== "" ? false : true}
                    >SHARE</button>
                    <button
                        type="button"
                        id="generate"
                        className="generate-btn"
                        onClick={generate}
                    >GENERATE</button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                pauseOnHover={false}
                closeButton={false}
            />
        </>
    )
}

export default App
