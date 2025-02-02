export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const getAvatarColor = (initials) => {
  const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-red-500',
      'bg-yellow-500'
  ];
  
  // Use ASCII value of first initial to pick color
  const colorIndex = initials.charCodeAt(0) % colors.length;
  return colors[colorIndex];
};

export const preventBackNavigation = () => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  };
  
};
