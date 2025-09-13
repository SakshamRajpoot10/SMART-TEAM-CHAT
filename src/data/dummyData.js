export const dummyChats = [
  {
    id: 1,
    name: 'Saksham Rajpoot',
    lastMessage: 'Sounds good! I will check it out.',
    time: '10:42 AM',
    avatarColor: '#ff7f50', // Coral
  },
  {
    id: 2,
    name: 'Manas Gupta',
    lastMessage: 'Thanks for catching that!',
    time: '9:15 AM',
    avatarColor: '#6495ed', // Cornflower Blue
  },
  {
    id: 3,
    name: 'Suraj',
    lastMessage: 'Can you send over the report?',
    time: 'Yesterday',
    avatarColor: '#9acd32', // Yellow Green
  },
];

export const dummyMessages = {
  // 1-to-1 chat remains the same structure
  1: [
    { id: 1, sender: 'Saksham Rajpoot', text: 'Hey, did you see the new designs?', type: 'received' },
    { id: 2, sender: 'You', text: 'Not yet, was just about to look.', type: 'sent' },
    { id: 3, sender: 'Saksham Rajpoot', text: 'They are in the shared folder. Let me know what you think!', type: 'received' },
    { id: 4, sender: 'You', text: 'Sounds good! I will check it out.', type: 'sent' },
  ],
  // This is now a team chat with multiple senders
  2: [
    { id: 1, sender: 'Design Lead', text: 'Team, please review the final mockups for the landing page.', type: 'received' },
    { id: 2, sender: 'You', text: 'Looks great! I have no further comments.', type: 'sent' },
    { id: 3, sender: 'QA Tester', text: 'I found a small alignment issue on mobile. The CTA button is off-center on smaller screens.', type: 'received' },
    { id: 4, sender: 'You', text: 'Good catch. I can fix that alignment quickly.', type: 'sent' },
    { id: 5, sender: 'Design Lead', text: 'Thanks for catching that!', type: 'received' },
  ],
  3: [
    { id: 1, sender: 'You', text: 'Hi Bob, following up on the quarterly numbers.', type: 'sent' },
    { id: 2, sender: 'Suraj', text: 'Hi! Almost done with them. Can you send over the report from last quarter for comparison?', type: 'received' },
  ],
};

