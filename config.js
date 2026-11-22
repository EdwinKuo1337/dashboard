export const dashboardConfig = {
  filters: [
    {
      id: 'bird',
      label: 'Bird',
      options: ['Parrot', 'Java sparrow', 'Cockatiel'],
    },
    {
      id: 'focus',
      label: 'Focus',
      options: ['Nest setup', 'Pair bonding'],
    },
  ],
  scenarios: [
    {
      id: 'conure-nest',
      title: 'Green-cheeked conure',
      note: 'Fresh branches, fresh start',
      progress: 68,
      conditions: { bird: 'Parrot', focus: 'Nest setup' },
    },
    {
      id: 'macaw-bond',
      title: 'Blue-and-gold macaw',
      note: 'Getting to know each other',
      progress: 42,
      conditions: { bird: 'Parrot', focus: 'Pair bonding' },
    },
    {
      id: 'sparrow-nest',
      title: 'Java sparrow',
      note: 'A cozy corner is taking shape',
      progress: 82,
      conditions: { bird: 'Java sparrow', focus: 'Nest setup' },
    },
    {
      id: 'cockatiel-nest',
      title: 'Cockatiel',
      note: 'Gathering soft nesting fibers',
      progress: 55,
      conditions: { bird: 'Cockatiel', focus: 'Nest setup' },
    },
    {
      id: 'cockatiel-bond',
      title: 'Cockatiel pair',
      note: 'Sharing the sunny perch',
      progress: 91,
      conditions: { bird: 'Cockatiel', focus: 'Pair bonding' },
    },
  ],
};
