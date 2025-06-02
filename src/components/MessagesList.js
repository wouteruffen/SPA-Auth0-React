import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(firestore, "messages"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean-up als component wordt verwijderd
  }, []);

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h3>📬 Opgeslagen berichten</h3>
      {loading && <p>Even laden...</p>}
      {!loading && messages.length === 0 && <p>Geen berichten gevonden.</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {messages.map((msg) => (
          <li key={msg.id} style={{ marginBottom: "10px" }}>
            📝 {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
