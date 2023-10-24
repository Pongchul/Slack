import React, { useCallback } from "react";
import { Container, Header } from "@pages/Channel/styles";
import ChatList from "@components/ChatList";
import chat from "@components/Chat";
import useInput from "@hooks/useInput";
import ChatBox from "@components/ChatBox";

const Channel = () => {
  const [chat, onChangeChat] = useInput("");
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Header> channel !</Header>
      {/*<ChatList*/}
      {/*  chatSections={chatSections}*/}
      {/*  ref={scrollbarRef}*/}
      {/*  setSize={setSize}*/}
      {/*  isReachingEnd={isReachingEnd}*/}
      {/*/>*/}
      <ChatBox
        chat={chat}
        onSubmitForm={onSubmitForm}
        onChangeChat={onChangeChat}
      />
    </Container>
  );
};

export default Channel;
