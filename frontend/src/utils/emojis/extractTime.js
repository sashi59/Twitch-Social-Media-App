export function formatMessageTime(createdAt) {
    const now = new Date();
    const messageTime = new Date(createdAt);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);
  
    if (diffInSeconds < 60) {
      return "just now";
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hr ago`;
    }
  
    // If the message was sent on the same day, show time in HH:MM format
    if (messageTime.toDateString() === now.toDateString()) {
      return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    // Otherwise, return the date in a readable format, e.g., "MMM DD, YYYY"
    return messageTime.toLocaleDateString();
  }
  
  // Example usage
  console.log(formatMessageTime("2024-11-05T14:30:00Z"));
  