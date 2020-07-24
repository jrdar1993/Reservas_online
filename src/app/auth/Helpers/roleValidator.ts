import { User } from '../../shared/models/user.interface';

export class RoleValidator {
  isCliente(user: User): boolean {
    return user.role === 'CLIENTE';
  }

  isEditor(user: User): boolean {
    return user.role === 'EDITOR';
  }

  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }
}