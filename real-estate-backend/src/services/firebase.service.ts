import admin, { ServiceAccount } from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

// Firebase Admin Service Account
const serviceAccount: ServiceAccount = {
  projectId: "b2b-vendor-76300",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSleU2aA61es4K\n50jJzEeQdoA489ErUk3MeBe/HceUT2jwRlBwIQH1c2zPdrWEKZrZT/90H/Jb33oV\nKZ0hd96LoY0uuhw1uYg3gxD9xBjJVrUnMzPCwqL6qBky9hfmR4qz0fJlnvrXPd7Q\nVE98xHvomwu7iiJ8qLrWBSodNRmhSGk5OZvm3nGBuZrWV2JIvUTySif0IfONQdI+\npo0pYyil8wWxXv8QXqstAyFpyNl6rXHMUBhKs2sOQCIqtsphlh3mvoHQYXCRPmLE\nDtsYYWQmAHp/1hCYYvALkRyVzdlxZt1wC8aVQZFEmR43JQ9ZdYAs9I8AqWR6Z0pc\nuTwUrci7AgMBAAECggEAAseJs/MhppGNYKV213sDwstdm+LT8u9uKXG4VoRtGu8F\nYo57B0/YN8YjPIXDlY/7BD1DEORPDZlggiD/eu6bGFq0g1ZfgvIE8z6encrVzOqB\nD5hkaYCqKAbJ9ls7K4XsNb1ipqa3htnBNBy4w9vQCtzpBbuoAt8zQBnnWWVXBkLp\nRar5IY3olev5xPPs7PTkB/NjiFP55yg5j8db6yIwUikwdVUfP+RSRRYSkbNtEox2\nbIojnZLW63oeT/kI7JMPP3MgVnzsZq5GpDAjdNFOl8b98wVCB4ZTQfDAih5dPjSS\nRDBTUtuvHWLd8VcALIBMjH+2l9V0AsTC6XEsKzBZwQKBgQDz5A2tNBcvbTM4TGwf\nx0bRXJpmEnAAKOO7RTaXNbKFYzWhrg2GLM2B5QF1Gn8/kkImQA3DvdwZ9wJB/Hla\najh9gbdm3HdVdy1jVkmw9jNCj7yLPj2OVU3owTcT9Smm4UPD9ehuzHZ/EmEnc7cD\nor7OsJ5ezVA6isshunEtW12sYQKBgQDdCoTHLi3po+V6PHgrdMqBipysXF2JGu7k\n9QWBytEO4mdhfavcnwhh+9hXcCPJRJktEGI/U5ZbWwD4t8F2l8cJ5j+yANvu023U\n+Fd4kwI1ZBN6pZEYX/sMifqYNA4KvJXKO4RDmusKxsr0oWl0VTR1d4YbBqVFGRxm\nuVdELz6qmwKBgQDl5fYia7TjRut+SUOu3Pjbh5AfYYfkDqdEsySXes2SQQegJWKo\nNPlvVUB/c3+5nBPw3HZdKk4cx6OAMg7udKxVWn5YXr+6d4H4XrFON3Xwa2+OThhW\nYAD1w5Q4ouQlY7iuMtJsBx44AEpGlyRQMAvu57wRnzXeSVDbtVTULYjqYQKBgQCE\nkQ9rCcYdbt9s/SExJt1g7cnjEY5DcTS/ejfwTLwvChfof194dKSpZ0qrviSoTAz1\n2vKhejcd2SlvAX306zhDNqUS07MTvBgN91c2iCx16uxHzU6E6ON+9K2nZOjbBZls\nbV940EuQ7gLAzqGZVJSesq1qPgUWuOWwsg2lZhRWawKBgGRV1zEk+HT0S2GLFARx\nlTK+PhCGBmY78/DRboTuJpHfVrkrvpwwC3iEwUmfvXt4XyBOpOgXQMeOIfxmZVIg\nPzp91S5C8vL9nz92tuEna5mHRulzISq3SV7yMCBNqYw+De1ctYi8JSyl+dFpOYge\nTIa65DCc9RZJE5hS8qldKUvp\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-xqew3@b2b-vendor-76300.iam.gserviceaccount.com",
};


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'b2b-vendor-76300.appspot.com', // Replace with your Firebase storage bucket
});

// Get reference to the bucket
const bucket = getStorage().bucket();

/**
 * Upload File to Firebase
 * @param filePath Path for storing the file in Firebase storage
 * @param fileBuffer Buffer of the file to be uploaded
 * @returns Public URL of the uploaded file
 */
export const uploadFile = async (filePath: string, fileBuffer: Buffer): Promise<string> => {
  const file = bucket.file(filePath);
  await file.save(fileBuffer, { contentType: 'application/octet-stream' });
  await file.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
};


/**
 * Delete File from Firebase
 * @param filePath Path of the file to delete in Firebase storage
 */
export const deleteImage = async (fileUrl: string): Promise<void> => {
  try {
    const fileName = fileUrl.split('/').pop(); // Extract the file name
    const filePath = `listings/${fileName}`;
    const file = bucket.file(filePath);
    // Check if the file exists
    const [exists] = await file.exists();
    if (!exists) {
      console.warn(`File not found: ${filePath}`); // Log a warning for missing files
      return;
    }
    // Delete the file if it exists
    await file.delete();
    console.log(`Deleted file: ${filePath}`);
  } catch (error: any) {
    console.error(`Error deleting file: ${error.message}`);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};

