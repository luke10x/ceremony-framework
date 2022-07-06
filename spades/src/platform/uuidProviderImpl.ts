import UuidProvider from "../framework/uuidProvider";
import { v4 } from 'uuid';

export default class UuidProviderImpl implements UuidProvider {
  createV4(): string {
    return v4()
  }
}