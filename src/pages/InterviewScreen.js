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

import { TextField } from "../components/TextField";
import { BasicButton } from "../components/Buttons";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../contexts/ApiContext";
import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { QuestionCard } from "../components/QuestionCard";
import { BasicDialogue } from "../components/BasicDialogue";

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
  width: 75vw;
  height: 100%;
  border-radius: 10px;
`;
const SideBar = styled.div`
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
  padding: 10px 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
`;

const VideoElement = styled.video`
  padding: 1rem;
  background-color: ${neutral[500]};
  border-radius: 10px;
  width: 150px;
  height: 150px;
`;

// list questions
const QuestionContainer = styled.div`
  height: 200px;
  overflow: auto;
  padding: 0px 10px;
`;

export const InterviewPage = () => {
  const remoteVideoRef = useRef();
  const currentUserVideoRef = useRef();
  const peerInstance = useRef(null);
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [playingVideo, setPlayingVideo] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  // copy modal
  const [showModal, setShowModal] = useState(true);

  const { interviewId } = useParams();
  const { isAuthenticated } = useAuth();
  const { usegetSingleInterview } = useApi();
  const { loading, data } = usegetSingleInterview(interviewId);
  const { state: globalState } = useData();
  const singleInterview = globalState.singleInterview;

  // helpers
  const inviteText = `Link : ${window.location}
          --------------------------
          Call-Id : ${peerId}
          `;
  const call = (remotePeerId) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.muted = true;

        var call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.load();
        });
      })
      .catch((err) => console.log(err));
  };

  const recieveCall = async () => {
    let peer = new Peer();
    peer.on("open", (id) => {
      console.log(id);
      setPeerId(id);
    });
    peer.on("call", (recieveCall) => {
      let userMedia = navigator.mediaDevices.getUserMedia;

      userMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.muted = true;

          currentUserVideoRef.current.load();
          recieveCall.answer(mediaStream);
          recieveCall.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.load();
          });
        })
        .catch((err) => console.log(err));
    });
    peerInstance.current = peer;
  };

  useEffect(() => {
    let stream = currentUserVideoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      if (!playingVideo) {
        tracks.forEach((track) => {
          if (track.kind === "video") {
            track.enabled = false;
          }
        });
      }
      if (playingVideo) {
        tracks.forEach((track) => {
          if (track.kind === "video") {
            track.enabled = true;
          }
        });
      }
      if (!playingAudio) {
        tracks.forEach((track) => {
          if (track.kind === "audio") {
            track.enabled = false;
          }
        });
      }
      if (playingAudio) {
        tracks.forEach((track) => {
          if (track.kind === "audio") {
            track.enabled = true;
          }
        });
      }
      if (!playingVideo && !playingAudio) {
        tracks.forEach((track) => {
          track.enabled = false;
        });
      }
      if (playingVideo && playingAudio) {
        tracks.forEach((track) => {
          track.enabled = true;
        });
      }
    }
  }, [playingVideo, playingAudio]);

  useEffect(() => {
    recieveCall();
    // // -----------------
    // const newSocket = io("http://localhost:8080", {
    //   path: "/interviews",
    // });
    // setSocket(newSocket);
    // peer.on("open", (id) => console.log(id));
    // return () => newSocket.close();
  }, []);

  // collborative editing
  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(interviewId, ydoc, {
      maxConns: Math.floor(Math.random() * 1),
    });

    const yText = ydoc.getText("codemirror");
    const editorContainer = document.querySelector("#editor");

    const editor = CodeMirror(editorContainer, {
      mode: "javascript",
      lineNumbers: true,
      theme: "dracula",
    });

    const binding = new CodemirrorBinding(yText, editor, provider.awareness);
  }, []);

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
      {showModal && (
        <BasicDialogue
          title="Invite Now"
          buttonText="Copy"
          onCopy={() => navigator.clipboard.writeText(inviteText)}
          onClose={() => setShowModal(false)}
          inviteText={inviteText}
        />
      )}
      <TopContainer>
        <EditorArea id="editor"></EditorArea>
        <SideBar>
          <VideoElement ref={currentUserVideoRef} autoPlay={true} />
          <VideoElement ref={remoteVideoRef} autoPlay={true} />
          {!showQuestions && (
            <>
              <TextField
                type="text"
                label="Remote peerid"
                value={remotePeerId}
                placeholder="Enter peerId here"
                onChange={(e) => setRemotePeerId(e.target.value)}
              />
              <ButtonContainer>
                <BasicButton onClick={() => call(remotePeerId)}>
                  Call
                </BasicButton>
                <BasicButton onClick={() => setShowModal(true)}>
                  Invite
                </BasicButton>
              </ButtonContainer>
            </>
          )}
          {isAuthenticated() && !showQuestions && (
            <BasicButton onClick={() => setShowQuestions(true)}>
              See Questions
            </BasicButton>
          )}
          {isAuthenticated() && showQuestions && (
            <BasicButton onClick={() => setShowQuestions(false)}>
              Close
            </BasicButton>
          )}
          {isAuthenticated() && showQuestions && (
            <QuestionContainer>
              {singleInterview.questions.map((item) => {
                return (
                  <QuestionCard
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                  />
                );
              })}
            </QuestionContainer>
          )}
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
