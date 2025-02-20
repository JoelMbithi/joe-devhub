import { Inngest } from "inngest";
import connectDB from "./Db";
import User from "@/models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" }, // Function ID
  { event: "clerk/user.created" }, // Trigger event
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address, // Corrected email field
      name: `${first_name} ${last_name}`, // Fixed string concatenation
      image_url: image_url,
    };

    await connectDB(); // Connect to MongoDB
    await User.create(userData); // Create user in the database
    console.log(`User created: ${id}`);
  }
);

// Inngest Function to update user data in the database
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" }, // Function ID
  { event: "clerk/user.updated" }, // Trigger event
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address, // Corrected email field
      name: `${first_name} ${last_name}`, // Fixed string concatenation
      image_url: image_url,
    };

    await connectDB(); // Connect to MongoDB
    await User.findByIdAndUpdate(id, userData); // Update user in the database
    console.log(`User updated: ${id}`);
  }
);

// Inngest Function to delete user from the database
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" }, // Function ID
  { event: "clerk/user.deleted" }, // Trigger event
  async ({ event }) => {
    const { id } = event.data;

    await connectDB(); // Connect to MongoDB
    await User.findByIdAndDelete(id); // Delete user from the database
    console.log(`User deleted: ${id}`);
  }
);