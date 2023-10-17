import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import RoomList from "./RoomList";

import { Amplify, Storage } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
Storage.configure({ level: "public" });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<RoomList />} />
        <Route path={"/:chatRoomId/:chatRoomName"} element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
