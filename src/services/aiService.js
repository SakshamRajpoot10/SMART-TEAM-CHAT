/**
 * Simulates an AI generating a summary of a conversation.
 * @param {Array<Object>} messages - An array of message objects.
 * @returns {string} A summary of the conversation.
 */
export const summarizeThread = (messages) => {
  if (!messages || messages.length === 0) {
    return "There are no messages to summarize.";
  }
  
  const keywords = {
    designs: 0,
    meeting: 0,
    report: 0,
    review: 0,
  };

  messages.forEach(msg => {
    const text = msg.text.toLowerCase();
    if (text.includes('design')) keywords.designs++;
    if (text.includes('meeting')) keywords.meeting++;
    if (text.includes('report')) keywords.report++;
    if (text.includes('review')) keywords.review++;
  });

  const topKeyword = Object.keys(keywords).reduce((a, b) => keywords[a] > keywords[b] ? a : b);

  switch(topKeyword) {
    case 'designs':
      return "This conversation is primarily about reviewing new designs and gathering feedback.";
    case 'meeting':
      return "The main topic is scheduling and confirming a team meeting to finalize details.";
    case 'report':
      return "This thread focuses on the submission and contents of a recent report.";
    default:
      return "This is a general conversation about project updates and next steps.";
  }
};

/**
 * Simulates an AI suggesting a smart reply based on the last message.
 * @param {Array<Object>} messages - An array of message objects.
 * @returns {string} A suggested reply.
 */
export const suggestReply = (messages) => {
  if (!messages || messages.length === 0) {
    return "Got it, thanks!";
  }
  const lastMessage = messages[messages.length - 1].text.toLowerCase();

  if (lastMessage.includes('?')) {
    return "Let me check on that and I will get back to you shortly.";
  }
  if (lastMessage.includes('thank you') || lastMessage.includes('thanks')) {
    return "You're welcome!";
  }
  if (lastMessage.includes('can you')) {
    return "Sure, I can take care of that.";
  }
  return "Thanks for the update!";
};

/**
 * Simulates an AI generating a friendly icebreaker message.
 * @param {string} name - The name of the person to address.
 * @returns {string} A friendly icebreaker message.
 */
export const generateIcebreaker = (name) => {
  const participant = name ? name : 'there';
  const icebreakers = [
    `Hey ${participant}, hope you're having a productive week! Just wanted to reach out about...`,
    `Hi ${participant}, I was just thinking about the project and had a quick question for you.`,
    `Hello ${participant}! Got a moment to sync up today?`,
  ];
  return icebreakers[Math.floor(Math.random() * icebreakers.length)];
};
