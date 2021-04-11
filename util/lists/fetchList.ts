export const fetchList = async (name: string) => {
  const request = await fetch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_ID_HOST}${name}`
      : `${process.env.NEXT_PUBLIC_ID_LOCAL}${name}`
  );

  return request.json();
};
