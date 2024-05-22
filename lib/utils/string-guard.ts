import { createLiteralOptionType } from './string-literal';
import { Role, TRoleEnum } from '../models/user.model';

export function asRoleType(roleType: string): TRoleEnum {
  try {
    const { getValidValue } = createLiteralOptionType(Role);
    return getValidValue(roleType);
  } catch (error) {
    throw new Error('400-RoleType');
  }
}
