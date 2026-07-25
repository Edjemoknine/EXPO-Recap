import auth from "../../../../firebase/auth";
import firestore from "../../../../firebase/firestore";
import { COLLECTIONS } from "../constants/firestore";
import type { Message } from "../types/chat.types";

import { conversationService } from "./conversation.service";

class MessageService {
  private conversationsCollection = firestore().collection(
    COLLECTIONS.CONVERSATIONS,
  );

  private getMessagesCollection(conversationId: string) {
    return this.conversationsCollection
      .doc(conversationId)
      .collection(COLLECTIONS.MESSAGES);
  }

  async sendMessage(conversationId: string, text: string) {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }

    if (!text.trim()) {
      throw new Error("Message cannot be empty.");
    }

    const messagesCollection = this.getMessagesCollection(conversationId);

    await messagesCollection.add({
      senderId: currentUser.uid,

      text: text.trim(),

      createdAt: firestore.FieldValue.serverTimestamp(),

      seen: false,
    });

    await conversationService.updateLastMessage(conversationId, text.trim());
  }

  listenToMessages(
    conversationId: string,
    callback: (messages: Message[]) => void,
  ) {
    return this.getMessagesCollection(conversationId)
      .orderBy("createdAt", "desc")
      .limit(30)
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        callback(messages);
      });
  }

  async loadMoreMessages(conversationId: string, lastMessageTimestamp: any) {
    const snapshot = await this.getMessagesCollection(conversationId)
      .orderBy("createdAt", "desc")
      .startAfter(lastMessageTimestamp)
      .limit(30)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
  }

  async markAsSeen(conversationId: string, messageId: string) {
    await this.getMessagesCollection(conversationId).doc(messageId).update({
      seen: true,
    });
  }
}

export const messageService = new MessageService();
