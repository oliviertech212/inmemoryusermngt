import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, CreateUserRequest, UpdateUserRequest } from '../types';

const users = new Map<string, User>();

export async function createUser(userData: CreateUserRequest): Promise<User> {
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const now = new Date();
  
  const user: User = {
    id,
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now
  };
  
  users.set(id, user);
  return user;
}

export function getUserById(id: string): User | undefined {
  return users.get(id);
}

export function getUserByEmail(email: string): User | undefined {
  return Array.from(users.values()).find(user => user.email === email);
}

export function getAllUsers(): User[] {
  return Array.from(users.values());
}

export async function updateUser(id: string, updateData: UpdateUserRequest): Promise<User | null> {
  const user = users.get(id);
  if (!user) return null;

  const updatedUser: User = {
    ...user,
    ...updateData,
    updatedAt: new Date()
  };

  if (updateData.password) {
    updatedUser.password = await bcrypt.hash(updateData.password, 10);
  }

  users.set(id, updatedUser);
  return updatedUser;
}

export function deleteUser(id: string): boolean {
  return users.delete(id);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
} 