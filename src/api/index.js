
export const getRobot = async (input) => {
  const imageUrl = await fetch(`https://robohash.org/${input}`);
  return imageUrl.url
}

