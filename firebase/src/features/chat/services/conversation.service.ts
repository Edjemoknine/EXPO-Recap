import auth from "../../../../firebase/auth";
import firestore from "../../../../firebase/firestore";
import { COLLECTIONS } from "../constants/firestore";
import type { Conversation } from "../types/chat.types";

class ConversationService {
  private conversationsCollection = firestore().collection(
    COLLECTIONS.CONVERSATIONS,
  );

  async createPrivateConversation(otherUserId: string) {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }

    const currentUserId = currentUser.uid;

    if (currentUserId === otherUserId) {
      throw new Error("You cannot create a conversation with yourself.");
    }

    /*
      We store members sorted alphabetically.

      Example:

      [
        "abc",
        "xyz"
      ]

      This allows us to find the same conversation
      between two users.
    */
    const members = [currentUserId, otherUserId].sort();

    const existingConversation = await this.conversationsCollection
      .where("members", "==", members)
      .limit(1)
      .get();

    if (!existingConversation.empty) {
      return existingConversation.docs[0].id;
    }

    const conversationRef = this.conversationsCollection.doc();

    await conversationRef.set({
      members,

      type: "private",

      lastMessage: null,

      lastMessageAt: null,

      createdAt: firestore.FieldValue.serverTimestamp(),

      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    return conversationRef.id;
  }

  getUserConversations(callback: (conversations: Conversation[]) => void) {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }

    return this.conversationsCollection
      .where("members", "array-contains", currentUser.uid)
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const conversations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Conversation[];

        callback(conversations);
      });
  }

  async getConversation(conversationId: string) {
    const snapshot = await this.conversationsCollection
      .doc(conversationId)
      .get();

    if (!snapshot.exists) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Conversation;
  }

  async updateLastMessage(conversationId: string, message: string) {
    await this.conversationsCollection.doc(conversationId).update({
      lastMessage: message,

      lastMessageAt: firestore.FieldValue.serverTimestamp(),

      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  }
}

export const conversationService = new ConversationService();
