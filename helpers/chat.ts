import { database } from './firebase'

type ParticipantObject = {
  participants: {
    [uid: string]: boolean
  }
}

const participantObjectFromUid = (uid: string): ParticipantObject => {
  return {
    participants: {
      [uid]: true,
    },
  }
}

const createChatRoom = async (roomId: string, uid: string): Promise<void> => {
  const chatRoomRef = database.ref(`chat_room/${roomId}`)
  return chatRoomRef.update(participantObjectFromUid(uid))
}

const createMessageRoom = async (roomId: string, uid: string): Promise<void> => {
  const messageRef = database.ref(`message/${roomId}`)
  return messageRef.update(participantObjectFromUid(uid))
}

export const joinChatRoom = async (roomId: string, uid: string): Promise<void> => {
  return createChatRoom(roomId, uid).then(() => {
    return createMessageRoom(roomId, uid)
  })
}
