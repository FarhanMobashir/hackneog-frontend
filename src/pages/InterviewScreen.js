import styled from "styled-components";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiPhoneMissed,
} from "react-icons/fi";
import { neutral, red } from "../utils";
import { useEffect, useState } from "react";
import CodeMirror from "codemirror";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import "codemirror/mode/javascript/javascript.js";
import "../codemirror.style.css";

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
  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("yjs-demo", ydoc);

    const yText = ydoc.getText("codemirror");
    const editorContainer = document.querySelector("#editor");

    const editor = CodeMirror(editorContainer, {
      mode: "javascript",
      lineNumbers: true,
      // theme: "dracula",
    });

    const binding = new CodemirrorBinding(yText, editor, provider.awareness);
  }, []);
  const [playingVideo, setPlayingVideo] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(true);
  function StreamVideo() {
    var video = document.querySelector(".video");
    video.muted = true;

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(function (mediaStream) {
        let video = document.querySelector(".video");
        video.srcObject = mediaStream;
        if (!playingVideo) {
          mediaStream.getTracks().forEach((i) => {
            if (i.kind === "video") {
              i.stop();
            }
          });
        }

        video.onLoadedMetadata = function (e) {
          video.play();
        };
      });
  }

  useEffect(() => {
    StreamVideo();
  }, [playingVideo, playingAudio]);

  return (
    <MainContainer>
      <TopContainer>
        <EditorArea id="editor"></EditorArea>
        <SideBar>
          <VideoElement className="video" autoPlay={true} />
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
