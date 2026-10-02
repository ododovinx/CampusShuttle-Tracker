export const mockBuses = [
  {
    id: 'bus-1',
    routeId: 'route-1',
    name: 'Blue Shuttle',
    status: 'On route',
    etaMinutes: 4,
    coordinate: {
      latitude: 7.4959,
      longitude: 4.5314,
    },
    capacity: 35,
    delayMinutes: 0,
  },
  {
    id: 'bus-2',
    routeId: 'route-2',
    name: 'Green Loop',
    status: 'Approaching',
    etaMinutes: 9,
    coordinate: {
      latitude: 7.5017,
      longitude: 4.551,
    },
    capacity: 28,
    delayMinutes: 3,
  },
  {
    id: 'bus-3',
    routeId: 'route-3',
    name: 'Gold Express',
    status: 'Delayed',
    etaMinutes: 14,
    coordinate: {
      latitude: 7.4897,
      longitude: 4.5445,
    },
    capacity: 40,
    delayMinutes: 8,
  },
];

export const mockSchedules = [
  {
    id: 'sched-1',
    route: 'Main Campus Loop',
    departure: '07:30 AM',
    arrival: '08:10 AM',
    frequency: 'Every 15 min',
    stops: ['Faculty of Science', 'Student Centre', 'Library'],
  },
  {
    id: 'sched-2',
    route: 'Hostel Shuttle',
    departure: '08:00 AM',
    arrival: '08:25 AM',
    frequency: 'Every 20 min',
    stops: ['Maitama Hostel', 'Eateries', 'Engineering Block'],
  },
  {
    id: 'sched-3',
    route: 'Medical Centre Route',
    departure: '09:00 AM',
    arrival: '09:35 AM',
    frequency: 'Every 30 min',
    stops: ['Clinic', 'Faculty of Health', 'North Gate'],
  },
];

export const mockNotifications = [
  {
    id: 'note-1',
    title: 'Blue Shuttle approaching',
    message: 'Blue Shuttle will arrive at the Student Centre in 3 minutes.',
    time: '2 min ago',
    type: 'info',
  },
  {
    id: 'note-2',
    title: 'Weather advisory',
    message: 'Light rain expected after 10:00 AM. Buses may slow slightly.',
    time: '16 min ago',
    type: 'warning',
  },
  {
    id: 'note-3',
    title: 'Route update',
    message: 'Main Campus Loop has a temporary diversion near the Engineering Block.',
    time: '1 hour ago',
    type: 'alert',
  },
];

export const mockRoutes = [
  {
    id: 'route-1',
    name: 'Main Campus Loop',
    description: 'Faculty to Library and Student Centre.',
    distanceKm: 4.6,
    stops: ['North Gate', 'Science Faculty', 'Student Centre', 'Library'],
  },
  {
    id: 'route-2',
    name: 'Hostel Shuttle',
    description: 'Residential route with student-focused stops.',
    distanceKm: 3.2,
    stops: ['Maitama Hostel', 'Eateries', 'Engineering Block'],
  },
];
