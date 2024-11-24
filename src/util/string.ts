const randomString = (len: number) => {
  let text = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';

  // Generate the first character from the letters
  text += letters.charAt(Math.floor(Math.random() * letters.length));
  const possible = letters + digits;

  // Generate the remaining characters from the full set
  for (let i = 1; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export { randomString };
