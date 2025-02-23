type User = {
    id: number;
    name: string;
    type: 'user';
  };
  
  type Admin = {
    id: number;
    name: string;
    type: 'admin';
    permissions: string[];
  };
  
  type Person = User | Admin;
  
  type FilterCriteria<T> = Partial<Omit<T, 'type'>>;
  
  function filterPersons<T extends 'user' | 'admin'>(
    persons: Person[],
    personType: T,
    criteria: FilterCriteria<T extends 'user' ? User : Admin>
  ): (T extends 'user' ? User[] : Admin[]) {
    return persons.filter(
      (person): person is T extends 'user' ? User : Admin =>
        person.type === personType &&
        Object.entries(criteria).every(([key, value]) =>
          person[key as keyof typeof criteria] === value
        )
    ) as T extends 'user' ? User[] : Admin[];
  }
  
  // Example usage:
  const persons: Person[] = [
    { id: 1, name: 'Alice', type: 'user' },
    { id: 2, name: 'Bob', type: 'admin', permissions: ['read', 'write'] },
    { id: 3, name: 'Charlie', type: 'user' },
  ];
  
  const users = filterPersons(persons, 'user', { name: 'Alice' }); // User[]
  const admins = filterPersons(persons, 'admin', { permissions: ['read', 'write'] }); // Admin[]
  