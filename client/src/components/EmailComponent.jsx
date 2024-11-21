import React, { useState } from "react";
import axios from "axios";

const EmailComponent = () => {
  const [emailData, setEmailData] = useState({
    from: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/send-email",
        emailData
      );
      alert(response.data.message || "Emails sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send emails.");
    }
  };

  return (
    <div className="p-8 mt-10 max-w-lg mx-auto bg-gray-100 border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Send Email</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          From:
        </label>
        <input
          type="email"
          name="from"
          value={emailData.from}
          onChange={handleChange}
          placeholder="Your email address"
          className="w-full border border-gray-400 p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject:
        </label>
        <input
          type="text"
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
          placeholder="Email subject"
          className="w-full border border-gray-400 p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message:
        </label>
        <textarea
          name="message"
          value={emailData.message}
          onChange={handleChange}
          placeholder="Write your message here"
          rows="6"
          className="w-full border border-gray-400 p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSend}
        className="w-full bg-blue-500 text-white font-medium py-2 hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default EmailComponent;
