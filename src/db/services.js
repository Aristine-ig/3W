import { getCollection } from './config.js';

// User operations
export const userService = {
  async createUser(userData) {
    const collection = await getCollection('users');
    const result = await collection.insertOne(userData);
    return result;
  },

  async findUserById(id) {
    const collection = await getCollection('users');
    return await collection.findOne({ _id: id });
  },

  async findUserByEmail(email) {
    const collection = await getCollection('users');
    return await collection.findOne({ email });
  },

  async updateUser(id, updateData) {
    const collection = await getCollection('users');
    const result = await collection.updateOne(
      { _id: id },
      { $set: updateData }
    );
    return result;
  },

  async deleteUser(id) {
    const collection = await getCollection('users');
    const result = await collection.deleteOne({ _id: id });
    return result;
  },

  async getAllUsers() {
    const collection = await getCollection('users');
    return await collection.find({}).toArray();
  }
};

// Generic CRUD operations for any collection
export const genericService = {
  async create(collectionName, data) {
    const collection = await getCollection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  },

  async findById(collectionName, id) {
    const collection = await getCollection(collectionName);
    return await collection.findOne({ _id: id });
  },

  async find(collectionName, query = {}) {
    const collection = await getCollection(collectionName);
    return await collection.find(query).toArray();
  },

  async update(collectionName, id, updateData) {
    const collection = await getCollection(collectionName);
    const result = await collection.updateOne(
      { _id: id },
      { $set: updateData }
    );
    return result;
  },

  async delete(collectionName, id) {
    const collection = await getCollection(collectionName);
    const result = await collection.deleteOne({ _id: id });
    return result;
  },

  async count(collectionName, query = {}) {
    const collection = await getCollection(collectionName);
    return await collection.countDocuments(query);
  }
};