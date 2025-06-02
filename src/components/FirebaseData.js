import React, { useRef } from "react";
import {firestore} from "../firebase";
import { addDoc,collection } from "@firebase/firestore"

export default function FirebaseData() {
    const messageRef = useRef();
    const ref = collection(firestore, "messages");

    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

    let data = {
        message: messageRef.current.value,
        timestamp: new Date(),
    };


      try {
         await addDoc(ref, data);
             console.log("✔️ Bericht opgeslagen");
        }    catch (e) {
             console.error("❌ Fout bij opslaan:", e);
        }



    };




    
    return (
        <div>{/*}
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="text" ref={messageRef} />
                <button type="submit">Save</button>
            </form>
            */}
        </div>
    );
}