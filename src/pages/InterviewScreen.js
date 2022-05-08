import styled from "styled-components";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiPhoneMissed,
} from "react-icons/fi";
import { neutral, red } from "../utils";
import { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import "codemirror/mode/javascript/javascript.js";
import "../codemirror.style.css";
// peerjs
import Peer from "peerjs";
// socket
import { io } from "socket.io-client";
import { TextField } from "../components/TextField";
import { BasicButton } from "../components/Buttons";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TopContainer = styled.div`
  display: flex;
  height: 85vh;
`;
const EditorArea = styled.div`
  flex-basis: 70%;
  height: 100%;
`;
const SideBar = styled.div`
  flex-basis: 30%;
`;

const ActionBar = styled.div`
  margin-top: auto;
  padding: 2rem;
  height: 15vh;
  display: flex;
  justify-content: space-evenly;
`;

const IconContainer = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50px;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  /* &:hover {
    background-color: ${neutral[300]};
  } */
`;

const VideoElement = styled.video`
  border: 1px solid black;
  padding: 1rem;
  background-color: black;
  width: 100%;
  height: 200px;
`;

export const InterviewPage = () => {
  const [socket, setSocket] = useState(null);
  const remoteVideoRef = useRef();
  const currentUserVideoRef = useRef();
  const peerInstance = useRef(null);
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");

  // helpers
  const call = (remotePeerId) => {
    let userMedia = navigator.mediaDevices.getUserMedia;

    userMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.muted = true;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  useEffect(() => {
    let peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      let userMedia = navigator.mediaDevices.getUserMedia;

      userMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    peerInstance.current = peer;

    // -----------------
    const newSocket = io("http://localhost:8080", {
      path: "/interviews",
    });
    setSocket(newSocket);
    peer.on("open", (id) => console.log(id));
    return () => newSocket.close();
  }, [setSocket]);

  if (socket) {
    socket.on("connect", () => console.log("hello"));
  }

  // collborative editing
  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("yjs-demo", ydoc, { maxConns: 2 });

    const yText = ydoc.getText("codemirror");
    const editorContainer = document.querySelector("#editor");

    const editor = CodeMirror(editorContainer, {
      mode: "javascript",
      lineNumbers: true,
      theme: "dracula",
    });

    const binding = new CodemirrorBinding(yText, editor, provider.awareness);
  }, []);
  const [playingVideo, setPlayingVideo] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(true);
  // function StreamVideo() {
  //   var video = document.querySelector(".video");
  //   video.muted = true;

  //   navigator.mediaDevices
  //     .getUserMedia({
  //       audio: true,
  //       video: true,
  //     })
  //     .then(function (mediaStream) {
  //       let video = document.querySelector(".video");
  //       video.srcObject = mediaStream;
  //       if (!playingVideo) {
  //         mediaStream.getTracks().forEach((i) => {
  //           if (i.kind === "video") {
  //             i.stop();
  //           }
  //         });
  //       }

  //       video.onLoadedMetadata = function (e) {
  //         video.play();
  //       };
  //     });
  // }

  // useEffect(() => {
  //   StreamVideo();
  // }, [playingVideo, playingAudio]);

  return (
    <MainContainer>
      <TopContainer>
        <EditorArea id="editor"></EditorArea>
        <SideBar>
          <VideoElement
            ref={currentUserVideoRef}
            // className="video"
            autoPlay={true}
          />
          <VideoElement ref={remoteVideoRef} autoPlay={true} />
          <TextField
            type="text"
            label="Remote peerid"
            value={remotePeerId}
            placeholder="Enter peerId here"
            onChange={(e) => setRemotePeerId(e.target.value)}
          />
          <BasicButton onClick={() => call(remotePeerId)}>Call</BasicButton>
        </SideBar>
      </TopContainer>
      <ActionBar>
        <IconContainer
          onClick={() => {
            setPlayingAudio(!playingAudio);
          }}
        >
          {playingAudio && <FiMic size={24} />}
          {!playingAudio && <FiMicOff size={24} />}
        </IconContainer>
        <IconContainer
          onClick={() => {
            setPlayingVideo(!playingVideo);
          }}
        >
          {playingVideo && <FiVideo size={24} />}
          {!playingVideo && <FiVideoOff size={24} />}
        </IconContainer>
        <IconContainer bgColor={red[300]}>
          <FiPhoneMissed size={24} color={neutral[100]} />
        </IconContainer>
      </ActionBar>
    </MainContainer>
  );
};
