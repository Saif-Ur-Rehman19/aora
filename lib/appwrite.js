import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

const client = new Client();

export const appwriteConfig = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "669d1f88001e02090877",
  database: "669d21120012375e7049",
  userCollectionId: "669d2198002aae52c12b",
  videoCollectionId: "669d21df002bc786cc96",
  storageId: "669d24c1003241bb3f66",
};

client
  .setEndpoint(appwriteConfig.endPoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)
    if (!newAccount) throw Error
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password)
    const newUser = await databases.createDocument(
        appwriteConfig.database,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )
    return newUser
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
};

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser =  async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error
        const currentUser = await databases.listDocuments(
            appwriteConfig.database,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error.message)
    }
}