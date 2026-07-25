import auth from "../../../../firebase/auth";
import firestore from "../../../../firebase/firestore";
import { COLLECTIONS } from "../constants/firestore";
import type { User } from "../types/chat.types";

class UserService {
  private usersCollection = firestore().collection(COLLECTIONS.USERS);

  async createProfile() {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }

    const userRef = this.usersCollection.doc(currentUser.uid);

    const snapshot = await userRef.get();

    if (snapshot.exists()) {
      return;
    }

    const now = firestore.FieldValue.serverTimestamp();

    await userRef.set({
      uid: currentUser.uid,
      email: currentUser.email,

      displayName:
        currentUser.displayName ?? currentUser.email?.split("@")[0] ?? "User",

      photoURL: currentUser.photoURL,

      bio: "",

      createdAt: now,

      updatedAt: now,
    });
  }

  async getCurrentUser() {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      return null;
    }

    const snapshot = await this.usersCollection.doc(currentUser.uid).get();

    return snapshot.data() as User;
  }

  async updateProfile(
    data: Partial<Pick<User, "displayName" | "photoURL" | "bio">>,
  ) {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }

    await this.usersCollection.doc(currentUser.uid).update({
      ...data,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
  }

  async getUser(uid: string) {
    const snapshot = await this.usersCollection.doc(uid).get();

    if (!snapshot.exists) {
      return null;
    }

    return snapshot.data() as User;
  }
}

export const userService = new UserService();
