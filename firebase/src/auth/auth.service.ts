// import auth from "@/firebase/auth";

import auth from "../../firebase/auth";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await auth().signInWithEmailAndPassword(email, password);

    return response.user;
  },

  register: async (email: string, password: string) => {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    return response.user;
  },

  logout: async () => {
    await auth().signOut();
  },

  getCurrentUser: () => {
    return auth().currentUser;
  },

  sendPasswordResetEmail: async (email: string) => {
    await auth().sendPasswordResetEmail(email);
  },

  sendEmailVerification: async () => {
    const user = auth().currentUser;

    if (!user) {
      throw new Error("No authenticated user");
    }

    await user.sendEmailVerification();
  },

  reloadUser: async () => {
    const user = auth().currentUser;

    if (!user) {
      return null;
    }

    await user.reload();

    return auth().currentUser;
  },
};
