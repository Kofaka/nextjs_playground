// Types
import { Users_users } from 'api/users/types/Users';
// Helpers
import { generateFakeEntities } from 'helpers/misc';

describe('helpers/misc', () => {
  describe('generateFakeEntities', () => {
    it('should return array of objects of provided type with randomised "id"', () => {
      const typename = 'users';
      const rocketName = 'Falcon';
      const fakeEntities = generateFakeEntities<Users_users>(
        { __typename: typename, rocket: rocketName } as Users_users,
        [],
        5
      );

      fakeEntities.forEach((entity) => {
        const { __typename, rocket, id } = entity;
        expect(Object.keys(entity)).toContain('__typename');
        expect(Object.keys(entity)).toContain('rocket');
        expect(Object.keys(entity)).toContain('id');
        expect(__typename).toBe(typename);
        expect(rocket).toBe(rocketName);
        expect(id.length).toBeGreaterThanOrEqual(5);
      });
    });

    it('should return array of objects with generated fields from additionalPropNames property', () => {
      const additionalField = 'name';
      const fakeEntities = generateFakeEntities<Users_users>(
        { __typename: 'users' } as Users_users,
        [additionalField],
        5
      );

      fakeEntities.forEach(({ name }) => {
        expect(name).toContain(`${additionalField}_`);
        expect((name as string).length).toBeGreaterThanOrEqual(
          `${additionalField}_`.length + 6
        );
      });
    });
  });
});
