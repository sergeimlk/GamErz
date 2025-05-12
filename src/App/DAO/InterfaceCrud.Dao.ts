import mongoose, { Model } from "mongoose";

export default interface InterfaceCrudDao<T> {
  model: Model<T>;

  findAll(): Promise<Array<T>>;
  findById(id: mongoose.Types.ObjectId): Promise<T | null>;
  update(id: string, dataUpdated: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}