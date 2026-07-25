import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
  uid: string;
  email: string;

  displayName: string;

  photoURL: string | null;

  bio: string;

  createdAt: FirebaseFirestoreTypes.Timestamp;

  updatedAt: FirebaseFirestoreTypes.Timestamp;
}

export interface Conversation {
  id: string;
  members: string[];
  lastMessage?: string;
  lastMessageAt?: FirebaseFirestoreTypes.Timestamp;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  seen: boolean;
}
