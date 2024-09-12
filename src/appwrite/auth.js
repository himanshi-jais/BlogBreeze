import { config } from "../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(config.appwrite);
    this.client.setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        console.log("account is created and now login", userAccount);
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    console.log(email, password);
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("appwrite login error", error);
      throw new Error("Failed to log in. Please check your credentials.");
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;
